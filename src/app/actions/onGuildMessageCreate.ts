import { GuildMember } from '../../types';
import { Message } from 'discord.js';
import { onOnboardingCreate } from '../../modules/Onboarding/onOnboardingCreate';
import { executor } from '../../utils';

export async function onGuildMessageCreate(
  guildMember: GuildMember,
  message: Message,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(onOnboardingCreate, message.channel),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
