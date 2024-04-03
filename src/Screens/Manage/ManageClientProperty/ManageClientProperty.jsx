import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import ProjectInformation from "./Forms/ProjectInformation"
import Photos from "./Forms/Photos";
import POADetails from "./Forms/POADetails";
import OwnerDetails from "./Forms/OwnerDetails"
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import Add from "../../../assets/add.png";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
const ManageClientProperty = () => {

    const menuRef = useRef();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingEmployees, setExistingEmployees] = useState([]);
    const [existingClientProperty,setExistingClientProperty] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [allUsername, setAllUsername] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allEntities, setAllEntites] = useState([]);
    const [allLOB, setAllLOB] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [isClientInfoDialogue, setIsClientInfoDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [ClientNameInput, setClientNameInput] = useState("");
    const [ClientTypeFilter, setClientTypeFilter] = useState(false);
    const [ClientTypeInput, setClientTypeInput] = useState("");
    const [tenentOfFilter, setTenentOfFilter] = useState(false);
    const [tenentOfInput, setTenentOfInput] = useState("");
    const [countryFilter, setCountryFilter] = useState(false);
    const [countryInput, setCountryInput] = useState("");
    const [cityFilter, setCityFilter] = useState(false);
    const [cityInput, setCityInput] = useState("");
    const [phoneFilter, setPhoneFilter] = useState(false);
    const [PhoneInput, setPhoneInput] = useState("");
    const [emailFilter, setEmailFilter] = useState(false);
    const [EmailInput, setEmailInput] = useState("");
    const [employeeNameFilter, setEmployeeNameFilter] = useState(false);
    const [EmployeeNameInput, setEmployeeNameInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idInput, setIdInput] = useState("");
    const fetchCountryData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        console.log(result.data);
        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
    }
    const fetchStateData = async (id) => {
        console.log(id);
        const data = { "user_id": 1234, "country_id": id };
        // const data = {"user_id":1234,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }
    const fetchCityData = async (id) => {
        const data = { "user_id": 1234, "state_name": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCity(result)
            if (result.length > 0) {
                setFormValues((existing) => {
                    const newData = { ...existing, city: result[0].id }
                    return newData;
                })
            }
        }
    }
    const fetchUsersData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getUsers(data)
        const result = (await response.json());

        console.log(result.data);
        console.log('hey')
        setFormValues((existing) => {
            return { ...existing, userName: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllUsername(result.data);
        }
    }

    const fetchRoleData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getRoles(data)
        const result = (await response.json());
        console.log(result.data);
        setFormValues((existing) => {
            return { ...existing, role: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllRoles(result.data);
        }
    }

    const fetchEntitiesData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getEntityAdmin(data)
        const result = (await response.json());
        console.log(result.data);
        setFormValues((existing) => {
            return { ...existing, entity: result.data[0][0] }
        })
        if (Array.isArray(result.data)) {
            setAllEntites(result.data);
        }
    }

    const fetchLobData = async () => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "name", "lob_head", "company"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages)
        };
        const response = await APIService.getLob(data);
        const result = (await response.json());
        console.log(result.data);
        setFormValues((existing) => {
            return { ...existing, lob: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllLOB(result.data);
        }
    }
    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const fetchData = async () => {
        // console.log('ugm')
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
              "id",
              "client",
              "clientid",
              "project",
              "projectid",
              "propertytypeid",
              "propertytype",
              "suburb",
              "cityid",
              "city",
              "state",
              "countryid",
              "country",
              "layoutdetails",
              "numberofparkings",
              "internalfurnitureandfittings",
              "leveloffurnishing",
              "propertystatus",
              "status",
              "initialpossessiondate",
              "poagiven",
              "poaid",
              "electricityconsumernumber",
              "electricitybillingunit",
              "otherelectricitydetails",
              "gasconnectiondetails",
              "propertytaxnumber",
              "clientservicemanager",
              "propertymanager",
              "comments",
              "propertyownedbyclientonly",
              "textforposting",
              "dated",
              "createdby",
              "isdeleted",
              "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": 15
          };
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        // setExistingEmployees(result);
        setExistingClientProperty(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber);
        const data = {
            "user_id": 1234,
            "rows": [
              "id",
              "client",
              "clientid",
              "project",
              "projectid",
              "propertytypeid",
              "propertytype",
              "suburb",
              "cityid",
              "city",
              "state",
              "countryid",
              "country",
              "layoutdetails",
              "numberofparkings",
              "internalfurnitureandfittings",
              "leveloffurnishing",
              "propertystatus",
              "status",
              "initialpossessiondate",
              "poagiven",
              "poaid",
              "electricityconsumernumber",
              "electricitybillingunit",
              "otherelectricitydetails",
              "gasconnectiondetails",
              "propertytaxnumber",
              "clientservicemanager",
              "propertymanager",
              "comments",
              "propertyownedbyclientonly",
              "textforposting",
              "dated",
              "createdby",
              "isdeleted",
              "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages)
          };
          const response = await APIService.getClientProperty(data);
          const temp = await response.json();
          const result = temp.data;
          console.log(result)
          console.log(result);
          const t = temp.total_count;
          setTotalItems(t);
          // setExistingEmployees(result);
          setExistingClientProperty(result);
          setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
        setCurrentPages(quantity);
        const data = {
            "user_id": 1234,
            "rows": [
              "id",
              "client",
              "clientid",
              "project",
              "projectid",
              "propertytypeid",
              "propertytype",
              "suburb",
              "cityid",
              "city",
              "state",
              "countryid",
              "country",
              "layoutdetails",
              "numberofparkings",
              "internalfurnitureandfittings",
              "leveloffurnishing",
              "propertystatus",
              "status",
              "initialpossessiondate",
              "poagiven",
              "poaid",
              "electricityconsumernumber",
              "electricitybillingunit",
              "otherelectricitydetails",
              "gasconnectiondetails",
              "propertytaxnumber",
              "clientservicemanager",
              "propertymanager",
              "comments",
              "propertyownedbyclientonly",
              "textforposting",
              "dated",
              "createdby",
              "isdeleted",
              "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(quantity)
          };
          const response = await APIService.getClientProperty(data);
          const temp = await response.json();
          const result = temp.data;
          console.log(result)
          console.log(result);
          const t = temp.total_count;
          setTotalItems(t);
          setExistingClientProperty(result);
          setPageLoading(false);
    }
    useEffect(() => {
        fetchData();
        fetchCountryData();
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setClientNameFilter(false);
                setClientTypeFilter(false);
                setTenentOfFilter(false);
                setCountryFilter(false);
                setCityFilter(false);
                setPhoneFilter(false);
                setEmailFilter(false);
                setEmployeeNameFilter(false);
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const handleOpenEdit = (oldItem) => {
        console.log('called');
        setIsEditDialogue(true);
        setCurrItem(oldItem)
    };

    const handleOpen = () => {
        setIsClientInfoDialogue(true);
    };

    const handleClose = () => {
        setIsClientInfoDialogue(false);
    }

    const addEmployee = async () => {
        if (!validate()) {
            return;
        }
        // setPageLoading(true);
        const data = {
            "user_id": 1234,
            "employeename": formValues.employeeName,
            "employeeid": formValues.employeeId,
            "userid": 1236,
            "roleid": formValues.role,
            "dateofjoining": formValues.doj,
            "dob": formValues.dob,
            "panno": formValues.panNo,
            "status": false,
            "phoneno": Number(formValues.phNo),
            "email": formValues.email,
            "addressline1": formValues.addressLine1,
            "addressline2": formValues.addressLine2,
            "suburb": formValues.suburb,
            "city": formValues.city,
            "state": Number(formValues.state),
            "country": Number(formValues.country),
            "zip": formValues.zipCode,
            "dated": "20-01-2020  00:00:00",
            "createdby": 1234,
            "isdeleted": false,
            "entityid": formValues.entity,
            "lobid": formValues.lob == null ? "" : formValues.lob,
            "lastdateofworking": formValues.lastDOW,
            "designation": formValues.designation
        }
        const response = await APIService.addEmployee(data);

        const result = (await response.json())
        setIsClientInfoDialogue(false);
        openAddSuccess();
        console.log(data);
        console.log(result);
    }

    const [selectedDialog, setSelectedDialogue] = useState(1);

    const selectFirst = () => {
        setSelectedDialogue(1);
    }

    const selectSecond = () => {
        setSelectedDialogue(2);
    }

    const selectThird = () => {
        setSelectedDialogue(3);
    }

    const selectForth = () => {
        setSelectedDialogue(4);
    }

    const initialValues = {
        employeeName: "",
        panNo: "",
        userName: "",
        doj: "",
        designation: "",
        email: "",
        addressLine1: "",
        employeeId: "",
        lob: "",
        dob: "",
        lastDOW: "",
        role: "",
        phNo: "",
        addressLine2: "",
        country: "",
        state: "",
        city: "",
        suburb: "",
        zipCode: "",
        entity: ""

    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    // validate form and to throw Error message
    const validate = () => {
        var res = true;
        if (!formValues.employeeName) {
            setFormErrors((existing) => {
                return { ...existing, employeeName: "Enter Employee name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeeName: "" }
            })
        }
        if (!formValues.panNo) {
            setFormErrors((existing) => {
                return { ...existing, panNo: "Enter Pan Number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, panNo: "" }
            })
        }
        if (!formValues.doj) {
            setFormErrors((existing) => {
                return { ...existing, doj: "Enter date of joining" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, doj: "" }
            })
        }
        if (!formValues.designation) {
            setFormErrors((existing) => {
                return { ...existing, designation: "Enter Designation" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, designation: "" }
            })
        }
        if (!formValues.email) {
            setFormErrors((existing) => {
                return { ...existing, email: "Enter email address" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, email: "" }
            })
        }
        if (!formValues.employeeId) {
            setFormErrors((existing) => {
                return { ...existing, employeeId: "Enter Employee Id" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeeId: "" }
            })
        }
        if (!formValues.lob) {
            setFormErrors((existing) => {
                return { ...existing, lob: "Select LOB" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, lob: "" }
            })
        }
        if (!formValues.dob) {
            setFormErrors((existing) => {
                return { ...existing, dob: "enter date of birth" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, dob: "" }
            })
        }
        if (!formValues.role) {
            setFormErrors((existing) => {
                return { ...existing, role: "Select Role" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, role: "" }
            })
        }
        if (!formValues.phNo) {
            setFormErrors((existing) => {
                return { ...existing, phNo: "Enter phone number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, phNo: "" }
            })
        }
        if (!formValues.country) {
            setFormErrors((existing) => {
                return { ...existing, country: "Select country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        if (formValues.state == "") {
            setFormErrors((existing) => {
                return { ...existing, state: "Select state" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        if (!formValues.city) {
            setFormErrors((existing) => {
                return { ...existing, city: "Select city" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
            })
        }
        if (!formValues.suburb) {
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter suburb" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }
        if (!formValues.entity) {
            setFormErrors((existing) => {
                return { ...existing, entity: "Select Entity" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, entity: "" }
            })
        }
        return res;
    }

    const deleteEmployee = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteEmployee(data);
        openDeleteSuccess();
    }
    const handlePageChange = (event, value) => {
        console.log(value);
        setCurrentPage(value)
        fetchPageData(value);
    }
    const handleRefresh = () => {
        fetchData();
    }
    const openDownload = () => {
        setDownloadModal(true);
    }
    const closeDownload = () => {
        setDownloadModal(false);
    }
    const handleExcelDownload = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getEmployees(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ClientInfoData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": searchInput
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingEmployees(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingEmployees(result);
        setPageLoading(false);
    }
    const openAddSuccess = () => {
        // (false);
        setShowAddSuccess(true);
        setTimeout(function () {
            setShowAddSuccess(false);
        }, 2000)
        fetchData();
    }
    const openDeleteSuccess = () => {
        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
        fetchData();
    }
    const openEditSuccess = () => {
        setIsEditDialogue(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
    }
    return (
        <div>
            <Navbar />
            {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="successfully Added Employee" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Successfully Deleted Employee" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="successfully Updated Employee" />}
            <div className='flex-col w-full h-full  bg-white'>
                <div className='flex-col'>
                    {/* this div will have all the content */}
                    <div className='w-full  flex-col px-6'>
                        {/* the top section of the div */}
                        <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                                    <img className='w-5 h-5' src={backLink} />
                                </div>

                                <div className='flex-col'>
                                    <h1 className='text-[18px]'>Manage Client Property</h1>
                                    <p className='text-[14px]'>Manage &gt; Manage Client property</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 items-center'>

                                <div className='flex relative'>
                                    {/* search button */}
                                    <input
                                        className="h-[36px] bg-[#EBEBEB] text-[#787878]"
                                        type="text"
                                        placeholder="  Search"
                                        value={searchInput}
                                        onChange={(e) => {
                                            setSearchInput(e.target.value);
                                        }}
                                    />
                                    <button onClick={handleCloseSearch}><img src={Cross} className='absolute w-[20px] h-[20px] left-[160px] top-2' /></button>
                                    <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                        <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                                    </div>
                                </div>

                                <div>
                                    {/* button */}
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[250px] rounded-lg" onClick={handleOpen}>
                                        <div className="flex items-center justify-center gap-4">
                                            Add New Client
                                            <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                        </div>
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full bg-white'>
                            <div className='w-full h-12 bg-white flex justify-between'>
                                <div className="w-[85%] flex">
                                    <div className='w-[3%] flex'>
                                        <div className='p-3'>
                                            {/* <p>Sr.</p> */}
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[87%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setClientNameInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setClientNameFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {clientNameFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setClientTypeInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setClientTypeFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {ClientTypeFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[8%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-9 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setTenentOfInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setTenentOfFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {tenentOfFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setCountryInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setCountryFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {countryFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[9%]  flex p-3'>
                                        <div className="w-[73%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-7 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setCityInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setCityFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {cityFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[17%]  flex p-3'>
                                        <div className="w-[55%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setPhoneInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setPhoneFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {phoneFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[17%]  flex p-3'>
                                        <div className="w-[55%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setEmailInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setEmailFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {emailFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="w-[15%] flex">
                                    <div className='w-1/2  flex p-3'>
                                        <div className="w-[97%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-10 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setIdInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {idFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-1/2  flex'>
                                        <div className='p-3'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[400px] bg-white px-6 text-[12px]'>
                    <div className='w-full h-16 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[85%] flex">
                                <div className='w-[3%] flex'>
                                    <div className='px-3 py-5'>
                                        <p>Sr.</p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3 '>
                                        <p>Client  </p>
                                        <p>Name</p>
                                    </div>
                                    <div className="font-extrabold py-5">↑↓</div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Property</p>
                                        <p>Suburb</p>                         
                                    </div>
                                    <div className="font-extrabold py-5">↑↓</div>
                                </div>
                                <div className='w-[8%]  flex'>
                                    <div className='p-3'>
                                        <p>Property City </p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Property  </p>
                                        <p>Type</p>
                                    </div>
                                    <div className="font-extrabold py-5">↑↓</div>
                                </div>
                                <div className='w-[9%]  flex'>
                                    <div className='p-3'>
                                        <p>Property</p>
                                        <p>Status</p>
                                    </div>
                                    <div className="font-extrabold py-5">↑↓</div>
                                </div>
                                <div className='w-[17%]  flex'>
                                    <div className='px-3 py-5'>
                                        <p>Property Description <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[17%]  flex'>
                                    <div className='px-3 py-5'>
                                        <p>Society/Property Name <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[8%]  flex'>
                                    <div className='p-3'>

                                    </div>
                                </div>
                                <div className='w-[8%]  flex'>
                                    <div className='p-3'>

                                    </div>
                                </div>
                            </div>
                            <div className="w-[15%] flex">
                                <div className='w-1/2  flex'>
                                    <div className='px-3 py-5'>
                                        <p>ID <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-1/2  flex'>
                                    <div className='px-3 py-5'>
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='w-full h-80 overflow-auto'>
                            {existingClientProperty.map((item,index) => {
                                return  <div className='w-full h-16 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                                <div className="w-[85%] flex">
                                        <div className='w-[3%] flex'>
                                            <div className='px-3 py-5'>
                                                <p>{index+1}</p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex'>
                                            <div className='p-3 '>
                                                <p>Client  </p>
                                                <p>Name</p>
                                            </div>
                                            <div className="font-extrabold py-5">↑↓</div>
                                        </div>
                                        <div className='w-[10%]  flex'>
                                            <div className='p-3'>
                                                <p>{item.suburb}</p>    
                                            </div>
                                        </div>
                                        <div className='w-[8%]  flex'>
                                            <div className='p-3'>
                                                <p>{item.city} </p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex'>
                                            <div className='p-3'>
                                                <p>{item.propertytype}</p>
                                            </div>
                                           
                                        </div>
                                        <div className='w-[9%]  flex'>
                                            <div className='p-3'>
                                                <p>{item.propertystatus}</p>
                                            </div>
                                            <div className="font-extrabold py-5">↑↓</div>
                                        </div>
                                        <div className='w-[17%]  flex'>
                                            <div className='px-3 py-5'>
                                                <p>Property Description <span className="font-extrabold">↑↓</span></p>
                                            </div>
                                        </div>
                                        <div className='w-[17%]  flex'>
                                            <div className='px-3 py-5'>
                                                <p>Society/Property Name <span className="font-extrabold">↑↓</span></p>
                                            </div>
                                        </div>
                                        <div className='w-[8%]  flex'>
                                            <div className='p-3'>
        
                                            </div>
                                        </div>
                                        <div className='w-[8%]  flex'>
                                            <div className='p-3'>
        
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[15%] flex">
                                        <div className='w-1/2  flex'>
                                            <div className='px-3 py-5'>
                                                <p>ID <span className="font-extrabold">↑↓</span></p>
                                            </div>
                                        </div>
                                        <div className='w-1/2  flex'>
                                            <div className='px-3 py-5'>
                                                <p>Edit</p>
                                            </div>
                                        </div>
                                    </div>
        
                                </div>
                            })}
                        </div>
                    </div>

                    <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 bg-white '>
                        {/* footer component */}
                        <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                <Pagination count={Math.ceil(totalItems / currentPages)} onChange={handlePageChange} page={currentPage} />

                            </div>
                        </div>
                        <div className='flex mr-10 justify-center items-center space-x-2 '>
                            <div className="flex mr-8 space-x-2 text-sm items-center">
                                <p className="text-gray-700">Items Per page</p>
                                <select className="text-gray-700 border-black border-[1px] rounded-md p-1"
                                    name="currentPages"
                                    value={currentPages}
                                    //  defaultValue="Select State"
                                    onChange={e => {
                                        setCurrentPages(e.target.value);
                                        console.log(e.target.value);

                                        fetchQuantityData(e.target.value)
                                    }}

                                >
                                    <option>
                                        15
                                    </option>
                                    <option>
                                        25
                                    </option>
                                    <option>
                                        50
                                    </option>
                                </select>
                            </div>
                            <div className="flex text-sm">
                                <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems / currentPages)} Pages</p>
                            </div>
                            {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center justify-center  p-5'>
                                <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 left-1 w-4 h-4' /></button>

                                <button>
                                    <div className='flex space-x-2 justify-center items-center ml-3 mt-3'>

                                        <p>Download as pdf</p>
                                        <img src={Pdf} />
                                    </div>
                                </button>
                                <button onClick={handleExcelDownload}>
                                    <div className='flex space-x-2 justify-center items-center mt-5 ml-3'>
                                        <p>Download as Excel</p>
                                        <img src={Excel} />
                                    </div>
                                </button>
                            </div>}

                            <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2' >
                                {/* refresh */}
                                <button onClick={handleRefresh}><p>Refresh</p></button>
                                <img src={refreshIcon} className="h-2/3" />
                            </div>
                            <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2'>
                                {/* download */}
                                <button onClick={openDownload}><p>Download</p></button>
                                <img src={downloadIcon} className="h-2/3" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isClientInfoDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Client</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectFirst}>
                                <div>Project Information</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectSecond}>
                                <div>Photos</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectThird}>
                                <div>POA Details</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectForth}>
                                <div>Owner Details</div>
                            </div>
                        </div>

                        {selectedDialog == 1 && <ProjectInformation  />}
                        {selectedDialog == 2 && <Photos />}
                        {selectedDialog == 3 && <POADetails />}
                        {selectedDialog == 4 && <OwnerDetails />}

                        <div className="my-[10px] flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => { }} >Add</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageClientProperty;