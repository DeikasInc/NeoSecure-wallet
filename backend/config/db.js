import {neon} from '@neondatabase/serverless';
import "dotenv/config";



//Creates a SQL connection using the Neon serverless database
export const sql = neon(process.env.DATABASE_URL) 