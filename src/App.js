import React, { Component } from "react";
import Section from "./components/task";
import NavBar from "./components/navbar";
import SectionForm from "./components/sectionForm";
import {
  handleTaskSubmit,
  getSections,
  handeleSubmit,
} from "./services/fakeModuleService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: getSections(),
    };
  }

  getModuleID() {
    const { sections } = this.state;
    if (sections.length === 0) {
      return 1;
    }
    sections.sort((a, b) => b.id - a.id);
    return sections[0].id + 1;
  }

  getNewTaskId(section) {
    const { tasks } = section;
    if (tasks.length === 0) {
      return 1;
    }
    tasks.sort((a, b) => b.id - a.id);
    return tasks[0].id + 1;
  }

  handeleSubmit = (e) => {
    handeleSubmit(e);
    this.setState({ sections: getSections() });
  };

  handleTaskSubmit = (e, s_id) => {
    handleTaskSubmit(e, s_id);
    this.setState({ sections: getSections() });
  };

  handleStart = (sectionId, taskId) => {
    this.setState((prevState) => ({
      sections: prevState.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) => {
              if (task.id === taskId && !task.isRunning) {
                const startTime = task.startTime || Date.now(); // Use existing startTime if available, otherwise use current time
                const timer = setInterval(() => {
                  const elapsedTime = Math.floor(
                    (Date.now() - startTime + task.time) / 1000
                  ); // Calculate elapsed time in seconds, considering already elapsed time
                  this.setState((prevState) => ({
                    sections: prevState.sections.map((sec) => {
                      if (sec.id === sectionId) {
                        return {
                          ...sec,
                          tasks: sec.tasks.map((t) => {
                            if (t.id === taskId && t.isRunning) {
                              return {
                                ...t,
                                time: elapsedTime,
                                startTime: startTime, // Store the startTime
                              };
                            }
                            return t;
                          }),
                        };
                      }
                      return sec;
                    }),
                  }));
                }, 1000);
                return {
                  ...task,
                  isRunning: true,
                  timer: timer,
                  startTime: startTime, // Set the startTime
                };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    }));
  };

  handlePause = (sectionId, taskId) => {
    this.setState((prevState) => ({
      sections: prevState.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) => {
              if (task.id === taskId && task.isRunning) {
                clearInterval(task.timer);
                return {
                  ...task,
                  isRunning: false,
                };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    }));
  };

  resetTaskStopwatch = (sectionId, taskId) => {
    this.setState((prevState) => ({
      sections: prevState.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) => {
              if (task.id === taskId) {
                clearInterval(task.timer); // Clear the timer
                return {
                  ...task,
                  time: 0,
                  isRunning: false,
                };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    }));
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            <SectionForm onSubmitt={this.handeleSubmit} text="" sid="null" />
          </div>
          <div className="row mt-2">
            <Section
              sections={this.state.sections}
              onStart={this.handleStart}
              onPause={this.handlePause}
              onTaskSubmit={this.handleTaskSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
