import React, {useEffect, useState} from 'react';
import ResponseHandler from "../../utils/ResponseHandler";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import Header from "../../components/Header";

const UserProfile = () => {

    const [profile, setProfile] = useState("");

    useEffect(() => {
        const localstorage_token = JSON.parse(localStorage.getItem('token'))
        fetch('/user/profile', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localstorage_token}
        })
            .then(async response => {
                return await ResponseHandler.handlerResponse(response)
            })
            .then(responseBody => {
                console.log(responseBody);
                setProfile(responseBody.message)
            })
            .catch(async err => {
                await ResponseHandler.handlerError(err)
            });
    }, []);

    return (
        <section style={{backgroundColor: '#fff', borderRadius: '40px'}}>
            <MDBContainer className="py-5">
                <Header/>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4" style={{borderRadius: '40px'}}>
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{width: '150px'}}
                                    fluid/>
                                <p className="text-muted mb-1">{profile.firstname}</p>
                                <p className="text-muted mb-4">{profile.adressa}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn>Follow</MDBBtn>
                                    <MDBBtn outline className="ms-1">Message</MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4" style={{borderRadius: '40px'}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profile.firstname}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Last Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profile.lastname}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profile.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profile.phone}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profile.address}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Role</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted">{profile.role === 1 ? "Admin" : "Registred User"}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default UserProfile;