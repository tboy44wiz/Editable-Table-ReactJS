import React from 'react';
import AppContext from "./AppContext";

class AppContextProvider extends React.Component {
  state = {
    serverErrorMessage: "",
    serverSuccessMessage: "",
  };


  render() {
    return (
        <AppContext.Provider value= {{
          serverErrorMessage: this.state.serverErrorMessage,
          serverSuccessMessage: this.state.serverSuccessMessage,
        }}>
          {this.props.children}
        </AppContext.Provider>
    );
  }
}
export default AppContextProvider