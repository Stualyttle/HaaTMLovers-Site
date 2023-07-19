import { storage } from '@lyttledev-dashboard/utils';
import { useEffect, useState } from 'react';

export type Change = string | number | boolean | null;

export interface ChangeObject {
  original: Change;
  current: Change;
  store: Change;
  amount: Change;
}

export interface Changes {
  [key: string]: ChangeObject;
}

export interface ChangeProps {
  remove?: string | string[];
  update?:
    | {
        key: string;
        value?: Change;
        initial?: Change;
        store?: Change;
        amount?: Change;
      }
    | {
        key: string;
        value?: Change;
        initial?: Change;
        store?: Change;
        amount?: Change;
      }[];
}

export function useChanges(localSelectedGuildId: string | null) {
  const localGuildChanges = localSelectedGuildId
    ? 'changes_' + localSelectedGuildId
    : 'changes';
  const localChanges = storage.get(localGuildChanges) ?? null;
  const [changes, setChanges] = useState<Changes>(
    localChanges ? JSON.parse(localChanges) : {},
  );

  useEffect(() => {
    storage.set(localGuildChanges, JSON.stringify(changes));
  }, [changes]);

  const change = ({ remove, update }: ChangeProps) => {
    // Check for reset.
    if (update) {
      const updateKeys = (Array.isArray(update) ? update : [update]) //
        // Get keys only
        .map((e) => e.key);

      // Check if we have reset key.
      const hasResetKey = updateKeys.includes('reset');
      // Reset when we have reset key.
      if (hasResetKey) return setChanges({});
    }

    // Get current changes.
    const newChanges: Changes = { ...changes };

    // Remove changes.
    if (remove) {
      // Get al remove keys.
      const removeKeys = Array.isArray(remove) ? remove : [remove];
      // Check if we have remove keys.
      if (removeKeys.length > 0) {
        // Remove keys.
        removeKeys.forEach((key) => delete newChanges[key]);
      }
    }

    // Update changes.
    if (update) {
      // Get all updates.
      const updates = Array.isArray(update) ? update : [update];
      // Check if we have updates.
      if (updates.length > 0) {
        // Update changes.
        updates.forEach(({ initial, key, value, store, amount }) => {
          // Check if we have value.
          if (value === undefined || initial === undefined) return;
          // Update change.
          newChanges[key] = {
            original: initial,
            current: value,
            store: store ?? null,
            amount: amount ?? null,
          };
        });
      }
    }

    const filteredChanges: Changes = checkDuplicateChanges(newChanges);
    setChanges(filteredChanges);
  };

  const checkDuplicateChanges = (newChanges: Changes): Changes => {
    const filteredChanges: Changes = {};
    Object.keys(newChanges).forEach((key) => {
      if (newChanges[key].original !== newChanges[key].current) {
        filteredChanges[key] = newChanges[key];
      }
    });
    return filteredChanges;
  };

  const resetChanges = () => {
    setChanges({});
  };

  return { setChanges, localGuildChanges, resetChanges, changes, change };
}
