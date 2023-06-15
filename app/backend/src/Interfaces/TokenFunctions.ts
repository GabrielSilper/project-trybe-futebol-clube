export default interface TokenFunctions<T> {
  createToken(data: Partial<T>): string;
  verifyToken(token: string): Partial<T>;
}
