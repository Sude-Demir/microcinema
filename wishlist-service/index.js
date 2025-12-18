const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store
let wishlist = [];

app.get('/wishlist', (req, res) => {
    console.log('Wishlist Service: GET /wishlist');
    res.json(wishlist);
});

app.post('/wishlist', (req, res) => {
    const { movieId } = req.body;
    console.log(`Wishlist Service: POST /wishlist (MovieID: ${movieId})`);
    if (movieId && !wishlist.includes(movieId)) {
        wishlist.push(movieId);
    }
    res.json({ success: true, wishlist });
});

app.delete('/wishlist/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    console.log(`Wishlist Service: DELETE /wishlist/${movieId}`);
    wishlist = wishlist.filter(id => id !== movieId);
    res.json({ success: true, wishlist });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Wishlist Service running on port ${PORT}`);
});
