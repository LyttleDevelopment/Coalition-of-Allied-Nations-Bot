import {
  NEW_MEMBER_WELCOME_CHANNEL,
  ONBOARDING_CHANNEL,
  RULES_CHANNEL,
} from '../../../constants';
import client from '../../main';
import { GuildTextBasedChannel } from 'discord.js';

export async function onNewMember(userId: string) {
  const channel = client.channels.cache.get(
    NEW_MEMBER_WELCOME_CHANNEL,
  ) as GuildTextBasedChannel;

  const message = `Welcome <@${userId}>, thank you for joining us.
Make sure to read into the <#${RULES_CHANNEL}> channel.
After you have done that head over to the <#${ONBOARDING_CHANNEL}> channel
If you wish to join as a civilian, click the civilian button and if you wish to enlist then click the enlist button and we will be with you shortly
Acta non verba`;

  await channel.send(message);
}
