import React from 'react'

export default function ControlMembers() {
  return (
    <>
      <div className='ControlMembers'>
        <div className="row text-end">
          <div className='col-12 ControlMembers-Title'>بيانات أعضاء الكنترول</div>
        </div>
        <div className='ControlMembers-Groupes'>
          <div className='ControlMembers-Groupe-1'>
            <div className='ControlMembers-Groupe-title'>رئيس الكنترول</div>
            {/* Row Start */}
            <div className='ControlMembers-Groupe-Head' >
              <div className='row '>
                <div className='col-12 data_column'>د/ عماد علي</div>
              </div>
            </div>
            {/* Row End */}
          </div>
          <div className='ControlMembers-Groupe-1'>
            <div className='ControlMembers-Groupe-title'>أعضاء الكنترول </div>
            {/* Row Start */}
            <div className='row text-center ' >
              <div className='col-md-4 column_ControlMembers'>
                <div className=' data_column'>د / أحمد صبري</div>
              </div>
              <div className='col-md-4  column_ControlMembers'>
                <div className='data_column'>د / أحمد صبري</div>
              </div>
              <div className='col-md-4 column_ControlMembers'>
                <div className='data_column'> احمد صبري محمود علي</div>
              </div>
            </div>
            {/* Row End */}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <hr />
        </div>
      </div>
    </>

  )
}

