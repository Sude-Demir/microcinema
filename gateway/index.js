const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Proxy to Movie Service
app.use('/api/movies', createProxyMiddleware({
    target: process.env.MOVIE_SERVICE_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
        '^/api/movies': '/movies',
    },
}));

// Proxy to Wishlist Service
app.use('/api/wishlist', createProxyMiddleware({
    target: process.env.WISHLIST_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/api/wishlist': '/wishlist',
    }
}));

app.listen(3000, () => {
    console.log('Gateway running on port 3000');
});
