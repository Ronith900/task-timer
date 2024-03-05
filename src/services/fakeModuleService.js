const SECTION_KEY = "sections";

// Initialize modules from localStorage or set it to an empty array if not found
let sections = JSON.parse(localStorage.getItem(SECTION_KEY)) || [];

// Function to update localStorage with the current modules data
const updateLocalStorage = () => {
  localStorage.setItem(SECTION_KEY, JSON.stringify(sections));
};

export function getSections() {
  return sections;
}

export function handleTaskSubmit(e, s_id) {
  const secIndex = sections.findIndex((s) => s.id === s_id);
  console.log(sections, secIndex);
  const section = sections[secIndex];
  section.tasks.push({
    id: getNewTaskId(section),
    name: e,
    time: 0,
    isRunning: false,
    timer: null,
  });
  updateLocalStorage();
}

function getModuleID() {
  if (sections.length === 0) {
    return 1;
  }
  sections.sort((a, b) => b.id - a.id);
  return sections[0].id + 1;
}

function getNewTaskId(section) {
  const { tasks } = section;
  if (tasks.length === 0) {
    return 1;
  }
  tasks.sort((a, b) => b.id - a.id);
  return tasks[0].id + 1;
}

export function handeleSubmit(e) {
  const newModuleID = getModuleID();
  sections.push({ sectionName: e, id: newModuleID, tasks: [] });
  updateLocalStorage();
}
