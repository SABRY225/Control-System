import React from 'react'
import "./Style.css"
import searchIcon from "../../../assets/search.png"
import view from  "../../../assets/view.png"


export default function SearchOfControl() {
    return (
        <>
            <div className='Search'>
                <div className='TextTitle'>
                    البحث عن لجنة كنترول
                </div>
                <div className='SearchBar'>
                    <div className='InputSearch'>
                        <form >
                            <select name="Semester_Year" id="Input_Select">
                                <option defulat>الفصل الدراسي</option>
                                <option value="الاول">الاول</option>
                                <option value="الثاني">الثاني</option>
                                <option value="الفصل الصيفي">الفصل الصيفي</option>
                            </select>
                            <select name="Acad_Year" id="Input_Select">
                                <option defulat>العام الأكاديمي</option>
                                <option value="2023-2024">2023-2024</option>
                                <option value="2024-2025">2024-2025</option>
                                <option value="2025-2026">2025-2026</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className='ResultOfSearch'>
                    <img src={view} alt="view" width={200} />
                </div>
            </div>
        </>
    )
}