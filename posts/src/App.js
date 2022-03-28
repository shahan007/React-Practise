import "./Styles/App.css"
import { Layout, BackTop } from 'antd';
import {Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home"
import Post from "./Components/Post/Post"
import Nav from './Components/Nav/Nav';
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import MyFooter from "./Components/Footer/MyFooter"
import { Content } from "antd/lib/layout/layout";

const App=  ()=> {
    
  return (          
      <Layout>
       <BackTop/>
        <Nav/>      
        <Content style={{          
          "minHeight" : "80vh"
          }}
        >
          <Routes>
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>        
        </Content>
        <MyFooter/>
      </Layout>          
  )
}

export default App;
