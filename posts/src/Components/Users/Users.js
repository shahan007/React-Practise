import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "../Loader/Loader"
import Blank from "../Blank"
import { UsersMap } from "../Map/Map"
import { Layout,Pagination,Row,Col,Table,Collapse,Card} from "antd"
const { Panel } = Collapse;
const {Content} = Layout

const Users = () => {

    const [users,setUsers] =useState([])
    const [loading,setLoading] = useState(true)
    const [userPageStatus,setUserPageStatus] = useState({
        currentPage : 1,
        usersPerPage : 4,
        userCount:0
    })
        
    const requestUsers = async ()=>{
        
        setLoading(true)
        const { currentPage, usersPerPage } = userPageStatus
        const url = `http://localhost:8000/users?_page=${currentPage}&_limit=${usersPerPage}`
        
        try {
            const response = await fetch(url)
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.status = response.status
                throw error            
            }
            const userTotalCount = response.headers.get("X-Total-Count")
            const json = await response.json()

            setUsers(json)
            setUserPageStatus(
                prevUserPageStatus => ({
                    ...prevUserPageStatus,
                    userCount : userTotalCount
                })
            )
        } catch (error) {
            console.error("Oops")
            console.error(error.message)            
        } finally {
            setLoading(false)
        }
    }

    const navigateToPage = (pageNumber, pagesize) => {
        setUserPageStatus(prevUserPageStatus=>({
            ...prevUserPageStatus,
            currentPage: pageNumber,
            usersPerPage: pagesize
        }))
    }   

    useEffect(()=>{
        requestUsers()
    }, [userPageStatus.currentPage,userPageStatus.usersPerPage])

    if (loading){        
        return (
        <Loader/>
    )
    }    
    return (
        <Content style={{ "padding": "30px 0" }}>
            {
                users.length < 1 ?
                <Blank/>:
                <>
                    <Row>
                        <Col span={3} />
                        <Col span={18}>
                            <Table 
                                pagination={false}                                
                                dataSource={users}
                                columns={[
                                    {
                                        title: 'Username',
                                        dataIndex: 'username',
                                        key: 'username',
                                        render: (text, record) => <Link state={{ "user": record }} to={`/users/${record.id}`}>{text}</Link>,
                                    },
                                    {
                                        title: 'Legal Name',
                                        dataIndex: 'name',
                                        key: 'name'
                                    },
                                    {
                                        title: 'Website',
                                        dataIndex: 'website',
                                        key: 'website'
                                    }                                    
                                ]}
                            />                            
                        </Col>
                        <Col span={3} />
                    </Row>
                    <Row
                        style={{
                            "marginTop": "30px"
                        }}
                    >
                        <Col span={3}/>
                        <Col span={18}>
                            <Collapse
                                defaultActiveKey={['1']}
                            >
                                <Panel header="Show On Map" key="1">
                                    <Card hoverable>
                                        <div style={{ height: '60vh' }}>
                                            <UsersMap users={users} />     
                                        </div>                                         
                                    </Card>                                     
                                </Panel>
                            </Collapse>                 
                        </Col>
                        <Col span={3}/>
                    </Row>
                    <Row 
                        style={{
                            "justifyContent": "center",
                            "alignItems": "center",
                            "padding":"30px",                            
                        }}                    
                    >
                        <Pagination         
                            showSizeChanger                                              
                            showQuickJumper   
                            pageSize={userPageStatus.usersPerPage}
                            pageSizeOptions={[2,4,8]}                             
                            defaultCurrent={userPageStatus.currentPage} 
                            total={userPageStatus.userCount} 
                            onChange={navigateToPage} 
                        />
                    </Row>       
                </>                                                              
            }
        </Content>
    )
}

export default Users