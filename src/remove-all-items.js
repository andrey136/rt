import React, {Component} from 'react';
import axios from "axios";

class RemoveAllItems extends Component {

  removeAllItemsFunction() {
    const newList = [];
    axios({
      method: 'delete',
      url: 'http://localhost:5000/deleteAll',
      data: {id: "deleteALL"}})
      .then( (response) => {
        console.log(response.data);
        this.props.onChange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          onClick={() => this.removeAllItemsFunction()}
        >Remove all items
        </button>
      </div>
    )
  }
}
export default RemoveAllItems;
