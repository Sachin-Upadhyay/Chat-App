const initialState = {
    counter: "Login",
    Auth: 0,
    UserData:[],
    Login:"Login"
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'changeAuthToLogedIn':
            return { Auth: 1 }
    }
    return state;
}