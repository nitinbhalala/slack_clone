import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


function Header() {
    const [user] = useAuthState(auth);
    return (
        <>
            <HeaderMain>
                <HeaderLeft>
                    <Tooltip title="Log-Out">

                        <HeaderAvatar
                            onClick={() => { auth.signOut() }}
                            alt={user?.displayName}
                            src={user?.photoURL}
                        />
                    </Tooltip>
                    <AccessTimeIcon />
                </HeaderLeft>
                <HeaderSearch>
                    <SearchIcon />
                    <input placeholder="Search" />
                </HeaderSearch>
                <HeaderRight>
                    <HelpOutlineIcon />
                </HeaderRight>
            </HeaderMain>
        </>
    )
}

export default Header

const HeaderLeft = styled.div`
  flex: 0.4; 
   display: flex;
   align-items: center;
   margin-left: 20px;
   > .MuiSvgIcon-root {
     margin-left: auto;
     margin-right: 20px;
   }
   > svg{
    cursor: pointer;;
   }
`;
const HeaderMain = styled.div`
    display: flex;
   width: 100%;
   align-items: center;
   justify-content: space-between;
   padding:10px 0;
   background-color: var(--slack-color);
   color: white;
   background-color: #421f44 ;
`;
const HeaderAvatar = styled(Avatar)`
cursor: pointer;
:hover {
  opacity: 0.5;
}
`;

const HeaderSearch = styled.div`
   display: flex;
   flex:0.4;
   opacity: 1;
   border-radius: 6px;
   background-color: #421f44;
   text-align: center;
   padding: 0 50px;
   color: white;
   border: 1px gray solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw; 
    outline: 0;
    color: white;
    }
`;

const HeaderRight = styled.div`
    flex:0.3;
   display: flex;
   align-items: flex-end;
   > .MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 20px;
   }
   > svg{
    cursor: pointer;;
   }
` 