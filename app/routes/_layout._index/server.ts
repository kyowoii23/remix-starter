import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Driver Admin' },
    {
      property: 'og:title',
      content: 'Driver Admin',
    },
    { name: 'description', content: 'Welcome to Driver Admin!' },
  ];
};
