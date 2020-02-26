import React, { Component } from 'react';
import { Card, Icon, Image, Confirm} from 'semantic-ui-react'
import { graphqlOperation, API }  from "aws-amplify";
import { deleteContact } from '../graphql/mutations';
import {  Link } from "react-router-dom";

class ContactCard  extends Component{
  state = { open: false, deleted: false}
  
  constructor(props) {
    super(props);
    
    console.log(props.id);
    this.setState({
      id: props.id
    });
  }
  
  open = () => this.setState({ open: true })
  handleConfirm = () => {
    //this.setState({ open: false })

    this.setState({ open: false}, () => { 
      console.log(this.props.id);  
      const result =  API.graphql(graphqlOperation(deleteContact, {ContactId: this.props.id}))
                              .then(response => this.setState({deleted: true}))
                              .catch (error => console.log(error.message)) ;

      // TODO: Fix this. Should alert failed delete, no authZ
      console.log(result);
      
    });
  }
  

  render(){
    
    return(
      <div>
      { this.state.deleted == false ?
        <Card color='orange' raised>
          <Image src='/images/matthew.png' />
          <Card.Content>
            <Card.Header>{this.props.fname} {this.props.lname}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.email}</span>
            </Card.Meta>
            <Card.Description>{this.props.fname} is based in XYZ and is currently in <a target="_blank" href={"https://www.google.com/maps/place/" + this.props.location}>{this.props.location}</a></Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="right">
              <Link  to={'/EditContact/'+this.props.id}><Icon name='edit' color="blue link circular"/></Link>
              <Icon name='trash'  color="red" link circular onClick={this.open} /*onClick={this.delete.bind(this)}*//>
              <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.handleConfirm} />
          </Card.Content>
        </Card> : null
      }
      </div>
    )
  }
}
//const CardExampleCard = (props) => (

export default ContactCard