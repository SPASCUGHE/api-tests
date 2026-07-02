import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), 'src', 'env', `${process.env.ENV || 'dev'}.env`) });

const DEFAULT_API_BASEURL = 'https://jsonplaceholder.typicode.com';

export const API_BASEURL = process.env.API_BASEURL || DEFAULT_API_BASEURL;
