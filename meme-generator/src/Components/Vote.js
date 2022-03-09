import { useState ,useEffect} from "react"

const Vote = ({memeId})=>{

    const [votes,setVotes] = useState(0)
    
    const voting = async (type)=>{
        const variance = type === "upvote" ? 
                        1 : -1        
        try {
            const response = await fetch(
                `http://localhost:8000/memes`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(
                        {   
                            id:Number(memeId),
                            votes: votes + variance
                        }
                    )
                }
            )

            if (!response.ok) {
                const error =  new Error("Oops!")
                error.code =  response.status 
                throw error
            }

            requestVotes()

        } catch (error) {               
            if (error.code === 500){
                const response = await fetch(
                    `http://localhost:8000/memes/${memeId}`,
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(
                            {                                
                                votes: votes + variance
                            }
                        )
                    }
                )

                if (response.ok) {
                    requestVotes()
                    return 
                }
            } 
            console.log("LOLL")
            console.error(error.message)                       
        }
    }        
    

    const requestVotes = async ()=> {
        try {
            if (memeId === ""){
                throw new Error("Oops ! Ignore me")
            }
            const url = `http://localhost:8000/memes/${memeId}`            
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
                setVotes(0)
                throw new Error(`<Error> Ooops\n\t${res.status}\n\t${res.statusText}`)
            }
            const json = await res.json()
            setVotes(json.votes)
        } catch (error) {
            console.error(error.message)
        }

    }
    
    useEffect(
        ()=>(
            requestVotes()
        ), [memeId]
    )
    
    return (                        
        <div className="meme-voting">
            <button 
                onClick={
                    voting.bind(this, "upvote")
                }
                className="btn upvote-green"
            >
                <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <p className="meme-votes">{votes}</p>
            <button 
                onClick={
                    voting.bind(this, "downvote")
                }
                className="btn downvote-red"
            >
                <i className="fa-solid fa-thumbs-down"></i>
            </button>
        </div>    
    )
}

export default Vote;