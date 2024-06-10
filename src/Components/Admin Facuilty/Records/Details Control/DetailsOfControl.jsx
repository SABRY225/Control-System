import React from 'react';
import "../Style.css";

const DetailsOfControl = ( data ) => {
    const { dataControl } = data;
    
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = dateObj.getDate();
        return `${day}/${month}/${year}`;
    };

    const startDate = formatDate(dataControl.start_Date);
    const endDate = formatDate(dataControl.end_Date);

    return (
        <>
        <div className='DetailsOfControl text-end'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">اسم الكنترول</th>
                        <th scope="col">المرحلة الدراسية</th>
                        <th scope="col">الفصل الدراسي</th>
                        <th scope="col">السنة الأكاديمية</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{dataControl.name}</td>
                        <td>{dataControl.faculity_Phase}</td>
                        <td>{dataControl.faculity_Semester}</td>
                        <td>{dataControl.acaD_YEAR}</td>
                    </tr>
                </tbody>
            </table>
            
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">اليوم الأول</th>
                        <th scope="col">اليوم الأخير</th>
                        <th scope="col">مواعيد العمل في الكنترول</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{startDate}</td>
                        <td>{endDate}</td>
                        <td></td>
                    </tr>
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
};

export default DetailsOfControl;
