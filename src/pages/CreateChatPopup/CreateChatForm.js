import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { getAllUsers, createNewChat } from "../../api/api";

const useStyles = makeStyles(theme => ({
  createForm: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "white"
    //marginTop: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "10rem"
  }
}));

// For dev purposes
function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const CreateChatForm = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [search, setSearch] = useState("");
  const [usersArr, setUsersArr] = useState([]);
  const [loading, setLoading] = useState(false); //open && options.length === 0;

  const handleNameInputChange = event => {
    setNameInput(event.target.value);
  };

  const handleSearchChange = (event, value) => {
    setSearch(value);
  };

  const handleParticipantsChange = (event, values) => {
    setUsersArr(values);
  };

  const handleSubmit = () => {
    createNewChat(
      nameInput,
      usersArr.map(user => user.id)
    );
  };

  useEffect(() => {
    let active = true;

    if (search !== "" && options.length === 0) {
      setLoading(true);

      (async () => {
        getAllUsers(search).then(response => {
          if (active) {
            setOptions(response.data);
            setLoading(false);
            setOpen(true);
          }
        });
      })();
    } else if (search === "") {
      setOptions([]);
      setLoading(false);
      setOpen(false);
    }

    return () => {
      active = false;
    };
  }, [search]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div className={classes.createForm} ref={ref}>
      <TextField
        id="chat-name"
        label="Name"
        style={{ margin: "2rem", width: "80%" }}
        placeholder="Name of Chat"
        helperText="Optional"
        margin="normal"
        size="medium"
        value={nameInput}
        onChange={handleNameInputChange}
        InputLabelProps={{
          shrink: true,
          style: { fontSize: "1.5rem" }
        }}
        InputProps={{
          style: { fontSize: "1.5rem" }
        }}
        variant="standard"
      />
      <Autocomplete
        id="participants"
        multiple
        open={open}
        value={usersArr}
        onOpen={() => {
          //setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        style={{ marginBottom: "5rem", width: "80%" }}
        getOptionLabel={option => option.name}
        options={options}
        loading={loading}
        noOptionsText="No users found"
        onInputChange={handleSearchChange}
        onChange={handleParticipantsChange}
        selectOnFocus
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            label="Participants"
            variant="standard"
            placeholder="Add User"
            value={search}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: "1.5rem" }
            }}
            InputProps={{
              ...params.InputProps,
              style: { fontSize: "1.5rem" },
              autoComplete: "new-password",
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </>
              )
            }}
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
        startIcon={<AddCircleOutlineIcon />}
      >
        CREATE
      </Button>
    </div>
  );
});

export default CreateChatForm;
