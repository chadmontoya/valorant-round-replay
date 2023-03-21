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
      } justify-between max-w-xl`}
    >
      <div className='flex'>
        <Image
          src={killEvent.killer_assets.agent.killfeed}
          alt={killEvent.killer_display_name}
          width={70}
          height={65}
        />
        <span className='font-semibold tracking-wide flex items-center'>
          {killEvent?.killer_display_name}
        </span>
      </div>
      <div className='flex'>
        <Image
          src={killEvent.damage_weapon_assets.killfeed_icon}
          alt={killEvent.damage_weapon_name}
          width={70}
          height={65}
          className='-scale-x-100'
        />
      </div>
      <div className='flex'>
        <span className='font-semibold tracking-wide flex items-center'>
          {killEvent?.victim_display_name}
        </span>
        <Image
          src={killEvent.victim_assets.agent.killfeed}
          alt={killEvent.victim_display_name}
          width={70}
          height={65}
          className='-scale-x-100'
        />
      </div>
    </div>
  );
}

export default KillBanner;
