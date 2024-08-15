/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Iconify from "../iconify/iconify";
import { MenuItem } from "@mui/material";
import { AppDispatch, RootState } from "../../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserData } from "../../interface/userData";
import { approvUser, disableUser } from "../../store/actions/userActions";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  data: UserData;
}

export default function ApprodModal({ data }: IProps) {
  const { user } = useTypedSelector((state) => state.auth.data);

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState<boolean>(false);
  const onSubmit = () => {
    if (data.isApproved) {
      dispatch(disableUser(data._id));
    } else {
      dispatch(approvUser(data._id));
    }
  };
  return (
    <React.Fragment>
      <MenuItem
        onClick={() => {
          setOpen(true);
        }}
      >
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
        Edit
      </MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth={"xs"}
        keepMounted
        aria-describedby="alert-dialog-slide-teacher"
      >
        <DialogTitle>Approded User modal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-teacher">
            {data.isApproved
              ? data.role == "admin"
                ? "Cannot disable ADMIN"
                : user.role == "admin"
                ? "Do you really want to disable the user?"
                : "Only admins can disable users"
              : data.role == "admin"
              ? "Cannot approve ADMIN"
              : data.role == user.role
              ? "A SUPERUSER cannot approve another SUPERUSER."
              : "Do you really want to approve the user?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={
              data.isApproved
                ? data.role == "admin"
                  ? true
                  : user.role == "admin"
                  ? false
                  : true
                : data.role == "admin"
                ? true
                : data.role == user.role
                ? true
                : false
            }
            color="success"
            onClick={async () => {
              onSubmit();
              setOpen(false);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
