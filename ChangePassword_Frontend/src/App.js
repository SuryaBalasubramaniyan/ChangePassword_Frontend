import React, {Component} from 'react';
import ChangePassword from './components/ChangePassword'
import './App.css';

//import {Button , Form , FormGroup, label, Input, FormFeedback} from 'reactstrap';
//import Axios from 'axios';




class App extends Component {

  state={
    userData: []
  }

  componentDidMount()
  {
    //  Axios.get('https://jsonplaceholder.typicode.com/posts')
     // .then(res=> this.setState({userData: res.data})) 
      // this.setState({userData: res.data})
      //console.log(res.data)
  }

 
 render()
 {
   return (
    
      <ChangePassword userData = {this.state.userData}/>


   )
 }

}

export default App;