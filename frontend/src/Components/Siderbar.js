import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import withAuthentication from '../utils/withAuthentication'
import { bgcolor, maxWidth, width } from '@mui/system';
import { Button, LinearProgress } from '@mui/material';
import ChannelItem from './ChannelItem';
import '../styles/Sidebar.css';
import Modal from './Modal';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import axios from 'axios'
import ToggleButton from './ToggleButton';
var userid = 0

 function Siderbar() {
    const BASE_URL = "http://127.0.0.1:8000/";
    const [channellist,setchannellist] = useState([])
    const [channelloader,setchannelloader] = useState(true)
    const getAuthToken = () => localStorage.getItem('access');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
    const authToken = localStorage.getItem('access');

    if (!authToken) {
        console.error("Missing auth token or user ID");
        return;
    }

    axios.get(`${BASE_URL}rooms/byUser/`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(response => {
        const rooms = response.data;
        setchannellist(rooms); // response.data should be the list of room objects
        localStorage.setItem('rooms', JSON.stringify(rooms));
        setchannelloader(false);
    })
    .catch(error => {
        console.error("Error fetching rooms:", error);
        setchannelloader(false);
    });
}, []);

    fetch(`${BASE_URL}auth/getID`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify({'email': localStorage.getItem('email')})
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                var data =  response.json()
            }
            return data
        })
        .then(data =>{
            userid = data['id']
        })
        .catch(error =>{
            console.log(error);
        })



   const handleCreateRoom = (roomName) => {
        setIsModalOpen(false);
        const authToken = localStorage.getItem('access');

        if (!authToken ) {
            console.error("Missing auth token or user ID");
            return;
        }

        axios.post(`${BASE_URL}rooms/createRoom/`, {
            name: roomName,
        }, {
            headers: {
            Authorization: `Bearer ${authToken}`,
            }
        })
        .then(response => {
            console.log("Room created with join code:", response.data.joincode);
            navigator.clipboard.writeText(response.data.joincode); // copy code to clipboardddd
            alert("Room join code copied to clipboard!")
            return axios.get(`${BASE_URL}rooms/byUser/`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
            })
            .then(response => {
                setchannellist(response.data);
            })
        .catch(error => {
            console.error("Error creating room:", error);
        });
};

  const handleJoinRoom = (joinCode) => {
    setIsModalOpen(false);

    const authToken = localStorage.getItem('access');

    if (!authToken ) {
        console.error("Missing auth token or user ID");
        return;
    }

    axios.post(`${BASE_URL}rooms/join/`, {
        hash: joinCode
    }, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (response.status === 201) {
            console.log("Successfully joined room");

            // Optionally refresh the room list
            axios.get(`${BASE_URL}rooms/byUser/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(res => {
                setchannellist(res.data);
                alert("Successfully joined room!");
            });

        } else {
            console.warn("Unexpected response:", response);
        }
    })
    .catch(error => {
        console.error("Error joining room:", error.response?.data || error.message);
        alert("Failed to join room. Please check the join code.");
    });
};


  return (
    <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }} className="sidebar__top" >
            <h3>CHANNELS</h3>
        </div>
        <div className = "siderbar__channels "> 
            <div className = "siderbar__channelsHeader justify-content-center text-center">
                <ToggleButton />
            </div>
        </div>
        <div className = "siderbar__channelsList ">
            {channelloader ? (<Box sx={{width:'100%'}}> 
            <LinearProgress/>
        </Box>):
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {channellist.map((channel, index) => (
                // 
                <ChannelItem key={index} ownerid={channel.owner} name={channel.name} userid={userid} channelid = {channel.roomid}/>
                

            ))}
        </List>
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

// export default Siderbar
export default withAuthentication(Siderbar)