import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import NavBar from './layout/NavBar';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NavBar />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='/auth/login' element={<Login/>}/>
          <Route path='/auth/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
