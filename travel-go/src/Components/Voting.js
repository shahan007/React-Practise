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
        <div className="votes">
            <button className="btn upvote-green" onClick={incrementUpvote}>
                <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <p>
                {travel.upvote - travel.downvote}
            </p>
            <button className="btn downvote-red" onClick={incrementDownvote}>
                <i className="fa-solid fa-thumbs-down"></i>
            </button>
            <p className="number-votes">
                <span>{travel.upvote + travel.downvote}</span> votes
            </p>
        </div>
    )
}

export default Voting;