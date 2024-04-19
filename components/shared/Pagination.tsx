"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Box, Button } from "@mui/material";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(page, totalPages, urlParamName);
  const onClick = (btnType: string) => {
    const pageNumber = Number(page);
    const pageValue = btnType === "next" ? pageNumber + 1 : pageNumber - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex",
        gap: "20px",
        py: "40px",
      }}
    >
      <Button
        variant="contained"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
