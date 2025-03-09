import { j as json } from './index2-DyoisQP2.js';
import { R as Repository } from './repository-DsW9d6WW.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import './product.model-CtjXPvr8.js';
import 'uuid';
import 'bcrypt';
import 'better-sqlite3';
import './index-DK8hzxr2.js';
import 'node:path';
import 'node:os';
import 'node:process';

dotenv.config();
async function POST({ request, cookies }) {
  const { username, password } = await request.json();
  const userExists = await Repository.Instance.userExists(username, password);
  if (userExists) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    cookies.set("session", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test",
      sameSite: "strict",
      maxAge: 3600
    });
    return json({ success: true });
  }
  return json({ success: false, message: "Invalid credentials" }, { status: 401 });
}

export { POST };
//# sourceMappingURL=_server.ts-DrrDW5PP.js.map
