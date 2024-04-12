import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@mui/material/styles";
import { createClient } from "@supabase/supabase-js";
import { lightTheme, darkTheme } from "./theme";
import "./globals.css";

const supabase = createClient(
  "https://hpttgtvgrblzsijmnedt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdHRndHZncmJsenNpam1uZWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4Mzk2MjMsImV4cCI6MjAyODQxNTYyM30.qMXBYtzHPYZvlUyZTOb141auCDelKynSSYzMykQZcy0"
);

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

import "@uploadthing/react/styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDarkModeEnabled = false;
  const clientId = process.env.CLIENT_ID || "";
  return (
    <ThemeProvider theme={isDarkModeEnabled ? darkTheme : lightTheme}>
      <GoogleOAuthProvider clientId={clientId}>
        <ClerkProvider>
          <html lang="en">
            <body suppressHydrationWarning={true} className={inter.variable}>
              {children}
            </body>
          </html>
        </ClerkProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}
