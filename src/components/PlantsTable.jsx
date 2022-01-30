import { Card, CardContent, Button, Box } from "@mui/material";
import { deleteData } from "../AwsFunctions";

const PlantsTable = ({ plants, refresh }) => {
  const deletePlant = (id) => {
    deleteData("plants", id).then(() => {
      refresh();
    });
  };

  return (
    <>
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
                  <Box fontSize=".75rem">
                    Date Acquired: {plant.date ? plant.date : "Unknown"}
                  </Box>
                </Box>
              </Box>

              <Box>
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
  );
};

export default PlantsTable;
