import { Home } from "./Home";
import {Registration} from "./component/auth/reg"
import {BrowserRouter , Routes,  Route} from 'react-router-dom';
import { Login } from "./component/auth/login";
import {NewPost} from "./component/post/NewPost"
function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="api/auth/register" element={<Registration />} />
    <Route path="api/auth/login" element={<Login />} />
    <Route path="api/user/post" element={<NewPost />} />
  </Routes>
</BrowserRouter>
}

export default App;
