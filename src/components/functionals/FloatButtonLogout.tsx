import LogoutIcon from "@mui/icons-material/Logout";
import { Fab } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchLogout } from "../../store/modules/userLogged/userLogged.actions";
import { selectUserLogged } from "../../store/modules/userLogged/userLoggedSlice";

export function FloatButtonLogout() {
  const userLogged = useAppSelector(selectUserLogged);
  const dispatch = useAppDispatch();
  return (
    <Fab
      color='default'
      aria-label='add'
      sx={{ position: "fixed", left: "45px", bottom: "30px" }}
      onClick={() => {
        dispatch(fetchLogout(userLogged.authToken));
      }}
    >
      <LogoutIcon />
    </Fab>
  );
}
