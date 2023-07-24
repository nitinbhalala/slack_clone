import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { db } from '../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { channelList, enterRoom, selectChannelArray } from '../features/app';
import { useDispatch } from 'react-redux';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';


function SidebarOption(props) {
  const dispatch = useDispatch();
  const { title, Icon, addNewChannel, id } = props
  const [channel, setChannel] = useState('');
  const colRef = collection(db, 'channels');
  const ChannelId = useSelector(selectChannelArray);


  const addChannel = async () => {
    const channelName = prompt("Please enter channel name");
    if (channelName) {

      await addDoc(collection(db, "channels"), {
        c_name: channelName
      });

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
    }
  }

  useEffect(() => {
    setChannel(title);
  }, [title])

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({
        channelId: id,
        channelName: channel,
      }))
    }
  }

  const deleteChennel = async () => {
    if (id) {
      try {
        await deleteDoc(doc(db, "channels", id));

        // get data from collection channels
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
        return console.log('deleted');
      } catch (error) {
        return console.log('false', error.message)
      }
    }
  }
  return (
    <div>
      <SideBarOptionContainer
        onClick={addNewChannel ? addChannel : selectChannel}
      >
        {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <SideBarOptionChannel>
            <div>
              <span>#</span>{title}
            </div>
            < DeleteIcon onClick={deleteChennel} fontSize="small" >
            </DeleteIcon>
          </SideBarOptionChannel>)
        }
      </SideBarOptionContainer >
    </div>
  )
}

export default SidebarOption

const SideBarOptionContainer = styled.div`
  display:flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;
const SideBarOptionChannel = styled.h3`
  padding: 10px;
  font-weight: 300;
  display: flex;
  > svg{
    opacity: 0.1;
    margin-left: 20%;
    :hover{
      opacity: 1;
    }
  }
`;