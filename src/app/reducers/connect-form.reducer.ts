const actions = {
  UPDATE_FORM: "UPDATE_FORM",
};

const initialState = {
  newStory : {
    firstName: "",
    lastName : ""
  },
  contactUs: {
    email  : "",
    isTunisian: ""
  }
};

export function forms (state = initialState, action) {
  if (action.type === actions.UPDATE_FORM) {
    // newStory:           formValue
    return { ...state, [action.payload.path]: action.payload.value };
  }

  return state;
}

export { actions };
