import { Route, Routes } from "react-router-dom";
import Home from "./Views/home";
import Error from "./Views/error";
import SingUpView from "./Views/singUp";
import SingInView from "./Views/singIn";

function App() {
  
  return (
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singIn" element={<SingInView />} />
          <Route path="/singUp" element={<SingUpView />} />
          <Route path="*" element={<Error />}  />
        </Routes>
  )
}

export default App;