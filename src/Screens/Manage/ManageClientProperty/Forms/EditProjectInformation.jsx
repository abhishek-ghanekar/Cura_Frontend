import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';

const EditProjectInformation = ({clientData,initialSociety,initialStates,initialCities,formValues,setFormValues,propertyType,levelOfFurnishing,propertyStatus}) => {
  // console.log(levelOfFurnishing)
  console.log(formValues)
  console.log(formValues.client_property.leveloffurnishing)
  // const [propertyType, setPropertyType] = useState([]);
  // const [levelOfFurnishing, setLevelOfFurnishing] = useState([]);
  const [state, setState] = useState(initialStates);
  const [city, setCity] = useState(initialCities);
  const [society, setSociety] = useState([]);
  const [status, setStatus] = useState([]);
  const [electricity, setElectricity] = useState([]);
  const [existingSociety,setExistingSociety] = useState(initialSociety);
  const [clientName,setClientName] = useState(clientData);
  const dueDate = [];
  for(var i =1;i<=31;i++) {
    dueDate.push({
      id : i - 1,
      date : i
    })
  }

  const handleChange = (e) => {
    const {name,value} = e.target;
     setFormValues({...formValues,client_property : {
         ...formValues.client_property,
         [name] : value
     }})
   }
  return (
    <div className="h-auto w-full">
      <div className="flex gap-10 justify-center mt-3">
        <div className=" space-y-2 ">
          <div className="">
            <div className="text-[13px]">
                Client Name <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="clientid"
              value={formValues.client_property.clientid}
              onChange={handleChange}
            >
              <option>Select Client Name </option>
              {clientData &&
                clientData.map((item) => (
                  <option key={item[0]} value={item[0]}>
                    {item[1]}
                  </option>
                ))} 
           </select> 
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              Level of Furnishing <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="leveloffurnishing"
              onChange={handleChange}
              value={formValues.client_property.leveloffurnishing}
            >
              <option>Select Level of Furnishing</option>
              {levelOfFurnishing &&
                levelOfFurnishing.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              State <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="state"
              value={formValues.client_property.state}
              onChange={handleChange}
            >
              {/* <option>Select State</option> */}
              {initialStates &&
                initialStates.map((item) => (
                  <option key={item[0]} value={item[0]}>
                    {item[0]}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              Initial Possesion Date
            </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="date"
              name="initialpossessiondate"
              onChange={handleChange}
              value={formValues.client_property.initialpossessiondate}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Other Electricity Details </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="otherelectricitydetails"
              value={formValues.client_property.otherelectricitydetails}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Property Tax Number </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="propertytaxnumber"
              onChange={handleChange}
              value={formValues.client_property.propertytaxnumber}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>

          
          
          
          
          
          
        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">
              Society/Project Name <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px]  w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="projectid"
              onChange={handleChange}
              value={formValues.client_property.projectid}
            >
              <option>Select Builder </option>
              {initialSociety &&
                initialSociety.map((item) => (
                  <option key={item.projectid} value={item.projectid} >
                       <p>{item.buildername}</p> 
                       &nbsp;
                       &nbsp;
                       &nbsp;
                       <p>{item.projectname}</p> 
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Property Description <label className="text-red-500">*</label></div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="propertydescription"
              value={formValues.client_property.propertydescription}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              City <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="city"
              onChange={handleChange}
              value={formValues.client_property.city}
            >
              <option>Select City</option>
              {initialCities &&
                initialCities.map((item) => (
                  <option key={item.id} value={item.city}>
                    {item.city}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">Gas Connection Details </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="gasconnectiondetails"
              value={formValues.client_property.gasconnectiondetails}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              Number Of Parking
            </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="numberofparkings"
              value={formValues.client_property.numberofparkings}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Electricity Billing Unit </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="electricitybillingunit"
              value={formValues.client_property.electricitybillingunit}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          
        </div>
          
          
          
          
          
          
        </div>
        <div className="space-y-2">
           <div className="">
            <div className="text-[13px]">
              Property type <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="propertytype"
              onChange={handleChange}
              value={formValues.client_property.propertytype}
            >
              <option value="">Select Property Type </option>
              {propertyType &&
                propertyType.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>

          <div className="">
            <div className="text-[13px]">Property Manager </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="propertymanager"
              value={formValues.client_property.propertymanager}
              onChange={handleChange}

            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="suburb"
              value={formValues.client_property.suburb}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Electricity Consumer Number </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="electricityconsumernumber"
              value={formValues.client_property.electricityconsumernumber}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          
          <div className="">
            <div className="text-[13px]">Layout Details (Sch A)</div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="layoutdetails"
              value={formValues.client_property.layoutdetails}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Comments </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="comments"
              value={formValues.client_property.comments}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          
        </div>
        <div className="space-y-2">
        <div className="">
            <div className="text-[13px]">Status <label className="text-red-500">*</label></div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="status"
              value={formValues.client_property.status}
              onChange={handleChange}
            >
              <option>Select Status </option>
              {propertyStatus &&
                propertyStatus.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Client Service Manager </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="clientservicemanager"
              value={formValues.client_property.clientservicemanager}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Electricity Bill Due Date <label className="text-red-500">*</label></div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="electricitybillingduedate"
              value={formValues.client_property.electricitybillingduedate}
              onChange={handleChange}
            >
              <option>Select Date </option>
               {dueDate &&
                dueDate.map((item) => (
                  <option key={item.id} value={item.date}>
                    {item.date}
                  </option>
                ))} 
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>

          <div className="">
            <div className="text-[13px]">Text For Posting </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="textforposting"
              value={formValues.client_property.textforposting}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Internal Furniture and fittings (Sch B) </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="internalfurnitureandfittings"
              onChange={handleChange}
              value={formValues.client_property.internalfurnitureandfittings}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div> 

          
        </div>
      </div>
      <div className="mt-2 flex justify-center items-center gap-2">
        <div className="flex justify-center items-center text-[13px] font-semibold"><input
                        type="checkbox"
                        checked={formValues.client_property.propertyownedbyclientonly}
                        className='mr-3 h-4 w-4'
                        onClick={(e) => {
                            // console.log(e.target.checked)
                            const existing = {...formValues};
                            const temp = {...existing.client_property};
                            temp.propertyownedbyclientonly = !temp.propertyownedbyclientonly
                            existing.client_property = temp;
                            setFormValues(existing) 
                            // existing.status = !existing.status;
                            // setFormValues(existing)
          }}
        />
          Property Owner By Client Only</div>
        <div className="flex justify-center items-center text-[13px] font-semibold"><Checkbox label="Active" />
          Index || Collected </div>
      </div>
    </div>
  );
};

export default EditProjectInformation;