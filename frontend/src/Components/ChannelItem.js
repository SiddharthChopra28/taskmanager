import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
export default function ChannelItem(props) {

    const channelUrl = '/channel/${props.name}'

  return (
    <Link to={channelUrl}>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name} secondary={props.id}></ListItemText>
        </ListItem>
    </Link>
    
  )
}
