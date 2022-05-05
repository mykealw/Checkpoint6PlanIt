import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  account: {},
  activeSprint: [],
  activeProject: [],
  activeAccount: {},
  projects: [],
  sprints: [],
  tasks: [],
  updateTask: {},
  user: {},
  weight: 0,
})
