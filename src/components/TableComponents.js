import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import Axios from "axios";

import PaginationComponent from './PaginationComponent.js';

import PitcherAvatar from "../assets/images/profile-pitcher.png";
const editButton = "fas fa-pencil-alt text-info";
const deleteButton = "far fa-trash-alt fa-fw text-danger";


class TableComponents extends Component {

  state = {
    users: [],
    isFetching: false,
    fetchingMessage: "",
    serverErrorMessage: "",
    serverSuccessMessage: "",
    currentPage: 1,
    usersPerPage: 10,
  };


  componentDidMount() {
    this.setState({
      ...this.state, isFetching: true, fetchingMessage: "Fetching contacts..."
    });

    Axios.get('http://localhost:3004/users')
        .then((response) => {
          const users = response.data;
          this.setState({
            users: users,
            isFetching: false,
            fetchingMessage: "",
          })

        })
        .catch((error) => {
          console.log("Error: ", error);
          this.setState({
            serverErrorMessage: "Error retrieving data"
          })
        });
  }

  addUserRow = () => {
    const newUserRow = {
      image:  PitcherAvatar,
      surName: "(click and edit)",
      otherNames: "(click and edit)",
      editButton: editButton,
      deleteButton: deleteButton
    };
    Axios.post('http://localhost:3004/users', newUserRow)
        .then((response) => {
          const addedUser = response.data;
          this.setState((prevState) => ({
            users: [...prevState.users, addedUser]
          }))
        })
        .catch((error) => {
          alert("Failed to add a row.")
        })
  };

  removeUser = (userId) => {
    Axios.delete(`http://localhost:3004/users/${userId}`)
        .then((response) => {
          const filteredUsers = this.state.users.filter((eachUser) => {
            return eachUser.id !== userId;
          });

          this.setState({
            users: filteredUsers
          })
        })
        .catch((error) => {
          alert("Failed to delete user")
        });
  };

  handleInputChange = (event) => {
    const targetElement = event.target;
    const targetId = targetElement.dataset.index;
    const targetName = targetElement.name;
    const targetValue = targetElement.value;

    const newUpdatedUsers = this.state.users.map((eachUser) => {
      if (eachUser.id == targetId) {
        eachUser[targetName] = targetValue;
        return eachUser;
      }
      else {
        return eachUser;
      }
    });
    this.setState({
      users: newUpdatedUsers,
    });

  };

  handleBlurChange = (event) => {
    const targetElement = event.target;
    const targetId = targetElement.dataset.index;
    const targetName = targetElement.name;
    const targetValue = targetElement.value;

    this.state.users.map((eachUser) => {
      if (eachUser.id == targetId) {
        eachUser[targetName] = targetValue;
        Axios.put(`http://localhost:3004/users/${targetId}`, eachUser)
            .then((promise) => {})
            .catch((error) => {
              alert("Failed to update")
            });
        return eachUser
      }
      else {
        return eachUser;
      }
    });
  };

  goToPaginate = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };



  render() {
    const {users, currentPage, usersPerPage, isFetching, serverErrorMessage} = this.state;

    // Get the current list of Users
    /*To do that, I need to get the index of the first user and index of the last user
    * and use it to perform an array.slice() function on the this.state.users[] to be able to get the number of users
    * to be displayed in a single page.
    * */
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsersList = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className= "container">

          <div className= "mt-5 mb-3">
            <div className= "row dark-grey-text font-weight-bolder">
              <div className= "col-12">
                <h3 className= "h3-responsive text-center">Users List</h3>
              </div>
            </div>
          </div>
          {
            (!isFetching)? (
                <React.Fragment>
                  <table id= "tableContainer" className= "table grey-text mx-auto p-3">
                    <thead className= "thead-light text-center">
                    <tr>
                      <th className= "font-weight-bold">S/N</th>
                      <th className= "font-weight-bold img-column">Image</th>
                      <th className= "font-weight-bold">SurName</th>
                      <th className= "font-weight-bold">Other Names</th>
                      <th className= "font-weight-bold">Edit</th>
                      <th className= "font-weight-bold">Delete</th>
                    </tr>
                    </thead>

                    <tbody id= "tableBody" className= "border">
                    {
                      (currentUsersList.length) ? (
                          currentUsersList.map( (eachUser, index) => {
                            return (
                                <tr key= { eachUser.id } className= "border">
                                  <td className= "pl-3">{ usersPerPage * (currentPage - 1) + index + 1 }</td>
                                  <td className= "pl-3">
                                    <img src= { eachUser.image }  width= "26" alt="Pitcher Avatar"/>
                                  </td>
                                  <td>
                                    <input type="text" name="surName" data-index={eachUser.id} onChange= { this.handleInputChange } onBlur= {this.handleBlurChange} value= {eachUser.surName} placeholder= "Surname" />
                                  </td>
                                  <td>
                                    <input type="text" name="otherNames" data-index={eachUser.id} onChange= { this.handleInputChange } onBlur= {this.handleBlurChange} value= {eachUser.otherNames} placeholder= "Other Names" />
                                  </td>
                                  <td className= "text-center">
                                    <Link to= {`/edit-user/${eachUser.id}`}>
                                      <i className= { eachUser.editButton }> </i>
                                    </Link>
                                  </td>
                                  <td className= "text-center">
                                    <i className= { eachUser.deleteButton } onClick= { () => { this.removeUser(eachUser.id) } }> </i>
                                  </td>
                                </tr>
                            )}
                          )
                      ) : (
                          <tr className= "border">
                            <td colSpan= "6" className= "text-center">
                              <p className= "h3-responsive">
                                { serverErrorMessage } or <br />
                                Nothing in the DataBase to display... <br />Kindly Add something to the DataBase
                              </p>
                            </td>
                          </tr>
                      )
                    }
                    </tbody>
                  </table>

                  <MDBBtn onClick= {  () => { this.addUserRow() }  } outline color= "blue-grey" className= "font-weight-bold" style= {{ borderRadius: 50 }}>
                    <MDBIcon icon= "plus" className= "mr-2" />
                    Add a row
                  </MDBBtn>
                  <Link to= "/add-account">
                    <MDBBtn outline color= "blue-grey" className= "font-weight-bold" style= {{ borderRadius: 50 }}>
                      <MDBIcon icon= "user-plus" className= "mr-2" />
                      Add Account
                    </MDBBtn>
                  </Link>
                </React.Fragment>
            ) : (
                //  Font Awesome Spinner Loader
                <div className= "container" style= {{ marginTop: 200, minHeight: 250 }}>
                  <div className="row">
                    <div className="col-12 text-center">
                      <i className="fas fa-spinner fa-spin fa-7x fa-fw text-light text-info mt-5"> </i>
                    </div>
                  </div>
                </div>
            )
          }


          <div className= "mt-3 mb-3">
            <div className= "row dark-grey-text font-weight-bolder">
              <div className= "col-12">
                <PaginationComponent totalUsers= {this.state.users.length} usersPerPage= {this.state.usersPerPage} goToPaginate={this.goToPaginate} />
              </div>
            </div>
          </div>

        </div>

    );
  }
}

export default TableComponents;