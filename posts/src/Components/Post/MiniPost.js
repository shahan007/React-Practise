import { Card,Grid } from "antd";
import { Link } from "react-router-dom";
const { useBreakpoint } = Grid

const MiniPost = (props) => {

    const {md} = useBreakpoint()
    
    return (
        <Card 
            style={{
                "textAlign":"left",
                "width": md ? "35vw" : "55vw"
            }}

            title={
                props.title.length > 10 ?
                props.postId + ":  " + props.title.slice(0, 10) + "...":
                props.postId +":  " + props.title 
            } 
            bordered={true}
            hoverable            
        >
            {
                props.body.length > 20 ?
                props.body.slice(0, 20) + "..." :
                props.body
            }
            <Link to={`/posts/${props.postId}`} >Expand</Link>
        </Card>
    )
}

export default MiniPost;