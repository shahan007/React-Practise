import {useState,useEffect} from "react"
import Nav from "./Nav"
import Footer from "./Footer"
import Card from "./Card"
import Pagination from "./Pagination"
import Loader from "./Loader"
import "../Styles/style.css"

const countPerPage = 3;

const App = () => {
    
    const [AllData,setAllData] = useState([])
    const [loading,setLoading] = useState(true)
    let [voted,setVoted] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);    
    const totalPages = Math.ceil(AllData.length / countPerPage);
    const pagedData = AllData.slice(
        currentPage * countPerPage,
        (currentPage * countPerPage) + countPerPage
    )

    const requestTravels = async ()=>{
        try {            
            setLoading(true)
            const response = await fetch(
                "http://localhost:8000/data"
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )            
            if (!response.ok){
                throw new Error("Oop!")
            }            
            const json = await response.json();   
            setAllData(json)                  
            setLoading(false)      
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(
        () => {
            if(voted){                                      
                requestTravels()                                
                setVoted(false)
            }                                    
        }
    )
     
    if (loading){
        return (
            <Loader/>
        )
    }    
    return (        
        <div>
            <Nav />
            <main className="travels-container">
                {
                    pagedData.map(
                        travel => <Card key={travel.id} travel={travel} setVoted={setVoted}/>
                    )
                }
            </main>
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            />
            <Footer />
        </div>
    )
}    


export default App;