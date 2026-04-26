const twilio = require("twilio");

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  TWILIO_TO_PHONE_NUMBER,
} = process.env;

function getTwilioClient() {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    throw new Error("Twilio credentials are missing. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.");
  }

  return twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

function buildLeadMessage(name, phone) {
  return `New real estate lead received. Name: ${name}. Phone: ${phone}.`;
}

async function sendLeadSms(name, phone) {
  if (!TWILIO_PHONE_NUMBER || !TWILIO_TO_PHONE_NUMBER) {
    throw new Error("Twilio phone numbers are missing. Set TWILIO_PHONE_NUMBER and TWILIO_TO_PHONE_NUMBER.");
  }

  const client = getTwilioClient();

  return client.messages.create({
    body: buildLeadMessage(name, phone),
    from: TWILIO_PHONE_NUMBER,
    to: TWILIO_TO_PHONE_NUMBER,
  });
}

module.exports = {
  sendLeadSms,
};
