DELETE FROM platforms;
DELETE FROM games;

INSERT INTO platforms (name, manufacturer) VALUES
    ('Xbox Series X', 'Microsoft'),
    ('Playstation 5', 'Sony Entertainment'),
    ('Nintendo 64', 'Nintendo');

INSERT INTO games (title, genre, release_year, platform_id) VALUES
    (
        'Mass Effect 1', 
        'Action RPG', 
        2007, 
        (SELECT id FROM platforms WHERE name = 'Xbox Series X')
    ),
    (
        'Mass Effect 2', 
        'Action RPG', 
        2010, 
        (SELECT id FROM platforms WHERE name = 'Xbox Series X')
    ),
    (
        'Mass Effect 3', 
        'Action RPG', 
        2012, 
        (SELECT id FROM platforms WHERE name = 'Xbox Series X')
    ),
    (
        'Halo 2', 
        'Action Shooter', 
        2004, 
        (SELECT id FROM platforms WHERE name = 'Xbox Series X')
    ),
    (
        'No Mans Sky', 
        'Action & Adventure', 
        2016, 
        (SELECT id FROM platforms WHERE name = 'Playstation 5')
    ),
    (
        'Beat Saber', 
        'Virtual Reality', 
        2018, 
        (SELECT id FROM platforms WHERE name = 'Playstation 5')
    ),
    (
        'Baldur''s Gate 3', 
        'Adventure RPG', 
        2023, 
        (SELECT id FROM platforms WHERE name = 'Playstation 5')
    ),
    (
        'Super Mario 64', 
        '3D Platformer', 
        1996, 
        (SELECT id FROM platforms WHERE name = 'Nintendo 64')
    ),
    (
        'Star Wars Episode 1: Racer', 
        'Action Racing', 
        1999, 
        (SELECT id FROM platforms WHERE name = 'Nintendo 64')
    );
