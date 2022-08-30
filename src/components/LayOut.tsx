import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet } from "react-router-dom";
import MenuAccordion from "./MenuAccordion";
import { menuController } from "../utils/menuController";
import { Icon, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ImageAvatars from "./Avatar";
import BadgeNotification from "./Badge";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowY: "visible",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowY: "visible",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function LayOut() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          left: open ? 0 : "65px",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
        >
          <BadgeNotification />
          <ImageAvatars />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          backgroundColor: "#203764",
          overflowX: "none",
        }}
      >
        <DrawerHeader
          sx={{
            backgroundColor: "#203764",
            position: "relative",
            display: "flex",
            justifyContent: "start",
            paddingLeft: "16px",
          }}
        >
          <IconButton
            size={"small"}
            color={"primary"}
            onClick={() => setOpen(!open)}
            sx={{
              background: "#DEBB3E",
              position: "absolute",
              border: "3px lightgray solid",
              right: "-20px",
              "&:hover": {
                background: "white",
              },
            }}
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Stack
          sx={{
            backgroundColor: "#203764",
            width: "100%",
            paddingLeft: "16px",
            paddingBottom: "44px",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          <ImageAvatars />
          <Typography style={{ color: "white", paddingLeft: "16px" }} mt={2}>
            user
          </Typography>
        </Stack>
        <MenuAccordion open={open} />

        <List
          sx={{
            backgroundColor: "#203764",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {menuController[1].paginas?.map((text, index) => (
            <ListItem
              key={text.pageName}
              disablePadding
              sx={{ display: "block", color: "white" }}
            >
              <Link component={RouterLink} to={text.url}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "white",
                  }}
                >
                  <ListItemIcon
                    children={<Icon children={text.icon} />}
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  />
                  <ListItemText
                    primary={text.pageName}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
