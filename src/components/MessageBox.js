import React from 'react'
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../features/app';

function MessageBox(props) {
    const { Message, Timestamp, User, UserImage } = props;
    // const ChannelId = useSelector(selectChannelId);

    // const deleteMessage = async () => {
    //     try {
    //         const docRef = doc(db, "channels", ChannelId, 'messages');
    //         console.log(docRef)
    //         deleteDoc(docRef)
    //             .then(() => {
    //                 console.log("deleted")
    //             })
    //         console.log("deleted");
    //     } catch (error) {
    //         console.log(error)
    //     }

    // deleteDoc(docRef)
    //     .then(() => {
    //         deleteBookForm.reset()
    //     })
    // }
    return (
        <>
            <MessageContainer>
                <img src={UserImage} alt="" />
                <MessageInfo>
                    <h4>
                        {User}&nbsp;&nbsp;&nbsp;&nbsp;
                        <strong>
                            {Timestamp}
                        </strong>
                    </h4>
                    <p>{Message}
                        {/* <DeleteIConection>
                            < DeleteIcon onClick={deleteMessage} fontSize="small" >
                            </DeleteIcon>
                        </DeleteIConection> */}
                    </p>
                </MessageInfo>
            </MessageContainer>
            <br />
        </>
    )
}

export default MessageBox

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  >img {
    height: 50px;
    border-radius: 8px;
  }
`
const MessageInfo = styled.div`
  padding-left: 10px;
  >h4{
    color: #c6b8b8;
    font-weight: 400;
    margin-left: 4px;
    font-size: 15px;
    >strong{
        color: black;
        font-size: 10px;
    }
 }
`
// const DeleteIConection = styled.span`
//     margin-left: 90%;
//     color: #c6b8b8;
//     opacity: 0.5;
//     :hover{
//         opacity: 1;
//         color: black;
//     }
// ` 