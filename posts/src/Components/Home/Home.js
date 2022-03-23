import MiniPost from "../Post/MiniPost";
import Loader from "../Loader/Loader";
import { useState,useEffect } from "react";
import { Col, Row, Layout, Grid, Pagination, Space } from "antd";
const { useBreakpoint } = Grid
const { Content } = Layout

const Home = () => {
    
    const [posts,setPosts] = useState([])
    const [pageStatus,setPageStatus] = useState({
        currentPage:1,
        postsPerPage:5
    })
    const [loading,setLoading] = useState(true)
    const [postsCount,setPostsCount] = useState(0)
    const { md } = useBreakpoint();

    const navigateToPage = (pageNumber,pagesize) => {        
        setPageStatus({
            currentPage:pageNumber,
            postsPerPage:pagesize
        })          
    }    
    
    const requestPosts = async () => {
        
        const {currentPage,postsPerPage} = pageStatus
        
        setLoading(true)
        const url = `http://localhost:8000/posts?_page=${currentPage}&_limit=${postsPerPage}`
        try {
            const response = await fetch(url)

            if (!response.ok){
                const error = new Error(response.statusText)
                error.status = response.status
                throw error
            }
            const pageCounts = response.headers.get("X-Total-Count")            
            const json = await response.json()            

            setPosts(json)
            setPostsCount(pageCounts)            
        } catch (error) {
            console.error("Oops")
            console.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        requestPosts()
    },[pageStatus])    
    

    
    if(loading){
        return (            
            <Loader/>
        )
    }
    
    return (
        <Content style={{"padding":"30px 0"}}>
            <Space size="large">
                <Content>
                    {
                        posts.length === 0 ?
                        <p>No Posts to show !</p>
                        :     
                        <>
                        <Row gutter={[0, 32]}>                            
                            {
                                posts.map(
                                    post => (
                                        <Col 
                                            justify="space-around"
                                            align="middle"
                                            span={md ? 12 : 24} 
                                            key={post.id}                                        
                                        >
                                            <MiniPost
                                                postId={post.id}
                                                title={post.title}
                                                body={post.body}
                                                userId={post.userId}
                                            />                                        
                                        </Col>
                                    )
                                )
                            }                            
                        </Row>   
                        <Row 
                            style={{
                                "justifyContent": "center",
                                "alignItems": "center",
                                "padding":"30px 0"
                            }}                    
                        >
                            <Pagination                                                       
                                showQuickJumper   
                                pageSize={pageStatus.postsPerPage}
                                pageSizeOptions={[5,10,15,20,25]}                             
                                defaultCurrent={pageStatus.currentPage} 
                                total={postsCount} 
                                onChange={navigateToPage} 
                            />
                        </Row>                                                                     
                        </>               
                    }
                </Content>
            </Space>
        </Content>
    )
}

export default Home;