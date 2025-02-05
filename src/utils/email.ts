import mailgun from 'mailgun-js';
import { mailgunApi, mailgunDomain } from '../../env';

const mailgunClient = mailgun({
  apiKey: mailgunApi,
  domain: mailgunDomain,
});

export async function sendEmail({
  to,
  from,
  subject,
  message,
}: {
  to: string;
  from: string;
  subject: string;
  message: string;
}) {
  const emailData = {
    from,
    to,
    subject,
    html: message,
  };

  try {
    const result = await mailgunClient.messages().send(emailData);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
