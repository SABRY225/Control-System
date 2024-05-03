import React from 'react'
import { ControlMaterials, ControlMembers, DetailsOfControl, InformationControl, Notes, Tasks,DataControl  } from '../../index' 

export default function HomeControlRecodes() {
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

