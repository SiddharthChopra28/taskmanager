import logo from './logo.svg';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Siderbar from './Components/Siderbar';
import Home from './Components/Home';
import {createBrowserRouter,RouterProvider } from 'react-router-dom';
import ChatArea from './Components/ChatArea';
import ActivateAccount from './Components/ActivateAccount';
import Task from './Components/Task';
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
    {
      path:"/chat/",
      element:<><div className='chat-container'>
        <Siderbar/>
        <ChatArea/>
        </div></>
    },
    {
      path:"/task/:roomid/:owner",
      element:<><div className='chat-container'>
        <Siderbar/>
        <Task/>

        </div></>
    },
  ])
  return (
   <>
      <RouterProvider router={router} />
   </>
  );
}

export default App;