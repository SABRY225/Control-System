import React from 'react';
import "../Style.css";

const ControlMaterials = ( data ) => {
    const { dataSubject } = data;

    return (
      <>
      <div className='ControlMaterials rtl text-center'>
          <div className="row text-end">
              <div className='col-lg-12 ControlMaterials-Title'>بيانات مقرارات الكنترول</div>
          </div>
          <table className="table">
              <thead>
                  <tr>
                      <th scope="col">اسم المادة</th>
                  </tr>
              </thead>
              <tbody>
                  {dataSubject.map((item, index) => (
                      <tr key={index}>
                          <td>{item.name}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
      <div className="container">
          <div className="row">
              <hr />
          </div>
      </div>
  </>
    );
}

export default ControlMaterials;
