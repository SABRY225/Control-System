import React from 'react'

export default function Tasks() {
  return (
    <div className='TaskOfControl'>
    <div className='TaskOfControl-Title'>المهام</div>
    <div className='container Task-Groupes' >
        <div className='row'>
          {/* Start */}
        <div class="col-6 box m-3">
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
        <div class="col-6 box  m-3">
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
    <hr />
    </div>
  )
}

