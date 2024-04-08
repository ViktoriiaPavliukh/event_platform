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

  // const [orders, setOrders] = useState<IOrderItem[]>([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const ordersData = await getOrdersByEvent({
  //       eventId,
  //       searchString: searchText,
  //     });
  //     setOrders(ordersData || []);
  //   };

  //   fetchOrders();
  // }, [eventId, searchText]);

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <>
      <Box sx={{ py: { xs: 5, md: 10 } }}>
        <Typography variant="h3" align="center" sx={{ mb: 3 }}>
          Orders
        </Typography>
      </Box>

      <Box mt={8} mb={2}>
        <Search  />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 250 }}>Order ID</TableCell>
              <TableCell style={{ minWidth: 200 }}>Event Title</TableCell>
              <TableCell style={{ minWidth: 150 }}>Buyer</TableCell>
              <TableCell style={{ minWidth: 100 }}>Created</TableCell>
              <TableCell style={{ minWidth: 100, textAlign: "right" }}>
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
    </>
  );
};

export default Orders;
