import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Around from './pages/Around.jsx';
import ItemList from './pages/ItemList.jsx'
import ItemDetail from './pages/ItemDetail.jsx';
import AlongCourses from './pages/AlongCourses.jsx';
import AlongBlues from './pages/AlongBlues.jsx';
import AlongBluesPlan from './pages/AlongBluesPlan.jsx';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list/:title" element={<ItemList />} />
          <Route path="/:title/detail/:id" element={<ItemDetail />} />
          <Route path="/around" element={<Around />}/>
          <Route path="/along/courses" element={<AlongCourses />} />
          <Route path="/along/blues" element={<AlongBlues />} />
          <Route path="/along/blues/:id" element={<AlongBluesPlan />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;