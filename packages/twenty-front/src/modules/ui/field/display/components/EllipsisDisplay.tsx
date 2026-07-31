import { styled } from '@linaria/react';

// [grafit] Признак `mono` — для всего, что читается как число: суммы, даты,
// количества. Моноширинный здесь не ради вида: цифры одинаковой ширины встают
// в колонку сами, и столбец сумм можно сравнивать взглядом, не читая каждую
// строку. `tabular-nums` доделывает то же самое внутри самого начертания.
const StyledEllipsisDisplay = styled.div<{ maxWidth?: number; mono?: boolean }>`
  align-items: center;
  font-family: ${({ mono }) => (mono ? 'var(--t-font-family-mono)' : 'inherit')};
  font-variant-numeric: ${({ mono }) => (mono ? 'tabular-nums' : 'normal')};
  display: flex;
  height: 20px;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth + 'px' : '100%')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

type EllipsisDisplayProps = {
  children: React.ReactNode;
  maxWidth?: number;
  className?: string;
  mono?: boolean;
};

export const EllipsisDisplay = ({
  children,
  maxWidth,
  className,
  mono,
}: EllipsisDisplayProps) => (
  <StyledEllipsisDisplay maxWidth={maxWidth} className={className} mono={mono}>
    {children}
  </StyledEllipsisDisplay>
);
