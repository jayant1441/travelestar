import React, { Component } from "react";
import axios from "axios";
import alanBtn from "@alan-ai/alan-sdk-web";
import Helper from "./Helper";

class MetroDashboard extends Component {
  state = {
    initial: "",
    final: "",
    isLoaded: false,
    result: {},
    loader: false,
    helpVisibility: false,
  };

  alanBtnInstance = null;

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
      const response = data.data;
      console.log(data.data);
      this.alanBtnInstance.playText(
        `You will start from ${this.state.initial} station to ${
          this.state.final
        } and it will take a total of ${parseInt(
          response.time
        )} minutes. You have ${
          response.interchange.length
        } interchange from ${response.interchange.toString()}. There are a total of ${
          response.path.length
        } stations in between as listed.`
      );
      this.setState({ result: response, isLoaded: true, loader: false });
    });
  };

  componentDidMount = () => {
    this.alanBtnInstance = alanBtn({
      key:
        "<ALAN_KEY>",
      onCommand: (commandData) => {
        console.log(commandData);
        if (commandData.command === "searchIt") {
          this.startDestination();
        } else if (commandData.command === "initial") {
          this.setState({ initial: commandData.data });
          this.alanBtnInstance.playText(
            "Please tell the final Metro station to continue"
          );
        } else if (commandData.command === "final") {
          this.setState({ final: commandData.data });
        } else if (commandData.command === "both") {
          this.setState({
            final: commandData.final,
            initial: commandData.initial,
          });
        }
      },
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
        {this.state.helpVisibility ? (
          <Helper
            closeHelper={() => this.setState({ helpVisibility: false })}
          />
        ) : null}
        <div className="container m-1">
          <h1>Delhi Metro Direction</h1>
          <div className="card m-1" id="card">
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
          <div
            className="m-1 helper-cursor"
            onClick={() => {
              this.setState({ helpVisibility: true });
            }}
          >
            Need Help?
          </div>
        </div>
      </>
    );
  }
}

export default MetroDashboard;
