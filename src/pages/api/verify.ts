import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';
import { NextApiRequest, NextApiResponse } from 'next';
import { turnstileSecret } from '../../../env';

const verifyEndpoint =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = turnstileSecret;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TurnstileServerValidationResponse>
) {
  const token = req.body.token;

  const d = await fetch(verifyEndpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });

  const data = (await d.json()) as TurnstileServerValidationResponse;

  res.status(data.success ? 200 : 400).json(data);
}
