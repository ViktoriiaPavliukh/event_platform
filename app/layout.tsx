import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import "./globals.css";

const inter = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "EventSpot",
  description: "Platform allows to discover upcoming events",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDarkModeEnabled = false;
  return (
    <ThemeProvider theme={isDarkModeEnabled ? darkTheme : lightTheme}>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.variable}>{children}</body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  );
}
