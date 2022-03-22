import { Row,  Spin } from "antd";

const Loader = ({height="80vh"}) => {

    return (
        <Row
            justify="space-around"
            align="middle"
            style={{
                "height": height
            }}
        >
            <Spin size="large" />
        </Row>            
    )
}

export default Loader