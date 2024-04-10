"use client";
// @ts-nocheck
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Button,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { lightTheme, darkTheme } from "../../app/theme";

// @ts-ignore
import type { Props } from "@/types";
import { width } from "@mui/system";

const drawerWidth = 240;

const Header: React.FC<Props> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const pathname = usePathname();
  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const theme = useTheme();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="EventSpot Logo"
          width={100}
          height={38}
        />
      </Link>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <ListItem key={item.route} disablePadding>
              <ListItemButton sx={{ paddingLeft: "40px", py: "16px" }}>
                <Link
                  color={isActive ? theme.palette.primary.main : "inherit"}
                  href={item.route}
                >
                  {item.label}
                </Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const { user } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          display: "flex",
          paddingX: "40px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Image
              src="/assets/images/logo.svg"
              alt="EventSpot Logo"
              width={100}
              height={38}
            />
          </Link>
          <List sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <ListItem key={item.route} disablePadding>
                  <ListItemButton
                    sx={{
                      display: "flex",
                      minWidth: "150px",
                      justifyContent: "center",
                    }}
                  >
                    <Link
                      color={isActive ? "primaryColor" : "inherit"}
                      href={item.route}
                    >
                      {item.label}
                    </Link>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Switch />
          {/* <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "Toggle theme" }}
            theme={isDarkModeEnabled ? darkTheme : lightTheme}
          /> */}

          {user ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignOutButton>
                <Link href="/">
                  <Button sx={{ color: theme.palette.primary.contrastText }}>
                    Logout
                  </Button>
                </Link>
              </SignOutButton>
            </Box>
          ) : (
            <Link href="/sign-in">
              <Button sx={{ color: theme.palette.primary.contrastText }}>
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};
export default Header;
