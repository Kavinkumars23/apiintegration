import { Login } from "../constants";

let initialvalue = {
    LoginModel: [],
};

export const LoginReducer = (value = initialvalue, action) => {
    switch (action?.type) {
        case Login.REQUEST:
            return { LoginModel: action?.payload };
        case Login.SUCCESS:
            return { LoginModel: action?.payload };
        case Login.ERROR:
            return { LoginModel: action?.payload };
        default:
            return value;
    }
};
