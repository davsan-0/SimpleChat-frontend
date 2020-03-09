import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import ChatListItem from './ChatListItem';

const useStyles = makeStyles({
    root: {
      
    },
    noChatText: {
        color: "rgba(200, 200, 200, 1)",
        fontSize: "1.5rem",
        textAlign: "center",
        marginTop: "2rem",
        fontStyle: "italic"
    }
});

const ChatList = () => {
    const classes = useStyles();

    let arr = [<ChatListItem chatName="Chat1" latestMessage={{author: "David", timestamp:"19:05", text:"Hej"}}/>, <ChatListItem chatName="Chat2" latestMessage={{author: "Njetski Baretski", timestamp:"11:33", text:"Nej"}}/>, <ChatListItem chatName="Chat3" latestMessage={{author: "Crab", timestamp:"18:35", text:"Craab"}}/>];
    arr = arr.map((el, i) => {
        if (i === arr.length - 1) {
            return el;
        }
        return <div>{el}<Divider variant="middle"/></div>;
    });

    console.log(arr);
    arr = [];

    return <div className={classes.root}>{(arr.length > 0 && arr) || <div className={classes.noChatText}>No chats available.<br/>Click the + to start a new chat.</div>}</div>;
}

export default ChatList;