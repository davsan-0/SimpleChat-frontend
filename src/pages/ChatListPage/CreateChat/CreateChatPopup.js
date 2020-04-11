import React from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";

import CreateChatForm from "./CreateChatForm";

const CreateChatPopup = (props) => {
  return (
    <Slide direction="up" in={props.in} mountOnEnter unmountOnExit>
      <CreateChatForm onCreate={props.onCreate} />
    </Slide>
  );
};

CreateChatPopup.propTypes = {
  in: PropTypes.bool,
  onCreate: PropTypes.func,
};

export default CreateChatPopup;
