import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { CardActions, CardContent, Card as CardMUI, IconButton, Typography } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { Assessment, deleteAssessment } from "../../store/modules/assessments/assessmentsSlice";
import { setModal } from "../../store/modules/modal/modalSlice";

interface CardProps {
  assessment: Assessment;
}
export function Card(props: CardProps) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteAssessment(props.assessment.id));
  }

  function handleUpdate() {
    dispatch(setModal({ mode: "update", open: true, defaultValuesInput: props.assessment }));
  }

  return (
    <CardMUI sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {props.assessment.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary' variant='caption' component='p'>
          {/* {new Date(`${props.assessment.deadline}T00:00:00`).toLocaleDateString("pt-BR", {
            dateStyle: "full",
          })} */}
          {new Date(`${props.assessment.deadline}T00:00:00`).toLocaleDateString("pt-BR", {
            dateStyle: "full",
          })}
        </Typography>
        <Typography variant='body1'>Nota: {Number(props.assessment.rate).toFixed(1)}</Typography>
      </CardContent>

      <CardActions>
        <IconButton onClick={handleUpdate}>
          <EditNoteIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </CardMUI>
  );
}
