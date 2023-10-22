import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { json } from "react-router-dom";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { credsLogin } from "./redux/reducers/loginReducer.tsx";
import { useSelector, useDispatch } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const cancelBtnStyle = {
  position: "absolute" as "absolute",
  top: "0%",
  right: "0%",
  cursor: "pointer",
};
// interface TransitionsModalProps {
//   open: boolean;
//   close: () => void;
// }

interface RootState {
  ModalPoper: {
    value: boolean;
    // Other properties if present in your state
  };
}

export default function TransitionsModal(props: any) {
  const ModalCall = useSelector((state: RootState) => state.ModalPoper.value);
  // console.log(ModalCall);
  const dispatch = useDispatch();
  const { ModelErrors } = props;

  // const [popup, setPopup] = React.useState(localStorage.getItem("loginError"));
  const [open, setOpen] = React.useState(true);
  // console.log(popup);
  // const handleOpen = () => setOpen(()=>setPopup(true));
  // const handleClose = () => setOpen(false);
  const cancelHandle = () => {
    console.log("cancel button!!!");
    // console.log(
    //   "ModelErrors.invalidLoginCreds : ",
    //   ModelErrors.invalidLoginCreds
    // );
    // ModelErrors.setInvalidLoginCreds()
    // console.log(ModalCall);
    // setOpen(!open);
    console.log(ModalCall, "cancel button");
    dispatch(credsLogin());
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={false}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={true}>
          <Box sx={style}>
            <CancelPresentationIcon
              sx={cancelBtnStyle}
              onClick={cancelHandle}
            />
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {ModelErrors.SignInError}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {ModelErrors.SignInFields}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
