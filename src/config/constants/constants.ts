const { JWT_SECRET_TOKEN } = process.env;
export const jwtConstants = {
  secret: JWT_SECRET_TOKEN || 'secret',
  expiresIn: '30d'
}
