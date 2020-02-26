import React, { Component } from 'react';
import '../App.css';

import { graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";

import { saveContact } from '../graphql/mutations';

import { Auth } from 'aws-amplify';
import AddContactForm from '../Components/AddContactForm';


export default class AddContact extends Component {

  async componentDidMount(){
    const user = await Auth.currentAuthenticatedUser();
    console.log('username:', user.username)
  }

  render() {


    return (
      <div>

        <Connect mutation={graphqlOperation(saveContact)}>
          {({mutation}) => (
            <AddContactForm onCreate={mutation} />
          )}
        </Connect>
  
    </div>
    
    );
  }
}