import React, { useEffect, useState } from 'react'
import withAuthentication from '../utils/withAuthentication'
import { bgcolor, maxWidth, width } from '@mui/system';
import { LinearProgress } from '@mui/material';
import ChannelItem from './ChannelItem';
import '../styles/Sidebar.css';
import Modal from './Modal';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import axios from 'axios'
import ToggleButton from './ToggleButton';
 function Siderbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateRoom = () => {
    setIsModalOpen(false);
    console.log('Create Room Clicked');
    // Bro room create karwana
  };

  const handleJoinRoom = () => {
    setIsModalOpen(false);
    console.log('Join Room Clicked');
    // Room join karwana
  };

    const BASE_URL = "http://127.0.0.1:8000/";
    const [channellist,setchannellist] = useState([])
    const [channelloader,setchannelloader] = useState(true)
    // const getAuthTokenFromCookie =() =>{
    //     const cookies = document.cookie.split(';')
    //     for (const cookie in cookies) {
    //        const [name,value] = cookie.trim().split() 
    //         }
    //     }
    // }
    const functionforauthtoken =() =>{
        return null
    }
    useEffect(() =>{
        const authToken = functionforauthtoken()
        if(authToken){
            axios.get('${BASE_URL}api/users/',{
            headers:{
                Authorization: 'Bearer ${authToken}'
            }
        }).then(response =>{
            setchannellist(response.data)
            setchannelloader(false)
            console.log(response)
        }).catch(error => {
            console.log("Error making API request:",error)
        })
        }
    },[])
  return (
    <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.3rem', marginBottom: '1rem' }} className="sidebar__top" >
            <h3>CHANNELS</h3>
        </div>
        <div className = "siderbar__channels mt-3"> 
            <div className = "siderbar__channelsHeader">
                <ToggleButton />
            </div>
        </div>
        <div className = "siderbar__channelsList mt-3">
            {channelloader ? (<Box sx={{width:'100%'}}>
            <LinearProgress/>
        </Box>):
        (<List sx={{width:'100%',maxWidth:360,bgcolor: 'background.paper'}}>
            {channellist.map((channel,index)=>(
                <ChannelItem key ={index} id={channel.id} name ={channel.name}></ChannelItem>
            ))}
        </List>)
        }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
            <button
                className="sidebar__addChannel text-center mt-3"
                onClick={() => setIsModalOpen(true)}
            >
                ADD ROOM
            </button>
        </div>

        <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
      />
    </div>
  )
}

export default Siderbar
//export default withAuthentication(Siderbar)
