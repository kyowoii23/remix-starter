import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    data: process.env.TMP_DATA ?? '',
  });
};
