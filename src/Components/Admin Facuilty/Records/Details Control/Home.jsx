import React from 'react'
import { ControlMaterials, ControlMembers, DetailsOfControl, InformationControl, Notes, Tasks,DataControl  } from '../../index' 

export default function Home() {
  return (
    <>
      <DetailsOfControl />
      <ControlMaterials />
      <ControlMembers />
      <Tasks />
      <Notes /> 
    </>
  )
}

