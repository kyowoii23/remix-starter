import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    data: 'Jins\'s Remix Starter',
  });
};
