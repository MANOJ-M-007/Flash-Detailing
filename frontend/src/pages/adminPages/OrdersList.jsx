import React from 'react'
import Orders from '../../components/adminComponents/Orders'
import Sidebar from '../../Layouts/adminLayouts/Sidebar'
import { Box } from '@mui/material'

const OrdersList = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Orders />
    </Box>
  )
}

export default OrdersList
