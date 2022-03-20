import { Card } from "antd";

const MiniPost = (props) => {
    
    return (
        <Card 
            style={{
                "width": "35vw"
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
        </Card>
    )
}

export default MiniPost;