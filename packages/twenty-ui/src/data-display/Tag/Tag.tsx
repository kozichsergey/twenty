import { type IconComponent } from '@ui/icon/types/IconComponent';
import { OverflowingTextWithTooltip } from '@ui/surfaces/OverflowingTextWithTooltip/OverflowingTextWithTooltip';
import { type ThemeColor } from '@ui/theme';
import { themeCssVariables, useTheme } from '@ui/theme-constants';
import { clsx } from 'clsx';
import { isDefined } from '@ui/utilities/utils/isDefined';

import styles from './Tag.module.scss';

type TagWeight = 'regular' | 'medium';
// [grafit] Вариант «dot»: точка цвета и обычный текст, без плашки.
//
// Twenty красит каждое значение списка своей пастелью, и в одной строке
// оказывается пять залитых плашек, которые спорят между собой: стадия
// сиреневая, приоритет оранжевый, статус зелёный — и ни один из этих цветов
// ничего не значит. Точка сохраняет цвет как признак, но перестаёт красить
// площадь, и строка снова читается слева направо.
//
// Плашка остаётся там, где она осмысленна: у связей (компания, контакт)
// и у множественных значений — там граница показывает, где кончается одно
// значение и начинается другое.
type TagVariant = 'solid' | 'outline' | 'border' | 'dot';
export type TagColor = ThemeColor | 'transparent';

type TagProps = {
  className?: string;
  color: TagColor;
  text: string;
  Icon?: IconComponent;
  onClick?: () => void;
  weight?: TagWeight;
  variant?: TagVariant;
  preventShrink?: boolean;
  preventPadding?: boolean;
};

export const Tag = ({
  className,
  color,
  text,
  Icon,
  onClick,
  weight = 'regular',
  variant = 'solid',
  preventShrink,
  preventPadding,
}: TagProps) => {
  const theme = useTheme();

  const tagBackground =
    color === 'transparent'
      ? 'transparent'
      : (themeCssVariables.tag.background[color] ??
        themeCssVariables.tag.background.gray);

  const tagText =
    color === 'transparent'
      ? themeCssVariables.font.color.secondary
      : (themeCssVariables.tag.text[color] ??
        themeCssVariables.font.color.secondary);

  const isInteractive = isDefined(onClick);

  // Точке нужен сплошной цвет семейства, а не приглушённый цвет текста:
  // на семи пикселях приглушённый читается как серый.
  const tagDot =
    color === 'transparent'
      ? themeCssVariables.font.color.light
      : (themeCssVariables.color[color] ?? themeCssVariables.font.color.light);

  const tagContent = (
    <>
      {variant === 'dot' ? <span className={styles.dot} aria-hidden /> : <></>}
      {isDefined(Icon) ? (
        <div className={styles.iconContainer}>
          <Icon
            size={theme.icon.size.sm}
            stroke={theme.icon.stroke.sm}
            aria-hidden
          />
        </div>
      ) : (
        <></>
      )}
      {preventShrink ? (
        <span className={styles.nonShrinkableText}>{text}</span>
      ) : (
        <span className={styles.content}>
          <OverflowingTextWithTooltip text={text} />
        </span>
      )}
    </>
  );

  const sharedStyle = {
    '--tag-background': tagBackground,
    '--tag-text': tagText,
    '--tag-dot': tagDot,
  } as React.CSSProperties;

  const sharedClassName = clsx(
    styles.tag,
    weight === 'medium' && styles.weightMedium,
    variant === 'outline' && styles.variantOutline,
    variant === 'border' && styles.variantBorder,
    variant === 'dot' && styles.variantDot,
    preventShrink && styles.preventShrink,
    preventPadding && styles.preventPadding,
    className,
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        className={clsx(sharedClassName, styles.interactive)}
        onClick={onClick}
        style={sharedStyle}
      >
        {tagContent}
      </button>
    );
  }

  return (
    <span className={sharedClassName} style={sharedStyle}>
      {tagContent}
    </span>
  );
};
