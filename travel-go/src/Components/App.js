import {useState} from "react"
import Nav from "./Nav"
import Footer from "./Footer"
import Card from "./Card"
import Data from "../Data/data"
import Pagination from "./Pagination"
import "../Styles/style.css"

const countPerPage = 3;

const App = () => {

    const [currentPage, setCurrentPage] = useState(0);    
    const totalPages = Math.ceil(Data.length / countPerPage);
    const pagedData = Data.slice(
        currentPage * countPerPage,
        (currentPage * countPerPage) + countPerPage
    )
    return (
        <div>
            <Nav />
            <main className="travels-container">
                {
                    pagedData.map(
                        (travel, index) => <Card key={index} travel={travel} />
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