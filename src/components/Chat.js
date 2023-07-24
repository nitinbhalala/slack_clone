// import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { selectChannelId, selectchannelName } from '../features/app';
import ChatInput from './ChatInput'
import MessageBox from './MessageBox';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


function Chat() {
  const chatRef = useRef(null);
  const { reloadTime } = useSelector((state) => state.app);
  const ChannelId = useSelector(selectChannelId)
  const ChannelName = useSelector(selectchannelName);
  const [allMessages, setAllMessages] = useState([]);
  const [reloadme, setReloadme] = useState(true)
  const subColRef = collection(db, "channels", ChannelId ? ChannelId : "R6mIEcxbX7F5Yx8qCMu6", "Messages");


  const reload = () => {
    setReloadme(!reloadme)
  }

  useEffect(() => {
    getDocs(subColRef)
      .then(snapshot => {
        let messages = []
        snapshot.docs.forEach(doc => {
          const time = new Date(doc.data().time.toDate()).toUTCString();
          messages.push({ ...doc.data(), id: doc.id, timeStamp: time, seconds: doc.data().time.seconds })
        })
        messages.sort(function (x, y) {
          return x.seconds - y.seconds;
        })
        setAllMessages(messages)
        return messages
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [reloadme, ChannelName, reloadTime])

  return (
    <>
      {ChannelId &&
        <ChatMessages>
          {allMessages.map((messages, index) => {
            const { message, user, time, userImage, timeStamp } = messages;
            return <>
              <MessageBox
                key={index}
                Message={message}
                Timestamp={timeStamp}
                User={user}
                UserImage={userImage}
              />
            </>
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>
      }
      <ChatInput
        key={Math.random()}
        reload={reload}
        chatRef={chatRef}
        channelName={ChannelName}
        channelId={ChannelId}
      />
    </>
  )
}

export default Chat
const ChatMessages = styled.div``

const ChatBottom = styled.div`
  padding-bottom: 200px;
`
