import { Row,  Spin } from "antd";

const PageLoader = () => {

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

export default PageLoader