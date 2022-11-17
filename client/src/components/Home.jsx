import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import Pokemon from "./Pokemons";

const Home = ()=>{
    const dispatch = useDispatch()
    const pokemons = useSelector(state=>state.pokemons)
    useEffect(()=>{
        dispatch(getPokemons())
    })
    return (
        <div>
            {pokemons.map(x=>{
                return <Pokemon
                    name={x.name}
                    image_url={x.image_url}
                />
            })}
        </div>
    )
}

export default Home