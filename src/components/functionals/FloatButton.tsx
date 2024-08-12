import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setModal } from "../../store/modules/modal/modalSlice";

export function FloatButton() {
  const dispatch = useAppDispatch();
  return (
    <Fab
      color='secondary'
      aria-label='add'
      sx={{ position: "fixed", right: "45px", bottom: "30px" }}
      onClick={() => {
        dispatch(setModal({ mode: "create", open: true }));
      }}
    >
      <AddIcon />
    </Fab>
  );
}
