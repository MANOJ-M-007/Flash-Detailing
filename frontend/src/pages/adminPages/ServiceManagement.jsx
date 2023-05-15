import { Box } from '@mui/system'
import React from 'react'
import Sidebar from '../../Layouts/adminLayouts/Sidebar'
import Services from '../../components/adminComponents/Services'

const ServiceManagement = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Services />
    </Box>
  )
}

export default ServiceManagement
