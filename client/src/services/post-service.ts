import { API_URL } from "../constants";

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error(response.statusText || "Something went wrong");
  }

  return response.json();
};

export const detePostById = async (id: string | number) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(response.statusText || "Something went wrong");
  }

  if (response.status === 204) return null;

  return response.json();
};
export const getPostById = async (id: string | number) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText || "Something went wrong");
  }
  return response.json();
};

export const createPost = async (postData: { title: string; body: string }) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error(response.statusText || "Something went wrong");
  }
  return response.json();
};
export const editPost = async (
  id: string | number,
  postData: { title?: string; body?: string }
) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error(response.statusText || "Something went wrong");
  }
  return response.json();
};
