const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expenseDate: Date,
    title: String,
    amount: Number,
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }, 
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true});

const Expense = mongoose.model('Expense', expenseSchema)
module.exports= Expense;