import React from 'react'

export default function Tasks() {
  return (
    <>
      <div className='TaskOfControl'>
        <div className="row text-end">
          <div className='col-12 TaskOfControl-Title'>المهام</div>
        </div>
        {/* <div className='container Task-Groupes' > */}
          <div className='row justify-content-center'>
            {/* Start */}
            <div class="col-md-5 box m-2">
              <div className='box_Title'>حصد دراجات ماده 1 </div>
              <div className="row">
                <div className="col dataofTask">
                  <div className="dataOfTask">3/24/2003</div>
                </div>
                <div className="col memberOfTask">
                  <div className='nameOfMember'>د/ محمد عبدالرازق</div>
                  <div className='nameOfMember'>د/ محمد عبدالرازق</div>
                </div>
              </div>
            </div>
            <div class="col-md-5 box m-2">
              <div className='box_Title'>حصد دراجات ماده 1 </div>
              <div className="row">
                <div className="col dataofTask">
                  <div className="dataOfTask">3/24/2003</div>
                </div>
                <div className="col memberOfTask">
                  <div className='nameOfMember'>د/ محمد عبدالرازق</div>
                  <div className='nameOfMember'>د/ محمد عبدالرازق</div>
                </div>
              </div>
            </div>
            {/* End */}
          </div>
        </div>
      {/* </div> */}
      <div className="container">
        <div className="row">
          <hr />
        </div>
      </div>
    </>

  )
}

