import React ,{Component}from "react";
import Header from "./Header";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="container-fluid ">
        <div className="row">
          <Header />
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }
}
export default App;
