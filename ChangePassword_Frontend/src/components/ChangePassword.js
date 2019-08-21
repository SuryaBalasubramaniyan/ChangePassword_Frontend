import React, { Component } from "react";
   // import Form from 'react-bootstrap/Form'
    //import Button from 'react-bootstrap/Button'

import Axios from 'axios';
import '../App.css';
    //import {Container,Row,Col} from "react-bootstrap";
  //  import Bootstrap from "react-bootstrap";
   
export default class ChangePassword extends Component {
  constructor() {
    super();
    this.state={
      userID : "",
      passwordHistory:"",
      hpassword: "",
      oldPassword: "",
      confirmPassword: "",
      fields:{ 
               hpassword:'',
               oldPassword: '',
               confirmPassword: ''
              },
      errors: {}
            }
           
    this.eventhandler=this.eventhandler.bind(this);
    this.clear=this.clear.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
  }

 
  onSubmit(e) {
    e.preventDefault();
    const userObject={
      userID : "41",
      passwordHistory:{
     oldpwd:this.state.fields.oldPassword,
     pwd1: this.state.fields.hpassword
      }}
    
    if (this.validateForm())  {
  console.log(`${userObject.userID} ${userObject.passwordHistory.oldpwd} ${userObject.passwordHistory.pwd1} `)
  
 Axios.post('http://10.150.124.36:8015/api/change',userObject)
    .then(
       res=>{
        console.log(res.data)
      
      if(res.data==="Password changed successfully"){
            alert("password changed successfully")
            //window.location.assign('http://10.150.121.200:8014/Welcome');
            }
          else if(res.data==="Please enter correct password"){
            alert("please enter correct password")
              //this.props.history.push('/ChangePassword');
            }
           } )  

   let fields = {};
   fields["oldPassword"]="";
   fields["hpassword"] = "";
   this.setState({fields:fields});
  
    
  
  //console.log("password changed successfully") 
  //this.props.history.push('/');
  
 
  }
  }



  eventhandler(e){
    
    let fields = this.state.fields;
       fields[e.target.name] = e.target.value;
       this.setState({
         fields
       });
 
    
  }
  
  
  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
  
    if (!fields["oldPassword"]) {
      formIsValid = false;
      errors["oldPassword"] = "*This Field can not be empty";
    }
  
    if (!fields["hpassword"]) {
      formIsValid = false;
      errors["hpassword"] = "*This Field can not be empty";
    }
    
  
    if (!fields["confirmPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = "*This Field can not be empty";
    }
  
    
   
  
    if (typeof fields["hpassword"] !== "undefined") {
      if (!fields["hpassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["hpassword"] = <font color="red">Please enter in correct format</font>;
      }
    }

   

    if(typeof fields["confirmPassword"]!== "undefined"){
      if(fields["hpassword"]!== fields["confirmPassword"]){
      formIsValid=false;
      errors["confirmPassword"]=<font color="red">Password doesn't match</font>;
      }
    }
  
    this.setState({
      errors: errors
    });
    return formIsValid;
  
  }
  

  clear=()=>{
  
    this.setState({
      oldPassword:'',
      hpassword:'',
      confirmPassword:''
     })
  }

  

  render() {
    return (
     
   

      <form className="changepassword" id="form" action="/">
        
      <div className="text-center">
        <h1 >Change Password</h1>

              <label>Old Password:</label>
              <input type="password" name="oldPassword" id="oldpwd" value={this.state.fields.oldPassword} ref="clearPwd" onChange={this.eventhandler} placeholder="Old Password" required></input>
              <div className="errorMsg">{this.state.errors.oldPassword}</div>
            <br/>
            <br/>
            
            <label>New Password:</label>
            <input  type="password" name="hpassword" id="newpwd" value={this.state.fields.hpassword} ref="clearPwd" onChange={this.eventhandler} placeholder="New Password" required></input>    
            <div className="errorMsg">{this.state.errors.hpassword}</div>
            <p><font size="3">Use 8 or more characters with a mix of letters, numbers & symbols</font></p>
            <br/>
            <label>Confirm New Password:</label>
            <input  type="password" name="confirmPassword" id="confirmnewpwd" value={this.state.fields.confirmPassword} ref="clearPwd" onChange={this.eventhandler} placeholder="Confirm Password" required></input>    
            <div className="errorMsg">{this.state.errors.confirmPassword}</div>
            <br/>
            <br/>
           
            <button  type="submit" onClick= {this.onSubmit} >Change Password</button> 
          
         
          <br/>
          <button  onClick={this.clear} >Reset</button>
        </div>  
      </form>
      
      
    )
  }
}

