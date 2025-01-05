import { API_URL } from "../constants";

export const onSignUp = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users/tokens/sign_up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Something went wrong");
  }
  return response.json();
};

export const onSignIn = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users/tokens/sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Something went wrong");
  }
  return response.json();
};

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) return null;

  const response = await fetch(`${API_URL}/users/tokens/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Something went wrong");
  }

  return response.json();
};

export const getUserInfo = async () => {
  const token = localStorage.getItem("token");
  const expires_at = localStorage.getItem("expires_at");
  if (!expires_at) return null;
  const expiresAt = Date.parse(expires_at);
  const currentTime = Date.now();

  if (expiresAt >= currentTime) {
    const res = await getRefreshToken();
    localStorage.setItem("resource_owner", JSON.stringify(res.resource_owner));
    localStorage.setItem("refresh_token", res.refresh_token);
    localStorage.setItem("token", res.token);
    const expiresIn = res.expires_in;
    const expirationDate = new Date(Date.now() + expiresIn * 1000);
    localStorage.setItem("expires_at", expirationDate.toISOString());
  }

  if (!token) return null;
  const response = await fetch(`${API_URL}/users/tokens/info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Something went wrong");
  }

  return response.json();
};

export const signOut = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const response = await fetch(`${API_URL}/users/tokens/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Something went wrong");
  }
  removeUserStorage();
};

export const setUserStorage = (res: any) => {
  localStorage.setItem("resource_owner", JSON.stringify(res.resource_owner));
  localStorage.setItem("refresh_token", res.refresh_token);
  localStorage.setItem("token", res.token);
  const expiresIn = res.expires_in;
  const expirationDate = new Date(Date.now() + expiresIn * 1000);
  localStorage.setItem("expires_at", expirationDate.toISOString());
};
export const removeUserStorage = () => {
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("resource_owner");
  localStorage.removeItem("token");
  localStorage.removeItem("expires_at");
};
