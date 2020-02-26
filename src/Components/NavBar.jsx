import React from 'react'
import  {Container, Image, Dropdown, Menu } from 'semantic-ui-react'
import {  Link } from "react-router-dom";
import Clock from './Clock';

const NavBar = (props) => (

  <Menu  inverted>
  <Container>
    <Menu.Item as='a' header>
      <Image size='mini' src='/images/logo.png' href='/' style={{ marginRight: '1.5em' }} />
      ContactBook v0.1
    </Menu.Item>
    <Menu.Item as={Link} to='/'>Home</Menu.Item>

    <Dropdown item simple text='Options'>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} icon="add" text="Add Contact" to='/AddContact'/>
        <Dropdown.Item>View Stats</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>View Options</Dropdown.Header>
            <Dropdown.Item icon="exchange" text="Toggle View" onClick = {props.toggleView}/>
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Item><Clock/></Menu.Item>
  </Container>
  </Menu>

)

export default NavBar