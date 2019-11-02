import React, {Component} from 'react';
import axios from "axios";

class Table extends Component {

  functionDone(id) {
    axios.put(`https://frightful-flesh-30245.herokuapp.com/api/list/changeDone/${localStorage.getItem("_id")}`, {"id": id})
      .then((res) => {
        console.log(res.data);
        this.props.onChange(res.data);
      })
      .catch((err) => console.log('Error Done', err));
  }

  changeEditedItem(el){
    const arg = {...el};
    this.props.editItem(arg);
  }

  editForm(el){
    return (
      <div className="input-group editForm">
        <input
          className="form-control"
          value={this.props.editedItem.title}
          onChange={(e) => this.changeInput(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn" onClick={() => this.saveEditedItem()}>Save</button>
        </div>
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
      url: `https://frightful-flesh-30245.herokuapp.com/api/list/deleteItem/${localStorage.getItem('_id')}`,
      data: {id: id,}})
      .then( (response) => {
        this.props.onChange(response.data);
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
                <td className={el.done + " Todo" }>
                  <p>{el.title}</p>
                </td>
                <td className="th">
                  <button className={`btn${window.innerWidth > 750 ? ' btn-outline-success' : ' btn-success'}`} onClick={() => this.functionDone(el.id)}>Done</button>
                  <button className="btn btn-primary" onClick={() => this.changeEditedItem(el)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => this.functionDeleteItem(el.id)}>Delete</button>
                </td>
              </tr>
            )}</tbody>
        </table>
        {this.props.isEdited && <div id="editFormBlink"></div>}
        {this.props.isEdited && this.editForm()}
      </div>
    )
  }
}

export default Table;