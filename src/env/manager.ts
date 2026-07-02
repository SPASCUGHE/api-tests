import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), 'src', 'env', `${process.env.ENV || 'dev'}.env`) });

export const API_BASEURL = process.env.API_BASEURL as string;
