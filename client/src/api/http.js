import { API_BASE_URL } from "../utils/constants";

function getAuthHeader() {
  try {
    const user = uni.getStorageSync("teamwork-user");
    if (user?.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
  } catch {
    // Ignore storage failures in demo mode.
  }

  return {};
}

export function request(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API_BASE_URL}${options.url}`,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
        ...(options.header || {})
      },
      success: (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data);
          return;
        }

        reject(response.data || { message: "Request failed" });
      },
      fail: reject
    });
  });
}
