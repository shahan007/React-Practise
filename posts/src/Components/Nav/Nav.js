
import "./Styles/Nav.css"
import { useState } from 'react';
import { useThemeSwitcher } from "react-css-theme-switcher";
// import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import Loader from "../Loader/Loader";
import { Drawer, Button , Menu,Switch} from 'antd';

import logo from "./Styles/logo.png"

const  Navbar = () => {
    
    const [visible, setVisible] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState();
    const { switcher, currentTheme, status, themes } = useThemeSwitcher();    

    // controls the visibility of the drawer
    const toggleDrawer = (visible) => {
        setVisible(visible)
    };

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };

    if (status === "loading") {
        return (
            <Loader/>
        )
    }

    return (
        <nav className="menuBar">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="menuCon">
                {/* <div className="leftMenu">
                    <LeftMenu />
                </div> */}                
                <Menu style={{ "float": "right" }}>
                    <Menu.Item key="SwitchTheme" onClick={visible ? () => toggleDrawer(false) : ""}>
                        <Switch 
                            checked={isDarkMode} 
                            onChange={toggleTheme} 
                            checkedChildren="🌞"
                            unCheckedChildren="🌜"                            
                        />
                    </Menu.Item>
                </Menu>                
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