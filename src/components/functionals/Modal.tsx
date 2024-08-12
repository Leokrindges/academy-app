import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addAssessment, updateAssessment } from "../../store/modules/assessments/assessmentsSlice";
import { selectModal, setModal } from "../../store/modules/modal/modalSlice";

export function Modal() {
  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(setModal({ mode: null, open: false }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (modal.mode === "create") {
      dispatch(
        addAssessment({
          id: uuid(),
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
