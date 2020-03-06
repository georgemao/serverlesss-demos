import React, { Component } from 'react';
import Home from './Routes/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Auth} from 'aws-amplify';
import NavBar from './Components/NavBar'
import AddContact from './Routes/AddContact'
import EditContact from './Routes/EditContact'
import Stream from './Routes/Stream'

import Amplify from "aws-amplify";
import awsconfig from './aws-exports';

const oauth = {
    // Domain name
    domain : 'auth.awsgeorge.com', 
  
    // Authorized scopes
    scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'], 
  
    // Callback URL
    redirectSignIn : 'https://contactbook.awsgeorge.com/', //'https://d241co18jld7ec.cloudfront.net', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'  
  
    // Sign out URL
    redirectSignOut : 'https://contactbook.awsgeorge.com/', //'https://d241co18jld7ec.cloudfront.net', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
  
    // 'code' for Authorization code grant, 
    // 'token' for Implicit grant
    responseType: 'code',
  
    // optional, for Cognito hosted ui specified options
    options: {
        // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
        AdvancedSecurityDataCollectionFlag : true
    }
  }
  
  // Considering you have an existing aws-exports.js configuration file 
  Amplify.configure(awsconfig);
  Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_sDg68GJKt',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '74gaojv8p62ot88h02qmfe70jr',
        oauth: oauth
    }
  });

export default class Main extends Component {

    constructor (props){
        super(props);

        this.state = {
            compact: false
        }
    }

    toggleView = () => {
        this.setState(state => ({ compact: !state.compact }));
    }

  signOut = async(e) => {
      e.preventDefault();
      Auth.signOut()
          .then(() => {
              this.props.onStateChange('signedOut', null);
              console.log('signedOut')
          })
          .catch(err => console.log(err));    
  }

  render() {
      return (
        <div>
            { this.props.authState == 'signedIn' ?
                
                (<BrowserRouter>
                    <div>
                        <NavBar toggleView={this.toggleView}/>
                        <Switch>
                            <Route exact path="/" render = {(props) => <Home {...props} view={this.state.compact}/>}/>
                            <Route exact path="/AddContact" component={AddContact} />
                            <Route exact path="/EditContact/:id" component={EditContact}/>
                            <Route exact path="/Stream" component={Stream}/>
                        </Switch>
                        
                    </div>
                </BrowserRouter>) : null
            }
        </div> 
      );
  }
}