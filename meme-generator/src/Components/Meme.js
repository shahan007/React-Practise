import {useState,useEffect} from "react"
import Vote from "./Vote"

const MemeImageApi = "https://api.imgflip.com/get_memes"

const Meme = ()=>{
    
    const [memeData,setMemeData] = useState([])
    const [prevImageId,setPrevImageId] = useState('')
    const [meme,setMeme] = useState(
        {
            topText: "",
            bottomText:"",
            image:"",
            altImage:"",
        }
    )
    

    const onHandleChange = event => {
        const {name,value} = event.target
        setMeme(
            prevMeme => (
                {
                    ...prevMeme,
                    [name]:value,
                }
            )
        )
    }   

    const onSubmit = event => {
        event.preventDefault()
        setMemeImage()
    }
    
    const fetchMemesImages = async ()=>{
        try {
            const response = await fetch(MemeImageApi)
            const json = await response.json()
            setMemeData(json.data.memes)            
        } catch (error) {
            console.error(error.message)
        }
    }
    
    const generateRandomeImage = ()=>{
        const randomIndex = Math.floor(Math.random() * memeData.length)
        return memeData[randomIndex]
    }
    
    const setMemeImage = ()=>{          

        let image = generateRandomeImage()
        while(image.id === prevImageId){            
            image = generateRandomeImage()
        }
                
        setMeme(
            prevMeme => (
                {
                    ...prevMeme,
                    image:image.url,
                    altImage:image.name,
                }
            )
        )                
        setPrevImageId(image.id)
    }
    
    useEffect(
        ()=>{
            fetchMemesImages()                  
        },
        []
    )
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="topText"
                    value={meme.topText}
                    onChange={onHandleChange}
                />
                <input
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={onHandleChange}
                />
                <button>
                    Generate
                </button>
            </form>
            <main>
                <div>
                    <p>{meme.topText}</p>
                    <img src={meme.image} alt={meme.altImage} />
                    <p>{meme.bottomText}</p>
                </div>
                <Vote memeId={prevImageId}/>
            </main>
        </div>

    )

}

export default Meme;