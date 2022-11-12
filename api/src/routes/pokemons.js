const express = require('express')
const router = express.Router()
const { getApi, getName, getDetail } = require('./controllers')
const { Pokemon, Tipo } = require('../db')
router.use(express.json())

router.get('/', async(req, res)=>{
    const { name } = req.query
    try {
        if(name){
            const response = await getName(name)
            return res.send(response)
        }
        const pokemons = await getApi()
        res.send(pokemons)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    try {
        const response = await getDetail(id)
        res.send(response)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})

router.post('/', async (req, res) => {
    const { name, hp , attack, defense, speed, height, weight, types} = req.body
    if(!name || !hp || !types.length) return res.status(404).send('Faltan parámetros')
    try {
        const add = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight
        })
        let tipos = await Tipo.findAll()
        tipos = await tipos.map(x=>x.dataValues)
        const idTypes = types.map(a=> tipos.filter(b=>a === b.name)[0].id)
        console.log(idTypes);
        await add.addTipos(idTypes)
        res.send(add)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})

module.exports = router