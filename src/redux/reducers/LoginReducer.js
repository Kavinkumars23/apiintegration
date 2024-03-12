import { Login } from "../constants";

let initialvalue = {
    LoginModel: [],
};

export const LoginReducer = (value = initialvalue, action) => {
    console.log("reducer");
    switch (action?.type) {
        case Login.REQUEST:
            return { LoginModel: action?.payload };
        case Login.SUCCESS:
            console.log(action.payload);
            return { LoginModel: action?.payload };
        case Login.ERROR:
            return { LoginModel: action?.payload };
        default:
            return value;
    }
};
