import {useState,useEffect,useRef} from "react"
import html2canvas from "html2canvas"
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
    const memeImage = useRef(null)
    
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

    const download = async () => (
        html2canvas(
            memeImage.current,
            { letterRendering: 1, useCORS: true }
        ).then(canvas => {
            let link = document.createElement('a');
            link.setAttribute('download', 'meme-image.png');
            link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.click();
        })
    )
    
    useEffect(
        ()=>{
            fetchMemesImages()                              
        },
        []
    )
    
    return (
        <div className="container">
            <form className="form-grid" onSubmit={onSubmit}>
                <input 
                    className="meme-input"
                    maxLength="50"
                    name="topText"
                    value={meme.topText}
                    onChange={onHandleChange}
                />
                <input
                    className="meme-input"
                    maxLength="50"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={onHandleChange}
                />
                <button className="btn meme-generator-btn">
                    get me new image
                </button>
            </form>
            {
                prevImageId !== ""
                &&
                <main className="meme-container">
                    <div className="meme-content" ref={memeImage}>
                        <p className="meme-text meme-top">{meme.topText}</p>
                        <img className="meme-image" src={meme.image} alt={meme.altImage} />
                        <p className="meme-text  meme-bottom">{meme.bottomText}</p>
                    </div>
                    <Vote memeId={prevImageId} />
                    <button 
                        onClick={download}
                        className="btn meme-download"
                    >
                        Download
                    </button>
                </main>                
            }
        </div>

    )

}

export default Meme;