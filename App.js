import React from 'react'
import './App.css';
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import UserProfile from "./pages/user/UserProfile";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify'; // https://www.npmjs.com/package/react-toastify
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return (
        <>
            <ToastContainer/>
            <Router>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/user/profile" component={UserProfile}/>
            </Router>
        </>
    )
}
export default App;
