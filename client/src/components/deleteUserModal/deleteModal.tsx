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
import { deleteUser } from "../../store/actions/userActions";
import { UserData } from "../../interface/userData";

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

export default function DeleteModal({ data }: IProps) {
  const { user } = useTypedSelector((state) => state.auth.data);

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState<boolean>(false);
  const onSubmit = () => {
    dispatch(deleteUser(data._id));
  };
  return (
    <React.Fragment>
      <MenuItem
        onClick={() => {
          setOpen(true);
        }}
        sx={{ color: "error.main" }}
      >
        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
        Delate
      </MenuItem>{" "}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth={"xs"}
        keepMounted
        aria-describedby="alert-dialog-slide-teacher"
      >
        <DialogTitle>Delete user modal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-teacher">
            {data.role == "admin"
              ? "Cannot delete ADMIN"
              : data.role == user.role
              ? "A SUPERUSER cannot delete another SUPERUSER."
              : "Do you really want to delete the user?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={
              data.role == "admin"
                ? true
                : data.role == user.role
                ? true
                : false
            }
            color="error"
            onClick={async () => {
              onSubmit();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
