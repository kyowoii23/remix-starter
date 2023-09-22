import { Outlet, useLoaderData } from '@remix-run/react';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';

import { templateState } from '~/recoil/atoms';

import Footer from './footer';
import Header from './header';
import type { loader } from './server';

export { loader } from './server';

export default function Default() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(templateState, data);
      }}
    >
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </RecoilRoot>
  );
}

const Main = styled.main`
`;
