import React from "react"

const Button = ({text,link}) => (
    <a href={link} className={`contact-btn-${text} contact-btn`}>        
        <img src={`Images/${text}Icon.png`} alt={`${text}-logo`}/>
        <span>{text}</span>        
    </a>
)

export default Button