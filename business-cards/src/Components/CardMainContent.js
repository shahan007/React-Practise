import About from "./About"
import Interest from "./Interest"

const CardMainContent = ({about,interest})=>(
    <div className="card-main">
        <About body={about.body} />
        <Interest body={interest.body} />   
    </div>    
)

export default CardMainContent;