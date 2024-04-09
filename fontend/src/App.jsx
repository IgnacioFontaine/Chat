import { Route, Routes } from "react-router-dom";
import SingUpView from "./Views/singUp";
import SingInView from "./Views/singIn";
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { setUser, setUserUid } from './Redux/actions';
import { IsAuthGuard } from "./Components/isAuth";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser.uid);
      if (authUser) {
        dispatch(setUser(authUser.email));
        dispatch(setUserUid(authUser.uid));
      }
    })
  },[])
  
  return (
    <Routes>
      <Route path="/" element={<SingInView />} />
      <Route path="/singUp" element={<SingUpView />} />
      <Route path="/chat" element={<IsAuthGuard />} />
      <Route path="*" element={<IsAuthGuard />} />
    </Routes>
  )
}

export default App;