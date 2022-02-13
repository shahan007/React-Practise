import Me from "./Me"
import CardMainContent from "./CardMainContent"
import Button  from "./Button"
import CardFooter from "./CardFooter"

const Card = ({me,buttons,main,socials})=>(
    <div className="card">            
        <Me 
        name={me.name} 
        position={me.position} 
        website={me.website} 
        weblink={me.weblink}
        image={me.image}
        />
        <div className="card-contact-btns">
            {
                buttons.map(
                    (button,index) => {
                        const buttonKey = Object.keys(button)[0];
                        const buttonData = button[buttonKey]
                        return (
                            <Button text={buttonKey} link={buttonData.link} key={index}/> 
                        )
                    }
                                            
                )
            }                    
        </div>
        <CardMainContent about={main.about} interest={main.interest}/>
        <CardFooter socials={socials} />
    </div>
)

export default Card;