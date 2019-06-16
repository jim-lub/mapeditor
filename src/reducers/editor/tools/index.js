const defaultState = {

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TOOLS':
      return state
    default:
      return state;
  }
}
