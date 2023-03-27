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
      'Avert is used to dismiss another Eolk Magic spell within range. Avert can be cast reactively to neutralise offensive spells, by using the Counter Magic Reactive Action.',
  },
  {
    name: 'Babble',
    tags: 'Resist (Willpoeer), Touch',
    description:
      'Babble mangles anything spoken by its target. It does not affect what the target is thinking, only what is verbally issued. Thus Babble can seriously disrupt orders being issued by a commanding officer to his troops, but it cannot influence what the commander is thinking or his intentions. Depending on the necessity for verbal components, Babble may be able to adversely influence spell casting.',
  },
  {
    name: 'Beastcall (X)',
    tags: 'Instant, Ranged, Resist (Willpoeer)',
    description:
      'Beastcall is used to attract a single, specific animal, the type being specified in the spell, within range. The animal summoned cannot be sapient, and it may also resist the spell using its Willpower. If it fails to resist, it is naturally drawn, in a passive fashion, to the caster, whereupon the spell dissipates, and the creature acts as it normally would, finding itself in proximity to the caster. Physical obstacles or adverse actions (such as a wall, river or line of spears, or a harsh yank on a set of reins or leash) also cause the spell to fail.',
  },
  {
    name: 'Befuddle',
    tags: 'Ranged, Resist (Willpoeer)',
    description:
      'Befuddle causes confusion within the mind of a corporeal target. The subject of the spell has difficulty thinking straight, forgetting where it is, what it is doing, and why – often lapsing into disassoci- ated lines of thought. Befuddled targets can still act in self defence, but cannot initiate any constructive activity until the spell ends. Any sort of attack or threatening action instantly breaks the spell, whether or not it was directed specifically at the befuddled target.',
  },
  {
    name: 'Bladesharp',
    tags: 'Touch',
    description:
      'Bladesharp is cast on edged and piercing melee weapons. It increases the damage of a weapon by one dice step, and inciden- tally leaves the edge honed after the spell concludes. This spell is often used on tools such as logging axes, ploughs and razors. Thus casting this spell on a dagger increases it to ld6+l damage, whereas the same spell on a great axe would increase it to hd8+h',
  },
  {
    name: 'Bludgeon',
    tags: 'Touch',
    description:
      'Bludgeon is similar to Bladesharp but used on weapons and tools that deal blunt-force trauma rather than cutting or piercing damage. It is normally used to aid with threshing grain, fulling wool, or sim- ilar heavy duty work.',
  },
  {
    name: 'Breath',
    tags: 'Touch',
    description:
      "Breath permits the recipient to hold their breath for an extended period, so that they can temporarily venture into harmful environ- ments, such as underwater; or atmospheres tainted by rock dust, gases, smoke or poisons. The spell lasts for a maximum of half the caster's POW in minutes, during which time the recipient cannot speak or the breath is lost, and they immediately begin to asphyxiate (or become poisoned).",
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
      'Calculate allows the immediate calculation of numbers, weight or size of a thing, be it soldiers amassed in battle formation, the length of a rope or weight of a sack of rice. The spell always yields a precise quantity, but not value or quality. Only items which are directly observable (seen, lifted, smelled, and so on), and within range can be calculated. The spell will work when cast on a con- tainer – assuming, of course, that the container is not empty.',
  },
  {
    name: 'Calm',
    tags: 'Ranged, Resist (Willpoeer)',
    description:
      "Calm attempts to dampen down the passions or the target, perhaps ensuring that a lovesick paramour doesn't press his suit, a frightened rival doesn't scream for help or that weapons are not drawn in anger. A calmed person is not otherwise mentally affected, thus any sort of assault or threatening action still permits the target to defend themselves, and even attack, albeit they will do so in a calm and level headed manner.",
  },
  {
    name: 'Chill',
    tags: 'Instant, Touch',
    description:
      "Chill dramatically reduces the temperature of small objects (with an ENC no larger than a third of the caster's POW) down to the temperature of ice water. Useful for rapidly cooling hot items, chill- ing drinks, and so forth. The spell does not freeze an object, and neither does it cause any damage to its structure: it merely renders it very cold.",
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
      "Cool protects the recipient from the effects of muggy atmospheres and heat prostration, guarding them from any Eatigue caused by the natural environment. The spell does not stop the effects of heat related magic, but will make any resistance roll one difficulty grade easier. Someone under the effects of this spell wearing full hoplite armour could march through a tropical rain forest during the height of summer without harm. Cool affects a target of SIZ up to the caster's POW xh.",
  },
  {
    name: 'Coordination',
    tags: 'Touch, Trigger',
    description:
      'Coordination enhances manual dexterity and agility when per- forming a single task. When cast in preparation it permits the recip- ient a chance to re-roll a single skill check where coordination is required, such as Acrobatics, Lockpicking and so on. The recipient may choose the better of the two rolls, but the spell is expended in the process.',
  },
  {
    name: 'Curse',
    tags: 'Special Duration',
    description:
      'Curse must be cast in combination with a second spell of a harmful nature. Its one and only effect is to increase the duration of the accompanying spell so that it is continuous. This comes at a cost however, since the Magic Point used to cast the curse does not return until the caster drops the curse willingly, the curse is dispelled, or the spell to which it is bound breaks naturally. Curse is commonly com- bined with spells such as Befuddle, Demoralise, Dullblade, Repug- nance, and so on.',
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
      "Deflect wards the recipient against tiny impacts of foreign mate- rial, such as rain drops, a cloud of midges or even flying grains of sand. The protection is limited to individual objects smaller than a child's fingernail, and thus cannot prevent normal missile weapons from striking a character.",
  },
  {
    name: 'Demoralise',
    tags: 'Ranged, Resist (Willpoeer)',
    description:
      'Demoralise temporarily fills the target with a sense of despon- dency towards a particular person, species, situation or object. When confronted with the subject of this despondency, any proactive skill attempts made by the afflicted character related to the source are one grade harder. However a direct assault from the subject instantly breaks the spell.\nThus a character could be given a demoralising dread of heights, ensuring that any Athletic skill used for climbing or Acrobatics skill for balancing would be one difficulty grade harder.',
  },
  {
    name: 'Dishevel',
    tags: 'Instant, Touch',
    description:
      'Dishevel is the reverse of the Cleanse spell. Objects affected are immediately covered in grime, dust, cobwebs, and so forth. The spell can be used to make brand new objects look old and weath- ered or help prevent normally well turned out people from being recognised. The caster can dishevel an area equal to POW in square metres.',
  },
  {
    name: 'Disruption',
    tags: 'Instant, Ranged, Resist (Endurance)',
    description:
      'Disruption is used for damaging or dissembling physical objects without the need for tools. It is commonly employed to drive off or kill living creatures, such as birds or vermin. When successfully cast, Disruption inflicts ld3 damage to a single random Hit Location or the overall Hit Points of an object. In both cases the damage ignores any armour or natural protection.',
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
      'Extinguish immediately quenches flames and small fires of mod- est size and heat. It is useful for dousing candles, lanterns, torches or small cook fires, but it will not work on magical or larger, more fero- cious conflagrations such as pyres, burning houses or dragon flames.',
  },
  {
    name: 'Fanaticism',
    tags: 'Ranged, Resist (Willpoeer)',
    description:
      'Fanaticism is the reverse of Demoralise. It grants the target a wildly excessive or irrational devotion, dedication, or enthusiasm for a particular person, species, situation or object. Its effect is to grant the recipient a temporary Passion equal to the Eolk Magic skill of the caster. Eanaticism can be used to counter Demoralise, and vice versa.',
  },
  {
    name: 'Find (X)',
    tags: 'Concentration, Ranged, Resist (Special)',
    description:
      "Find has many variations, always specific, and learned as sep- arate spells. Some common examples are given below. It works by attuning to the natural emanations of a creature or thing, alerting the caster to its presence within the spell's range. Find can be blocked by dense or thick materials such as metal, or earth and stone at least one metre thick. The spell cannot discern emotions or thoughts.\nFind Arroes: Locates ammunition shot by hunters, which miss their target.\nFind Flae: Identifies any flaws in an object, such as hidden imper- fections or physical damage.\nFind Livestock: Locates a particular type of animal. Can be resisted with Willpower.\nFind Loot: Locates precious metals and gems.\nFind Object: Locates a lost personal possession.\nFind Sickness: Identifies the existence of disease and illness, whether magical or mundane.",
  },
  {
    name: 'Firearrow',
    tags: 'Touch',
    description:
      "Firearrow causes all missiles thrown or fired by the recipient to burst into flame when released. Ostensibly created to act as a signal flare, it has since evolved into a combat magic. Missiles under its effect add an additional ld3 damage, but are extinguished if they impale flesh. Those that strike flammable material have a chance equal to the caster's Eolk Magic skill of setting alight whatever they lodge in, such as wooden shields, thatched roofs, and so on. Wooden ammunition is consumed as part of the spell.",
  },
  {
    name: 'Fireblade',
    tags: 'Touch',
    description:
      'Fireblade is similar to Fire- arrow but is instead cast on hand tools and melee weap- ons. The original purpose of the spell is to sterilise surgical equipment, aid in slash and burn agriculture or provide illumination during darkness without the need to carry an additional light source. If cast on a weapon it inflicts an additional ld3 damage, and has the chance of setting flammable materials alight if held to them for several rounds (see Fire on page 79). Wooden hafted weapons under the effects of Fire- blade will be consumed as part of the spell.',
  },
  {
    name: 'Frostbite',
    tags: 'Ranged, Resist (Endurance)',
    description:
      "Frostbite works directly on living, organic tissue, inflicting numb- ness and pain in one of the recipient's extremities, for example fin- gers, toes, buttocks, nose & ears, and so on. The caster must either touch a specific extremity or roll randomly if cast at range. If the spell is not resisted the area affected suffers sensory numbness fol- lowed by lingering pain for the duration, making skill tests utilis- ing that location one difficulty grade harder. Erostbite does not deal direct damage but makes the affected area of limited use for a while. Eor instance, a victim suffering frostbite to the buttocks cannot sit without extreme discomfort.",
  },
  {
    name: 'Glamour',
    tags: 'Concentration, Ranged, Resist (Willpoeer)',
    description:
      'Glamour makes the target alluring so that people are naturally attracted to them. The particular nature of the glamour must be chosen when cast, and can be anything from increased natural beauty, a softer more sultry voice or even a seductively perfumed body scent. Whilst the spell grants no mechanical benefits, it does ensure that the recipient will gain a chance to gather themselves an audience, engage the attention of someone they wish to make con- tact with, or provide a distraction enabling accomplices an opportu- nity to perform nefarious deeds.',
  },
  {
    name: 'Glue',
    tags: 'Touch',
    description:
      "Glue cements together two solid, inanimate objects for the dura- tion of the spell, for example a cart wheel to its axle or a door to its frame. Whilst under the effects of the spell the items, no matter how disparate, cannot be parted unless something actively tries to wrench them apart. In this circumstance the spell has a Brawn skill equal to five times the caster's POW, and fails when a superior Brawn is set against it, defeating it in an opposed roll. Once the spell concludes or fails the items part completely unharmed.",
  },
  {
    name: 'Heal',
    tags: '\nInstant, Touch',
    description:
      'Heal has several different effects depending on the nature of the ailment it is being used on. If the subject is suffering from a minor complaint such as a head- ache, back pain, hangover, cold, warts, and so on, then the symp- toms are immediately lifted. Cast on a location suffering a Minor Wound it restores all lost Hit Points instantly. Against Serious or Major Wounds no Hit Points are recovered. However the spell will stabilise locations, stop all bleeding, and prevent imminent death from inattention.',
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
      'Incognito alters the facial features of the recipient to a bland, unmemorable countenance. It does not affect the voice, manner- isms or physical size/presence of the recipient, but ensures that visu- ally they do not stand out from the crowd.Anyone under the effects of Incognito is actively ignored by those who might otherwise be searching for him; he is simply overlooked and discounted.',
  },
  {
    name: 'Ironhand',
    tags: 'Touch',
    description:
      "Ironhand allows the recipient to hold anything that would oth- erwise cause damage (such as extremely hot or cold items, or those dripping acid) without causing themselves injury. Thus a user could grasp a brand from a fire, lift a bubbling cauldron from a spit or even reach through a steam vent to grab an object on the other side. It does not grant total immunity from damage, merely stops it from conducting through the skin of the recipient's hands. The spell does not protect anything worn on the hand, so rings, gloves, and such like will suffer the effects of the source.",
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
      "Might permits the recipient to engage in impressive acts of phys- ical brawn. It adds the caster's POW to the recipient's STR, but only for the purposes of lifting, breaking, and contests of strength as defined under the Brawn skill. It does not increase the character's Damage Modifier when inflicting combat damage.",
  },
  {
    name: 'Mimic',
    tags: 'Touch, Trigger',
    description:
      'Mimic allows the recipient to perfectly mimic the voice and man- nerisms of someone the caster has seen and heard personally. It does not affect their physical appearance.',
  },
  {
    name: 'Mindspeech',
    tags: 'Concentration, Ranged, Resist (Willpoeer)',
    description:
      'Mindspeech allows telepathy between the caster and a target, enabling verbal intercourse without needing to speak aloud. The caster and target must share the same language, or else the spell will merely transmit unintelligible gobbledegook. Attempting to cast Mindspeech on somebody beyond range automatically fails.',
  },
  {
    name: 'Mobility',
    tags: 'Touch',
    description:
      "Mobility increases the Movement rate of the recipient by ld3 metres for the spell's duration. It is often used by hunters, herders, and those seeking to escape pursuit.",
  },
  {
    name: 'Pathway',
    tags: 'Touch',
    description:
      'Pathway enables the recipient to more easily travel through heavy vegetation, safe from being scratched, snagged or otherwise hindered. Under its enchantment Movement rates are not reduced in woods, jungles, swamps, and similar overgrown terrain.',
  },
  {
    name: 'Perfume',
    tags: 'Concentration, Ranged, Resist (Willpoeer)',
    description:
      'Perfume either negates a noxious odour or imbibes an odourless substance with a pleasing fragrance. The spell does not affect the properties of the source of a stench (so a rotting carcass is still rotten) - it merely makes its presence tolerable.',
  },
  {
    name: 'Pet',
    tags: 'Concentration, Resist (Willpoeer), Touch',
    description:
      "Pet allows the caster to take mental control of a small creature, sending it off to scout, fetch or perform some other complex task. It can be cast on any creature neither of whose SIZ and INT charac- teristics may exceed half the caster's CHA. If the targeted creature is the already the loyal pet of the caster it does not need to resist the spell.",
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
      'Pierce can be cast on any item with a point, helping it to pene- trate thick surfaces. It is normally used to help sew leather, punch holes in metal or hammer pitons into stone. Any weapon or tool enhanced with this spell ignores the first two Armour Points of the person, creature or object struck.',
  },
  {
    name: 'Polish',
    tags: 'Instant, Touch',
    description:
      "Polish instantly buffs an object of ENC or SIZ of up to the cast- er's POW to a high sheen making it glossy, shiny, and highly desir- able even if the quality of the article is sub-par.",
  },
  {
    name: 'Preserve',
    tags: 'Instant, Touch',
    description:
      'Preserve prevents organic matter, both vegetable and animal, from bacterial decay and putrefaction for ld3 months, by sterilising it. If the material is later smoked, pickled or salted it is preserved indefinitely. The spell can halt decay that has begun, but not reverse it. The caster can affect an amount of organic matter with SIZ or ENC equal to their POW.',
  },
  {
    name: 'Protection',
    tags: 'Touch',
    description:
      "Protection is useful in a wide range of tasks where there is a risk of accidental injury such as working in a foundry or mine. The first time the character would normally take damage that penetrates protective clothing or armour, the Protection spell will trigger, and reduce the damage taken by ld3 points. The spell then dissipates. The spell only protects against physical damage so won't help against events such as fire, choking, and so on.",
  },
  {
    name: 'Repair',
    tags: 'Instant, Touch',
    description:
      'Repair fixes physical damage to an inanimate object. Each sepa- rate successful casting repairs ld3 Hit Points of damage.',
  },
  {
    name: 'Repugnance',
    tags: 'Concentration, Ranged, Resist (Willpoeer)',
    description:
      'Repugnance twists the appearance of the target so that they cause distaste in all those that see, hear or smell them. The partic- ular effect must be chosen when cast, and can be anything from a great wart on the end of a nose, a high pitched nasal voice or even pungent body odour. Whatever is chosen, it will cause people to turn away from the victim or make excuses so as to leave their presence as quickly as possible.',
  },
  {
    name: 'Shock',
    tags: 'Instant, Ranged, Resist (Evade)',
    description:
      'Shock produces a mild electrical discharge which may be directed at living things. The caster must either touch a specific extremity or roll randomly if cast at range. If the spell is not resisted, the shocked location is stunned for ld3 Turns; armour does not protect. The spell makes a loud crack when cast.',
  },
  {
    name: 'Shove',
    tags: 'Instant, Ranged, Resist (Special)',
    description:
      "Shove allows the caster to telekinetically move an object by giv- ing it a single crude push. The item is not moved with enough force to inflict damage, and is still subject to gravity. The spell affects an amount of ENC or SIZ equal to the caster's POW. Living targets can resist with either Endurance or Evade.",
  },
  {
    name: 'Sleep',
    tags: 'Resist (Endurance), Touch',
    description:
      "Sleep sends its recipient into a deep, peaceful sleep. It has no effect on creatures with a SIZ greater than the caster's POW. Unless the target resists, it slumbers for a number of hours equal to the half the caster's POW. However the spell takes ld3 Rounds to take effect before the target falls unconscious. Any attempt to cast this spell in a combat situation automatically fails.",
  },
  {
    name: 'Slow',
    tags: 'Ranged, Resist (Endurance)',
    description:
      'Slow is the direct opposite of Mobility, slowing Movement Rate by ld3+3 metres, if the target fails to resist.',
  },
  {
    name: 'Speedart',
    tags: 'Instant, Touch, Trigger',
    description:
      "Speedart boosts the velocity of thrown or fired missiles so that they travel farther before losing efficacy. The spell increases the effective range by l.5 times the weapon's normal distance.",
  },
  {
    name: 'Spiritshield',
    tags: 'Concentration, Resist (Willpoeer), Touch',
    description:
      "This spell creates a shield around the recipient which deters spir- its from entering. Any spirit wishing to attack or possess the recipient must overcome the spell by winning an opposed test of their Will- power against the caster's Eolk Magic skill.",
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
      'Tire inflicts one level of Eatigue on the subject unless resisted.',
  },
  {
    name: 'Translate',
    tags: 'Concentration, Resist (Willpoeer), Touch',
    description:
      'Translate permits the caster to understand any language spoken to him, by setting up a psychic link with the target. The translation provided is often imperfect, as complex terms or concepts cannot be comprehended, but it does allow simple communication. The spell works between sapient creatures with a definite, constructed lan- guage, and still relies on being able to see, hear or otherwise perceive the target as in normal conversation. If cast upon a creature of ani- mal awareness, communication is restricted to the simple reception of emotional state.',
  },
  {
    name: 'Tune',
    tags: 'Instant, Touch',
    description:
      'Tune ensures that the musical instrument touched is in perfect pitch no matter the dampness, temperature or its general condition, ensuring that the following performance is unaffected. ',
  },
  {
    name: 'Ventriloquism',
    tags: 'Concentration, Ranged, Resist (Willpoeer)',
    description:
      'Ventriloquism allows the caster to project their voice anywhere within range. The caster needs only to think the projected words, not actually to speak them physically, which can disconcert those unaware of what is going on. If cast upon a living creature, the caster can take control of their vocal cords, and speak through them instead.',
  },
  {
    name: 'Vigour',
    tags: 'Touch',
    description:
      "Vigour makes the recipient feel alive and energetic, being used to offset the effects of strenuous physical labour. Eor the spell's dura- tion, all Eatigue effects gained from laborious activity are ignored (but return on the spell's dismissal). It negates the effects of a Tire spell.",
  },
  {
    name: 'Voice',
    tags: 'Concentration, Ranged, Resist (Willpoeer)',
    description:
      "Voice amplifies the recipient's intonation and delivery so that it becomes compelling when issuing verbal commands. All who can hear the speaker are forced to listen. Their vocalisation also car- ries across and through even the loudest background noise (howling gales, the roar of a waterfall, the clash of arms on a battlefield) up to a range of ten times the recipient's CHA in metres.",
  },
  {
    name: 'Warmth',
    tags: 'Concentration, Touch',
    description:
      "Warmth protects the recipient from the effects of freezing atmo- spheres and exposure, and from Eatigue caused by the natural envi- ronment. The spell does not stop the effects of cold-related magic cast at them, but will make any resistance roll one difficulty grade easier. Thus a person under the effects of this spell could walk about on a glacier during midwinter in their underclothes without harm. Warmth affects an object of SIZ up to the caster's POW xh.",
  },
  {
    name: 'Witchsight',
    tags: 'Ranged, Resist (Willpoeer)',
    description:
      'Witchsight allows the caster to see active magic, enchanted items, and invisible entities (although such things are simply shadowy representations) that lie within range and line of sight. It can also penetrate illusions or discern the true guise of shapeshifted crea- tures. Beings which wish to remain hidden or disguised must win an opposed test of their Willpower versus the casting roll.',
  },
];
