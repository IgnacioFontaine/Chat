// import './App.css'
import { Route, Routes } from "react-router-dom";
import SingUpView from "./Views/singUp";
import SingInView from "./Views/singIn";
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/actions';
import { IsAuthGuard } from "./Components/isAuth";
import Dev from './Views/dev';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser.email));
      }
    })
  },[])
  
  return (
    <Routes>
          {/* <Route path="/" element={<SingInView />} /> */}
          <Route path="/singUp" element={<SingUpView />} />
          <Route path="/chat" element={<IsAuthGuard />} />
          <Route path="/" element={<Dev />}  />
          <Route path="*" element={<IsAuthGuard />}  />
        </Routes>
  )
}

export default App;