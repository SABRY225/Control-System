import React from 'react'
import "./Style.css"
import searchIcon from "../../../assets/search.png"
import view from  "../../../assets/view.png"


export default function SearchOfControl() {
    return (
        <>
            <div className='Search container'>
                <div className='row TextTitle'>
                   <div className="col-md-12"> البحث عن لجنة كنترول</div>
                </div>
                <div className='SearchBar row text-center '>
                            <div className="col-md-6">
                            <select name="Acad_Year" id="Input_Select">
                                <option defulat>العام الأكاديمي</option>
                                <option value="2023/2024">2023/2024</option>
                                <option value="2024/2025">2024/2025</option>
                                <option value="2025/2026">2025/2026</option>
                                <option value="2026/2027">2026/2027</option>
                                <option value="2027/2028">2027/2028</option>
                                <option value="2028/2029">2028/2029</option>
                                <option value="2029/2030">2029/2030</option>
                                <option value="2031/2031">2031/2031</option>
                            </select>                                
                            </div>
                </div>
                <div className='ResultOfSearch m-5'>
                    <img src={view} alt="view" width={200} />
                </div>
            </div>
        </>
    )
}