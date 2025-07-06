const express = require('express');
const app = express();
const cors = require('cors')


const UserRoutes = require('./Routes/UserRoutes.js');
const ProductRoutes = require('./Routes/ProductRoutes.js')
const morgan = require('morgan');

app.use(express.json());
app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/api/v1/user',UserRoutes);
app.use('/api/v1/product',ProductRoutes);



module.exports = app ;


