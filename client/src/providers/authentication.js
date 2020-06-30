import React, {Component} from "react";
import Authentication from "../services/authentication";

const AuthenticationContext = React.createContext({
});

export const AuthenticationConsumer = AuthenticationContext.Consumer;

export class AuthenticationProvider extends Component {
  authenticationService;
  constructor(props) {
    super(props);
    this.authenticationService = new Authentication();
  }
  render() {
  return (
    <AuthenticationContext.Provider value={ this.authenticationService }>
      {this.props.children}
    </AuthenticationContext.Provider>
  );
  }
}
