import React, { useState } from 'react';
import studnentTableStyles from './studnentTableStyles'
import { withStyles } from '@mui/styles'
import Pagination from "react-js-pagination";
import {
    Button,
    Box,
    Modal,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import { differenceInYears } from 'date-fns'

import './table.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #CBC3E3',
    outline: 'none',
    boxShadow: 24,
    p: 4,
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'scroll'
};






const rowsArr = [{
    studentName: 'Ali',
    email: 'ali@gmail.com',
    phoneNo: '09986754',
    class: 8,
    marks: '38%',

}]

const headerArr = [
    'S.no', 'Student Name', 'Email', 'Phone#', 'Class', 'Marks%', 'Edit'
]

const StudentDetailsTable = ({ classes, studentData }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [activePage, setActivePage] = useState(1)

    const [editFormData, setEditFormData] = useState([])
    const [nameFitermData, setNameFitermData] = useState({})
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClickName = (e, data) => {
        setNameFitermData(data)
    }


    //data showing in student view details

    let mockData = [
        { name: "Student Name", list: nameFitermData?.student_name || '' },
        { name: "Father Name", list: nameFitermData?.father_name || '' },
        { name: "Date Of Birth", list: nameFitermData?.date_of_bith || '' },
        { name: "Address", list: nameFitermData?.address || '' },
        { name: "City", list: nameFitermData?.city || '' },
        { name: "State", list: nameFitermData?.state || '' },
        { name: "Pin", list: nameFitermData?.pin || '' },
        { name: "Phone Number", list: nameFitermData?.phone_number || '' },
        { name: "Email", list: nameFitermData?.email || '' },
        { name: "Class Opted", list: nameFitermData?.class || '' },
        { name: "Marks%", list: `${nameFitermData?.marks}%` || '' },
        { name: "Date Enroled", list: nameFitermData?.date_in_rolled || '' },
    ]


    const handleChangeInput = (id, event) => {
        const newInputFields = editFormData.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })
        setEditFormData(newInputFields)
    }

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    //pagination functionality
    const indexOfLastPost = activePage * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentPostsTable = studentData.slice(indexOfFirstPost, indexOfLastPost);

    const handleClick = (e, data) => {
        //this function for filtering student data by by edit button
        setEditFormData([...editFormData, data])
        console.log(data);
    }
    console.log(editFormData, 'editFormDataeditFormData')

    const mapNameFilertedData = () => {
        return (
            <>
                <p className={classes.peraColour}>
                    View Student Details
                </p>
                {mockData.map(item => {
                    return (
                        <>

                            <div className={classes.modelFlexDiv}>
                                <label className={classes.modalLable}>
                                    {item.name}
                                </label>
                                <div className={classes.modalDatacontainer} >
                                    {item.list}
                                </div>
                            </div>

                        </>
                    )
                })}
            </>
        )
    }



    const __formilEdirForm = () => {
        return (
            <Formik
                enableReinitialize
                initialValues={{
                    editFields: editFormData.slice(-1)
                }}
                //formik validations
                validate={values => {
                    let errors = {};
                    if (!values?.editFields[0]?.student_name) {
                        errors.student_name = 'Requierd'
                    } else if (values?.editFields[0]?.student_name.length < 2) {
                        errors.student_name = 'too short'
                    } else if (values?.editFields[0]?.student_name.length > 50) {
                        errors.student_name = 'too long'
                    }
                    if (!values?.editFields[0]?.father_name) {
                        errors.father_name = 'Requierd'
                    } else if (values?.editFields[0]?.father_name.length < 2) {
                        errors.father_name = 'too short'
                    } else if (values?.editFields[0]?.father_name.length > 50) {
                        errors.father_name = 'too long'
                    }
                    if (!values?.editFields[0]?.date_of_bith) {
                        errors.date_of_bith = 'Requierd'
                    } else if (differenceInYears(new Date(), new Date(values?.editFields[0]?.date_of_bith)) < 10) {
                        errors.date_of_bith = 'Must be at least 10 years old '
                    }
                    if (!values?.editFields[0]?.address) {
                        errors.address = 'Requierd'
                    }
                    if (!values?.editFields[0]?.city) {
                        errors.city = 'Requierd'
                    }
                    if (!values?.editFields[0]?.state) {
                        errors.state = 'Requierd'
                    }
                    if (!values?.editFields[0]?.pin) {
                        errors.pin = 'not null'
                    } else if (values?.editFields[0]?.pin.length < 6) {
                        errors.pin = 'minimum 6 numbers  are allow'
                    }
                    if (!values?.editFields[0]?.phone_number) {
                        errors.phone_number = 'Requierd'
                    } else if (values?.editFields[0]?.phone_number.length > 10) {
                        errors.phone_number = 'maximum 10 numbers are allow'
                    }
                    if (!values?.editFields[0]?.class) {
                        errors.class = 'Requierd'
                    }
                    if (!values?.editFields[0]?.marks) {
                        errors.marks = 'Requierd'
                    }
                    if (!values?.editFields[0]?.date_in_rolled) {
                        errors.date_in_rolled = 'Requierd'
                    }

                    return errors;
                }}


                onSubmit={async (data) => {
                    handleClose()
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <Box sx={style}>
                            <div style={{ display: 'flex' }}>

                                <Typography id="modal-modal-title" variant="h6" component="h4" style={{
                                    color: '#CBC3E3',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    fontSize: '20px'
                                }}>
                                    Edit Student Details
                                </Typography>
                                <span className='cancele-icon' onClick={handleClose}><CloseIcon style={{ color: '#CBC3E3' }} /></span>
                            </div>
                            <br />
                            <br />
                            {values?.editFields.map(item => {
                                return (
                                    <>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Student Name: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Student Name'
                                                            name='student_name'
                                                            value={item.student_name}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {console.log(errors, 'errprs09090')}
                                                    {errors.student_name && touched.student_name && <span style={{ color: 'red' }}>{errors.student_name}</span>}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Father Name: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Father Name'
                                                            name='father_name'
                                                            value={item.father_name}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.father_name && touched.father_name ? (
                                                        <span style={{ color: 'red' }}>{errors.father_name}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Date Of Birth: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Date Of Birth'
                                                            name='date_of_bith'
                                                            value={item.date_of_bith}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                            type='date'
                                                        />
                                                    </div>
                                                    {errors.date_of_bith && touched.date_of_bith ? (
                                                        <span style={{ color: 'red' }}>{errors.date_of_bith}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Address: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Address'
                                                            name='address'
                                                            value={item.address}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.address && touched.address ? (
                                                        <span style={{ color: 'red' }}>{errors.address}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>City: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='City'
                                                            name='city'
                                                            value={item.city}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.city && touched.city ? (
                                                        <span style={{ color: 'red' }}>{errors.city}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>State: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='State'
                                                            name='state'
                                                            value={item.state}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.state && touched.state ? (
                                                        <span style={{ color: 'red' }}>{errors.state}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Pin: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Pin'
                                                            name='pin'
                                                            value={item.pin}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.pin && touched.pin ? (
                                                        <span style={{ color: 'red' }}>{errors.pin}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Phone Number: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Phone Number'
                                                            name='phone_number'
                                                            value={item.phone_number}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.phone_number && touched.phone_number ? (
                                                        <span style={{ color: 'red' }}>{errors.phone_number}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Email: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Email'
                                                            name='email'
                                                            value={item.email}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.email && touched.email ? (
                                                        <span style={{ color: 'red' }}>{errors.email}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Class Opted: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>

                                                        <select
                                                            name="class"
                                                            value={item.class}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                            className={classes.listingFormInputMainModalSelect}
                                                        >
                                                            <option value="" label="Select a class">
                                                                Select a color{" "}
                                                            </option>
                                                            <option value="5" label="5">
                                                                {" "}
                                                                5
                                                            </option>
                                                            <option value="6" label="6">
                                                                {" "}
                                                                6
                                                            </option>
                                                            <option value="7" label="7">
                                                                {" "}
                                                                7
                                                            </option>
                                                            <option value="8" label="8">
                                                                {" "}
                                                                8
                                                            </option>
                                                            <option value="9" label="9">
                                                                9
                                                            </option>

                                                            <option value="10" label="10">
                                                                10
                                                            </option>

                                                        </select>
                                                    </div>
                                                    {errors.class && touched.class ? (
                                                        <span style={{ color: 'red' }}>{errors.class}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Marks%: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Marks%'
                                                            name='marks'
                                                            value={item.marks}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.marks && touched.marks ? (
                                                        <span style={{ color: 'red' }}>{errors.marks}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={classes.formGroupModal}>
                                            <div className={classes.formGroupFlexDivModal}>
                                                <label className={classes.labelFormInputModal}>
                                                    <span>Date Enroled: </span>
                                                </label>

                                                <div className={classes.selectContainerModal}>
                                                    <div className={classes.demoDataCheckModal}>
                                                        <input className={classes.listingFormInputMainModal}
                                                            placeholder='Date Enroled'
                                                            name='date_in_rolled'
                                                            value={item.date_in_rolled}
                                                            onChange={event => handleChangeInput(item?.id, event)}
                                                            onBlur={handleBlur}
                                                            type='date'
                                                        />
                                                    </div>
                                                    {errors.date_in_rolled && touched.date_in_rolled ? (
                                                        <span style={{ color: 'red' }}>{errors.date_in_rolled}</span>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )
                            })}


                            <div className={classes.cardButtonDivModal}>

                                <Button type='submit' variant='contained' size='small' style={{ backgroundColor: '#CBC3E3', }}>Save</Button>
                                <Button onClick={() => {
                                    handleClose()

                                }} variant='contained' size='small' style={{ backgroundColor: '#fff', color: '#CBC3E3', marginLeft: '10px' }}>Cancel</Button>
                            </div>

                        </Box>
                    </form>
                )}
            </Formik>
        )
    }



    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className={classes.tableHeader}>
                        <TableRow  >
                            {headerArr.map((item, i) => {
                                return (
                                    <TableCell className={classes.tableHeaderTableCell} key={i} align="center">{item}</TableCell>
                                )
                            })}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPostsTable.map((row, i) => (

                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" className={classes.tableCellStyles}>{i + indexOfFirstPost + 1}</TableCell>
                                <TableCell align="center" className={classes.tableCellStyles}
                                    onClick={(e) => {
                                        handleClickName(e, row)
                                        setOpen2(true)
                                    }}
                                >
                                    {row.student_name}
                                </TableCell>
                                <TableCell align="center" className={classes.tableCellStyles}>{row.email}</TableCell>
                                <TableCell align="center" className={classes.tableCellStyles}>{row.phone_number}</TableCell>
                                <TableCell align="center" className={classes.tableCellStyles}>{row.class}</TableCell>
                                <TableCell align="center" className={classes.tableCellStyles}>{row.marks}%</TableCell>
                                <TableCell align="center" className={classes.tableCellStyles}>
                                    <Button variant='contained' style={{ backgroundColor: '#CBC3E3', color: '#fff' }}
                                        onClick={(e) => {
                                            handleClick(e, row)
                                            handleOpen()
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <br />
            <div>
                <div className={classes.tablePaginationContainer}>



                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={rowsPerPage}
                        totalItemsCount={studentData?.length}
                        // pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        className='pagination'
                    />
                </div>

            </div>


            <Modal
                open={open}
            // onClose={handleClose}

            >
                {__formilEdirForm()}
            </Modal>
            <Modal
                open={open2}
                onClose={() => setOpen2(false)}

            >
                <Box sx={style}>
                    {mapNameFilertedData()}
                </Box>
            </Modal>



        </>
    );
}

export default withStyles(studnentTableStyles)(StudentDetailsTable)