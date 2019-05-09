import React, { Component, Fragment } from 'react';
import About from "./About";
import StartButton from "./StartButton";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <Fragment>
        <About />
        <StartButton />
      </Fragment>
     );
  }
}
 
export default Home;