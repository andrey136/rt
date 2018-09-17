import React, {Component} from 'react';
import uniqid from 'uniqid';

class AddToDo extends Component {

  addToDoList() {
    const newList = this.props.list;
    newList.push({
      title: this.props.inputText,
      id: uniqid(),
      done: false
    });
    this.props.onChange(newList);
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => this.addToDoList()}
        >Add to list
        </button>
      </div>
    )
  }
}
export default AddToDo;
