
import "./Styles/Nav.css"
import { useState } from 'react';
import { useThemeSwitcher } from "react-css-theme-switcher";
// import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import Loader from "../Loader/Loader";
import { Drawer, Space, Menu,Switch,Grid} from 'antd';
import { MenuOutlined } from "@ant-design/icons"

import logo from "./Styles/logo.png"
const { useBreakpoint} = Grid

const  Navbar = () => {
    
    const [visible, setVisible] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState();
    const { md } = useBreakpoint()
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
        <nav className="menuBar"
            style={{
                borderBottom: currentTheme === themes.dark ? "solid 1px #393939" : "solid 1px #e8e8e8",
                boxShadow: currentTheme === themes.dark ? "0 0 30px #555555" : "0 0 30px #f3f1f1"
            }}
        >
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="menuCon">
                {/* <div className="leftMenu">
                    <LeftMenu />
                </div> */}                                
                <Menu style={{ "float": "right" }} mode="horizontal" overflowedIndicator={false}>
                    <Menu.Item key="SwitchTheme" onClick={visible ? () => toggleDrawer(false) : ""}>
                        <Switch 
                            checked={isDarkMode} 
                            onChange={toggleTheme} 
                            checkedChildren="🌞"
                            unCheckedChildren="🌜"                            
                        />
                    </Menu.Item>
                    {
                        !md && 
                        <Menu.Item key="Hamburger">
                            <Space>
                                <MenuOutlined onClick={() => toggleDrawer(true)} />
                            </Space>
                        </Menu.Item>                                 
                    }
                </Menu>                                                                          
                {
                    md && <RightMenu />
                }

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