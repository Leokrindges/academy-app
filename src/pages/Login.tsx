import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../store/modules/userLogged/userLogged.actions";
import { selectUserLogged } from "../store/modules/userLogged/userLoggedSlice";
import { isEmailValid, isPasswordValid } from "../utils";

export function Login() {
  const userLogged = useAppSelector(selectUserLogged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // só executa aqui se a prop logged do estado global mudar

    if (userLogged.logged) {
      // se tiver logado redireciona para página de Assessments
      navigate("/assessments");
    }
  }, [userLogged.logged, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    if (!isEmailValid(email) || !isPasswordValid(password)) {
      enqueueSnackbar("Campos inválidos", {
        variant: "error",
      });
      return;
    }

    dispatch(fetchLogin({ email, password }));
  };

  return (
    <>
      {!userLogged.logged && (
        <Container component='main'>
          <Stack>
            <Grid>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Sign in
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                  <FormControlLabel
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                  />
                  <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href='#' variant='body2'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href='#' variant='body2'>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Stack>
        </Container>
      )}
    </>
  );
}
