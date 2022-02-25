import {useState,useEffect} from "react"
import CardCarrier from "./CardCarrier"
import Search from "./Search"
import Loader from "./Loader"
import "../Styles/style.css"

const App = ()=>{
    
    const [Data,setData] = useState([])
    const [filteredData, setFilteredData] = useState(Data)
    const [loading,setLoading] = useState(true)

    //  fetching all the business cards data
    const requestBusinessData = async ()=>{
        try {                     
            setLoading(true)
            const url = "http://localhost:8000/data"
            const res = await fetch(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }                
            )
            if (!res.ok){
                throw new Error(`<Error> Ooops\n\t${res.status}\n\t${res.statusText}`)
            }
            const json = await res.json()         
            setData(json)            
            setFilteredData(json)
            setLoading(false)
        } catch (error) {            
            console.error(error.message)
        }
    }

    useEffect(
        ()=>{                                    
            requestBusinessData()                                    
        },
        []
    )
    
    if (loading){
        return <Loader/>
    }
    
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