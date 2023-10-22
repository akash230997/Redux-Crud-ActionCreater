import { MAKE_REQ, OPEN_POPUP, PROJECTS_MAKE_REQ, PROJECTS_OPEN_POPUP, PROJECTS_REQ_ADD_SUCC, PROJECTS_REQ_DELETE_SUCC, PROJECTS_REQ_GETALL_FAIL, PROJECTS_REQ_GETALL_SUCC, PROJECTS_REQ_GETBYCODE_SUCC, PROJECTS_REQ_UPDATE_SUCC, REQ_ADD_SUCC, REQ_DELETE_SUCC, REQ_GETALL_FAIL, REQ_GETALL_SUCC, REQ_GETBYCODE_SUCC, REQ_UPDATE_SUCC } from "./ActionType"

export const makeRequest = () => {
    return {
        type: MAKE_REQ
    }
}

export const getAllRequestSuccess = (data) => {
    return {
        type: REQ_GETALL_SUCC,
        payload: data
    }
}

export const getAllRequestFail = (err) => {
    return {
        type: REQ_GETALL_FAIL,
        payload: err
    }
}

export const OpenPopup = () => {
    return {
        type: OPEN_POPUP
    }
}

export const AddRequest = (data) => {
    return {
        type: REQ_ADD_SUCC,
        payload: data
    }
}

export const UpdateRequest = (data) => {
    return {
        type: REQ_UPDATE_SUCC,
        payload: data
    }
}

export const RemoveRequest = (code) => {
    return {
        type: REQ_DELETE_SUCC,
        payload: code
    }
}

export const getbycodeSuccess = (data) => {
    return {
        type: REQ_GETBYCODE_SUCC,
        payload: data
    }
}

// PROJETCS : Projetcs_
export const Projetcs_makeRequest = () => {
    return {
        type: PROJECTS_MAKE_REQ
    }
}

export const Projetcs_getAllRequestSuccess = (data) => {
    return {
        type: PROJECTS_REQ_GETALL_SUCC,
        payload: data
    }
}

export const Projetcs_getAllRequestFail = (err) => {
    return {
        type: PROJECTS_REQ_GETALL_FAIL,
        payload: err
    }
}

export const Projetcs_OpenPopup = () => {
    return {
        type: PROJECTS_OPEN_POPUP
    }
}

export const Projetcs_AddRequest = (data) => {
    return {
        type: PROJECTS_REQ_ADD_SUCC,
        payload: data
    }
}

export const Projetcs_UpdateRequest = (data) => {
    return {
        type: PROJECTS_REQ_UPDATE_SUCC,
        payload: data
    }
}

export const Projetcs_RemoveRequest = (code) => {
    return {
        type: PROJECTS_REQ_DELETE_SUCC,
        payload: code
    }
}

export const Projetcs_getbycodeSuccess = (data) => {
    return {
        type: PROJECTS_REQ_GETBYCODE_SUCC,
        payload: data
    }
}