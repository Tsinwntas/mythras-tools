import { SpecialEffect } from './../model/special-effect';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialEffectsService {

  effects : SpecialEffect[];

  constructor() { }

  getEffects() : SpecialEffect[]{
    if(!this.effects)
      this.effects = getOffensiveSpecialEffects().concat(getDefensiveSpecialEffects());
    return this.effects;
  }

  getSpecialEffect(effect : string) : SpecialEffect | undefined {
    return this.getEffects().find(e=>e.effect==effect);
  }

  // getSpecialEffects(offensive: boolean, filter : SpecialEffect) : SpecialEffect[]{
  //   return (offensive? getOffensiveSpecialEffects() : getDefensiveSpecialEffects())
  //   .filter(e=>Object.keys(filter).filter(k=>filter[k] && ))
  // }
}


function getOffensiveSpecialEffects() : SpecialEffect[] {
  return [
    {"effect":"Bypass Armour","requirement":"Attacker Criticals", "traits":["Finds a gap in the defender's natural or worn armour.","Attacker picks one of natural/worn armor to bypass. Physical protection gained from magic is considered “worn” armor. Stackable"]},
    {"effect":"Choose Location","requirement":"Attacker Criticals","traits":["Location must be reachable. Rules as Written do not require critical Ranged Weapons if defender is within close range or stationary or unaware of Attacker. Marksman can do this at long range."]},
    {"effect":"Circumvent Parry","requirement":"Attacker Criticals","traits":["On a critical the attacker may completely bypass parry."]},
    {"effect":"Force Failure","traits":["Defender Fumbles Combine with any other Special Effect which requires an opposed roll to work. Causes the opponent to fail his resistance roll by default"]},
    {"effect":"Max Damage","requirement":"Attacker Criticals","traits":["Substitute one of weapon's damage dice for its full value. Stackable."]},
    {"effect":"Pin Weapon","requirement":"Attacker Criticals","traits":["Pin one of his opponent's weapons or shield, using his body or positioning to hold it in place and so unusable. Opponent lacking a weapon or shield in the other hand may only avoid an attack by evading, using his Unarmed skill or disengaging completely. On his turn the opponent may attempt to wrestle or manoeuvre the pinned item free. Costs an Action Point (see Grip)."]},
    {"effect":"Circumvent Cover","requirement":"Attacker Criticals Ranged weapons", "traits":["You fire your weapon around a Defender's cover. Trick shot – reduced damage"]},
    {"effect":"Overpenetration","requirement":"Attacker Criticals Ranged weapons", "traits":["You shoot thru multiple targets that are in line or in a densely packed group. Attacker short travels thru 1st defender and if it overcomes the Armor hits 2nd defender doing 1⁄2 damage to 2nd defender. Any other special effects apply to 1st defender only"]},
    {"effect":"Shift Location","requirement":"Non ranged weapon","traits":["Can change to directly adjacent location. Location must be reachable. Rules as Written do not have this Stackable"]},
    {"effect":"Bash","requirement":"Shields or Bludgeoning","traits":["The attacker deliberately bashes the opponent off balance.","Shields knock an opponent back one metre per for 2 points of damage rolled (prior to any subtractions due to armour, parries), bludgeoning weapons knock back one metre per for 3 points.","Works only on creatures up to twice the attacker's SIZ.","If the recipient is forced backwards into an obstacle, then they must make a Hard Athletics or Acrobatics skill roll to avoid falling or tripping over."]},
    {"effect":"Bleed","requirement":"Cutting Weapons","traits":["The attacker can attempt to cut open a major blood vessel.","Opposed roll of Endurance vs the original attack roll. Failure - at start of each Combat Round loses one level of Fatigue","Bleeding can be stopped by a First Aid skill roll, but the recipient can no longer perform any action without reopening the wound."]},
    {"effect":"Close Range","traits":["End up at the Range favoured by the shorter weapon (see Weapon Reach page 157). Longer weapon cannot parry. Longer weapons attack is only 1d3+1 and size is reduced by differences in reach."]},
    {"effect":"Compel Surrender","traits":["Force the surrender of a disadvantaged opponent; (has been disarmed, unable to regain his footing, serious (or worse) wound...)","If understands the demand, the target must make an opposed roll of Willpower vs the original attack or parry roll. If the target fails, they capitulate."]},
    {"effect":"Damage Weapon","traits":["Damage opponent's weapon. Weapon AP reduce damage"]},
    {"effect":"Disarm Opponent","traits":["Knocks, yanks or twists the opponent's weapon out of his hand.","Works only on creatures of up to twice the attacker's STR.","Opposed roll of his Combat Style vs the original roll. Each step that the disarming character's weapon is larger increases the difficulty of the opponent's roll by one grade and conversely","Weapon is flung a distance roll of the disarmer's Damage Modifier in metres. If no Damage Modifier then drops at the feet."]},
    {"effect":"Entangle","requirement":"Entangling Weapons","traits":["Immobilise the location struck. An entangled arm cannot use whatever it is holding; a snared leg prevents the target from moving; whilst an enmeshed head, chest or abdomen makes all skill rolls one grade harder.","Following turn the wielder may spend an Action Point to automatically Trip Opponent","An entangled victim can attempt to free himself on his turn by either attempting an opposed roll using Brawn to yank free, or win a Special Effect and select Damage Weapon, Disarm Opponent or Slip Free."]},
    {"effect":"Flurry","requirement":"Unarmed","traits":["Can make an immediate follow-up attack using a different limb or body part, without needing to wait for its next turn using an extra Action point","A human attacker might follow up a punch to the abdomen with a knee to the face for example. Stackable"]},
    {"effect":"Grip","requirement":"Unarmed","traits":["May use an empty limb to hold onto the opponent, preventing them from being able to change weapon range or disengage from combat.","The opponent may attempt to break free on his turn, requiring an opposed roll of either Brawn or Unarmed vs whichever of the two skills the gripper prefers. If a character's Damage Modifier is smaller than his opponents, his Brawn roll suffers a penalty of one step per difference and vice versa.","If the gripped victim wins, they manage to break free."]},
    {"effect":"Impale","requirement":"Impaling Weapons","traits":["The attacker can attempt to drive an impaling weapon deep into the defender.","Roll weapon damage twice, with the attacker choosing which of the two results to use for the attack. If causes a wound, then the attacker has the option of leaving the weapon in the wound, or yanking it free on their next turn.","Leaving the weapon in the wound inflicts a difficulty grade on the victim's future skill attempts. The severity of the penalty depends on the size of both the creature and the weapon impaling it.","To withdraw an impaled weapon during melee requires use of the Ready Weapon combat action. Must pass an unopposed Brawn roll (or win an opposed Brawn roll if the opponent resists).","Success pulls the weapon free, causing further injury to the same location equal to half the normal damage roll for that weapon, but without any damage modifier. Barbed weapons inflict normal damage. Failure = weapon remained stuck in the wound.Armour does not reduce withdrawal damage. Stuck weapon cannot be used for parrying."]},
    {"effect":"Inject Venom","requirement":"Venomous or Inject Venom weapon","traits":["No damage – finds a weak point in armor for poisoning."]},
    {"effect":"Kill Silently","traits":["Must have assassination trait. Only on Surprised target and then on first round. You neutralize the defender in complete silence. If attack inflicts Serious wound defender fails endurance roll automatically. Defender cannot make any sound for 1 round."]},
    {"effect":"Press Advantage","traits":["Foe is forced to remain on the defensive and cannot attack on their next turn. Effective against foes concerned with defending themselves."]},
    {"effect":"Remise","requirement":"Small weapons only","traits":["Attacker performs a follow up attack with a weapon of size Small on Defender's next turn. Defender must change a proactive action into a reactive action."]},
    {"effect":"Scar Foe","requirement":"Bladed weapons or Small weapons","traits":["The combatant inflicts his opponent with a scar that will be the talk of all for the rest of his or her life - such as an almost-severed-throat, or the letter ‘Z' artfully inscribed across the chest."]},
    {"effect":"Stun Location","requirement":"Bludgeoning weapons or Shield (if marked so) ","traits":["Temporarily stun the body part struck.","If injures the target, the defender makes an opposed roll of Endurance vs. the original attack roll.","Failure = the Hit Location is incapacitated for a number of turns equal to the damage inflicted. A blow to the torso causes the defender to stagger winded, only able to defend. A head shot renders the foe briefly insensible."]},
    {"effect":"Sunder","requirement":"Two handed weapons","traits":["Damage the armour or natural protection of an opponent.","Reduces AP by any damage above AP value. If AP destroyed carries over to HP."]},
    {"effect":"Take Weapon","requirement":"Unarmed","traits":["Yank or twist an opponent's weapon out of his hand.","An opposed roll of Combat Style vs the character's original Unarmed roll. Failure = his weapon is taken and from that moment on, may be used by the character instead.","Only works on creatures of up to twice the attacker's STR"]},
    {"effect":"Trip opponent","traits":["The character attempts to overbalance or throw his opponent to the ground.","An opposed roll of his Brawn, Evade or Acrobatics vs the original roll. Failure = falls prone. Quadruped+ opponents may use their Athletics skill for Evade with 1 grade easier. If a character's Damage Modifier is smaller than his opponents, his Brawn roll suffers a penalty of one step per difference and vice versa."]},
    {"effect":"Drop Foe","requirement":"Ranged Weapons","traits":["If target gets at least a minor wound from the shot, endurance vs original attack. Failure = becomes incapacitated and unable to continue fighting. Recovery if First Aid check or healing spell. Lasts one hour divided by the Healing Rate of the target."]},
    {"effect":"Duck Back","requirement":"Ranged Weapons","traits":["Can immediately take cover. Must already be standing or crouching to some form of cover."]},
    {"effect":"Marksman","requirement":"Ranged Weapon","traits":["Permits the shooter to move the Hit Location struck by his shot by one step, to an immediately adjoining body area."]},
    {"effect":"Pin Down","requirement":"Ranged Weapon","traits":["Willpower vs attacker's hit roll. Failure = target hunkers down behind whatever cover is available and cannot return fire on their next Turn. Pin Down works even if no actual damage is inflicted on the target (perhaps due to a successful evasion or shots striking their cover instead). Although a pinned victim is unable to shoot back for the requisite time, they can perform other actions provided they don't expose themselves to fire in the process, such as crawling away to new cover, communicating with others, reloading a weapon and so on."]},
    {"effect":"Rapid Reload","requirement":"Ranged Weapon","traits":["Reduces the reload time for the next shot by one. Stackable"]}
  ]
}

function getDefensiveSpecialEffects() : SpecialEffect[] {
return [
  {"effect":"Accidental Injury","requirement":"Attacker Fumbles","traits":["The defender deflects or twists an opponent's attack in such a way that he fumbles, injuring himself.","The attacker must roll damage against himself in a random hit location using the weapon used to strike. If unarmed he tears or breaks something internal, the damage roll ignoring any armour."]},
  {"effect":"Blind Opponent","requirement":"Defender Criticals","traits":["Defender briefly blinds his opponent by throwing sand, reflecting sunlight off his shield... The attacker must make an opposed roll of his Evade skill (or Weapon style if using a shield) vs the defender's original parry roll. If the attacker fails he suffers the Blindness situational modifier of Herculean (skill is 1/10th) for the next 1d3 turns,"]},
  {"effect":"Enhance Parry","requirement":"Defender Criticals","traits":["Defender manages to deflect the entire force of an attack, no matter the Size of his weapon."]},
  {"effect":"Force Failure","requirement":"Opponent Fumbles","traits":["Combine with any other Special Effect which requires an opposed roll to work. Causes the opponent to fail his resistance roll by default"]},
  {"effect":"Pin Weapon","requirement":"Defender Criticals","traits":["Pin one of his opponent's weapons or shield, using his body or positioning to hold it in place. Opponent lacking a weapon or shield in the other hand may only avoid an attack by evading, using his Unarmed skill or disengaging completely. On his turn the opponent may attempt to wrestle or manoeuvre the pinned item free. Costs an Action Point (see Grip)."]},
  {"effect":"Select Target","requirement":"Attacker Fumbles","traits":["When an attacker fumbles, the defender may manoeuvre or deflect the blow in such a way that it hits an adjacent bystander instead.","This requires that the new target is within reach of the attacker's close combat weapon, or in the case of a ranged attack, is standing along the line of fire.","The new victim is taken completely by surprise by the unexpected accident and has no chance to avoid the attack which automatically hits. In compensation however, they suffer no special effect"]},
  {"effect":"Slip Free","requirement":"Defender Criticals","traits":["On a critical the defender can automatically escape being Entangled, Gripped, or Pinned."]},
  {"effect":"Weapon Malfunction","requirement":"Attacker Fumbles, Ranged weapons","traits":["Your firearm or bow malfunctions making it useless. Weapon will not work again until time can be spent cleaning and repairing it."]},
  {"effect":"Arise","traits":["Allows the defender to use a momentary opening to roll to their feet"]},
  {"effect":"Close Range","traits":["End up at the Range favoured by the shorter weapon (see Weapon Reach page 157). ). Longer weapon cannot parry. Longer weapons attack is only 1d3+1 and size is reduced by differences in reach."]},
  {"effect":"Compel Surrender","traits":["Force the surrender of a disadvantaged opponent; (has been disarmed, unable to regain his footing, serious (or worse) wound...)","If understands the demand, the target must make an opposed roll of Willpower vs the original attack or parry roll. If the target fails, they capitulate."]},
  {"effect":"Damage Weapon","traits":["Damage opponent's weapon. Weapon AP reduce damage."]},
  {"effect":"Disarm Opponent","traits":["Knocks, yanks or twists the opponent's weapon out of his hand.","Works only on creatures of up to twice the attacker's STR.","Opposed roll of his Combat Style vs the original roll. Each step that the disarming character's weapon is larger increases the difficulty of the opponent's roll by one grade and conversely","Weapon is flung a distance roll of the disarmer's Damage Modifier in metres. If no Damage Modifier then drops at the feet."]},
  {"effect":"Entangle","requirement":"Entangling Weapons","traits":["Immobilise the location struck. An entangled arm cannot use whatever it is holding; a snared leg prevents the target from moving; whilst an enmeshed head, chest or abdomen makes all skill rolls one grade harder.","following turn the wielder may spend an Action Point to automatically Trip Opponent.","An entangled victim can attempt to free himself on his turn by either attempting an opposed roll using Brawn to yank free, or win a Special Effect and select Damage Weapon, Disarm Opponent or Slip Free."]},
  {"effect":"Inject Venom","requirement":"Venomous or Inject Venom weapon","traits":["No damage – finds a weak point in armor for poisoning."]},
  {"effect":"Open Range","traits":["Permits the character to automatically change the engagement range between himself and his opponent, so that they end up at the Range favoured by the longer weapon (see (see Weapon Reach - Closing and Opening Range page 157). Shorter weapon cannot attack except opponents weapon/attacking limb"]},
  {"effect":"Overextend Opponent","traits":["The defender sidesteps or retreats at an inconvenient moment, causing the attacker to overreach himself. Opponent cannot attack on his next turn. Stackable."]},
  {"effect":"Prepare Counter","traits":["The defender reads the patterns of his foe and preplans a counter against a specific Special Effect (which should be noted down in secret). If his opponent attempts to inflict the chosen Special Effect upon him during the fight, the defender instantly substitutes the attackers effect with one of his own (offensive or defensive but the SE has to fit the context), which succeeds automatically."]},
  {"effect":"Scar Foe","requirement":"Bladed weapons or Small weapons","traits":["The combatant inflicts his opponent with a scar that will be the talk of all for the rest of his or her life - such as an almost-severed-throat, or the letter ‘Z' artfully inscribed across the chest."]},
  {"effect":"Stand Fast","traits":["The defender braces himself against the force of an attack, allowing them to avoid the Knockback effects of any damage received."]},
  {"effect":"Take Weapon","requirement":"Unarmed","traits":["Yank or twist an opponent's weapon out of his hand.","An opposed roll of Combat Style vs the character's original Unarmed roll. Failure = his weapon is taken and from that moment on, may be used by the character instead.","Only works on creatures of up to twice the attacker's STR"]},
  {"effect":"Trip opponent","traits":["The character attempts to overbalance or throw his opponent to the ground.","An opposed roll of his Brawn, Evade or Acrobatics vs the original roll. Failure = falls prone. Quadruped+ opponents may use their Athletics skill for Evade with 1 grade easier. Brawn: If a character's Damage Modifier is smaller than his opponents, his Brawn roll suffers a penalty of one step per difference and vice versa"]},
  {"effect":"Withdraw","traits":["The defender may automatically withdraw out of reach, breaking off engagement with that particular opponent."]}
];
}

/*
JSON.stringify(a
.replace(/[\n]/g," ").replace(/[ ]+/g," ").split('!').map(s=>{
    let split = s.trim().split(" • ")
    return {effect: split[0], traits:split.splice(1)}
}))
*/