import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        database: 'no_pain_no_gain_gym',
        password: 'henry2020',
        connectionLimit: 10
    });
    return connection;
}