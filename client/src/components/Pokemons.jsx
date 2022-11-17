import React from "react";

const Pokemon = ({name, types, image_url})=>{
    return (
        <div>
            <h1>{name}</h1>
            <img src={image_url}/>
        </div>
    )
}

export default Pokemon