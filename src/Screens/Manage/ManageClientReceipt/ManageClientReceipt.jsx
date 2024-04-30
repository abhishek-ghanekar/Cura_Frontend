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
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import Add from "../../../assets/add.png";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import FailureModal from '../../../Components/modals/FailureModal';
import AsyncSelect from "react-select/async"
import DeleteClientReceipt from './deleteClientReceipt';
import SaveConfirmationClientReceipt from './SaveConfirmationClientReceipt';
import EditClientReceipt from './EditClientReceipt';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../../Components/Filters/CharacterFilter"
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
const ManageClientReceipt = () => {
    const initialRows = [
        "id",
        "receivedby",
        "receivedbyname",
        "amount",
        "recddate",
        "tds",
        "paymentmode",
        "paymentmodename",
        "clientid",
        "clientname",
        "receiptdesc",
        "dated",
        "createdby",
        "isdeleted",
        "serviceamount",
        "reimbursementamount",
        "entityid",
        "entity",
        "howreceived",
        "howreceivedid",
        "officeid",
        "office"
    ]
    const menuRef = useRef();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingEmployees, setExistingEmployees] = useState([]);
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
    const [isClientReceiptDialogue, setIsClientReceiptDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [clientNameFilterInput, setClientNameFilterInput] = useState("");
    const [amountFilter, setAmountFilter] = useState(false);
    const [amountFilterInput, setAmountFilterInput] = useState("");
    const [serviceAmountFilter, setServiceAmountFilter] = useState(false);
    const [serviceAmountFilterInput, setServiceAmountFilterInput] = useState("");
    const [reimbusmentAmountFilter, setReimbusmentAmountFilter] = useState(false);
    const [reimbusmentAmountFilterInput, setReimbusmentAmountFilterInput] = useState("");
    const [receivedDateFilter, setReceivedDateFilter] = useState(false);
    const [receivedDateFilterInput, setReceivedDateFilterInput] = useState("");
    const [receivedModeFilter, setReceivedModeFilter] = useState(false);
    const [receivedModeFilterInput, setReceivedModeFilterInput] = useState("");
    const [receivedByFilter, setReceivedByFilter] = useState(false);
    const [receivedByFilterInput, setReceivedByFilterInput] = useState("");
    const [TDSFilter, setTDSFilter] = useState(false);
    const [TDSFilterInput, setTDSFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idFilterInput, setIdFilterInput] = useState("");

    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false)
    // const [deleteConfirmation, showDeleteConfirmation] = useState(false);
    const [existingClientReceipt, setExistingClientReceipt] = useState([]);
    // const [howReceivedData,setHowReceivedData] = useState([])
    // const [filterArray,setFilterArray] = useState([]);

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
    // const [howReceived,setHowReceivedData] = useState([])
    const [modesData, setModesData] = useState([]);
    const fetchHowReceivedData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getHowReceivedAdmin(data)
        const res = await response.json()
        console.log(res)
        setHowReceivedData(res.data)
    }
    const fetchModesData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getModesAdmin(data)
        const res = await response.json()
        setModesData(res.data)
        console.log(res)
    }
    const fetchCityData = async (id) => {
        const data = { "user_id": 1234, "state_name": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCity(result)
            // if (result.length > 0) {
            //     // setFormValues((existing) => {
            //     //     const newData = { ...existing, city: result[0].id }
            //     //     return newData;
            //     // })
            // }
        }
    }
    // const fetchUsersData = async () => {
    //     setPageLoading(true);
    //     // const data = { "user_id":  1234 };
    //     const data = { "user_id": 1234 };
    //     const response = await APIService.getUsers(data)
    //     const result = (await response.json());

    //     console.log(result.data);
    //     console.log('hey')
    //     setFormValues((existing) => {
    //         return { ...existing, userName: result.data[0].id }
    //     })
    //     if (Array.isArray(result.data)) {
    //         setAllUsername(result.data);
    //     }
    // }

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


    const [filterState, setFilterState] = useState([]);
    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const fetchData = async () => {
        console.log('ugm')
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": initialRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getClientReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientReceipt(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage((prev) => pageNumber)
        const data = {
            "user_id": 1234,
            "rows": initialRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getClientReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientReceipt(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": initialRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getClientReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientReceipt(result);
        setPageLoading(false);
    }
    useEffect(() => {
        fetchData();
        fetchHowReceivedData()
        fetchModesData()
        fetchCountryData();
        fetchStateData(5)
        fetchCityData("Maharashtra");
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();


        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setClientNameFilter(false);
                setAmountFilter(false);
                setServiceAmountFilter(false);
                setReimbusmentAmountFilter(false);
                setReceivedDateFilter(false);
                setReceivedModeFilter(false);
                setReceivedByFilter(false);
                setTDSFilter(false);
                setIdFilter(false);
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
        setIsClientReceiptDialogue(true);
    };

    const handleClose = () => {
        setIsClientReceiptDialogue(false);
    }

    // harcoded dropdown
    const receivedBy = [1, 2, 3, 4];
    const receiptMode = [1, 2, 3, 4];
    const client = [1, 2, 3, 4];
    // const howReceived = [1, 2, 3, 4];
    const [howReceivedData, setHowReceivedData] = useState([]);
    //end
    const [usersData, setUsersData] = useState([]);
    const fetchUsersData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getUsers(data)
        const res = await response.json()
        const existing = { ...formValues }
        existing.receivedBy = res.data[0].id,
            console.log(existing.receivedBy)
        setFormValues(existing)
        setUsersData(res.data)
    }
    const handleAddClientReceipt = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        setIsClientReceiptDialogue(false)
        setOpenAddConfirmation(true);
        // setIsEmployeeDialogue(false);
        // setIsClientReceiptDialogue(false)
        // setOpenAddConfirmation(true)

    }

    const initialValues = {
        receivedDate: null,
        receivedBy: 1,
        receiptMode: 5,
        client: "",
        howReceived: null,
        serviceAmount: null,
        reimbursementAmount: null,
        amountReceived: null,
        TDS: null,
        receiptDescription: null,

    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [currClientReceipt, setCurrClientReceipt] = useState({});

    const handleEdit = (item) => {
        // we need to handle opening the edit here
        setCurrClientReceipt(item)
        setIsEditDialogue(true);
    }

    // validate form and to throw Error message
    const validate = () => {
        var res = true;
        if (!formValues.receivedDate) {
            setFormErrors((existing) => {
                return { ...existing, receivedDate: "Select Received Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, receivedDate: "" }
            })
        }
        if (!formValues.howReceived) {
            setFormErrors((existing) => {
                return { ...existing, howreceived: "Select How Received" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, howreceived: "" }
            })
        }

        if (!formValues.client) {
            setFormErrors((existing) => {
                return { ...existing, client: "Select Client" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, client: "" }
            })
        }
        if (!formValues.amountReceived) {
            setFormErrors((existing) => {
                return { ...existing, amountReceived: "Enter Amount Received" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, amountReceived: "" }
            })
        }
        
        return res;
    }
    const [currEmployeeId, setCurrEmployeeId] = useState("");


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
            "rows": 
            [
                "clientname",
                "amount",
                "serviceamount",
                "reimbursementamount",
                "recddate",
                "paymentmodename",
                "receivedbyname",
                "tds",
                "id"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput
        };
        const response = await APIService.getClientReceipt(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ClientReceiptData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        setCurrentPage((prev) => 1);
        const data = {
            "user_id": 1234,
            "rows": initialRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getClientReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientReceipt(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        setCurrentPage(1);
        const data = {
            "user_id": 1234,
            "rows": initialRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getClientReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientReceipt(result);
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
    const openFailureModal = () => {
        setIsFailureModal(true);
        setTimeout(function () {
            setIsFailureModal(false);
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
        setIsEditDialogue(false)
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
    }


    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({
        label: "Select Client",
        value: null
    });
    const [query, setQuery] = useState('')
    const handleClientNameChange = (e) => {
        console.log('hey')
        console.log(e)
        //  setFormValues({...formValues,client_property : {
        //   ...formValues.client_property,
        //   clientid : e.value
        //  }})
        setCurrClientName(e.label);
        const existing = { ...formValues }
        existing.client = e.value
        setFormValues(existing)
        console.log(formValues)
        setSelectedOption(e)
    }
    const loadOptions = async (e) => {
        console.log(e)
        if (e.length < 3) return;
        const data = {
            "user_id": 1234,
            "pg_no": 0,
            "pg_size": 0,
            "search_key": e
        }
        const response = await APIService.getClientAdminPaginated(data)
        const res = await response.json()
        const results = res.data.map(e => {
            return {
                label: e[1],
                value: e[0]
            }
        })
        if (results === 'No Result Found') {
            return []
        }
        return results
    }
    const [currReceiptId, setCurrReceiptId] = useState(0);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const handleDelete = (id) => {
        setCurrReceiptId(id)
        setDeleteConfirmation(true)
    }
    const addClientReceipt = async () => {
        const data = {
            "user_id": 1234,
            "receivedby": formValues.receivedBy,
            "amount": Number(formValues.amountReceived),
            "tds": Number(formValues.TDS),
            "recddate": formValues.receivedDate,
            "paymentmode": Number(formValues.receiptMode),
            "clientid": formValues.client,
            "receiptdesc": formValues.receiptDescription,
            "serviceamount": formValues.serviceAmount,
            "reimbursementamount": formValues.reimbursementAmount,
            "entityid": 1,
            "howreceivedid": Number(formValues.howReceived),
            "officeid": 1
        }
        const response = await APIService.addClientReceipt(data)
        const res = await response.json()
        if (res.result == 'success') {
            setOpenAddConfirmation(false)
            openAddSuccess()
            fetchData()
        }
        console.log(data)

    }
    const deleteClientRceipt = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }

        const response = await APIService.deleteClientReceipt(data)
        const res = await response.json()
        setDeleteConfirmation(false)
        if(res.result == 'success') {
            openDeleteSuccess()
        }
        fetchData()
    }
    const [currClientName, setCurrClientName] = useState("")

    const filterMapping = {
        clientname : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        amount : {
            filterType : "",
            filterValue : "",
            filterData : "Numeric",
            filterInput : ""
        },
        serviceamount : {
            filterType : "",
            filterValue : "",
            filterData : "Numeric",
            filterInput : ""
        },
        reimbursementamount : {
            filterType : "",
            filterValue : "",
            filterData : "Numeric",
            filterInput : ""
        },
        tds : {
            filterType : "",
            filterValue : "",
            filterData : "Numeric",
            filterInput : ""
        },
        recddate : {
            filterType : "",
            filterValue : null,
            filterData : "Date",
            filterInput : ""
        },
        paymentmodename : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        receivedbyname : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        id : {
            filterType : "",
            filterValue : null,
            filterData : "Numeric",
            filterInput : ""
        }
    }
    const [filterMapState,setFilterMapState] = useState(filterMapping);

    const newHandleFilter = async (inputVariable, setInputVariable, type, columnName) => {
        console.log(columnName)
        console.log('hey')
        console.log(filterMapState);
       
            var existing = filterMapState;
            existing = {
                ...existing, [columnName]: {
                    ...existing[columnName],
                    filterType: type == 'noFilter' ? "" : type
                }
            }
            existing = {
                ...existing, [columnName]: {
                    ...existing[columnName],
                    filterValue: type == 'noFilter' ? "" : inputVariable
                }
            }

            if (type == 'noFilter' || type == 'isNull' || type == 'isNotNull') setInputVariable("");
        fetchFiltered(existing);
    }
    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState)
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
            if (mapState[key].filterType != "") {
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        setCurrentPage((prev) => 1)
        setFilterState(tempArray)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": initialRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getClientReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientReceipt(result);
        setPageLoading(false);
    }

    const handleSort = async (field) => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        setSortField(field)
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        setFlag((prev) => !prev);
        const data = {
            "user_id": 1234,
            "rows": initialRows,
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        // setFlag((prev) => !prev);
        const response = await APIService.getClientReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientReceipt(result);
        setPageLoading(false);
    }

    return (
        <div className='h-screen'>
            <Navbar />
            {isEditDialogue && <EditClientReceipt isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} currClientReceipt={currClientReceipt} showSuccess={openEditSuccess} />}
            {/* {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />} */}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Client Receipt Created Successfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Client Receipt Deleted Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {/* {openAddConfirmation && <SaveConfirmationEmployee handleClose={() => setOpenAddConfirmation(false)} currEmployee={formValues.employeeName} addEmployee={addEmployee} />} */}
            {openAddConfirmation && <SaveConfirmationClientReceipt handleClose={() => setOpenAddConfirmation(false)} addClientReceipt={addClientReceipt} currClientName={currClientName} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}

            {deleteConfirmation && <DeleteClientReceipt handleClose={() => { setDeleteConfirmation(false) }} handleDelete={deleteClientRceipt} item={currReceiptId} />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <img className='w-5 h-5' src={backLink} />
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-lg'>Manage Client Receipt</h1>
                            <p className='text-sm'>Manage &gt; Manage Client Receipt</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex items-center bg-[#EBEBEB] '>
                            {/* search button */}
                            <input
                                className="h-9 w-48 bg-[#EBEBEB] text-[#787878] pl-3 outline-none "
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className='w-5 h-5 mx-2' /></button>
                            <div className="h-9 w-10 bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-6" src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-9 w-80 rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New Client Receipt
                                    <img className='h-4 w-4' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>





                {/* filter component */}
                
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[87%] flex">
                            <div className='w-[3%] '>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[14%]  px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md ">
                                    <input className="w-[78%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"  value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[22%]'><img src={Filter} className='h-3 w-3' onClick={() => { setClientNameFilter((prev) => !prev) }} /></button>
                                </div>
                                {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef}/>}
                            </div>

                            <div className='w-[10%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={amountFilterInput} onChange={(e) => setAmountFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setAmountFilter((prev) => !prev) }} /></button>
                                </div>
                                {amountFilter && <NumericFilter inputVariable={amountFilterInput} setInputVariable={setAmountFilterInput} columnName='amount' handleFilter={newHandleFilter} menuRef={menuRef}/>}
                            </div>

                            <div className='w-[13%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={serviceAmountFilterInput} onChange={(e) => setServiceAmountFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setServiceAmountFilter((prev) => !prev) }} /></button>
                                </div>
                                {serviceAmountFilter && <NumericFilter inputVariable={serviceAmountFilterInput} setInputVariable={setServiceAmountFilterInput} columnName='serviceamount' handleFilter={newHandleFilter} menuRef={menuRef}/>}
                            </div>

                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={reimbusmentAmountFilterInput} onChange={(e) => setReimbusmentAmountFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setReimbusmentAmountFilter((prev) => !prev) }} /></button>
                                </div>
                                {reimbusmentAmountFilter && <NumericFilter inputVariable={reimbusmentAmountFilterInput} setInputVariable={setReimbusmentAmountFilterInput} columnName='reimbursementamount' handleFilter={newHandleFilter} menuRef={menuRef}/>}
                            </div>

                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={receivedDateFilterInput} onChange={(e) => setReceivedDateFilterInput(e.target.value)} type="date" />
                                    <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setReceivedDateFilter((prev) => !prev) }} /></button>
                                </div>
                                {receivedDateFilter && <DateFilter inputVariable={receivedDateFilterInput} setInputVariable={setReceivedDateFilterInput} handleFilter={newHandleFilter} columnName='recddate' menuRef={menuRef}/>}
                            </div>

                            <div className='w-[13%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[77%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"  value={receivedModeFilterInput} onChange={(e) => setReceivedModeFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[23%]'><img src={Filter} className='h-3 w-3' onClick={() => { setReceivedModeFilter((prev) => !prev) }} /></button>
                                </div>
                                {receivedModeFilter && <CharacterFilter inputVariable={receivedModeFilterInput} setInputVariable={setReceivedModeFilterInput} handleFilter={newHandleFilter} filterColumn='paymentmodename' menuRef={menuRef}/>}
                            </div>

                            <div className='w-[11%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"  value={receivedByFilterInput} onChange={(e) => setReceivedByFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setReceivedByFilter((prev) => !prev) }} /></button>
                                </div>
                                {receivedByFilter && <CharacterFilter inputVariable={receivedByFilterInput} setInputVariable={setReceivedByFilterInput} handleFilter={newHandleFilter} filterColumn='receivedbyname' menuRef={menuRef}/>}
                            </div>

                            <div className='w-[7%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[55%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"  value={TDSFilterInput} onChange={(e) => setTDSFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[45%]'><img src={Filter} className='h-3 w-3' onClick={() => { setTDSFilter((prev) => !prev) }} /></button>
                                </div>
                                {TDSFilter && <NumericFilter inputVariable={TDSFilterInput} setInputVariable={setTDSFilterInput} columnName='tds' handleFilter={newHandleFilter} menuRef={menuRef}/>}
                            </div>

                        </div>
                        <div className="w-[13%] flex">
                            <div className='w-1/2 px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[60%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[40%]'><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                                </div>
                                {idFilter && <NumericFilter columnName='id' inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef}/>}
                            </div>

                            <div className='w-1/2  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                        </div>
                    </div>

                <div className='h-[calc(100vh_-_14rem)] w-full text-xs'>
                    <div className='w-full h-16 bg-[#F0F6FF] flex justify-between border-gray-400 border-t-[1px]'>
                        <div className="w-[87%] flex">
                            <div className='w-[3%] flex'>
                                <div className='px-3 py-5'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[14%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Client Name <button onClick={() => handleSort('clientname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Amount <button onClick={() => handleSort('amount')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[13%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Service Amount <button onClick={() => handleSort('serviceamount')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Reimbursement</p>
                                    <p>Amount</p>
                                </div>
                                <button onClick={() => handleSort('reimbursementamount')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Received Date <button onClick={() => handleSort('recddate')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[13%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Receipt Mode <button onClick={() => handleSort('paymentmodename')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Received By <button onClick={() => handleSort('receivedbyname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[7%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>TDS <button onClick={() => handleSort('tds')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[5%]  flex'>
                                <div className='p-3'>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[13%] flex">
                            <div className='w-1/2  flex'>
                                <div className='px-3 py-5'>
                                    <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-1/2  flex'>
                                <div className='px-3 py-5'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 

                    
                     */}


                    <div className='w-full h-[calc(100vh_-_18rem)] overflow-auto'>


                        {/* we map our items here */}
                        {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                        {!pageLoading && existingClientReceipt.map((item, index) => {
                            return <div className='w-full bg-white flex justify-between border-gray-400 border-b-[1px] h-10 overflow-hidden'>
                                <div className="w-[87%] flex">
                                    <div className='w-[3%] flex'>
                                        <div className='p-3'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[14%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.clientname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.amount ? item.amount.toFixed(2) : ""}</p>
                                        </div>
                                    </div>
                                    <div className='w-[13%]  flex'>
                                        <div className='p-3 '>
                                            <p> {item.serviceamount ? item.serviceamount.toFixed(2) : ""} </p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex'>
                                        <div className='p-3'>
                                            {item.reimbursementamount ? item.reimbursementamount.toFixed(2) : ""}
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.recddate}</p>
                                        </div>
                                    </div>
                                    <div className='w-[13%]  flex'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.paymentmodename} </p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.receivedbyname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[7%]  flex'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.tds ? item.tds.toFixed(2) : ""}</p>
                                        </div>
                                    </div>
                                    <div className='w-[5%]  flex'>
                                        <div className='p-3'>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[13%] flex">
                                    <div className='w-1/2  flex'>
                                        <div className='p-3'>
                                            <p>{item.id} </p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex'>
                                        <div className='px-3 py-2.5 flex space-x-2'>
                                            <img className='w-5 h-5 cursor-pointer' src={Edit} alt="edit" onClick={() => handleEdit(item)} />
                                            <img className='w-5 h-5 cursor-pointer' src={Trash} alt="trash" onClick={() => handleDelete(item.id)} />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        })}



                    </div>





                </div>

            </div>

            <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 bg-white  '>
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
                        <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 right-1 w-4 h-4' /></button>

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

            <Modal open={isClientReceiptDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-10 bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[370px] ml-[370px]">
                                <div className="text-base">New Client Receipt</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-5 h-5" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-1">
                            <div className="flex gap-12 justify-center ">
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Cura Office </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Received Date<label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="date" name="receivedDate" value={formValues.receivedDate} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.receivedDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">
                                            Received By <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                            name="receivedBy"
                                            value={formValues.receivedBy}
                                            onChange={handleChange}
                                        >
                                            {/* <option value="none" hidden >Select Received By</option> */}
                                            {usersData.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.receivedBy}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">
                                            Receipt Mode <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                            name="receiptMode"
                                            value={formValues.receiptMode}
                                            onChange={handleChange}
                                        >
                                            {modesData.map((item) => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.receiptMode}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">
                                            Client <label className="text-red-500">*</label>
                                        </div>
                                        <AsyncSelect
                                            onChange={handleClientNameChange}
                                            value={selectedOption}
                                            loadOptions={loadOptions}
                                            cacheOptions
                                            defaultOptions
                                            onInputChange={(value) => setQuery(value)}
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    minHeight: 25,
                                                    lineHeight: '1.3',
                                                    height: 2,
                                                    fontSize: 12,
                                                    padding: '1px'
                                                }),
                                                // indicatorSeparator: (provided, state) => ({
                                                //   ...provided,
                                                //   lineHeight : '0.5',
                                                //   height : 2,
                                                //   fontSize : 12 // hide the indicator separator
                                                // }),
                                                dropdownIndicator: (provided, state) => ({
                                                    ...provided,
                                                    padding: '3px', // adjust padding for the dropdown indicator
                                                }),
                                                options: (provided, state) => ({
                                                    ...provided,
                                                    fontSize: 12 // adjust padding for the dropdown indicator
                                                })
                                            }}
                                        />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.client}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">
                                            How received <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                            name="howReceived"
                                            value={formValues.howReceived}
                                            onChange={handleChange}
                                        >
                                            <option value=""> Select How Received</option>
                                            {howReceivedData.map((item) => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.howreceived}</div>
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm">Service Amount </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="number" name="serviceAmount" value={formValues.serviceAmount} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.serviceAmount}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Reimbursement Amount </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="number" name="reimbursementAmount" value={formValues.reimbursementAmount} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.reimbursementAmount}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Amount Received <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="number" name="amountReceived" value={formValues.amountReceived} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.amountReceived}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">TDS </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="number" name="TDS" value={formValues.TDS} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.TDS}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Receipt Description</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="receiptDescription" value={formValues.receiptDescription} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 flex justify-center items-center gap-3">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddClientReceipt} >Add</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageClientReceipt;
