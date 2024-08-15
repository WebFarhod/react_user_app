import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { removeSnackbar } from "../../store/slices/snackbar";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Snackbar: React.FC = () => {
  const dispatch = useDispatch();
  const snackbars = useTypedSelector((state) => state.snackbars.messages);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (snackbars.length > 0) {
      const { message, options } = snackbars[0];
      enqueueSnackbar(message, options);
      dispatch(removeSnackbar());
    }
  }, [snackbars, enqueueSnackbar, dispatch]);

  return null;
};

export default Snackbar;
