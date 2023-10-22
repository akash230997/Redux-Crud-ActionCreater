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
import {
  OpenPopUp,
  getAllRequestSuccess,
  getUpdateReq,
} from "./redux/Action.js";
import {
  GetAllClientsRequest,
  GetEditClientsRequest,
  GetRemovedClientsRequest,
  GetUpdateClientsRequest,
  createAddClient,
} from "./redux/ActionCreater.js";
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
  const [show, setShow] = React.useState(false);

  // const [name namechange] = React.useState("");
  const [id, idchange] = React.useState(0);
  const [name, namechange] = React.useState("");
  const [email, emailchange] = React.useState("");
  const [phone, phonechange] = React.useState("");
  const [address, addresschange] = React.useState("");
  const [type, typechange] = React.useState("Salesforce");
  const [agreeTerm, agreeTermchange] = React.useState(false);

  const [rowPerPage, rowPerPagechange] = React.useState(10);
  const [Page, Pagechange] = React.useState(0);

  const [isEdit, isEditchange] = React.useState(false);
  const [title, titlechange] = React.useState("Add Client");
  const clearState = () => {
    idchange(0);
    namechange("");
    emailchange("");
    phonechange("");
    addresschange("");
    typechange("Salesforce");
  };

  // useSelector
  const editObj = useSelector((state: any) => state.clientsR.Clientobj);
  // console.log("editObj : ", editObj);
  React.useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      console.log(
        "Not Clean Data!!! : Object.keys(editObj).length > 0",
        Object.keys(editObj).length > 0
      );
      idchange(editObj.id);
      namechange(editObj.name);
      emailchange(editObj.email);
      phonechange(editObj.phone);
      addresschange(editObj.address);
      typechange(editObj.type);
    } else {
      console.log("Clean Data!!!");
      clearState();
    }
  }, [editObj]);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const column = [
    { id: "Id", name: "Id" },
    { id: "Name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "address", name: "Address" },
    { id: "clients", name: "Clients" },
    { id: "action", name: "Action" },
  ];
  const dispatch = useDispatch();

  const functionAdd = () => {
    clearState();
    setShow(true);
    isEditchange(false);
    titlechange("Add Client Details");
  };

  const openPopUp = () => {
    setShow(true);
    console.log(show);
    dispatch(OpenPopUp());
  };

  const closePopUp = () => {
    setShow(false);
    // console.log(show);
  };
  const onSubmitAdd = (event: React.FormEvent) => {
    event.preventDefault();
    // openPopUp(true)
    const _obj = { id, name, email, phone, address, type };
    console.log(_obj);
    if (isEdit) {
      dispatch(GetUpdateClientsRequest(_obj));
    } else {
      dispatch(createAddClient(_obj));
    }
    // clearState();
    closePopUp();
  };

  const handlePage = (event: number, newwPage: any) => {
    // Pagechange(+event.target.value);
    Pagechange(newwPage);
  };

  const handlerowPerPage = (event: any) => {
    // rowPerPagechange(newwPage);
    rowPerPagechange(+event.target.value);
    Pagechange(0);
  };
  const handleEditClient = (codeData: any) => {
    setShow(true);
    isEditchange(true);
    titlechange("Edit Client Details");
    dispatch(GetEditClientsRequest(codeData));
  };

  const handleRemoveClient = (code) => {
    if (window.confirm("do you want to remove")) {
      dispatch(GetRemovedClientsRequest(code));
    }
  };

  React.useEffect(() => {
    props.loadClients();
  }, []);

  return (
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
              Dashboard
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
            {mainListItems}
            {/* <p>Clients Section</p> */}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
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
          <Paper>
            <div style={{ margin: "1%" }}>
              <Button variant="contained" onClick={functionAdd}>
                Add New Project (+)
              </Button>
            </div>
            <div></div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {column.map((headings) => {
                      return (
                        <TableCell key={headings.id}>{headings.name}</TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.clientStates.Clientlist &&
                    props.clientStates.Clientlist.slice(
                      Page * rowPerPage,
                      Page * rowPerPage + rowPerPage
                    ).map((row: any, index: number) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.address}</TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell>
                            <Button
                              onClick={(e) => handleEditClient(row.id)}
                              variant="outlined"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={(e) => handleRemoveClient(row.id)}
                              color="error"
                              variant="contained"
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
              rowsPerPage={rowPerPage}
              page={Page}
              rowsPerPageOptions={[2, 5, 10, 15]}
              count={props.clientStates.Clientlist.length}
              component="div"
              onPageChange={handlePage}
              onRowsPerPageChange={handlerowPerPage}
            ></TablePagination>
          </Paper>
          <Dialog open={show} onClose={closePopUp} fullWidth maxWidth="sm">
            <DialogTitle>
              <span>{title}</span>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={onSubmitAdd}>
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
                    checked={agreeTerm}
                    onChange={(e) => {
                      agreeTermchange(e.target.checked);
                    }}
                    control={<Checkbox></Checkbox>}
                    label="Agree Terms & Conditions"
                  ></FormControlLabel>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!agreeTerm}
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
  );
}

const mapStateToProps = (state: any) => {
  return {
    clientStates: state.clientsR,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadClients: () => dispatch(GetAllClientsRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
