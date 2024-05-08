import React from 'react'
import "../Style.css"

const ControlMaterials = (data) => {
  // const [dataSubject, setDataSubject] = useState([])
  // setDataSubject(data.dataSubject)
  console.log(data.dataSubject);
  const Subject = data.dataSubject
  return (
    <>
      <div className='ControlMaterials '>
        <div className="row text-end">
          <div className='col-lg-12 ControlMaterials-Title'>بيانات مقرارات الكنترول</div>
        </div>
        {/* Row Start */}
        <div className='row justify-content-center' >

          {Subject.map(item => (
                      <div className='col-md-4' key={item.id}>
                      <div className='MaterialsDate'>{item.name}</div>
                    </div>
          ))}
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

export default ControlMaterials;