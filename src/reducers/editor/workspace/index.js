const defaultState = {

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TILESET':
      return state
    default:
      return state;
  }
}
