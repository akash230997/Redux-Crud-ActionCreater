import { MAKE_REQ, OPEN_POPUP, PROJECTS_MAKE_REQ, PROJECTS_OPEN_POPUP, PROJECTS_REQ_ADD_SUCC, PROJECTS_REQ_DELETE_SUCC, PROJECTS_REQ_GETALL_FAIL, PROJECTS_REQ_GETALL_SUCC, PROJECTS_REQ_GETBYCODE_SUCC, PROJECTS_REQ_UPDATE_SUCC, REQ_ADD_SUCC, REQ_DELETE_SUCC, REQ_GETALL_FAIL, REQ_GETALL_SUCC, REQ_GETBYCODE_SUCC, REQ_UPDATE_SUCC } from "./ActionType"

export const initialstate = {
    isloading: false,
    companylist: [],
    companyobj: {},
    errormessage: ''
}

export const CompanyReducer = (state = initialstate, action) => {
    switch (action.type) {
        case MAKE_REQ:
            return {
                ...state,
                isloading: true
            }
        case REQ_GETALL_SUCC:
            return {
                ...state,
                isloading: false,
                companylist: action.payload
            }
        case REQ_GETBYCODE_SUCC:
            return {
                ...state,
                companyobj: action.payload
            }
        case REQ_GETALL_FAIL:
            return {
                ...state,
                isloading: false,
                companylist: [],
                errormessage: action.payload
            }
        case OPEN_POPUP:
            return {
                ...state,
                companyobj: {}
            }
        case REQ_ADD_SUCC:
            const _inputdata = { ...action.payload };
            const _maxid = Math.max(...state.companylist.map(o => o.id));
            _inputdata.id = _maxid + 1;
            return {
                ...state,
                companylist: [...state.companylist, _inputdata]
            }
        case REQ_UPDATE_SUCC:
            const _data = { ...action.payload };
            const _finaldata = state.companylist.map(item => {
                return item.id === _data.id ? _data : item
            });
            return {
                ...state,
                companylist: _finaldata
            }
        case REQ_DELETE_SUCC:
            const _filterdata = state.companylist.filter((data) => {
                return data.id !== action.payload
            })
            return {
                ...state,
                companylist: _filterdata
            }
        default: return state;
    }
}

export const ProjectReducer = (state = initialstate, action) => {
    switch (action.type) {
        case PROJECTS_MAKE_REQ:
            return {
                ...state,
                isloading: true
            }
        case PROJECTS_REQ_GETALL_SUCC:
            return {
                ...state,
                isloading: false,
                companylist: action.payload
            }
        case PROJECTS_REQ_GETBYCODE_SUCC:
            return {
                ...state,
                companyobj: action.payload
            }
        case PROJECTS_REQ_GETALL_FAIL:
            return {
                ...state,
                isloading: false,
                companylist: [],
                errormessage: action.payload
            }
        case PROJECTS_OPEN_POPUP:
            return {
                ...state,
                companyobj: {}
            }
        case PROJECTS_REQ_ADD_SUCC:
            const _inputdata = { ...action.payload };
            const _maxid = Math.max(...state.companylist.map(o => o.id));
            _inputdata.id = _maxid + 1;
            return {
                ...state,
                companylist: [...state.companylist, _inputdata]
            }
        case PROJECTS_REQ_UPDATE_SUCC:
            const _data = { ...action.payload };
            const _finaldata = state.companylist.map(item => {
                return item.id === _data.id ? _data : item
            });
            return {
                ...state,
                companylist: _finaldata
            }
        case PROJECTS_REQ_DELETE_SUCC:
            const _filterdata = state.companylist.filter((data) => {
                return data.id !== action.payload
            })
            return {
                ...state,
                companylist: _filterdata
            }
        default: return state;
    }
}