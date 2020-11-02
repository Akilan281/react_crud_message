
import { CONTACT_LIST, SET_USER } from "../action/Action"

const initialstate = {
    contactlist: [],
    user: {},
}


const ContactReducer = (state = initialstate, action) => {
    console.log("stateaction", action)
    switch (action.type) {
        case CONTACT_LIST:
            return Object.assign([], state, { contactlist: action.payload })
        case SET_USER:
            return Object.assign({}, state, { user: action.payload })
        default:
            return state
    }
}

export default ContactReducer;