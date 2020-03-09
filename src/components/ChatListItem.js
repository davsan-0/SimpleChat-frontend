import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      //margin: "1rem 0"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const ChatListItem = props => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;


    return (
    <div className={classes.root}>
        <CardActionArea>
      <CardContent>
        <Typography variant="h6" component="h2" noWrap>
          {props.chatName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            {props.latestMessage.timestamp} {props.latestMessage.author}: {props.latestMessage.text}
        </Typography>
      </CardContent>
      </CardActionArea>
    </div>
  );
}

export default ChatListItem;