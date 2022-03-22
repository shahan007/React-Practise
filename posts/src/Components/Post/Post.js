import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLoader from "../Loader/PageLoader";
import Comments from "./Comment";
import { Card, Row, Layout, Space ,Col,Grid} from "antd";
const { useBreakpoint } = Grid;
const { Content } = Layout

const Post = ()=>{

    const {id:postId} = useParams()
    const [loading, setLoading] = useState(true)
    const [post,setPost] = useState({})
    const [comments, setComments] = useState([])
    const { md } = useBreakpoint(); 
    
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

    const requestComments = async () => {
        
        setLoading(true)
        const url = `http://localhost:8000/comments?postId=${postId}`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.status = response.status
                throw error
            }
            const json = await response.json()
            setComments(json)            
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

    useEffect(()=>{
        requestComments()
    },[post])

    if (loading) {
        return (
            <PageLoader />
        )
    }
    
    return (        
        <Content align="center">    
            <Space size="large" direction="vertical">
                <Row                                                               
                    style={{ "width": md ? "60vw": "50vw" }}
                >                                
                    {
                        !Object.keys(post).length ?
                        <p>No such Post lol</p> :
                        <Card      
                            style={{"textAlign":"left"}}                  
                            title={
                                post.id + ":  " + post.title
                            }
                            bordered={true}
                            hoverable
                        >
                            {
                                post.body
                            }
                        </Card>
                    }                
                </Row>
                <Row style={{ 
                    "width": md ? "60vw" : "50vw",
                    "textAlign":"left" 
                    }}
                >
                    {
                        Object.keys(post).length > 0
                        &&
                        <>
                            <Col span={24} >
                                <Comments comments={comments}/>
                            </Col>
                        </>
                    }
                                        
                </Row>
            </Space>       
        </Content>               
    )
}

export default Post;