export const addTask = (state, action) => {

  return {
    ...state,
    tasks: [
      ...state.tasks,
      action.payload
    ]
  }
}

export const removeTask = (state, action) => {
  return {
    ...state,
    tasks: state.tasks.filter((val, i) => i !== 0)
  }
}
