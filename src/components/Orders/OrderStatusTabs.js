import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const OrderStatusTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="To Ship" />
        <Tab label="Shipped" />
        <Tab label="For Delivery" />
        <Tab label="Delivered" />
        <Tab label="Cancelled" />
        <Tab label="Returned" />
      </Tabs>
    </Box>
  );
};

export default OrderStatusTabs;
