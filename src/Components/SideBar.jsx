import React from "react";
import '../styles/SideBar.css';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from "./SidebarChannel";
function SideBar(){
    return(
        <div className="sidebar">
        <div className="sidebar__top">
            <h3>Username</h3>
            <ExpandMoreIcon />
        </div>
        <div className = "siderbar__channels"> 
            <div className = "siderbar__channelsHeader">
                <h4>Text Channel</h4>
            </div>
        </div>
        <div className = "siderbar__channelsList">
            <SidebarChannel />
            <SidebarChannel />
            <SidebarChannel />
            <SidebarChannel />
        </div>
        <div>
            <AddIcon className = "sidebar__addChannel"/>
        </div>
    </div>
    )
}
export default SideBar