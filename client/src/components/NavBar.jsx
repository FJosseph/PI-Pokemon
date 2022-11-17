import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './navbar.css'
import { getPokemons, getTypes } from "../actions";
// import { filterByCreated, filterGameByGenre, getGamesBySearch, sortAlfabéticamente, sortByRating } from "../actions";
const NavBar = ()=>{
    const [input, setInput] = useState('')
    const [oder, setOrder] = useState('')
    const [alfb, setAlfb] = useState('')
    const types = useSelector(state=>state.types)
    const videogames = useSelector(state=>state.allVideogames)
    const dispatch = useDispatch()
    function handleChange(e) {
        setInput(e.target.value)
    }
    function handleSubmit(e) {
        // e.preventDefault()
        // dispatch(getGamesBySearch(input))
        // setInput('')
    }

    function handleFilterType(e) {
        // e.preventDefault()
        // dispatch(filterGameByGenre(e.target.value))
    }

    function handleFilterCreated(e) {
        // dispatch(filterByCreated(e.target.value))        
    }

    function handleOrderByAttack(e) {
        // dispatch(sortByRating(e.target.value))
        setOrder(`Order by ${e.target.value}`) // Para el renderizado
    }
    
    function handleAlfabeto(e) {
        // dispatch(sortAlfabéticamente(e.target.value))        
        setAlfb(`Order by ${e.target.value}`)
    }

    useEffect(()=>{
        dispatch(getTypes())
    },[])
    return (
        // <header className={videogames.length?"navbar":"none"}>
           <header className="navbar">
            <div id="created">
            <Link to='/addGame'>
                Crear Game
            </Link>
            </div>
            <nav>
            <ul className="list-navbar">
                <li>
                    <select name="types" onChange={e=> handleFilterType(e)}>
                        <option value="Todos">Todos los tipos</option>
                        {types.map(x=>{
                            return <option value={x.name}>{x.name}</option>
                        })}
                    </select>
                </li>
                <li>
                    <select name="attack" onChange={e=>handleOrderByAttack(e)}>
                        <option value="Todos">Todos por ataque</option>
                        <option value="mayor">Ascedente</option>
                        <option value="menor">Descendente</option>
                    </select>
                </li>
                <li>
                    <select name="alfabéticamente" onChange={e=>handleAlfabeto(e)}>
                        <option value="Todos">Todos por alfabeto</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </li>
                <li>
                    <select name="created" onChange={e=>handleFilterCreated(e)}>
                        <option value="Todos">Todos</option>
                        <option value="creados">Creados</option>
                        <option value="existentes">Existentes</option>
                    </select>
                </li>
                <form onSubmit={handleSubmit}>
                <li><input value={input} type="text" onChange={handleChange} placeholder="search..."/></li>
                <li><input type="submit" value="Buscar"/></li>
                </form>
            </ul>
            </nav>
        </header>
    )
}
export default NavBar