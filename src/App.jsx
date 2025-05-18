import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import SideBar from './Components/SideBar'
import './styles/App.css'
import Chat from './Components/Chat'
function App() {
  const [count, setCount] = useState(0)

return (
    <div className="app">
        <>
        <SideBar />
        <Chat />
        </>
    </div>
  );
}

export default App
