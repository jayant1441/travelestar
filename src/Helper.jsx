import React, { Component } from "react";

class Helper extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="helper-overlay" onClick={this.props.closeHelper}></div>
        <div className="helper-container">
          <div className="card helper-container-inner">
            <h1>Help Desk</h1>
            <br />
            <h3>How to Start?</h3>
            <p>
              You can tell the the initial station name and the final station
              name to the Alan AI Instance. Then just say, <b>Search</b>, It
              will start the searching for the route and tell the details about
              the whole route including the timings, in-between stations, and
              the lines to be exchanged from.
            </p>
            <br />
            <h3>Examples: </h3>
            <p>
              You can start with saying - "
              <b>Initial Metro station is &lt;station_name&gt;</b>". (It will
              add the station name in the given text box. You can change the
              name, if wrong)
            </p>
            <p>
              And then, You can say - "
              <b>My destination is &lt;station_name&gt;</b>". (It will again add
              the final station in the respective text box.)
            </p>
            <p>
              Finally Say - "<b>Searching</b>". (It will initiate the search and
              gives the result)
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Helper;
