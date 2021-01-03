import { Pool, PoolConfig, QueryConfig } from 'pg';

let poolConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT),
};

let pool: Pool;
if (process.env.NODE_ENV !== 'production') {
  if (!globalThis.pool) {
    globalThis.pool = new Pool(poolConfig);
  }
  pool = globalThis.pool;
} else {
  pool = new Pool(poolConfig);
}

export default {
  query: (text: string | QueryConfig<any>, params?: any) =>
    pool.query(text, params),
};
