import React from 'react'

const AddFeildContacts = (props) => {
  return (
    <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px]">
              <div className="w-[2%] h-full p-3 text-[11px]" >
                {props.index+2}
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[16%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[17%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
            </div>
  )
}

export default AddFeildContacts
