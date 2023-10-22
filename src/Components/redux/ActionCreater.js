import axios from "axios";
import { AddRequest, RemoveRequest, UpdateRequest, getAllRequestFail, getAllRequestSuccess, getbycodeSuccess, makeRequest } from "./Action"
import { toast } from "react-toastify";

var apiData = [];

export const GetAllCompanys = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        setTimeout(() => {
            axios.get("http://localhost:8000/clients").then(res => {
                const _list = res.data;
                apiData.push(_list);
                console.log(apiData);
                dispatch(getAllRequestSuccess(_list));
            }).catch(err => {
                dispatch(getAllRequestFail(err.message));
            });
        }, 2000)

    }
}

export const GetCompanybycode = (code) => {
    return (dispatch) => {
        //dispatch(makeRequest());
        axios.get("http://localhost:8000/clients/" + code).then(res => {
            const _obj = res.data;
            dispatch(getbycodeSuccess(_obj));
        }).catch(err => {
            toast.error('Failed to fetch the data')
        });
    }
}

export const CreateCompany = (data) => {
    return (dispatch) => {
        axios.post("http://localhost:8000/clients", data).then(res => {
            dispatch(AddRequest(data));
            console.log("Created data : ", data);
            apiData[0].push(data);
            console.log(apiData);
            toast.success('Client created successfully.')
        }).catch(err => {
            toast.error('Failed to create Client due to :' + err.message)
        });
    }
}

export const UpdateCompany = (data) => {
    return (dispatch) => {
        axios.put("http://localhost:8000/clients/" + data.id, data).then(res => {
            dispatch(UpdateRequest(data));
            toast.success('Client updated successfully.')
        }).catch(err => {
            toast.error('Failed to update Client due to :' + err.message)
        });
    }
}

export const RemoveCompany = (code) => {
    return (dispatch) => {
        axios.delete("http://localhost:8000/clients/" + code).then(res => {
            dispatch(RemoveRequest(code));
            toast.success('Client Removed successfully.')
        }).catch(err => {
            toast.error('Failed to remove Client due to :' + err.message)
        });
    }
}



// PROJECTS : 
export const Projects_GetAllCompanys = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        setTimeout(() => {
            axios.get("http://localhost:8000/projects").then(res => {
                const _list = res.data;
                dispatch(getAllRequestSuccess(_list));

            }).catch(err => {
                dispatch(getAllRequestFail(err.message));
            });
        }, 2000)

    }
}

export const Projects_GetCompanybycode = (code) => {
    return (dispatch) => {
        //dispatch(makeRequest());
        axios.get("http://localhost:8000/projects/" + code).then(res => {
            const _obj = res.data;
            dispatch(getbycodeSuccess(_obj));
        }).catch(err => {
            toast.error('Failed to fetch the data')
        });
    }
}

export const Projects_CreateCompany = (data) => {
    return (dispatch) => {
        axios.post("http://localhost:8000/projects", data).then(res => {
            dispatch(AddRequest(data));
            toast.success('Client created successfully.')
        }).catch(err => {
            toast.error('Failed to create Client due to :' + err.message)
        });
    }
}

export const Projects_UpdateCompany = (data) => {
    return (dispatch) => {
        axios.put("http://localhost:8000/projects/" + data.id, data).then(res => {
            dispatch(UpdateRequest(data));
            toast.success('Client updated successfully.')
        }).catch(err => {
            toast.error('Failed to update Client due to :' + err.message)
        });
    }
}

export const Projects_RemoveCompany = (code) => {
    return (dispatch) => {
        axios.delete("http://localhost:8000/projects/" + code).then(res => {
            dispatch(RemoveRequest(code));
            toast.success('Client Removed successfully.')
        }).catch(err => {
            toast.error('Failed to remove Client due to :' + err.message)
        });
    }
}


