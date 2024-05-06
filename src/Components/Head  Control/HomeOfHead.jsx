import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function HomeOfHead() {
    const navigate = useNavigate();
    const headelInfoControl=()=>{
        navigate('./control')
    }
    return (
        <div className='container HomeClassInfoControls'>
            {/* Semes_Acad_Title */}
            <div className='container ClassesControls'>
                <div className='row justify-content-center'>
                    {/* Start  */}
                    <div class="col-4 m-3 boxControl " onClick={headelInfoControl}>
                        <div className="row">
                            <div className="col-6 dataofControl">
                                <div className='nameOfHeadControl'>د/ محمد عبدالرازق</div>
                                <div className="nameOfJob">رئيس الكنترول</div>
                            </div>
                            <div className="col-6 text-center nameOfControl">
                                <div >المستوي الأول</div>
                            </div>
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

                    </div>
                    {/* End  */}
                </div>

            </div>

        </div>
    )
}

