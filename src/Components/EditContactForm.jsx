import React, { Component } from 'react';
import  {Container, Header, Segment } from 'semantic-ui-react'
import { Button, Form } from 'semantic-ui-react'

import { Message } from 'semantic-ui-react'

import { graphqlOperation, API }  from "aws-amplify";
import { updateContact } from '../graphql/mutations';

class EditContactForm  extends Component{
  constructor(props) {
    console.log(props);
    super(props);
    
    this.state = {
      email: props.contact.email,
      fname: props.contact.fname,
      lname: props.contact.lname,
      ContactId: props.contact.ContactId
    };   
  }

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }
  
  async submit() {

    const result =  API.graphql(graphqlOperation(updateContact, {ContactId: this.state.ContactId , email: this.state.email , fname: this.state.fname ,lname: this.state.lname }));
    console.log(result);

    // TODO: Add error checking
    this.setState({ 'added':'true'})

    /*
    then(response => {
        if(response.data){
          this.setState({ 'added':'true'})
        }
        else{
          // Error occurred
        }
      }
    );*/
  }

  render(){
    return (
      <Container >
        { this.state.added == 'true' ?
        <Message>
          <Message.Header>You updated details for {this.state.fname}</Message.Header>
        </Message> : null
        }

      <Header as='h1'>Edit {this.props.contact.fname}</Header>
      <Segment raised padded>
      
      
        <Form name='contactForm'>
          <Form.Group widths='equal'>
          <Form.Input fluid name='fname' label='First name' defaultValue={this.props.contact.fname} onChange={(ev) => { this.handleChange('fname', ev)}} />
          <Form.Input fluid name='lname' label='Last name' defaultValue={this.props.contact.lname} onChange={(ev) => { this.handleChange('lname', ev)}}/>
          
        </Form.Group>
          <Form.Field>
            <Form.Input icon='at' name='email' label='Email' defaultValue={this.props.contact.email}onChange={(ev) => { this.handleChange('email', ev)}} />
          </Form.Field>
          
          <Button color='green' type='submit' onClick={this.submit.bind(this)}>Submit</Button>
        </Form>

        
      </Segment>
    </Container>
    )
  }

}

export default EditContactForm