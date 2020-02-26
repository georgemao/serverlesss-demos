import React, { Component } from 'react';
import '../App.css';

import { graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";


import { getContact } from '../graphql/queries';

import { Auth } from 'aws-amplify';
import EditContactForm from '../Components/EditContactForm';



export default class EditContact extends Component {

  constructor(props){
    super (props);

    this.state = {
      id: props.match.params.id
    }
  }

  async componentDidMount(){
    const user = await Auth.currentAuthenticatedUser();
    console.log('username:', user.username);
  }

  render() {


    return (
      <div>
        
        <Connect
              query={graphqlOperation(getContact, {ContactId : this.state.id})}
        >
          {({ data: { getContact }, loading, error }) => {
                console.log(getContact);
                if (error) return (<h3>Error</h3>);
                if (loading || !getContact) return (<h3>Loading...</h3>);
                
                return (<EditContactForm contact={getContact}/>);
          }}
        </Connect>
        
    </div>
    
    );
  }
}