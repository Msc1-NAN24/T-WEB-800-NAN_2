export type Env = {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_MAPBOX_TOKEN: string;
}

export const getEnv = (path: keyof Env): string => {
  const a = process.env[path];
  if (a === undefined)
    throw new Error(`Env variable '${path}' cannot be found !`);
  return a;
}

