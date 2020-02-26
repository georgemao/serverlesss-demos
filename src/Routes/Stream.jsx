import React, { Component } from 'react';
import '../App.css';
import  {Container, Segment,  Statistic } from 'semantic-ui-react'

import { graphqlOperation }  from "aws-amplify";
import { onStream } from '../graphql/subscriptions';

import { Auth, API } from 'aws-amplify';

import { Line } from 'react-chartjs-2';

const initialState = {
  labels: ['1','2','3','4','5','6','7','8','9','10'],
  datasets: [
    {
      label: 'Sensor Readings',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      data: []
    }
  ]
};

export default class Stream extends Component {
  state = { sensorList: [], initialState: initialState}
  
  constructor(props) {
    super(props);
      
    var list = [];
    this.setState({
        sensorList: list,
        initialState: initialState
    });
  }


  async componentDidMount(){
    const user = await Auth.currentAuthenticatedUser();
    console.log('username:', user.username);

    let subscription = API.graphql(
        graphqlOperation(onStream)
    ).subscribe({
        next: (data) => {
            console.log(data);
            console.log(data.value);
            console.log(data.value.data.onStream);
            
            var list = this.state.sensorList;
            console.log("State list: " + list);

            if(list.length == 35){
              list.splice(0,1);
            }
            list.push(data.value.data.onStream);

            var oldDataSet = this.state.initialState.datasets[0];
            var newData = oldDataSet.data;
            if(newData.length == 10){
              newData.splice(0,1);
            }
            newData.push(data.value.data.onStream.temp);

            var newDataSet = {
              ...oldDataSet
            };
            newDataSet.data = newData;
            
            /*var oldDataSet = this.state.initialState.datasets[0].data;
            if(oldDataSet.length == 10){
              oldDataSet.splice(0,1);
            }
            oldDataSet.push(data.value.data.onStream.temp);
            
            var newDataSet = {
              ...oldDataSet
            };
      
            newDataSet.data = oldDataSet;
            */

            var newState =  {
              ...initialState,
              datasets: [newDataSet]
            }
            
            this.setState({
                sensorList: list,
                initialState: newState
            })

        },
        error: error => {
            console.warn(error);
          }
    });
  }

  render() {


    return (
      <div>

        <Container>
        
        { this.state.sensorList.length > 0 ?
          <Segment raised padded>
    
                <Statistic.Group widths='six' size='small'> 
                    {this.state.sensorList.map(sensor => 
                              <Statistic color={sensor.temp>100 ? 'red ': 'blue'}>
                                <Statistic.Value>{sensor.temp}&#8457;</Statistic.Value>
                                <Statistic.Label>Sensor: {sensor.sensorId}</Statistic.Label>
                            </Statistic>)
                    }
                </Statistic.Group>

          </Segment>
            :
            null
          }
          { this.state.sensorList.length > 0 ?
          <Segment>
              <Line data={this.state.initialState}  redraw options={{animation: false }}/>
          </Segment>
              :
              null
           
          }
        </Container>
  
      </div>
    
    );
  }
}