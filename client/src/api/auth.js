import { request } from "./http";

export function login(data) {
  return request({
    url: "/api/auth/login",
    method: "POST",
    data
  });
}
