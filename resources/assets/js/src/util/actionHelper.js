export const createAction = (value) =>{
    return ({
        PENDING: `${value}_PENDING`,
        SUCCESS: `${value}_SUCCESS`,
        ERROR: `${value}_ERROR`
    });
};