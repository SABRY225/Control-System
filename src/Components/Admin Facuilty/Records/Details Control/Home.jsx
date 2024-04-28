import React from 'react'
import { ControlMaterials, ControlMembers, DetailsOfControl, Nots, Tasks  } from '../../index'
import { Footer, Header } from '../../../../Layout/index'

export default function Home() {
  return (
    <>
      <Header />
      <DetailsOfControl />
      <ControlMaterials />
      <ControlMembers />
      <Tasks />
      <Nots />
      <Footer />
      

    </>
  )
}

