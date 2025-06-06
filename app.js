import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import gamesRouter from './api/games.js';
import platformRouter from './api/platform.js';
import express from "express";
const app = express();
export default app;

app.use(express.json());

export const verifyToken = () => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader.split(' ')[1];
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decodedJWT
    next();
}

app.use(( req, res, next ) => {
    console.log(req.method, req.originalUrl);
    next();
})

app.get('/', async( req, res, next ) => {
    try{
        const allUsers = await client.query(`SELECT * FROM user`);
        if(!allUsers) return res.status(404).send("Can't find users.");

        res.status(200).json(allUsers);
    }catch(err){
        console.log(err)
        res.status(400).send("Can't find the info.")
    }
})

app.post('/register', async( req, res, next ) => {
    const { first_name, last_name, email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 5)
        const newUser = await client.query(`INSERT INTO user ( first_name, last_name, email, password )
            VALUE ($1, $2, $3, $4)
            RETURNING *;`, [first_name, last_name, email, hashedPassword]);

            if(!newUser) return res.status(401).send("Could not make new user.");
            const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET);
            res.status(201).json(token);
    }catch(err){
        console.log(err);
        res.send('Error registering.')
    }
})

app.post('/login', async( req, res, next ) => {
    const { email, password } = req.body;
    try{
        const userInfo = await client.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        const isPWMatch = await bcrypt.compare(password, userInfo.password);
        if(!isPWMatch) return res.status(401).send('Not authorized.');
        const token = jwt.sign({ id: userInfo.id, email: userInfo.email });
        res.status(201).json(token);
    }catch(err){
        console.log('Could not log in.')
    }
})

app.get('favourite_games', verifyToken, async( req, res, next ) => {
    try{
        const favGames = await client.query(`SELECT * FROM user WHERE favourite = true`);
        if(!favGames) return res.status(404).send("Can't find games.")
    }catch(err){
        console.log(err);
        res.send('Error getting favourite games.')
    }
})

app.use('/platform', platformRouter);
app.use('/games', gamesRouter);
app.route('/').get(async (req, res ) => {
    res.send('Welcome to Waterdeep!')
})
app.use(( err, req, res, next ) => {
    console.log(err);
    res.status(500).send('AN ERROR HAS OCCURRED' + err);
})