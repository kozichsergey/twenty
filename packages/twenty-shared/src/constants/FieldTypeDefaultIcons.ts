import { FieldMetadataType } from '@/types';

// Default icons for fields created without a usable explicit icon (e.g. by AI
// metadata tools), mirroring the type illustrations of the settings UI —
// without one the frontend renders the meaningless Icon123 fallback.
export const FIELD_TYPE_DEFAULT_ICONS: Record<FieldMetadataType, string> = {
  [FieldMetadataType.ACTOR]: 'IconSettings',
  [FieldMetadataType.ADDRESS]: 'IconMap',
  [FieldMetadataType.ARRAY]: 'IconBrackets',
  [FieldMetadataType.BOOLEAN]: 'IconToggleLeft',
  [FieldMetadataType.CURRENCY]: 'IconCurrencyDollar',
  [FieldMetadataType.DATE]: 'IconCalendarEvent',
  [FieldMetadataType.DATE_TIME]: 'IconCalendarTime',
  [FieldMetadataType.EMAILS]: 'IconMail',
  [FieldMetadataType.FILES]: 'IconFile',
  [FieldMetadataType.FULL_NAME]: 'IconUser',
  [FieldMetadataType.LINKS]: 'IconLink',
  [FieldMetadataType.MORPH_RELATION]: 'IconRelationOneToMany',
  [FieldMetadataType.MULTI_SELECT]: 'IconTags',
  [FieldMetadataType.NUMBER]: 'IconNumbers',
  [FieldMetadataType.NUMERIC]: 'IconNumbers',
  [FieldMetadataType.PHONES]: 'IconPhone',
  [FieldMetadataType.POSITION]: 'IconArrowsSort',
  [FieldMetadataType.RATING]: 'IconStar',
  [FieldMetadataType.RAW_JSON]: 'IconJson',
  [FieldMetadataType.RELATION]: 'IconRelationOneToMany',
  [FieldMetadataType.RICH_TEXT]: 'IconBlockquote',
  [FieldMetadataType.SELECT]: 'IconTag',
  [FieldMetadataType.TEXT]: 'IconAbc',
  [FieldMetadataType.TS_VECTOR]: 'IconSearch',
  [FieldMetadataType.UUID]: 'IconId',
};
