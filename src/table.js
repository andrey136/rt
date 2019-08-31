import React, {Component} from 'react';
import axios from "axios";

class Table extends Component {

  functionDone(id) {
    const newList = this.props.list;
    let indexOfItem = newList.findIndex(el => el.id === id);
    newList[indexOfItem].done = !newList[indexOfItem].done;
    this.props.onChange(newList);
  }

  changeEditedItem(el){
    const arg = {...el};
    this.props.editItem(arg);
  }

  editForm(el){
    return (
      <div>
        <input
          className="input"
          value={this.props.editedItem.title}
          onChange={(e) => this.changeInput(e.target.value)}
        />
        <button className="save-button" onClick={() => this.saveEditedItem()}>Save</button>
      </div>
    )
  }

  saveEditedItem(){
    this.props.saveEditedItem();
  }

  changeInput(value){
    const el = this.props.editedItem;
    el.title = value;
    this.props.editItem(el);
  }


  functionDeleteItem(id) {
    console.log(id);
    axios({
      method: 'delete',
      url: 'http://localhost:5000/',
      data: {id: id,}})
      .then( (response) => {
        console.log(response.data.message);
        this.props.onChange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">My List</th>
            <th className="th">{}</th>
          </tr>
          </thead>
          <tbody id="list">{
            this.props.list.map((el) =>
              <tr key={el.id}>
                <td className={el.done + ""}>
                  {el.title}
                </td>
                <td className="th">
                  <button className="btn btn-outline-success" onClick={() => this.functionDone(el.id)}>Done</button>
                  <button className="btn btn-primary" onClick={() => this.changeEditedItem(el)}>Edit</button>
                  <i className="fas fa-backspace" onClick={() => this.functionDeleteItem(el.id)}>{}</i>
                </td>
              </tr>
            )}</tbody>
        </table>
        {this.props.isEdited && this.editForm()}
      </div>
    )
  }
}

export default Table;