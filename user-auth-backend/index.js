const express = require('express');
const cors=require('cors');
require('dotenv').config()
const mongoose=require('mongoose');


const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

const userCltr = require('./app/controllers/user-controller');
const categoriesCltr=require('./app/controllers/categories-controller');
const expenseCltr=require('./app/controllers/expense-controller');
const authenticateUser= require('./app/middlewares/authenticateuser');
const authorizeRoles = require('./app/middlewares/authorizeRoles');

const configureDB = require('./config/db')
app.post('/register', userCltr.register);
app.post('/user/login', userCltr.login);
//protected route
app.get('/user/account', authenticateUser,authorizeRoles('user', 'admin'),userCltr.account);
app.put('/user/updatePassword',authenticateUser,authorizeRoles('user', 'admin'), userCltr.updatePassword);


app.post('/api/category',authenticateUser, authorizeRoles('admin'),categoriesCltr.create);
app.get('/api/category', authenticateUser,  authorizeRoles('user', 'admin'), categoriesCltr.list);
app.delete('/api/category/:id', authenticateUser, categoriesCltr.remove);
 app.put('/api/category/:id', authenticateUser, categoriesCltr.update);

app.post('/api/expense', authenticateUser, expenseCltr.create);
app.get('/api/expense', authenticateUser, expenseCltr.list);
app.delete('/api/expense/:id', authenticateUser, expenseCltr.remove);
app.put('/api/expense/:id', authenticateUser, expenseCltr.update);

app.listen(port,() => {
    console.log('server running port is',port)
})