import React from 'react'
import "./Style.css"
export default function Header() {
    return (
        <header className='header'>
            <div className='nav'>
                <div className='Logo'>لجان الكنترولات</div>
            </div>

            <div className='User'>
                <div className='UserText'>د/ عماد علي</div>
                <div ><img className='UserImage' src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="" /></div>
            </div>
        </header>
    )
}

