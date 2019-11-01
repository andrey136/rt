import React, {Component} from 'react';
import {addToDoList} from "./functions";

class AddToDo extends Component {

  render() {
    return (
      <button
        ref='addTodo'
        className="btn btn-outline-secondary"
        onClick={() => addToDoList(this.props.inputText, this.props.loading, this.props.onChange)}
      >Add to list
      </button>
    )
  }
}

export default AddToDo;
