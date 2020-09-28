const dotenv = require('dotenv');
const express = require('express');
const faker = require('faker');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const Customer = require('./models/customer');
const User = require('./models/user');
const db = require('./database/config');
const auth = require('./route/auth');

dotenv.config();
db.dbconnect();

const app = express();
const router = express.Router();

app.use(cors());
app.use(helmet());
app.use(bodyparser.json());


router.get('/customers', async(req, res, next) => {
    try {
        const customers = await Customer.find()
        return res.json(customers);
    } catch (error) {
        return res.send({ status: 'fail', message: error })
    }
});

router.post('/customers', async(req, res, next) => {
    const customers = Customer({
        name: req.body.name
    })
    try {
        const saveCustomer = await customers.save();
        return res.json(saveCustomer);
    } catch (error) {
        return res.send({ status: 'fail', message: error })
    }
});

app.use('/api/auth', auth);

app.listen(3000, () => console.log('Server starting'));