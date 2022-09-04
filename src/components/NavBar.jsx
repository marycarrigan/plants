import { Box, AppBar, Toolbar, Button, ButtonGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LeafIcon from "../icon/LeafIcon.svg";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  icon: {
    maxHeight: "8rem",
  },
  toolbar: {
    color: "white",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const navigate = useNavigate();

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
        <Toolbar>
          <ButtonGroup>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/inventory")}
            >
              Inventory
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/wishlist")}
            >
              Wishlist
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
