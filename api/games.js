import { createGames, deleteGame, getGameById, getGames, updateGame } from '../db/queries/games.js';
import express from 'express';
const router = express.Router();

router.route('/').get(async( req, res ) => {
    const games = await getGames();
    res.send(games);
});

router.route('/:id').get(async( req, res ) => {
    const id = req.params.id;
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({ error: 'Please send a valid number.' })
    }
    const game = await getGameById(id)
    if(!game){
        return res.status(404).send({ error: 'Game ID not found.' })
    }
    res.send(game);
})

router.route('/').post(async( req, res ) => {
    if(!req.body){
        return res.status(400).send({error: 'Missing req.body'})
    }
    const { title, genre, release_year, platform_name } = req.body;
    if(!title || !genre || !release_year ){
        return res.status(400).status({ error: 'Missing one or more required fields.' })
    }
    const game = await createGames({ title, genre, release_year, platform_name })
    res.status(201).send(game);
})

router.route('/:id').put(async( req, res ) => {
    const id = req.params.id;
    if(!req.body){
        return res.status(400).send({error: 'Please send all required information.'})
    }
    const { title, genre, release_year } = req.body;
    if(!title || !genre || !release_year){
        return res.status(400).send({ error: 'Missing one or more required fields.' })
    }
    const game = await getGameById(id);
    if(!game){
        return res.status(404).send( {error: 'Game not found.' })
    }
    const updatedGame = await updateGame({ id, title, genre, release_year })
    res.send(updatedGame);
})

router.route('/:id').delete(async( req, res ) => {
    const id = req.params.id;
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({ error: 'Not a valid number.' })
    }
    const game = await getGameById(id);
    if(!game){
        return res.status(404).send({ error: 'Game not found.' })
    }
    const deletedGame = await deleteGame(id);
    if(!deletedGame){
        return res.status(404).send({ error: 'Game not found.' })
    }
    res.sendStatus(204);
})

export default router