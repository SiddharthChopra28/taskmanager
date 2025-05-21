import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
export default function ChannelItem(props) {


  return (
    <a href={`/task/${props.channelid}/${Number(props.ownerid == props.userid)}`}>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name} secondary={props.id}></ListItemText>
        </ListItem>
    </a>
    
  )
}
