import { ButtonInteraction } from 'discord.js';
import { GuildMember } from '../../types';
import { onButtonClick } from '../../modules';
import { executor } from '../../utils'; // This file's prefix

// The execute function
export async function onGuildInteractionButton(
  guildMember: GuildMember,
  interaction: ButtonInteraction,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [executor(onButtonClick, interaction)];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
