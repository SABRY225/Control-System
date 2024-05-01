import React from 'react'
import { ControlMaterials, ControlMembers, DetailsOfControl, Notes, Tasks  } from '../../index' 

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <DetailsOfControl />
      <ControlMaterials />
      <ControlMembers />
      <Tasks />
      <Notes />
      {/* <Footer /> */}
      

    </>
  )
}

