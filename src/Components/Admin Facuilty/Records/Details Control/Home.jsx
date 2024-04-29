import React from 'react'
import { ControlMaterials, ControlMembers, DetailsOfControl, Nots, Tasks  } from '../../index'
// import Header from '../../../Header' 
// import Footer from '../../../Footer' 

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <DetailsOfControl />
      <ControlMaterials />
      <ControlMembers />
      <Tasks />
      <Nots />
      {/* <Footer /> */}
      

    </>
  )
}

