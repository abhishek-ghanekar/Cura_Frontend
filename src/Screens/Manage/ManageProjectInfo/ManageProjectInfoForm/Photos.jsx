import React, { useState } from 'react';
import AddFeildPhotos from './AddFeildPhotos';

const Photos = (props) => {
    const handleClose = () => {
        props.setIsStateDialogue(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    };

    const [addField,setAddFeild] = useState([]);
    const handleAdd = () =>{
        const abc=[...addField,[]];
        setAddFeild(abc);
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex-col justify-center items-center mx-5 mt-10'>
                    <div className="w-full h-full">
                        <div className="w-full h-[40px] bg-[#EBEBEB] flex border-[#CBCBCB] border-b-[1px] ">
                            <div className="w-[7%] h-full p-3 text-[11px]" >
                                Sr.
                            </div>
                            <div className="w-[31%] h-full p-3 text-[11px]" >
                                Photo Link
                            </div>
                            <div className="w-[31%] h-full p-3 text-[11px]" >
                                Description
                            </div>
                            <div className="w-[31%] h-full p-3 text-[11px]" >
                                Photo Taken Date
                            </div>
                        </div>
                        <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px]">
                            <div className="w-[7%] h-full p-3 text-[11px]" >
                                1
                            </div>
                            <div className="w-[31%] h-full py-1 px-3 text-[11px]" >
                            <input className='w-full h-full bg-[#F5F5F5]' type="text"  placeholder=' Paste the hyperlink here'/>
                            </div>
                            <div className="w-[31%] h-full py-1 px-3 text-[11px]" >
                            <input className='w-full h-full bg-[#F5F5F5]' type="text" />
                            </div>
                            <div className="w-[31%] h-full py-1 px-3 text-[11px]" >
                            <input className='w-full h-full bg-[#F5F5F5]' type="date" />
                            </div>
                        </div>
                        {addField.map((data,index) => {
                            return (
                                <AddFeildPhotos index={index}/>
                            )
                        })}
                        <div className="w-full h-full bg-[#E6ECF5] cursor-pointer p-2 mt-1 flex justify-center items-center">
                            <button className='text-[15px]' onClick={() => handleAdd()}>ADD  +</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Photos
