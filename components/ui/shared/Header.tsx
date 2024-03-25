"use client";
// @ts-nocheck
import * as React from "react";
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
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import ButtonContained from "../ButtonContained";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { navItems } from "@/constants";
// @ts-ignore
import type { Props } from "@/types";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const Header: React.FC<Props> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        EventSpot
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <ListItem key={item.route} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Image
            src="/assets/images/logo.svg"
            alt="EventSpot Logo"
            width={100}
            height={38}
          />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.label} sx={{ color: "#fff" }}>
                {item.label}
              </Button>
            ))}
          </Box>
          {user ? (
            <SignOutButton>
              <Link href="/sign-in">Logout</Link>
            </SignOutButton>
          ) : (
            <Link href="/sign-in">
              <Button sx={{ color: "#fff" }}>Login</Button>
            </Link>
          )}
          {/* <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignOutButton>
            <Link href="/sign-in">Login</Link>
          </SignOutButton> */}
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
            display: { xs: "block", sm: "none" },
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
