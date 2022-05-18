const Category = require('../models/category.model');


const createCategory = async(req,res) => {
    if(req.body){
        const category = new Category(req.body);
        await category.save()
        .then(data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send({error:error.message});
        });
    }
}

const getAllCategory = async(req,res) => {
    await Category.find({}).populate('foods', 'code name amount size')
    .then(data => {
        res.status(200).send({data:data});
    })
    .catch(error => {
        res.status(500).send({error:error.message});
    });
}

const getFoodForCategory = async(req,res) => {
    if(req.params && req.params.id){
        await Category.findById(req.params.id).populate('foods', '_id code name amount size')
        .then(response => {
            res.status(200).send({data:response.foods});
        })
        .catch(error => {
            res.status(500).send({error:error.message});
        });
    }
}

const calculateAmount = async(req,res) => {
    if(req.params && req.params.id){
        const category = await Category.findById(req.params.id).populate('foods', 'amount size');
        let totAmount = 0;
        if(category.foods.length > 0){
            category.foods.map((food) => {
                totAmount += food.amount*food.size;
            });
        }
        res.status(200).send({ totAmount:totAmount});
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    getFoodForCategory,
    calculateAmount
};