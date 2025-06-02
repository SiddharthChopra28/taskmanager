import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ChannelItem.css'
export default function ChannelItem(props) {
  return (
    <Link to={`/task/${props.channelid}/${Number(props.ownerid == props.userid)}`} className="channel-item-link">
      <ListItem className="channel-item">
        <ListItemAvatar>
          <Avatar className="channel-avatar">
            {props.name ? props.name.charAt(0).toUpperCase() : '#'}
          </Avatar>
        </ListItemAvatar>
        <ListItemText 
          primary={props.name} 
          secondary={props.id}
          className="channel-text"
        />
      </ListItem>
    </Link>
  )
}

