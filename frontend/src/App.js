import { Home } from "./Home";
import { Registration } from "./component/auth/reg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./component/auth/login";
import { NewPost } from "./component/post/NewPost";
import { Profile } from "./Profile";
import { UpdatePost } from "./component/post/UpdatePost";
import { Users } from "./component/user/Users";
import { UserPost } from "./component/user/UserPost";
import { UpdateProfile } from "./UpdateProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/" element={<Navigate to="/api/auth/register" />} /> */}
        <Route path="api/auth/register" element={<Registration />} />
        <Route path="api/auth/login" element={<Login />} />
        <Route path="api/user/post" element={<NewPost />} />
        <Route path="api/user/profile" element={<Profile />} />
        <Route path="api/user/post/update" element={<UpdatePost />} />
        <Route path="api/users/all" element={<Users />} />
        <Route path="api/user/post/:id" element={<UserPost />} />
        <Route path="api/users/update/password" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
