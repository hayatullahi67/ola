import serverless from "serverless-http";
import { createServer } from "../server";

// Wrap the Express app with serverless-http so Vercel can call it as a function.
const handler = serverless(createServer());

// Vercel expects a default export that accepts (req, res).
export default function (req: any, res: any) {
  return handler(req, res);
}
