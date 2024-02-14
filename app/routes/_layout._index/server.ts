import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix Starter' },
    {
      property: 'og:title',
      content: 'Remix Starter',
    },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};
