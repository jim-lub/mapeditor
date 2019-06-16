const defaultState = {

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SCENE':
      return state
    default:
      return state;
  }
}
