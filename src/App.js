import logo from './logo.svg';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import {createBrowserRouter,RouterProvider } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>
    },
    {
      path:"/login/",
      element:<Login/>
    },
    {
      path:"/register/",
      element:<Register/>
    },
  ])
  return (
   <>
      <RouterProvider router={router} />
   </>
  );
}

export default App;
