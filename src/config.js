export const VERSION = "1.2.3";

// Base64 encoded key from the original source
const key = "QUl6YVN5RDRLdUdUMjJhQ0VYWlNpOFhDdER3b1BibGI0eUMwQmo4adLcBr3vALjgTkhYOG3Dzw((";
export const API_KEY = Buffer.from(key.substring(0, 52), "base64").toString("utf-8");
