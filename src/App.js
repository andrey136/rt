import React, {Component} from 'react';
import uniqid from 'uniqid';
import AddToDo from './addToDoList';
import RemoveAllItems from './remove-all-items';
import Table from './table';
import axios from 'axios';
import spinner from './25.svg';
import Register from "./authorization";
import './styles.css';
import AuthHelperMethods from './components/AuthHelperMethods.txt';
import withAuth from './components/Authorization v.2-0.txt';

//Auth = new AuthHelperMethods();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdited: false,
      editedItem: {},
      inputText: '',
      list: [],
      loading: false,
      authorized: false,
    };
  }

  _handleLogout(){
    this.Auth.logout();
    this.props.history.replace('/login');
  }

  changeInput(value) {
    this.setState({inputText: value})
  }

  done(id) {
    const list = this.state.list;
    list.map(el => el.id === id ? el.done = !el.done : '');
    this.setState({
      list: list
    })
  }

  editItem(arg) {
    this.setState({isEdited: true, editedItem: arg});
  }

  changeEditedInput(value) {
    this.setState({
      editedItem: {
        ...this.state.editedItem,
        title: value
      }
    })
  }

  saveEditedItem() {
    const newItem = {...this.state.editedItem};
    const index = this.state.list.findIndex(el => el.id === newItem.id);
    const newList = [...this.state.list];
    newList[index] = newItem;
    this.setState({
      list: newList,
      isEdited: false,
      editedItem: {},
    });
  }

  changeList() {
    this.setState({loading: true});
    let list = [...this.state.list];
    axios.get('http://localhost:5000/')
      .then((response) => {
        console.log('Change', response.data.length);
        list = response.data;
        this.loadedElements(list);
        console.log(response.data);
        this.setState({loading: false});
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  load() {
    console.log('LOAD');
    this.setState({loading: true});
    let list = [...this.state.list];
    axios.get('http://localhost:5000/')
      .then((response) => {
        list = list.concat(...response.data);
        this.loadedElements(list);
        this.setState({loading: false});
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  loadedElements(list) {
    this.setState({
      loading: false,
      list: list,
      inputText: '',
    });
    console.log('loadedElements', list);
  }

  componentDidMount() {
    if(localStorage.getItem("admin") === "5CFEE39D812461A67D865C819934895A3FB1A23934941847217A5B5ECB862FDBB2D41B538F")
      this.setState({ authorized: true });
    if(localStorage.getItem("admin") !== null){
      console.log('AXIOS');
      axios.get('http://localhost:5000/' + localStorage.getItem('admin'))
        .then((response) => {
          this.permission(response.data.message );
          console.log(response.data.message)
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }

  permission(){
    this.setState({ authorized: true });
  }

  logout(){
    localStorage.clear();
    this.setState({ authorized: false })
  }

  render() {
    return (<div>
        {this.state.authorized ?
          <div className="container">
            <h1>TODO List</h1>
            <a href="" onClick={() => this.logout()}>logout</a>
            <hr/>
            <div className="input-group mb-3">
              <input
                className="form-control"
                placeholder="Text here"
                value={this.state.inputText}
                onChange={(e) => this.changeInput(e.target.value)}
              />
              <AddToDo
                loading={() => this.setState({loading: true})}
                list={this.state.list}
                inputText={this.state.inputText}
                onChange={(arg) => this.changeList(arg)}
              />
              <RemoveAllItems
                onChange={(arg) => this.changeList(arg)}
              />
              <button className="btn btn-danger" onClick={() => this.load()}>Load</button>
            </div>
            {this.state.loading ?
              <img src={spinner} alt=""/>
              :
              <Table
                list={this.state.list}
                onChange={() => this.changeList()}
                editedItem={this.state.editedItem}
                editItem={(arg) => this.editItem(arg)}
                saveEditedItem={() => this.saveEditedItem()}
                changeEditedInput={(arg) => this.changeEditedInput(arg)}
                isEdited={this.state.isEdited}
              />}
          </div> : <Register refresh={() => this.permission()}/>}
      </div>
    );
  }
}

export default App;