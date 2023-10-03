import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        href="https://github.com/jmccerezo/notes-app"
        sx={{ fontWeight: "bold", textDecoration: "none" }}
      >
        Notes App
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}
