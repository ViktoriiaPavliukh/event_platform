import { Box } from "@mui/material";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      className="wrap"
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
