import { Avatar, ListItem, ListItemAvatar, ListItemText, Button } from '@mui/material'
import { React, useEffect, } from 'react'
import { Link } from 'react-router-dom'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import axios from 'axios'

import '../styles/ChannelItem.css'


export default function ChannelItem(props) {
    const BASE_URL = "http://127.0.0.1:8000/";
    var joincode = ""

    useEffect(() => {
        const authToken = localStorage.getItem('access');

        if (!authToken) {
            console.error("Missing auth token or user ID");
            return;
        }

        axios.get(`${BASE_URL}rooms/getLink/`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            params: {
                roomid: props.channelid,
                roomname: props.name

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

    function getCode() {
        navigator.clipboard.writeText(joincode);
        alert("Room join code copied to clipboard!")

    }



    return (
        <Link to={`/task/${props.channelid}/${Number(props.ownerid == props.userid)}`} className="channel-item-link">
            <ListItem className="channel-item">
                <ListItemAvatar>
                    <Avatar className="channel-avatar">
                        {props.name ? props.name.charAt(0).toUpperCase() : '#'}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.name}></ListItemText>
                <Button onClick={getCode}><ContentCopyIcon></ContentCopyIcon></Button>

            </ListItem>
        </Link>

    )
}

