interface AuthState {
  user: object | null;
  isFetching: boolean;
  error: string | null;
}

interface AuthorizeUserAction {
  type: 'AUTHORIZE_USER';
  payload: object | null;
}

interface AuthStartAction {
  type: 'AUTH_START';
}

interface AuthSuccessAction {
  type: 'AUTH_SUCCESS';
  payload: object | null;
}

interface AuthErrorAction {
  type: 'AUTH_ERROR';
  payload: string | null;
}

interface LogoutAction {
  type: 'LOGOUT';
}

type Action = AuthorizeUserAction | AuthStartAction | AuthSuccessAction | AuthErrorAction | LogoutAction;

const AuthReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "AUTHORIZE_USER":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      };
    case "AUTH_START":
      return {
        user: null,
        isFetching: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
