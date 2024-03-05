import React, { Component } from "react";
import SectionForm from "./sectionForm";

class Section extends Component {
  state = {};

  renderStartPause(sec, task) {
    return !task.isRunning ? (
      <button
        type="button"
        class="btn btn-success btn-sm"
        onClick={() => this.props.onStart(sec.id, task.id)}
      >
        Start
      </button>
    ) : (
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        onClick={() => this.props.onPause(sec.id, task.id)}
      >
        Pause
      </button>
    );
  }

  formatTime(task) {
    const { time } = task;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  }

  // componentWillUnmount() {
  //   // Cleanup any running intervals if the component is unmounted
  //   this.state.stopwatches.forEach((stopwatch) => {
  //     if (stopwatch.isRunning) {
  //       clearInterval(stopwatch.timer);
  //     }
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        {this.props.sections.map((sec) => (
          <div className="col-md-4 col-12 mt-2">
            <div className="card">
              <div className="card-body">
                <h5 class="card-title">{sec.sectionName}</h5>
                <SectionForm onSubmitt={this.props.onTaskSubmit} sid={sec.id} />
                <ul class="list-group list-group-flush">
                  {sec.tasks.map((task) => (
                    <li
                      className="list-group-item d-flex justify-content-between"
                      key={task.id}
                    >
                      {task.name}
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        {this.renderStartPause(sec, task)}
                        {/* <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          onClick={() =>
                            this.resetTaskStopwatch(sec.id, task.id)
                          }
                        >
                          Reset
                        </button> */}
                      </div>
                      <br />
                      Time:{this.formatTime(task)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Section;
