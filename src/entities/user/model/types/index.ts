export type TokenType = {
  access?: string;
  refresh?: string;
};

export type UserAccessSchema = {
  token: TokenType;
};
