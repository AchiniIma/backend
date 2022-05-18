const Food = require('../models/food.model');

const createFood = async(req, res) => {
    if (req.body){
        const food = new Food(req.body);
        food.save()
        .then(data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send({error:error.message});
        });
    }
}


const getFood = async(req,res) => {
    await Food.find({})
    .then(data => {
        res.status(200).send({data:data});
    })
    .catch(error => {
        res.status(500).send({error:error.message});
    });
}

const getAllFood = async(req,res) => {
    await Food.find({}).populate('categories', ' name description ')
    .then(data => {
        res.status(200).send({data:data});
    })
    .catch(error => {
        res.status(500).send({error:error.message});
    });
}

const getFoodForCategory = async(req,res) => {
    if(req.params && req.params.id){
        await Food.findById(req.params.id).populate('categories', '_id name description ')
        .then(response => {
            res.status(200).send({data:response.categories});
        })
        .catch(error => {
            res.status(500).send({error:error.message});
        });
    }
}

module.exports = {
    createFood,
    getFood,
    getAllFood,
    getFoodForCategory
};