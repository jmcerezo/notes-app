import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {`© ${new Date().getFullYear()} `}
      <Link
        color="inherit"
        target="_blank"
        href="https://github.com/jmcerezo/notes-app"
        sx={{ fontWeight: "bold", textDecoration: "none" }}
      >
        Notes App
      </Link>
    </Typography>
  );
};

export default Copyright;
