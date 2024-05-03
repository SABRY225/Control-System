import React from 'react'
import "../Style.css"
export default function Task_schedule() {
  return (
    <>
      <div className="container">
        {/* <div className="row m-2">
                    <div className='Title-Task '>اضافه مهام أعضاء الكنترول</div>
                </div> */}
        <div className="row text-center">
          <div className="col-md-6 TitleOfTask m-5">
            <div className="col-12 Text_Task">حصد مادة تاريخ</div>
            <div className="col-12 btn_Task text-center"><button className='Done'>Done</button></div>
          </div>
          <div className="col-md-6">
            <div className="col-md-12 TextDataTask">قام رائس الكلية د/ محمد عبدالرازق عبده باضافة هذه المهمه للاعضاء</div>
            <div className="col-md-12 ">
              <div className="col MemberDataTask">يليلسي</div>
              <div className="col MemberDataTask">Ahmed Sabry</div>
            </div>
            <div className="col-md-12 DateTask">اخر موعد للتسليم 2/24/2024</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <hr />
        </div>
      </div>
      <div className="container">
        <div className="row m-2">
          <div className='Title-Task '>المهام</div>
        </div>
        <div className="row justify-content-center">
          {/* Start */}
          <div className="col-md-3 task m-2">
            <div className="col-12 d-flex task-head p-2 text-center">
              <div className="col-12">انتهت</div>
            </div>
            <div className="col-12 task-title text-center p-2">حصد درجات المادة</div>
          </div>
          {/* End */}
          {/* Start */}
          <div className="col-md-3 task m-2">
            <div className="col-12 d-flex task-head p-2 text-center">
              <div className="col-12">انتهت</div>
            </div>
            <div className="col-12 task-title text-center p-2">حصد درجات المادة</div>
          </div>
          {/* End */}
          {/* Start */}
          <div className="col-md-3 task m-2">
            <div className="col-12 d-flex task-head p-2 text-center">
              <div className="col-12">انتهت</div>
            </div>
            <div className="col-12 task-title text-center p-2">حصد درجات المادة</div>
          </div>
          {/* End */}
        </div>
      </div>
    </>
  )
}

