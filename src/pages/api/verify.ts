import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';

export const runtime = 'edge';

const verifyEndpoint =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.NEXT_PUBLIC_TURNSILE_SECRET as string;

export default async function handler(req: Request) {
  const { token } = await req.json();

  try {
    const d = await fetch(verifyEndpoint, {
      method: 'POST',
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const data = (await d.json()) as TurnstileServerValidationResponse;

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
