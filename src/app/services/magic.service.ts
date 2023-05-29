import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MagicService {
  constructor() {}
}

export const folkMagic = [
  {
    name: 'Alarm',
    tags: 'Special Duration',
    description:
      'Casting Alarm on a location such as a room or small clearing creates a temporary psychic bond between the area and the caster. If the area is accessed by a living creature with a SIZ greater than 1, the caster is automatically made aware that something has transgressed no matter how great the distance. The Alarm is usually a distinct tingling sensation or mental twinge which will awaken the caster. Alarm can also be used on an individual object, triggering when touched or moved.\nThe spell does not determine who or what has crossed the alarmed threshold, and neither does it prevent ingress. It lasts until triggered, but the Magic Point used to cast it does not recover until the spell is dismissed or concludes naturally. Once activated Alarm must be cast again.',
  },
  {
    name: 'Appraise',
    tags: 'Instant, Touch',
    description:
      "Appraise allows the immediate assessment of the quality of physical goods of combined ENC or SIZ equal to the caster's POW. The spell determines whether or not identical looking items are of the same or similar quality, or if one or more is either flawed or of a higher quality. The spell does not work on organic things, only on inanimate objects. Neither does it determine what flaws or enhancements are present; merely that they exist.",
  },
  {
    name: 'Avert',
    tags: 'Instant, Ranged',
    description:
      'Avert is used to dismiss another Folk Magic spell within range. Avert can be cast reactively to neutralise offensive spells, by using the Counter Magic Reactive Action.',
  },
  {
    name: 'Babble',
    tags: 'Resist (Willpower), Touch',
    description:
      'Babble mangles anything spoken by its target. It does not affect what the target is thinking, only what is verbally issued. Thus Babble can seriously disrupt orders being issued by a commanding officer to his troops, but it cannot influence what the commander is thinking or his intentions. Depending on the necessity for verbal components, Babble may be able to adversely influence spell casting.',
  },
  {
    name: 'Beastcall (X)',
    tags: 'Instant, Ranged, Resist (Willpower)',
    description:
      'Beastcall is used to attract a single, specific animal, the type being specified in the spell, within range. The animal summoned cannot be sapient, and it may also resist the spell using its Willpower. If it fails to resist, it is naturally drawn, in a passive fashion, to the caster, whereupon the spell dissipates, and the creature acts as it normally would, finding itself in proximity to the caster. Physical obstacles or adverse actions (such as a wall, river or line of spears, or a harsh yank on a set of reins or leash) also cause the spell to fail.',
  },
  {
    name: 'Befuddle',
    tags: 'Ranged, Resist (Willpower)',
    description:
      'Befuddle causes confusion within the mind of a corporeal target. The subject of the spell has difficulty thinking straight, forgetting where it is, what it is doing, and why – often lapsing into disassociated lines of thought. Befuddled targets can still act in self defence, but cannot initiate any constructive activity until the spell ends. Any sort of attack or threatening action instantly breaks the spell, whether or not it was directed specifically at the befuddled target.',
  },
  {
    name: 'Bladesharp',
    tags: 'Touch',
    description:
      'Bladesharp is cast on edged and piercing melee weapons. It increases the damage of a weapon by one dice step, and incidentally leaves the edge honed after the spell concludes. This spell is often used on tools such as logging axes, ploughs and razors. Thus casting this spell on a dagger increases it to 1d6+1 damage, whereas the same spell on a great axe would increase it to 2d8+2',
  },
  {
    name: 'Bludgeon',
    tags: 'Touch',
    description:
      'Bludgeon is similar to Bladesharp but used on weapons and tools that deal blunt-force trauma rather than cutting or piercing damage. It is normally used to aid with threshing grain, fulling wool, or similar heavy duty work.',
  },
  {
    name: 'Breath',
    tags: 'Touch',
    description:
      "Breath permits the recipient to hold their breath for an extended period, so that they can temporarily venture into harmful environments, such as underwater; or atmospheres tainted by rock dust, gases, smoke or poisons. The spell lasts for a maximum of half the caster's POW in minutes, during which time the recipient cannot speak or the breath is lost, and they immediately begin to asphyxiate (or become poisoned).",
  },
  {
    name: 'Bypass',
    tags: 'Touch, Trigger',
    description:
      "Bypass is used to cross the threshold of an area under the effect of an Alarm spell without triggering the Alarm. When cast the spell is held in preparation, triggering on contact with an Alarm spell. Of course the caster must suspect that an Alarm spell exists in the first place. Bypass does not negate the Alarm, and it must be cast for each crossing of the Alarm spell's threshold.",
  },
  {
    name: 'Calculate',
    tags: 'Instant, Ranged',
    description:
      'Calculate allows the immediate calculation of numbers, weight or size of a thing, be it soldiers amassed in battle formation, the length of a rope or weight of a sack of rice. The spell always yields a precise quantity, but not value or quality. Only items which are directly observable (seen, lifted, smelled, and so on), and within range can be calculated. The spell will work when cast on a container – assuming, of course, that the container is not empty.',
  },
  {
    name: 'Calm',
    tags: 'Ranged, Resist (Willpower)',
    description:
      "Calm attempts to dampen down the passions or the target, perhaps ensuring that a lovesick paramour doesn't press his suit, a frightened rival doesn't scream for help or that weapons are not drawn in anger. A calmed person is not otherwise mentally affected, thus any sort of assault or threatening action still permits the target to defend themselves, and even attack, albeit they will do so in a calm and level headed manner.",
  },
  {
    name: 'Chill',
    tags: 'Instant, Touch',
    description:
      "Chill dramatically reduces the temperature of small objects (with an ENC no larger than a third of the caster's POW) down to the temperature of ice water. Useful for rapidly cooling hot items, chilling drinks, and so forth. The spell does not freeze an object, and neither does it cause any damage to its structure: it merely renders it very cold.",
  },
  {
    name: 'Cleanse',
    tags: 'Instant, Touch',
    description:
      'Cleanse is used to rid an object, person or small area of dirt, grease, grime, bad smells, and so on. It does not organise or tidy the target or area; merely cleans them to a spick-and-span state. This spell is often used to launder clothes. The caster can cleanse an area equal to POW in square metres.',
  },
  {
    name: 'Cool',
    tags: 'Concentration, Touch',
    description:
      "Cool protects the recipient from the effects of muggy atmospheres and heat prostration, guarding them from any Fatigue caused by the natural environment. The spell does not stop the effects of heat related magic, but will make any resistance roll one difficulty grade easier. Someone under the effects of this spell wearing full hoplite armour could march through a tropical rain forest during the height of summer without harm. Cool affects a target of SIZ up to the caster's POW xh.",
  },
  {
    name: 'Coordination',
    tags: 'Touch, Trigger',
    description:
      'Coordination enhances manual dexterity and agility when performing a single task. When cast in preparation it permits the recipient a chance to re-roll a single skill check where coordination is required, such as Acrobatics, Lockpicking and so on. The recipient may choose the better of the two rolls, but the spell is expended in the process.',
  },
  {
    name: 'Curse',
    tags: 'Special Duration',
    description:
      'Curse must be cast in combination with a second spell of a harmful nature. Its one and only effect is to increase the duration of the accompanying spell so that it is continuous. This comes at a cost however, since the Magic Point used to cast the curse does not return until the caster drops the curse willingly, the curse is dispelled, or the spell to which it is bound breaks naturally. Curse is commonly combined with spells such as Befuddle, Demoralise, Dullblade, Repugnance, and so on.',
  },
  {
    name: 'Darkness',
    tags: 'Concentration, Ranged',
    description:
      'Darkness creates an area of shadow, equal to POW in square metres, which suppresses all light within it. This is enough volume to fill a modest room, a length of corridor or form a small cloud if cast outside. All non-magical light, including sunlight, passing into or present within the boundary is reduced to the equivalent of a dim glow.',
  },
  {
    name: 'Deflect',
    tags: 'Touch',
    description:
      "Deflect wards the recipient against tiny impacts of foreign material, such as rain drops, a cloud of midges or even flying grains of sand. The protection is limited to individual objects smaller than a child's fingernail, and thus cannot prevent normal missile weapons from striking a character.",
  },
  {
    name: 'Demoralise',
    tags: 'Ranged, Resist (Willpower)',
    description:
      'Demoralise temporarily fills the target with a sense of despondency towards a particular person, species, situation or object. When confronted with the subject of this despondency, any proactive skill attempts made by the afflicted character related to the source are one grade harder. However a direct assault from the subject instantly breaks the spell.\nThus a character could be given a demoralising dread of heights, ensuring that any Athletic skill used for climbing or Acrobatics skill for balancing would be one difficulty grade harder.',
  },
  {
    name: 'Dishevel',
    tags: 'Instant, Touch',
    description:
      'Dishevel is the reverse of the Cleanse spell. Objects affected are immediately covered in grime, dust, cobwebs, and so forth. The spell can be used to make brand new objects look old and weathered or help prevent normally well turned out people from being recognised. The caster can dishevel an area equal to POW in square metres.',
  },
  {
    name: 'Disruption',
    tags: 'Instant, Ranged, Resist (Endurance)',
    description:
      'Disruption is used for damaging or dissembling physical objects without the need for tools. It is commonly employed to drive off or kill living creatures, such as birds or vermin. When successfully cast, Disruption inflicts 1d3 damage to a single random Hit Location or the overall Hit Points of an object. In both cases the damage ignores any armour or natural protection.',
  },
  {
    name: 'Dry',
    tags: 'Instant, Touch',
    description:
      'Dry removes all extraneous moisture from an object or person, either slicking off to form a puddle or evaporating in a cloud of vapour. It is normally used to dry off after heavy rain or help protect equipment from rotting, but has a number of other versatile uses. The caster can dry an object up to POW xh in SIZ.',
  },
  {
    name: 'Dullblade',
    tags: 'Ranged',
    description:
      'Dullblade is the reverse of Bladesharp reducing the keenness of weapons and tools. It reduces the damage inflicted by the weapon by one step, and can never keep a sharp edge.',
  },
  {
    name: 'Extinguish',
    tags: 'Instant, Ranged',
    description:
      'Extinguish immediately quenches flames and small fires of modest size and heat. It is useful for dousing candles, lanterns, torches or small cook fires, but it will not work on magical or larger, more ferocious conflagrations such as pyres, burning houses or dragon flames.',
  },
  {
    name: 'Fanaticism',
    tags: 'Ranged, Resist (Willpower)',
    description:
      'Fanaticism is the reverse of Demoralise. It grants the target a wildly excessive or irrational devotion, dedication, or enthusiasm for a particular person, species, situation or object. Its effect is to grant the recipient a temporary Passion equal to the Folk Magic skill of the caster. Eanaticism can be used to counter Demoralise, and vice versa.',
  },
  {
    name: 'Find (X)',
    tags: 'Concentration, Ranged, Resist (Special)',
    description:
      "Find has many variations, always specific, and learned as separate spells. Some common examples are given below. It works by attuning to the natural emanations of a creature or thing, alerting the caster to its presence within the spell's range. Find can be blocked by dense or thick materials such as metal, or earth and stone at least one metre thick. The spell cannot discern emotions or thoughts.\nFind Arroes: Locates ammunition shot by hunters, which miss their target.\nFind Flae: Identifies any flaws in an object, such as hidden imperfections or physical damage.\nFind Livestock: Locates a particular type of animal. Can be resisted with Willpower.\nFind Loot: Locates precious metals and gems.\nFind Object: Locates a lost personal possession.\nFind Sickness: Identifies the existence of disease and illness, whether magical or mundane.",
  },
  {
    name: 'Firearrow',
    tags: 'Touch',
    description:
      "Firearrow causes all missiles thrown or fired by the recipient to burst into flame when released. Ostensibly created to act as a signal flare, it has since evolved into a combat magic. Missiles under its effect add an additional 1d3 damage, but are extinguished if they impale flesh. Those that strike flammable material have a chance equal to the caster's Folk Magic skill of setting alight whatever they lodge in, such as wooden shields, thatched roofs, and so on. Wooden ammunition is consumed as part of the spell.",
  },
  {
    name: 'Fireblade',
    tags: 'Touch',
    description:
      'Fireblade is similar to Firearrow but is instead cast on hand tools and melee weapons. The original purpose of the spell is to sterilise surgical equipment, aid in slash and burn agriculture or provide illumination during darkness without the need to carry an additional light source. If cast on a weapon it inflicts an additional 1d3 damage, and has the chance of setting flammable materials alight if held to them for several rounds (see Fire on page 79). Wooden hafted weapons under the effects of Fireblade will be consumed as part of the spell.',
  },
  {
    name: 'Frostbite',
    tags: 'Ranged, Resist (Endurance)',
    description:
      "Frostbite works directly on living, organic tissue, inflicting numbness and pain in one of the recipient's extremities, for example fingers, toes, buttocks, nose & ears, and so on. The caster must either touch a specific extremity or roll randomly if cast at range. If the spell is not resisted the area affected suffers sensory numbness followed by lingering pain for the duration, making skill tests utilising that location one difficulty grade harder. Erostbite does not deal direct damage but makes the affected area of limited use for a while. For instance, a victim suffering frostbite to the buttocks cannot sit without extreme discomfort.",
  },
  {
    name: 'Glamour',
    tags: 'Concentration, Ranged, Resist (Willpower)',
    description:
      'Glamour makes the target alluring so that people are naturally attracted to them. The particular nature of the glamour must be chosen when cast, and can be anything from increased natural beauty, a softer more sultry voice or even a seductively perfumed body scent. Whilst the spell grants no mechanical benefits, it does ensure that the recipient will gain a chance to gather themselves an audience, engage the attention of someone they wish to make contact with, or provide a distraction enabling accomplices an opportunity to perform nefarious deeds.',
  },
  {
    name: 'Glue',
    tags: 'Touch',
    description:
      "Glue cements together two solid, inanimate objects for the duration of the spell, for example a cart wheel to its axle or a door to its frame. Whilst under the effects of the spell the items, no matter how disparate, cannot be parted unless something actively tries to wrench them apart. In this circumstance the spell has a Brawn skill equal to five times the caster's POW, and fails when a superior Brawn is set against it, defeating it in an opposed roll. Once the spell concludes or fails the items part completely unharmed.",
  },
  {
    name: 'Heal',
    tags: '\nInstant, Touch',
    description:
      'Heal has several different effects depending on the nature of the ailment it is being used on. If the subject is suffering from a minor complaint such as a headache, back pain, hangover, cold, warts, and so on, then the symptoms are immediately lifted. Cast on a location suffering a Minor Wound it restores all lost Hit Points instantly. Against Serious or Major Wounds no Hit Points are recovered. However the spell will stabilise locations, stop all bleeding, and prevent imminent death from inattention.',
  },
  {
    name: 'Heat',
    tags: 'Instant, Touch',
    description:
      "Heat dramatically increases the temperature of small objects (with an ENC no larger than a third of the caster's POW) up to the temperature of boiling water. This versatile spell is useful for mulling wine, cooking food without a fire, or warming a bed prior to sleep. It does not affect living tissue although it can affect clothing and armour, heating it to uncomfortable levels.",
  },
  {
    name: 'Ignite',
    tags: 'Instant, Ranged',
    description:
      'Ignite only works on flammable inorganic matter, causing a small object or hand-sized area to burst into flame. Depending on what was set alight, once burning, the flames may then spread unless quenched or countered in some way. This spell is normally used to light candles, torches or lanterns from afar. It can also be used to start a camp or cooking fire in adverse conditions, such as using damp kindling or in strong winds.',
  },
  {
    name: 'Incognito',
    tags: 'Resist (Endurance), Touch, Trigger',
    description:
      'Incognito alters the facial features of the recipient to a bland, unmemorable countenance. It does not affect the voice, mannerisms or physical size/presence of the recipient, but ensures that visually they do not stand out from the crowd.Anyone under the effects of Incognito is actively ignored by those who might otherwise be searching for him; he is simply overlooked and discounted.',
  },
  {
    name: 'Ironhand',
    tags: 'Touch',
    description:
      "Ironhand allows the recipient to hold anything that would otherwise cause damage (such as extremely hot or cold items, or those dripping acid) without causing themselves injury. Thus a user could grasp a brand from a fire, lift a bubbling cauldron from a spit or even reach through a steam vent to grab an object on the other side. It does not grant total immunity from damage, merely stops it from conducting through the skin of the recipient's hands. The spell does not protect anything worn on the hand, so rings, gloves, and such like will suffer the effects of the source.",
  },
  {
    name: 'Knock',
    tags: 'Instant, Touch',
    description:
      'Knock magically unfastens any device that is currently secured with a mechanical bar or lock. It does not work on magically locked objects, only mundane ones. The spell only affects a single fastening, so if there are several locks and bars securing the object, the spell will need to be recast for each one.',
  },
  {
    name: 'Light',
    tags: 'Concentration, Ranged',
    description:
      'Light must be cast on an inanimate object (this could be a branch, sword blade, spear point, torch, and so on). It produces enough light to illuminate an area as though with a lantern. It can also be cast directly against a Darkness spell to counter it. In this case both spells are consumed, leaving the ambient light to illuminate the area.',
  },
  {
    name: 'Lock',
    tags: 'Special Duration, Touch',
    description:
      'Lock magically secures any device that already has a mechanical bar or lock present. A Locked device can be opened only by the caster, and cannot be picked by mundane means (such as by a thief using lock-picks) since the magic renders the mechanism immobile; however it could still be forced open by breaking the object the lock is set into. The magic remains in place until opened by the caster, after which the device must be subject to a further casting of Lock to restore the enchantment. The Magic Point used to cast Lock does not recover until the spell is dismissed or concludes naturally.',
  },
  {
    name: 'Magnify',
    tags: 'Concentration',
    description:
      'Magnify allows the caster to see something twice as close as it really is. Useful for close work as well as out in the field.',
  },
  {
    name: 'Might',
    tags: 'Touch',
    description:
      "Might permits the recipient to engage in impressive acts of physical brawn. It adds the caster's POW to the recipient's STR, but only for the purposes of lifting, breaking, and contests of strength as defined under the Brawn skill. It does not increase the character's Damage Modifier when inflicting combat damage.",
  },
  {
    name: 'Mimic',
    tags: 'Touch, Trigger',
    description:
      'Mimic allows the recipient to perfectly mimic the voice and mannerisms of someone the caster has seen and heard personally. It does not affect their physical appearance.',
  },
  {
    name: 'Mindspeech',
    tags: 'Concentration, Ranged, Resist (Willpower)',
    description:
      'Mindspeech allows telepathy between the caster and a target, enabling verbal intercourse without needing to speak aloud. The caster and target must share the same language, or else the spell will merely transmit unintelligible gobbledegook. Attempting to cast Mindspeech on somebody beyond range automatically fails.',
  },
  {
    name: 'Mobility',
    tags: 'Touch',
    description:
      "Mobility increases the Movement rate of the recipient by 1d3 metres for the spell's duration. It is often used by hunters, herders, and those seeking to escape pursuit.",
  },
  {
    name: 'Pathway',
    tags: 'Touch',
    description:
      'Pathway enables the recipient to more easily travel through heavy vegetation, safe from being scratched, snagged or otherwise hindered. Under its enchantment Movement rates are not reduced in woods, jungles, swamps, and similar overgrown terrain.',
  },
  {
    name: 'Perfume',
    tags: 'Concentration, Ranged, Resist (Willpower)',
    description:
      'Perfume either negates a noxious odour or imbibes an odourless substance with a pleasing fragrance. The spell does not affect the properties of the source of a stench (so a rotting carcass is still rotten) it merely makes its presence tolerable.',
  },
  {
    name: 'Pet',
    tags: 'Concentration, Resist (Willpower), Touch',
    description:
      "Pet allows the caster to take mental control of a small creature, sending it off to scout, fetch or perform some other complex task. It can be cast on any creature neither of whose SIZ and INT characteristics may exceed half the caster's CHA. If the targeted creature is the already the loyal pet of the caster it does not need to resist the spell.",
  },
  {
    name: 'Phantasm',
    tags: 'Concentration, Ranged',
    description:
      'Phantasm allows the caster to weave together insubstantial or near weightless objects so that they take a shape or ghostly form. Thus a spectral figure could be woven from a naturally occurring mist, or a face formed in a pile of dead leaves. Beyond this the spell has little effect, save to frighten, intrigue or disconcert those that view it.',
  },
  {
    name: 'Pierce',
    tags: 'Touch',
    description:
      'Pierce can be cast on any item with a point, helping it to penetrate thick surfaces. It is normally used to help sew leather, punch holes in metal or hammer pitons into stone. Any weapon or tool enhanced with this spell ignores the first two Armour Points of the person, creature or object struck.',
  },
  {
    name: 'Polish',
    tags: 'Instant, Touch',
    description:
      "Polish instantly buffs an object of ENC or SIZ of up to the caster's POW to a high sheen making it glossy, shiny, and highly desirable even if the quality of the article is sub-par.",
  },
  {
    name: 'Preserve',
    tags: 'Instant, Touch',
    description:
      'Preserve prevents organic matter, both vegetable and animal, from bacterial decay and putrefaction for 1d3 months, by sterilising it. If the material is later smoked, pickled or salted it is preserved indefinitely. The spell can halt decay that has begun, but not reverse it. The caster can affect an amount of organic matter with SIZ or ENC equal to their POW.',
  },
  {
    name: 'Protection',
    tags: 'Touch',
    description:
      "Protection is useful in a wide range of tasks where there is a risk of accidental injury such as working in a foundry or mine. The first time the character would normally take damage that penetrates protective clothing or armour, the Protection spell will trigger, and reduce the damage taken by 1d3 points. The spell then dissipates. The spell only protects against physical damage so won't help against events such as fire, choking, and so on.",
  },
  {
    name: 'Repair',
    tags: 'Instant, Touch',
    description:
      'Repair fixes physical damage to an inanimate object. Each separate successful casting repairs 1d3 Hit Points of damage.',
  },
  {
    name: 'Repugnance',
    tags: 'Concentration, Ranged, Resist (Willpower)',
    description:
      'Repugnance twists the appearance of the target so that they cause distaste in all those that see, hear or smell them. The particular effect must be chosen when cast, and can be anything from a great wart on the end of a nose, a high pitched nasal voice or even pungent body odour. Whatever is chosen, it will cause people to turn away from the victim or make excuses so as to leave their presence as quickly as possible.',
  },
  {
    name: 'Shock',
    tags: 'Instant, Ranged, Resist (Evade)',
    description:
      'Shock produces a mild electrical discharge which may be directed at living things. The caster must either touch a specific extremity or roll randomly if cast at range. If the spell is not resisted, the shocked location is stunned for 1d3 Turns; armour does not protect. The spell makes a loud crack when cast.',
  },
  {
    name: 'Shove',
    tags: 'Instant, Ranged, Resist (Special)',
    description:
      "Shove allows the caster to telekinetically move an object by giving it a single crude push. The item is not moved with enough force to inflict damage, and is still subject to gravity. The spell affects an amount of ENC or SIZ equal to the caster's POW. Living targets can resist with either Endurance or Evade.",
  },
  {
    name: 'Sleep',
    tags: 'Resist (Endurance), Touch',
    description:
      "Sleep sends its recipient into a deep, peaceful sleep. It has no effect on creatures with a SIZ greater than the caster's POW. Unless the target resists, it slumbers for a number of hours equal to the half the caster's POW. However the spell takes 1d3 Rounds to take effect before the target falls unconscious. Any attempt to cast this spell in a combat situation automatically fails.",
  },
  {
    name: 'Slow',
    tags: 'Ranged, Resist (Endurance)',
    description:
      'Slow is the direct opposite of Mobility, slowing Movement Rate by 1d3+3 metres, if the target fails to resist.',
  },
  {
    name: 'Speedart',
    tags: 'Instant, Touch, Trigger',
    description:
      "Speedart boosts the velocity of thrown or fired missiles so that they travel farther before losing efficacy. The spell increases the effective range by 1.5 times the weapon's normal distance.",
  },
  {
    name: 'Spiritshield',
    tags: 'Concentration, Resist (Willpower), Touch',
    description:
      "This spell creates a shield around the recipient which deters spirits from entering. Any spirit wishing to attack or possess the recipient must overcome the spell by winning an opposed test of their Willpower against the caster's Folk Magic skill.",
  },
  {
    name: 'Tidy',
    tags: 'Instant, Ranged',
    description:
      "Tidy immediately restores a number of items (up to the caster's POW) within the spell's range to a neat, tidy, and orderly fashion. Items larger than 3 ENC are shifted to a more orderly position but  will require manual intervention to tidy properly.",
  },
  {
    name: 'Tire',
    tags: 'Ranged, Resist (Endurance)',
    description:
      'Tire inflicts one level of Fatigue on the subject unless resisted.',
  },
  {
    name: 'Translate',
    tags: 'Concentration, Resist (Willpower), Touch',
    description:
      'Translate permits the caster to understand any language spoken to him, by setting up a psychic link with the target. The translation provided is often imperfect, as complex terms or concepts cannot be comprehended, but it does allow simple communication. The spell works between sapient creatures with a definite, constructed language, and still relies on being able to see, hear or otherwise perceive the target as in normal conversation. If cast upon a creature of animal awareness, communication is restricted to the simple reception of emotional state.',
  },
  {
    name: 'Tune',
    tags: 'Instant, Touch',
    description:
      'Tune ensures that the musical instrument touched is in perfect pitch no matter the dampness, temperature or its general condition, ensuring that the following performance is unaffected. ',
  },
  {
    name: 'Ventriloquism',
    tags: 'Concentration, Ranged, Resist (Willpower)',
    description:
      'Ventriloquism allows the caster to project their voice anywhere within range. The caster needs only to think the projected words, not actually to speak them physically, which can disconcert those unaware of what is going on. If cast upon a living creature, the caster can take control of their vocal cords, and speak through them instead.',
  },
  {
    name: 'Vigour',
    tags: 'Touch',
    description:
      "Vigour makes the recipient feel alive and energetic, being used to offset the effects of strenuous physical labour. For the spell's duration, all Fatigue effects gained from laborious activity are ignored (but return on the spell's dismissal). It negates the effects of a Tire spell.",
  },
  {
    name: 'Voice',
    tags: 'Concentration, Ranged, Resist (Willpower)',
    description:
      "Voice amplifies the recipient's intonation and delivery so that it becomes compelling when issuing verbal commands. All who can hear the speaker are forced to listen. Their vocalisation also carries across and through even the loudest background noise (howling gales, the roar of a waterfall, the clash of arms on a battlefield) up to a range of ten times the recipient's CHA in metres.",
  },
  {
    name: 'Warmth',
    tags: 'Concentration, Touch',
    description:
      "Warmth protects the recipient from the effects of freezing atmospheres and exposure, and from Fatigue caused by the natural environment. The spell does not stop the effects of cold-related magic cast at them, but will make any resistance roll one difficulty grade easier. Thus a person under the effects of this spell could walk about on a glacier during midwinter in their underclothes without harm. Warmth affects an object of SIZ up to the caster's POW xh.",
  },
  {
    name: 'Witchsight',
    tags: 'Ranged, Resist (Willpower)',
    description:
      'Witchsight allows the caster to see active magic, enchanted items, and invisible entities (although such things are simply shadowy representations) that lie within range and line of sight. It can also penetrate illusions or discern the true guise of shapeshifted creatures. Beings which wish to remain hidden or disguised must win an opposed test of their Willpower versus the casting roll.',
  },
];

export const invocationMagic = [
  {
    name: 'Adhesion',
    description:
      "The mystic can move freely on vertical surfaces, and even move upside down on a ceiling with no special equipment. Such Movement is always at half the mystic's normal Movement Rate.",
  },
  {
    name: 'Arrowcut',
    description:
      'The mystic is able to parry and deflect projectiles (arrows, darts, spears, and so forth) using his bare hands; or weapons not normally permitted to perform such feats, such as swords or whips.',
  },
  {
    name: 'Astral Projection',
    description:
      'The mystic can project a visible, albeit ethereal image of himself to a distance in kilometres equal to his Meditation skill. The Astral Protection acts a conduit for the mystic to communicate with and observe a distant location, but he cannot physically interact with it.',
  },
  {
    name: 'Aura (X)',
    description:
      "The mystic projects a particular kind of aura (Eear, Intimidation, Serenity, Mastery, and so on) that can be used to present a particular aspect to those who behold him. Overcoming the mystic's aura requires an opposed roll of Willpower versus the mystic's Mysticism roll for invoking the trait. The aura affects all things within a radius of the mystic's POW in metres.",
  },
  {
    name: 'Awareness',
    description:
      'The mystic is aware of a particular kind of emanation (threat, love, danger, magic, and so on) within a radius equal to his POW in metres. He cannot gauge specifics; only that the emanation exists and is close by.',
  },
  {
    name: 'Dark Sight',
    description:
      "Allows the mystic to 'see' normally in any level of limited light, even its complete absence.",
  },
  {
    name: 'Denial (X)',
    description:
      'The mystic can deny the effects of one specific environmental condition. Denial (Rain), for example, would keep the mystic dry in even the most intense monsoon; Denial (Air) allows the mystic to forgo breathing for an extended period; Denial (Ealling) would allow the mystic to briefly levitate above the ground; Denial (Sunlight) would prevent the burning, dehydrating effects of the most intense sun.',
  },
  {
    name: 'Earth Sense',
    description:
      'The mystic has a perfect sense of direction, depth and orientation beneath ground, and suffers no penalties to Perception rolls for underground environments.',
  },
  {
    name: 'Echolocation',
    description:
      'The mystic senses his environment through reflections of sonic waves. This means that he can perceive others that may be either motionless or hidden. In such circumstances, using a Stealth roll to attempt to remain unperceived by the mystic is one grade more difficult.',
  },
  {
    name: 'Featherlight',
    description:
      "The mystic's physical weight becomes negligible, allowing him to balance on impossibly thin or slender surfaces, including those that should not be able to support the his mass (twigs, saplings, and so on).",
  },
  {
    name: 'Formidable Natural Weapons',
    description:
      'The hands and feet of the mystic are treated as size Large for the purposes of attacking and parrying in combat.',
  },
  {
    name: 'Heart Slow',
    description:
      "The mystic is able to finely control his heart and metabolic rates, reducing them almost to a standstill. Using this trait a mystic must remain completely inactive for its duration but, to all intents and purposes, has no pulse, no heart rhythm, and organic functions have ceased. He becomes immune to other Life Sense attempts and appears to be dead. Once the trait finishes the mystic's faculties are fully restored.",
  },
  {
    name: 'Immunity (X)',
    description:
      'The mystic is completely immune to one specific type of damage caused by a particular source. This source can be magical, physical, or energy based, but should be quite narrow in scope. Examples include, but are not limited to: cold, fire, electricity, iron, poison, disease, cutting, crushing, falling, impaling, and so on.',
  },
  {
    name: 'Indomitable',
    description:
      'The Mystic is utterly immune to attempts at mind control or domination, including spells and spirit possession.',
  },
  {
    name: 'Life Sense',
    description:
      "In tune with the rhythms of nature, the mystic can determine the vitality of any living thing by touch alone. If the mystic touches another he learns of the target's current injuries, Fatigue level, and whether it is currently afflicted by any poison or disease. The mystic is also aware of any form of life within a number of metres equal to his Willpower skill, which may make Stealth difficult to accomplish.",
  },
  {
    name: 'Magic Sense',
    description:
      "Similar to Life Sense but instead permits the mystic to detect magical emanations over distance. If the mystic touches another he learns of the target's current magic points, carried enchantments, and active spells.",
  },
  {
    name: 'Night Sight',
    description:
      'Allows the mystic to treat partial darkness as illuminated, and darkness as partial darkness.',
  },
  {
    name: 'Pain Control',
    description:
      'The mystic is inured to pain and able to work through its effects. Endurance rolls when experiencing any kind of injury are considered to be automatic successes.',
  },
  {
    name: 'Spirit Sense',
    description:
      "Similar to Life and Magic Sense, but the mystic's senses are attenuated specifically to the activity of spirits and the spirit plane. The mystic can sense what spirits are active within a radius equal to his Willpower in metres and, if he succeeds in an Insight roll, can gauge the general intensity of the spirit entities. Spirit Sense confers no other powers or protection when dealing with spirits.",
  },
  {
    name: 'Squeeze',
    description:
      'The mystic is able to manipulate his body, allowing him to squeeze into recesses and through gaps that would otherwise be impossible. The smallest opening, hollow or volume the mystic may utilise is one third of his SIZ.',
  },
];

export const enhancementMagic = [
  {
    name: 'Action Points',
    description:
      'Each level of intensity increases available Action Points by 1. The additional Action Points can only be used for defensive actions in combat. Thus, a mystic who spends 6 Magic Points to enhance his Action Points from 3 to 5 may only use these additional Action Points to Parry or Evade. He cannot use the additional points to make additional attacks or cast additional magic.',
  },
  {
    name: 'Damage Modifier',
    description:
      "Each point of Intensity increases the Damage Modifier by one step. Thus, at Intensity 3 (for a cost of 9 Magic Points, if available) a mystic's Damage Modifier of +1d2 would increase to +1d8.",
  },
  {
    name: 'Fatigue',
    description:
      "Each point of Intensity negates a level of Fatigue. This attribute can be enhanced pre-emptively in anticipation of becoming fatigued. Thus a 'fresh' mystic who spends 6 Magic Points could grant himself two buffer levels of Fatigue which could be lost before he started feeling the effects of his strenuous activity. At the conclusion of the task any negated levels of fatigue return, potentially causing the mystic to collapse into unconsciousness.",
  },
  {
    name: 'Healing Rate',
    description:
      'Enhanced Healing Rate works slightly differently to the standard Attribute Enhancement rules. The amount of Hit Points healed is not increased, but the speed at which Healing Rate works is. Each level of intensity improves the speed of recovery by one step as follows: Combat Rounds <Minutes <Hours <Days <Weeks <Months. Usually Minor Wounds heal at a rate of 1 Day, Serious Wounds at a rate of 1 Week, and Major Wounds at a rate of 1 Month. Each level of Intensity changes the speed of healing. Thus, at Intensity 2, hit points are recovered at the following speeds: Minor Wounds 1 Minute, Serious Wounds 1 hour, and Major Wounds 1 day. Enhanced Healing Rate rapidly speeds-up recovery but it will not reattach severed limbs or restore the use of maimed ones. A mystic may remain in a healing trance for as long as it takes to fully recover. However he may perform no other tasks during this time.',
  },
  {
    name: 'Hit Points',
    description:
      "Each level of Intensity boosts Hit Points in every location by 1. So an Intensity 4 Hit Point enhancement would raise all Hit Locations by 4 points. These additional Hit Points absorb damage first, before the natural Hit Points are affected. However these temporary Hit Points do not change the Serious and Major Wound boundaries, which remain tied to the mystic's natural Hit Points. Enhancing Hit Points after a Serious or Major Wound is suffered does not permit damaged locations to return to functionality.",
  },
  {
    name: 'Movement Rate',
    description: 'Each level of Intensity increases Movement by 2 metres.',
  },
  {
    name: 'Initiative',
    description: 'Each level of Intensity adds 2 to the Initiative roll.',
  },
];

export const sorceryMagic = [
  {
    name: 'Abjure (Substance/Process)',
    tags: 'Resist (Special)',
    description:
      "Abjure allows the recipient of the spell to abstain from something usually required for life, utterly removing its need (or effect) until the spell ends. Each variant of the spell affects a specific substance or process, which could be anything, including Eood, Water, Breath, Sleep, Dreams, Narcotics, and so on. Due to its flexibility, the Games Master should use common sense when more unusual versions of the spell are used, for example Abjure (Narcotics) will not only remove any desire to take narcotics in the first place, but also ensure any already taken will no longer affect the target. The sorcerer can affect targets with a maximum SIZ of three times the spell's Intensity. If the recipient is unwilling they are permitted to resist using Willpower. Exceedingly rare and exotic versions of this spell exist such as Abjure Pain, Abjure Sensory Perception, and even Abjure Ageing.",
  },
  {
    name: 'Animate (Substance)',
    tags: 'Concentration, Resist (Special)',
    description:
      "Animate quite literally invests an inanimate object with a semblance of life, permitting it to move under its own power. Each variant of the spell affects a specific type of substance, which can be fairly broad in scope. For example wood, stone, fire, darkness, rope, fabric, and so on. The sorcerer can animate an object with a maximum SIZ of three times the spell's Intensity. Insubstantial substances such as air, fire, darkness or clouds are instead measured in terms of volume, with the sorcerer able to affect a number of cubic metres equal to the spell's Intensity. The animated object gains a default Movement Rate of lm, which may be incremented by assigning points of Intensity (on a one for one basis) to movement rather than to the amount of SIZ or Volume affected. Providing they have some degree of flexibility or the ability to extrude portions of themselves, animated objects may perform complex physical manipulations. These are performed by using the sorcerer's own skills, reduced by one difficulty grade. If combined with the appropriate Sculpt spell (see Shaping), the sorcerer can achieve much finer control and ignore this penalty. Where necessary, treatthe object as having a Damage Bonus based on twice its SIZ, or as an elemental of equal volume.\nSorcerers must actively concentrate to cause animated objects to move or perform complex manipulation. If their concentration lapses the object becomes quiescent until the sorcerer can focus his will through it again. Objects which are already under magical control are only affected if the Magnitude of the Animate is equal or greater than the previous effect. If the animated object is carried or worn by a living creature, then it may resist the spell with Endurance. Whilst the spell can be used to discommode/break such objects, their manipulation cannot be used to directly inflict harm on the creature (see Shrink page 174).",
  },
  {
    name: 'Attract (Threat)',
    tags: 'Resist (Willpower)',
    description:
      "Attract makes the recipient of the spell a scapegoat for certain, and usually harmful, occurrences. Each variant of the spell affects a specific type of threat, for instance spells, creatures, spirits or even missiles. Often used as a punitive curse or self-sacrificial gesture rather than an offensive weapon, Attract draws all incidences of its particular threat which pass within a radius equal to the spell's Intensity in metres, redirecting them so that they target the recipient instead.\nThe mechanical effects of the spell depend entirely upon the type of threat:\nI Creatures: Attracts aggressive beasts with a SIZ of up to three times the spell's Intensity.\nI Magic: Attracts offensive ranged magic with a Magnitude equal or less than the spell's Intensity.\nI Missiles: Attracts ranged weapons with a maximum damage (including magical augments) equal or less than the spell's Intensity.\nI Spirits: Attracts aggressive spirits with a maximum Intensity of half the spell's Intensity.",
  },
  {
    name: 'Banish',
    tags: 'Resist (Willpower)',
    description:
      "Banish enables a sorcerer to dismiss a spiritual or demonic entity with a maximum POW of three times the spell's Intensity, back to the Plane from whence it was summoned (or from which it travelled). If the target is unwilling it is permitted to resist using Willpower.\nThis spell does not work on spirits which are residing within a fetish to which they are bound. If brought forth from the object to perform a service, however, the spirit becomes vulnerable to the banishment; which if successful, sunders the binding. Likewise Banish does not work on spirits currently possessing a victim, but only those which are tricked into abandoning the host first.\nBypass Armour\nBypass Armour affects objects, armaments or the natural weapons of creatures so that they pass through armour. The spell allows the weapon or trap to ignore a number of Armour Points equal to the spell's Intensity. This spell also works against magical protection, such as Damage Resistance or Shield.",
  },
  {
    name: 'Bypass Armour',
    tags: '-',
    description:
      "Bypass Armour affects objects, armaments or the natural weapons of creatures so that they pass through armour. The spell allows the weapon or trap to ignore a number of Armour Points equal to the spell's Intensity. This spell also works against magical protection, such as Damage Resistance or Shield.",
  },
  {
    name: 'Castback',
    tags: '-',
    description:
      "Castback shields the recipient from magic in a somewhat haphazard manner, with the chance that any spell cast at them may potentially be reflected back at its caster. The sorcery can only affect spells possessing the Resist trait which have a Magnitude equal to or less than the Magnitude of the Castback.\nIn such cases if the recipient of the Castback fails to resist the incoming spell, then it affects him normally. If on the other hand he succeeds in resisting, the reflected spell is sent back to its caster who in turn must roll to see if he himself suffers its effects!\nCastback has no way of discerning the difference between hostile or beneficent magic, and affects all spells save those the target casts on himself.\nThe recipient cannot exceed a maximum SIZ of three times the spell's Intensity.",
  },
  {
    name: 'Damage Enhancement',
    tags: '-',
    description:
      "Damage Enhancement augments the physical damage inflicted by an object or creature. This can be anything from natural weapons, a two handed axe or even the spikes of a pit trap. The magic increases the minimum amount of damage that is inflicted during a successful attack, raising it to the value of the spell's Intensity if the dice roll is lower. The spell cannot inflict more damage than the weapon is normally capable of.",
  },
  {
    name: 'Damage Resistance',
    tags: '-',
    description:
      "Damage Resistance protects an (entire) object or person against physical damage. It provides the recipient with a number of Armour Points equal to the spell's Intensity. These do not stack with existing protection (whether worn or natural) so that only the highest value protection works.\nThis magic does not necessarily need only to be cast on living creatures. It can just as easily be used to toughen a sword, make a door more difficult to hack through, or render a delicate glass bottle near unbreakable. The target cannot exceed a maximum SIZ of three times the spell's Intensity.",
  },
  {
    name: 'Diminish (Characteristic)',
    tags: 'Resist (Willpower/Endurance)',
    description:
      'Diminish allows a sorcerer to reduce a physical or mental trait of a living target. Each variant of the spell affects a specific characteristic, diminishing it by 2 points per Intensity of the spell – to a minimum of 1. The target must possess the characteristic in question to be effective.\nIf the target is unwilling it is permitted to resist the spell, using Endurance if the spell is affecting a physical characteristic (STR, CON, SIZ or DEX) or Willpower if affecting a mental one (INT, POW or CHA). Note that creatures affected by Diminish (SIZ) actually shrink, rather than becoming wasted and skeletal as with the Tap spell.',
  },
  {
    name: 'Dominate (Creatures)',
    tags: 'Concentration, Resist (Willpower)',
    description:
      "Dominate grants the sorcerer psychic control over a creature of the specific species the spell affects. The spell is limited by the intellect of the target, the caster only able to subjugate creatures with an INT or INS up to twice the spell's Intensity. Those that fall within this range may resist with Willpower.\nWhilst the sorcerer concentrates, he may mentally issue commands to the victim, who (in most circumstances) cannot refuse. If the sorcerer allows his concentration to lapse, the victim temporarily regains volition; at least until the next time the sorcerer re-establishes concentration. Dominate does not grant any awareness of what the target is doing when beyond the perception of the sorcerer. In addition, if the target escapes the Range of the spell they are freed from control, although it can established again if they return.\nCertain circumstances permit a new resistance roll to break the spell, such as acts which run contrary to the target's strongest beliefs or instincts, for example being forced to murder a loved one. In these cases the subjugated victim may resist using a Passion, Oath or some similarly relevant skill. Suicidal commands instantly break the spell.",
  },
  {
    name: 'Draw (Creatures)',
    tags: 'Resist (Willpower)',
    description:
      "Draw summons creatures of a specific type within range towards a target. Each variant of the spell affects a family of species, such as fish, felines or birds. It affects creatures up to a maximum SIZ of three times the spell's Intensity, which may resist the summons using Willpower. Those that fail are drawn towards the target, moving at a natural speed suitable to that type of creature.\nPhysical obstructions may prevent the creatures from reaching the desired location. Upon their arrival, some other magic must be used to control the creatures since Draw provides no protection or domination against them. Aggressive species may potentially rampage or mindlessly attack depending on their natural instincts. \nThe target of the spell may be an object, location or person – although the latter, if unwilling, may also attempt to resist. If successful the target throws off the curse, and the spell fails.\nAlthough the magic may seem extremely potent, it is balanced by the amount of time required to gather together creatures from overly long distances. In addition, interfering with nature on a wide scale often results in unforeseen (and dire) consequences. Thus Draw is most often used for things like: pestering an individual with insects, clandestinely stealing an entire herd of cattle, or blighting a city with a plague of rats.",
  },
  {
    name: 'Enchant (Object)',
    tags: 'Resist (Special)',
    description:
      "Enchant enables a caster to make one of their sorcery spells everlasting, but at the cost of seriously reducing their magical strength. Normally enchantments are bound into inanimate objects, something which will last beyond the life of the sorcerer, perhaps even becoming a legendary object. On the other hand a living target can be enchanted, although the spell is often one of a deleterious nature. A spell which is to be made perpetual must be Combined with the casting of Enchant. In addition, it is limited to possessing only as many points of shaping as the Intensity of the Enchant. The strain of creating the enchantment permanently reduces the sorcerer's Magic Points attribute by the magic point cost of the combined spell. These can be recovered later if the enchantment is unwoven by the original caster or the object (or person) is destroyed. Dismissing or Neutralising an enchantment only suppresses its powers temporarily. It is recommended that only objects be permitted to be enchanted with spells requiring the Concentration trait. Enchantments should be recorded with the Invocation skill of the enchanted spell at the\ntime of its creation, along with whatever shaping was performed.",
  },
  {
    name: 'Enhance (Characteristic)',
    tags: 'Resist (Willpower/Endurance)',
    description:
      'Enhance allows a sorcerer to increase a physical or mental trait of a target. It works in precisely the same way as Diminish, save that it improves a specific characteristic, enhancing it by 2 points per Intensity of the spell – to a maximum of twice the original characteristic value. Malevolent use of the spell may be resisted.\nCareful consideration should be taken before permitting characters access to certain versions of this spell, such as Enhance (DEX, INT or POW), due to the potentially unbalancing nature of these spells.',
  },
  {
    name: 'Enlarge',
    tags: 'Resist (Special)',
    description:
      "Enlarge is the opposite of the Shrink spell. It is used to expand non-living or inanimate objects, the initial SIZ of which cannot exceed a maximum of three times the spell's Intensity. Under its effect, the dimensions and weight of the object are multiplied by a factor equal to the Intensity. For instance a plank of wood subject to an Intensity 7 Enlarge spell it would grow to seven times its length and mass, possibly allowing it to form a bridge.\nNormally objects cannot resist the magic, but if it is carried or worn by a living creature, then the victim may resist the spell with Endurance. Used offensively in this way, the creature has the chance to brace itself or simply drop the object as it expands. Thus whilst having a suit of mail grow to five times bigger and heavier may be a hindering inconvenience, it will not cause direct harm. Additionally, an object will stop growing when it meets too much resistance.",
  },
  {
    name: 'Enslave (Creatures)',
    tags: 'Resist (Willpower)',
    description:
      "Enslave grants the sorcerer power to manipulate large numbers of targets, all of whom must be of the same species as specified by the spell. Instead of crushing the will of its victims, turning them into helpless automatons (as per the Dominate spell), the magic instils a powerful yet wholly artificial zeal or desire within those which it affects – giving them a temporary Passion at a value equal to the caster's Invocation skill. This can be anything from devoted adoration towards the sorcerer to an unremitting hatred for a hitherto friendly nation.\nThe potential number of victims a sorcerer can Enslave is equal to ten times the Intensity of the spell, multiplied by its Targets component; thus if cast at Intensity 7 with four Targets, the spell will actually attempt to affect 280 victims. These are normally gathered in a crowd or restricted area so that both the sorcerer can see them, and they can hear him. The sorcerer can only enslave creatures with an INT or INS up to twice the spell's Intensity. Those that fail to resist will listen to the words of the sorcerer and be influenced by them.\nWhilst under the influence of this spell, victims cannot directly harm the caster, thinking him sacrosanct or a fount of wisdom. However they can baulk at a command if the order brings them into conflict with another Passion of equal or higher value. Enslave is normally used by powerful sorcerers to raise armies, subjugate tribes or corrupt ruling bodies, enabling them to subtly seize power or ensure their own safety in an otherwise hostile society.",
  },
  {
    name: 'Evoke',
    tags: 'Resist (Willpower)',
    description:
      "Evoke brings an extra-planar being to the presence of the caster; which can be anything from a demon or genie, to an intangible spirit. The only requirements are that it cannot be native to the plane of existence to which it is summoned, that it does not possess a POW greater than three times the spell's Intensity, and that the sorcerer knows its true name. For some settings, each incidence of this spell might be specific to a unique individual.\nAlthough Evoke may summon the entity, it does not grant him any power over the extra-planar being. Unless some sort of magical protection or compulsion is used, the sorcerer is completely at the mercy of the entity, relying on ritual tradition or good nature. Of course the being may not necessarily attack or punish its summoner, but few are happy about being yanked from their native plane without some sort of suitable raison d'être or a gift to smooth ruffled feelings.\nSummoned entities only remain in the world for as long as the Duration of the spell. In addition they cannot travel further from the place of their summoning than the spell's Range.",
  },
  {
    name: 'Fly',
    tags: 'Concentration',
    description:
      'Ely enables the recipient to move freely through the air at their own behest. The spell can affect a person, creature or object of a SIZ up to three times its Intensity, granting them a base Movement Rate of 6. Eurther levels of Intensity not allocated to SIZ can instead be used to augment the speed of flight, each point granting an additional 6 metres per round. For instance an Intensity 7 Ely spell could grant a SIZ 14 creature a Movement Rate whilst flying of 18.\nEly requires concentration only when actively moving. If concentration lapses the magic continues, keeping the recipient hovering aloft; although if travelling at high speed it might take a round or two to coast to a stop.\nIf the spell is used on a beast of burden or an object used to support others (such as a carpet) it must be capable of lifting the combined SIZ of both the creature or object, and those mounted upon it. Otherwise it either fails to take off, or sinks towards the ground at a rate deemed fitting by the Games Master.',
  },
  {
    name: 'Haste',
    tags: '-',
    description:
      "Haste augments the Movement Rate of whatever it is cast on, whether a person, creature or object. The spell can affect targets up to a maximum SIZ of three times the Intensity of the spell. Under its effect, the recipient's Movement Rate is increased by an amount equal to the Intensity. If the target is an inanimate object, it increases the top speed of the vehicle or vessel, but does not provide motive power.",
  },
  {
    name: 'Hide Life',
    tags: '-',
    description:
      "Hide Life conceals the recipient's soul in a specially prepared object called a soul jar, which can take any form the caster desires. It works only on targets with a maximum POW of up to twice the Intensity of the spell. Under its effects the recipient loses a single Hit Point from every location, but in exchange cannot be killed. Each time they suffer an injury, affliction or spell which would normally slay them, at the moment of death their body discorporates and reforms next to the object in which the life force is stored. \nIt takes the body a period of one month divided by the Intensity of the spell to fully reform and heal. Conversely, if the recipient ventures further away from its soul jar than the Range of the spell, it begins to degenerate, suffering damage in reverse. Dying beyond the reach of the spell is permanent.\nHide Life can be dismissed or neutralised, but requires the counter-magic to be cast directly onto the soul jar, which is normally well hidden or protected. The only other way of ending the spell is to smash the object itself, which may prove hard if it is carved or fashioned out of exceptionally durable material. Although Hide Life prevents death, it does not cease ageing, as many sorcerers who later become withered liches have discovered to their cost.",
  },
  {
    name: 'Hinder',
    tags: 'Resist (Endurance)',
    description:
      "Hinder reduces the Movement Rate of whatever it is cast on, in a similar manner to Haste. The spell can affect targets of up to a maximum SIZ of three times the spell's Intensity. Those that fail to resist are slowed by a number of metres equal to the Intensity. However, a target's Movement Rate cannot be lowered to less than 1 metre per round with this spell.",
  },
  {
    name: 'Holdfast',
    tags: 'Resist (Endurance)',
    description:
      "Holdfast magically adheres an object (of a SIZ up to three times the spell's Intensity) to another surface. The bonding is unbreakable by normal means, save for the destruction of the target or the surface it is bonded to. It can only be dispelled by magic if the counter spell can overcome the Magnitude of the Holdfast.\nThe materials of the two surfaces make no difference to the spell. However, if the target is a living being, it is permitted to resist using its Endurance. This magic is often used to seal doors into their frames, stick weapons into scabbards, or even fasten thieves to objects they were trying to steal!",
  },
  {
    name: 'Imprison',
    tags: 'Resist (Willpower)',
    description:
      "Imprison creates an invisible barrier around a person or creature, blocking it from leaving the area. The magic only affects corporeal beings with a maximum POW or SIZ of up to three times the spell's Intensity. If either characteristic exceeds the limit the spell fails. The imprisoned creature is permitted a single chance to resist. If they successfully overcome the magic, they can escape.\nDepending on the setting, Imprison may require the area of the imprisonment to be pre-prepared with use of powders, glyphs or geometric designs. It is often combined with the Evoke spell to provide some degree of protection when summoning hostile entities.",
  },
  {
    name: 'Intuition',
    tags: 'Concentration, Resist (Willpower)',
    description:
      "Intuition permits the sorcerer to discern the true emotions and motives of the target, as if he had made a successful Insight roll. The spell can only affect targets with an INT up to twice its Intensity. Although the magic allows a deeper awareness of psychological state, it does not enable the sorcerer to read memories or guarded thoughts. Targets who are aware of the spell may try to veil their feelings, gaining another resistance roll against the caster's Invocation skill, each time they try to deflect the sorcerer's probing.",
  },
  {
    name: 'Mark',
    tags: 'Resist (Willpower)',
    description:
      "Mark is used to magically tag an object with a mystical sigil, so that it may be located, summoned or even targeted by another spell without being in range of the caster's perception. The magic can mark an object of a SIZ up to three times the spell's Intensity. Whilst the caster is within the Range of the spell, he is aware of the object's distance and direction. Whether or not the magical mark is visible depends on the setting, but once placed it cannot be removed until the spell ends. If cast upon a living creature, it may attempt to resist the effects of the spell.\n \nMystic (Sense)\nConcentration\nMystic (Sense) enables the caster to perceive magic using the sense of perception as specified by the spell. This could take the form of seeing auras, hearing faint tinkling, smelling peculiar scents or even feeling his skin crawl.\nDue to the diversity of senses, the magical object need not be in direct perception, but less precise sensory methods may make it difficult exactly to locate the source. The power of Mystic (Sense) permits it to extend into alternate planes, for example the Spirit World, if such exist in the setting.\nThe sorcerer will be able roughly to judge the Magic Points of objects and people to within 1d3 points. If observing a spell or enchantment with an Intensity equal or less than that of the sorcerer's Mystic (Sense), he may discern what the type of magic (Theistic, Mystic, etc), what it does, and the unique signature of whichever cult, guild or tradition cast it – or if already a member of that group, the individual.",
  },
  {
    name: 'Mystic (Sense)',
    tags: 'Concentration',
    description:
      "Mystic (Sense) enables the caster to perceive magic using the sense of perception as specified by the spell. This could take the form of seeing auras, hearing faint tinkling, smelling peculiar scents or even feeling his skin crawl. Due to the diversity of senses, the magical object need not be in direct perception, but less precise sensory methods may make it dif- ficult exactly to locate the source. The power of Mystic (Sense) per- mits it to extend into alternate planes, for example the Spirit World, if such exist in the setting. The sorcerer will be able roughly to judge the Magic Points of objects and people to within ld3 points. If observing a spell or enchantment with an Intensity equal or less than that of the sorcer- er's Mystic (Sense), he may discern what the type of magic (Theistic, Mystic, etc), what it does, and the unique signature of whichever cult, guild or tradition cast it - or if already a member of that group, the individual.",
  },
  {
    name: 'Neutralise Magic',
    tags: '-',
    description:
      'Neutralise Magic suppresses a single spell or miracle on a target, with a Magnitude equal or less than its own. The magic is negated only as long as the Duration of Neutralise Magic, which in most cases is more than enough time for the targeted spell to expire. Magic with a longer duration reinstates itself when Neutralise ends, thus it cannot be used to permanently negate long-running curses or break enchantments for example, but could be used to briefly bring relief or bypass them. \nIf used against spells or miracles which specifically protect against magic (such as Spell Protection or Reflect), Neutralise Magic takes precedence in those situations when the Magnitude of both is equal. Neutralise Magic can be used defensively to negate incoming spells using the Counter Spell reactive action. It affects targets with\na SIZ up to three times the Intensity of the spell.',
  },
  {
    name: 'Palsy',
    tags: 'Resist (Endurance)',
    description:
      "Palsy renders a single random Hit Location on the target completely useless, the affected area twitching and unresponsive. The precise effect depends on the location struck. Being hit in the head causes the victim to become completely incapacitated, the chest results in paralysis from the neck down, the abdomen paralysis from the waist down, and a limb simply ceases functioning.\nThe spell cannot affect Hit Locations which normally possess Hit Points greater than the Palsy's Intensity. Nor can a single casting of the spell be used to target multiple locations on the same victim.",
  },
  {
    name: 'Perceive (Sense)',
    tags: 'Resist (Endurance)',
    description:
      "Perceive grants the recipient a new and unusual sensory perception. This could be anything from Echolocation to X-Ray Vision. The recipient cannot exceed a SIZ more than three times the spell's Intensity and if unwilling, may resist. Each version of the spell relates to a single unique sense, which can be made up by the Games Master or chosen from the Creature Traits table.\nDepending on the setting, the spell may strangely mutate existing sensory organs, or grow exotic new ones, such as giant bat-like ears, delicate antennae or even glowing slit eyes – potentially causing distrust, fear or nausea to observers.\n \nPhantom (Sense)\nConcentration, Resist (Special)\nPhantom produces an illusory effect on a target, tailored to fool a specific sense. There are many versions of this spell, each one affecting a different type of perception. The most common are used to subvert sight, sound, smell, taste and touch; but others exist to fool more exotic senses such as temperature, magic or emotion. Several phantasm spells can be woven together to form a single illusion, using the Combine component.\nIllusions produced by the Phantom spell confuse the senses of those who interact with them, but do not change the underlying reality hidden beneath. As such, phantasms cannot inflict direct harm, but can be indirectly dangerous. For example a visual illusion of a paved floor could hide the existence of a spiked pit beneath it, or the smell and taste of a deadly acid could be hidden under the illusory bouquet of fine wine.\nOf course, illusions need not be used to hide danger but could intimidate or bluff instead. The same visual illusion could make a pony appear to be a deadly sabre-toothed tiger, or turn the rags of a beggar into princely robes.\nDetecting an illusion is not normally permitted unless the observer has good reason to question its validity. The audible and visual phantasm of a tiger cast on a pony will fool almost anyone, yet a dog witnessing the same illusion would notice that the tiger smelled very strongly of horse, and would have a strong suspicion that it was not all it seemed. In such cases the observer may attempt to resist using their Willpower against the Invocation skill of the caster. Resistance rolls are also permitted if the phantasm attempts to aggressively overwhelm those subject to its illusory effects (see below).\nPhantasms can react to their surroundings provided the sorcerer concentrates on the spell. If the caster's attention lapses the illusion enters a relatively static standby mode, still operant but not longer dynamically responding to the environment; so background noises, scents and such like rarely need to be concentrated on.\nFor instance casting the phantasm of a tiger out of thin air would require the caster to concentrate to make it move or respond to attacks; whereas casting the same phantasm on the pony would need no concentration, since all he has done is changed its external appearance, and the animal will move by itself – although cropping grass and fleeing at the first sign of danger might be giveaways.\nPhantom can only be used to replicate senses and memories previously experienced by the caster, or things he can mentally imagine. Thus a sorcerer could create some horrific looking monster with a hundred eyes, but correctly mimicking the taste of Eireberry Juice may be beyond his ability if he hasn't already sampled it. Such minor oversights are often a good way of recognising phantasms.\nThe following guidelines are provided to help judge the effects of particular sensory illusions:\nSight\nCreates a visible yet non-corporeal illusion which cannot exceed a length, height or width of more than the Intensity of the spell in metres. This can range from simply changing the colour of a door to creating a carpet of aggressive, multicoloured snakes which continually wriggle over each other. If used subtly, a visual illusion can help disguise the true appearance of an object or creature, changing skin tones or the pattern of clothing. Creating a fabrication completely out of context with the setting allows the viewer a chance to resist,\nas does physically interacting with it. Animate illusionary creatures use the relevant skills of the sorcerer to perform physical actions; for example, an illusionary giant spider attempting to avoid a thrown javelin would use the sorcerer's own Evade skill to scuttle clear.\nSmell\nReproduces any single scent of something, from a pleasant perfume to the stench of vomit or the smell of cut grass to freshly cooked food. The illusory scent has a detectable radius in metres (to humans at least) equal to the Intensity of the spell. When used creatively, the smell can drive off those who find the odour unpleasant, or cause them to involuntarily gag or choke. Conversely the scent might draw the attention of persons or creatures who find it attractive.\nSound\nGenerates an audible illusion, anything from a faint, distracting whisper to an overwhelming clap of thunder. The sorcerer can influence the nature and volume of the sound so long as he continues to concentrate upon it. Although very loud sounds can be produced, the illusion cannot cause permanent deafness or damage. On the other hand the volume can be high enough to interfere with verbal communication, or hide the sounds of other things happening. Treat the volume to be equal to ten times the Intensity on the Decibel scale. Any task which requires hearing one's own voice or maintaining concentration (such as spell casting), can attempt to resist, or suffer the usual consequences.\nTaste\nProduces any taste the sorcerer has previously encountered, from the most subtle of flavourings to mouth fouling tangs. The target of this spell need not just be food or drink, although that it is primary focus. It can be used to make the skin of a lover taste like lemon zest or be applied to a knife so that whatever it cuts is tainted with the flavour of rotted fish sauce. Using this spell offensively is somewhat difficult, but it might be utilised to cause a faux pas; forcing someone to spit something out unexpectedly, or perhaps make somebody abandon a complete meal, allowing the caster to claim it for himself.\nTouch\nCreates an illusion of tactility, which when combined with other types of phantasm can grant them a greater degree of reality. The sense imposed can range from feathery tickles to resilient impact, although in truth there is nothing actually there. So a target could be goosed from afar or the bite of a phantasmal tiger given crushing force. Indeed the spell is so versatile it can be used to replace the painful lash of a whip with the sense of being gently caressed. Such sensations simply fool those that interact with target, thus the spell cannot inflict, and is itself immune to, damage. Victims may still believe they have been wounded (or not as the case may be), and must resist the spell to avoid psychosomatic effects of receiving wounds, even though they have not suffered any actual harm.",
  },
  {
    name: 'Portal',
    tags: 'Concentration',
    description:
      "Portal creates a magical gateway connecting two places, which when stepped through, allows instantaneous transportation between the caster's side to the terminus, which may be located anywhere within Range. The portal is large enough for objects or creatures with a SIZ up to three times the spell's Intensity to pass through.\nHowever, the portal only remains open for as long as the sorcerer concentrates. If his attention lapses, the portal remains in place, but is impassable.\nThe appearance of the portal usually depends on the setting. Games Masters should decide whether a portal terminus can be placed blindly, whether it relies on close personal familiarity with the chosen location, or requires use of other magic such as Project (Sense) or Mark.\nConversely portals may require a specially enchanted spot or object to function, such as a set of standing stones. Another consideration is whether sensory information can pass through the portal as if it were a window to another place, or if the surface remains mysteriously opaque.",
  },
  {
    name: 'Project (Sense)',
    tags: 'Concentration',
    description:
      "Project allows the recipient to send one of his senses beyond his body in the form of an astral projection. This discorporated ⁵receptor' is both invisible and intangible, permitting it to travel anywhere with no chance of observation save for those with magical perception. Each individual Project spell relates to a specific sense, which is not necessarily limited to just human perceptions. A sorcerer who knows several of these spells can Combine them together, clairvoyance and clairaudience for example.\nWherever the projected sense travels, it relays back its particular sensory information, allowing the recipient to see, listen, touch or so on via the receptor. Whilst one of his senses is projected in this way, the recipient can no longer use it with his physical body. So a sorcerer who projects his hearing off to a distant location becomes deaf until the spell ends or he brings the projected sense back.\nConcentration is required for two aspects of the spell: moving the astral receptor, and attempting a Perception check with the projected sense. Relatively speaking the sense moves quite slowly, with a maximum speed of ten times the spell's Intensity in kilometres per hour. When focus lapses, the receptor remains static but it keeps on relaying ambient information. If for any reason the projected sense is detected, it can be dispelled or even attacked with a magically augmented weapon or spell – which if successful, transfers the magical effect or damage back to the head of the recipient.\nA sorcerer can use Project (Sense) to be able to aim a second spell at a target who is out of direct observation – whether because of distance or blocking obstacles. The piggy-backed spell must also have sufficient Range to reach the target, and cannot possess a greater Intensity than that of the Project spell.",
  },
  {
    name: 'Protective Ward',
    tags: '-',
    description:
      'Protective Ward is an augmenting spell which must be cast in association with one or more other sorcery spells, using the Combine component to meld them together. Its purpose is to form an extended wall to which spells such as Damage Resistance, Spell Resistance or Spirit Resistance can be bound, so that the magic defends an area or volume, rather than individual targets.\nThe ward can cover an area (or encompass a volume) of up to 1 metre per point of Intensity in width, height and depth. Thus an Intensity 6 Protective Ward could be used to create a simple wall 6 metres wide, a trapezoid pyramid measuring 6m along each vertices, or even a hemisphere 6m in diameter. As preparation before it is cast, the ward must be inscribed upon a solid surface, its sigils or lines either drawn, scratched or etched along the perimeter of the area so protected.\nWhen cast, the sorcerer decides in which direction the ward is permeable, if any. Thus a warding could be set up to affect anything entering the warded area, or conversely anything leaving it. In certain circumstances the caster may wish that the magics woven into the perimeter work in both directions.',
  },
  {
    name: 'Regenerate',
    tags: 'Concentration',
    description:
      "Regenerate allows the sorcerer to slowly heal injuries by accelerating the natural healing processes of the target. The magic will counteract bleeding and stabilise a dying target, but cannot repair Major Wounds. Targets regenerate a number of Hit Points per hour equal to the Intensity of the spell. These points may be divided across several locations or all applied to one location at the will of the caster. However, the sorcerer must actively concentrate on the spell for healing to occur. If concentration lapses or the spell is terminated early, the amount of Hit Points recovered is proportional to the time spent regenerating.\nRepulse (Creatures)\nResist (Willpower)\nRepulse is the exact opposite of the Draw spell (see page 168), driving off creatures of a specific type within range of the target. It has a range of useful applications, such as a personal insect repellent or purging homes of vermin. On a larger scale Repulse can keep villages clear of especially dangerous creatures, which might pose a threat to the inhabitants. As a curse it works well too, from driving prey away from a hunter up to the damning of entire cities by repelling people from entering their forbidding gates!\nThe precise nature of the repulsion is left to the caster to decide. It takes the form of some emotive response, for example disgust, nervousness or outright terror.\n \nRevivify\nConcentration\nRevivify is used to animate a dead body, creating a mindless undead automaton such as a skeleton or zombie. The spell requires the relatively whole corpse of a dead creature in order to work, although bodies can be assembled piecemeal from dismembered parts of several less intact carcasses, provided time is spent stitching flesh or wiring bone together first.\nThe sorcerer can revivify corpses with a maximum SIZ of three times the spell's Intensity. The characteristics of the skeleton or zombie are as described in the Creatures chapter, but gain a bonus to STR and CON equal to the Intensity of the spell. All other attributes are based on the original creature.\nBeing mindless, revivified undead rely on their creator to guide them. Thus they act with physical skills equivalent to those of the sorcerer (capped by the value of the caster's Invocation skill), but if he allows his concentration to relax, they lapse into quiescence until actively guided again. Nothing prevents the sorcerer from further augmenting the undead servitor with other magic or arming it, provided it has the physiology to wear or wield such items.",
  },
  {
    name: 'Sculpt (Substance)',
    tags: 'Concentration, Resist (Special)',
    description:
      "Sculpt enables a sorcerer to mould the form of a particular substance, shaping it to his will. Each variant of the spell affects a specific type of substance, which can be fairly inclusive, for instance sand, stone, water, metal, and so on. The sorcerer can sculpt a volume or object with a maximum SIZ of three times the spell's Intensity. Insubstantial substances such as smoke, shadows or mist are instead measured in terms of cubic metres equal to the spell's Intensity.\nConcentration is only required to actively shape the substance, the spell maintaining the new form until the next change the sorcerer wishes to make. At the conclusion of the spell the substance will retain its final form, provided the material is rigid. For instance a hole opened in a wall would remain, but a statue moulded out of water would collapse.\nAlthough sculpt can create any form imaginable, the actual artistic value or architectural strength of the new shape is limited by the appropriate Craft or Engineering skill; thus a sorcerer who tried to repair the hull of a ship with this spell would only be as effective as his Craft (Carpentry), albeit he'd need no tools, and could perform the task in mere moments.\nIf the targeted object is carried or worn by a living creature, then they may resist the spell with Endurance. Whilst the spell can be used to discommode/break such objects, their manipulation cannot be used to directly inflict harm on the creature (see Shrink, opposite). Exotic versions of this spell can be used on living substances, provided the spell can affect the entire plant or creature. Unwilling targets may attempt to resist. No damage is inflicted on those that fail, but their physique and appearance may be warped as the sor-\ncerer desires.",
  },
  {
    name: 'Sense (Object, State or Substance)',
    tags: 'Concentration',
    description:
      "Sense is utilised as a means to detect valuables, lost possessions or hidden objects from afar. Each incidence of this spell senses a specific type of object, physiological status or unique substance. Such categories are usually quite broad, to ensure some degree of versatility. Examples include precious metals, fresh water, weapons, flesh and bone, edible food, or even undeath.\nThe caster must concentrate to detect his spell's objective, which reveals its presence by tweaking one of the sorcerer's primary senses. Thus the location of water might be indicated by a gurgling, tinkling noise which strengthens as the caster draws closer to its source.\nSufficient thickness of interposing material will block the spell, which can penetrate a number of metres of solid wood, earth or water equal to the spell's Intensity. Denser materials such as metal or stone reduce this to a number of centimetres equal to the Intensity. Penetrating magical protections require that the Intensity of Sense exceeds that of the protective spell.\nSense cannot discern more insubstantial things like emotions or intents.",
  },
  {
    name: 'Shapechange (to Creature)',
    tags: 'Resist (Endurance)',
    description:
      "Shapechange morphs the physical body of the target into that of another species. The sorcerer can affect any living creature of a SIZ up to three times the Intensity of the spell. The SIZ of the original form, added to the difference in SIZ between the original and modified form, must be within this range.\nThe magic transforms the target into an average example of the new species. He adopts the physical Characteristics (STR, CON, SIZ and DEX) of the creature assumed, plus whatever inherent attacks and modes of locomotion it possesses. The recipient may use the creature's base skills or his own, if they are better. Magical or supernatural abilities are not granted, and nor are any of the mental characteristics. \nFor example, a sorcerer of SIZ 10 who wishes to change into a lion (average SIZ 22), requires a Shapechange of Intensity 8; whereas if the same sorcerer wished to turn into a rat (average SIZ 1), he would only need an Intensity of 7.\nThere are many variants of Shapechange, each one specific to a species of creature. The categories are quite broad in scope, however, covering an entire family: for example: rodents, canines, snakes, etc. To change into a Wyvern, for example, one would need Shapechange (Draconic); assuming the sorcerer had sufficient Intensity to achieve the new form. The spell only works on living things, which may resist if they are unwilling.",
  },
  {
    name: 'Shrink',
    tags: 'Resist (Special)',
    description:
      "Shrink is used to miniaturise non-living or inanimate objects, the SIZ of which cannot exceed a maximum of three times the spell's Intensity. The manner in which objects decrease their proportions is different to the Diminish spell, since objects targeted with this magic may be quite small and light. Instead Shrink reduces their dimensions and weight by a factor equal to the Intensity. For example a broad sword has a default SIZ of l, but if subject to an Intensity 8 Shrink spell it would be reduced to an eighth of its length and mass, making it much easier to conceal.\nIf the targeted object is carried or worn by a living creature, then they may resist the spell with Endurance. Otherwise the object gets no save against the magic. When used offensively upon worn objects, the targeted item either tears open, squeezes off, or if it is too resilient to break, simply stops shrinking when it meets too much resistance. So using Shrink on a soldier's full helmet might miniaturise it to the point where it is painfully tight and impossible to remove, but it will not inflict any significant harm on its wearer.",
  },
  {
    name: 'Smother',
    tags: 'Resist (Endurance)',
    description:
      "Smother slowly asphyxiates a target, starving it of air so that it collapses choking and gasping. The magic affects targets with a SIZ up to three times the Intensity of the spell. Those that fail to resist begin to suffocate immediately, suffering damage at the start of the next Round (see Asphyxiation page 71). The spell can also be used on flames to extinguish candles, lamps, and even fires of up to 1 cubic metre per Intensity.\nNormally this spell ceases to inflict damage once the victim passes out. Rarer versions possess more dire effects, actually filling the victim's lungs with water, blood, or even sand so that they actually die.",
  },
  {
    name: 'Spell Resistance',
    tags: '-',
    description:
      'Spell Resistance provides the recipient protection against magic\ncast at them. It blocks incoming spells with a Magnitude equal to, or less than, its own. If a spell or miracle manages to overcome this protection, the Spell Resistance suffers no harm, unless of course it itself was the target of magical dismissal.\nThe negative side of Spell Resistance is that it cannot discern between friendly or hostile magic. Thus someone seriously wounded under its protection may need to terminate the spell or be prevented from receiving magical healing. Spell Resistance affects targets with a SIZ up to three times the Intensity of the spell.',
  },
  {
    name: 'Spirit Resistance',
    tags: '-',
    description:
      'Spirit Resistance blocks spirits and intangible entities of other\nplanes from coming into contact with the recipient. The magic blocks spirits of an Intensity up to half the Intensity of the spell. For example, an Intensity 3 disease spirit would be blocked by an Intensity 5 or 6 Spirit Resistance.\nA blocked spirit is unable to touch, discorporate, possess or otherwise engage the recipient in Spirit Combat. Likewise any magic cast by a spirit at the recipient is also blocked unless the Magnitude of the spell exceeds the Intensity of the Spirit Resistance.',
  },
  {
    name: 'Store Manna',
    tags: '-',
    description:
      "Store Manna creates a temporary storage vessel for Magic Points, a reservoir which can charged, then later be called on to power the sorcerer's own spells. It requires an object to be the target of the spell in which the Magic Points are physically stored. This can be anything from an eggshell to an iron idol, but more delicate objects can be prone to breakage. The object can store a maximum number of Magic Points equal to the Intensity of the spell. Travelling further from this object than the Range of the spell cuts the sorcerer off from his Magic Points.\nWhen initially cast, Store Manna has no Magic Points of its own. These must be transferred from other sources; such as voluntary donations from other sorcerers. Depending on the setting, Magic Points might also be gathered from ritual sacrifices, tapping of magical locations, and other more unusual methods (see Where Do Magic Points Come Erom? Page 115).\nIf the spell expires, naturally coming to the end of its duration or from being dispelled (or the object is broken), any remaining Magic Points stored within the object are lost.\nThe sorcerer can only benefit from a single casting of Store Manna at a time, additional castings either not working or replacing the previous incidence of the spell. In addition, the application of the Targets component does not permit multiplication of the Magic Point storage, but simply allows the default number to be split between multiple objects.",
  },
  {
    name: 'Summon',
    tags: 'Resist (Evade)',
    description:
      "Summon brings a non-living, inanimate object to the sorcerer, teleporting it from wherever it previously rested to his hand or body as desired. The magic can summon an object of a SIZ up to three times the spell's Intensity. Usually this is something he can directly perceive with his own senses, although objects residing at greater distances can be summoned via magical observation, or previously prepared with the Mark spell.\nIf the object is something in the possession of a living creature, it may attempt to resist the magical theft by snatching it back or diving away. This spell is often used to call forth prepared equipment the sorcerer does not wish to carry, or to arm himself in a moment's notice. Clothing and armour must be prior mounted on a mannequin for it to be instantly settled about the sorcerer's body. When the spell ends the object returns to the precise location it was summoned from.",
  },
  {
    name: 'Switch Body',
    tags: 'Resist (Willpower)',
    description:
      "Switch Body enables a sorcerer to switch his consciousness with that of another, so that they exchange bodies. The caster can affect targets with a POW up to twice the Intensity of the spell. Unwilling targets who fail to resist become host to the caster's mind, and their own psyche finds itself in the sorcerer's body.\nBoth the sorcerer and the target retain their own skills and mental Characteristics, but gain the STR, CON, SIZ and DEX of the other's body, which may require recalculation of some attributes.\nSince this spell can be used upon creatures as well as sapient beings, the sorcerer takes provisions to ensure his own body cannot suffer harm from the temporary occupant; for instance by leaving it under the supervision of servants or magically binding himself into immobility.\nIf the sorcerer's body is killed whilst switched with a victim, his consciousness will also die when the spell ends. Using this spell a sorcerer could briefly escape the death of their own body in order to wreak revenge. Casting Switch Body as an Enchantment (see Enchant, page 168) can technically allow a sorcerer permanently to inhabit the body of a target and assume its status or influence, if he can carry off the exchange.",
  },
  {
    name: 'Tap (Characteristic)',
    tags: 'Resist (Special)',
    description:
      "Tap is used to drain Characteristic points from victims in order to boost sorcerer's own, potentially achieving superhuman levels. Each version of the Tap spell affects a different characteristic. Targets may willingly submit to the spell or attempt to resist its effects, using Endurance if the spell is affecting a physical characteristic (STR, CON, SIZ or DEX) or Willpower if affecting a mental one (INT, POW or CHA).\nThe number of points drained from each target is equal to the spell's Intensity (down to a minimum of 1 point). The sorcerer however only gains one fifth of these points – up to a maximum of double his original characteristic value. For instance if a sorcerer cast Tap (STR) at Intensity 7 on four targets, each of the victims would lose seven points of STR whilst the sorcerer's own strength would be augmented by +6 points.\nOnce the spell concludes, the characteristic points of all involved revert to normal. Certain versions of this spell such as Tap (INT) or Tap (DEX) can be very potent, especially if combined with Enchant. When using Tap to steal a creature's SIZ, the magic causes the victim to become wasted and skeletal, rather than shrinking them.",
  },
  {
    name: 'Telepathy',
    tags: 'Resist (Willpower)',
    description:
      'Telepathy allows a sorcerer to establish mental two way communication with a target, without the need for shared language or even species. The caster can form the telepathic link with beings of an INT up to twice the Intensity of the spell. Non-sapient creatures use their INT equivalent and not their INS. In this case, communication is limited to the exchange of mental pictures or emotions.\nThe spell also grants the ability to experience memory, if the target is willing to share it. If cast on multiple targets, the sorcerer can decide if everyone connected via the Telepathy can communicate freely, or whether he acts as a hub for numerous private links.\nTeleport\nConcentration, Resist (Evade)\nTeleport enables a sorcerer to instantaneously move the recipient anywhere within the Range of the spell. Several limiting factors apply to this transportation, these being that the destination is in direct observation (or tagged by the Mark spell), there is solid footing and no object bars their arrival; otherwise the spell automatically fails. A sorcerer is limited to teleporting creatures with a SIZ up to three times the Intensity of the spell.\nAlthough the spell permits contiguous jumping until its Duration expires, the recipient is forced to teleport back to its origin before selecting a new destination to travel to. Each jump is treated as a Reactive Action requiring the expenditure of an Action Point, and can be used to avoid attacks in an opposed roll in a similar fashion to Evade. When the spell ends or is dismissed, the recipient returns to his starting point. This occurs even if he is dead.\nTeleport can be further limited by requiring the presence of a certain material or substance at either end of the jump, through which to pass. For example a sorcerer may only be able to pass from one shadow to another. Likewise this could be pools of water, burning fires or even living trees!',
  },
  {
    name: 'Transfer Wound ',
    tags: 'Concentration, Resist (Endurance)',
    description:
      "Transfer Wound allows a sorcerer to transfer physical damage from himself to the target or vice versa. By spending an Action Point and concentrating on his Turn he may move a single wound of damage equal or less than the spell's Intensity between the target and himself.\nWounds must be shifted between identical or at least roughly similar locations, which cause the spell to fail if cast on a target with alien physiology. When the spell ends, transferred wounds remain where they were last shifted. If multiple targets are incorporated, then damage transferred from the sorcerer is divided equally between each recipient.",
  },
  {
    name: 'Transmogrify (to Substance)',
    tags: 'Resist (Endurance)',
    description:
      "Transmogrify converts the base substance of a creature or object to some other material. Each variant of the spell converts targets to a specific type of substance, which can be as broad or narrow as is suitable for the setting, for example salt, mud or even gold! The sorcerer can transmogrify a target with a maximum SIZ of three times the spell's Intensity. Living creatures and magical constructs are permitted to resist.\nThe effect of the spell depends on the substance it was converted to. A solid material such as gold will place a living victim into a state of suspended animation which lasts until the sorcery terminates. Unless defaced, the temporary golden statue reverts back to its original form unharmed. If the substance was ice or salt on the other hand, some wearing might occur due to abrasive winds or melting.\nBeing transformed into a fluid substance usually spells doom for the original target. Objects converted to sand or water collapse under their own weight and may disperse entirely. Those transmogrified into more viscous substances often deform, and living creatures which emerge alive from such an experience are often horribly warped or mutated by the experience.\nWhilst it can be used as a horrible curse, transmogrify is normally used in more productive (or at least inventive) ways, anything from tricking merchants to undermining fortifications. Games Masters should restrict this spell to only the most foul sorcerers if it is likely to be abused for the purpose of killing.",
  },
  {
    name: 'Trap Soul',
    tags: 'Resist (Willpower)',
    description:
      "Trap Soul snares the spirit of a corporeal creature so that at the moment of its death, it can be trapped within a specially prepared object or location. The magic can affect targets with a POW up to twice the Intensity of the spell. Unwilling targets may attempt to resist nefarious use of this spell.\nOnly those beings that die before the Trap Soul spell ends, and whilst still within its Range have their souls imprisoned, unable to depart for the spirit world or afterlife until the object containing them is destroyed, or the spell concludes.\nWhilst held within their prison, the soul is unable to communicate, unless contacted by magic with a Intensity greater than the Trap Soul's Magnitude. Sorcerers specialising in necromancy often combine this spell with Enchant to create immortal oracles, to eternally imprison deadly enemies, or to bind the soul of a slain victim to its own place of death or body, where it endures as a Haunt (see page 150).",
  },
  {
    name: 'Undeath',
    tags: 'Resist (Endurance)',
    description:
      'Undeath enables the sorcerer to turn the recipient into an undead monster, gaining the ability to forgo air, food, water, warmth or rest; to experience immunity to disease and poison; and no longer to suffer the adverse effects of Serious Wounds, fatigue or ageing. In effect they gain the Undead creature trait. All this comes at a cost however; whilst under the effect of the magic, the recipient is infertile, no longer heals, and is incapable of generating Magic Points naturally. The sorcerer can affect living targets with a CON up to three times the Intensity of the spell. Unwilling targets may attempt to resist. Sorcerers who fear death often resort to this spell, and combine it with Enchant to make it permanent, turning themselves into an immortal lich or mummy. Occasionally it is used to impart a terrible curse on those that transgress cult taboos or some equally\nheinous crime.',
  },
  {
    name: 'Wrack (SUbstance or Harm)',
    tags: 'Concentration, Resist (Evade)',
    description:
      "Wrack enables a sorcerer to harm opponents with deadly bolts or waves of sorcerous energy. On his Turn as a Combat Action, he may launch a magical attack against the target or targets, using his Invocation skill as the attack roll, which may be resisted with Evade. Successful attacks strike a random location, the Intensity of the spell denoting the damage it inflicts. Worn armour does not protect, but natural or magical Armour Points reduce damage as normal.\nWrack Damage\nInxensixy\tDamage\t\n1-2\t\t1d2\n3-4\t\t1d4\n5-6\t\t1d6\n7-8\t\t1d8\n9-10\t\t1d10\n11-12\t\t2d6\nThe caster must concentrate to launch a Wrack attack, but can let the spell drop into dormancy to perform other actions in-between each magical assault.\nEach variant of this spell inflicts damage in a different manner, according to the school from which it was learned. For example Wrack (Darkness) taught by the Stygian Path would strike the target with serpent-like tendrils of freezing shadow, whereas Wrack (Death) learned from the Guardians of the Grave, may cause a victim's limbs to rot with necrotic lesions.",
  },
];

export const theismMagic = [
  {
    name: 'Absorption',
    tags: 'Duration (Minutes), Rank Initiate',
    description:
      "This miracle absorbs incoming magic aimed at the recipient or his equipment, converting its energy into Magic Points which then replenish his personal Magic Points attribute, assuming there is space for the additional points. Excess Magic Points garnered through Absorption simply vanish. Absorption does not affect spells already in existence, prior to the miracle's manifestation. The effects of Absorption depend on the relative Magnitude of both itself and the incoming spell. Any spell absorbed by this miracle is cancelled, and has no effect.\nIf the incoming spell has a lower magnitude than the Absorption miracle then the incoming spell is absorbed and the miracle remains.\nElse the miracle is eliminated and the spell takes effect.",
  },
  {
    name: 'Aegis',
    tags: 'Duration (Minutes), Rank Initiate',
    description:
      'Creates or augments a shield which glows with the cult symbols of the deity. The magical shield takes the attributes of a Hoplite shield, although its parrying Size depends on the Intensity of the miracle. Intensity l-h is a Small shield, 3-4 Medium, 5-6 Large, 7-8 Huge, 9-10 Enormous and ll+ Colossal.\nThe Aegis is immune to all damage. If cast upon an existent shield, it is protected until the miracle ends.',
  },
  {
    name: 'Awaken',
    tags: 'Duration (Minutes), Ranged (Tens of Metres), Rank Priest',
    description:
      "Awaken brings part of the god's awareness into its consecrated shrine or temple, enabling the deity to animate its sanctified idol or take control of its sacred animal(s), depending on the nature of the cult. It is normally reserved for cult holy days, except in times of emergency. The embodied god cannot leave the consecrated area, but during that time it can awe its worshippers, express its displeasure or defend its own shrine.\nThe limits of the miracle depend on what is used for the embodiment. An awakened statue or cult idol can have a combined STR+SIZ of up to ten times the Intensity. This value is used to calculate both the idol's Damage Modifier and its Hit Points per location. Its Armour Points depend upon the material it is constructed from, usually 6 for wooden idols, 8 for hollow metal and 10 for stone. The idol performs all actions at the same value as the caster's Devotion skill, has a Initiative Bonus equal to the Intensity, and one Action Point per four levels of Intensity (or fraction thereof). Other physical attributes should be created based upon the shape and size of the idol (see Default Natural Weapons for Unusually Sized Creatures page hhh).\nAwakened creatures are handled slightly differently. Like idols the deity may awaken a creature of up to a maximum STR+SIZ of ten times the Intensity of the miracle. However, if the shrine or temple lacks a giant example of the sacred animal, the deity can instead awaken multiple beasts provided their combined total does not exceed the limit set by the Intensity. Other than that the creature or creatures possess their normal Action Points, Damage Modifier, Hit Points, Initiative Bonus and Armour Points. They perform skills at either their base (or trained) value or at the value of the caster's Devotion skill, whichever is higher.",
  },
  {
    name: 'Backlash',
    tags: 'Duration (Minutes), Ranged (Metres), Rank Initiate',
    description:
      'Backlash makes physical assault upon the recipient extremely dangerous, redirecting an inflicted injury back upon the attacker. The magic only affects wounds that inflict equal or less Hit Points than the Intensity of the miracle – translocating the damage so that it affects the attacker in precisely the same location they struck, ignoring any armour.\nThis miracle affects both hand to hand and ranged attacks, providing the assailant is within range. Even though the recipient may be near immune to injury, it does not provide immunity to any Special Effect they may have suffered as part of the attack.',
  },
  {
    name: 'Beast Form',
    tags: 'Duration (Hours), Ranged (Metres), Rank Acolyte, Resist (Endurance)',
    description:
      'This miracle transforms the target and all his personal belongings into an animal that is sacred to the cult. The target retains his INT, CHA and POW scores, but exchanges his STR, DEX, CON and SIZ scores for average values for that of the animal type, and gains a bonus to each physical Characteristic of +l per point of Intensity. He also gains the natural abilities of the creature. The animal cannot be mystical or magical in any way, and the Games Master should have final say as to what manner of creature would fit a specific cult if it is not obvious.',
  },
  {
    name: 'Behold',
    tags: 'Area (Metres), Duration (Minutes), Rank Initiate, Resist (Willpower)',
    description:
      'Behold summons a vision of what a fellow cult member of lesser rank is currently experiencing. The image requires some sort of cult related paraphernalia in which to manifest, such as a sacred mirror, pool of pure water or even narcotic smoke rising from a brazier.\nThe view provided is limited to the defined area, centred upon the target of the miracle, which may permit identification of their location if enough clues are visible. Behold conveys only a single primary sense, which for most cults is a visual image. Some however, depending on the deity in question, use sound or even scent instead;in which case the medium through which the information is transmitted is different.\nIf the target is either magically protected against scrying by a spell of greater Magnitude, held (or hiding) within the consecrated ground of a different cult, or dead, then the miracle fails. The target of Behold may attempt to resist the miracle if desired.',
  },
  {
    name: 'Berserk',
    tags: 'Duration (Minutes), Rank Initiate, Resist (Willpower)',
    description:
      'The recipient of Berserk is overcome with bloodlust, causing him to disregard his own safety in exchange for being imbued with tremendous stamina and toughness. For the duration of the miracle the Damage Modifier of the recipient is increased by two steps, the Size of his weapon counts as one step larger for the purpose of penetrating parries, and he is immune to all the detrimental effects of Serious Wounds and Fatigue. A Major wound will still incapacitate him. In return the subject may not Parry, Evade or cast any magic while under the influence of Berserk. However the berserker auto-\nmatically succeeds in resisting any Special Effect used against him.\nUnwilling recipients receive a chance to resist. Normally, the recipient remains in the Berserk state for the entire duration of the spell, but Games Masters may allow a Berserk character to shake off the effects with an unopposed Willpower test. At the end of the spell, the recipient immediately suffers twice the deferred Fatigue levels they would have lost during the entire combat.',
  },
  {
    name: 'Bind Ghost',
    tags: 'Duration (Days), Rank Acolyte, Resist (Willpower)',
    description:
      'Bind Ghost takes the soul of a creature or person just slain, and temporarily turns it into a Haunt (see page 150) bound to the place of its death. The miracle is usually performed on animal sacrifices or willing volunteers, but in cases where the victim does not wish to be so bound they are permitted the opportunity to resist.\nFor the duration of the miracle the ghost must obey commands given to it by the theist. However, the way it performs its duties is guided by the nature or personality of the victim. Once the miracle ends, the soul is freed from all obligations, and permitted to depart to its intended afterlife. The theist is limited to binding souls whose POW is no more than twice the Intensity of the miracle.',
  },
  {
    name: 'Bless Crops',
    tags: 'Area (Tens of Metres), Duration (Mont7s), Rank Acolyte',
    description:
      'When cast on cultivated farmland this miracle protects the crops within its area against naturally occurring bad weather, blight, and insect infestation, guaranteeing a nominal harvest if the magic is maintained from sowing to harvest. Bless Crops can also provide protection against magical disasters, provided the Magnitude of the adverse magic does not exceed that of the blessing.',
  },
  {
    name: 'Breathe Water',
    tags: 'Duration (Hours), Rank Initiate',
    description:
      'Breath Water permits the recipient to breathe water (the subject will still be able to breathe air as well) for the duration of the miracle. It also protects against pressure if diving deep below the surface of a lake or the sea. Under the influence of this miracle the recipient can speak and cast magic as normal.',
  },
  {
    name: 'Call Winds',
    tags: 'Area (Wilometres), Duration (Hours), Rank Acolyte',
    description:
      'This miracle permits the theist to bend the winds to his will. The maximum strength of winds they can unleash depends on their cult rank. Acolytes can control or summon up to Strong Breezes, Priests up to Moderate Gales, and High Priests up to Storms (see Weather page 84). If the caster can control the wind he may reduce it to a complete Calm or change its direction if desired. If two or more weather magics are in contest over control of the winds, the spell or miracle with the greatest Magnitude takes precedence.',
  },
  {
    name: 'Chameleon',
    tags: 'Duration (Minutes), Rank Acolyte',
    description:
      'This miracle permits the recipient to fade into the background, becoming near invisible to normal observation. However Chameleon is only effective when present in an environment specific to the nature of the cult. The Chameleon miracle provided by a sylvan cult, for example, would only be effective in woods and forests; whereas a thief cult might instead provide Chameleon which works in darkness and shadow.\nWhilst the recipient remains motionless, crouched or flattened against the terrain, they cannot be spotted by normal Perception rolls relying on vision. If they move however, the constantly shifting patterns across their body will reveal them to sharp sighted individuals. In these circumstances any attempt to interact with the recipient\n– whether observing where they go, attacking, parrying, and so on – inflicts a penalty against the observer of one difficulty grade per four points of Intensity. Creatures with other primary senses or observers with magical perceptions are immune to this miracle.',
  },
  {
    name: 'Clear Skies',
    tags: 'Area (Wilometres), Duration (Hours), Rank Acolyte',
    description:
      'This miracle grants a reprieve from cloudy or overcast weather. Rain dwindles, sweltering humidity is reduced, and dark clouds separate to reveal the sky. The scale of the effect depends on the cult rank of the theist. Acolytes can disperse up to Heavy Cloud cover and Moderate rains, Priests up to Moderately Overcast cloud cover and Very Heavy rains, and High Priests up to Storm Clouds and Deluges (see Weather page 84). Clear Skies cannot alter magically-created weather effects of a greater Magnitude.',
  },
  {
    name: 'Cloud Call',
    tags: 'Area (Wilometres), Duration (Hours), Rank Acolyte',
    description:
      'This miracle gathers together shreds and wisps of cloud, weaving them together to bring rain, block out the sun or even form concealing fogs. Like Clear Skies the extent of the effect depends on cult rank. Acolytes can create Heavy Cloud cover, Moderate rains or mist, Priests can gather up to Moderately Overcast cloud cover, Very Heavy rains or thick fog, and High Priests up to Storm Clouds, Deluges and Pea-soup fogs (see Weather page 84). Cloud Call cannot alter magically-created weather effects of a greater Magnitude.',
  },
  {
    name: 'Consecrate',
    tags: 'Area (Tens of Metres), Duration (Mont7s), Rank Acolyte',
    description:
      "Consecrate is vital to the creation of sanctified ground, upon which theists may communicate with their gods. It is usually as fundamental a part of a shrine or temple foundation as its cornerstone, but may actually be cast almost anywhere providing some form of temporary altar or image of the deity is erected prior to the casting.\nThe minimum labour required to create a temporary sanctuary depends on the setting, but it should be significant enough to be considered a major effort; for example an entire day of collecting stones and rocks to form a crude altar. In exceptional circumstances it can be cast on cult artefacts.\nThe effects of the miracle are many fold. Not only does the consecrated area permit cult worshippers to recharge their Devotional Pool (see page 180), but it also allows for a number of additional cult miracles (up to the consecration's Intensity) to be embedded or bound to the area, extending their duration (or held readiness) to that of the Consecrate.\nThese extra miracles need not come from whoever performs the consecration, but the cult rank of the magic cannot exceed that of the consecrating acolyte or priest. Eurthermore, each embedded miracle counts against the devotional pool of whichever theist cast it, until the Consecrate itself expires or, if of Instant duration, the miracle is triggered.\nSuch is the strength of the divine presence within the sanctified area, that requesting miracles from unaligned gods whilst inside the perimeter of the consecration becomes more difficult. Exhorting the deities of neutral cults suffer one grade of difficulty, whereas those of hostile cults are two grades harder.",
  },
  {
    name: 'Corruption',
    tags: 'Duration (Hours), Ranged, Rank Acolyte, Resist (Endurance)',
    description:
      'This dire miracle is used as a curse against enemies or those that transgress cult tenets. If the target of the spell fails to resist, they begin to deteriorate physically in a manner suitable to the god. This could be anything from pestilent boils, vegetative outgrowths or even a slow transformation of flesh to sand.\nAt the end of each hour, the victim must make an unopposed Endurance roll and depending on the success level, suffer the following:\n<ul>\n<li>If the roll is a critical success, the victim takes no damage</li>\n<li>If the roll is successful, the victim sustains 1\nd3 points of damage to every location</li>\n<li>If  the roll fails, the victim sustains 1d6 points of  damage to every location</li>\n<li>If the roll is fumbled, the victim dies in a horrific transformation of their body</li>\n</ul>\nThose who realise what they have contracted either seek out someone capable of dispelling the curse, or return to the cult temple, begging for forgiveness and premature cessation of the punishment.',
  },
  {
    name: 'Cure Malady',
    tags: 'Duration (Instant), Rank Initiate',
    description:
      'This miracle cures the effects of any mundane disease or poison afflicting the target; or magical ones whose potency is less than the value of the Devotion skill of the caster. If the recipient is suffering from the possession of a Disease Spirit, the spell exorcises the hostile spirit provided its Intensity does not exceed half the Intensity of the miracle (rounded up). For example, an Intensity 5 Cure Malady can exorcise any Disease Spirit of Intensity 3 or less.',
  },
  {
    name: 'Cure Sense',
    tags: 'Duration (Instant), Rank Acolyte',
    description:
      'Cure Sense enables the theist to cure a specific type of sensory injury such as deafness, blindness, and so on. The effects of the miracle are permanent.',
  },
  {
    name: 'Dismiss Elemental',
    tags: 'Duration (Instant), Ranged (Tens of Metres), Rank Initiate, Resist (Willpower)',
    description:
      'Dismiss Elemental may be cast against Gnomes, Salamanders, Shades, Sylphs or Undines. The spell affects an elemental of up to 1 cubic metre in size per point of Intensity. Eailure to resist the spell causes the elemental to be dismissed, leaving the material substance of its body in place.',
  },
  {
    name: 'Dismiss Magic',
    tags: 'Duration (Instant), Ranged (Tens of Metres), Rank Initiate',
    description:
      "Dismiss Magic may be cast against either a general target, or a specific miracle or spell. Dismiss Magic will eliminate a combined Magnitude of spells equal to its own Magnitude. A spell cannot be partially eliminated. When used against a spell of equal or lower Magnitude which normally counters magic (such as Absorption, Spell Resistance or Reflection) then Dismiss Magic takes precedence. If not aimed at a specific spell, Dismiss Magic starts with the most powerful magic affecting the target. If it fails to eliminate any spell (because the spell's Magnitude is too high), then the miracle\nends, and no more spells will be eliminated.\nDismiss Magic may be fired defensively to neutralise incoming offensive spells, by using the Counter Spell reactive action.",
  },
  {
    name: 'Earthquake',
    tags: 'Area (Tens of Metres), Duration (Instant), Rank Priest, Resist (Evade)',
    description:
      'Earthquake causes a ground tremor capable of knocking people from their feet and collapsing rigid buildings. At the very minimum, failing to resist the miracle causes the victim to fall prone. If located within a building, built up area or some vulnerable location (such as a forest or beneath a cliff), failing to evade also indicates that the person is struck, and trapped by falling debris. For secondary effects, consult the following table. Use the size of the damage dice in a Contest of Strength (see Brawn) to determine the difficulty of being extracted from the wreckage.<table><tr><th>    Intensity</th><th>    Secondary Effects</th><th>    Potential Damage</th></tr><tr><td>1</td><td>Suspended obhects swing</td><td>None</td></tr><tr><td>2</td><td>icately balanced objects toppleDel</td><td>None</td></tr><tr><td>3</td><td>Walls and buildings creak</td><td>None</td></tr><tr><td>4</td><td>Plaster and glass windows crack and other tall objects  quiver dramatically</td><td>None</td></tr><tr><td>5</td><td>Heavy furniture moved, wall mounted objects fall, cracks open in walls</td><td>None</td></tr><tr><td>6</td><td>Modest buildings of earth, wattle and daub or mud brick partially collapse. Minor branches fall.</td><td>1d2 damage to a single location</td></tr><tr><td>7</td><td>Heavy furniture overturned. Buildings of earth, wattle and daub or mud brick destroyed. Buildings of solid timber or masonry partially collapse. Fall of columns, statuary and boundary walls. Major tree limbs fall.</td><td>1d4 damage to a single location</td></tr><tr><td>8</td><td>Modest buildings collapse. Ground cracks conspicuously, rockfalls from steep slopes. Undeground pipes and sewers broken. Wooden bridges collapse. Small trees topple.</td><td>1d6 damage to a single location</td></tr><tr><td>9</td><td>Well constructed buildings collapse. Large scale fortifications, city walls and stone bridges damaged. Ground badly cracked. Landslides and avalanches considerable. Big trees topple.</td><td>1d8 damage to two locations</td></tr><tr><td>10</td><td>Few, if any, structures remain standing. Tunnels and caves collapse. Broad fissures in ground.Huge trees topple.</td><td>1d10 damage to three locations</td></tr><tr><td>11+</td><td>Total destruction, even colossal stone monuments suffer partial collapse. Cliffs and mountain flanks shatter.</td><td>1d12 damage to three locations</td></tr></table>',
  },
  {
    name: 'Elemental Summoning',
    tags: 'Duration (Hours), Ranged (Metres), Rank Initiate',
    description:
      "This miracle calls up an elemental associated with the cult to assist as a personal guard or servant. For example cults associated with the God of Storms would summon sylphs. The miracle summons an elemental of one cubic metre per point of Intensity in 1d3 Combat Rounds, which remains under the command of the theist for the entire duration but cannot stray further than the range. For obvious reasons, the caster must have access to the same volume of the elemental's material to cast this spell successfully. If less material is available, then the caster can summon a smaller elemental if desired.",
  },
  {
    name: 'Entangle',
    tags: 'Duration (Minutes), Ranged (Tens of Metres), Rank Acolyte, Resist (Evade) Entangle animates natural vegetation so that it lashes about, snagging and gripping the target. The victim must resist the miracle',
    description: 'or be held immobile for its entire duration.',
  },
  {
    name: 'Enthrall',
    tags: 'Duration (Hours), Rank Initiate',
    description:
      "Enthrall increases the recipient's sexual attraction, making all those naturally interested in the recipient friendlier and more focussed upon them – which could be a very good or very bad thing depending on the circumstances. Members of the opposite sex (or those of the same sex that would find the target sexually attractive) who attempt to resist any Influence or Streetwise rolls from the recipient suffer one grade of difficulty. Resisting Seduction attempts are treated as two grades harder.",
  },
  {
    name: 'Excommunicate',
    tags: 'Duration (Instant), Ranged (Metres), Rank Priest, Resist (Willpower)',
    description:
      "Excommunicate can only be called down upon a worshipper of the caster's cult. It severs the mystical link the worshipper shares with his god, causing the target's devotional pool to be drained of all Magic Points, and permanently removing access to miracles from that cult. Unless the target can make amends for whatever transgression caused the excommunication to be cast in the first place, their cult specific skills of Devotion and Exhort become mere academic knowledge with no power.",
  },
  {
    name: 'Exorcism',
    tags: 'Duration (Instant), Rank Acolyte, Resist (Willpower)',
    description:
      'By means of this miracle, the theist calls upon their god to drive out a spirit currently possessing a corporeal being. Whether the possession is dominant or covert is immaterial. The magic exorcises spirits with an Intensity of up to half the Intensity of the miracle. What occurs next depends on the attitude and type of spirit, but belligerent ones with the power to discorporate may be tempted to engage other nearby targets in Spirit Combat. Thus this spell can be potentially dangerous for the caster or his fellows.',
  },
  {
    name: 'Extension',
    tags: 'Duration (Special), Rank Priest',
    description:
      "Extension lengthens the duration of any miracle with a non-instantaneous duration, for as long as the caster wishes to maintain it. Extension can be cast any time, provided the miracle being extended is still functioning. Other than reducing the theist's devotional pool by several Magic Points (three for Extension, and one or more for the extended miracle) the miracle has no other maintenance requirements; unless the Games Master wishes to add any to match his setting.",
  },
  {
    name: 'Fear',
    tags: 'Duration (Minutes), Ranged (Metres), Rank Initiate, Resist (Willpower)',
    description:
      'This miracle causes the target to be gripped with overwhelming fear. Targets which fail to resist will flee in terror away from the theist, and avoid engaging in combat unless brought to bay. It has no effect on unconscious targets, targets without an INT or INS Characteristic, or targets that are currently under the effect of another emotion-controlling spell of higher Intensity.',
  },
  {
    name: 'Fecundity',
    tags: 'Duration (Mont7s), Rank Acolyte',
    description:
      'When cast on a person or creature, Eecundity will – depending on its sex ensure it will bear or sire offspring the next time it performs a reproductive act. Provided the miracle is maintained for the full term of gestation or pregnancy, the progeny will be born healthy. Eecundity also provides the antenatal young protection against magical curses, provided the Magnitude of the adverse magic does not exceed that of the miracle.',
  },
  {
    name: 'Fortify',
    tags: 'Area (Tens of Metres), Duration (Instant), Rank Initiate, Resist (Evade)',
    description:
      'Fortify strengthens large scale constructions, making them more resilient to damage from natural disasters, siege weapons, and magical attack. The miracle adds its Intensity to the natural Armour Points of all buildings and walls within its area of effect. Offensive magic which seeks to damage or modify a construction under the protection of Fortify has its Intensity reduced by that of the Fortify miracle.',
  },
  {
    name: 'Growth',
    tags: 'Area (Tens of Metres), Duration (Hours), Rank Priest',
    description:
      'Growth accelerates the growing speed of vegetation, ageing it by one year for each hour until the miracle concludes. Under its effects, trees and bushes can increase in size and verdure dramatically, although at the cost of wildly sprawling, tangled proliferation of every plant within the area of effect. Repeated use of this miracle can potentially grow a thick forest over what had been open fields a few days previously.',
  },
  {
    name: 'Harmonise',
    tags: 'Duration (Minutes), Ranged (Tens of Metres), Rank Initiate, Resist (Willpower)',
    description:
      "Harmonise causes the target to do exactly what the theist does. If not resisted the victim must mimic every physical move, albeit in a jerky, almost puppet-like manner. It only works on beings with roughly the same physiology as the caster; with limbs or locations not shared by both participants remaining unaffected by the magic. The miracle only controls gross motor skills, and does not permit control of the victim's speech. Use of this magic can humiliate someone from afar, or perhaps even force them into performing a murderous or suicidal act.\nIf Harmonise is used to force the subject to attack or defend, the combat style rolls are automatically one grade harder to accomplish owing to the jerky movement of the victim.",
  },
  {
    name: 'Heal Body',
    tags: 'Duration (Instant), Rank Acolyte',
    description:
      'This powerful miracle instantly heals all Minor and Serious Wounds suffered by the target. Like Heal Wound, this miracle has no effect on Major Wounds save to stabilise the injury, preventing death. To repair maimed or dismembered body locations requires the Rejuvenate miracle.',
  },
  {
    name: 'Heal Mind',
    tags: 'Duration (Instant), Rank Acolyte',
    description:
      'This miracle removes all madness and mental derangements from a single target. In the case of magically-induced madness, the spell works if its Magnitude is equal to or greater than that of the magical disorder.',
  },
  {
    name: 'Heal Wound',
    tags: 'Duration (Instant), Rank Initiate',
    description:
      'Heals a single body location back to its full Hit Points, provided the injury is no more severe than a Serious Wound. It has no effect on Major Wounds save for stabilising the injury, preventing death.',
  },
  {
    name: 'Heart Seizure',
    tags: 'Duration (Instant), Ranged (Metres), Rank Priest, Resist (Endurance)',
    description:
      'Another dreadful miracle known to the darkest gods, whoever suffers this dire magic feels the veritable hand of the deity reach within his chest, squeezing his heart or perhaps tearing it out completely. Those that fail to resist the miracle suffer a fatal heart attack and die instantly. If the resistance roll succeeds, the target still suffers a number of Hit Points damage equal to Intensity of the spell, directly to the location where their heart is contained, normally the chest for humanoids. Creatures without hearts are immune to this miracle.\nDifferent forms of this miracle exist, affecting different organs according to the nature of the deity offering it (Brain Seizure, for example).',
  },
  {
    name: 'Illusion',
    tags: 'Area (Metres), Duration (Hours), Rank Initiate, Resist (Special)',
    description:
      'Illusion is used to change the sensory projections of an area or single target, making it seem to be something completely different. For example a tiger can be made to look like a harmless cat, sound like it meows when it roars, and feel silky soft instead of coarse wiry fur. The theist can adjust one sensory projection per two points of Intensity. Once set, the illusion can no longer be modified.\nThe largest target which can be affected must be able to fit within the perimeter of the miracle. Unwilling living targets may resist with Endurance. Observers who interact with the illusion are permitted an opposed Willpower roll against the miracle, in order to resist any debilitating psychosomatic effects it creates, e.g. deafness, pain, nausea. Whilst the illusion itself is incapable of causing harm, the underlying target or area remains as dangerous as it was before the miracle.',
  },
  {
    name: 'Lay to Rest',
    tags: 'Duration (Instant), Rank Initiate',
    description:
      'This miracle is used to ensure that the soul of a recently killed person or creature reaches a deserving afterlife. Its primary purpose is to prevent angry, possibly coerced victims returning from death as vengeful spirits or reinhabiting their bodies as corporal undead.',
  },
  {
    name: 'Leeching',
    tags: 'Area (Tens of Metres), Duration (Minutes), Rank Acolyte',
    description:
      'Using the blood of sacrifices scattered over an area, this miracle disrupts the flow of magic which enters the zone, dissipating its power. Within the area all magic, even that of the caster, is suppressed by the Magnitude of the miracle. Any encroaching spell whose Magnitude is reduced to zero is rendered inactive until the target of its effect leaves the area. Spells cast within the region with equal or less Magnitude automatically fail.',
  },
  {
    name: 'Lightning',
    tags: 'Duration (Instant), Ranged (Tens of Metres), Rank Initiate, Resist (Evade) This miracle causes a sizzling bolt of lightning to either streak down from the sky, or be projected from the hand or weapon of the theist, towards the target. If the bolt is not evaded, it will inflict 1d6 damage per two points of Intensity to a random hit location. Natural and worn armour offers no protection against this damage, but magical protection does.',
    description: '',
  },
  {
    name: 'Madness',
    tags: 'Duration (Days), Ranged (Metres), Rank Initiate, Resist (Willpower)',
    description:
      'This miracle infuses the target with gibbering madness. Targets which fail to resist will rant and rave uncontrollably, performing acts of utter insanity in a manner fitting to their personality, plot line and dramatic circumstances. In general, mad characters should be more harmless distractions than ticking time bombs. In the case of player characters, until the Madness subsides or is somehow cured, the insane victim should be placed under control of the Games Master unless he deems the player is capable of acting out the insanity.',
  },
  {
    name: 'Mindblast',
    tags: 'Duration (Days), Ranged (Metres), Rank Initiate, Resist (Willpower)',
    description:
      "This spell blasts the intellect of the victim, obliterating their sapience. If not resisted, the victim's INT is temporarily converted to animalistic INS, removing from them the power of speech, writing or any other form of communication. It also prevents them from utilising equipment and devices. If forced to fight in this condition, the victim will by default use their Unarmed skill. Although prevented from utilising complex thought, it does not limit instinct and base cunning.",
  },
  {
    name: 'Mindlink',
    tags: 'Duration (Minutes), Ranged (Tens of Metres), Rank Initiate',
    description:
      "This miracle allows mind-to-mind communication, theistic knowledge and devotional pool Magic Points to be shared between participants. Its use is normally restricted to those of the same or closely allied cults, since once the magical link is established; there are no safeguards as to what can be tapped from the participants – all of whom must join the Mindlink willingly.\nMindlink has two main purposes. Either it allows an entire cult hierarchy to support a handful of its priests so that they may cast many miracles, powered by the devotional pools of associates and underlings; or it grants lesser ranked cult members the ability (albeit temporarily) to call forth miracles normally beyond their capability. Each instance of Mindlink connects a pair of individuals in a two way link. Several castings using the same individual but with different partners will make them the hub of a Mindlink network, able to\ndraw on the resources of each of the partners.\nIf a mental or emotion-affecting spell is cast at someone participating in a Mindlink, then everyone else directly linked to them must also resist the spell or suffer its consequences. Although participants in a Mindlink share deliberately transmitted thoughts, they remain their own entity, and may sever their connection to the Mindlink by willing it so on their turn, or by leaving the spell's range.",
  },
  {
    name: 'Mirage',
    tags: 'Area (Metres), Duration (Minutes), Rank Initiate',
    description:
      'Mirage obscures a region, covering it with strange optical illusions, usually via the cult associations of the deity. An earth god might cause clouds of swirling sand which form unsettling faces; whereas a sun deity might infuse the area with blinding, shimmering curtain of light. The effect of this disconcerting obscurement is to conceal precisely what stands within the area, and make ranged attacks extremely difficult. Eiring at anyone within the Mirage suffers one difficulty grade per four points of Intensity.',
  },
  {
    name: 'Obliterate',
    tags: 'Area (Wilometres), Duration (Instant), Rank Priest, Resist (Willpower)',
    description:
      'A dire spell to those who seek fame or remembrance after death, Obliterate removes every record of their existence – scouring it from scrolls, clay tablets, carved hieroglyphs, and every other method of inscribing knowledge. In addition the name of that person is wiped from the mind of everyone within range, save for the casting priest, unless they resist the miracle. Although this miracle is normally used to expunge the glory of those whose crimes are so unforgivable that they must be forgotten for all time, some darker gods offer this as a means for their worshippers to maintain secretive anonymity.',
  },
  {
    name: 'Pacify',
    tags: 'Area (Tens of Meters), Duration (Minutes), Rank Acolyte, Resist (Willpower)',
    description:
      'Pacify suppresses aggressive and violent behaviour within its area of effect. Those that fail to resist the miracle are unable to cause harm to another, although they may defend themselves using non-harmful techniques. If unthreatened, those subject to the magic will sheathe or drop weapons, stop belligerent demonstration and cease all arguments. The miracle does not change personal opinion, merely makes it difficult to act in a hostile manner.',
  },
  {
    name: 'Perseverance',
    tags: 'Duration (Hours), Rank Initiate',
    description:
      'Through this miracle the recipient can channel the strength of his god, becoming inured to the effects of hard labour. Whilst the miracle remains active, the target of this spell will not receive another level of Fatigue, no matter the hardship faced. Perseverance does not grant any additional capability to lift, march or work; it just ensures the recipient will keep on going. This miracle has no effect upon Fatigue lost from asphyxiation or blood loss.',
  },
  {
    name: 'Propitiate',
    tags: 'Area (Wilometres), Duration (Weeks), Rank Acolyte',
    description:
      'Used by cults who try to appease darker, more hostile deities, Propitiate exchanges regular worship for the agreement to leave a region alone. The precise effect depends on the god being propitiated, but the area affected is centred upon the shrine or temple of that cult. Propitiating a lightning deity for example would not necessarily prevent storms happening within the radius of the miracle, but no serious fires or injuries would occur from lightning strikes. Similarly the tremors of an earthquake god would still be felt in a city, but no buildings would collapse – assuming the propitiations were maintained of course.',
  },
  {
    name: 'Rain of (Substance)',
    tags: 'Area (Wilometres), Duration (Minutes), Rank Priest',
    description:
      'This miracle summons dark brooding clouds which then begin to rain a particular, and most likely horrible substance with specific relevance to the cult deity, anything from blood to frogs. The miracle is intended to inspire awe or terror rather than inflict direct harm, so the actual things raining down are relatively harmless. A rain of spiders for instance would only produce non-venomous types; a rain of fire would look scary, but as each glowing ember reached the ground it would extinguish. During the event, members of the cult should be treated as having the Intimidate ability (see page 216).',
  },
  {
    name: 'Raise Undead',
    tags: 'Duration (Hours), Ranged (Tens of Metres), Rank Acolyte',
    description:
      "Raise Undead uses the physical remains of a corpse to create either a skeleton or zombie. The miracle infuses the corpse with part of the deity's own consciousness, so that it can obey commands, and act with a degree of independent intelligence. However, the skill capabilities of the undead automaton are limited to those of the theist who creates them.\nThe number of corpses which can be raised is equal to the Intensity of the miracle. Each skeleton or zombie also gains a bonus to its STR and CON characteristics, again equal to the Intensity. Thus a theist who exhorted his god to grant him an Intensity 9 Raise Dead, could animate 9 skeletons each with +9 to STR and CON. Only creatures of a SIZ equal or less than the caster's POW can be raised. ",
  },
  {
    name: 'Reflection',
    tags: 'Duration (Minutes), Rank Initiate',
    description:
      "This miracle reflects incoming magic aimed at the target or his equipment, redirecting it back at the original caster, depending on their relative Magnitudes. It does not have any effect on spells that are already affecting the target, or spells the theist casts upon himself.\nIf incoming spell's magnitude is less than the miracle, then the spell is reflected and the miracle remains.\nElse the miracle is eliminated and the incoming spell takes effect.",
  },
  {
    name: 'Rejuvenate',
    tags: 'Duration (Special), Rank Priest',
    description:
      'This miracle heals a single body location suffering from a Major Wound, no matter whether it has been crushed, mutilated or dismembered. The freshness of the injury affects the time taken for the miracle to complete. Provided the recipient is still alive, and the location was wounded within a number of hours equal to the Intensity of the miracle, then Rejuvenate will heal all the damage instantly.\nBeyond this threshold the body part must undergo a more traumatic repair, which takes a number of days equal to the Hit Points lost on the location. If the miracle is allowed to lapse before the regrowth has completed, the location remains maimed and unusable, potentially left at a negative Hit Point level which cannot be cured.',
  },
  {
    name: 'Resurrect',
    tags: 'Duration (Instant), Rank Priest, Resist (Special)',
    description:
      'This miracle can bring the dead back to life by summoning the spirit of the deceased and persuading it to re-enter its body. For obvious reasons the theist must cast Resurrect upon the corpse, which must possess at a minimum, those body locations vital for life. If the target died due to some lingering disease, poison or magical curse, the ailment must be eliminated first or the miracle will fail.\nResurrection is not guaranteed. The deceased spirit will often have desires which preclude their return to life. The spirit may fear the hardship of their life, the lingering pain of wounds, persistent illnesses, the feebleness of old age or may even piously wish to reach their loved ones in the afterlife. On the other hand a spirit might wish to return from the dead to protect their family, seek vengeance against their killer or complete a holy quest.\nTo judge the primary motivation of the spirit, work out which of their passions or devotion skills has the highest value. If this indicates that the spirit will be unwilling to return to life, it may attempt to resist the miracle using that particular passion or Devotion skill.\nResurrect must be cast within a number of days equal to the Magnitude of the spell after death, otherwise the miracle automatically fails. A resurrected character returns to life with 1 Hit Point on all extant locations.',
  },
  {
    name: 'Ripen',
    tags: 'Area (Metres), Duration (Instant), Rank Initiate',
    description:
      'Ripen brings forth a single crop of fruits, tubers, roots, nuts, or seeds from the vegetation within the area of effect. The miracle does not guarantee they are edible since that depends on the plants, but does ensure the crop is at the peak of its ripeness, no matter when during the year the miracle is cast. Ripen cannot cause a plant or tree to give forth more than a single crop annually, so if it is used early during the growing season, the vegetation will spend the remainder of the year recovering.',
  },
  {
    name: 'Sacred Band',
    tags: 'Duration (Minutes), Ranged (Tens of Metres), Rank Initiate',
    description:
      'When cast upon a group of worshippers the miracle binds the recipients together as a sacred brotherhood, sharing their life force between them. This has little effect until one of their number is wounded, whereupon the surviving brothers spread the effects of the injury between them.\nDamage is divided evenly amongst remaining recipients, applied to the same location which was injured. Any Special Effects which occur remain only with the originally wounded band member. Thus\nin a band of six temple guardians linked by this miracle, if one is wounded in the arm for 8 points of damage – normally a Serious Wound – the damage is instead split so that the original target and one other suffers 2 points in that arm, whilst everyone else in the band suffers 1 point.\nThe maximum number of brothers who can be bound together in the band cannot exceed the Intensity of the miracle. They must also share the same basic physiology, or the miracle will fail.\nThe obvious application of the miracle is to augment the physical resilience of a unit of cult warriors in battle. However, it can also be used to strengthen a cult champion whilst the remainder of the pious participants remain safely hidden or out of reach of combat.',
  },
  {
    name: 'Sever Spirit',
    tags: 'Duration (Instant), Ranged (Tens of Metres), Rank Priest, Resist (Endurance)',
    description:
      'This miracle severs the bond between body and soul, with dire effect. If not resisted, the victim is slain instantly. If however, the victim does throw off the miracle, they still receive 1 point of damage for every 2 levels of Intensity to each Hit Location simultaneously – which may, in some cases, still seriously injure or even kill the victim.',
  },
  {
    name: 'Shield',
    tags: 'Duration (Minutes), Rank Initiate',
    description:
      'This miracle protects the caster from physical attacks. Each point of Intensity grants the recipient one Armour Point on all hit locations. This protection does not stack on top of worn armour, rather it supplants it in those areas less protected than what the miracle itself provides. In some circumstances, even if the protective value of the Shield is less than the worn armour, it may still ward against certain types of magical damage.',
  },
  {
    name: 'Soul Sight',
    tags: 'Duration (Minutes), Rank Initiate',
    description:
      "This miracle enables the recipient to see the magical aura of anyone he looks at, enabling him to discern that creature or spirit's current Magic Points, as well as the nature of any active spells, the source of their magic, and any enchanted items the creature is carrying. It also permits the recipient to see into the spirit world, and see beyond any visual illusions which may be concealing a creature's true form – although this may not necessarily be a good thing in certain circumstances.",
  },
  {
    name: 'Spirit Block',
    tags: 'Duration (Minutes), Rank Initiate',
    description:
      'Spirit Block is a powerful way of preventing the malign influences of spirits. The recipient receives complete protection from spirits with an Intensity of up to half the Intensity of the miracle (rounded up). So an acolyte invoking the spell at an Intensity of 7 could protect themselves from Intensity 4 spirits.\nThis miracle protects against spiritual assault only. Thus it prevents discorporation, spirit combat, possession, and the like. On the other hand, it provides no warding against the spells of a Haunt or physical attacks of an incorporated Predator Spirit for example.',
  },
  {
    name: 'Steadfast',
    tags: 'Area (Metres), Duration (Minutes), Rank Initiate, Resist (Willpower)',
    description:
      'Used when facing overwhelming odds or terrifying challenges, this miracle renders those within its area immune to any natural mental or emotional manipulation. Magical attacks which generate a similar effect, such as Eear, Eanaticism, Domination, and the like, must exceed the Magnitude of the miracle to stand a chance of affecting the target.',
  },
  {
    name: 'Sunspear',
    tags: 'Duration (Instant), Ranged (Tens of Metres), Rank Acolyte, Resist (Evade) Sunspear summons a shaft of blazing light down from the sky to blast a single target. If not evaded, the scorching light will burn the victim for 1d6 damage per two points of Intensity in every hit location. Natural and worn armour counts against this damage. This',
    description: 'miracle will only function in direct sunlight.',
  },
  {
    name: 'Sureshot',
    tags: 'Duration (Minutes), Ranged (Tens of Metres), Rank Initiate',
    description:
      'Sureshot magically guides the trajectory of missiles thrown or fired by the recipient so that they almost always hit, no matter the situational modifiers or cover; provided at least some part of the target is visible, and they are within range of both the miracle and the weapon itself. Any failed ranged weapon attack roll is treated as a success instead. Fumbles, normal successes and critical successes remain unaffected. The target of the missile attack can still attempt to Parry or Evade as normal.',
  },
  {
    name: 'Thunderclap',
    tags: 'Area (Tens of Metres), Duration (Minutes), Rank Acolyte, Resist (Endurance)',
    description:
      'This miracle summons a powerful blast of thunder from the open sky, to smite down foes. All non-cult members must resist the magic. Those who fail are knocked prone by the expanding wall of sound, and struck deaf for the remainder of the miracle. Should anyone fumble the resistance roll against the spell, they are struck permanently deaf. Also, any items of glass or pottery will shatter automatically within the area of the spell.',
  },
  {
    name: 'True (Weapon)',
    tags: 'Duration (Minutes), Rank Initiate',
    description: "True (Weapon) augments the harm the recipient inflicts when wielding a cult-specified close combat weapon. The miracle doubles that type of weapon's damage up to the maximum that the weapon can inflict, and increases its Size by one step for the purpose of overcoming parries. Thus under the effects of a True (Sword) miracle the wielder would roll 1d8 twice for a broadsword, but would not receive more than 8 points. Other bonuses, such as Damage Modifier, are not affected."
  }
];
