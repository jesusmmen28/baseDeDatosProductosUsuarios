const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { getConnection } = require("./db");
const { response } = require('express');
//const { listProductos , addProductos} = require('./productos');
const { listUsuarios, addUsuarios } = require('./usersController');


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log('Este es un middleware que se ejecuta para todos los endpoints')

    next()
})

app.get('/usuarios', listUsuarios)

app.post('/usuarios', addUsuarios)
/*
app.get('/productos', listProductos)

app.post('/productos', addProductos)*/

app.get('/', function (req, res) {
    console.log('estoy en la función controllador de GET /')
    res.send('Hello World')
})

app.listen(5500)



