import React from 'react'

const Tasks = (data) => {
  console.log(data.dataTasks);
  const Tasks = data.dataTasks;
  return (
    <>
      <div className='TaskOfControl'>
        <div className="row text-end">
          <div className='col-12 TaskOfControl-Title'>المهام</div>
        </div>
        {/* <div className='container Task-Groupes' > */}
        <div className='row justify-content-center'>
          {/* Start */}
          {Tasks.map(item => (
            <div class="col-md-5 box m-2" key={item.id}>
              <div className='box_Title'>{item.description}</div>
            </div>
          ))}


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
export default Tasks
