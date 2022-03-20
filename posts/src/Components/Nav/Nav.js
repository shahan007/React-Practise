
import "./Styles/Nav.css"
import { useState } from 'react';
// import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button } from 'antd';


const  Navbar = () => {
    
    const [visible, setVisible] = useState(false)

    // controls the visibility of the drawer
    const toggleDrawer = (visible) => {
        setVisible(visible)
    };

    return (
        <nav className="menuBar">
            <div className="logo">
                <a href="">logo</a>
            </div>
            <div className="menuCon">
                {/* <div className="leftMenu">
                    <LeftMenu />
                </div> */}
                <div className="rightMenu">
                    <RightMenu />
                </div>
                <Button 
                    className="barsMenu" 
                    type="primary" 
                    onClick={() => toggleDrawer(true) }
                >
                    <span className="barsBtn"></span>
                </Button>
                <Drawer
                    title="Navigation"
                    placement="right"                
                    destroyOnClose={true}
                    closable={true}                    
                    onClose={() => toggleDrawer(false) }
                    visible={visible}
                >
                    {/* <LeftMenu /> */}
                    <RightMenu visible={visible} toggleDrawer={toggleDrawer}/>
                </Drawer>
            </div>
        </nav>

    )
}

export default Navbar;