import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateAssessment } from "../../store/modules/assessments/assessmentsSlice";
import { selectModal, setModal } from "../../store/modules/modal/modalSlice";
import { createAssesments } from "../../store/modules/assessments/assessments.actions";
import { selectUserLogged } from "../../store/modules/userLogged/userLoggedSlice";

export function Modal() {
  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector(selectUserLogged);

  function handleClose() {
    dispatch(setModal({ mode: null, open: false }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (modal.mode === "create") {

      dispatch(
        createAssesments({
          token: userLogged.authToken,
          title: event.currentTarget["title-assessment"].value,
          rate: Number(event.currentTarget["rate-assessment"].value),
          deadline: event.currentTarget["deadline-assessment"].value,
        }),
      );
    } else if (modal.mode === "update") {
      if (modal.defaultValuesInput) {
        dispatch(
          updateAssessment({
            id: modal.defaultValuesInput.id,
            changes: {
              title: event.currentTarget["title-assessment"].value,
              rate: Number(event.currentTarget["rate-assessment"].value),
              deadline: event.currentTarget["deadline-assessment"].value,
            },
          }),
        );
      }
    }

    event.currentTarget.reset();
    handleClose();
  }

  return (
    <>
      <Dialog
        open={modal.open && Boolean(modal.mode)}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          {modal.mode === "create" && "Cadastrar Avaliação"}
          {modal.mode === "update" && "Atualizar Avaliação"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Preenche os campos para salvar a avaliação</DialogContentText>
          <TextField
            autoFocus
            focused
            required
            margin='dense'
            id='title-assessment'
            name='title-assessment'
            label='Titulo da Avaliação'
            type='text'
            fullWidth
            variant='standard'
            defaultValue={modal.defaultValuesInput ? modal.defaultValuesInput.title : ""}
          />
          <TextField
            required
            focused
            margin='dense'
            id='rate-assessment'
            name='rate-assessment'
            label='Nota'
            type='number'
            fullWidth
            variant='standard'
            defaultValue={modal.defaultValuesInput ? modal.defaultValuesInput.rate : ""}
          />
          <TextField
            required
            margin='dense'
            id='deadline-assessment'
            name='deadline-assessment'
            label='Data de Entrega'
            type='date'
            focused
            fullWidth
            variant='standard'
            defaultValue={modal.defaultValuesInput ? modal.defaultValuesInput.deadline : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type='submit'>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
