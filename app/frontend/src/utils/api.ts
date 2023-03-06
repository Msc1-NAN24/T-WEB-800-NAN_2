import {getEnv} from "@/utils/env";
import {Result} from "@/utils/type";

export const buildApiUrl = (suffix: string) => {
  return new URL(suffix, getEnv('API_URL')).href
};

export class API {

  public static post<T, Z>(endpoint: string, body: unknown, options: RequestInit, callback: (result: Result<T, Z>) => void) {
    fetch(buildApiUrl(endpoint), {...options, method: 'POST', body: JSON.stringify(body)}).then(async (res) => {
      if (res.ok) {
        callback({ok: {body: await res.json(), status: res.status}});
      } else {
        callback({error: {body: await res.json(), status: res.status}});
      }
    }).catch((err) => {
      callback({ok: undefined, error: {body: err, status: 0}})
    })
  }

  public static patch() {

  }

  public static put() {

  }

  public static get(): string {
    return 'abc';
  }

  public static delete() {

  }

}