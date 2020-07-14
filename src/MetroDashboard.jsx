import React, { Component } from "react";
import axios from "axios";
import alanBtn from "@alan-ai/alan-sdk-web";

class MetroDashboard extends Component {
  state = {
    intial: "",
    final: "",
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  startDestination = () => {
    axios({
      url: `https://delhimetroapi.herokuapp.com/metroapi/from=${this.state.intial}&to=${this.state.final}`,
    }).then((data) => console.log(data.data));
  };

  componentDidMount = () => {
    this.alanBtnInstance = alanBtn({
      key:
        "f5d9afc01da393426fbe7c7f001e52272e956eca572e1d8b807a3e2338fdd0dc/stage",
    });
  };

  render() {
    return (
      <>
        <div className="container m-1">
          <h1>Delhi Metro Direction</h1>
          <div className="card m-1">
            <h4>
              Either type the metro station name or use the Voice button to
              reach the destination
            </h4>
            <div className="m-1">
              <div>
                <input
                  onChange={this.handleChange}
                  name="intial"
                  value={this.state.intial}
                  type="text"
                  className="text-field"
                  placeholder="Starting Metro Station"
                />
              </div>
              <div className="m-1">
                <input
                  onChange={this.handleChange}
                  value={this.state.final}
                  name="final"
                  type="text"
                  className="text-field"
                  placeholder="Ending Metro Station"
                />
              </div>
              <div>
                <button onClick={this.startDestination}>
                  Search for Destination
                </button>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </>
    );
  }
}

export default MetroDashboard;
