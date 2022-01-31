import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { addData, editData } from "../AwsFunctions";

const PlantDialog = ({ open, setOpen, refresh, type, plant }) => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const clear = () => {
    setDate("");
    setName("");
    setImage(null);
    setErrorMessage(null);
    refresh();
  };

  const submitPlant = async () => {
    setLoading(true);
    const submitFunction = type === "Edit" ? editData : addData;
    submitFunction(name, date, image)
      .then(() => {
        close();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrorMessage("Error occured when saving plant.");
      });
  };

  const close = () => {
    setOpen(false);
    clear();
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{type === "Edit" ? "Edit Plant" : "Add Plant"}</DialogTitle>
      <DialogContent>
        {loading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <>
            <Box p={1}>
              <TextField
                onChange={(e) => {
                  setName(e.target.value);
                }}
                label="Name"
                defaultValue={plant?.name}
                fullWidth
              />
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box p={1}>
                <DatePicker
                  label="Date Acquired"
                  defaultValue={plant?.date}
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
                  alt={name}
                />
              </Box>
            )}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={submitPlant}>
          Save Plant
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlantDialog;
