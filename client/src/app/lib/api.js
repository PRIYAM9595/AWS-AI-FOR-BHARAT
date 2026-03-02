export const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
const API_FALLBACK_BASES = [
  API_BASE_URL,
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];
const UNIQUE_API_BASES = [...new Set(API_FALLBACK_BASES.map((u) => u.replace(/\/$/, "")))];

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const postJson = async (path, payload) => {
  const maxAttempts = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    for (const baseUrl of UNIQUE_API_BASES) {
      try {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        const requestUrl = `${baseUrl}${normalizedPath}`;
        const response = await fetch(requestUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (response.ok) {
          return data;
        }

        const canTryAnotherBase = response.status === 404 || response.status === 502 || response.status === 503;
        if (canTryAnotherBase) {
          lastError = new Error(`Request failed with status ${response.status} at ${baseUrl}`);
          continue;
        }

        const message = data?.error || data?.detail || `Request failed with status ${response.status}`;
        throw new Error(message);
      } catch (error) {
        lastError = error;
        continue;
      }
    }

    if (attempt < maxAttempts) {
      await sleep(300 * attempt);
    }
  }

  throw lastError || new Error("Request failed");
};
