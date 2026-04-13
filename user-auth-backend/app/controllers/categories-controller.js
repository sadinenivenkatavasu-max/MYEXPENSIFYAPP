const Category = require("../models/category-model");

const categoryValidationSchema = require('../validations/category-validation');



const categoriesCltr = {};

categoriesCltr.create = async(req,res) => {
    const body = req.body.name;
    const { error, value} = categoryValidationSchema.validate(req.body, {abortEarly:false})
    if(error){
        return res.status(400).json({ error : error.details});
    }
    try{
        const category = new Category(value)

        const categoryInDB = await Category.findOne({ name:value.name, user:req.userId})
        if(categoryInDB){
            return res.status(400).json({ error: 'category already created'})
        }
        category.user = req.userId;
        await category.save();
        res.json(category)
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'something went wrong'})
    }
}

categoriesCltr.list = async(req, res)=> {
    try{
        const categories = await Category.find({ user: req.userId});
        res.json(categories)
    }catch(err){
  console.log(err)
  re.status(500).json({ error: 'something went wrong'})
    }
}

categoriesCltr.remove= async(req,res) => {
    const id = req.params.id;
    try{
 
const categories = await Category.findOneAndDelete({ _id: id, user: req.userId });
  if(!categories){
    return res.status(404).json({ error: 'record not found'})
  }
  res.json(categories)
    }catch(err){
        console.log(err)
        res.status(400).json({ error: 'something went wrong'})
    }
}
categoriesCltr.update= async(req,res) => {
    const id = req.params.id;
    const body = req.body;
    const { error, value} = categoryValidationSchema.validate(body,{abortEarly:false});
    try{
  const category = await Category.findOneAndUpdate({_id:id, user: req.userId}, value, { new:true});
  if(!category){
    return res.status(404).json({ error: 'record not found'});
  }
  res.json(category)
    }catch(err){
    console.log(err);
    res.status(500).json({ error: 'something went went wrong'})
    }
}



module.exports = categoriesCltr;