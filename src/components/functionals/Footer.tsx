import { Box, Link, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box component='footer' marginY={3}>
      <Typography variant='caption' component='p' align='center'>
        Copyright &copy;
        <Link href='#'>Site</Link>
        {` ${new Date().getFullYear()}.`}
      </Typography>
    </Box>
  );
}
