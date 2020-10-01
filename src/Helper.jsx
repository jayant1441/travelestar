import React, { Component } from "react";

class Helper extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="helper-overlay" onClick={this.props.closeHelper}></div>
        <div className="helper-container">
          <div className="card helper-container-inner">
            <h1>
              Help Desk
              <div
                style={{ float: "right", cursor: "pointer" }}
                onClick={this.props.closeHelper}
              >
                &times;
              </div>
            </h1>
            <br />
            <div className="how-to-start">
              <h3>How to Start?</h3>
              <p>
                You can tell the the initial station name and the final station
                name to the Alan AI Instance. Then just say, <b>Search</b>, It
                will start the searching for the route and tell the details
                about the whole route including the timings, in-between
                stations, and the lines to be exchanged from.
              </p>
              <br />
              <h3>Examples: </h3>
              <p>
                1. You can start with saying - "
                <b>Initial Metro station is &lt;station_name&gt;</b>". (It will
                add the station name in the given text box. You can change the
                name, if wrong)
              </p>
              <p>
                And then, You can say - "
                <b>My destination is &lt;station_name&gt;</b>". (It will again
                add the final station in the respective text box.)
              </p>
              <p>
                Finally Say - "<b>Search</b>". (It will initiate the search and
                gives the result)
              </p>
              <br />
              <p>
                2. You can also say both the initial and the final station in
                one go and it will fill it in the respective boxes.
              </p>
              <p>
                It can go as - "
                <b>
                  I want to go from &lt;start_station_name&gt; to
                  &lt;end_station_name&gt;
                </b>
                "
              </p>
              <p>
                Then, just say - "<b>Search</b>". (and it will give the results)
              </p>
              <br />

              <h4>Link to my React Repo:</h4>
              <a href="https://github.com/jayant1441/Travelester">
                https://github.com/jayant1441/Travelester
              </a>
              <h4>Link to my Django API Repo:</h4>
              <a href="https://github.com/raghavdhingra/Delhi-Metro-Map-API">
                https://github.com/raghavdhingra/Delhi-Metro-Map-API
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Helper;
