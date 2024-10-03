import { MailtrapClient } from "mailtrap";
import { config } from "dotenv";

config({
  path: "./.env",
});

const TOKEN = process.env.MAILTRAP_TOKEN;
if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN is not defined in the environment variables");
}
export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
