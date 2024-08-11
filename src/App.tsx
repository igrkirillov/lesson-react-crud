import './App.css'
import {Posts} from "./components/Posts/Posts";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import {AddPost} from "./components/AddPost/AddPost";
import {Post} from "./components/Post/Post";
import {EditPost} from "./components/EditPost/EditPost";

function App() {
    const navigate = useNavigate();
    const gotoNewPost = () => {
        navigate("/new")
    }
    const postDidSave = () => {
        navigate("/posts")
    }
    const gotoPost = (id: number) => {
        navigate(`/posts/${id}`)
    }
    const gotoEdit = (id: number) => {
        navigate(`/posts/${id}/edit`)
    }
    const postDidDelete = (id: number) => {
        navigate("/posts")
    }
    const postDidEdit = (id: number) => {
        navigate(`/posts/${id}`)
    }
    const gotoPosts = () => {
        navigate("/posts");
    }

    return (
      <Routes>
          <Route path="/" element={(<Navigate to="/posts"></Navigate>)}></Route>
          <Route path="/posts" element={(<Posts gotoNewPost={gotoNewPost} gotoPost={gotoPost}/>)}></Route>
          <Route path="/new" element={(<AddPost postDidSave={postDidSave} gotoPosts={gotoPosts}/>)}></Route>
          <Route path="/posts/:id" element={(<Post postDidDelete={postDidDelete} gotoEdit={gotoEdit}/>)}></Route>
          <Route path="/posts/:id/edit" element={(<EditPost postDidEdit={postDidEdit} gotoPosts={gotoPosts}/>)}></Route>
      </Routes>
    )
}

export default App
