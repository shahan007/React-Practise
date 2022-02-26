import {useState} from "react"

const WebLogo = "Images/WebLogo.png"

const Search = ({ data, setFilteredData })=>{
    
    const [queryUsername,setQueryUsername] = useState("")
    
    const updateQueryAndResult = event => {
        setQueryUsername(event.target.value)
        updateDataQueried(event.target.value)
    }
    
    const updateDataQueried = queryUsername => {        
        if (queryUsername.trim() === ""){
            setFilteredData (data)
        } else {
            const queriedData = data.filter(
                user => user.me.name.toLowerCase().trim()
                        .includes(queryUsername.toLowerCase().trim())
                        )            
            setFilteredData (queriedData)                               
        }
    }
    
    return (
        <div>            
            <div className="header">                
                <img className="WebLogo" src={WebLogo} alt="donkeyLogo"/>
                <div className="search-bar-wrapper">                       
                    <input className="search-bar" onChange={updateQueryAndResult} type="text" value={queryUsername}/>
                    <i className="fa fa-search"></i>
                </div>
            </div>
            {
                queryUsername.trim() === "" ? "" : (
                    <div className="search-query-result">
                        Search Queried for username: {queryUsername}
                    </div>
                )
            }
                    
        </div>
    )
}

export default Search;
