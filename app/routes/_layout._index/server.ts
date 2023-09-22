import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Remix Starter' },
    {
      property: 'og:title',
      content: 'Remix Starter',
    },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};
