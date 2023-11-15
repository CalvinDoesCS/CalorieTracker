export default interface Token {
  accessToken: string | null;
  expiresIn: number;
  email: string;
  tokenType: string;
}
