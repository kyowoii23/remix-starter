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
    <Wrapper className="test">
      <h1>{t('test')}</h1>
      <p>{i18n.language}</p>
      <button
        onClick={() => i18n.changeLanguage(
          i18n.language === 'en'
            ? 'ko'
            : 'en',
        )}
      >
        locale change
      </button>
      <h1>{theme}</h1>
      <button onClick={() => setTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK)}>
        theme change
      </button>
      <p>
        templateValue:
        {' '}
        {templateValue}
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 4em;
`;
