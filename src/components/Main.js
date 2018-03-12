import React from "react";
import Header  from './Header';

export class Main extends React.Component{
  render()
  {
    return (
      <div className="container-fluid bg-sideLayout">
        <div className="row">
        <Header/>
        </div>
      </div>
    );
   }
}
