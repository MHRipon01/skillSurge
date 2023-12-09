import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AuthContext } from "../../Firebase/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";

function ResponsiveAppBar() {
  const { user } = React.useContext(AuthContext);
  const { logOut } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const userName = user?.displayName;
  const email = user?.email

  // const pages = ['Home', 'All Class', 'Teach On SkillSurge'];
  const pages = [
    { text: "Home", onclick: () => navigate("/") },
    { text: "All Class", onclick: () => navigate("/allClasses") },
    {
      text: "Teach On SkillSurge",
      onclick: () => navigate(`/teachOnSkillSurge/${email}`),
    },
  ];
  // const settings = [ userName ,  'Dashboard', 'Logout'];
  const settings = user?.displayName
    ? [
        { text: userName },
        { text: "Dashboard", onclick: () => navigate("/dashboard/roleHome") },
        {
          text: "Logout",
          onclick: () => navigate(logOut()),
        },
      ]
    : [{ text: "Login", onclick: () => navigate("/login") }];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <div className="overflow-x-hidden">
    <AppBar
      position="static"
      className="overflow-x-hidden"
      sx={{ backgroundColor: "#692581" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SkillSurge
          </Typography>

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
              {/* {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))} */}

              <List>
                {pages.map((item, index) => {
                  const { text, onclick } = item;
                  return (
                    <ListItem key={text} onClick={onclick}>
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {/* {pages.map((page) => (
              // <Button
              //   key={page.text}
              //   onClick={handleCloseNavMenu}
              //   sx={{ my: 2, color: "white", display: "block" }}
              // >
              //   {page.text}
              // */}

            <List
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              key={pages}
            >
              {pages.map((item, index) => {
                const { text, onclick } = item;
                return (
                  <ListItem key={text} onClick={onclick}>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>

            {/* ))}  */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <List>
                {settings.map((item, index) => {
                  const { text, onclick } = item;
                  return (
                    <ListItem key={text} onClick={onclick}>
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}

              {/* {settings.map((course, index) => {
    return (
       <MenuItem key={index}>{console.log('check');}</MenuItem>
      )
 })} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
{
  /* </div> */
}
export default ResponsiveAppBar;
