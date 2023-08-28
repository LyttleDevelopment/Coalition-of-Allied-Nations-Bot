import {
  ButtonInteraction,
  ChannelType,
  GuildMember,
  TextChannel,
} from 'discord.js';
import { JOIN_CIVILIAN, REQUEST_OTHER } from './onOnboardingCreate';
import {
  CIVILIAN_ROLE,
  ONBOARDING_CHANNEL,
  ONBOARDING_NOTIFY_ROLES,
} from '../../../constants';

const activeRequests: string[] = [];

export function onButtonClick(interaction: ButtonInteraction) {
  if (interaction.customId === JOIN_CIVILIAN) {
    return joinCivilian(interaction);
  }
  if (interaction.customId === REQUEST_OTHER) {
    return requestOther(interaction);
  }
}

async function joinCivilian(interaction: ButtonInteraction) {
  await interaction.deferUpdate();

  // give user civilian role
  const role = interaction.guild.roles.cache.find(
    (r) => r.id === CIVILIAN_ROLE,
  );
  if (!role) return;
  const member = interaction.member as GuildMember;
  await member.roles.add(role);
}

async function requestOther(interaction: ButtonInteraction) {
  if (activeRequests.includes(interaction.user.id)) return;
  activeRequests.push(interaction.user.id);

  await interaction.deferUpdate();

  const onboardingChannel = interaction.guild.channels.cache.find(
    (c) => c.id === ONBOARDING_CHANNEL,
  ) as TextChannel;
  if (!onboardingChannel) return;

  const thread = await onboardingChannel.threads.create({
    name: `${interaction.user.username}'s Request`,
    autoArchiveDuration: 1440,
    type: ChannelType.PrivateThread,
  });

  await thread.members.add(interaction.user.id);
  const staffRoles = ONBOARDING_NOTIFY_ROLES.map((id) =>
    interaction.guild.roles.cache.get(id),
  );

  const staffMembers: GuildMember[] = [];
  for (const role of staffRoles) {
    role.members.map((member: GuildMember) => staffMembers.push(member));
  }

  for (const member of staffMembers) {
    await thread.members.add(member.id);
  }

  const staffRolesStr = ONBOARDING_NOTIFY_ROLES.map((id) => `<@&${id}>`).join(
    ' ',
  );

  const message = `Hello <@${interaction.user.id}>, please tell us what you would like to do here.
Meanwhile the staff will be notified of your request and will get back to you as soon as possible (${staffRolesStr})`;

  await thread.send(message);
}
