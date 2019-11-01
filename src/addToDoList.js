import React, {Component} from 'react';
import uniqid from 'uniqid';
import axios from 'axios';

class AddToDo extends Component {

  addToDoList() {
    console.log(this.props.inputText);
    if(this.props.inputText !==''){
      this.props.loading();
      let list = [];
      if(this.props.inputText !== ''){
        axios.post(`https://frightful-flesh-30245.herokuapp.com/api/list/${localStorage.getItem('_id')}`, {
          title: this.props.inputText,
          id: uniqid(),
          done: false
        })
          .then( (response) => {
            console.log('ADD', response.data);
            this.props.onChange(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  addToDoList2(){

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
