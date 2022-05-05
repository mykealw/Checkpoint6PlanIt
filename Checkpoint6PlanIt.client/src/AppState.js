import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  tasks: [],
  updateTask: {},
  sprints: [],
  activeSprint: [],
  projects: [],
  user: {},
  weight: 0,
  account: {},
  activeProject: [],
})
