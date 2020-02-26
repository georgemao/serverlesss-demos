import React, { Component } from 'react';
import '../App.css';
import ContactCard from "../Components/ContactCard";
import  {Container, Segment, Card, Label, Icon, Statistic } from 'semantic-ui-react'

import { graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";

import { allContacts } from '../graphql/queries';
import { onSaveContact } from '../graphql/subscriptions';

import { Auth } from 'aws-amplify';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount(){
    const user = await Auth.currentAuthenticatedUser();
    console.log('username:', user.username);
  }

  render() {
    const ContactsList = ({ contacts }) => (
      <div>
          <Statistic horizontal color='orange' size='huge'>
              <Statistic.Value>
               &nbsp;
              </Statistic.Value>
              <Statistic.Label>You have </Statistic.Label>
            </Statistic>

            <Statistic horizontal color='orange' size='huge'>
              <Statistic.Value>
                {contacts.length}
              </Statistic.Value>
              <Statistic.Label>Contacts</Statistic.Label>
            </Statistic>

      { this.props.view == true ?
            <div>
              {contacts.map(contact => <Label as='a' basic> <Icon name='users' /> {contact.fname} {contact.lname} <Icon name='delete' /></Label>)}
            </div>
                  :
                  <Card.Group>
                    { contacts.map(contact => <ContactCard id={contact.ContactId} email={contact.email} fname={contact.fname} lname={contact.lname} location={contact.location}/>) }
                  </Card.Group>
      }
      </div>
    );

    return (
      <div>

        <Container>
          <Segment raised padded>
    
            <Connect
              query={graphqlOperation(allContacts)}
              subscription={graphqlOperation(onSaveContact)}
              onSubscriptionMsg={(prev, { onSaveContact }) => {
                  console.log ( onSaveContact );    
                  
                  var list = prev.allContacts;
                  console.log(list);

                  list.push(onSaveContact);
                  console.log(list);

                  return (prev); 
              }}
            >
            {({ data: { allContacts }, loading, error }) => {
                console.log(allContacts);
                if (error) return (<h3>Error</h3>);
                if (loading || !allContacts) return (<h3>Loading...</h3>);
                
                return (<ContactsList contacts={allContacts ? allContacts : []} />);
            }}
            </Connect>
          </Segment>
        </Container>
  
      </div>
    
    );
  }
}