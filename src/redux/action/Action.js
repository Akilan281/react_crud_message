
export const CONTACT_LIST = "contact_list"
export const SET_USER = "set_user"

export function contactData(data) {
    return {
        type: CONTACT_LIST,
        payload: data
    }

}
export function setUser(data) {
    return {
        type: SET_USER,
        payload: data
    }

}