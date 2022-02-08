import React from "react"

const defaultImage = "./Images/defaultImage.jpg"

const Me = ({name,position,website,weblink,image})=>(
    <div className="card-user">
        
        <img 
        className="userpic" 
        src={image === "" ? defaultImage : image} 
        alt={'image of user ' + name}
        />
        <p>{name}</p>
        <p>{position}</p>
        <a href={weblink}>{website}</a>
    </div>
)

export default Me;