import { forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Grow from "@mui/material/Grow";

const ModalTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Grow in={true} ref={ref} {...props} />;
});

export default ModalTransition;
