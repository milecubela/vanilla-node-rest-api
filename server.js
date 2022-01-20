const http = require('http')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productController')

// http server
const server = http.createServer((req, res) => {
    // GET all products
    if(req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    } 
    // GET product by ID
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } 
    // POST create product
    else if(req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    }
    // PUT update product by id
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } 
    // DELETE product by id
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    }
    // else if route doesn't exist
    else {
        res.writeHead(404, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: 'Route not found'}))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))