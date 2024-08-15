import { Box, CircularProgress } from "@mui/material";

export default function PageLoader() {
  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
}
