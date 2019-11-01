import React, {Component} from 'react';
import AddToDo from './addToDoList';
import RemoveAllItems from './remove-all-items';
import Table from './table';
import axios from 'axios';
import spinner from './loading.svg';
import Register from "./authorization";
import './styles.css';

//Auth = new AuthHelperMethods();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdited: false,
      editedItem: {},
      inputText: '',
      list: [],
      loading: this.load(),
      authorized: this.isUserAuthorized()
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

  isUserAuthorized(){
    console.log('AUTH');
    return localStorage.getItem('_id') !== undefined && localStorage.getItem('_id') !== null;
  }

  saveEditedItem() {
    const newItem = {...this.state.editedItem};
    axios.put(`https://frightful-flesh-30245.herokuapp.com/api/list/changeValue/${localStorage.getItem("_id")}`, newItem)
      .then((res) => {
        this.setState({
          list: res.data,
          isEdited: false,
          editedItem: {},
        });
      })
      .catch((err) => console.log(err));
  }

  changeList(list) {
    this.loadedElements(list);
  }

  load() {
    this.setState({loading: true});
    axios.get(`https://frightful-flesh-30245.herokuapp.com/api/list/${localStorage.getItem('_id')}`)
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

   componentDidMount() {
     console.log('Component', localStorage.getItem('_id'));
     axios.get(`https://frightful-flesh-30245.herokuapp.com/api/list/${localStorage.getItem('_id')}`)
       .then(res => {
         if(res.data._id !== undefined){
           console.log('Axios', res.data._id);
           localStorage.clear();
           localStorage.setItem('_id', res.data._id);
         }else{
           localStorage.clear();
           console.log('Wrong ID', localStorage.getItem('_id') !== undefined && localStorage.getItem('_id') !== null);
         }
       });
   }

  permision(){
    this.setState({ authorized: true , loading: false});
    this.load();
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
            </div>
            {this.state.loading ?
              <img src={spinner} alt=""/>
              :
              <Table
                list={this.state.list}
                onChange={(arg) => this.changeList(arg)}
                editedItem={this.state.editedItem}
                editItem={(arg) => this.editItem(arg)}
                saveEditedItem={() => this.saveEditedItem()}
                changeEditedInput={(arg) => this.changeEditedInput(arg)}
                isEdited={this.state.isEdited}
              />}
          </div>: <Register refresh={() => this.permision()}/>}
      </div>
    );
  }
}

export default App;