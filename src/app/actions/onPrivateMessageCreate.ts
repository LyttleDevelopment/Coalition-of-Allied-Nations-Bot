import { Message } from 'discord.js';

// The execute function
export async function onPrivateMessageCreate(
  userId: string,
  message: Message,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
