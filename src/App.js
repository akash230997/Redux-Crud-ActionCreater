import './App.css';
import About from './Components/About.tsx';
import Home from './Components/Home.tsx';
import { BrowserRouter as Main, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.tsx';
import Nav from './Components/Nav.tsx';
import Login from './Components/Login.tsx';
import Dashboard from './Components/Dashboard.tsx';
import SignUp from './Components/SignUp.jsx';
import Projects from './Components/Projects.tsx';
// import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Main>
        {/* <Nav /> */}
        {/* <NavBar /> */}
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/' element={<Login />} />
          {/* </Route> */}
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/projects' element={<Projects />} />
          <Route exact path='/signup' element={<SignUp />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
