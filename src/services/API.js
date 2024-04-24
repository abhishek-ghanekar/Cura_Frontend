

const env_URL_SERVER=import.meta.env.VITE_ENV_URL_SERVER
// const env_URL_SERVER="http://192.168.10.183:8000/"
const API={
    "LOGIN":"$env_URL_SERVERvalidateCredentials",

}

const USER_ID="";
const METHOD_POST = (data) => ({
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });



const getCountries= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}getCountries`, METHOD_POST(data));
  return response;
 }
const getState= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}getStates`, METHOD_POST(data));
  return response;
 }
 const getStatesAdmin= async (data)=> {
  const response = await fetch(`${env_URL_SERVER}getStatesAdmin`, METHOD_POST(data));
return response;
}
const getCitiesAdmin= async (data)=> {
  const response = await fetch(`${env_URL_SERVER}getCitiesAdmin`, METHOD_POST(data));
return response;
}
 const getCities = async (data) => {
    const response = await fetch(`${env_URL_SERVER}getCities`, METHOD_POST(data));
    return response;
 }

 const addCountries= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}addCountry`, METHOD_POST(data));
    return response;
 }
 const editCountry= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}editCountry`, METHOD_POST(data));
    return response;
 } 
 const getNewBuilderInfo= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}getBuilderInfo`, METHOD_POST(data));
  return response;
 }
 const addNewBuilder =async (data) => {
  const response = await fetch(`${env_URL_SERVER}addBuilderInfo`, METHOD_POST(data));
  return response;
 }
 const editBuilderInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editBuilder`, METHOD_POST(data));
  return response;
 }
 const deleteBuilderInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteBuilder`, METHOD_POST(data));
  return response;
 }
 const deleteCountries = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteCountry`, METHOD_POST(data));
  return response;
 }
 const getLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getLob`, METHOD_POST(data));
  return response;
 }
 const addLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addLob`, METHOD_POST(data));
  return response;
 }
 const deleteLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteLob`, METHOD_POST(data));
  return response;
 }
 const editLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editLob`, METHOD_POST(data));
  return response;
 }
 const getBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getBankSt`, METHOD_POST(data));
  return response;
 }
 const addBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addBankSt`, METHOD_POST(data));
  return response;
 }
 const editBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editBankSt`, METHOD_POST(data));
  return response;
 }

 const deleteBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteBankSt`, METHOD_POST(data));
  return response;
 }

 const getVendorAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getVendorAdmin`, METHOD_POST(data));
  return response;
 }

 const getEmployees = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getEmployee`, METHOD_POST(data));
  return response;
 }
 const addEmployee = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addEmployee`, METHOD_POST(data));
  return response;
 }
 const getLocality = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getLocality`, METHOD_POST(data));
  return response;
 }
 const getClientAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientAdmin`, METHOD_POST(data));
  return response;
 }
 const deleteLocality = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteLocality`, METHOD_POST(data));
  return response;
 }
 const getEntityAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getEntityAdmin`, METHOD_POST(data));
  return response;
 }
 const getModesAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getModesAdmin`, METHOD_POST(data));
  return response;
 }

 const addLocality = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addLocality`, METHOD_POST(data));
  return response;
 }

 const getHowReceivedAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getHowReceivedAdmin`, METHOD_POST(data));
  return response;
 }
 const addClientReceipt = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addClientReceipt`, METHOD_POST(data));
  return response;
 }
 const getPayment = async  (data) => {
  const response = await fetch(`${env_URL_SERVER}getPayments`, METHOD_POST(data));
  return response;
 }
 const getProjectInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getProjects`, METHOD_POST(data));
  return response;
 }
 const editLocality = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editLocality`, METHOD_POST(data));
  return response;
 }
 const getUsers = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getUsersAdmin`, METHOD_POST(data));
  return response;
 }
 const getRoles = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getRolesAdmin`, METHOD_POST(data));
  return response;
 }
 const deleteEmployee = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteEmployee`, METHOD_POST(data));
  return response;
 }
 const addPayment = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addPayment`, METHOD_POST(data));
  return response;
 }
 const deletePayment = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deletePayment`, METHOD_POST(data));
  return response;
 }
 const editPayment = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editPayment`, METHOD_POST(data));
  return response;
 }
 const getPaymentFor = async (data) => {
  const response = await fetch(`${env_URL_SERVER}paymentForAdmin`, METHOD_POST(data));
  return response;
 }
 const getPaymentMode = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getModesAdmin`, METHOD_POST(data));
  return response;
 }
 const getProspects = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getResearchProspect`, METHOD_POST(data));
  return response;
 }
 const addProspects = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addResearchProspect`, METHOD_POST(data));
  return response;
 }
 const editProspects = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editResearchProspect`, METHOD_POST(data));
  return response;
 }
 const deleteProspects = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteResearchProspect`, METHOD_POST(data));
  return response;
 }
 const editEmployee = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editEmployee`, METHOD_POST(data));
  return response;
 }

 const getItembyId = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getItembyId`, METHOD_POST(data));
  return response;
 }
 const getItemByAttr = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getItemByAttr`, METHOD_POST(data));
  return response;
 }
 const getProjectsByBuilderId = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getProjectsByBuilderId`, METHOD_POST(data));
  return response;
 }
 const getClientInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientInfo`, METHOD_POST(data));
  return response;
 }
 const getClientProperty = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientProperty`, METHOD_POST(data));
  return response;
 }
 const getClientTypeAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientTypeAdmin`, METHOD_POST(data));
  return response;
 }
 const getTenantOfPropertyAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getTenantOfPropertyAdmin`, METHOD_POST(data));
  return response;
 }
 const getRelationAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getRelationAdmin`, METHOD_POST(data));
  return response;
 }
 const addClientInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addClientInfo`, METHOD_POST(data));
  return response;
 }
 const deleteClientInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteClientInfo`, METHOD_POST(data));
  return response;
 }
 const getClientInfoByClientId = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientInfoByClientId`, METHOD_POST(data));
  return response;
 }
 const editCLientInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editClientInfo`, METHOD_POST(data));
  return response;
 }
 const getBuildersAndProjectsList = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getBuildersAndProjectsList`, METHOD_POST(data));
  return response;
 }
 const getPropertyStatusAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getPropertyStatusAdmin`, METHOD_POST(data));
  return response;
 }

 const getLevelOfFurnishingAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getLevelOfFurnishingAdmin`, METHOD_POST(data));
  return response;
 }
 const getPropertyType = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getPropertyType`, METHOD_POST(data));
  return response;
 }
 const addClientProperty = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addClientProperty`, METHOD_POST(data));
  return response;
 }
 const getClientAdminPaginated = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientAdminPaginated`, METHOD_POST(data));
  return response;
 }
 const getClientPropertyById = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientPropertyById`, METHOD_POST(data));
  return response;
 }
 const editClientProperty = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editClientProperty`, METHOD_POST(data));
  return response;
 }
 const deleteClientProperty = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteClientProperty`, METHOD_POST(data));
  return response;
 }
 const getClientReceipt = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientReceipt`, METHOD_POST(data));
  return response;
 }
 const getPmaAgreement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientPMAAgreement`, METHOD_POST(data));
  return response;
 }
 const deleteClientReceipt = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteClientReceipt`, METHOD_POST(data));
  return response;
 }
 const editClientReceipt = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editClientReceipt`, METHOD_POST(data));
  return response;
 }
 const deletePmaAgreement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteClientPMAAgreement`, METHOD_POST(data));
  return response;
 }
 const addPmaAgreement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addClientPMAAgreement`, METHOD_POST(data));
  return response;
 }
 const getLLAgreement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientLLAgreement`, METHOD_POST(data));
  return response;
 }

 const addLLAgreement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addClientLLAgreement`, METHOD_POST(data));
  return response;
 }

 const deleteLLAgreement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteClientLLAgreement`, METHOD_POST(data));
  return response;
 }

 const getClientPropertyByClientId = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientPropertyByClientId`, METHOD_POST(data));
  return response;
 }
 const getOrdersByClientId = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getOrdersByClientId`, METHOD_POST(data));
  return response;
 }
 const editClientPMAAgreement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editClientPMAAgreement`, METHOD_POST(data));
  return response;
 }
 const editClientLLAgreement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editClientLLAgreement`, METHOD_POST(data));
  return response;
 }
 const addProject = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addProject`, METHOD_POST(data));
  return response;
 }
 const deleteProject = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteProject`, METHOD_POST(data));
  return response;
 }
 const getOrder = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getOrders`, METHOD_POST(data));
  return response;
 }
 const addOrder = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addOrders`, METHOD_POST(data));
  return response;
 }
 const getOrderStatusAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getOrderStatusAdmin`, METHOD_POST(data));
  return response;
 }
 const getClientPropertyAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientPropertyAdmin`, METHOD_POST(data));
  return response;
 }
 const getServiceAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getServiceAdmin`, METHOD_POST(data));
  return response;
 }
 const getTallyLedgerAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getTallyLedgerAdmin`, METHOD_POST(data));
  return response;
 }

 const deleteOrders = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteOrders`, METHOD_POST(data));
  return response;
 }

 const getOrderDataById = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getOrderById`, METHOD_POST(data));
  return response;
 }
 const getOrderReceipt = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getOrderReceipt`, METHOD_POST(data));
  return response;
 }
 const addOrderReceipt = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addOrderReceipt`, METHOD_POST(data));
  return response;
 }
 const getClientInvoice = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getOrdersInvoice`, METHOD_POST(data));
  return response;
 }
 const deleteOrderReceipt = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteOrdersReceipt`, METHOD_POST(data));
  return response;
 }

 // if status update == true



 export  const APIService = { getCountries, getNewBuilderInfo, editCountry, addCountries, getState, getCities,addNewBuilder,editBuilderInfo,deleteBuilderInfo,deleteCountries,
  getStatesAdmin, getCitiesAdmin,getLob,addLob,editLob,getBankStatement, editBankStatement,deleteBankStatement,getVendorAdmin,deleteLob,getEmployees,addEmployee,
  getLocality,addBankStatement,addLocality,deleteLocality,getModesAdmin,getEntityAdmin,getHowReceivedAdmin,getClientAdmin,addClientReceipt,getPayment,getProjectInfo,editLocality,getUsers,getRoles,deleteEmployee,getPaymentFor,getPaymentMode,addPayment,getProspects,addProspects,editProspects,deleteProspects,editEmployee,getItembyId,editPayment,deletePayment,getItemByAttr,getProjectsByBuilderId,getClientInfo,getClientProperty,getClientTypeAdmin,getTenantOfPropertyAdmin,getRelationAdmin,addClientInfo,deleteClientInfo,getClientInfoByClientId,editCLientInfo,getBuildersAndProjectsList,getPropertyStatusAdmin,getLevelOfFurnishingAdmin,getPropertyType,addClientProperty,getClientAdminPaginated, getClientPropertyById,editClientProperty,deleteClientProperty,getClientReceipt,getPmaAgreement,deleteClientReceipt,editClientReceipt,deletePmaAgreement,addPmaAgreement,getLLAgreement,getClientPropertyByClientId,getOrdersByClientId,editClientPMAAgreement,addLLAgreement,deleteLLAgreement,editClientLLAgreement,addProject,deleteProject,getOrder,addOrder,getOrderStatusAdmin,getClientPropertyAdmin,getServiceAdmin,getTallyLedgerAdmin,deleteOrders,getOrderDataById,
  getOrderReceipt,addOrderReceipt,getClientInvoice,deleteOrderReceipt};


  
