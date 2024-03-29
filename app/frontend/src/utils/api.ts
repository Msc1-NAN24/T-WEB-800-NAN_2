import { Result } from "@/utils/type";
import * as process from "process";

export const buildApiUrl = (suffix: string, params?: URLSearchParams) => {
  return (
    new URL(suffix, process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/")
      .href + ("?" + params?.toString() ?? "")
  );
};

export class API {
  public static post<T, Z>(
    endpoint: string,
    body: unknown,
    options: RequestInit,
    callback: (result: Result<T, Z>) => void
  ) {
    fetch(buildApiUrl(endpoint), {
      ...options,
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (res.ok) {
          callback({ ok: { body: await res.json(), status: res.status } });
        } else {
          callback({ error: { body: await res.json(), status: res.status } });
        }
      })
      .catch((err) => {
        callback({ ok: undefined, error: { body: err, status: -1 } });
      });
  }

  public static patch<T, Z>(
    endpoint: string,
    body: unknown,
    options: RequestInit,
    callback: (result: Result<T, Z>) => void
  ) {
    fetch(buildApiUrl(endpoint), {
      ...options,
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token") || ""
        )}`,
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (res.ok) {
          callback({ ok: { body: await res.json(), status: res.status } });
        } else {
          callback({ error: { body: await res.json(), status: res.status } });
        }
      })
      .catch((err) => {
        callback({ ok: undefined, error: { body: err, status: -1 } });
      });
  }

  public static put<T, Z>(
    endpoint: string,
    body: unknown,
    options: RequestInit,
    callback: (result: Result<T, Z>) => void
  ) {
    fetch(buildApiUrl(endpoint), {
      ...options,
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (res.ok) {
          callback({ ok: { body: await res.json(), status: res.status } });
        } else {
          callback({ error: { body: await res.json(), status: res.status } });
        }
      })
      .catch((err) => {
        callback({ ok: undefined, error: { body: err, status: -1 } });
      });
  }

  public static async getBlob<T, Z = any>(
    endpoint: string,
    params?: URLSearchParams,
    options: RequestInit = {}
  ): Promise<Blob> {
    try {
      const res = await fetch(buildApiUrl(endpoint, params), {
        ...options,
        method: "GET",
      });
      if (res.ok) {
        return res.blob();
      }
      throw new Error("Invalid blob data !");
    } catch (err: any) {
      throw new Error("Invalid blob data !");
    }
  }

  public static async get<T, Z>(
    endpoint: string,
    params?: URLSearchParams,
    options: RequestInit = {}
  ): Promise<Result<T, Z>> {
    try {
      const res = await fetch(buildApiUrl(endpoint, params), {
        ...options,
        method: "GET",
      });
      if (res.ok) {
        return { ok: { body: await res.json(), status: res.status } };
      } else {
        return { error: { body: await res.json(), status: res.status } };
      }
    } catch (err: any) {
      return {
        error: {
          status: -1,
          body: err,
        },
      };
    }
  }

  public static delete() {}
}
