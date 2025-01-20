import { getUserCache } from "../routes/_island/_user/UserPreferences";
import { apiServer } from "./config";
import Cookies from 'js-cookie'


export async function readStreamBody(stream: ReadableStream<Uint8Array>): Promise<string> {
    const reader = stream.getReader();
    let result = "";
    let decoder = new TextDecoder();
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
  
    return result;
  }


export function authenticatedRequest(endpoint: string, setMethod: string, 
  setBody?: BodyInit, setHeaders?: Headers): Promise<Response> | string{
  const csrfToken = Cookies.get("csrf_token")
  if (csrfToken === undefined){
    // remove user cache if it's present cause its no longer valid
    getUserCache().delete()
    return "Not authorized."
  }
  if (setHeaders === undefined){
    setHeaders = new Headers()
  }
  setHeaders.append("X-CSRF-Token", csrfToken)
  let req: RequestInit = {
    mode: "cors", // This forces the fetch request to include the ORIGIN header which is necessary for CORS
    method: setMethod,
    body: setBody,
    headers: setHeaders,
    credentials: "include" //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
  }
  return fetch(apiServer + endpoint, req)
}

export function nonAuthenticatedRequest(endpoint: string){
  let req: RequestInit = {
    method: "GET",
  }
  return fetch(apiServer + endpoint, req)
}

