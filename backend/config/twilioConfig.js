import twilio from "twilio";

export const client = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
