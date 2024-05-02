import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='container HomeClassInfoControls'>
{/* Semes_Acad_Title */}
<div className='row  Semes_Acad_Title'>
  <div className="col text-end Semes_Acad_Title-col">2024/2023</div>
  <div className="col  Semes_Acad_Title-col">-------</div>
  <div className="col text-start Semes_Acad_Title-col">semester 2</div>
</div>
{/* Semes_Acad_Title */}
<div className='container ClassesControls'>
  <div className='row justify-content-center'>
    {/* Start  */}
    <div class="col-4 m-3 boxControl ">
      <div className="row">
        <div className="col-6 dataofControl">
          <div className='nameOfHeadControl'>د/ محمد عبدالرازق</div>
          <div className="nameOfJob">رئيس الكنترول</div>
        </div>
        <div className="col-6 text-center nameOfControl">
          <div >المستوي الأول</div>
        </div>
      </div>
      <div className="row text-center btn-view">
        <Link to="/Member_Facuilty/control" className='btn  w-100'>View</Link>
      </div>
    </div>
    {/* End  */}
    {/* Start  */}
    <div class="col-4 m-3 boxControl ">
      <div className="row">
        <div className="col-6 dataofControl">
          <div className='nameOfHeadControl'>د/ محمد عبدالرازق</div>
          <div className="nameOfJob">رئيس الكنترول</div>
        </div>
        <div className="col-6 text-center nameOfControl">
          <div >المستوي الأول</div>
        </div>
      </div>
      <div className="row text-center btn-view">
        <Link to="/Member_Facuilty/control" className='btn  w-100'>View</Link>
      </div>
    </div>
    {/* End  */}
    {/* Start  */}
    <div class="col-4 m-3 boxControl ">
      <div className="row">
        <div className="col-6 dataofControl">
          <div className='nameOfHeadControl'>د/ محمد عبدالرازق</div>
          <div className="nameOfJob">رئيس الكنترول</div>
        </div>
        <div className="col-6 text-center nameOfControl">
          <div >المستوي الأول</div>
        </div>
      </div>
      <div className="row text-center btn-view">
        <Link to="/Member_Facuilty/control" className='btn  w-100'>View</Link>
      </div>
    </div>
    {/* End  */}
  </div>

</div>

</div>
  )
}

