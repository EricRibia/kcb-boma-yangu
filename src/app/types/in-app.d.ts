export interface EnvironmentT {
  production: boolean;
  apiBaseUrl: string;
  basicAuthUsername: string;
  basicAuthPassword: string;
}

export interface SidebarOptionsT {
  title: string;
  hasSub: boolean;
  route: string;
  icon: string;
  subMenus: {
    title: string;
    icon: string;
    route: string;
  }[];
}

//api params
export interface LoginArgsT {
  username: string;
  password: string;
}

//api responses
export interface LongResponseT {
  statusCode: string;
  token: string;
  message: string;
  payload: {
    usrId: number;
    usrFirstname: string;
    usrLastname: string;
    usrUsername: string;
    usrStatus: string;
    usrCdate: string;
    usrMdate: string;
    usrSessionExpiry: string;
    usrInputter: any;
    usrAuthoriser: any;
    byUserRolesList: any[];
  };
}

export interface ListUsersApiT {
  message: string;
  payload: {
    content: {
      usrId: number;
      usrFirstname: string;
      usrLastname: string;
      usrUsername: string;
      usrStatus: string;
      usrCdate: string;
      usrMdate: string;
      usrSessionExpiry: string;
      usrInputter: null;
      usrAuthoriser: null;
      byUserRolesList: [];
    }[];
  };
  statusCode: string;
}

export interface DecodedTokenDataT {
  iss: string;
  sub: string;
  username: string;
  iat: number;
  jti: string;
  nbf: number;
}
