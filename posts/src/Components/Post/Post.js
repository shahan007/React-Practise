import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLoader from "../Loader/PageLoader";
import { Card } from "antd";
import { Row, Layout } from "antd";
const { Content } = Layout

const Post = ()=>{

    const {id:postId} = useParams()
    const [loading, setLoading] = useState(true)
    const [post,setPost] = useState({})
    
    const requestPostData = async () => {
        
        const url = `http://localhost:8000/posts/${postId}`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.status = response.status
                throw error
            }            
            const json = await response.json()

            setPost(json)            
            setLoading(false)
        } catch (error) {
            console.error("Oops")
            console.error(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        requestPostData()
    }, [])    

    if (loading) {
        return (
            <PageLoader />
        )
    }
    
    return (        
        <Content >            
            <Row
                justify="space-around" 
                align="middle"
                style={{ "padding": "30px" }}
            >                                
                {
                    !Object.keys(post).length ?
                    <p>No such Post lol</p> :
                    <Card                        
                        title={
                            post.id + ":  " + post.title
                        }
                        bordered={true}
                        hoverable
                        style={{
                            "width":"50vw"
                        }}
                    >
                        {
                            post.body
                        }
                    </Card>
                }                
            </Row>
        </Content>               
    )
}

export default Post;