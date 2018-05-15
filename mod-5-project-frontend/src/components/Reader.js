import React from 'react'
import ReactFilestack from 'filestack-react';

export default class Reader extends React.Component{

  render(){
    return(
      <div id="reader">
        <div id="viewer" class="spreads"></div>
        <div id="prev" class="arrow">‹</div>
        <div id="next" class="arrow">›</div>
      </div>
    )
  }
}







  
