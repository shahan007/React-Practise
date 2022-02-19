const Card = (props)=>{
    
    const travel = props.travel
    
    return (                
        <div className="travel-card">
            <div className="travel-card-image">
                <img src={travel.imageUrl} alt={travel.title}/>
            </div>
            <div className="travel-main">
                <p>
                    <i className="fa-solid fa-2xs fa-location-dot"></i> <span className="travel-card-location">{travel.location}</span>
                    <a className="travel-card-link" href={travel.googleMapsUrl}>View on GoogleMaps</a>
                </p>
                <p className="travel-card-title">{travel.title}</p>
                <p className="travel-card-timeline">{travel.startDate}-{travel.endDate}</p>
                <p className="travel-card-description">{travel.description}</p>
            </div>
        </div>    
        
    )
}    

export default Card;