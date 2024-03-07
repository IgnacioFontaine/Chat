import { Route, Routes } from "react-router-dom";
import Home from "./Views/home";
import Error from "./Views/error";
import SingUpView from "./Views/singUp";
import SingInView from "./Views/singIn";
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/actions';
import { IsAuthGuard } from "./Components/isAuth";
import { SelfImage } from './Components/selfImage';
import Dev from "./Views/dev";

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
          <Route path="/dev" element={<Dev></Dev>} />
          <Route path="/" element={<SingInView />} />
          <Route path="/chat" element={<IsAuthGuard />} />
          <Route path="/singUp" element={<SingUpView />} />
          <Route path="*" element={<Error />}  />
        </Routes>
  )
}

export default App;