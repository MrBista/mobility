const express = require('express');
const CategoryAdmin = require('../controllers/categoryAdmin');
const ControllerProductAdmin = require('../controllers/productAdmin');
const ControllerAdmin = require('../controllers/admin');
const { authentication } = require('../middlewares/auth');
const routes = express.Router();

routes.post('/register', ControllerAdmin.register);
routes.post('/login', ControllerAdmin.login);
routes.use(authentication);

routes.get('/totals', ControllerProductAdmin.getTotal);
// route for get all product admin
routes.get('/categories', CategoryAdmin.getAllCategory);
routes.post('/categories', CategoryAdmin.addCategory);
routes.delete('/categories/:id', CategoryAdmin.deleteCategory);
routes.get('/categories/:id', CategoryAdmin.getCategoryById);
routes.put('/categories/:id', CategoryAdmin.editCategory);

// route for get product by id admin
routes.get('/', ControllerProductAdmin.getAllProduct);
routes.post('/', ControllerProductAdmin.addProduct);
routes.get('/:id', ControllerProductAdmin.getProductById);
routes.put('/:productId', ControllerProductAdmin.editProduct);
routes.delete('/:productId', ControllerProductAdmin.deleteProduct);

module.exports = routes;
