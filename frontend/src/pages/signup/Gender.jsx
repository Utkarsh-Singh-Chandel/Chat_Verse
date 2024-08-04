import React from 'react'

const Gender = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='flex'>
        <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender==="male"?"selected":""}`}>
            <span>Male</span>
            <input type='checkbox' className='checkbox border-slate-900'
              checked={selectedGender==="male"}
              onChange={()=>onCheckboxChange("male")}
            />
        </label>

        </div>
        <div className=' form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender==="female"?"selected":""}`}>
            <span >Female</span>
            <input type='checkbox' className='checkbox border-slate-900'
               checked={selectedGender==="female"}
              onChange={()=>onCheckboxChange("female")}
            />
        </label>
        
        </div>
    </div>
  )
}

export default Gender