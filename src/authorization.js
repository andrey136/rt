import React, {Component} from 'react';
import axios from 'axios';
import AuthHelperMethods from "./components/AuthHelperMethods.txt";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTextEmail: '',
      inputTextPassword: '',
      warning: false,
      password: '',
    }
  }

  changeInputEmail(value) {
    this.setState({
      inputTextEmail: value,
    });
    console.log(this.state.inputText, this.title);
  }

  changeInputPassword(value){
    let password = this.state.password;
    value.length < password ? password = password.slice(0, value.length) : password + value[value.length - 1];
    this.setState({
      inputTextPassword: value,
      password: password,
    });
  }

  _handleKeyDownEmail(e) {
    if (e.key === 'Enter') {
      this.state.inputText === '' ?
        this.setState({warning: true}) :
        this.refs.password.focus();
    }
  }

  _handleKeyDownPassword(e) {
    if (e.key === 'Enter') {
      this.state.inputText === '' ?
        this.setState({warning: true}) :
        this.refs.log_in.focus();
    }
  }

  _handleKeyDownLogIn(e) {
    if (e.key === 'Enter') {
      e.target.blur();
      this.authorize();
    }
  }

  authorize() {
    console.log('Authorize', `login: ${this.state.inputTextEmail}, password: ${this.state.inputTextPassword}`);
    axios.post('http://localhost:5000/api/authorization',
      {
        login: this.state.inputTextEmail,
        password: this.state.inputTextPassword
      })
      .then(res => {
        console.log(res.data);
        localStorage.setItem(res.data.name, res.data.id);
        this.props.refresh();
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      })
  }

  render() {
    return (
      <div>
        <div className="register-form">
          <h1>Register</h1>
          <input type="text" placeholder="*login" ref="email" onChange={(e) => this.changeInputEmail(e.target.value)}
                 onKeyDown={(e) => this._handleKeyDownEmail(e)} value={this.state.inputTextEmail}/>
          <input type="text" placeholder="*password" ref="password" onChange={(e) => this.changeInputPassword(e.target.value)} onKeyDown={(e) => this._handleKeyDownPassword(e)}
          value={Array.from(Array(this.state.inputTextPassword.length), x =>'*').join('')} className="password"/>
          <div className="flex-center">
            <a href="">Create an account</a>
            <button className="btn btn-warning" ref="log_in" onKeyDown={(e) => this._handleKeyDownLogIn(e)} onClick={() => this.authorize()}>Log in
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