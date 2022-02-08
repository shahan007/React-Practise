import React from "react"
import Card from "./Card"

const CardCarrier = ({me,buttons,main,socials})=>(
    <div className="card-carrier">
        <Card me={me} buttons={buttons} main={main}  socials={socials}/>
    </div>
)

export default CardCarrier;