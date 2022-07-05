import { Home } from "./Home";
import {Registration} from "./component/auth/reg"
import {BrowserRouter , Routes,  Route} from 'react-router-dom';
import { Login } from "./component/auth/login";
import {NewPost} from "./component/post/NewPost"
import { MyPosts } from "./component/post/MyPosts";
import { Profile } from "./Profile";
function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="api/auth/register" element={<Registration />} />
    <Route path="api/auth/login" element={<Login />} />
    <Route path="api/user/post" element={<NewPost />} />
    <Route path="api/user/profile" element={<Profile />} />
  </Routes>
</BrowserRouter>
}

export default App;
