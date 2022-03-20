import { Layout } from "antd";
const { Footer } = Layout;

const MyFooter = () => {

    return (
        <Footer 
            style={{
                "position":"fixed",
                "bottom":"0",
                "width":"100vw"                
            }}
        >
            Faggs
        </Footer>
    )
}

export default MyFooter;