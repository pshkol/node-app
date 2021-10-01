const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

let msg = '';

router.get('/users/signin', (req, res) => {
    res.render('users/signin', {msg});
})

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    // failureFlash: true
}))

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
})

router.post('/users/signup', async (req, res) => {
    const { name, password, email, confirm_password } = req.body;
    const emailUser = await User.findOne({email: email});
    const errors = [];

    if (emailUser) {
        console.log(emailUser)
        errors.push({text: 'El usuario con este email ya se encuentra registrado'});
    }

    if (password != confirm_password) {
        errors.push({text: 'Las contrasenas no coinciden'});
    }
    if (password.length < 4) {
        errors.push({text: 'La contrasena deberia ser al menos de 4 digitos'})
    }

    if (errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        msg = 'Se ha registrado exitosamente';
        res.redirect('/users/signin');
    }
})

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;