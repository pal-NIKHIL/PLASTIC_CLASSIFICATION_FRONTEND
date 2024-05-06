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
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useLocation } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
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
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment-timezone";
import icon from "./assest/icon-01.svg";
function App() {
  const isUserlogin = localStorage.getItem("token");
  const activepath = useLocation().pathname;
  const theme = useTheme();
  const [ismobilescreen, setmobilescreen] = useState(false);
  const drawerWidth = 240;
  const minidrawerWidth = 80;
  const handleDrawerToggle = () => {
    sethoverdrawer(true);
    setmobilescreen(!ismobilescreen);
  };
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [hoverdrawer, sethoverdrawer] = useState(false);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [openinterviewDialog, setopeninterviewDialog] = useState(false);
  const [openreviewDialog, setopenreviewDialog] = useState(false);
  const [openloginDialog, setopenloginDialog] = useState(false);
  const handleReviewDialog = () => setopenreviewDialog(!openreviewDialog);

  const { state, dispatch } = useContext(UserContext);
  const handleStartDateChange = (date) => {
    dispatch({
      type: "UPDATE_DATES",
      payload: { startDate: date, endDate: state.endDate },
    });
  };

  const handleEndDateChange = (date) => {
    dispatch({
      type: "UPDATE_DATES",
      payload: { startDate: state.startDate, endDate: date },
    });
  };

  const drawerItem = [
    {
      title: "HomePage",
      path: "/",
      icon: <FaHome />,
    },
  ];
  const drawer = (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
      width={"100%"}
    >
      {/* <Divider color="white" mt={2} /> */}
      <Stack spacing={4} mt={2} width={"100%"} alignContent={"center"}>
        <img
          src={icon}
          height={"57px"}
          width={"57px"}
          style={{ margin: "auto" }}
        />
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
                  activepath === item.path ? `#d5e6fb` : "transparent",
                borderRight:
                  activepath === item.path
                    ? `5px solid #d5e6fb`
                    : "transparent",

                "&:hover": {
                  borderRight: "5px solid #6aa3fd",
                  backgroundColor: "  #d5e6fb",
                },
                my: 1,
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  color: activepath === item.path ? `#6aa3fd` : "#656671",
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
      </Stack>
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
            p={1}
            sx={{ mr: 2, ml: 0.5, display: { md: "none" } }}
          >
            <HiOutlineBars3 m={1} />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}></Box>

          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction={"row"} spacing={1} p={1}>
                <DatePicker
                  sx={{
                    backgroundColor: "white",
                    padding: 0,
                    margin: 0,
                    width: 180,
                  }}
                  defaultValue={dayjs("2023-01-12")}
                  onChange={handleStartDateChange}
                  timezone="Asia/Kolkata"
                />
                <DatePicker
                  sx={{
                    backgroundColor: "white",
                    padding: 0,
                    width: 180,
                  }}
                  defaultValue={dayjs("2024-01-01")}
                  onChange={handleEndDateChange}
                  timezone="Asia/Kolkata"
                />
              </Stack>
            </LocalizationProvider>
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
              // backgroundColor: theme.background.black,
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
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: hoverdrawer ? drawerWidth : minidrawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              // backgroundColor: theme.background.black,
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
          paddingBlock: 4,
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
