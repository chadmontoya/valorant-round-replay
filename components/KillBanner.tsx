import Image from 'next/image';
import React from 'react';
import { KillEvent, Player } from '../typings';

interface Props {
  killEvent: KillEvent;
  player: Player | undefined;
}

function KillBanner({ killEvent, player }: Props) {
  const ally_kill = player?.team === killEvent?.killer_team;

  return (
    <div
      className={`flex bg-gradient-to-r ${
        ally_kill
          ? 'from-color-win to-color-lose'
          : 'from-color-lose to-color-win'
      } justify-between`}
    >
      <div className='flex'>
        <Image
          src={killEvent.killer_assets.agent.killfeed}
          alt={killEvent.killer_display_name}
          width={60}
          height={50}
          priority={true}
        />
        <span className='font-semibold text-xs tracking-wide flex items-center lg:text-sm'>
          {killEvent?.killer_display_name}
        </span>
      </div>
      <div className='m-auto'>
        <Image
          src={killEvent.damage_weapon_assets.killfeed_icon}
          alt={killEvent.damage_weapon_name}
          width={55}
          height={35}
          className='-scale-x-100'
          priority={true}
        />
      </div>
      <div className='flex'>
        <span className='font-semibold text-xs tracking-wide flex items-center lg:text-sm'>
          {killEvent?.victim_display_name}
        </span>
        <Image
          src={killEvent.victim_assets.agent.killfeed}
          alt={killEvent.victim_display_name}
          width={60}
          height={50}
          className='-scale-x-100'
          priority={true}
        />
      </div>
    </div>
  );
}

export default KillBanner;
