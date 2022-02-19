const Voting = ({ travel, setVoted})=>{

    const incrementUpvote = async () => {        
        travel.upvote = travel.upvote  + 1   
        const response = await fetch(
            `http://localhost:8000/data/${travel.id}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(travel)
            }
        )
        if (!response.ok){
            console.log(response.status)
        }        
        setVoted(true)        
    }
    const incrementDownvote = async () => {
        travel.downvote = travel.downvote + 1
        const response = await fetch(
            `http://localhost:8000/data/${travel.id}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(travel)
            }
        )
        if (!response.ok) {
            console.log(response.status)
        }
        setVoted(true)                     
    }

    return (
        <div>
            <button onClick={incrementUpvote}>Upvote</button>
            <p>
                {travel.upvote - travel.downvote}
            </p>
            <button onClick={incrementDownvote}>Downvote</button>
        </div>
    )
}

export default Voting;