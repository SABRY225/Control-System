import React from 'react'
import "../Style.css"

export default function ControlMaterials() {
  return (
    <div className='ControlMaterials'>
      <div className='ControlMaterials-Title'>بيانات مواد الكنترول</div>
      {/* Row Start */}
      <div className='MaterialsOfControl' >
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
      </div>
      {/* Row End */}
      <div className='MaterialsOfControl' >
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
      </div>
      <div className='MaterialsOfControl' >
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
        <div className='column_Materials'>
          <div className='MaterialsDate'>مادة1</div>
        </div>
      </div>
      <hr />
    </div>
  )
}

