import {useState} from 'react';
import axios from 'axios'; // https://www.npmjs.com/package/axios
import {MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import {toast} from 'react-toastify';
import Header from '../components/Header'
import Footer from '../components/Footer'

const SignUp = () => {
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        password: '',
        passwordConfirm: '',
        address: '',
        phone: '',
        role: 0
    });

    const {firstname, phone, lastname, birthday, email, password, passwordConfirm, address, role = 0} = values;

    const handleChange = name => (e) => {
        setValues({...values, [name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormEmpty(firstname, lastname, birthday, email, password, passwordConfirm)) {
            toast.warn("Please fill out all required fields");
            return;
        }

        if (!isEmptyString(password) || !isPasswordEqual(password, passwordConfirm)) {
            toast.warn("Password and repeated password not equal");
            return;
        }
        try {
            // URL: http://localhost:8080 is set in package.json proxy
            const response = await postRequest(firstname, lastname, birthday, email, password, role, address, phone);
            if (response.data.success) {
                clearFormValue(setValues);
                toast.success("Sign up successfully.");
            } else {
                toast.warn(response.data.message);
            }
        } catch (error) {
            handleError(error);
        }
    }

// https://mdbootstrap.com/docs/react/content-styles/icons/
    return (
        <MDBContainer fluid>
            <Header/>
            <MDBCard className='text-black m-5' style={{borderRadius: '40px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput onChange={handleChange("firstname")} label='Your first name'
                                          id='firstname'
                                          type='text' className='w-100' value={firstname}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput onChange={handleChange("lastname")} label='Your last name' id='lastname'
                                          type='text' className='w-100' value={lastname}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="birthday-cake me-3" size='lg'/>
                                <MDBInput onChange={handleChange("birthday")} label='Birthday (DD/MM/YYYY)'
                                          id='birthday' type='text'
                                          className='w-100' value={birthday}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg'/>
                                <MDBInput onChange={handleChange("email")} label='Your Email' id='email'
                                          type='email'
                                          value={email}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="location-arrow me-3" size='lg'/>
                                <MDBInput onChange={handleChange("address")} label='Your Address' id='address'
                                          type='address'
                                          value={address}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="mobile-alt me-3" size='lg'/>
                                <MDBInput onChange={handleChange("phone")} label='Your Phone' id='phone'
                                          type='phone'
                                          value={phone}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg'/>
                                <MDBInput onChange={handleChange("password")} label='Password' id='password'
                                          type='password' value={password}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="key me-3" size='lg'/>
                                <MDBInput onChange={handleChange("passwordConfirm")} label='Repeat your password'
                                          id='passwordConfirm' type='password' value={passwordConfirm}/>
                            </div>

                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Button</button>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage
                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                                fluid/>
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
            <Footer/>
        </MDBContainer>
    );
};

function isPasswordEqual(password, passwordConfirm) {
    return password === passwordConfirm;
}

function handleError(error) {
    let errorData = error.response.data;
    if (typeof errorData === 'object') {
        if (errorData.success) {
            toast.success(errorData.message);
        } else {
            toast.warn(errorData.message);
        }
    } else {
        console.error('Backend service unavailable');
        toast.error('Backend service unavailable');
    }
}

async function postRequest(firstname, lastname, birthday, email, password, role, address, phone) {
    return await axios.post('/user/signup', {
        firstname,
        lastname,
        birthday,
        email,
        password,
        role,
        address,
        phone
    });
}

function clearFormValue(setValues) {
    setValues({
        birthday: '',
        firstname: '',
        password: '',
        passwordConfirm: '',
        email: '',
        lastname: '',
        role: '',
        address: '',
        phone: ''
    })
}

function isFormEmpty(firstname, lastname, birthday, email, password, passwordConfirm) {
    return !isEmptyString(firstname) && !isEmptyString(lastname) && !isEmptyString(birthday) && !isEmptyString(email) && !isEmptyString(password) && !isEmptyString(passwordConfirm);
}

function isEmptyString(word) {
    return !!word // word ? true : false
}

export default SignUp;
