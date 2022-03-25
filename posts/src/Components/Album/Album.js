import "./Album.css"
import Loader from "../Loader/Loader";
import Blank from "../Blank";
import {LeftOutlined,RightOutlined} from '@ant-design/icons'
import { useState,useEffect } from "react";
import { Tabs, Radio,Card ,Carousel,Image,Tooltip} from 'antd';
const { TabPane } = Tabs;


const Album =({userId}) => {

    const [albums,setAlbums] = useState([])
    const [mode,setMode] = useState("top")
    const [activeCarousellPhotos, setActiveCarousellPhotos] = useState([])
    const [carousellLoading, setCarousellLoading] = useState(true)
    const [loading,setLoading] = useState(true)    
    
    const handleModeChange = event => {
        
        const mode = event.target.value;
        setMode( mode);
    };    


    const requestAlbumsForUser = async ()=>{

        const url = `http://localhost:8000/albums?userId=${userId}`
        
        try {

            const response = await fetch(url)
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.status = response.status
                throw error
            }
            const json = await response.json()            
            setAlbums(json)            
            requestPhotoPerAlbum(json[0].id)
        } catch (error) {
            console.error("Oops")
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    const switchTab = key => {        
        requestPhotoPerAlbum(key)        
    }

    const requestPhotoPerAlbum = async (albumId) => {

        setCarousellLoading(true)

        const url = `http://localhost:8000/photos?albumId=${albumId}`

        try {

            const response = await fetch(url)
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.status = response.status
                throw error
            }
            const json = await response.json()
            setActiveCarousellPhotos(json)
        } catch (error) {
            console.error("Oops")
            console.error(error.message)
        } finally {
            setCarousellLoading(false)
        }
    }

    useEffect(()=>{
        requestAlbumsForUser()        
    },[])

    if (loading){
        return (
            <Loader/>
        )
    }

    return (        
        <>
            {
                albums.length === 0?
                <Blank/>
                :
                <Card
                    loading={loading}
                    bordered={true}
                    hoverable
                >
                    <p>My Albums</p>                    
                    <Radio.Group onChange={handleModeChange} value={mode} style={{"margin":"10px auto"}}>
                        <Radio.Button value="top">View Horizontal</Radio.Button>
                        <Radio.Button value="left">View Vertical</Radio.Button>
                    </Radio.Group>                    
                    <Tabs
                        defaultActiveKey={albums[0].id}
                        tabPosition={mode}                        
                        onChange={switchTab}  
                        style={{ "height": mode === "left" && "50vh" }}                         
                    >
                        {
                            albums.map(
                                album => (
                                    <TabPane 
                                        tab={
                                            mode === "top" ?
                                            album.title:
                                            <Tooltip
                                                title={album.title}
                                                placement="left"
                                            >
                                                    {album.title.slice(0, 8) + "..."}
                                            </Tooltip>

                                        } 
                                        key={album.id} 
                                    >
                                        {
                                            carousellLoading ?
                                                <Loader height="20vh"/>
                                                :
                                                <Carousel                                                      
                                                    autoplay 
                                                    arrows          
                                                    prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}
                                                >
                                                    {
                                                        activeCarousellPhotos.map(
                                                            photo => (
                                                                <Image 
                                                                    width="100%"                                                                   
                                                                    src={photo.url}
                                                                    key={photo.id}
                                                                    height="50vh"
                                                                />
                                                            )
                                                        )
                                                    }
                                                </Carousel>
                                        }
                                    </TabPane>
                                )
                            )
                        }
                    </Tabs>
                </Card>                      
            }        
        </>  
    )
}

export default Album;