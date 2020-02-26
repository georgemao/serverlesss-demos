import React, { Component } from 'react';
import  {Container, Header, Segment } from 'semantic-ui-react'
import { Button, Form } from 'semantic-ui-react'

import { Message } from 'semantic-ui-react'

class AddContactForm  extends Component{
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      email: '',
      fname: '',
      lname: ''  
    };   
  }

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }
  
  async submit() {

    const { onCreate } = this.props;
    console.log(this.props);
    var input = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname
    }
    console.log(input);
    /*await onCreate({
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname
    }).then( this.setState({ 'added':'true'}));
    */
    await onCreate(
      input
    ).then(response => {
        if(response.data){
          this.setState({ 'added':'true'})
        }
        else{
          // Error occurred
        }
      }
    );
  }

  render(){
    return (
      <Container >
        { this.state.added == 'true' ?
        <Message>
          <Message.Header>Successfully added new Contact: {this.state.email}</Message.Header>
        </Message> : null
        }

      <Header as='h1'>Create a new Contact</Header>
      <Segment raised padded>
      
      
        <Form name='contactForm'>
          <Form.Group widths='equal'>
          <Form.Input fluid name='fname' label='First name' placeholder='First name' onChange={(ev) => { this.handleChange('fname', ev)}} />
          <Form.Input fluid name='lname' label='Last name' placeholder='Last name' onChange={(ev) => { this.handleChange('lname', ev)}}/>
          
        </Form.Group>
          <Form.Field>
            <Form.Input fluid name='email' label='Email' placeholder='name@something.com' onChange={(ev) => { this.handleChange('email', ev)}} />
          </Form.Field>
          
          <Button color='green' type='submit' onClick={this.submit.bind(this)}>Submit</Button>
        </Form>

        
      </Segment>
    </Container>
    )
  }

}

export default AddContactForm