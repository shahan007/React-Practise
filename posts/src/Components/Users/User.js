import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom"
import { 
    Layout,Grid,Col,Row,Descriptions,Card,Tooltip,Avatar,Skeleton,Collapse,Button,Divider,Pagination
} from "antd"
import { UserOutlined } from '@ant-design/icons';
import ModalMap from "../Map/Map";
import Album from "../Album/Album"
import Post from "../Post/Post";
import Blank from "../Blank";
const { Content } = Layout
const { Meta } = Card
const { Panel } = Collapse;
const { useBreakpoint } = Grid

const User = ()=>{

    
    const location = useLocation()
    const { user } = location.state    
    const [userLoading,setUserLoading] = useState(true)
    const [posts,setPosts] = useState([])    
    const [postStatus,setPostStatus] = useState({
        currentPage : 1,
        postsPerPage : 2,
        postCount : 0
    })
    const [isMapModalVisible, setIsMapModalVisible] = useState(false);    
    const { md } = useBreakpoint()

    const requestPostData = async () => {

        const {currentPage,postsPerPage} = postStatus

        const url = `http://localhost:8000/posts?userId=${user.id}&_page=${currentPage}&_limit=${postsPerPage}`

        try {
            const response = await fetch(url)
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.status = response.status
                throw error
            }
            const postCount = response.headers.get("X-Total-Count")    
            const json = await response.json()            
            
            setPosts(json.map(post => post.id))
            setPostStatus(
                prevPostStatus => ({
                    ...prevPostStatus,
                    postCount: postCount
                })
            )
        } catch (error) {
            console.error("Oops")
            console.error(error.message)
        } 
    }
    
    const navigateToPage = (pageNumber, pagesize) => (
        setPostStatus(
            prevPostStatus => ({
                ...prevPostStatus,
                currentPage :pageNumber,
                postsPerPage:pagesize
            })
        )
    )

    const showModal = () => {
        setIsMapModalVisible(true);
    };

    useEffect(() => (setTimeout(() => (setUserLoading(false)), 500)),[])
    useEffect(()=>{                
        requestPostData()
    }, [postStatus.currentPage, postStatus.postsPerPage])
    
    return (
        <Content style={{ "padding": "30px 0" }}>            
            <Row justify="center" gutter={[0, 24]}>
                {md && <Col span={1.5} order={1}/>}
                <Col span={md ? 14 : 20} order={md ? 2 : 2}>
                    <Row gutter={[0, 24]}>                        
                        <Col span={24}>
                            <Album userId={user.id}/>
                        </Col>
                        <Col span={24}>
                            <Collapse>
                                <Panel header={`Show ${user.username}'s Posts`} key="1">
                                    {
                                        posts.length === 0 ?
                                        <Blank/>:
                                        <>
                                            <Card bordered={false}>
                                                {
                                                    posts.map(
                                                        post => (
                                                            <>
                                                                <Post postId={post} key={post} showComment={false} />
                                                                <Divider/>
                                                            </>
                                                        )
                                                    )
                                                }
                                            </Card>
                                            <Row
                                                style={{
                                                    "justifyContent": "center",
                                                    "alignItems": "center",
                                                    "padding": "30px 0"
                                                }}
                                            >
                                                <Pagination
                                                    showSizeChanger={md ? true : false}
                                                    showQuickJumper={md ? true : false}
                                                    pageSize={postStatus.postsPerPage}
                                                    pageSizeOptions={[2, 4, 8]}
                                                    defaultCurrent={postStatus.currentPage}
                                                    total={postStatus.postCount}
                                                    onChange={navigateToPage}
                                                />
                                            </Row>                                                                     
                                        </>
                                    }
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>                    
                </Col>                
                {md && <Col span={1} order={3} />}
                <Col span={md ? 6 : 20} order={md ? 4 : 1}>
                    <Card
                        bordered={true}
                        hoverable
                    >
                        <Skeleton loading={userLoading} avatar active>
                            <Meta
                                avatar={
                                    <Tooltip title={user.name} placement="left">                                        
                                        <Avatar 
                                            icon={<UserOutlined />} 
                                            src={`https://ui-avatars.com/api/?name=${user.name}`} 
                                            size={64}
                                        /> 
                                    </Tooltip>
                                }
                                title={
                                    user.username
                                }
                                description={
                                    `Name: ${user.name}`
                                }
                            />                            
                            <Collapse ghost style={{"margin":"30px auto"}}>
                                <Panel header="More Detailed User Info" key="1">
                                    <Descriptions
                                        title={`${user.username}'s Info`}
                                        bordered
                                        column={{ xxl: 4, xl: 2, xs: 1 }}
                                        layout={md ? "vertical" : "horizontal"}
                                    >
                                        <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
                                        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                                        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
                                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                                        <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
                                        <Descriptions.Item label="Company">
                                            {user.company.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={
                                            <p>
                                                Address
                                                <Button 
                                                    onClick={showModal}
                                                    shape={"round"}
                                                    size={"small"}
                                                    style={{
                                                        "float": md ? "right" : ""
                                                    }}
                                                >
                                                    Map
                                                </Button>
                                            </p>                                            
                                        }>
                                            {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                                            <ModalMap
                                                username={user.username} 
                                                setIsMapModalVisible={setIsMapModalVisible} 
                                                isMapModalVisible={isMapModalVisible} 
                                                lat={user.address.geo.lat}
                                                lng={user.address.geo.lng}
                                            />
                                        </Descriptions.Item>                                        
                                    </Descriptions>                            
                                </Panel>                                
                            </Collapse>                                                                                                                        
                        </Skeleton>
                    </Card>                            
                </Col>                
                {md && <Col span={1.5} order={5}/>}
            </Row>                        
        </Content>
    )
}

export default User