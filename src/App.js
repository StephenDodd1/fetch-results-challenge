import React from 'react';
import './App.css';

function App() {
  const results = [];
  fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json", {mode: "no-cors"})
    .then((res) => {
      console.log(res)
      res.json();
    }).then((data) => {
      console.log(data)
      data.map(d => {
        return results.push(d.name)
      })
      console.log(results)
    })
  return (
    <div className="App">
      <header className="App-header">Fetch Rewards - Display Results</header>
      {results.map(a => {
        return <p>{a.name}</p>})}
    </div>
  );
}

export default App;
