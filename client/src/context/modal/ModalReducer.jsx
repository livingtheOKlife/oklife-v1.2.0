const modalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODAL_ACTIVE':
      return action.payload
    case 'SET_MODAL_INACTIVE':
      return null
    default:
      return state
  }
}

export default modalReducer