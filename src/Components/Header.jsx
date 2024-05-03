import React from 'react'
import "./Style.css"
export default function Header() {
    return (
        <>
            <nav class="navbar navbar-expand-lg " style={{ background: "rgba(152, 218, 255, 1)" }}>
                <div class="container-fluid">
                    <a class="navbar-brand Logo" style={{ marginLeft: "5%" }} href="#">لجان الكنترولات</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li> */}
                            {/* <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                            {/* <li class="nav-item">
                                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li> */}
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

