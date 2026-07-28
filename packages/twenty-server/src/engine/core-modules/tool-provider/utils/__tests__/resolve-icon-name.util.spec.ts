import {
  resolveIconName,
  withResolvedIcon,
} from 'src/engine/core-modules/tool-provider/utils/resolve-icon-name.util';

describe('resolveIconName', () => {
  it('should return a canonical icon name unchanged', () => {
    expect(resolveIconName('IconBuildingSkyscraper')).toBe(
      'IconBuildingSkyscraper',
    );
    expect(resolveIconName('Icon123')).toBe('Icon123');
  });

  it('should fix a lowercased or separated Icon prefix', () => {
    expect(resolveIconName('iconPaw')).toBe('IconPaw');
    expect(resolveIconName('icon user')).toBe('IconUser');
  });

  it('should resolve raw tabler slugs without the Icon prefix', () => {
    expect(resolveIconName('building-skyscraper')).toBe(
      'IconBuildingSkyscraper',
    );
    expect(resolveIconName('paw')).toBe('IconPaw');
    expect(resolveIconName('currency_dollar')).toBe('IconCurrencyDollar');
  });

  it('should normalize unknown names to a renderable shape for the frontend fallback', () => {
    // Existence is not validated — the frontend renders unknown names with its
    // default icon, so a plausible-but-wrong name degrades gracefully.
    expect(resolveIconName('IconDoesNotExist')).toBe('IconDoesNotExist');
    expect(resolveIconName('not a real icon')).toBe('IconNotARealIcon');
  });

  it('should return undefined for missing or unusable input', () => {
    expect(resolveIconName(undefined)).toBeUndefined();
    expect(resolveIconName('')).toBeUndefined();
    expect(resolveIconName('   ')).toBeUndefined();
    expect(resolveIconName('!!!')).toBeUndefined();
    expect(resolveIconName('icon')).toBeUndefined();
  });
});

describe('withResolvedIcon', () => {
  it('should replace the icon with its normalized name', () => {
    expect(withResolvedIcon({ name: 'pet', icon: 'paw' })).toEqual({
      name: 'pet',
      icon: 'IconPaw',
    });
  });

  it('should remove an unusable icon', () => {
    expect(withResolvedIcon({ name: 'pet', icon: '   ' })).toEqual({
      name: 'pet',
    });
  });

  it('should leave inputs without icon unchanged', () => {
    const inputWithoutIcon: { name: string; icon?: string } = { name: 'pet' };

    expect(withResolvedIcon(inputWithoutIcon)).toEqual({ name: 'pet' });
  });
});
