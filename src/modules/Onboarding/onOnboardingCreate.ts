import { ONBOARDING_CHANNEL } from '../../../constants';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  GuildChannel,
  GuildTextBasedChannel,
} from 'discord.js';

export const JOIN_CIVILIAN = 'join_civilian';
export const REQUEST_OTHER = 'request_other';

export async function onOnboardingCreate(_channel: GuildChannel) {
  if (_channel.id !== ONBOARDING_CHANNEL) return;

  const channel = _channel as GuildTextBasedChannel;

  // Create the components.
  const components = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(REQUEST_OTHER)
      .setLabel('Become an enlisted member')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(JOIN_CIVILIAN)
      .setLabel('Become a civilian')
      .setStyle(ButtonStyle.Primary),
  );

  const content = `Welcome to the on boarding process. You have two options 
**Civilian** Civilians don't partake in the role play part of the group. You are welcome to join events and watch. All normal channels will be available to you

**Enlisted** Enlisted personnel partake in the roleplay part. You will have a a rank and uniform and will need to adhere to a set of rules. You have access to the channels of your regiment and branch`;
  const message = { content, embeds: [], components: [components] };
  await channel.send(message);
}
