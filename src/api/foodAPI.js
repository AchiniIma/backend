const express = require('express');
const router = express.Router();
const controller = require('../controllers/foodController');

module.exports = function(){
    router.post('/add', controller.createFood);
    router.get('/', controller.getFood);
    router.get('/:id', controller.getFoodForCategory);
    return router;
}