

const Expense = require('../models/expense-model');
const expenseValidationSchema = require('../validations/expense-validation'); 



const expenseCltr = {};

expenseCltr.create = async(req,res) => {
   const body = req.body;
   const { error, value } = expenseValidationSchema.validate(body);
   if(error){
    return res.status(404).json({error : error.details})
   }
   try{
   const expense = new Expense(value);
   expense.user =req.userId;
   await expense.save();
   res.json(expense)
   }catch(err){
    console.log(err);
    res.status(500).json({ error: 'something went wrong'})
   }
}

expenseCltr.list= async(req,res) => {
    try{
   const expense = await Expense.find({ user: req.userId})
   res.json(expense)
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'something went wrong'})
    }
}

expenseCltr.remove= async(req,res) => {
    const id= req.params.id;
    try{
  const expense = await Expense.findOneAndDelete({ _id: id, user:req.userId})
  res.json(expense)
    }catch{
        console.log(err);
        res.status(500).json({ error: 'something went wrong'})
    }
}

expenseCltr.update= async(req,res) => {
    const id =req.params.id;
    const body =req.body;
    const { error, value} = expenseValidationSchema.validate(body,{abortEarly:false});
    try{
 const expense = await Expense.findOneAndUpdate({_id:id, user:req.userId}, value, {new:true})
 res.json(expense)
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'something went wrong'})
    }
}

module.exports = expenseCltr;