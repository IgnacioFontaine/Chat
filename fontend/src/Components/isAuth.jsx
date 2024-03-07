import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import SignIn from "./singIn";
import Home from "../Views/home";

export const IsAuthGuard = () => {
  const navigate = useNavigate();
  const current_user = useSelector((state) => state.products.user);
  console.log(current_user);
  
  if (current_user != null) {
    return (
    <>
      <Home />
    </>
  );
  } else if (current_user == null) {
    return (
    <SignIn />
    )
  }
};