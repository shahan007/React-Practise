import { Link } from 'react-router-dom';
import { Menu, Grid } from 'antd';
const { useBreakpoint } = Grid;

const RightMenu = (props) => {

    const { toggleDrawer,visible } = props
    const menuItems = ["home", "posts", "users"]
    const { md } = useBreakpoint();        

    return (
        <Menu mode={md ? "horizontal" : "inline"}>
            {
                menuItems.map(
                    menuItem => (
                        <Menu.Item key={menuItem} onClick={visible ? ()=>toggleDrawer(false) : ""}>
                            <Link to={menuItem === "home" ? "/" : "/" + menuItem}>
                                {menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}
                            </Link>
                        </Menu.Item>
                    )
                )
            }
        </Menu>
    );
}

export default RightMenu;