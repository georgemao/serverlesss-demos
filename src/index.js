import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import { Authenticator} from 'aws-amplify-react';
import * as serviceWorker from './serviceWorker';


const signUpConfig = {
  signUpFields: [{key: 'name', label: 'Name', required: true, type: 'string', custom: false, displayOrder:1}]
};

/*
const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2
    }
  ]
};
*/

class App extends Component {

  handleWindowClose = async (e) => {
      e.preventDefault();
      //Auth.signOut()
        //  .then()
          //.catch(err => console.log(err))
  }

  componentWillMount() {
      window.addEventListener('beforeunload', this.handleWindowClose);
  }

  //componentWillUnMount() {
      //window.removeEventListener('beforeunload', this.handleWindowClose);
  //}

  render() {
      return (
          <Authenticator signUpConfig = {signUpConfig}> 
              <Main />
          </Authenticator>
      );
  }
}

ReactDOM.render(<App 

                    // Show only certain components
                    //authenticatorComponents = [MyComponents],
                    // display federation/social provider buttons 
                    // federated = {myFederatedConfig}

                />, 
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
