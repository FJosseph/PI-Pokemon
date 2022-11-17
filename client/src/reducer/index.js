const initialState = {
    pokemons: [],
    detail: {},
    allPokemons: [],
    types: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }    
        case 'GET_TPYES':
            return {
                ...state,
                types: action.payload
            }
        default:
            return {
                ...state
            }
    }    
}