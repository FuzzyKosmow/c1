type TEnvironment = "mock" | "development" | "staging" | "production";

const environments = {
  mock: {
    API_BASE_URL: "http://localhost:5100/api",
  },
  development: {
    API_BASE_URL: "http://localhost:5100/api",
  },
  staging: {
    API_BASE_URL: "https://staging.example.com/api",
  },
  production: {
    API_BASE_URL: "https://example.com/api",
  },
};

export const currentEnv = (process.env.ENV || "development") as TEnvironment;
export const { API_BASE_URL } = environments[currentEnv];
