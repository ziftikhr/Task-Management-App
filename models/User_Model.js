const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user= new Schema({
    name: String,
    email: String,
    pass: String,
});

module.exports = mongoose.model('users', user);