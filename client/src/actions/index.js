import axios from 'axios'
export const getPokemons = ()=>{
    return function (dispatch) {
        return axios.get('http://localhost:3001/pokemons')
            .then(data=>dispatch({
                type: 'GET_ALL_POKEMONS',
                payload: data.data
            }))
    }
}

export const getTypes = ()=>{
    return function (dispatch) {
        return axios.get('http://localhost:3001/types')        
            .then(data=>dispatch({
                type: 'GET_TPYES',
                payload: data.data
            }))
    }
}