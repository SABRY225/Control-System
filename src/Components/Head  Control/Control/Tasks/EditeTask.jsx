import React from 'react'
import Subtract from '../../../../assets/Subtract.png'
import Trash from '../../../../assets/Trash.png'
export default function EditeTask() {
    return (
        <>
            <div className="container">
                <div className="row m-2">
                    <div className='Title-Task '>اضافه مهام أعضاء الكنترول</div>
                </div>
                <form  >
                    <div className="row text-center">

                        <div className="col-5">
                            <textarea placeholder='المهمة' rows="5" cols="55" className='TextAreaTask text-end p-2' ></textarea>
                        </div>
                        <div className="col-2 ">
                            <input type="date" className='dateInput form-control ' />
                        </div>
                    </div>
                    <div className="row text-center m-3">
                        <div className="col">
                            <button className='btn btn-info p-2' style={{ width: '200px', fontSize: "20px", background: "rgb(67, 187, 255)", color: "#FFFFFF" }}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg> ارسال المهمة</button>
                        </div>

                    </div>
                </form>
            </div>
            <div className="container">
                <div className="row">
                    <hr />
                </div>
            </div>
            <div className="container">
                <div className="row m-2">
                    <div className='Title-Task '>اضافه مهام أعضاء الكنترول</div>
                </div>
                <div className="row justify-content-center">
                    {/* Start */}
                    <div className="col-md-3 task m-2">
                        <div className="col-12 d-flex task-head p-2 ">
                            <div className="col-4 d-flex">
                                <div className='col'><img src={Trash} alt="Trash" width={20} /></div>
                                <div className='col'><img src={Subtract} alt="Subtract" width={20} /></div>
                            </div>
                            <div className="col-5">2/24/2023</div>
                            <div className="col-3">انتهت</div>
                        </div>
                        <div className="col-12 task-title text-center p-2">حصد درجات المادة</div>
                        <div className="col-12 task-body text-end">
                            <ol type=''>
                                <li>د/ محمد عبدالرازق</li>
                                <li>د/ محمد عبدالرازق</li>
                                <li>د/ محمد عبدالرازق</li>
                            </ol>
                        </div>
                    </div>
                    {/* End */}
                    {/* Start */}
                    <div className="col-md-3 task m-2">
                        <div className="col-12 d-flex task-head p-2 ">
                            <div className="col-4 d-flex">
                                <div className='col'><img src={Trash} alt="Trash" width={20} /></div>
                                <div className='col'><img src={Subtract} alt="Subtract" width={20} /></div>
                            </div>
                            <div className="col-5">2/24/2023</div>
                            <div className="col-3">انتهت</div>
                        </div>
                        <div className="col-12 task-title text-center p-2">حصد درجات المادة</div>
                        <div className="col-12 task-body text-end">
                            <ol type=''>
                                <li>د/ محمد عبدالرازق</li>
                                <li>د/ محمد عبدالرازق</li>
                                <li>د/ محمد عبدالرازق</li>
                            </ol>
                        </div>
                    </div>
                    {/* End */}
                    {/* Start */}
                    <div className="col-md-3 task m-2">
                        <div className="col-12 d-flex task-head p-2 ">
                            <div className="col-4 d-flex">
                                <div className='col'><img src={Trash} alt="Trash" width={20} /></div>
                                <div className='col'><img src={Subtract} alt="Subtract" width={20} /></div>
                            </div>
                            <div className="col-5">2/24/2023</div>
                            <div className="col-3">انتهت</div>
                        </div>
                        <div className="col-12 task-title text-center p-2">حصد درجات المادة</div>
                        <div className="col-12 task-body text-end">
                            <ol type=''>
                                <li>د/ محمد عبدالرازق</li>
                                <li>د/ محمد عبدالرازق</li>
                                <li>د/ محمد عبدالرازق</li>
                            </ol>
                        </div>
                    </div>
                    {/* End */}
                </div>
            </div>
        </>
    )
}

