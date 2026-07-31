import { styled } from '@linaria/react';
import { type ReactNode, useState } from 'react';

import { useNavigationDrawerExpanded } from '@/navigation/hooks/useNavigationDrawerExpanded';
import { useIsSettingsDrawer } from '@/navigation/hooks/useIsSettingsDrawer';
import { tableWidthResizeIsActiveState } from '@/object-record/record-table/states/tableWidthResizeIsActivedState';
import { ResizablePanelEdge } from '@/ui/layout/resizable-panel/components/ResizablePanelEdge';
import { NAVIGATION_DRAWER_COLLAPSED_WIDTH } from '@/ui/layout/resizable-panel/constants/NavigationDrawerCollapsedWidth';
import { NAVIGATION_DRAWER_CONSTRAINTS } from '@/ui/layout/resizable-panel/constants/NavigationDrawerConstraints';
import { NavigationDrawerWidthEffect } from '@/ui/navigation/components/NavigationDrawerWidthEffect';
import { NAVIGATION_DRAWER_CLICK_OUTSIDE_ID } from '@/ui/navigation/navigation-drawer/constants/NavigationDrawerClickOutsideId';
import { isNavigationDrawerExpandedState } from '@/ui/navigation/states/isNavigationDrawerExpanded';
import { navigationDrawerActiveTabState } from '@/ui/navigation/states/navigationDrawerActiveTabState';
import { NAVIGATION_DRAWER_TABS } from '@/ui/navigation/states/navigationDrawerTabs';
import {
  NAVIGATION_DRAWER_WIDTH_VAR,
  navigationDrawerWidthState,
} from '@/ui/navigation/states/navigationDrawerWidthState';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import { MOBILE_VIEWPORT, themeCssVariables } from 'twenty-ui/theme-constants';
import { NavigationDrawerBackButton } from './NavigationDrawerBackButton';
import { NavigationDrawerHeader } from './NavigationDrawerHeader';

export type NavigationDrawerProps = {
  children?: ReactNode;
  className?: string;
  title: string;
};

// [grafit] Тёмное шасси.
//
// Меню перекрашивается не правкой каждого пункта, а переопределением ролей
// внутри поддерева: CSS-переменные наследуются, поэтому все вложенные
// компоненты — пункты, заголовки разделов, счётчики, кнопка поиска — приходят
// к тёмным цветам сами, и ни один из них править не приходится.
//
// Зачем вообще: пока меню было той же бумагой, что и таблица, граница между
// «где я» и «что я смотрю» держалась на одной линии в пиксель. Тёмная полоса
// слева читается как корпус, светлое поле справа — как данные.
//
// Активный пункт остаётся подсвеченным цветом текста, а не янтарём, хотя
// в макете он янтарный. Янтарь в системе означает «требуется действие
// человека»; активный пункт есть на каждом экране всегда, и янтарь на нём
// обесценил бы все остальные. Тот же выбор сделан в сервисе контрагентов.
//
// Всплывающие списки уходят порталом в body и наследования не получают —
// они остаются светлыми, как остальное содержимое. Это и нужно.
const StyledAnimatedContainer = styled.div<{
  isExpanded: boolean;
  isResizing: boolean;
}>`
  --t-background-primary: var(--t-shassi-fon);
  --t-background-secondary: var(--t-shassi-fon);
  --t-background-tertiary: var(--t-shassi-fon-2);
  --t-background-quaternary: var(--t-shassi-fon-2);
  --t-background-transparent-lighter: var(--t-shassi-fon-2);
  --t-background-transparent-light: var(--t-shassi-fon-2);
  --t-background-transparent-medium: var(--t-shassi-fon-2);
  --t-background-transparent-strong: var(--t-shassi-fon-2);
  --t-accent-quaternary: var(--t-shassi-fon-2);
  --t-accent-tertiary: var(--t-shassi-fon-2);
  --t-font-color-primary: var(--t-shassi-tekst);
  --t-font-color-secondary: var(--t-shassi-tishe);
  --t-font-color-tertiary: var(--t-shassi-tishe);
  --t-font-color-light: var(--t-shassi-tishe);
  --t-font-color-extra-light: var(--t-shassi-tishe);
  --t-border-color-light: var(--t-shassi-fon-2);
  --t-border-color-medium: var(--t-shassi-fon-2);
  --t-border-color-strong: var(--t-shassi-fon-2);

  background: var(--t-shassi-fon);
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  transition: ${({ isResizing }) =>
    isResizing
      ? 'none'
      : `width calc(${themeCssVariables.animation.duration.normal} * 1s)`};
  width: ${({ isExpanded }) =>
    isExpanded
      ? `var(${NAVIGATION_DRAWER_WIDTH_VAR})`
      : `${NAVIGATION_DRAWER_COLLAPSED_WIDTH}px`};

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    width: ${({ isExpanded }) => (isExpanded ? '100vw' : '0')};
  }
`;

const StyledContainer = styled.div<{
  isExpanded?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  height: 100%;
  padding: ${themeCssVariables.spacing[2]} 0 ${themeCssVariables.spacing[4]}
    ${themeCssVariables.spacing[2]};
  width: ${({ isExpanded }) =>
    isExpanded ? `var(${NAVIGATION_DRAWER_WIDTH_VAR})` : '100%'};
  @media (max-width: ${MOBILE_VIEWPORT}px) {
    gap: ${themeCssVariables.spacing[4]};
    width: 100%;
    padding-left: ${themeCssVariables.spacing[2]};
    padding-right: ${themeCssVariables.spacing[2]};
  }
`;

export const NavigationDrawer = ({
  children,
  className,
  title,
}: NavigationDrawerProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const isMobile = useIsMobile();
  const isSettingsDrawer = useIsSettingsDrawer();
  const isExpanded = useNavigationDrawerExpanded();

  const [isNavigationDrawerExpanded, setIsNavigationDrawerExpanded] =
    useAtomState(isNavigationDrawerExpandedState);
  const [navigationDrawerWidth, setNavigationDrawerWidth] = useAtomState(
    navigationDrawerWidthState,
  );
  const setNavigationDrawerActiveTab = useSetAtomState(
    navigationDrawerActiveTabState,
  );
  const setTableWidthResizeIsActive = useSetAtomState(
    tableWidthResizeIsActiveState,
  );

  const handleCollapse = () => {
    setIsNavigationDrawerExpanded(false);
    setNavigationDrawerActiveTab(NAVIGATION_DRAWER_TABS.NAVIGATION_MENU);
    setIsResizing(false);
    setTableWidthResizeIsActive(true);
  };

  const handleWidthChange = (width: number) => {
    setNavigationDrawerWidth(width);
    setIsResizing(false);
    setTableWidthResizeIsActive(true);
  };

  const handleResizeStart = () => {
    setIsResizing(true);
    setTableWidthResizeIsActive(false);
  };

  return (
    <>
      <NavigationDrawerWidthEffect />
      <StyledAnimatedContainer
        className={className}
        data-click-outside-id={NAVIGATION_DRAWER_CLICK_OUTSIDE_ID}
        isExpanded={isExpanded}
        isResizing={isResizing}
      >
        <StyledContainer isExpanded={isExpanded}>
          {!isMobile && isSettingsDrawer && title ? (
            <NavigationDrawerBackButton title={title} />
          ) : (
            <NavigationDrawerHeader showCollapseButton />
          )}
          {children}
        </StyledContainer>

        {isNavigationDrawerExpanded && !isMobile && !isSettingsDrawer && (
          <ResizablePanelEdge
            side="right"
            constraints={NAVIGATION_DRAWER_CONSTRAINTS}
            currentWidth={navigationDrawerWidth}
            onWidthChange={handleWidthChange}
            onCollapse={handleCollapse}
            showHandle={false}
            cssVariableName={NAVIGATION_DRAWER_WIDTH_VAR}
            onResizeStart={handleResizeStart}
          />
        )}
      </StyledAnimatedContainer>
    </>
  );
};
