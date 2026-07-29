import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { IndexType } from 'src/engine/metadata-modules/index-metadata/types/indexType.types';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/twenty-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildPersonStandardFlatIndexMetadatas = ({
  now,
  objectName,
  workspaceId,
  standardObjectMetadataRelatedEntityIds,
  dependencyFlatEntityMaps,
  twentyStandardApplicationId,
}: Omit<CreateStandardIndexArgs<'person'>, 'context'>): Record<
  AllStandardObjectIndexName<'person'>,
  FlatIndexMetadata
> => ({
  companyIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'companyIdIndex',
      relatedFieldNames: ['company'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    twentyStandardApplicationId,
    now,
  }),
  emailsUniqueIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'emailsUniqueIndex',
      relatedFieldNames: ['emails'],
      isUnique: true,
      // ГК СЭТ: уникальность адреса действует только на живых записях.
      // Без этого условия удалённый контакт продолжает занимать адрес,
      // и новый контакт с тем же адресом база не примет — а письмо от клиента
      // молча привязывается к записи, лежащей в корзине.
      // Такое же условие Twenty уже применяет на messageChannelMessageAssociation
      // и messageListMember, так что механизм миграций его поддерживает.
      indexWhereClause: '"deletedAt" IS NULL',
      hasDeterministicUniversalIdentifier: true,
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    twentyStandardApplicationId,
    now,
  }),
  searchVectorGinIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'searchVectorGinIndex',
      relatedFieldNames: ['searchVector'],
      indexType: IndexType.GIN,
      hasDeterministicUniversalIdentifier: true,
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    twentyStandardApplicationId,
    now,
  }),
});
