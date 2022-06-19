import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const colors = {
    forecast: location.pathname === "/" ? "primary" : "white",
    prescription: location.pathname === "/model-training" ? "primary" : "white",
    evaluation: location.pathname === "/evaluation" ? "primary" : "white",
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <RouterLink to="/">
                <Button
                  sx={{
                    my: 2,
                    color: colors.forecast,
                    display: "block",
                    fontSize: "18px",
                  }}
                >
                  {"Forecast"}
                </Button>
              </RouterLink>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
              <RouterLink to="/model-training">
                <Button
                  sx={{
                    my: 2,
                    color: colors.prescription,
                    display: "block",
                    fontSize: "18px",
                  }}
                >
                  {"Model Training"}
                </Button>
              </RouterLink>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
              <RouterLink to="/evaluation">
                <Button
                  sx={{
                    my: 2,
                    color: colors.evaluation,
                    display: "block",
                    fontSize: "18px",
                  }}
                >
                  {"Evaluation"}
                </Button>
              </RouterLink>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <RouterLink to="/">
              <Button
                sx={{
                  my: 2,
                  color: colors.forecast,
                  display: "block",
                  fontSize: "24px",
                }}
              >
                {"Forecast"}
              </Button>
            </RouterLink>
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            <RouterLink to="/model-training">
              <Button
                sx={{
                  my: 2,
                  color: colors.prescription,
                  display: "block",
                  fontSize: "24px",
                }}
              >
                {"Model Training"}
              </Button>
            </RouterLink>
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            <RouterLink to="/evaluation">
              <Button
                sx={{
                  my: 2,
                  color: colors.evaluation,
                  display: "block",
                  fontSize: "24px",
                }}
              >
                {"Evaluation"}
              </Button>
            </RouterLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
