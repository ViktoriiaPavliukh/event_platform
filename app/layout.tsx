import type { Metadata } from "next";
import Head from "next/head";
import { Mulish } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ClerkProvider } from "@clerk/nextjs";
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
    icon: "/assets/icons/logo.svg",
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
    <GoogleOAuthProvider clientId={clientId}>
      <ClerkProvider>
        <ThemeProvider theme={isDarkModeEnabled ? darkTheme : lightTheme}>
          <Head>
            <meta
              httpEquiv="Cross-Origin-Opener-Policy"
              content="same-origin"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <html lang="en">
            <body suppressHydrationWarning={true} className={inter.variable}>
              {children}
            </body>
          </html>
        </ThemeProvider>
      </ClerkProvider>
    </GoogleOAuthProvider>
  );
}
