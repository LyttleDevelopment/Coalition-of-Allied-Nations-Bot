import { GuildChannel } from 'discord.js';
import { onChannelCreate } from '../actions';

// Emitted whenever a user subscribes to a guild scheduled event
async function channelCreate(channel: GuildChannel): Promise<void> {
  if (!channel?.guild?.id) return;

  // Fire actions
  await onChannelCreate(channel);
}

export default channelCreate;
