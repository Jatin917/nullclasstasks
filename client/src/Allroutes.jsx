import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Askquestion from './pages/Askquestion/Askquestion'
import Auth from './pages/Auth/Auth'
import Question from './pages/Question/Question'
import Displayquestion from './pages/Question/Displayquestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import Userprofile from './pages/Userprofile/Userprofile'
import ProtectedRoute from './Comnponent/ProtectedRoute/ProtectedRoute'
import PostPage from './pages/Post/PostPage'
import PostDetail from './Comnponent/Post/PostDetail'
import AddPost from './pages/Post/AddPost'
import CreatePost from './pages/Post/AddPost'
function Allroutes({slidein,handleslidein}) {
  return (
    <Routes>
        <Route path='/' element={<Home slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Askquestion' element={<ProtectedRoute><Askquestion /></ProtectedRoute> }/>
        <Route path='/Auth' element={<Auth />}/>
        <Route path='/Question' element={<Question slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Question/:id' element={<Displayquestion slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Tags' element={<Tags slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Users' element={<Users slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Users/:id' element={<Userprofile slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Posts' element={<PostPage slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Posts/:id' element={<PostDetail slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/addpost' element={<ProtectedRoute> <CreatePost slidein={slidein} handleslidein={handleslidein}/></ProtectedRoute>}/>
    </Routes>
  )
}

export default Allroutes