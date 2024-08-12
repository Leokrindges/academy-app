import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/functionals/Card";
import { FloatButton } from "../components/functionals/FloatButton";
import { FloatButtonLogout } from "../components/functionals/FloatButtonLogout";
import { Footer } from "../components/functionals/Footer";
import { Header } from "../components/functionals/Header";
import { Modal } from "../components/functionals/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllAssessments } from "../store/modules/assessments/assessments.actions";
import { listAssessments } from "../store/modules/assessments/assessmentsSlice";
import { selectUserLogged } from "../store/modules/userLogged/userLoggedSlice";

export function Assessments() {
  const userLogged = useAppSelector(selectUserLogged);
  const assessments = useAppSelector((state) => listAssessments(state.assessments));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // se não tiver logado, redireciona para a pagina de Login
    if (!userLogged.logged) {
      navigate("/");
      return;
    }

    // só lista se tiver na pagina de assessments logado
    dispatch(fetchAllAssessments({ token: userLogged.authToken }));
  }, [userLogged, navigate, dispatch]);

  return (
    <>
      {userLogged.logged && (
        <Container maxWidth='xl' sx={{ minHeight: "100vh" }}>
          <Stack minHeight={"100vh"} justifyContent='space-between'>
            <Header />

            <Box component='main' minHeight={"80vh"}>
              <Typography variant='h3' component='h1' align='center'>
                Avaliações
              </Typography>

              <Grid container spacing={3} marginTop={3}>
                {assessments.map((a) => (
                  <Grid key={a.id} item xs={12} sm={6} md={4} xl={3}>
                    <Card assessment={a} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Footer />
          </Stack>

          <FloatButton />
          <FloatButtonLogout />

          <Modal />
        </Container>
      )}
    </>
  );
}
