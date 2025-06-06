import db from "../client.js";


export async function createGames({ title, genre, release_year, platform_name }){
    const result = await db.query(
        'SELECT id FROM platforms WHERE name = $1',
        [platform_name]
    );
    console.log(release_year)
    console.log(platform_name)
    console.log(result.rows[0])
    const platform_id = result.rows[0].id;
    const sql = `
        INSERT INTO games (title, genre, release_year, platform_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const { rows: games } = await db.query(sql, [title, genre, release_year, platform_id]);
    return games;
}

export async function getGames(){
    const sql = `
        SELECT * FROM games
    `;
    const { rows: games } = await db.query(sql);
    return games;
}

export async function getGameById(id){
    const sql = `
        SELECT * 
        FROM games
        WHERE id = $1
    `;
    const {
        rows: game
    } = await db.query(sql, [id]);
    return game[0];
}

export async function updateGame({ id,title, genre, release_year, platform_id }){
    const sql = `
        UPDATE games
        SET title = $1, genre = $2, release_year = $3
        WHERE id = $4 && platform_id = $5
        RETURNING *;
    `;
    const {
        rows: game
    } = await db.query(sql, [title, genre, release_year, id, platform_id])
    return game[0];
}

export async function deleteGame(id){
    const sql = `
        DELETE FROM games WHERE id = $1 RETURNING *;
    `;
    const {
        rows: game
    } = await db.query(sql, [id])
    return game;
}