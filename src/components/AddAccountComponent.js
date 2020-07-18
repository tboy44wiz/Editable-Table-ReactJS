import React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

import PitcherAvatar from "../assets/images/profile-pitcher.png";
import axios from "axios";
const editButton = "fas fa-pencil-alt text-info";
const deleteButton = "far fa-trash-alt fa-fw text-danger";

class AddAccountComponent extends React.Component {

    state = {
        userDetails: {
            image:  PitcherAvatar,
            surName: "",
            otherNames: "",
            editButton: editButton,
            deleteButton: deleteButton
        },
        serverErrorMessage: "",
        serverSuccessMessage: "",
    };

    handleInputChange = (event) => {
        this.setState({
            userDetails:{...this.state.userDetails, [event.target.id]: event.target.value,}
        });
    };

    addAccount = (addedAccount) => {

        // But here, we are posting to the API using Axios.
        axios.post('http://localhost:3004/users', addedAccount)
            .then((response) => {
                this.setState({
                    serverSuccessMessage: "Successfully added"
                })
            })
            .catch((error) => {
                this.setState({
                    serverErrorMessage: "Failed to submit account. Try again."
                })
            })
    };
    handleAccountSubmit = (event) => {
        event.preventDefault();

        // First clear both the serverErrorMessage and serverSuccessMessage
        this.setState({
            serverErrorMessage: "",
            serverSuccessMessage: ""
        });

        //  Call the "addAccount" Function that makes the API call and pass in "this.state.userDetails" as its parameter.
        this.addAccount(this.state.userDetails);

        //  Reset the state after the API call.
        this.setState({
            userDetails: {
                image:  PitcherAvatar,
                surName: "",
                otherNames: "",
                editButton: editButton,
                deleteButton: deleteButton
            }
        });
    };

    render() {
        return (
            <AppContext.Consumer>
                {() => {
                    return (
                        <div className= "container">
                            <h3 className= "h3-responsive addAccountHeading blue-grey-text text-center font-weight-bold">Add Account</h3>
                            <Link to= "/">
                                <MDBBtn outline color= "blue-grey"
                                        className= "font-weight-bold ml-0 mb-4"
                                        style= {{ borderRadius: 50 }}
                                >
                                    <MDBIcon icon= "angle-left" className= "mr-3" />
                                    Back
                                </MDBBtn>
                            </Link>

                            <div className="card">
                                <div className="card-body w-75 mx-auto px-5 pt-2 pb-5">

                                    <div>
                                        {    //  Display either success or error message.
                                            (this.state.serverSuccessMessage) ? (
                                                <p className= "h4-responsive text-success text-center mt-3">{ this.state.serverSuccessMessage }</p>
                                            ) : (
                                                <p className= "h4-responsive text-danger text-center mt-3">{ this.state.serverErrorMessage }</p>
                                            )
                                        }
                                    </div>

                                    <form onSubmit= { this.handleAccountSubmit } className= "text-center blue-grey-text">
                                        <p className= "my-5">Note that all field must be filled</p>
                                        {/* Name */}
                                        <input
                                            type="text"
                                            onChange= { this.handleInputChange }
                                            id= "surName"
                                            value= { this.state.userDetails.surName }
                                            className= "form-control mb-4 p-4"
                                            placeholder= "Surname"
                                            required
                                        />

                                        {/* Other Names */}
                                        <input
                                            type="text"
                                            onChange= { this.handleInputChange }
                                            id= "otherNames"
                                            value= { this.state.userDetails.otherNames }
                                            className= "form-control mb-4 p-4"
                                            placeholder= "Other Names"
                                            required
                                        />

                                        {/* Thumbnail Image */}
                                        <div className= "d-flex">
                                            <input
                                                type="file"
                                                id= "thumbNailAvatar"
                                                className= "float-left"
                                            />
                                        </div>
                                        <br />

                                        {/* Submit Button */}
                                        <div className= "mt-5">
                                            <MDBBtn outline color="primary" type="submit" className="font-weight-bold" style= {{ borderRadius: 50 }}>
                                                Submit
                                                <MDBIcon icon="paper-plane" className="ml-2" />
                                            </MDBBtn>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}

export default AddAccountComponent;
