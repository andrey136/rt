import React, {Component} from 'react';
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
      authorized: true,
    };
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

  changeList(list) {
    console.log("Change List", list);
    this.loadedElements(list);
  }

  load() {
    this.setState({loading: true});
    axios.get(`https://enigmatic-coast-85950.herokuapp.com/api/list/${localStorage.getItem('_id')}`)
      .then((res) => {
        this.loadedElements(res.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadedElements(list) {
    console.log("LoadedElements", list);
    this.setState({
      loading: false,
      list: list,
      inputText: '',
    });
  }

  // permission(){
  //   this.setState({ authorized: true });
  // }
  //
  // logout(){
  //   localStorage.clear();
  //   this.setState({ authorized: false })
  // }

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
          </div>: <Register refresh={() => this.permission()}/>}
      </div>
    );
  }
}

export default App;