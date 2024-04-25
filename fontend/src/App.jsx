import { setUser, setUserUid } from './Redux/actions';
import { IsAuthGuard } from "./Components/isAuth";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import SingUpView from "./Views/singUp";
import SingInView from "./Views/singIn";
import { useEffect } from 'react';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
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