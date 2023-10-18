import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WavingHandOutlined from "@mui/icons-material/WavingHandOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { ColorModeContext } from "./Home";
import { useAppDispatch } from "../../hooks";
import { searchNote } from "../../slices/noteSlice";
import { toast } from "react-toastify";
import { toastLoadingOptions } from "../../utils/constants";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const menuId = "primary-search-menu";
const mobileMenuId = "primary-search-menu-mobile";

const NavBar = () => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleMenuClose();

    toast.loading("Logging out...", toastLoadingOptions);

    setTimeout(() => {
      Cookies.remove("token");

      navigate("/login");
    }, 2500);
  };

  useEffect(() => {
    dispatch(searchNote(keyword));

    const token = Cookies.get("token");

    if (token) {
      const { name } = Object(jwtDecode(token));
      setName(name);
    }

    localStorage.setItem("paletteMode", theme.palette.mode);
  }, [dispatch, keyword, theme.palette.mode]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            href="/"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <EditNoteOutlinedIcon />
          </IconButton>
          <Typography
            component="div"
            variant="h6"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Notes
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              type="search"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
              value={keyword}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="menu"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem sx={{ gap: 1 }}>
          <WavingHandOutlined />
          <span>Hi, {name}!</span>
        </MenuItem>
        <MenuItem onClick={colorMode.toggleColorMode} sx={{ gap: 1 }}>
          {theme.palette.mode === "dark" ? (
            <>
              <LightModeOutlinedIcon />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <DarkModeOutlinedIcon />
              <span>Dark Mode</span>
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleLogOut} sx={{ gap: 1 }}>
          <LogoutOutlinedIcon />
          Log Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
