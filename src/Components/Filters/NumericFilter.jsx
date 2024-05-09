import React from 'react'

const NumericFilter = ({inputVariable,setInputVariable,handleFilter,columnName,menuRef}) => {
  return (
    <div className='h-[400px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute flex-col rounded-md space-y-0 text-sm z-40' ref={menuRef}>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'noFilter', columnName)} className='w-[150px] p-1'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start'> 
                                                    <h1 >No Filter</h1> 
                                            </div>
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'equalTo', columnName)} className='w-[150px] p-1'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start'>
                                                    <h1 >EqualTo</h1>
                                            </div>
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'notEqualTo',columnName)} className='w-[150px] p-1'>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start'>
                                            <h1 >NotEqualTo</h1>
                                    </div>
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'greaterThan', columnName)} className='w-[150px] p-1'>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start'>
                                            <h1 >GreaterThan</h1>
                                    </div>
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'lessThan', columnName)} className='w-[150px] p-1'>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start '>
                                            <h1 >LessThan</h1>
                                    </div>
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'greaterThanOrEqualTo', columnName)} className='w-[150px] p-1'>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start'>
                                            <h1 >GreaterThanOrEqualTo</h1>
                                    </div>
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'lessThanOrEqualTo', columnName)} className='w-[150px] p-1'>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start'>
                                            <h1 >LessThanOrEqualTo</h1>
                                    </div>
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'between', columnName)} className='w-[150px] p-1'>
                                   
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'isNull', columnName)} className='w-[150px] p-1'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start'>
                                                    <h1 >isNull</h1>
                                            </div>
                                            </button>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'isNotNull', columnName)} className='w-[150px] p-1'>
                                                <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start'>
                                                        <h1 >isNotNull</h1>
                                                </div>
                                        </button>
                                </div>
  )
}

export default NumericFilter
