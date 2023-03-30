import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import axios from "axios";


class App extends Component{
  state = {
    values: []
  };

  componentDidMount(): void {
    axios.get("http://localhost:5000/api/value")
      .then((response)=>{
        this.setState({
          values: response.data
        })
      })
  };

  render(){
  return (
    <div >
      <Header as='h2' icon>
    <Icon name='users' />
   Reactivities
  
  </Header>
  <List>
  {this.state.values.map((value: any)=>
   <List.Item key={value.id}>{value.name}</List.Item>
 )}
  
    
  </List>
      <ul>
       
      </ul>
    </div>
  );
}}

export default App;
