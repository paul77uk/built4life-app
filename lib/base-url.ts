const getBaseURL = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.DOMAIN_URL}`;
  ("http://localhost:3000");
};

export default getBaseURL;
