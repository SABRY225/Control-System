import React from 'react'
import "../Style.css"

export default function ControlMaterials() {
  return (
    <>
      <div className='ControlMaterials '>
        <div className="row text-end">
        <div className='col-lg-12 ControlMaterials-Title'>بيانات مقرارات الكنترول</div>
        </div>
        {/* Row Start */}
        <div className='row text-center' >
          <div className='col-md-4'>
            <div className='MaterialsDate'>مادة1</div>
          </div>
          <div className='col-md-4'>
            <div className='MaterialsDate'>مادة1</div>
          </div>
          <div className='col-md-4'>
            <div className='MaterialsDate'>مادة1</div>
          </div>
        </div>
        {/* Row End */}
      </div>
      <div className="container">
        <div className="row">
          <hr />
        </div>
      </div>
    </>

  )
}

