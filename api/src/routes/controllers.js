const axios = require('axios')
const { Pokemon, Tipo } = require('../db')
const getApi = async ()=>{
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
    const results = await response.data.results.map(async x=>await axios.get(x.url))
    const responseDB = await Pokemon.findAll({include: Tipo})
    return Promise.all(results)
    .then(res=>{
        return res.map(x=>{
            return x.data
        })
    })
    .then(data=>{
        return data.map(x=>{
            return {
                id: x.id,
                name: x.name,
                types: x.types.map(t=>t.type),
                image_url: x.sprites.front_default
            }
        }).concat(responseDB)
    })
}

const getName = async (name)=>{
    const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return {
        id: results.data.id,
        name: results.data.name,
        types: results.data.types,
        image_url: results.data.sprites.front_default
    } 
}

const getDetail = async (id)=>{
    const regex = /[a-z]/i
    const result = regex.test(id)
    if(result){
        const resultDB = await Pokemon.findOne({where: {id}, include: Tipo})
        console.log(resultDB);
        if(resultDB)return resultDB.dataValues
        throw new Error('No existe el pokemon')
    }
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types,
        stats: response.data.stats,
        height: response.data.height,
        weight: response.data.weight 
    }
}

const getTypes = async () => {
    const get = await axios.get('https://pokeapi.co/api/v2/type')
    const types = get.data.results.map(x=>{
        return {
            name: x.name
        }
    })
    console.log(types)
    return types
}

module.exports = {
    getApi,
    getName,
    getTypes,
    getDetail
}