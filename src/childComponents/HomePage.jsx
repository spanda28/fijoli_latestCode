

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./HomePage.css";
import HomePageHeaderComponent from './HomePageHeaderComponent';
import MenuComponent from './MenuComponent';
import PostComponent from './PostComponent';
import FijoliItems from "./FijoliItems";
import SelfProfile from '../Profile/SelfProfile';
import EnumNavigate from '../singletonControllers/NavigateController';
import navigateItem from '../actions/navigateItemAction';
import PostContainer from '../PostCommentComponents/PostContainer';
import BlockUserContainer from '../blockusercomponents/BlockUserContainer';
import FollowersContainer from '../Follow/FollowerComponents/FollowersContainer';
import FollowingContainer from '../Follow/FollowingComponents/FollowingContainer';
import SearchpostContainer from '../SearchPosts/SearchPostComponents/SearchpostContainer';
import clearErrorMessageAction from '../actions/clearErrorMessageAction';
import DisplayMessage from '../DisplayMessageComponent/DisplayMessage';
import actionloginUser from '../actions/actionloginUser';


const HomePage = () => {

  const dispatch = useDispatch();
  const [displaymsg, setdisplaymsg] = useState({});


  const lstofItems = useSelector(state => state.storeComponent.configData.postItems);
  const navigateItemtype = useSelector((state) => state.storeComponent.navigateItemType);
  const loggedInUserInfo = useSelector((state) => state.storeComponent.configData.profileData);
  const errormsgstate = useSelector(state => state.storeComponent.errormsg);

  useEffect(() => {
    if (errormsgstate) {
      setdisplaymsg({ "open": true, "msg": errormsgstate.errormsg });
    }
  }, [errormsgstate]);

  useEffect(() => {
    // dispatch({type: "getFijoliItems"});
    dispatch(navigateItem(EnumNavigate.homepageState));
  }, []);

  useEffect(()=>{
    if(lstofItems === undefined){
      let loginData = {};
      loginData["whatsapp_number"] = localStorage.getItem("whatsapp_number");
      loginData["encrypted_password"] = localStorage.getItem("code");
      dispatch(actionloginUser(loginData));
    }
  },[lstofItems, dispatch]);

  const createUserinfo = (loggedInUser) => {
    if (loggedInUser) {
      return {
        "user_id": loggedInUser.user_id,
        "whatsapp_number": loggedInUser.whatsapp_number
      }
    }
  }

  const [menutoggle, setMenuToggle] = useState(false);
  const onMenuToggle = (flag=false)=>{
    setMenuToggle(flag);
  }

  const userinfo = useMemo(() => createUserinfo(loggedInUserInfo), [loggedInUserInfo]);

  const handlecloseDisplayMsg = () => {
    setdisplaymsg({ "open": false, "msg": "" });
    dispatch(clearErrorMessageAction());
  }

  return (
    <div className='desk-col relative'>
      <HomePageHeaderComponent userinfo={userinfo} menutoggle={menutoggle} onMenuToggle={onMenuToggle} />
      <MenuComponent onMenuToggle={onMenuToggle} menutoggle={menutoggle} />
      <>
        {
          (navigateItemtype === EnumNavigate.postState) &&
          <PostComponent />
        }
      </>
      <>
        {
          (()=>{
            var canshow = (navigateItemtype === EnumNavigate.homepageState);
            if(!canshow){
              return "";
            }
            return Object.keys(lstofItems||[]).map((item, index) => {
              return (
                <div className="">
                  <FijoliItems key={index} categoryName={item} data={lstofItems[item]} ></FijoliItems>
                </div>
              )
            })
          })()
        }
      </>
      <>
        {
          (navigateItemtype === EnumNavigate.profileState) &&
          <SelfProfile />
        }
      </>
      <>
        {
          (navigateItemtype === EnumNavigate.postContainer) &&
          <PostContainer />
        }
      </>
      <>
        {
          (navigateItemtype === EnumNavigate.blockusers) &&
          <BlockUserContainer logged_in_user_id={loggedInUserInfo.user_id} />
        }
      </>
      <>
        {
          (navigateItemtype === EnumNavigate.followers) &&
          <FollowersContainer />
        }
      </>
      <>
        {
          (navigateItemtype === EnumNavigate.following) &&
          <FollowingContainer />
        }
      </>
      <>
        {
          (navigateItemtype === EnumNavigate.searchposts) &&
          <SearchpostContainer user_id={loggedInUserInfo.user_id} />
        }
      </>
      {
        <DisplayMessage displayState={displaymsg} handleclose={handlecloseDisplayMsg} />
      }
    </div>
  )
}

export default HomePage;
