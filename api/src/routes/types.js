const express = require('express')
const router = express.Router()
const { getTypes } = require('./controllers')
const { Tipo } = require('../db')

router.use(express.json())
router.get('/', async(req, res)=>{
    try {
        const types = await getTypes()
        await types.map(x=>Tipo.findOrCreate({where:x}))
        res.send(types)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})
module.exports = router