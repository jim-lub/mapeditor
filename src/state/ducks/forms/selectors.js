export const getPendingStatus = (state, { id }) => {
  if (!state.forms.data.hasOwnProperty(id)) return false;

  return state.forms.data[id].pending;
};

export const getFormData = (state, { id }) => state.forms.data.hasOwnProperty(id) ? state.forms.data[id].data : null;
