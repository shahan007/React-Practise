import Nav from "./Nav"
import Footer from "./Footer"
import Card from "./Card"
import Data from "../Data/data"
import "../Styles/style.css"

const App = () => (    
    <div>
        <Nav/>
        <main className="travels-container">
            {
                Data.map(
                    (travel,index) => <Card key={index} travel={travel}/>
                )
            }
        </main>
        <Footer/>
    </div>
)

export default App;