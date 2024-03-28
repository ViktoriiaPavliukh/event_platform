"use client"

import ButtonContained from "@/components/ui/ButtonContained";
import { Typography, Box, Stack } from "@mui/material";
import { Smokum } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import styles from "./../page.module.css";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          paddingX: "60px",
          marginBottom: "20px",
          flexDirection: {
            xs: "column",
            md: "row",
            justifyContent: "center",
            alignItems: "center",
          },
          gap: "60px",
        }}
      >
        <Stack
          sx={{ display: "flex", flexDirection: { sm: "column" }, gap: "20px" }}
        >
          <Typography variant="h1" sx={{ fontSize: {lg:"50px", xs: "40px"} }}>
            Craft unforgettable moments, seamlessly: elevate your events with
            our platform
          </Typography>
          <Typography variant="body1">
            Where Moments Unfold: EventSpot brings your gatherings to life.
            Whether it's a concert under the stars or a workshop that sparks
            creativity, EventSpot is your canvas for memorable experiences.
            Seamlessly plan, promote, and manage your events while connecting
            with an eager audience. Attendees, immerse yourself in a world of
            endless discovery, where each event is a chapter waiting to be
            written. Let EventSpot be your guide as you explore, connect, and
            create unforgettable memories together
          </Typography>
          <ButtonContained>
            <Link href="/">Explore now</Link>
          </ButtonContained>
        </Stack>
        <Image
          src="/assets/images/people.png"
          alt="big event"
          width={500}
          height={500}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          paddingX: "60px",
          paddingBottom: "60px",
          flexDirection: {
            xs: "column",
            md: "row",
            justifyContent: "center",
            alignItems: "center",
          },
          gap: "60px",
        }}
      >
        <Typography>Search</Typography>
        <Typography>Filter</Typography>
      </Box>
    </>
    // <main className={styles.main}>
    //   {/* <ButtonContained /> */}
    // </main>
  );
}
