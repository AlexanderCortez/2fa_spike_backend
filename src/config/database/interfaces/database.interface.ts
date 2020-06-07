export type IDatabase = {
  type: any | string,
  host: string,
  port?: any,
  username: string,
  password?: string,
  database: string,
  entities: Array<string>,
  migrations?: Array<string>,
  cli?: {
    migrationsDir: string
  }
} & {
  [key: string]: any
}