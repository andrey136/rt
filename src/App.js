import React, {Component} from 'react';
import uniqid from 'uniqid';
import AddToDo from './addToDoList';
import RemoveAllItems from './remove-all-items';
import Table from './table';
import axios from 'axios';
import spinner from './25.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdited: false,
      editedItem: {},
      inputText: '',
      list: [],
      loading: false
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

  changeList(){
    this.setState({ loading: true });
    let list = [...this.state.list];
    axios.get('http://localhost:5000/')
      .then((response) => {
        console.log('Change', response.data.length);
        list = response.data;
        this.loadedElements(list);
        console.log(response.data);
        this.setState({ loading: false });
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
  }

  load(){
    console.log('LOAD');
    this.setState({ loading: true });
    let list = [...this.state.list];
    axios.get('http://localhost:5000/')
      .then((response) => {
        list = list.concat(...response.data);
        this.loadedElements(list);
        this.setState({ loading: false });
        console.log(response);
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
  }

  loadedElements(list){
    this.setState({
      loading: false,
      list: list,
      inputText: '',
    });
    console.log('loadedElements', list);
  }

  render() {
    return (
      <div className="container">
        <h1>TODO List</h1>
        <hr/>
        <div className="input-group mb-3">
          <input
            className="form-control"
            placeholder="Text here"
            value={this.state.inputText}
            onChange={(e) => this.changeInput(e.target.value)}
          />
          <AddToDo
            loading={() => this.setState({ loading: true })}
            list={this.state.list}
            inputText={this.state.inputText}
            onChange={(arg) => this.changeList(arg)}
          />
          <RemoveAllItems
            onChange={(arg) => this.changeList(arg)}
          />
          <button className="btn btn-danger" onClick={() => this.load()}>Load</button>
        </div>
        { this.state.loading ?
          <img src = {spinner} alt=""/>
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
      </div>
    );
  }
}

export default App;