import React from 'react'
import "./Style.css"
export default function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg " style={{ background: "rgba(152, 218, 255, 1)" }}>
                <div className="container-fluid">
                    <div className="navbar-brand Logo" style={{ marginLeft: "5%" }} >لجان الكنترولات</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                        </ul>
                        <div className="d-flex">
                            <div className='User'>
                                <div className='UserText'>د/ عماد علي</div>
                                <div ><img className='UserImage' src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="" /></div>
                            </div>
                            <button class="btn btn-outline-dark " type="submit">LOGOUT</button>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

