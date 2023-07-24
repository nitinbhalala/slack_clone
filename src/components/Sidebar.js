import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ModeIcon from '@mui/icons-material/Mode';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import SidebarOption from './SidebarOption';
import MessageIcon from '@mui/icons-material/Message';
import { auth, db } from '../firebase';
import CollectionsIcon from '@mui/icons-material/Collections';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupIcon from '@mui/icons-material/Group';
import AppsIcon from '@mui/icons-material/Apps';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Tooltip } from '@mui/material';
import { channelList, selectChannelArray } from '../features/app';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';


function Sidebar() {
  const [user] = useAuthState(auth);
  const ChannelId = useSelector(selectChannelArray);
  const colRef = collection(db, 'channels');
  const dispatch = useDispatch();


  useEffect(() => {
    getDocs(colRef)
      .then(snapshot => {
        let chennels = []
        snapshot.docs.forEach(doc => {
          chennels.push({ ...doc.data(), id: doc.id })
        })
        dispatch(channelList({
          ChannelArray: chennels
        }))
        return chennels
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])


  const sidebarData = [
    {
      "icon": MessageIcon,
      "title": "Threads"
    },
    {
      "icon": CollectionsIcon,
      "title": "Collections"
    },
    {
      "icon": BookmarkIcon,
      "title": "Channel browser"
    },
    {
      "icon": GroupIcon,
      "title": "People and user groups"
    },
    {
      "icon": AppsIcon,
      "title": "Apps"
    },
    {
      "icon": InsertDriveFileIcon,
      "title": "file browser"
    },
  ]
  return (
    <>
      <SidebarMain>
        <SideBarHeader>
          <SideBarInfo>
            <h2> Slack-clone</h2>
            <h3>
              <Brightness1Icon />
              {user.displayName}
            </h3>
          </SideBarInfo>
          <Tooltip title={user.displayName}>
            <ModeIcon />
          </Tooltip>
        </SideBarHeader>

        {
          sidebarData.map((metadata, index) => {
            return <SidebarOption key={index} Icon={metadata.icon} title={metadata.title} />
          })
        }

        <SidebarOption Icon={ExpandLessIcon} title="Show less" />
        <hr />
        <SidebarOption addNewChannel Icon={AddIcon} title="AddChannels" />
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title="Show more" />
        { // return length === 2 && <SidebarOption key={dataItem.id} id={dataItem.id} title={dataItem.c_name} />
          ChannelId &&
          ChannelId.map((dataItem, index) => {
            return <SidebarOption key={index} id={dataItem.id} title={dataItem.c_name} />
          })
        }
      </SidebarMain>
    </>
  )
}

export default Sidebar

const SidebarMain = styled.div`
background-color: #421f44;
   color: white;
   flex: 0.3;
   border-top: 1px solid #704973;
   max-width: 260px;
   >hr {
     margin-top: 10px;
     margin-bottom: 10px;
     border: 1px solid #675668;
   }
`
const SideBarHeader = styled.div`
   display: flex;
   border-bottom: 1px solid #49274b;
   border-bottom: 10px;
   padding: 13px;

   >.MuiSvgIcon-root {
      padding: 8px;
      color: #49274b;
      font-size: 18px;
      background-color: white;
      border-radius: 999px;
      cursor: pointer;
      margin-top: 10%;
      :hover{
        opacity: 0.5;
      }
   }
`

const SideBarInfo = styled.div`
  flex: 1;
  > h2 {
    margin-right: 50%;
    font-size: 15px;
    font-weight: 900;
    text-align: center;
  }

  > h3 {
    display: flex;
    font-weight: 400;
    font-size: 13px;
    align-items: center;
    color: white;
  }

  >h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`