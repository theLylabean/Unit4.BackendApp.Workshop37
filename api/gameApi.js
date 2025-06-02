import { getGames } from '../db/queries/games.js';
import express from 'express';
const router = express.Router();

router.route('/').get(async ( req, res ) => {
    const games = await getGames();
    res.send(games);
});

export default router