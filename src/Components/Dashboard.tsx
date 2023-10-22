import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useLocation, useParams } from "react-router-dom";
// import Badge from "@mui/material/Badge";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Button from "@mui/material/Button";
import {
  mainListItems,
  secondaryListItems,
} from "./dashboardUtils/listItems.tsx";
// import Chart from "./dashboardUtils/Chart.tsx";
// import Deposits from "./dashboardUtils/Deposits.tsx";
// import Orders from "./dashboardUtils/Orders.tsx";
import AccountMenu from "./dashboardUtils/AccountMenu.tsx";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonBase,
  // ButtonBase,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  // FormControl,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "./redux/Action.js";
import {
  CreateCompany,
  GetAllCompanys,
  GetCompanybycode,
  RemoveCompany,
  UpdateCompany,
} from "./redux/ActionCreater.js";
import SignUp from "./SignUp.jsx";
import { Toast } from "react-bootstrap";
// or
// import { FormControlLabel } from '@mui/material';
// import {FormControlLabel} from "@mui/material";
// import { Modal } from "react-bootstrap";
// import AddForm from "./AddForm.tsx";

// function Copyright(props: any) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const drawerWidth: number = 240;

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
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Dashboard(props: any) {
  const [open, setOpen] = React.useState(true);

  const userNeedsToSignIn = localStorage.getItem("user_creds_details");
  const AuthUser = JSON.parse(userNeedsToSignIn);
  console.log(AuthUser);
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "address", name: "Address" },
    { id: "type", name: "Company Type" },
    { id: "action", name: "Action" },
  ];

  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(true);
  const [show, setShow] = React.useState(false);

  const [id, idchange] = useState(0);
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [address, addresschange] = useState("");
  const [type, typechange] = useState("MNC");
  const [opened, openchange] = useState(false);
  const [agreeterm, agreetermchange] = useState(true);

  const [rowperpage, rowperpagechange] = useState(5);
  const [page, pagechange] = useState(0);

  const [isedit, iseditchange] = useState(false);
  const [title, titlechange] = useState("Create company");

  const editobj = useSelector((state: any) => state.company.companyobj);

  useEffect(() => {
    if (Object.keys(editobj).length > 0) {
      idchange(editobj.id);
      namechange(editobj.name);
      emailchange(editobj.email);
      phonechange(editobj.phone);
      addresschange(editobj.Address);
      typechange(editobj.type);
    } else {
      clearstate();
    }
  }, [editobj]);

  const handlepagechange = (event: any, newpage: any) => {
    pagechange(newpage);
  };

  const handlerowperpagechange = (event: any) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  const functionadd = () => {
    iseditchange(false);
    titlechange("Create company");
    openpopup();
  };
  const closepopup = () => {
    openchange(false);
  };
  const openpopup = () => {
    openchange(true);
    clearstate();
    dispatch(OpenPopup());
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    const _obj = { id, name, email, phone, Address: address, type };
    if (isedit) {
      dispatch(UpdateCompany(_obj));
    } else {
      dispatch(CreateCompany(_obj));
    }
    closepopup();
  };

  const handleEdit = (code) => {
    iseditchange(true);
    titlechange("Update company");
    openchange(true);
    dispatch(GetCompanybycode(code));
  };

  const handleRemove = (code) => {
    if (window.confirm("Do you want to remove?")) {
      dispatch(RemoveCompany(code));
    }
  };

  const clearstate = () => {
    idchange(0);
    namechange("");
    emailchange("");
    phonechange("");
    addresschange("");
    typechange("MNC");
  };
  useEffect(() => {
    props.loadcompany();
  }, []);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // ---------------------------------------------------

  return (
    <>
      {AuthUser?.length >= 0 ? (
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* Dashboard Header */}
            <AppBar
              position="absolute"
              open={open}
              style={{ backgroundColor: "#072a66" }}
            >
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Client Dashboard
                </Typography>
                <IconButton color="inherit">
                  <AccountMenu />
                  {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
                </IconButton>
              </Toolbar>
            </AppBar>
            {/* Complete Sidebar */}
            <Drawer
              variant="permanent"
              open={open}
              style={{ borderRight: "2px solid gray" }}
            >
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
                style={{ backgroundColor: "#072a66" }}
              >
                <Typography variant="h4" color="initial">
                  <img
                    src="https://www.mandsconsulting.com/wp-content/uploads/MS-Logo-Web-H-500x164-White-White.svg"
                    alt=""
                    width="50%"
                  />
                </Typography>
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon style={{ color: "#fff" }} />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                <React.Fragment>
                  <ListItemButton component={Link} to="/dashboard">
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Clients" />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/projects">
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                  </ListItemButton>
                </React.Fragment>
              </List>
            </Drawer>
            {/* Main Div */}
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
              // style={{ border: "2px solid red" }}
            >
              <Toolbar />
              {/* Innder Main Div Container */}
              {props.companystate.isloading ? (
                "Loading....."
              ) : props.companystate.errormessage ? (
                <h2>{props.companystate.errormessage}</h2>
              ) : (
                <div>
                  <Paper sx={{ margin: "1%" }}>
                    <div style={{ margin: "1%" }}>
                      <Button onClick={functionadd} variant="contained">
                        Add New (+)
                      </Button>
                    </div>
                    <div style={{ margin: "1%" }}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow
                              style={{ backgroundColor: "midnightblue" }}
                            >
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  style={{ color: "white" }}
                                >
                                  {column.name}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {props.companystate.companylist &&
                              props.companystate.companylist
                                .slice(
                                  page * rowperpage,
                                  page * rowperpage + rowperpage
                                )
                                .map((row, i) => {
                                  return (
                                    <TableRow key={i}>
                                      <TableCell>{row.id}</TableCell>
                                      <TableCell>{row.name}</TableCell>
                                      <TableCell>{row.email}</TableCell>
                                      <TableCell>{row.phone}</TableCell>
                                      <TableCell>{row.Address}</TableCell>
                                      <TableCell>{row.type}</TableCell>
                                      <TableCell>
                                        <Button
                                          onClick={(e) => {
                                            handleEdit(row.id);
                                          }}
                                          variant="contained"
                                          color="primary"
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          onClick={(e) => {
                                            handleRemove(row.id);
                                          }}
                                          variant="contained"
                                          color="error"
                                        >
                                          Delete
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[2, 5, 10, 20]}
                        rowsPerPage={rowperpage}
                        page={page}
                        count={props.companystate.companylist.length}
                        component={"div"}
                        onPageChange={handlepagechange}
                        onRowsPerPageChange={handlerowperpagechange}
                      ></TablePagination>
                    </div>
                  </Paper>
                </div>
              )}
              <Dialog
                open={opened}
                onClose={closepopup}
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle>
                  <span>{title}</span>
                </DialogTitle>
                <DialogContent>
                  <form onSubmit={handlesubmit}>
                    <Stack spacing={2} margin={2}>
                      <TextField
                        required
                        error={name.length === 0}
                        variant="outlined"
                        label="Name"
                        value={name}
                        onChange={(e: any) => namechange(e.target.value)}
                      ></TextField>
                      <TextField
                        required
                        error={email.length === 0}
                        variant="outlined"
                        label="Email"
                        value={email}
                        onChange={(e: any) => emailchange(e.target.value)}
                      ></TextField>
                      <TextField
                        required
                        error={phone.length === 0}
                        variant="outlined"
                        label="Phone"
                        value={phone}
                        onChange={(e: any) => phonechange(e.target.value)}
                      ></TextField>
                      <TextField
                        variant="outlined"
                        label="Address"
                        multiline
                        maxRows={2}
                        minRows={2}
                        value={address}
                        onChange={(e: any) => addresschange(e.target.value)}
                      ></TextField>
                      <RadioGroup
                        row
                        value={type}
                        onChange={(e) => typechange(e.target.value)}
                      >
                        <FormControlLabel
                          value={"Salesforce"}
                          control={<Radio color="success"></Radio>}
                          label="Salesforce"
                        ></FormControlLabel>
                        <FormControlLabel
                          value="customdev"
                          control={<Radio></Radio>}
                          label="Custom dev"
                        ></FormControlLabel>
                      </RadioGroup>
                      <FormControlLabel
                        // color="success"
                        checked={agreeterm}
                        onChange={(e: any) => {
                          agreetermchange(e.target.checked);
                        }}
                        control={<Checkbox></Checkbox>}
                        label="Agree Terms & Conditions"
                      ></FormControlLabel>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={!agreeterm}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </form>
                </DialogContent>
              </Dialog>
            </Box>
          </Box>
        </ThemeProvider>
      ) : (
        <SignUp userNotFoud={"User Not Found!!!"} />
      )}
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    companystate: state.company,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    loadcompany: () => dispatch(GetAllCompanys()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);
