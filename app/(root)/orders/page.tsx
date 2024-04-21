import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Search from "@/components/shared/Search";
import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { IOrderItem } from "@/lib/database/models/order.model";

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <Box
      sx={{
        px: { xs: "40px", md: "60px" },
        maxWidth: "1200px",
        margin: "0 auto",
        mb: "40px",
        minHeight: "80vh",
      }}
    >
      <Box sx={{ py: { xs: 5, md: 10 } }}>
        <Typography
          variant="h4"
          align="center"
          color="textSecondary"
          sx={{ textTransform: "uppercase" }}
        >
          Orders
        </Typography>
      </Box>

      <Box mt={8} mb={2}>
        <Search />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 250, color: "#585858" }}>
                Order ID
              </TableCell>
              <TableCell sx={{ minWidth: 200, color: "#585858" }}>
                Event Title
              </TableCell>
              <TableCell sx={{ minWidth: 15, color: "#585858" }}>
                Buyer
              </TableCell>
              <TableCell sx={{ minWidth: 100, color: "#585858" }}>
                Created
              </TableCell>
              <TableCell
                sx={{ minWidth: 100, color: "#585858", textAlign: "right" }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((row: IOrderItem) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.eventTitle}</TableCell>
                  <TableCell>{row.buyer}</TableCell>
                  <TableCell>
                    {formatDateTime(row.createdAt).dateTime}
                  </TableCell>
                  <TableCell align="right">
                    {formatPrice(row.totalAmount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
