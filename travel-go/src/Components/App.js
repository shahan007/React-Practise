import {useState,useEffect} from "react"
import Nav from "./Nav"
import Footer from "./Footer"
import Card from "./Card"
import Pagination from "./Pagination"
import Loader from "./Loader"
import "../Styles/style.css"

const countPerPage = 2;

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
            // uncomment below to activate loader componenet each time its voted
            // i disabled it just to showcase loader component once
            // setLoading(true)
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
            // since i am only checking for loading once
            // i have the below code else to check for loading when voted disable
            // below and enable line 48
            if (loading){
                setLoading(false)
            }                        
            // setLoading(false) -- line 48
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
     
    return (        
        <div>
            <Nav />
            {
                loading ? 
                <Loader/> :
            <>
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
            </>
            }
            <Footer />
        </div>
    )
}    


export default App;