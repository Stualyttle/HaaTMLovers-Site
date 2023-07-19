import { storage } from '@lyttledev-dashboard/utils';
import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Changes } from '@lyttledev-dashboard/contexts/app-hooks/changes';
import { useAppAuth } from '@lyttledev-dashboard/contexts/app-hooks/auth';

export interface GuildInfo {
  id?: string;
  name?: string;
  icon?: string;
}

const GuildQuery = gql`
  query guild($guildId: String!) {
    guild(id: $guildId) {
      discord {
        guild
      }
    }
  }
`;

export const getIcon = (guild: { id: string; icon: string | null }) =>
  guild.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
    : '/media/images/placeholder.png';

export function useGuild(
  setChanges: React.Dispatch<React.SetStateAction<Changes>>,
  localGuildChanges: string,
  localSelectedGuildId: string | null,
) {
  const authorized = useAppAuth();
  const [selectedGuildId, _setSelectedGuildId] = useState(localSelectedGuildId);
  const setSelectedGuildId = (guildId: string | null) => {
    _setSelectedGuildId(guildId);
    storage.set('selectedGuildId', guildId ?? '');
  };

  const selectedGuildIdFromStorage = storage.get('selectedGuildId') ?? '{}';
  const selectedGuildIdFromStorageParsed =
    // Prevent undefined from being parsed
    selectedGuildIdFromStorage && selectedGuildIdFromStorage !== 'undefined'
      ? JSON.parse(selectedGuildIdFromStorage)
      : {};
  const [selectedGuild, setSelectedGuild] = useState<GuildInfo>(
    selectedGuildIdFromStorageParsed,
  );
  const [fetch, { data: guildData }] = useLazyQuery(GuildQuery);

  useEffect(() => {
    const guild = guildData?.guild?.discord?.guild ?? null;
    if (!guild) return;
    const _guild = {
      id: guild?.id || null,
      name: guild?.name || 'Last edited server',
      icon: getIcon(guild),
    };
    setSelectedGuild(_guild);
    storage.set('selectedGuild', JSON.stringify(_guild));
  }, [guildData]);

  useEffect(() => {
    // Get guild changes from storage
    const guildChanges = storage.get(localGuildChanges) ?? null;
    // Set guild changes
    setChanges(guildChanges ? JSON.parse(guildChanges) : {});

    // Check if we have a valid guild id
    if (!selectedGuildId) return;

    // Check if the guild id changes
    if (
      (selectedGuildId && selectedGuild.id !== selectedGuildId) ||
      !guildData
    ) {
      if (!authorized) return;
      // Fetch new guild data
      void fetch({
        variables: { guildId: selectedGuildId },
      });
    }
  }, [selectedGuildId, authorized]);

  return {
    selectedGuildId,
    setSelectedGuildId,
    localSelectedGuildId,
    selectedGuild,
  };
}
