import Header from './components/Header';
import {Routes,Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import BlogContent from './pages/BlogContent';
import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Blogs/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/my-blogs' element={<UserBlogs/>} />
        <Route path='/blog-details/:id' element={<BlogDetails/>}/>
        <Route path='/create-blog' element={<CreateBlog/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/blog-content/:id" element={<BlogContent/>} />
        <Route path="/add-comment/:id" element={<BlogContent/>} />
      </Routes>
    </div>
  );
}

export default App;
