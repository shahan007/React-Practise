import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "antd";
import { Row, Layout,  Spin } from "antd";
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
            <Row
                justify="space-around" 
                align="middle"
                style={{                    
                    "height": "80vh"                    
                }}
            >
                <Spin size="large" />
            </Row>
        )
    }
    
    return (        
        <Content style={{ "padding": "30px" }}>
            <Row
                justify="space-around" 
                align="middle"
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