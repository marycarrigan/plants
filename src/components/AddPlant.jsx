import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Alert,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { addData, uploadImage } from "../AwsFunctions";

const AddPlant = ({ open, setOpen, refresh }) => {
  const [date, setDate] = useState(null);
  const [name, setName] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [image, setImage] = useState(null);
  
  const clear = () => {
    setDate(null);
    setName(null);
    setImage(null);
    setErrorMessage(null);
    refresh();
  };
  
  const submitPlant = async () => {
    addData("plants", name, date, image.name).then(() => {
      uploadImage(image).then(() => {
        close();
      }).catch(() => {
        setErrorMessage("Error occured when uploading image. Plant has been saved.")
      })
    }).catch(() => {
      setErrorMessage("Error occured when saving plant.");
    })
  };

  const close = () => {
    setOpen(false);
    clear();
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Add Plant</DialogTitle>
      <DialogContent>
        <Box p={1}>
          <TextField
            onChange={(e) => {
              setName(e.target.value);
            }}
            label="Name"
            fullWidth
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box p={1}>
            <DatePicker
              label="Date Acquired"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
        <Button component="label" fullWidth>
          Upload Image
          <input
            type="file"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>
        {image && (
          <Box p={1} justifyContent="center" display="flex">
            <img
              src={URL.createObjectURL(image)}
              style={{ maxWidth: "10rem", maxHeight: "10rem" }}
            />
          </Box>
        )}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={submitPlant}>Add Plant</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlant;
