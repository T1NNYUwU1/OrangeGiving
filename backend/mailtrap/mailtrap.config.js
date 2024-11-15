import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";    

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

export const mailtrapClient = new MailtrapClient({
  endpoint: ENDPOINT, 
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test", // ชื่อคนที่ส่งเมล
};

// ทำเป็นไดนามิกเลยไม่ใช้
/*
const recipients = [
  {
    email: "tinnapat.takananant@gmail.com",
  }
];

// for test
client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!", // ใช้ html: ได้
    category: "Integration Test",
  })
  .then(console.log, console.error);
*/