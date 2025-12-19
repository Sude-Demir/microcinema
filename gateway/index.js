const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});


// Helper to strip downstream CORS headers to avoid "Duplicate Headers" errors
const onProxyRes = (proxyRes) => {
    delete proxyRes.headers['access-control-allow-origin'];
    delete proxyRes.headers['access-control-allow-methods'];
    delete proxyRes.headers['access-control-allow-headers'];
};
app.get("/", (req, res) => {
    console.log("ROOT endpoint hit");
    res.status(200).send("Gateway is running");
});

// Proxy to Movie Service
app.use('/api/movies', createProxyMiddleware({
    target: process.env.MOVIE_SERVICE_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/api/movies': '/movies' },
    onProxyRes,
    onError: (err, req, res) => {
        console.error('Proxy Error (Movies):', err);
        res.status(500).send('Proxy Error');
    }
}));

// Proxy to Wishlist Service
app.use('/api/wishlist', createProxyMiddleware({
    target: process.env.WISHLIST_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: { '^/api/wishlist': '/wishlist' },
    onProxyRes,
    onError: (err, req, res) => {
        console.error('Proxy Error (Wishlist):', err);
        res.status(500).send('Proxy Error');
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});
