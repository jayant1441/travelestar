import React, { Component } from "react";
import axios from "axios";
import alanBtn from "@alan-ai/alan-sdk-web";

class MetroDashboard extends Component {
  state = {
    initial: "",
    final: "",
    isLoaded: false,
    result: {},
    loader: false,
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  startDestination = () => {
    this.setState({ loader: true });
    axios({
      url: `https://delhimetroapi.herokuapp.com/metroapi/from=${this.state.initial}&to=${this.state.final}`,
    }).then((data) => {
      this.setState({ result: data.data, isLoaded: true, loader: false });
    });
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
        {this.state.loader ? (
          <div className="loader-overlay">
            <div className="showbox">
              <svg className="loader-inner-svg">
                <circle
                  cx="35px"
                  cy="35px"
                  r="25px"
                  fill="rgba(0,0,0,0)"
                  strokeWidth="5px"
                  stroke="#eee"
                />
                <circle
                  cx="35px"
                  cy="35px"
                  r="25px"
                  fill="rgba(0,0,0,0)"
                  strokeWidth="5px"
                  className="loader-circle"
                />
              </svg>
            </div>
          </div>
        ) : null}
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
                  name="initial"
                  value={this.state.initial}
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
          {this.state.isLoaded ? (
            <div className="card m-1">
              <div className="m-1">
                <h2>Interchanges: </h2>
                <div>
                  {this.state.result.interchange.map((data, index) => (
                    <p key={`interchange-${index}`}>{data}</p>
                  ))}
                </div>
              </div>
              <div className="m-1">
                <h2>Lines to exchange:</h2>
                <div>{this.state.result.line1[0]}</div>
                <div>{this.state.result.line2[0]}</div>
                <div>
                  End Lines:{" "}
                  {this.state.result.lineEnds.map((data, index) => (
                    <span key={`station-${index}`}>{data}, </span>
                  ))}
                </div>
              </div>
              <div className="m-1">
                <h4>Total Time: {this.state.result.time} minutes</h4>
              </div>
              <div className="m-1">
                <h4>Stations in between:</h4>
                <div>
                  {this.state.result.path.map((data, index) => (
                    <div key={`in-station-${index}`}>{data}</div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default MetroDashboard;
