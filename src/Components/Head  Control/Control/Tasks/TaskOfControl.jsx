import React from 'react'
import "../../StyleHeadofControl.css"
import plusIcon from '../../../../assets/plus.png'
export default function TaskOfControl() {
  return (
    <>
      <div className="container">
        <div className="row m-2">
          <div className='Title-Task '>اضافه مهام أعضاء الكنترول</div>
        </div>
        <form action="" >
          <div className="row text-center">

            <div className="col-3">1</div>
            <div className="col-1 toTask">
              <div>To</div>
            </div>
            <div className="col-5">
            <textarea placeholder='المهمة' rows="5" cols="55" className='TextAreaTask text-end p-2' ></textarea>
            </div>
            <div className="col-2 ">
              {/* <button className='btn btn-info p-2' ><img src={plusIcon} alt="plusIcon" width={25}  /> اضافة</button> */}
              <input type="date" className='dateInput form-control ' />
            </div>

          </div>
        </form>

      </div>
      <hr />
      <div className="container"></div>
    </>
  )
}
