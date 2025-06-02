import { Avatar, ListItem, ListItemAvatar, ListItemText, Button } from '@mui/material'
import {React, useEffect, } from 'react'
import { Link } from 'react-router-dom'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios'


export default function ChannelItem(props) {
    const BASE_URL = "http://127.0.0.1:8000/";
    var joincode = ""

    useEffect(() => {
        const authToken = localStorage.getItem('access');

        if (!authToken ) {
            console.error("Missing auth token or user ID");
            return;
        }

        axios.get(`${BASE_URL}rooms/getLink/`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            params: {
                roomid: props.channelid,
                roomanme: props.name
                
            }
        })
        .then(response => {
            const data = response.data;

            joincode = data['joincode']
            
            
        })
        .catch(error => {
            console.error("Error fetching rooms:", error);

        });
    }, []);

    function getCode(){
        navigator.clipboard.writeText(joincode); 
        alert("Room join code copied to clipboard!")

    }
    


  return (
    <a href={`/task/${props.channelid}/${Number(props.ownerid == props.userid)}`}>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name} secondary={props.channelid}></ListItemText>
            <Button onClick={getCode}><ContentCopyIcon></ContentCopyIcon></Button>
        </ListItem>
    </a>
    
  )
}
