import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Comments from "./Comment";
import Blank from "../Blank"
import { Card, Row, Layout, Col,Grid} from "antd";
const { useBreakpoint } = Grid;
const { Content } = Layout

const Post = ()=>{

    const {id:postId} = useParams()
    const [loading, setLoading] = useState(true)
    const [post,setPost] = useState({})
    const [comments, setComments] = useState([])
    const [commentCount, setCommentCount] = useState(0)
    const [commentPageStatus, setCommentPageStatus] = useState({
        currentPage: 1,
        commentsPerPage: 2
    })            
    const [commentLoading,setCommentLoading] = useState(true)
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
        } catch (error) {
            console.error("Oops")
            console.error(error.message)            
        } finally {
            setLoading(false)
        }
    }

    const requestComments = async () => {

        const { currentPage,commentsPerPage} = commentPageStatus
        
        setCommentLoading(true)
        const url = `http://localhost:8000/comments?postId=${postId}&_page=${currentPage}&_limit=${commentsPerPage}`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.status = response.status
                throw error
            }
            const commentCount = response.headers.get("X-Total-Count")    
            const json = await response.json()

            setComments(json)                        
            setCommentCount(commentCount)
        } catch (error) {
            console.error("Oops")
            console.error(error.message)            
        }  finally {            
            setCommentLoading(false)
        }
    }

    const navigateToPage = (pageNumber, pagesize) => {
        setCommentPageStatus({
            currentPage: pageNumber,
            commentsPerPage: pagesize
        })
    }    

    useEffect(() => {
        requestPostData()
    }, [])    

    useEffect(()=>{
        requestComments()
    },[post,commentPageStatus])

    if (loading) {
        return (
            <Loader />
        )
    }
    
    return (        
        <Content style={{ "padding": "30px 0" }}>                
            <Row>               
                <Col span={ md ? 6 : 3}/>
                <Col span={md ? 12 : 18}>
                    {
                        !Object.keys(post).length ?
                        <Blank />
                        :
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
                </Col>   
                <Col span={md ? 6 : 3} />                         
            </Row>
            <Row                 
                style={{                     
                    "marginTop":"30px" 

                }}
            >                                 
                {
                    Object.keys(post).length > 0
                    &&
                    <>
                        <Col span={md ? 6 : 3} />        
                        <Col span={md ? 12 : 18} >
                            <Comments 
                                comments={comments}
                                navigateToPage={navigateToPage}
                                commentCount={commentCount}
                                commentPageStatus={commentPageStatus}
                                commentLoading={commentLoading}
                            />
                        </Col>
                        <Col span={md ? 6 : 3} />                   
                    </>
                }                
            </Row>        
        </Content>               
    )
}

export default Post;