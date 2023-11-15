import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { THEME } from '~/common/constants';
import { useTheme } from '~/hooks/use-theme';
import { templateState } from '~/recoil/atoms';

export { meta } from './server';

export default function Index() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useTheme();
  const templateValue = useRecoilValue(templateState);

  return (
    <Wrapper>
      <div>
        <h1>{templateValue}</h1>
      </div>
      <div>
        <h1>{i18n.language}</h1>
        <p>{t('test')}</p>
        <button
          onClick={() => i18n.changeLanguage(
            i18n.language === 'en'
              ? 'ko'
              : 'en',
          )}
        >
          locale change
        </button>
      </div>
      <div>
        <h1>{theme}</h1>
        <button onClick={() => setTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK)}>
          theme change
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 4em;
`;
