import React, {Component} from 'react';
import uniqid from 'uniqid';
import AddToDo from './addToDoList'
import RemoveAllItems from './remove-all-items'
import Table from './table'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdited: false,
      editedItem: {},
      inputText: '',
      list: [{
        title: 'Some',
        id: uniqid(),
        done: false
      }, {
        title: 'Google',
        id: uniqid(),
        done: false
      }]
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

  changeList(arg){
    this.setState({
      list: arg,
      inputText: '',
    });
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
            list={this.state.list}
            inputText={this.state.inputText}
            onChange={(arg) => this.changeList(arg)}
          />
          <RemoveAllItems
            onChange={(arg) => this.changeList(arg)}
          />
        </div>
        <Table
        list={this.state.list}
        onChange={(arg) => this.changeList(arg)}
        editedItem={this.state.editedItem}
        editItem={(arg) => this.editItem(arg)}
        saveEditedItem={() => this.saveEditedItem()}
        changeEditedInput={(arg) => this.changeEditedInput(arg)}
        isEdited={this.state.isEdited}
        />
      </div>
    );
  }
}

export default App;