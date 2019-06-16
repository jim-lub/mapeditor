const defaultState = {

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'PROJECT':
      return state
    default:
      return state;
  }
}
