import { Box, AppBar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LeafIcon from "../icon/LeafIcon.svg";
import AddPlant from "./AddPlant";
import { useState, useEffect } from "react";
import PlantsTable from "./PlantsTable";
import { fetchData } from "../AwsFunctions";

const useStyles = makeStyles((theme) => ({
  icon: {
    maxHeight: "8rem",
  },
}));


const Home = () => {
  const classes = useStyles();
  const [addPlant, setAddPlant] = useState(false);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    fetchData("plants").then((items) => {
      setPlants(items);
    });
  }

  return (
    <>
      <AppBar color="primary" position="relative">
        <Box display="flex" alignItems="center">
          <Box p={1}>
            <img src={LeafIcon} alt="icon" className={classes.icon} />
          </Box>
          <Box fontWeight="fontWeightBold" fontSize="3rem">
            PLANTS
          </Box>
        </Box>
        <Button color="secondary" onClick={() => setAddPlant(true)}>Add Plant</Button>
        <Box>
          Total Plants: {plants.length}
        </Box>
      </AppBar>
      <AddPlant open={addPlant} setOpen={setAddPlant} refresh={refresh}/>
      <PlantsTable refresh={refresh} plants={plants}/>
    </>
  );
};

export default Home;
