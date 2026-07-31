import { styled } from '@linaria/react';
import { Trans } from '@lingui/react/macro';

import { useWorkspaceBypass } from '@/auth/sign-in-up/hooks/useWorkspaceBypass';
import { themeCssVariables } from 'twenty-ui/theme-constants';

/**
 * [set] Подвал экрана входа.
 *
 * Отсюда убраны ссылки «Условия обслуживания» и «Политика конфиденциальности»
 * и фраза «Пользуясь Twenty, вы соглашаетесь…»: они вели на twenty.com/legal.
 * Это чужие документы чужой компании, и показывать их нашим сотрудникам как
 * свои — неправда. Своих у нас нет; появятся — встанут на это место.
 *
 * Осталась кнопка обхода единого входа: она не про марку, а про то, как
 * попасть внутрь, когда SSO не отвечает.
 */

const StyledLinksContainer = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  justify-content: center;
  max-width: 100%;
  text-align: center;
  white-space: nowrap;

  & > button {
    background: none;
    border: none;
    color: ${themeCssVariables.font.color.tertiary};
    cursor: pointer;
    font: inherit;
    padding: 0;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

type FooterNoteProps = {
  /** Оставлено ради вызывающих: соглашения больше не показываются. */
  secondaryAgreement?: 'privacyPolicy' | 'dataProcessingAgreement';
};

export const FooterNote = (_props: FooterNoteProps) => {
  const { shouldOfferBypass, shouldUseBypass, enableBypass } =
    useWorkspaceBypass();

  if (!shouldOfferBypass || shouldUseBypass) {
    return null;
  }

  return (
    <StyledLinksContainer>
      <button type="button" onClick={enableBypass}>
        <Trans>Bypass SSO</Trans>
      </button>
    </StyledLinksContainer>
  );
};
