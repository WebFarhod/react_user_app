import { ReactNode } from "react";
import Header from "./header";
import { Box } from "@mui/material";
import Main from "./main";
interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  return (
    <>
      <Header />
      <Box
        sx={{
          mt: 15,
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}
