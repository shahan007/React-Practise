import { useEffect, useState } from "react";
import { Card,Grid,Skeleton,Avatar,Tooltip} from "antd";
import { UserOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
const {Meta} = Card
const { useBreakpoint } = Grid

const MiniPost = (props) => {

    const [user,setUser] = useState({})
    const [loading,setLoading] = useState(true)
    const {md} = useBreakpoint()
    
    const requestUser = async ()=>{

        const url = `http://localhost:8000/users/${props.userId}`
        try {
            const response = await fetch(url)

            if (!response.ok) {
                const error = new Error(response.statusText)
                error.status = response.status
                throw error
            }
            
            const json = await response.json()

            
            setUser(json)
        } catch (error) {
            console.error("Oops")
            console.error(error.message)
        } finally {
            setTimeout(() => (setLoading(false)),500)            
        }
    }

    useEffect(()=>{
        requestUser()
    },[])

    return (
        <Card
            style={{
                "textAlign": "left",
                "width": md ? "35vw" : "65vw",
                "borderRadius":"8px"
            }}            
            bordered={true}
            hoverable
        >            
            <Skeleton loading={loading} avatar active>
                <Meta
                    avatar={
                        <Tooltip title={user.username} placement="left">
                            <Link to={`/users/${user.id}`} state={{"user":user}} >
                                <Avatar icon={<UserOutlined />} src={`https://ui-avatars.com/api/?name=${user.name}`} />
                            </Link>                            
                        </Tooltip>                        
                    }
                    title={
                        props.title.length > 20 ?
                        props.postId + ":  " + props.title.slice(0, 20) + "..." :
                        props.postId + ":  " + props.title
                    }
                    description={
                        props.body.length > 30 ?
                        <p>
                            {props.body.slice(0, 30) + "... " }                            
                            <Link to={`/posts/${props.postId}`} >expand</Link>
                        </p>  :
                        <p>
                            {props.body}
                            <br/>
                            <Link to={`/posts/${props.postId}`} >expand</Link>
                        </p>                        
                    }
                />                                                           
            </Skeleton>            
        </Card>        
    )
}

export default MiniPost;