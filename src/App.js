import React from "react";
import "./App.css";
import Nav from "./Nav/Nav";
import { Link } from "react-router-dom";
var res = require("./STORE.json");

function App() {
  var results = res;
  /*fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json")
    .then((res) => {
      res.json();
    }).then((data) => {
      console.log(data)
      data.map(d => {
        return results.push(d.name)
      })
      console.log(results)
    })*/
  let max = 0;
  const navBar = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].listId > max) {
      max = results[i].listId;
    }
  }
  for (let i = 1; i < max + 1; i++) {
    navBar.push(<Link to={i}>Group {i}</Link>);
  }
  const resultsFiltered = results.filter(
    (obj) => obj.name !== null && obj.name !== ""
  );
  function swap(items, leftIndex, rightIndex) {
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  function partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)].id,
      i = left,
      j = right;
    while (i <= j) {
      while (items[i].id < pivot) {
        i++;
      }
      while (items[j].id > pivot) {
        j--;
      }
      if (i <= j) {
        swap(items, i, j);
        i++;
        j--;
      }
    }
    return i;
  }
  function quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
      index = partition(items, left, right);
      if (left < index - 1) {
        quickSort(items, left, index - 1);
      }
      if (index < right) {
        quickSort(items, index, right);
      }
    }
    return items;
  }
  quickSort(resultsFiltered, 0, resultsFiltered.length - 1);
  const list = [];
  for (let i = 0; i < max; i++) {
    list[i] = [];
  }
  for (let i = 0; i < resultsFiltered.length; i++) {
    list[resultsFiltered[i].listId - 1].push(resultsFiltered[i]);
  }
  return (
    <div className="App">
      <header className="App-header">Fetch Rewards - Display Results</header>
      <Nav navBar={navBar} />
      <ul>
        {list.map((a,i) => {
          return (
            <>
            <h1>Group {i+1}</h1>
            {a.map((b, i) => {
            return <li key={i}>{b.name}</li>;
          })}</>)
        })}
      </ul>
    </div>
  );
}
export default App;
