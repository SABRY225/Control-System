import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

export default function Admin_Facuilty() {
  const [isDataLoading, setIsDataLoading] = useState(false);
  return (
    <>
      <Outlet />
    </>
  )
}
