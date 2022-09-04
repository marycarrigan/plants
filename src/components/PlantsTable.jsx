import {
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { deleteData, fetchData } from "../AwsFunctions";
import PlantDialog from "./PlantDialog";
import { useState, useEffect } from "react";

const PlantsTable = () => {
  const [addPlant, setAddPlant] = useState(false);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    fetchData("plants").then((items) => {
      setPlants(items);
    });
  };

  const [editOpen, setEditOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const deletePlant = (id) => {
    deleteData(id).then(() => {
      refresh();
    });
  };

  const editPlant = (plant) => {
    setEditOpen(true);
    setSelectedPlant(plant);
  };

  return (
    <>
      {plants.length === 0 && (
        <Box display="flex" justifyContent="center" p={20}>
          <CircularProgress />
        </Box>
      )}
      {plants.length > 0 && (
        <>
          <PlantDialog
            type={"Add"}
            open={addPlant}
            setOpen={setAddPlant}
            refresh={refresh}
          />
          <Button color="secondary" onClick={() => setAddPlant(true)}>
            Add Plant
          </Button>
          <Box px={2}>Total Plants: {plants.length}</Box>
          <PlantDialog
            type={"Edit"}
            open={editOpen}
            setOpen={setEditOpen}
            refresh={refresh}
            plant={selectedPlant}
          />
          {plants?.map((plant) => (
            <Card key={plant.id}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" justifyContent="flex-start">
                    {plant.image && (
                      <Box pr={2}>
                        <img
                          src={`https://plants-carrigan.s3.amazonaws.com/images/${plant.image}`}
                          style={{ maxWidth: "8rem", maxHeight: "8rem" }}
                          alt={plant.name}
                        />
                      </Box>
                    )}
                    <Box>
                      <Box fontWeight="fontWeightBold" py={1}>
                        {plant.name}
                      </Box>
                      {plant.date && (
                        <Box fontSize=".75rem">Date Acquired: {plant.date}</Box>
                      )}
                    </Box>
                  </Box>
                  <Box flex-direction="column" display="flex">
                    <Button onClick={() => editPlant(plant)}>Edit</Button>
                    <Button
                      onClick={() => {
                        deletePlant(plant.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default PlantsTable;
