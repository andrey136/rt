import React, {Component} from 'react';
import axios from 'axios';
import './styles.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTextName: '',
      inputTextEmail: '',
      inputTextPassword: '',
      inputTextAge:'',
      warning: false,
      password: '',
      login: true
    }
  }

  changeInputEmail(value) {
    this.setState({
      inputTextEmail: value,
    });
    console.log(value);
  }

  changeInputPassword(value){
    let password = this.state.password;
    value.length < password.length ? password = password.slice(0, value.length) : password = password + value[value.length - 1];
    this.setState({
      inputTextPassword: value,
      password: password,
    });
    console.log(password);
  }

  changeInputName(value){
    this.setState({
      inputTextName: value,
    });
    console.log(value);
  }

  changeInputAge(value){
    this.setState({
      inputTextAge: value,
    });
    console.log(value);
  }

  _handleKeyDown(e,curInp, nextInp) {
    console.log(curInp, this.state[`inputText${curInp}`]);
    if (e.key === 'Enter') {
      this.state[`inputText${curInp}`] === '' ?
        this.setState({warning: true}) :
        this.refs[nextInp].focus();
    }
  }

  authorize() {
    console.log(`${this.state.inputTextEmail},${this.state.password}`);
    axios.post('https://frightful-flesh-30245.herokuapp.com/api/authorization/',
      {
        login: this.state.inputTextEmail,
        password: this.state.password
      })
      .then(res => {
        console.log('RES.DATA', res.data._id);
         localStorage.setItem("_id", res.data._id);
         this.props.refresh();
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      })
  }

  createANewUser(){
    axios.post('https://frightful-flesh-30245.herokuapp.com/api/list/newUser',
      {
        login: this.state.inputTextEmail,
        password: this.state.password,
        name: this.state.inputTextName,
        age: this.state.inputTextAge,
      })
      .then(res => {
        console.log('RES.DATA', res.data._id);
        localStorage.setItem("_id", res.data._id);
        this.props.refresh();
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      })
  }

  login(){
    this.setState({
      login: !this.state.login,
      inputTextName: '',
      inputTextAge: '',
      inputTextEmail: '',
      inputTextPassword: '',
    })
  }

  render() {
    return (
      <div>
        <div className="register-form">
          <h1>{this.state.login ? "Log in" : "Sing up"}</h1>
          {!this.state.login && <input type="text" placeholder="*name" ref="name" onChange={(e) => this.changeInputName(e.target.value)}
                 onKeyDown={(e) => this._handleKeyDown(e,'Name','age')} value={this.state.inputTextName}/>}
          {!this.state.login && <input type="text" placeholder="*age" ref="age" onChange={(e) => this.changeInputAge(e.target.value)}
                                       onKeyDown={(e) => this._handleKeyDown(e,'Age', 'email')} value={this.state.inputTextAge}/>}
          <input type="text" placeholder="*login" ref="email" onChange={(e) => this.changeInputEmail(e.target.value,)}
                 onKeyDown={(e) => this._handleKeyDown(e, 'Email', 'password')} value={this.state.inputTextEmail}/>
          <input type="text" placeholder="*password" ref="password" onChange={(e) => this.changeInputPassword(e.target.value)} onKeyDown={(e) => this._handleKeyDown(e, 'Password', 'log_in')}
          value={Array.from(Array(this.state.inputTextPassword.length), x =>'*').join('')} className="password"/>
          <div className="flex-center">
            <p className="singUp" onClick={() => this.login()}>{this.state.login ? "Create an account" : "Log in"}</p>
            <button className="btn btn-warning" ref="log_in" onClick={this.state.login ? () => this.authorize() : () => this.createANewUser()}>{this.state.login ?  "Log in" : "Sing up"}
            </button>
          </div>
        </div>
        { this.state.warning &&
         <div className="warning">
           <h2>Warning</h2>
           <p>You should fill all the labels with *</p>
         </div>
        }
      </div>
    );
  }
}

export default Register;