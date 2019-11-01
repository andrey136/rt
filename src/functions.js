import React, {Component} from 'react';
import axios from "axios";
import uniqid from "uniqid";

export const addToDoList = (inputText, loading, onChange) => {
    if (inputText !== '') {
      loading();
      axios.post(`https://frightful-flesh-30245.herokuapp.com/api/list/${localStorage.getItem('_id')}`, {
        title: inputText,
        id: uniqid(),
        done: false
      })
        .then((res) => {
          console.log('ADD', res.data);
          onChange(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
}