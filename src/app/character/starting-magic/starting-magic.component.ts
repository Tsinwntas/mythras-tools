import { invocationMagic, enhancementMagic, sorceryMagic } from './../../services/magic.service';
import { Character } from 'src/app/model/character';
import { Component, OnInit } from '@angular/core';
import { MysticPath } from 'src/app/model/mystic-path';
import { Spell } from 'src/app/model/spell';

@Component({
  selector: 'app-starting-magic',
  templateUrl: './starting-magic.component.html',
  styleUrls: ['./starting-magic.component.scss'],
})
export class StartingMagicComponent implements OnInit {
  character: Character;
  ngOnInit(): void {
    if(!this.character.magic.folk)
    {
      this.character.magic.folk = [];
    }
    if(!this.character.magic.miracles)
    {
      this.character.magic.miracles = [];
    }
    if(!this.character.magic.sorcery)
    {
      this.character.magic.sorcery = [];
    }
    if(!this.character.magic.path)
    {
      this.character.magic.path = new MysticPath();
    }
    if(this.character.mysticalOrder?.name)
      this.character.magic.path.path = this.getPath();
  }

  getPath() {
    return this.character.mysticalOrder.paths.replace(/:.*/g,'').trim();
  }

  getAugmentations() : string[] {
    return this.character.mysticalOrder.paths.match(/Augment[ ][^,]*/g)!.map(a=>a.replace(/Augment[ ]/g,'').trim());
  }

  getInvocations() : string[] {
    return this.character.mysticalOrder.paths.match(/Invoke[ ][^,]*/g)!.map(a=>a.replace(/Invoke[ ]/g,'').trim());
  }

  findInvocation(invocation:string) : Spell {
    return invocationMagic.find(i=>i.name.trim().replace(/[(].*[)]/,"(X)") == invocation)!;
  }

  hasEnhancements() : boolean {
    return this.character.mysticalOrder.paths.includes('Enhance');
  }

  getEnhancements() : string[] {
    return this.character.mysticalOrder.paths.match(/Enhance[ ][^,]*/g)!.map(a=>a.replace(/Enhance[ ]/g,'').trim());
  }

  findEnhancement(enhancement:string) : Spell {
    return enhancementMagic.find(e=>e.name.trim().replace(/[(].*[)]/,"(X)") == enhancement)!;
  }

  getSorceries() : string[] {
    return this.character.sorceryOrder.spells.split(/[ ]*,[ ]*/g);
  }

  findSorcery(sorcery:string) : Spell {
    let s = sorceryMagic.find(s=>s.name.replace(/[(].*[)]/,"").trim() == sorcery.replace(/[(].*[)]/,"").trim())!;
    s.name = sorcery;
    return s;
  }

  getSpellDescription(description : string) : string {
    return description.replace(/[\n]/g,'<br/>').replace(/[\t]/g,"&#9;")
  }


}



`Absorption
Duration (Minutes), Rank Initiate
This miracle absorbs incoming magic aimed at the recipient or his equipment, converting its energy into Magic Points which then replenish his personal Magic Points attribute, assuming there is space for the additional points. Excess Magic Points garnered through Absorption simply vanish. Absorption does not affect spells already in existence, prior to the miracle's manifestation. The effects of Absorption depend on the relative Magnitude of both itself and the incoming spell. Any spell absorbed by this miracle is cancelled, and has no effect.
If the incoming spell has a lower magnitude than the Absorption miracle then the incoming spell is absorbed and the miracle remains.
Else the miracle is eliminated and the spell takes effect.

Aegis
Duration (Minutes), Rank Initiate
Creates or augments a shield which glows with the cult symbols of the deity. The magical shield takes the attributes of a Hoplite shield, although its parrying Size depends on the Intensity of the miracle. Intensity l-h is a Small shield, 3-4 Medium, 5-6 Large, 7-8 Huge, 9-l0 Enormous and ll+ Colossal.
The Aegis is immune to all damage. If cast upon an existent shield, it is protected until the miracle ends.

Awaken
Duration (Minutes), Ranged (£ens of Metres), Rank Priest
Awaken brings part of the god's awareness into its consecrated shrine or temple, enabling the deity to animate its sanctified idol or take control of its sacred animal(s), depending on the nature of the cult. It is normally reserved for cult holy days, except in times of emergency. The embodied god cannot leave the consecrated area, but during that time it can awe its worshippers, express its displea- sure or defend its own shrine.
The limits of the miracle depend on what is used for the embod- iment. An awakened statue or cult idol can have a combined STR+- SIZ of up to ten times the Intensity. This value is used to calculate both the idol's Damage Modifier and its Hit Points per location. Its Armour Points depend upon the material it is constructed from, usually 6 for wooden idols, 8 for hollow metal and l0 for stone. The idol performs all actions at the same value as the caster's Devotion skill, has a Initiative Bonus equal to the Intensity, and one Action Point per four levels of Intensity (or fraction thereof). Other physical attributes should be created based upon the shape and size of the idol (see Default Natural Weapons for Unusually Sized Creatures page hhh).
Awakened creatures are handled slightly differently. Like idols the deity may awaken a creature of up to a maximum STR+SIZ of ten times the Intensity of the miracle. However, if the shrine or temple lacks a giant example of the sacred animal, the deity can instead awaken multiple beasts provided their combined total does not exceed the limit set by the Intensity. Other than that the creature or creatures possess their normal Action Points, Damage Modifier, Hit Points, Initiative Bonus and Armour Points. They perform skills at either their base (or trained) value or at the value of the caster's Devotion skill, whichever is higher.

Backlash
Duration (Minutes), Ranged (Metres), Rank Initiate
Backlash makes physical assault upon the recipient extremely dangerous, redirecting an inflicted injury back upon the attacker. The magic only affects wounds that inflict equal or less Hit Points than the Intensity of the miracle – translocating the damage so that it affects the attacker in precisely the same location they struck, ignoring any armour.
This miracle affects both hand to hand and ranged attacks, pro- viding the assailant is within range. Even though the recipient may be near immune to injury, it does not provide immunity to any Spe- cial Effect they may have suffered as part of the attack.

Beast Form
Duration (Hours), Ranged (Metres), Rank Acolyte, Resist (Endurance)
This miracle transforms the target and all his personal belong- ings into an animal that is sacred to the cult. The target retains his INT, CHA and POW scores, but exchanges his STR, DEX, CON and SIZ scores for average values for that of the animal type, and gains a bonus to each physical Characteristic of +l per point of Intensity. He also gains the natural abilities of the creature. The animal cannot be mystical or magical in any way, and the Games Master should have final say as to what manner of creature would fit a specific cult if it is not obvious.

Behold
Area (Metres), Duration (Minutes), Rank Initiate, Resist (Willpoeer)
Behold summons a vision of what a fellow cult member of lesser rank is currently experiencing. The image requires some sort of cult related paraphernalia in which to manifest, such as a sacred mirror, pool of pure water or even narcotic smoke rising from a brazier.
The view provided is limited to the defined area, centred upon the target of the miracle, which may permit identification of their location if enough clues are visible. Behold conveys only a single primary sense, which for most cults is a visual image. Some however, depending on the deity in question, use sound or even scent instead;in which case the medium through which the information is trans- mitted is different.
If the target is either magically protected against scrying by a spell of greater Magnitude, held (or hiding) within the consecrated ground of a different cult, or dead, then the miracle fails. The target of Behold may attempt to resist the miracle if desired.

Berserk
Duration (Minutes), Rank Initiate, Resist (Willpoeer)
The recipient of Berserk is overcome with bloodlust, causing him to disregard his own safety in exchange for being imbued with tre- mendous stamina and toughness. Eor the duration of the miracle the Damage Modifier of the recipient is increased by two steps, the Size of his weapon counts as one step larger for the purpose of penetrat- ing parries, and he is immune to all the detrimental effects of Seri- ous Wounds and Eatigue. A Major wound will still incapacitate him. In return the subject may not Parry, Evade or cast any magic while under the influence of Berserk. However the berserker auto-
matically succeeds in resisting any Special Effect used against him.
Unwilling recipients receive a chance to resist. Normally, the recipient remains in the Berserk state for the entire duration of the spell, but Games Masters may allow a Berserk character to shake off the effects with an unopposed Willpower test. At the end of the spell, the recipient immediately suffers twice the deferred Eatigue levels they would have lost during the entire combat.

Bind Ghost
Duration (Days), Rank Acolyte, Resist (Willpoeer)
Bind Ghost takes the soul of a creature or person just slain, and temporarily turns it into a Haunt (see page l50) bound to the place of its death. The miracle is usually performed on animal sacrifices or willing volunteers, but in cases where the victim does not wish to be so bound they are permitted the opportunity to resist.
Eor the duration of the miracle the ghost must obey commands given to it by the theist. However, the way it performs its duties is guided by the nature or personality of the victim. Once the miracle ends, the soul is freed from all obligations, and permitted to depart to its intended afterlife. The theist is limited to binding souls whose POW is no more than twice the Intensity of the miracle.

Bless Crops
Area (£ens of Metres), Duration (Mont7s), Rank Acolyte
When cast on cultivated farmland this miracle protects the crops within its area against naturally occurring bad weather, blight, and insect infestation, guaranteeing a nominal harvest if the magic is maintained from sowing to harvest. Bless Crops can also provide protection against magical disasters, provided the Magnitude of the adverse magic does not exceed that of the blessing.

Breathe Water
Duration (Hours), Rank Initiate
Breath Water permits the recipient to breathe water (the subject will still be able to breathe air as well) for the duration of the miracle. It also protects against pressure if diving deep below the surface of a lake or the sea. Under the influence of this miracle the recipient can speak and cast magic as normal.

Call Winds
Area (Wilometres), Duration (Hours), Rank Acolyte
This miracle permits the theist to bend the winds to his will. The maximum strength of winds they can unleash depends on their cult rank. Acolytes can control or summon up to Strong Breezes, Priests up to Moderate Gales, and High Priests up to Storms (see Weather page 84). If the caster can control the wind he may reduce it to a complete Calm or change its direction if desired. If two or more weather magics are in contest over control of the winds, the spell or miracle with the greatest Magnitude takes precedence.

Chameleon
Duration (Minutes), Rank Acolyte
This miracle permits the recipient to fade into the background, becoming near invisible to normal observation. However Chame- leon is only effective when present in an environment specific to the nature of the cult. The Chameleon miracle provided by a syl- van cult, for example, would only be effective in woods and forests; whereas a thief cult might instead provide Chameleon which works in darkness and shadow.
Whilst the recipient remains motionless, crouched or flattened against the terrain, they cannot be spotted by normal Perception rolls relying on vision. If they move however, the constantly shifting patterns across their body will reveal them to sharp sighted individu- als. In these circumstances any attempt to interact with the recipient
– whether observing where they go, attacking, parrying, and so on – inflicts a penalty against the observer of one difficulty grade per four points of Intensity. Creatures with other primary senses or observers with magical perceptions are immune to this miracle.

Clear Skies
Area (Wilometres), Duration (Hours), Rank Acolyte
This miracle grants a reprieve from cloudy or overcast weather. Rain dwindles, sweltering humidity is reduced, and dark clouds sep- arate to reveal the sky. The scale of the effect depends on the cult rank of the theist. Acolytes can disperse up to Heavy Cloud cover and Moderate rains, Priests up to Moderately Overcast cloud cover and Very Heavy rains, and High Priests up to Storm Clouds and Deluges (see Weather page 84). Clear Skies cannot alter magical- ly-created weather effects of a greater Magnitude.

Cloud Call
Area (Wilometres), Duration (Hours), Rank Acolyte
This miracle gathers together shreds and wisps of cloud, weaving them together to bring rain, block out the sun or even form con- cealing fogs. Like Clear Skies the extent of the effect depends on cult rank. Acolytes can create Heavy Cloud cover, Moderate rains or mist, Priests can gather up to Moderately Overcast cloud cover, Very Heavy rains or thick fog, and High Priests up to Storm Clouds, Deluges and Pea-soup fogs (see Weather page 84). Cloud Call can- not alter magically-created weather effects of a greater Magnitude.

Consecrate
Area (£ens of Metres), Duration (Mont7s), Rank Acolyte
Consecrate is vital to the creation of sanctified ground, upon which theists may communicate with their gods. It is usually as fun- damental a part of a shrine or temple foundation as its cornerstone, but may actually be cast almost anywhere providing some form of temporary altar or image of the deity is erected prior to the casting.
The minimum labour required to create a temporary sanctuary depends on the setting, but it should be significant enough to be considered a major effort; for example an entire day of collecting stones and rocks to form a crude altar. In exceptional circumstances it can be cast on cult artefacts.
The effects of the miracle are many fold. Not only does the con- secrated area permit cult worshippers to recharge their Devotional Pool (see page l80), but it also allows for a number of additional cult miracles (up to the consecration's Intensity) to be embedded or bound to the area, extending their duration (or held readiness) to that of the Consecrate.
These extra miracles need not come from whoever performs the consecration, but the cult rank of the magic cannot exceed that of the consecrating acolyte or priest. Eurthermore, each embedded miracle counts against the devotional pool of whichever theist cast it, until the Consecrate itself expires or, if of Instant duration, the miracle is triggered.
Such is the strength of the divine presence within the sanctified area, that requesting miracles from unaligned gods whilst inside the perimeter of the consecration becomes more difficult. Exhorting the deities of neutral cults suffer one grade of difficulty, whereas those of hostile cults are two grades harder.

Corruption
Duration (Hours), Ranged, Rank Acolyte, Resist (Endurance)
This dire miracle is used as a curse against enemies or those that transgress cult tenets. If the target of the spell fails to resist, they begin to deteriorate physically in a manner suitable to the god. This could be anything from pestilent boils, vegetative outgrowths or even a slow transformation of flesh to sand.
At the end of each hour, the victim must make an unopposed Endurance roll and depending on the success level, suffer the following:
<ul>
<li>If the roll is a critical success, the victim takes no damage</li>
<li>If the roll is successful, the victim sustains ld3 points of dam- age to every location</li>
<li>If  the roll fails, the victim sustains ld6 points of  damage to every location</li>
<li>If the roll is fumbled, the victim dies in a horrific transforma- tion of their body</li>
</ul>
Those who realise what they have contracted either seek out someone capable of dispelling the curse, or return to the cult temple, begging for forgiveness and premature cessation of the punishment.

Cure Malady
Duration (Instant), Rank Initiate
This miracle cures the effects of any mundane disease or poison afflicting the target; or magical ones whose potency is less than the value of the Devotion skill of the caster. If the recipient is suffering from the possession of a Disease Spirit, the spell exorcises the hostile spirit provided its Intensity does not exceed half the Intensity of the miracle (rounded up). Eor example, an Intensity 5 Cure Malady can exorcise any Disease Spirit of Intensity 3 or less.

Cure Sense
Duration (Instant), Rank Acolyte
Cure Sense enables the theist to cure a specific type of sensory injury such as deafness, blindness, and so on. The effects of the mir- acle are permanent.

Dismiss Elemental
Duration (Instant), Ranged (£ens of Metres), Rank Initiate, Resist (Willpoeer)
Dismiss Elemental may be cast against Gnomes, Salamanders, Shades, Sylphs or Undines. The spell affects an elemental of up to l cubic metre in size per point of Intensity. Eailure to resist the spell causes the elemental to be dismissed, leaving the material substance of its body in place.

Dismiss Magic
Duration (Instant), Ranged (£ens of Metres), Rank Initiate
Dismiss Magic may be cast against either a general target, or a specific miracle or spell. Dismiss Magic will eliminate a combined Magnitude of spells equal to its own Magnitude. A spell cannot be partially eliminated. When used against a spell of equal or lower Magnitude which normally counters magic (such as Absorption, Spell Resistance or Reflection) then Dismiss Magic takes precedence. If not aimed at a specific spell, Dismiss Magic starts with the most powerful magic affecting the target. If it fails to eliminate any spell (because the spell's Magnitude is too high), then the miracle
ends, and no more spells will be eliminated.
Dismiss Magic may be fired defensively to neutralise incoming offensive spells, by using the Counter Spell reactive action.

Earthquake
Area (Tens of Metres), Duration (Instant), Rank Priest, Resist (Evade)
Earthquake causes a ground tremor capable of knocking people from their feet and collapsing rigid buildings. At the very minimum, failing to resist the miracle causes the victim to fall prone. If located within a building, built up area or some vulnerable location (such as a forest or beneath a cliff), failing to evade also indicates that the person is struck, and trapped by falling debris. Eor secondary effects, consult the following table. Use the size of the damage dice in a Contest of Strength (see Brawn) to determine the difficulty of being extracted from the wreckage.
<table>
<tr>
<th>
    Intensity
</th>
<th>
    Secondary Effects
</th>
<th>
    Potential Damage
</th>
</tr>
<tr>
<td>
1</td>
<td>
Suspended obhects swing</td>
<td>
None</td>
</tr>
<tr>
<td>
2</td>
<td>
icately balanced objects toppleDel</td>
<td>
None</td>
</tr>
<tr>
<td>
3</td>
<td>
Walls and buildings creak</td>
<td>
None</td>
</tr>
<tr>
<td>
4</td>
<td>
Plaster and glass windows crack and other tall objects  quiver dramatically</td>
<td>
None</td>
</tr>
<tr>
<td>
5</td>
<td>
Heavy furniture moved, wall mounted objects fall, cracks open in walls</td>
<td>
None</td>
</tr>
<tr>
<td>
6</td>
<td>
Modest buildings of earth, wattle and daub or mud brick partially collapse. Minor branches fall.</td>
<td>
1d2 damage to a single location</td>
</tr>
<tr>
<td>
7</td>
<td>
Heavy furniture overturned. Buildings of earth, wattle and daub or mud brick destroyed. Buildings of solid timber or masonry partially collapse. Fall of columns, statuary and boundary walls. Major tree limbs fall.</td>
<td>
1d4 damage to a single location</td>
</tr>
<tr>
<td>
8</td>
<td>
Modest buildings collapse. Ground cracks conspicuously, rockfalls from steep slopes. Undeground pipes and sewers broken. Wooden bridges collapse. Small trees topple.</td>
<td>
1d6 damage to a single location</td>
</tr>
<tr>
<td>
9</td>
<td>
Well constructed buildings collapse. Large scale fortifications, city walls and stone bridges damaged. Ground badly cracked. Landslides and avalanches considerable. Big trees topple.</td>
<td>
1d8 damage to two locations</td>
</tr>
<tr>
<td>
10</td>
<td>
Few, if any, structures remain standing. Tunnels and caves collapse. Broad fissures in ground.
Huge trees topple.</td>
<td>
1d10 damage to three locations</td>
</tr>
<tr>
<td>
11+</td>
<td>
Total destruction, even colossal stone monuments suffer partial collapse. Cliffs and mountain flanks shatter.</td>
<td>
1d12 damage to three locations</td>
</tr>
</table>

Elemental Summoning
Duration (Hours), Ranged (Metres), Rank Initiate
This miracle calls up an elemental associated with the cult to assist as a personal guard or servant. Eor example cults associated with the God of Storms would summon sylphs. The miracle sum- mons an elemental of one cubic metre per point of Intensity in ld3 Combat Rounds, which remains under the command of the theist for the entire duration but cannot stray further than the range. Eor obvious reasons, the caster must have access to the same volume of the elemental's material to cast this spell successfully. If less mate- rial is available, then the caster can summon a smaller elemental if desired.

Entangle
Duration (Minutes), Ranged (£ens of Metres), Rank Acolyte, Resist (Evade) Entangle animates natural vegetation so that it lashes about, snagging and gripping the target. The victim must resist the miracle
or be held immobile for its entire duration.

Enthrall
Duration (Hours), Rank Initiate
Enthrall increases the recipient's sexual attraction, making all those naturally interested in the recipient friendlier and more focussed upon them – which could be a very good or very bad thing depending on the circumstances. Members of the opposite sex (or those of the same sex that would find the target sexually attractive) who attempt to resist any Influence or Streetwise rolls from the recipient suffer one grade of difficulty. Resisting Seduction attempts are treated as two grades harder.

Excommunicate
Duration (Instant), Ranged (Metres), Rank Priest, Resist (Willpoeer)
Excommunicate can only be called down upon a worshipper of the caster's cult. It severs the mystical link the worshipper shares with his god, causing the target's devotional pool to be drained of all Magic Points, and permanently removing access to miracles from that cult. Unless the target can make amends for whatever transgres- sion caused the excommunication to be cast in the first place, their cult specific skills of Devotion and Exhort become mere academic knowledge with no power.

Exorcism
Duration (Instant), Rank Acolyte, Resist (Willpoeer)
By means of this miracle, the theist calls upon their god to drive out a spirit currently possessing a corporeal being. Whether the pos- session is dominant or covert is immaterial. The magic exorcises spirits with an Intensity of up to half the Intensity of the miracle. What occurs next depends on the attitude and type of spirit, but belligerent ones with the power to discorporate may be tempted to engage other nearby targets in Spirit Combat. Thus this spell can be potentially dangerous for the caster or his fellows.

Extension
Duration (Special), Rank Priest
Extension lengthens the duration of any miracle with a non-in- stantaneous duration, for as long as the caster wishes to maintain it. Extension can be cast any time, provided the miracle being extended is still functioning. Other than reducing the theist's devo- tional pool by several Magic Points (three for Extension, and one or more for the extended miracle) the miracle has no other mainte- nance requirements; unless the Games Master wishes to add any to match his setting.

Fear
Duration (Minutes), Ranged (Metres), Rank Initiate, Resist (Willpoeer)
This miracle causes the target to be gripped with overwhelming fear. Targets which fail to resist will flee in terror away from the theist, and avoid engaging in combat unless brought to bay. It has no effect on unconscious targets, targets without an INT or INS Char- acteristic, or targets that are currently under the effect of another emotion-controlling spell of higher Intensity.

Fecundity
Duration (Mont7s), Rank Acolyte
When cast on a person or creature, Eecundity will – depending on its sex - ensure it will bear or sire offspring the next time it per- forms a reproductive act. Provided the miracle is maintained for the full term of gestation or pregnancy, the progeny will be born healthy. Eecundity also provides the antenatal young protection against mag- ical curses, provided the Magnitude of the adverse magic does not exceed that of the miracle.

Fortify
Area (£ens of Metres), Duration (Instant), Rank Initiate, Resist (Evade)
Eortify strengthens large scale constructions, making them more resilient to damage from natural disasters, siege weapons, and mag- ical attack. The miracle adds its Intensity to the natural Armour Points of all buildings and walls within its area of effect. Offensive magic which seeks to damage or modify a construction under the protection of Eortify has its Intensity reduced by that of the Eortify miracle.

Growth
Area (£ens of Metres), Duration (Hours), Rank Priest
Growth accelerates the growing speed of vegetation, ageing it by one year for each hour until the miracle concludes. Under its effects, trees and bushes can increase in size and verdure dramati- cally, although at the cost of wildly sprawling, tangled proliferation of every plant within the area of effect. Repeated use of this miracle can potentially grow a thick forest over what had been open fields a few days previously.

Harmonise
Duration (Minutes), Ranged (£ens of Metres), Rank Initiate, Resist (Willpoeer)
Harmonise causes the target to do exactly what the theist does. If not resisted the victim must mimic every physical move, albeit in a jerky, almost puppet-like manner. It only works on beings with roughly the same physiology as the caster; with limbs or locations not shared by both participants remaining unaffected by the magic. The miracle only controls gross motor skills, and does not permit control of the victim's speech. Use of this magic can humiliate someone from afar, or perhaps even force them into performing a murderous or suicidal act.
If Harmonise is used to force the subject to attack or defend, the combat style rolls are automatically one grade harder to accomplish owing to the jerky movement of the victim.

Heal Body
Duration (Instant), Rank Acolyte
This powerful miracle instantly heals all Minor and Serious Wounds suffered by the target. Like Heal Wound, this miracle has no effect on Major Wounds save to stabilise the injury, preventing death. To repair maimed or dismembered body locations requires the Rejuvenate miracle.

Heal Mind
Duration (Instant), Rank Acolyte
This miracle removes all madness and mental derangements from a single target. In the case of magically-induced madness, the spell works if its Magnitude is equal to or greater than that of the magical disorder.

Heal Wound
Duration (Instant), Rank Initiate
Heals a single body location back to its full Hit Points, provided the injury is no more severe than a Serious Wound. It has no effect on Major Wounds save for stabilising the injury, preventing death.

Heart Seizure
Duration (Instant), Ranged (Metres), Rank Priest, Resist (Endurance)
Another dreadful miracle known to the darkest gods, whoever suffers this dire magic feels the veritable hand of the deity reach within his chest, squeezing his heart or perhaps tearing it out com- pletely. Those that fail to resist the miracle suffer a fatal heart attack and die instantly. If the resistance roll succeeds, the target still suf- fers a number of Hit Points damage equal to Intensity of the spell, directly to the location where their heart is contained, normally the chest for humanoids. Creatures without hearts are immune to this miracle.
Different forms of this miracle exist, affecting different organs according to the nature of the deity offering it (Brain Seizure, for example).

Illusion
Area (Metres), Duration (Hours), Rank Initiate, Resist (Special)
Illusion is used to change the sensory projections of an area or single target, making it seem to be something completely different. Eor example a tiger can be made to look like a harmless cat, sound like it meows when it roars, and feel silky soft instead of coarse wiry fur. The theist can adjust one sensory projection per two points of Intensity. Once set, the illusion can no longer be modified.
The largest target which can be affected must be able to fit within the perimeter of the miracle. Unwilling living targets may resist with Endurance. Observers who interact with the illusion are permitted an opposed Willpower roll against the miracle, in order to resist any debilitating psychosomatic effects it creates, e.g. deafness, pain, nausea. Whilst the illusion itself is incapable of causing harm, the underlying target or area remains as dangerous as it was before the miracle.

Lay to Rest
Duration (Instant), Rank Initiate
This miracle is used to ensure that the soul of a recently killed person or creature reaches a deserving afterlife. Its primary purpose is to prevent angry, possibly coerced victims returning from death as vengeful spirits or reinhabiting their bodies as corporal undead.

Leeching
Area (£ens of Metres), Duration (Minutes), Rank Acolyte
Using the blood of sacrifices scattered over an area, this mir- acle disrupts the flow of magic which enters the zone, dissipating its power. Within the area all magic, even that of the caster, is sup- pressed by the Magnitude of the miracle. Any encroaching spell whose Magnitude is reduced to zero is rendered inactive until the target of its effect leaves the area. Spells cast within the region with equal or less Magnitude automatically fail.

Lightning
Duration (Instant), Ranged (£ens of Metres), Rank Initiate, Resist (Evade) This miracle causes a sizzling bolt of lightning to either streak down from the sky, or be projected from the hand or weapon of the theist, towards the target. If the bolt is not evaded, it will inflict ld6 damage per two points of Intensity to a random hit location. Nat- ural and worn armour offers no protection against this damage, but magical protection does.

Madness
Duration (Days), Ranged (Metres), Rank Initiate, Resist (Willpoeer)
This miracle infuses the target with gibbering madness. Targets which fail to resist will rant and rave uncontrollably, performing acts of utter insanity in a manner fitting to their personality, plot line and dramatic circumstances. In general, mad characters should be more harmless distractions than ticking time bombs. In the case of player characters, until the Madness subsides or is somehow cured, the insane victim should be placed under control of the Games Mas- ter unless he deems the player is capable of acting out the insanity.

Mindblast
Duration (Days), Ranged (Metres), Rank Initiate, Resist (Willpoeer)
This spell blasts the intellect of the victim, obliterating their sapi- ence. If not resisted, the victim's INT is temporarily converted to animalistic INS, removing from them the power of speech, writing or any other form of communication. It also prevents them from utilising equipment and devices. If forced to fight in this condition, the victim will by default use their Unarmed skill. Although pre- vented from utilising complex thought, it does not limit instinct and base cunning.

Mindlink
Duration (Minutes), Ranged (£ens of Metres), Rank Initiate
This miracle allows mind-to-mind communication, theistic knowledge and devotional pool Magic Points to be shared between participants. Its use is normally restricted to those of the same or closely allied cults, since once the magical link is established; there are no safeguards as to what can be tapped from the participants – all of whom must join the Mindlink willingly.
Mindlink has two main purposes. Either it allows an entire cult hierarchy to support a handful of its priests so that they may cast many miracles, powered by the devotional pools of associates and underlings; or it grants lesser ranked cult members the ability (albeit temporarily) to call forth miracles normally beyond their capability. Each instance of Mindlink connects a pair of individuals in a two way link. Several castings using the same individual but with differ- ent partners will make them the hub of a Mindlink network, able to
draw on the resources of each of the partners.
If a mental or emotion-affecting spell is cast at someone partici- pating in a Mindlink, then everyone else directly linked to them must also resist the spell or suffer its consequences. Although participants in a Mindlink share deliberately transmitted thoughts, they remain their own entity, and may sever their connection to the Mindlink by willing it so on their turn, or by leaving the spell's range.

Mirage
Area (Metres), Duration (Minutes), Rank Initiate
Mirage obscures a region, covering it with strange optical illu- sions, usually via the cult associations of the deity. An earth god might cause clouds of swirling sand which form unsettling faces; whereas a sun deity might infuse the area with blinding, shimmer- ing curtain of light. The effect of this disconcerting obscurement is to conceal precisely what stands within the area, and make ranged attacks extremely difficult. Eiring at anyone within the Mirage suf- fers one difficulty grade per four points of Intensity.

Obliterate
Area (Wilometres), Duration (Instant), Rank Priest, Resist (Willpoeer)
A dire spell to those who seek fame or remembrance after death, Obliterate removes every record of their existence – scouring it from scrolls, clay tablets, carved hieroglyphs, and every other method of inscribing knowledge. In addition the name of that person is wiped from the mind of everyone within range, save for the casting priest, unless they resist the miracle. Although this miracle is normally used to expunge the glory of those whose crimes are so unforgivable that they must be forgotten for all time, some darker gods offer this as a means for their worshippers to maintain secretive anonymity.

Pacify
Area (£ens of Meters), Duration (Minutes), Rank Acolyte, Resist (Willpoeer)
Pacify suppresses aggressive and violent behaviour within its area of effect. Those that fail to resist the miracle are unable to cause harm to another, although they may defend themselves using non-harmful techniques. If unthreatened, those subject to the magic will sheathe or drop weapons, stop belligerent demonstration and cease all arguments. The miracle does not change personal opinion, merely makes it difficult to act in a hostile manner.

Perseverance
Duration (Hours), Rank Initiate
Through this miracle the recipient can channel the strength of his god, becoming inured to the effects of hard labour. Whilst the miracle remains active, the target of this spell will not receive another level of Eatigue, no matter the hardship faced. Perseverance does not grant any additional capability to lift, march or work; it just ensures the recipient will keep on going. This miracle has no effect upon Eatigue lost from asphyxiation or blood loss.

Propitiate
Area (Wilometres), Duration (Weeks), Rank Acolyte
Used by cults who try to appease darker, more hostile deities, Propitiate exchanges regular worship for the agreement to leave a region alone. The precise effect depends on the god being propiti- ated, but the area affected is centred upon the shrine or temple of that cult. Propitiating a lightning deity for example would not nec- essarily prevent storms happening within the radius of the miracle, but no serious fires or injuries would occur from lightning strikes. Similarly the tremors of an earthquake god would still be felt in a city, but no buildings would collapse – assuming the propitiations were maintained of course.

Rain of (Substance)
Area (Wilometres), Duration (Minutes), Rank Priest
This miracle summons dark brooding clouds which then begin to rain a particular, and most likely horrible substance with specific relevance to the cult deity, anything from blood to frogs. The miracle is intended to inspire awe or terror rather than inflict direct harm, so the actual things raining down are relatively harmless. A rain of spi- ders for instance would only produce non-venomous types; a rain of fire would look scary, but as each glowing ember reached the ground it would extinguish. During the event, members of the cult should be treated as having the Intimidate ability (see page hl6).

Raise Undead
Duration (Hours), Ranged (£ens of Metres), Rank Acolyte
Raise Undead uses the physical remains of a corpse to create either a skeleton or zombie. The miracle infuses the corpse with part of the deity's own consciousness, so that it can obey commands, and act with a degree of independent intelligence. However, the skill capabilities of the undead automaton are limited to those of the theist who creates them.
The number of corpses which can be raised is equal to the Inten- sity of the miracle. Each skeleton or zombie also gains a bonus to its STR and CON characteristics, again equal to the Intensity. Thus a theist who exhorted his god to grant him an Intensity 9 Raise Dead, could animate 9 skeletons each with +9 to STR and CON. Only creatures of a SIZ equal or less than the caster's POW can be raised. 

Reflection
Duration (Minutes), Rank Initiate
This miracle reflects incoming magic aimed at the target or his equipment, redirecting it back at the original caster, depending on their relative Magnitudes. It does not have any effect on spells that are already affecting the target, or spells the theist casts upon himself.
If incoming spell's magnitude is less than the miracle, then the spell is reflected and the miracle remains.
Else the miracle is eliminated and the incoming spell takes effect.

Rejuvenate
Duration (Special), Rank Priest
This miracle heals a single body location suffering from a Major Wound, no matter whether it has been crushed, mutilated or dis- membered. The freshness of the injury affects the time taken for the miracle to complete. Provided the recipient is still alive, and the loca- tion was wounded within a number of hours equal to the Intensity of the miracle, then Rejuvenate will heal all the damage instantly.
Beyond this threshold the body part must undergo a more trau- matic repair, which takes a number of days equal to the Hit Points lost on the location. If the miracle is allowed to lapse before the regrowth has completed, the location remains maimed and unus- able, potentially left at a negative Hit Point level which cannot be cured.

Resurrect
Duration (Instant), Rank Priest, Resist (Special)
This miracle can bring the dead back to life by summoning the spirit of the deceased and persuading it to re-enter its body. Eor obvi- ous reasons the theist must cast Resurrect upon the corpse, which must possess at a minimum, those body locations vital for life. If the target died due to some lingering disease, poison or magical curse, the ailment must be eliminated first or the miracle will fail.
Resurrection is not guaranteed. The deceased spirit will often have desires which preclude their return to life. The spirit may fear the hardship of their life, the lingering pain of wounds, persistent illnesses, the feebleness of old age or may even piously wish to reach their loved ones in the afterlife. On the other hand a spirit might wish to return from the dead to protect their family, seek vengeance against their killer or complete a holy quest.
To judge the primary motivation of the spirit, work out which of their passions or devotion skills has the highest value. If this indi- cates that the spirit will be unwilling to return to life, it may attempt to resist the miracle using that particular passion or Devotion skill.
Resurrect must be cast within a number of days equal to the Magnitude of the spell after death, otherwise the miracle automati- cally fails. A resurrected character returns to life with l Hit Point on all extant locations.

Ripen
Area (Metres), Duration (Instant), Rank Initiate
Ripen brings forth a single crop of fruits, tubers, roots, nuts, or seeds from the vegetation within the area of effect. The miracle does not guarantee they are edible since that depends on the plants, but does ensure the crop is at the peak of its ripeness, no matter when during the year the miracle is cast. Ripen cannot cause a plant or tree to give forth more than a single crop annually, so if it is used early during the growing season, the vegetation will spend the remainder of the year recovering.

Sacred Band
Duration (Minutes), Ranged (£ens of Metres), Rank Initiate
When cast upon a group of worshippers the miracle binds the recipients together as a sacred brotherhood, sharing their life force between them. This has little effect until one of their number is wounded, whereupon the surviving brothers spread the effects of the injury between them.
Damage is divided evenly amongst remaining recipients, applied to the same location which was injured. Any Special Effects which occur remain only with the originally wounded band member. Thus
in a band of six temple guardians linked by this miracle, if one is wounded in the arm for 8 points of damage – normally a Serious Wound – the damage is instead split so that the original target and one other suffers h points in that arm, whilst everyone else in the band suffers l point.
The maximum number of brothers who can be bound together in the band cannot exceed the Intensity of the miracle. They must also share the same basic physiology, or the miracle will fail.
The obvious application of the miracle is to augment the physi- cal resilience of a unit of cult warriors in battle. However, it can also be used to strengthen a cult champion whilst the remainder of the pious participants remain safely hidden or out of reach of combat.

Sever Spirit
Duration (Instant), Ranged (£ens of Metres), Rank Priest, Resist (Endurance)
This miracle severs the bond between body and soul, with dire effect. If not resisted, the victim is slain instantly. If however, the vic- tim does throw off the miracle, they still receive l point of damage for every h levels of Intensity to each Hit Location simultaneously – which may, in some cases, still seriously injure or even kill the victim.

Shield
Duration (Minutes), Rank Initiate
This miracle protects the caster from physical attacks. Each point of Intensity grants the recipient one Armour Point on all hit locations. This protection does not stack on top of worn armour, rather it supplants it in those areas less protected than what the mir- acle itself provides. In some circumstances, even if the protective value of the Shield is less than the worn armour, it may still ward against certain types of magical damage.

Soul Sight
Duration (Minutes), Rank Initiate
This miracle enables the recipient to see the magical aura of anyone he looks at, enabling him to discern that creature or spirit's current Magic Points, as well as the nature of any active spells, the source of their magic, and any enchanted items the creature is car- rying. It also permits the recipient to see into the spirit world, and see beyond any visual illusions which may be concealing a creature's true form – although this may not necessarily be a good thing in certain circumstances.

Spirit Block
Duration (Minutes), Rank Initiate
Spirit Block is a powerful way of preventing the malign influ- ences of spirits. The recipient receives complete protection from spirits with an Intensity of up to half the Intensity of the miracle (rounded up). So an acolyte invoking the spell at an Intensity of 7 could protect themselves from Intensity 4 spirits.
This miracle protects against spiritual assault only. Thus it pre- vents discorporation, spirit combat, possession, and the like. On the other hand, it provides no warding against the spells of a Haunt or physical attacks of an incorporated Predator Spirit for example.

Steadfast
Area (Metres), Duration (Minutes), Rank Initiate, Resist (Willpoeer)
Used when facing overwhelming odds or terrifying challenges, this miracle renders those within its area immune to any natural mental or emotional manipulation. Magical attacks which generate a similar effect, such as Eear, Eanaticism, Domination, and the like, must exceed the Magnitude of the miracle to stand a chance of affecting the target.

Sunspear
Duration (Instant), Ranged (£ens of Metres), Rank Acolyte, Resist (Evade) Sunspear summons a shaft of blazing light down from the sky to blast a single target. If not evaded, the scorching light will burn the victim for ld6 damage per two points of Intensity in every hit loca- tion. Natural and worn armour counts against this damage. This
miracle will only function in direct sunlight.

Sureshot
Duration (Minutes), Ranged (£ens of Metres), Rank Initiate
Sureshot magically guides the trajectory of missiles thrown or fired by the recipient so that they almost always hit, no matter the situational modifiers or cover; provided at least some part of the target is visible, and they are within range of both the miracle and the weapon itself. Any failed ranged weapon attack roll is treated as a success instead. Eumbles, normal successes and critical successes remain unaffected. The target of the missile attack can still attempt to Parry or Evade as normal.

Thunderclap
Area (£ens of Metres), Duration (Minutes), Rank Acolyte, Resist (Endurance)
This miracle summons a powerful blast of thunder from the open sky, to smite down foes. All non-cult members must resist the magic. Those who fail are knocked prone by the expanding wall of sound, and struck deaf for the remainder of the miracle. Should anyone fumble the resistance roll against the spell, they are struck permanently deaf. Also, any items of glass or pottery will shatter automatically within the area of the spell.

True (Weapon)
Duration (Minutes), Rank Initiate
True (Weapon) augments the harm the recipient inflicts when wielding a cult-specified close combat weapon. The miracle doubles that type of weapon's damage up to the maximum that the weapon can inflict, and increases its Size by one step for the purpose of over- coming parries. Thus under the effects of a True (Sword) miracle the wielder would roll ld8 twice for a broadsword, but would not receive more than 8 points. Other bonuses, such as Damage Modi- fier, are not affected.`
