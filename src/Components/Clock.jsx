import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

class Clock extends Component{
    constructor (props){
        super(props);
        this.state = {date: new Date(), isLoggedIn: false};
        

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        alert('asdfasd');
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    
   

    render(){
        return(
            <div>
                <Icon bordered name='time'  color='teal' /> {this.state.date.toLocaleTimeString()}
            </div>
        )
    }
    
}

export default Clock;