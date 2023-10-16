import { useState, useEffect } from "react";
import { IconButton, styled } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: 25,
  right: 25,
  zIndex: 2,
  width: "2.5rem",
  height: "2.5rem",
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    transition: "0.5s",
  },
}));

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowButton = () => {
    window.scrollY > 250 ? setShow(true) : setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleShowButton);

    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <div>
      {show && (
        <StyledIconButton onClick={handleClick}>
          <ArrowUpwardIcon />
        </StyledIconButton>
      )}
    </div>
  );
};

export default ScrollToTop;
