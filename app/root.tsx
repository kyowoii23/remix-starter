import { cssBundleHref } from '@remix-run/css-bundle';
import { json, type LinksFunction, type LoaderArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import rdtStylesheet from 'remix-development-tools/index.css';
import { useChangeLanguage } from 'remix-i18next';

import { NonFlashOfWrongThemeEls, ThemeProvider, useTheme } from '~/hooks/use-theme';
import i18next from '~/localization/i18next.server';
import { getThemeSession } from '~/services/theme.server';
import globalStyles from '~/styles/global.css';
import resetStyles from '~/styles/reset.css';
import themeStyles from '~/styles/theme.css';

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await i18next.getLocale(request);
  const themeSession = await getThemeSession(request);

  return json({ locale, theme: themeSession.getTheme() });
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: resetStyles },
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: themeStyles },
  ...(process.env.NODE_ENV === 'development' ? [{ rel: 'stylesheet', href: rdtStylesheet }] : []),
  ...cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [],
];

const App = () => {
  const { locale, theme: serverSideTheme } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const [theme] = useTheme();

  useChangeLanguage(locale);

  return (
    <html
      lang={locale}
      dir={i18n.dir()}
      className={clsx(theme)}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(serverSideTheme)} />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `process = ${JSON.stringify(
              { env: {} },
            )}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

const AppWithProviders = () => {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <App />
    </ThemeProvider>
  );
};

let AppExport = AppWithProviders;

if (process.env.NODE_ENV === 'development') {
  const { withDevTools } = require('remix-development-tools');
  AppExport = withDevTools(AppExport);
}

export default AppExport;
