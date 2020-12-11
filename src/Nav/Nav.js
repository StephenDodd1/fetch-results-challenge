import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props){
  return(
    <ul>
      {props.navBar.map((a,i)=>{
        return <li key={i}>{a}</li>
      })}
    </ul>
  )
}
export default Nav;