import { CollectionNode } from "app/services/shopify/collections";
import styles from "./CollectionWrapper.module.sass"

export interface CollectionsWrapperProps {
  collections: CollectionNode[];
}

export const CollectionsWrapper = ({ collections }: CollectionsWrapperProps) => {
  return (
    <div className={styles.CollectionWrapper}>
      {collections.map(collection => (
        <div key={collection.id}>
          <h3>{collection.title}</h3>
          <p>{collection.description}</p>
        </div>
      ))}
    </div>
  );
};

