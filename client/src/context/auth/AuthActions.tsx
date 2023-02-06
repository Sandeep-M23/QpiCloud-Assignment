export type AuthorizeUserAction = {
  type: "AUTHORIZE_USER";
  payload: any;
};

export type AuthStartAction = {
  type: "AUTH_START";
};

export type AuthSuccessAction = {
  type: "AUTH_SUCCESS";
  payload: any;
};

export type AuthErrorAction = {
  type: "AUTH_ERROR";
  payload: any;
};

export type LogoutAction = {
  type: "LOGOUT";
};

export type Action =
  | AuthorizeUserAction
  | AuthStartAction
  | AuthSuccessAction
  | AuthErrorAction
  | LogoutAction;

export const AuthorizeUser = (user: any): AuthorizeUserAction => ({
  type: "AUTHORIZE_USER",
  payload: user,
});

export const AuthStart = (): AuthStartAction => ({
  type: "AUTH_START",
});
export const AuthSuccess = (user: any): AuthSuccessAction => ({
  type: "AUTH_SUCCESS",
  payload: user,
});
export const AuthError = (err: any): AuthErrorAction => ({
  type: "AUTH_ERROR",
  payload: err,
});

export const Logout = (): LogoutAction => ({
  type: "LOGOUT",
});
