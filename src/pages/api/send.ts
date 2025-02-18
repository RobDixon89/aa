import { mailgunApi, mailgunDomain } from '../../../env';

export const runtime = 'edge';

export type EmailParams = {
  to: string;
  from: string;
  subject: string;
  message: string;
};

export default async function handler(req: Request) {
  const params = await req.json();

  let formData = new FormData();

  Object.entries(params as EmailParams).map(([key, value]) =>
    formData.append(key, value)
  );

  try {
    const d = await fetch(
      `https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: btoa(`api:${mailgunApi}`),
        },
      }
    );

    const data = await d.json();

    return new Response(JSON.stringify(data), {
      status: data.success ? 200 : 400,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
