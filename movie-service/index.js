const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const movies = [
    {
        id: 1,
        title: 'Dune: Part Two',
        year: 2024,
        description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
        image: 'https://placehold.co/400x600/2a1b12/d69e2e?text=Dune+Part+Two'
    },
    {
        id: 2,
        title: 'Oppenheimer',
        year: 2023,
        description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
        image: 'https://placehold.co/400x600/1a1a1a/e53e3e?text=Oppenheimer'
    },
    {
        id: 3,
        title: 'Spider-Man: Across the Spider-Verse',
        year: 2023,
        description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
        image: 'https://placehold.co/400x600/820000/ffffff?text=Spider-Verse'
    },
    {
        id: 4,
        title: 'Inception',
        year: 2010,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
        image: 'https://placehold.co/400x600/2d3748/cbd5e0?text=Inception'
    },
    {
        id: 5,
        title: 'The Batman',
        year: 2022,
        description: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.',
        image: 'https://placehold.co/400x600/000000/dc2626?text=The+Batman'
    },
    {
        id: 6,
        title: 'Interstellar',
        year: 2014,
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        image: 'https://placehold.co/400x600/1e293b/63b3ed?text=Interstellar'
    },
    {
        id: 7,
        title: 'Avengers: Endgame',
        year: 2019,
        description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.',
        image: 'https://placehold.co/400x600/4c1d95/a78bfa?text=Avengers+Endgame'
    },
    {
        id: 8,
        title: 'Pulp Fiction',
        year: 1994,
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        image: 'https://placehold.co/400x600/b91c1c/fcd34d?text=Pulp+Fiction'
    }
];

app.get('/movies', (req, res) => {
    console.log('Movie Service: GET /movies');
    res.json(movies);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Movie Service running on port ${PORT}`);
});
