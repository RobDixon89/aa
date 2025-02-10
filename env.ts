import 'dotenv/config';

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const apiVersion = assertValue(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_VERSION'
);

export const mailgunApi = assertValue(
  process.env.NEXT_PUBLIC_FORM_API_KEY,
  'Missing environment variable: NEXT_PUBLIC_FORM_API_KEY'
);

export const mailgunDomain = assertValue(
  process.env.NEXT_PUBLIC_FORM_DOMAIN,
  'Missing environment variable: NEXT_PUBLIC_FORM_DOMAIN'
);

export const siteDomain = assertValue(
  process.env.NEXT_PUBLIC_SITE_URL,
  'Missing environment variable: NEXT_PUBLIC_SITE_URL'
);

export const turnstileKey = assertValue(
  process.env.NEXT_PUBLIC_TURNSTILE_KEY,
  'Missing environment variable: NEXT_PUBLIC_TURNSTILE_KEY'
);

export const turnstileSecret = assertValue(
  process.env.NEXT_PUBLIC_TURNSILE_SECRET,
  'Missing environment variable: NEXT_PUBLIC_TURNSILE_SECRET'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
