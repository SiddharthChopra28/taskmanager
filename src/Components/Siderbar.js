import React, { useEffect, useState } from 'react'
import withAuthentication from '../utils/withAuthentication'
import { bgcolor, maxWidth, width } from '@mui/system';
import { LinearProgress } from '@mui/material';
import ChannelItem from './ChannelItem';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import axios from 'axios'
 function Siderbar() {
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
    <div className='sidebar'>
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
  )
}

export default Siderbar
//export default withAuthentication(Siderbar)
