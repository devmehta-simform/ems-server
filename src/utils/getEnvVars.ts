import dotenv from 'dotenv';

dotenv.config();

export function getEnvVars(varName: string): string | null {
  if (process.env[varName]) {
    return process.env[varName];
  }
  return null;
}
