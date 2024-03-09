import { Route, Routes } from "react-router-dom";
import {
  CssBaseline,
  Box,
  AppBar,
  Stack,
  Typography,
  Drawer,
  IconButton,
  ButtonBase,
  Toolbar,
  Divider,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  alpha,
  Avatar,
  Card,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineBars3,
  HiUserCircle,
} from "react-icons/hi2";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./store/usercontext";
import { FaBuilding, FaBriefcase } from "react-icons/fa";
import HomePage from "./scenes/homePage";
function App() {
  const isUserlogin = localStorage.getItem("token");
  const activepath = useLocation().pathname;
  const theme = useTheme();
  const [ismobilescreen, setmobilescreen] = useState(false);
  const drawerWidth = 240;
  const minidrawerWidth = 80;

  const { handlelogin, state, handlelogout } = useContext(UserContext);
  const handleDrawerToggle = () => {
    sethoverdrawer(true);
    setmobilescreen(!ismobilescreen);
  };

  const [hoverdrawer, sethoverdrawer] = useState(false);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [openinterviewDialog, setopeninterviewDialog] = useState(false);
  const [openreviewDialog, setopenreviewDialog] = useState(false);
  const [openloginDialog, setopenloginDialog] = useState(false);
  const handleReviewDialog = () => setopenreviewDialog(!openreviewDialog);
  const drawerItem = [
    {
      title: "HomePage",
      path: "/",
      icon: <FaHome />,
    },
    {
      title: "Interview",
      path: "/interview-experience",
      icon: <FaBriefcase />,
    },
    {
      title: "Campus Life",
      path: "/campus-experience",
      icon: <FaBuilding />,
    },
  ];
  const drawer = (
    <Box
      display={"flex"}
      flexDirection={"column"}
      color="white"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        maxWidth: { drawerWidth },
      }}
      my={2}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems="center"
        width={"100%"}
      >
        {!hoverdrawer && <Toolbar />}
        <Divider color="white" mt={2} />
        <Stack spacing={4} mt={2} justifyContent={"center"} width={"100%"}>
          {drawerItem.map((item) => {
            return (
              <ButtonBase
                width="100%"
                component={Link}
                to={item.path}
                onClick={() => {
                  if (ismobilescreen) {
                    setmobilescreen(false);
                  }
                }}
                sx={{
                  justifyContent: hoverdrawer ? "start" : "center",
                  borderRadius: "0px",
                  color: activepath === item.path ? `white` : "#656671",
                  backgroundColor:
                    activepath === item.path ? `#241f35` : "transparent",
                  borderRight:
                    activepath === item.path
                      ? `5px solid #7e60e3`
                      : "transparent",

                  "&:hover": {
                    borderRight: "5px solid #7e60e3",
                    backgroundColor: "#241f35",
                  },
                  my: 1,
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    color: activepath === item.path ? `white` : "#656671",
                  }}
                  spacing={2}
                  m={2}
                >
                  {item.icon}
                  {hoverdrawer && (
                    <Typography
                      variant="subtitle1"
                      color={activepath === item.path ? `white` : "#656671"}
                    >
                      {item.title}
                    </Typography>
                  )}
                </Stack>
              </ButtonBase>
            );
          })}
          <Button
            onClick={() => {
              window.location.reload();
              localStorage.removeItem("token");
              handlelogout();
            }}
            width="100%"
            sx={{
              justifyContent: hoverdrawer ? "start" : "center",
              borderRadius: "0px",
              color: "#656671",
              backgroundColor: "transparent",
              borderRight: "transparent",

              "&:hover": {
                borderRight: "5px solid #7e60e3",
                backgroundColor: "#241f35",
              },
              my: 1,
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                color: "#656671",
              }}
              spacing={2}
              m={1}
            >
              <TbLogout2 size={22} />
              {hoverdrawer && (
                <Typography variant="subtitle1" color={"#656671"}>
                  Logout
                </Typography>
              )}
            </Stack>
          </Button>
        </Stack>
      </Box>
      {hoverdrawer && (
        <Box>
          <Stack textAlign={"center"}>
            <Typography variant="subtitle2">Join the community</Typography>
            <Typography variant="subtitle2">and find out more</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );

  return (
    <Box display={"flex"} bgcolor={"#fefefe"}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: `calc(100% - ${hoverdrawer ? drawerWidth : minidrawerWidth}px)`,
          },
          ml: { md: `${hoverdrawer ? drawerWidth : minidrawerWidth}px` },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          backdropFilter: "blur(6px)",
          color: "black",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingRight={1}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <HiOutlineBars3 />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}></Box>

          <Box>
            <Stack direction={"row"} spacing={1} p={1}>
              <Avatar />
              <Stack spacing={0.1}>
                <Typography variant="caption">Nikhil Pal</Typography>
                <Typography variant="caption">po7508@srmist.edu.in</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: hoverdrawer ? drawerWidth : minidrawerWidth },
          flexShrink: { md: 0 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={ismobilescreen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: theme.background.black,
              backdropFilter: "blur(6px)",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          onMouseEnter={() => sethoverdrawer(!hoverdrawer)}
          onMouseLeave={() => sethoverdrawer(!hoverdrawer)}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: hoverdrawer ? drawerWidth : minidrawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: theme.background.black,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f0f8ff",
          paddingBlock: 3,
          paddingInline: 2,
          mt: 7,
          mx: 0.5,
          width: {
            md: `calc(100% - ${hoverdrawer ? drawerWidth : minidrawerWidth}px)`,
          },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
