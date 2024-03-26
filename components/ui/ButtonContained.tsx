import * as React from "react";
import Button from "@mui/material/Button";
import { ReactNode } from "react";

interface ButtonContainedProps {
  children: ReactNode;
}

const ButtonContained: React.FC<ButtonContainedProps> = ({ children }) => {
  return <Button variant="contained">{children}</Button>;
};

export default ButtonContained;
