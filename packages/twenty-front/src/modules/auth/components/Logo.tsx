import { styled } from '@linaria/react';
import { isNonEmptyString } from '@sniptt/guards';
import { AppPath } from 'twenty-shared/types';
import { getImageAbsoluteURI } from 'twenty-shared/utils';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { REACT_APP_SERVER_BASE_URL } from '~/config';

/**
 * [set] Знак на экранах входа — только наш и только один.
 *
 * В исходном виде компонент рисовал два знака сразу: большой квадрат
 * с логотипом Twenty (он подставлялся всегда, когда `primaryLogo` не задан)
 * и поверх него, наклейкой в углу, логотип рабочей области. Получалось, что
 * человека на входе встречает чужая марка, а наша выглядит приклеенной сбоку.
 *
 * Теперь знак один — логотип рабочей области. Стороннего нет вовсе: ни как
 * запасного варианта, ни как подложки. Нет логотипа у рабочей области —
 * не будет и знака: пустое место честнее чужого, а куда человек попал,
 * говорит заголовок под ним.
 *
 * Логотип вписывается целиком (`contain`), а не обрезается по квадрату:
 * наш широкий, и `cover` оставил бы от слова середину.
 */

type LogoProps = {
  primaryLogo?: string | null;
  secondaryLogo?: string | null;
  /** Больше не рисуется: буква вместо логотипа — заглушка, а не знак. */
  placeholder?: string | null;
  onClick?: () => void;
  to?: AppPath;
};

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${themeCssVariables.spacing[12]};
  justify-content: center;
  margin-bottom: ${themeCssVariables.spacing[4]};
  margin-top: ${themeCssVariables.spacing[4]};
`;

const StyledLogo = styled.img`
  display: block;
  max-height: 100%;
  max-width: ${themeCssVariables.spacing[32]};
  object-fit: contain;
`;

export const Logo = ({ primaryLogo, secondaryLogo, onClick }: LogoProps) => {
  // Это порядок опор, а не «главный и второстепенный»: часть экранов передаёт
  // логотип рабочей области первым полем, часть — вторым. Знак один и тот же.
  const logo = isNonEmptyString(primaryLogo)
    ? primaryLogo
    : isNonEmptyString(secondaryLogo)
      ? secondaryLogo
      : null;

  if (logo === null) {
    return null;
  }

  const logoUrl = getImageAbsoluteURI({
    imageUrl: logo,
    baseUrl: REACT_APP_SERVER_BASE_URL,
  });

  return (
    <StyledContainer onClick={() => onClick?.()}>
      <StyledLogo src={logoUrl} alt="" />
    </StyledContainer>
  );
};
