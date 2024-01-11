// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let products = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Статический файл для административной панели
app.use('/admin', express.static('admin'));

// API для товаров
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json({ message: 'Product added successfully', product: newProduct });
});

// Обслуживаем главную страницу
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Новый маршрут для переадресации на административную панель
app.get('/admin-link', (req, res) => {
    res.redirect('/admin');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
