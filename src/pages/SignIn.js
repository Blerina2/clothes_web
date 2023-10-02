import {MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import {useState} from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import {toast} from "react-toastify";
import ResponseHandler from "../utils/ResponseHandler";
import DoHttpRequest from "../utils/DoHttpRequest";

const SignIn = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const {email, password} = values;

    const handleChange = name => (e) => {
        // console.log(e.target.value);
        setValues({...values, [name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmptyString(email) || !isEmptyString(password)) {
            toast.warn("Email and password required");
            return;
        }
        try {
            // URL: http://localhost:8080 is set in package.json proxy
            const response = await DoHttpRequest.doGetRequestWithBasicAuth('/user/signin', email, password);
            if (response.data.success) {
                setValues({email: '', password: ''});
                toast.success("Log In successfully");
                localStorage.setItem("token", JSON.stringify(response.data.message))
                if (typeof window !== "undefined") {
                    setTimeout(() => {
                        window.location.href = "/user/profile"
                    }, 10);
                }
            } else {
                setValues({email: '', password: ''});
                toast.warn(response.data.message);
            }
        } catch (error) {
            ResponseHandler.handlerError(error)
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

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg'/>
                                <MDBInput onChange={handleChange("email")} label='Your Email' id='email'
                                          type='email'
                                          value={email}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg'/>
                                <MDBInput onChange={handleChange("password")} label='Password' id='password'
                                          type='password' value={password}/>
                            </div>

                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Button</button>
                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage
                                src='https://mdbootstrap.com/img/new/standard/nature/184.jpg'
                                fluid/>
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
            <Footer/>
        </MDBContainer>
    );
};

function isEmptyString(word) {
    return !!word // word ? true : false
}

export default SignIn;