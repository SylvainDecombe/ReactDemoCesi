const { response, json } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(playload, process.env.SECRET_TOKEN, { expiresIn: '48h' }, (err, token => {
            if (error) {
                reject('Error generate token');
            } else {
                resolve(token);
            }
        }))
    })
}

const encryptPassword = async(password) => {
    if (password) {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    } else {
        return 'Error password'
    }
}
const register = async(req, res) => {
    const user = req.body;
    const email = user.email;
    const exist = User.findOne({ email });

    if (exist) {
        return res.status(400).json({ message: 'Account already exist' })
    }

    user.password = await encryptPassword(user.password);
    const new_user = new User(user);
    await new_user.save();
    const token = await generateToken(user._id, user.name);
    return res.status(200).json({ name: user.name, uid: user._id, token: token });
}

module.exports = { register };