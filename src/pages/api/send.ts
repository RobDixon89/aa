export const runtime = 'edge';

export type EmailParams = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

const endpoint = `https://api.eu.mailgun.net/v3/${process.env.NEXT_PUBLIC_FORM_DOMAIN}/messages`;
const secret = btoa(`api:${process.env.NEXT_PUBLIC_FORM_API_KEY}`);

export default async function handler(req: Request) {
  const params = await req.json();

  let formData = new FormData();

  Object.entries(params as EmailParams).map(([key, value]) =>
    formData.append(key, value)
  );

  try {
    const d = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Basic ${secret}`,
      },
    });

    return new Response(JSON.stringify({ success: d.ok }), {
      status: d.ok ? 200 : 400,
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
