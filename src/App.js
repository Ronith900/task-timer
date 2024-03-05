import React, { Component } from "react";
import Section from "./components/task";
import NavBar from "./components/navbar";
import SectionForm from "./components/sectionForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        {
          sectionName: "GVX",
          id: 1,
          tasks: [
            { name: "T1", id: 11, time: 0, isRunning: false, timer: null },
            { name: "T1", id: 12, time: 0, isRunning: false, timer: null },
          ],
        },
        {
          sectionName: "GMP",
          id: 2,
          tasks: [
            { name: "T1", id: 21, time: 0, isRunning: false, timer: null },
            { name: "T1", id: 2, time: 0, isRunning: false, timer: null },
          ],
        },
      ],
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
    const newModuleID = this.getModuleID();
    const { sections } = this.state;
    sections.push({ sectionName: e, id: newModuleID, tasks: [] });
    this.setState({ sections });
  };

  handleTaskSubmit = (e, s_id) => {
    const { sections } = this.state;
    const secIndex = sections.findIndex((s) => s.id === s_id);
    console.log(sections, secIndex);
    const section = sections[secIndex];
    section.tasks.push({
      id: this.getNewTaskId(section),
      name: e,
      time: 0,
      isRunning: false,
      timer: null,
    });
    this.setState({ sections });
  };

  handleStart = (sectionId, taskId) => {
    this.setState((prevState) => ({
      sections: prevState.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) => {
              if (task.id === taskId && !task.isRunning) {
                const startTime = Date.now(); // Record the start time
                const timer = setInterval(() => {
                  const elapsedTime = Math.floor(
                    (Date.now() - startTime) / 1000
                  ); // Calculate elapsed time in seconds
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
