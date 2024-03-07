import { useSelector } from 'react-redux';
import SingInView from '../Views/singIn';
import Home from "../Views/home";

export const IsAuthGuard = () => {
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
    <SingInView />
    )
  }
};