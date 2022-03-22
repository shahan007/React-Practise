import "./Styles/App.css"
import { Layout } from 'antd';
import {Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home"
import Post from "./Components/Post/Post"
import Nav from './Components/Nav/Nav';
import Users from "./Components/Users/Users";
import MyFooter from "./Components/MyFooter"
import { Content } from "antd/lib/layout/layout";

const App=  ()=> {
  
  
  return (          
      <Layout 
        style={{
          "background":"#FFFFFF"          
        }}
      >
        <Nav/>      
        <Content style={{          
          "minHeight" : "80vh"
          }}
        >
          <Routes>
            <Route path="/posts/:id" element={<Post />} />
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
