interface IResponseTokenDTO {
  user: {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
  };
  token: string;
  refresh_token: string;
}

export { IResponseTokenDTO };
