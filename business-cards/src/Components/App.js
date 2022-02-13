import {useState} from "react"
import Data from "../Data/data"
import CardCarrier from "./CardCarrier"
import Search from "./Search"
import "../style.css"

const App = ()=>{
    
    const [filteredData, setFilteredData] = useState(Data);
    
    return (
        <div>            
            <Search data={Data} setFilteredData={setFilteredData}/>
            <main className="cards">
                {
                    filteredData.length === 0 ? (
                        <h1 className="query-empty">Oops.....</h1>
                    ) : (
                        filteredData.map(
                            (data,index) => (
                                <CardCarrier 
                                me={data.me}
                                buttons={data.buttons} 
                                main={data.main} 
                                socials={data.socials}                    
                                key={index}
                                />
                                )
                            )
                        )
                }                
            </main>        
        </div>
    )    
}    

export default App;