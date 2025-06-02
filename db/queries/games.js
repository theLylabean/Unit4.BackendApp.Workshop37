import db from "../client.js";

export async function createGames(title, genre, release_year, platform_id){
    const sql = `
        INSERT INTO games (title, genre, release_year, platform_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const { rows: games } = await db.query(sql, [title, genre, release_year, platform_id]);
    return games;
}

export async function getGames() {
    const sql = `
        SELECT * FROM games
    `;
    const { rows: games } = await db.query(sql);
    return games;
}