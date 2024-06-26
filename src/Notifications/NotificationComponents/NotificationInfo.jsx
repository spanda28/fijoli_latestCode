
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationData from './NotificationData';
import { List, ListItem, ListItemButton } from '@mui/material';
import getNotifications from '../Actions/getNotifications';

const NotificationInfo = () =>{

    const dispatch      = useDispatch();

    const notificationInfo =  useSelector((state)=> state.storeComponent.notificationInfo);
    const loggedIn_userInfo = useSelector((state)=> state.storeComponent.configData.profileData);

    useEffect(()=>{

        if(loggedIn_userInfo){
            dispatch(getNotifications(loggedIn_userInfo.user_id));
        }

        return(()=>{
            // dispatch(clearfollowersAction());
        })
    },[loggedIn_userInfo]);

    const handleclickEvent = (follower) =>{
    }

    return (
        <div>
            {
                (undefined === notificationInfo)&&
                <NotificationData whatsapp_number = {""} userinfo = {null}/>
            }
            {
                (notificationInfo) &&
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    aria-label="contacts">
                    {
                        notificationInfo.map((notification, index)=>{
                            return <ListItem>
                                        <ListItemButton divider onClick={()=>handleclickEvent(notification)}>
                                            <NotificationData key={index} user_name = {loggedIn_userInfo.user_name}/>
                                        </ListItemButton>
                                   </ListItem>
                        })
                    }
                </List>
            }
        </div>
      )
    
}

export default NotificationInfo