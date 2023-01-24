const http = require('http');
const products = require('./data/product.json');
const { getProducts,
        getProduct, 
        createProduct, 
        updateProduct,
        removeProduct
    } = require('./controllers/productController');

const server = http.createServer((req, res) => {

    if (req.url === '/api/products'&& req.method === 'GET') {
        getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        console.log(id);
        getProduct(req, res, id)
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        removeProduct(req, res, id);
    }
     else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route Not Found', code: 404}));
    }

});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`))