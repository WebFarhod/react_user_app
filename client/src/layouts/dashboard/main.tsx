import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function Main({ children }: IProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}
