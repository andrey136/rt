import React, {Component} from 'react';
import axios from 'axios';
import './styles.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTextName: '',
      inputTextLogin: '',
      inputTextPassword: '',
      inputTextAge: '',
      password: '',
      login: true,
      wrongLoginOrPassword: false,
      fillInputErr: false,
    }
  }

  changeInputLogin(value) {
    value = value.replace(/ /g, '');
    if (value[value.length - 1] !== ' ') { // no space in
      this.setState({
        inputTextLogin: value,
      });
      console.log(value);
    }
  }

  changeInputPassword(value) {
    value = value.replace(/ /g, '');
    let password = this.state.password;
    if (value !== '') {
      console.log(!value.split('').includes('*'));
      if (value.replace(/\*/g, '').length > 1) {
        password += value.replace(/\*/g, '');
      } else {
        if (value.length !== this.state.password.length) {
          value.length < password.length ? password = password.slice(0, value.length) : password = password + value[value.length - 1];
        }
      }
      value = Array.from(Array(value.length), x => '*').join('');
    } else {
      password = '';
    }
    this.setState({
      inputTextPassword: value,
      password: password,
    });
    console.log(password);
  }

  changeInputName(value) {
    if (value[value.length - 1] !== ' ') {
      this.setState({
        inputTextName: value,
      });
      console.log(value);
    }
  }

  changeInputAge(value) {
    const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ""];
    console.log(value[value.length]);
    if ((arr.includes(value[value.length - 1]) || value === '') && value.length < 3) {
      this.setState({
        inputTextAge: value,
      });
      console.log(value);
    }
  }

  _handleKeyDown(e, curInp, nextInp) {
    console.log(curInp, this.state[`inputText${curInp}`]);
    if (e.key === 'Enter') {
      this.refs[nextInp].focus();
    }
  }

  authorize() {
    console.log(`${this.state.inputTextLogin},${this.state.password}`);
    if (this.state.inputTextLogin !== '' && this.state.inputTextPassword !== '') {
      this.setState({fillInputErr: false});
      axios.post('https://frightful-flesh-30245.herokuapp.com/api/authorization/',
        {
          login: this.state.inputTextLogin,
          password: this.state.password
        })
        .then(res => {
          if (res.data.err !== undefined) {
            this.wrongLoginOrPassword();
            throw new Error(res.data.err);
          } else {
            localStorage.setItem("_id", res.data._id);
            this.props.refresh();
          }
        })
        .catch(err => {
          console.log(`ERROR: ${err}`);
        })
    } else {
      this.setState({
        fillInputErr: true,
        wrongLoginOrPassword: false,
      })
    }
  }

  createANewUser() {
    if (this.state.inputTextName !== '' && this.state.inputTextAge !== '' && this.state.inputTextLogin !== '' && this.state.inputTextPassword !== '') {
      axios.post('https://frightful-flesh-30245.herokuapp.com/api/list/newUser',
        {
          login: this.state.inputTextLogin,
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
    } else {
      this.setState({
        fillInputErr: true,
      })
    }

  }

  wrongLoginOrPassword() {
    console.log('HHHOOOO');
    this.setState({
      wrongLoginOrPassword: true,
      fillInputErr: false,
    });
  }

  login() {
    this.setState({
      login: !this.state.login,
      inputTextName: '',
      inputTextAge: '',
      inputTextLogin: '',
      inputTextPassword: '',
      wrongLoginOrPassword: false,
      fillInputErr: false,
    })
  }

  render() {
    return (
      <div>
        <div className="register-form">
          <h1>{this.state.login ? "Log in" : "Sing up"}</h1>
          {this.state.fillInputErr && <p className="error">Error: Fill all the fields</p>}
          {!this.state.login &&
          <input type="text" placeholder="*name" ref="name" onChange={(e) => this.changeInputName(e.target.value)}
                 onKeyDown={(e) => this._handleKeyDown(e, 'Name', 'age')} value={this.state.inputTextName}/>}
          {!this.state.login &&
          <input type="text" placeholder="*age" ref="age" onChange={(e) => this.changeInputAge(e.target.value)}
                 onKeyDown={(e) => this._handleKeyDown(e, 'Age', 'login')} value={this.state.inputTextAge}/>}
          {this.state.wrongLoginOrPassword && <p className="error">Error: Wrong Password or Login</p>}
          <input type="text" placeholder="*login" ref="login" onChange={(e) => this.changeInputLogin(e.target.value,)}
                 onKeyDown={(e) => this._handleKeyDown(e, 'Login', 'password')} value={this.state.inputTextLogin}/>
          <input type="text" placeholder="*password" ref="password"
                 onChange={(e) => this.changeInputPassword(e.target.value)}
                 onKeyDown={(e) => this._handleKeyDown(e, 'Password', 'log_in')}
                 value={this.state.inputTextPassword}
                 className="password"/>
          <div className="flex-center">
            <p className="singUp" onClick={() => this.login()}>{this.state.login ? (window.innerWidth > 500 ? "Create an account" : "Sing up") : "Log in"}</p>
            <button className="btn btn-warning" ref="log_in"
                    onClick={this.state.login ? () => this.authorize() : () => this.createANewUser()}>{this.state.login ? "Log in" : "Sing up"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;