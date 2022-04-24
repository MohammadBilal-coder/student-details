import React, { useState, useEffect } from 'react'
import './homePage.css'
import {
    Button,
    Box,
    Modal,
    Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import { withStyles } from '@mui/styles'
import homepageStyles from './homepageStyles';
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns'
import StudentDetailsTable from './table/StudentDetailsTable'

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


// yups handle the student validation

const StudentDataSchema = Yup.object().shape({
    student_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    father_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    date_of_bith: Yup.date()
        .nullable()
        .test("birthday", "Must be at least 10 years old", function (value) {
            return differenceInYears(new Date(), new Date(value)) > 10;
        })
        .required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    pin: Yup.string().required('not null').min(6, 'minimum 6 numbers  are allow'),
    phone_number: Yup.string().required('Required').max(10, 'maximum 10 numbers are allow'),
    class: Yup.string().required('Required'),
    marks: Yup.string().required('Required'),
    date_in_rolled: Yup.string().required('Required'),



});



const HomePage = ({ classes }) => {
    const [studentData, setStudentData] = useState([
        {
            address: "delhi",
            city: "delhi",
            class: "8",
            date_in_rolled: "2022-04-23",
            date_of_bith: "1995-11-01",
            email: "muskan@gmail.com",
            father_name: "Arif Khan",
            marks: "78",
            phone_number: "423412312",
            pin: "423423",
            state: "delhi",
            student_name: "Muskan khan",
        },
        {
            address: "strret",
            city: "kanpur",
            class: "5",
            date_dnroled: "2022-04-08",
            date_in_rolled: "2022-04-23",
            date_of_bith: "2000-12-09",
            email: "masood@gmail.com",
            father_name: "jamal ali",
            marks: "78",
            phone_number: "44212312",
            pin: "233211",
            state: "up",
            student_name: "massod ali",
        },
        {
            address: "delhi",
            city: "delhi",
            class: "8",
            date_in_rolled: "2022-04-23",
            date_of_bith: "1995-11-01",
            email: "arzo@gmail.com",
            father_name: "Arif Khan",
            marks: "78",
            phone_number: "423412312",
            pin: "423423",
            state: "delhi",
            student_name: "Arzo khan",
        },
        {
            address: "strret",
            city: "kanpur",
            class: "5",
            date_dnroled: "2022-04-08",
            date_in_rolled: "2022-04-23",
            date_of_bith: "2000-12-09",
            email: "Ram@gmail.com",
            father_name: "Vipin",
            marks: "78",
            phone_number: "44212312",
            pin: "233211",
            state: "up",
            student_name: "Ram kumar",
        },
        {
            address: "delhi",
            city: "delhi",
            class: "8",
            date_in_rolled: "2022-04-23",
            date_of_bith: "1995-11-01",
            email: "as12312@gmail.com",
            father_name: "Arvind",
            marks: "78",
            phone_number: "423412312",
            pin: "423423",
            state: "delhi",
            student_name: "Ram",
        },
        {
            address: "strret",
            city: "kanpur",
            class: "5",
            date_dnroled: "2022-04-08",
            date_in_rolled: "2022-04-23",
            date_of_bith: "2000-12-09",
            email: "sahil@gmail.com",
            father_name: "saif ali",
            marks: "78",
            phone_number: "44212312",
            pin: "233211",
            state: "up",
            student_name: "sahil ali",
        },
        {
            address: "delhi",
            city: "delhi",
            class: "8",
            date_in_rolled: "2022-04-23",
            date_of_bith: "1995-11-01",
            email: "zainab@gmail.com",
            father_name: " amir",
            marks: "78",
            phone_number: "423412312",
            pin: "423423",
            state: "delhi",
            student_name: "zainab",
        },
        {
            address: "strret",
            city: "kanpur",
            class: "5",
            date_dnroled: "2022-04-08",
            date_in_rolled: "2022-04-23",
            date_of_bith: "2000-12-09",
            email: "masood@gmail.com",
            father_name: "jamal ali",
            marks: "78",
            phone_number: "44212312",
            pin: "233211",
            state: "up",
            student_name: "massod ali",
        },
        {
            address: "delhi",
            city: "delhi",
            class: "8",
            date_in_rolled: "2022-04-23",
            date_of_bith: "1995-11-01",
            email: "muskan@gmail.com",
            father_name: "Arif Khan",
            marks: "78",
            phone_number: "423412312",
            pin: "423423",
            state: "delhi",
            student_name: "Muskan khan",
        },
        {
            address: "strret",
            city: "kanpur",
            class: "5",
            date_dnroled: "2022-04-08",
            date_in_rolled: "2022-04-23",
            date_of_bith: "2000-12-09",
            email: "masood@gmail.com",
            father_name: "jamal ali",
            marks: "78",
            phone_number: "44212312",
            pin: "233211",
            state: "up",
            student_name: "massod ali",
        },
        {
            address: "delhi",
            city: "delhi",
            class: "8",
            date_in_rolled: "2022-04-23",
            date_of_bith: "1995-11-01",
            email: "muskan@gmail.com",
            father_name: "Arif Khan",
            marks: "78",
            phone_number: "423412312",
            pin: "423423",
            state: "delhi",
            student_name: "Muskan khan",
        },
        {
            address: "strret",
            city: "kanpur",
            class: "5",
            date_dnroled: "2022-04-08",
            date_in_rolled: "2022-04-23",
            date_of_bith: "2000-12-09",
            email: "masood@gmail.com",
            father_name: "jamal ali",
            marks: "78",
            phone_number: "44212312",
            pin: "233211",
            state: "up",
            student_name: "massod ali",
        },


    ])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setStudentData(studentData)
    }, [studentData])

    return (
        <div className=' homepage-Container'>
            <span className='homepage-header'> Enrollment App</span>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button
                style={{ backgroundColor: '#CBC3E3', color: '#fff', display: 'flex', marginLeft: 'auto' }}
                onClick={handleOpen}
            >New Student</Button>
            <br />
            <StudentDetailsTable
                studentData={studentData}
            />
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Formik
                    initialValues={{
                        student_name: '',
                        father_name: '',
                        date_of_bith: '',
                        address: '',
                        city: '',
                        state: '',
                        pin: '',
                        phone_number: '',
                        email: '',
                        class: '',
                        marks: '',
                        date_in_rolled: new Date().toISOString().slice(0, 10)
                    }}
                    validationSchema={StudentDataSchema}

                    onSubmit={async (data) => {
                        // when from is submit it will add a new object in an array
                        setStudentData([data, ...studentData])
                        handleClose()
                    }}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (

                        // add student data form

                        <form onSubmit={handleSubmit}>
                            <Box sx={style}>
                                <div style={{ display: 'flex' }}>

                                    <Typography id="modal-modal-title" variant="h6" component="h4" style={{
                                        color: '#CBC3E3',
                                        fontWeight: 'bold',
                                        marginLeft: 'auto',
                                        fontSize: '20px'
                                    }}>
                                        Add Student Details
                                    </Typography>
                                    <span className='cancele-icon' onClick={handleClose}><CloseIcon style={{ color: '#CBC3E3' }} /></span>
                                </div>
                                <br />
                                <br />

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
                                                    value={values.student_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            {errors.student_name && touched.student_name ? (
                                                <span style={{ color: 'red' }}>{errors.student_name}</span>
                                            ) : null}
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
                                                    value={values.father_name}
                                                    onChange={handleChange}
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
                                                    value={values.date_of_bith}
                                                    onChange={handleChange}
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
                                                    value={values.address}
                                                    onChange={handleChange}
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
                                                    value={values.city}
                                                    onChange={handleChange}
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
                                                    value={values.state}
                                                    onChange={handleChange}
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
                                                    value={values.pin}
                                                    onChange={handleChange}
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
                                                    value={values.phone_number}
                                                    onChange={handleChange}
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
                                                    value={values.email}
                                                    onChange={handleChange}
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
                                                    value={values.class}
                                                    onChange={handleChange}
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
                                                    value={values.marks}
                                                    onChange={handleChange}
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
                                                    value={values.date_in_rolled}
                                                    onChange={handleChange}
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
            </Modal>
        </div>
    )
}

export default withStyles(homepageStyles)(HomePage)