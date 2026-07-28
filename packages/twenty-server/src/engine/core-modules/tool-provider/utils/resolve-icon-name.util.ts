import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'twenty-shared/utils';

const ICON_NAME_PATTERN = /^Icon[A-Za-z0-9]+$/;

// Normalizes a model-provided icon to the canonical twenty-ui shape
// ("IconBuildingSkyscraper"), fixing raw tabler slugs ("building-skyscraper"),
// separators and missing or lowercased "Icon" prefixes. Existence is not
// checked: an unknown name is harmless since the frontend falls back to its
// default icon (useIcons.getIcon), exactly as for icons stored via the API.
export const resolveIconName = (
  requestedIconName: string | undefined,
): string | undefined => {
  if (!isNonEmptyString(requestedIconName)) {
    return undefined;
  }

  const trimmedIconName = requestedIconName.trim();

  if (ICON_NAME_PATTERN.test(trimmedIconName)) {
    return trimmedIconName;
  }

  const words = trimmedIconName
    .replace(/^icon[\s_-]*/i, '')
    .split(/[^A-Za-z0-9]+/)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  if (words.length === 0) {
    return undefined;
  }

  const normalizedIconName = `Icon${words.join('')}`;

  return ICON_NAME_PATTERN.test(normalizedIconName)
    ? normalizedIconName
    : undefined;
};

// Returns the input with its icon replaced by the normalized name, or with the
// icon key removed when nothing usable was provided — so creates fall back to
// their default and updates keep the existing icon instead of clearing it.
export const withResolvedIcon = <TInput extends { icon?: string }>(
  input: TInput,
): TInput => {
  const { icon, ...inputWithoutIcon } = input;
  const resolvedIconName = resolveIconName(icon);

  return (
    isDefined(resolvedIconName)
      ? { ...inputWithoutIcon, icon: resolvedIconName }
      : inputWithoutIcon
  ) as TInput;
};
