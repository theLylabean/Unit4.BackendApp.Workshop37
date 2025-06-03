import gamesRouter from './api/games.js';
import platformRouter from './api/platform.js';
import express from "express";
const app = express();
export default app;

app.use(express.json());
app.use(( req, res, next ) => {
    console.log(req.method, req.originalUrl);
    next();
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