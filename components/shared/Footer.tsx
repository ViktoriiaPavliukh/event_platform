import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="EventSpot Logo"
          width={100}
          height={38}
        />
      </Link>
      <Typography variant="body1" color="inherit">
        © {currentYear} EventSpot. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
