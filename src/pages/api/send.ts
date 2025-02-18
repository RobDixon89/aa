import { mailgunApi, mailgunDomain } from '../../../env';

export const runtime = 'edge';

// btoa

export type EmailParams = {
  to: string;
  from: string;
  subject: string;
  message: string;
};

export default async function handler(req: Request) {
  const params = await req.json();
  let formData = new FormData(params);

  //the link below has a domainName specific to your account
  await fetch(`https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: btoa(`api:${mailgunApi}`),
    },
  })
    .then((response) => {
      if (response.status == 200) {
        console.log('email sent successfully!');
        return true;
      } else {
        console.log(
          'email NOT sent, please try again later or contact your developer'
        );
        return false;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      return false;
    });
}
