import { type IconComponent } from 'twenty-ui/icon';
import { Tag } from 'twenty-ui/data-display';
import { type ThemeColor } from 'twenty-ui/theme';

type SelectDisplayProps = {
  color: ThemeColor | 'transparent';
  label: string;
  Icon?: IconComponent;
  preventPadding?: boolean;
};

export const SelectDisplay = ({
  color,
  label,
  Icon,
  preventPadding,
}: SelectDisplayProps) => {
  // [grafit] Одиночное значение списка — точка и текст, а не залитая плашка.
  // Множественные значения и связи остаются плашками: там граница показывает,
  // где кончается одно значение и начинается другое, а здесь значение одно.
  return (
    <Tag
      preventShrink
      variant="dot"
      color={color}
      text={label}
      Icon={Icon}
      preventPadding={preventPadding}
    />
  );
};
