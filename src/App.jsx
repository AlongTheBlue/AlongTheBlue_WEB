import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ItemList from './pages/ItemList.jsx'
import ItemDetail from './pages/ItemDetail.jsx';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list/:title" element={<ItemList />} />
          <Route path="/:title/detail/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;

        /* {/* <Routes> }
          /* 메인페이지(홈 화면) */
          /* <Route exact path="/" element={<Home />} /> */
          /* 학과 정보/공지 페이지 */
          /* <Route exact path="/detail/:id" element={<Detail />} /> */
          /* 게시글 등록 페이지*/
          /* <Route exact path="/post/" element={<Post />} /> */
          /* 로그인 페이지*/
          /* <Route exact path="/login" element={<Login />} /> */
          /* 공지사항 등록*/
          /* <Route exact path="/register" element={<Register />} /> */
          /* <Route
            // path="/notice/:departmentId/:noticeId"
            // element={<NoticeDetail />}
          /> */
        // {/* </Routes> */}

// import Home from "./pages/Home";
// import Detail from "./pages/Detail";
// import Post from "./components/Post";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import NoticeDetail from "./pages/NoticeDetail";