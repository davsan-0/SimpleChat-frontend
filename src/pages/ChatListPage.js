import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import ChatList from '../components/ChatList';
import BottomNavBar from '../components/BottomNavBar';

const useStyles = makeStyles(theme => ({
    fabButton: {
        position: "absolute",
        bottom: theme.spacing(10),
        right: theme.spacing(4),
    }
}));

const ChatListPage = () => {
    const classes = useStyles();

    return (
        <div>
            <Header />
            <ChatList />
            <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                <AddIcon />
            </Fab>
            <BottomNavBar/>
        </div>
    )
}

export default ChatListPage;