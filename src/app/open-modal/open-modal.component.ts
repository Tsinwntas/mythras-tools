import { BackgroundEventsModalComponent } from './../character/modals/background-events-modal/background-events-modal.component';
import { CharacterComponent } from './../modals/character/character.component';
import { SpiritCombatSpecialEffectsComponent } from './../modals/spirit-combat-special-effects/spirit-combat-special-effects.component';
import { SpiritCombatComponent } from './../modals/spirit-combat/spirit-combat.component';
import { RunningOutOfManaComponent } from './../modals/running-out-of-mana/running-out-of-mana.component';
import { PossessionExorcismComponent } from './../modals/possession-exorcism/possession-exorcism.component';
import { OffensiveSpecialEffectsComponent } from './../modals/offensive-special-effects/offensive-special-effects.component';
import { MoveComponent } from './../modals/move/move.component';
import { MagicSituationalComponent } from './../modals/magic-situational/magic-situational.component';
import { InanimateObjectsComponent } from './../modals/inanimate-objects/inanimate-objects.component';
import { FiringMovingComponent } from './../modals/firing-moving/firing-moving.component';
import { DefensiveSpecialEffectsComponent } from './../modals/defensive-special-effects/defensive-special-effects.component';
import { DeadlyAbilityComponent } from './../modals/deadly-ability/deadly-ability.component';
import { CloseCombatSituationalComponent } from './../modals/close-combat-situational/close-combat-situational.component';
import { AimingComponent } from './../modals/aiming/aiming.component';
import { ArmorPenaltyComponent } from './../modals/armor-penalty/armor-penalty.component';
import { SuccessLevelsComponent } from './../modals/success-levels/success-levels.component';
import { HealingWoundsComponent } from './../modals/healing-wounds/healing-wounds.component';
import { KnockbackComponent } from './../modals/knockback/knockback.component';
import { NaturalSpecialsComponent } from './../modals/natural-specials/natural-specials.component';
import { ParryComponent } from './../modals/parry/parry.component';
import { EvadeComponent } from './../modals/evade/evade.component';
import { IntoContactComponent } from './../modals/into-contact/into-contact.component';
import { WithdrawFromCombatComponent } from './../modals/withdraw-from-combat/withdraw-from-combat.component';
import { ThroughContactComponent } from './../modals/through-contact/through-contact.component';
import { UnarmedCombatComponent } from './../modals/unarmed-combat/unarmed-combat.component';
import { TakeCoverComponent } from './../modals/take-cover/take-cover.component';
import { SurpriseComponent } from './../modals/surprise/surprise.component';
import { StruggleComponent } from './../modals/struggle/struggle.component';
import { SpeakComponent } from './../modals/speak/speak.component';
import { SignalComponent } from './../modals/signal/signal.component';
import { ShorterReachComponent } from './../modals/shorter-reach/shorter-reach.component';
import { ReloadComponent } from './../modals/reload/reload.component';
import { ReadyWeaponComponent } from './../modals/ready-weapon/ready-weapon.component';
import { RangedSituationalComponent } from './../modals/ranged-situational/ranged-situational.component';
import { PassiveBlockingComponent } from './../modals/passive-blocking/passive-blocking.component';
import { MountComponent } from './../modals/mount/mount.component';
import { LuckPointComponent } from './../modals/luck-point/luck-point.component';
import { LeapingAttacksComponent } from './../modals/leaping-attacks/leaping-attacks.component';
import { InterruptComponent } from './../modals/interrupt/interrupt.component';
import { HoldMagicComponent } from './../modals/hold-magic/hold-magic.component';
import { HeroicLastActionComponent } from './../modals/heroic-last-action/heroic-last-action.component';
import { GroupLuckComponent } from './../modals/group-luck/group-luck.component';
import { GrappleComponent } from './../modals/grapple/grapple.component';
import { DitherComponent } from './../modals/dither/dither.component';
import { DropWeaponComponent } from './../modals/drop-weapon/drop-weapon.component';
import { DelayComponent } from './../modals/delay/delay.component';
import { DamageReductionComponent } from './../modals/damage-reduction/damage-reduction.component';
import { CounterspellComponent } from './../modals/counterspell/counterspell.component';
import { ChargingComponent } from './../modals/charging/charging.component';
import { CastMagicComponent } from './../modals/cast-magic/cast-magic.component';
import { AssessSituationComponent } from './../modals/assess-situation/assess-situation.component';
import { BraceComponent } from './../modals/brace/brace.component';
import { ChangeRangeComponent } from './../modals/change-range/change-range.component';
import { OutmanoeuvringComponent } from './../modals/outmanoeuvring/outmanoeuvring.component';
import { RegainFootingComponent } from './../modals/regain-footing/regain-footing.component';
import { DifficultyGradesComponent } from './../modals/difficulty-grades/difficulty-grades.component';
import { FamiliarUnfamiliarComponent } from './../modals/familiar-unfamiliar/familiar-unfamiliar.component';
import { SimilarWeaponsComponent } from './../modals/similar-weapons/similar-weapons.component';
import { DifferentWeaponsComponent } from './../modals/different-weapons/different-weapons.component';
import { BroadlySimilarWeaponsComponent } from './../modals/broadly-similar-weapons/broadly-similar-weapons.component';
import { ReasonablyDifferentWeaponsComponent } from './../modals/reasonably-different-weapons/reasonably-different-weapons.component';
import { SubstantiallyDifferentWeaponComponent } from './../modals/substantially-different-weapon/substantially-different-weapon.component';
import { SituationalModifiersComponent } from './../modals/situational-modifiers/situational-modifiers.component';
import { FatigueComponent } from './../modals/fatigue/fatigue.component';
import { AugmentModalComponent } from './../modals/augment-modal/augment-modal.component';
import { ModalHandlerService } from './../services/modal-handler.service';
import { Component, Input } from '@angular/core';
import { FallingAndCombatComponent } from '../modals/falling-and-combat/falling-and-combat.component';
import { MountedCombatComponent } from '../modals/mounted-combat/mounted-combat.component';
import { FiringIntoCrowdComponent } from '../modals/firing-into-crowd/firing-into-crowd.component';
import { HitLocationsComponent } from '../modals/hit-locations/hit-locations.component';
import { SpecializedComponent } from '../character/modals/specialized/specialized.component';
import { AllCombatStylesComponent } from '../modals/all-combat-styles/all-combat-styles.component';
import { TraitsComponent } from '../modals/traits/traits.component';
import { CombatStylesComponent } from '../character/modals/combat-styles/combat-styles.component';
import { CareersModalComponent } from '../character/modals/careers-modal/careers-modal.component';
import { ProfessionalSkillsComponent } from '../character/modals/professional-skills/professional-skills.component';
import { AgeExperienceModalComponent } from '../character/modals/age-experience/age-experience.component';
import { FolkMagicComponent } from '../character/modals/folk-magic/folk-magic.component';
import { LoadCharacterComponent } from '../modals/load-character/load-character.component';
import { CreateSkillComponent } from '../character/modals/create-skill/create-skill.component';

const modalRegistry = {
  aiming: (modals: ModalHandlerService, prop: any) => modals.open(AimingComponent),
  'all-styles': (modals: ModalHandlerService, prop: any) =>
    modals.open(AllCombatStylesComponent, prop),
  'armor-penalty': (modals: ModalHandlerService, prop: any) =>
    modals.open(ArmorPenaltyComponent),
  'assess-situation': (modals: ModalHandlerService, prop: any) =>
    modals.open(AssessSituationComponent),
  augment: (modals: ModalHandlerService, prop: any) => modals.open(AugmentModalComponent),
  'background-events': (modals: ModalHandlerService, prop: any) =>
    modals.open(BackgroundEventsModalComponent),
  brace: (modals: ModalHandlerService, prop: any) => modals.open(BraceComponent),
  'broadly-similar': (modals: ModalHandlerService, prop: any) =>
    modals.open(BroadlySimilarWeaponsComponent),
  'cast-magic': (modals: ModalHandlerService, prop: any) => modals.open(CastMagicComponent),
  careers: (modals: ModalHandlerService, prop: any) => modals.open(CareersModalComponent, prop),
  'change-range': (modals: ModalHandlerService, prop: any) =>
    modals.open(ChangeRangeComponent),
  character: (modals: ModalHandlerService, prop: any) => modals.open(CharacterComponent),
  charging: (modals: ModalHandlerService, prop: any) => modals.open(ChargingComponent),
  'close-combat-situational': (modals: ModalHandlerService, prop: any) =>
    modals.open(CloseCombatSituationalComponent),
  'combat-styles': (modals: ModalHandlerService, prop: any) =>
    modals.open(CombatStylesComponent, prop),
  counterspell: (modals: ModalHandlerService, prop: any) => modals.open(CounterspellComponent),
  'create-skill': (modals: ModalHandlerService, prop: any) =>
    modals.open(CreateSkillComponent, prop),
  'damage-reduction': (modals: ModalHandlerService, prop: any) =>
    modals.open(DamageReductionComponent),
  'deadly-ability': (modals: ModalHandlerService, prop: any) =>
    modals.open(DeadlyAbilityComponent),
  'defensive-specials': (modals: ModalHandlerService, prop: any) =>
    modals.open(DefensiveSpecialEffectsComponent),
  delay: (modals: ModalHandlerService, prop: any) => modals.open(DelayComponent),
  'different-weapons': (modals: ModalHandlerService, prop: any) =>
    modals.open(DifferentWeaponsComponent),
  'difficulty-grades': (modals: ModalHandlerService, prop: any) =>
    modals.open(DifficultyGradesComponent),
  dither: (modals: ModalHandlerService, prop: any) => modals.open(DitherComponent),
  'drop-weapon': (modals: ModalHandlerService, prop: any) => modals.open(DropWeaponComponent),
  'enc-penalty': (modals: ModalHandlerService, prop: any) => modals.encModal(prop),
  evade: (modals: ModalHandlerService, prop: any) => modals.open(EvadeComponent),
  experience: (modals: ModalHandlerService, prop: any) =>
    modals.open(AgeExperienceModalComponent, prop),
  'falling-and-combat': (modals: ModalHandlerService, prop: any) =>
    modals.open(FallingAndCombatComponent),
  'familiar-unfamiliar': (modals: ModalHandlerService, prop: any) =>
    modals.open(FamiliarUnfamiliarComponent),
  fatigue: (modals: ModalHandlerService, prop: any) => modals.open(FatigueComponent),
  'firing-into-crowd': (modals: ModalHandlerService, prop: any) =>
    modals.open(FiringIntoCrowdComponent),
  'firing-moving': (modals: ModalHandlerService, prop: any) =>
    modals.open(FiringMovingComponent),
  folkMagic: (modals: ModalHandlerService, prop: any) =>
    modals.open(FolkMagicComponent, prop, prop.callBack),
  grapple: (modals: ModalHandlerService, prop: any) => modals.open(GrappleComponent),
  'group-luck': (modals: ModalHandlerService, prop: any) => modals.open(GroupLuckComponent),
  'healing-wounds': (modals: ModalHandlerService, prop: any) =>
    modals.open(HealingWoundsComponent),
  'heroic-last-action': (modals: ModalHandlerService, prop: any) =>
    modals.open(HeroicLastActionComponent),
  'hit-locations': (modals: ModalHandlerService, prop: any) =>
    modals.open(HitLocationsComponent),
  'hold-magic': (modals: ModalHandlerService, prop: any) => modals.open(HoldMagicComponent),
  'inanimate-object': (modals: ModalHandlerService, prop: any) =>
    modals.open(InanimateObjectsComponent),
  initiative: (modals: ModalHandlerService, prop: any) => modals.initiativeNotes(prop),
  interrupt: (modals: ModalHandlerService, prop: any) => modals.open(InterruptComponent),
  'into-contact': (modals: ModalHandlerService, prop: any) => modals.open(IntoContactComponent),
  knockback: (modals: ModalHandlerService, prop: any) => modals.open(KnockbackComponent),
  'leaping-attacks': (modals: ModalHandlerService, prop: any) =>
    modals.open(LeapingAttacksComponent),
  load: (modals: ModalHandlerService, prop: any) => modals.open(LoadCharacterComponent, prop),
  'luck-point': (modals: ModalHandlerService, prop: any) => modals.open(LuckPointComponent),
  'magic-situational': (modals: ModalHandlerService, prop: any) =>
    modals.open(MagicSituationalComponent),
  mount: (modals: ModalHandlerService, prop: any) => modals.open(MountComponent),
  'mounted-combat': (modals: ModalHandlerService, prop: any) =>
    modals.open(MountedCombatComponent),
  move: (modals: ModalHandlerService, prop: any) => modals.open(MoveComponent),
  'natural-specials': (modals: ModalHandlerService, prop: any) =>
    modals.open(NaturalSpecialsComponent),
  'offensive-specials': (modals: ModalHandlerService, prop: any) =>
    modals.open(OffensiveSpecialEffectsComponent),
  outmaneuvre: (modals: ModalHandlerService, prop: any) =>
    modals.open(OutmanoeuvringComponent),
  parry: (modals: ModalHandlerService, prop: any) => modals.open(ParryComponent),
  'passive-blocking': (modals: ModalHandlerService, prop: any) =>
    modals.open(PassiveBlockingComponent),
  'possession-exorcism': (modals: ModalHandlerService, prop: any) =>
    modals.open(PossessionExorcismComponent),
  'professional-skills': (modals: ModalHandlerService, prop: any) =>
    modals.open(ProfessionalSkillsComponent, prop),
  'ranged-situational': (modals: ModalHandlerService, prop: any) =>
    modals.open(RangedSituationalComponent),
  'ready-weapon': (modals: ModalHandlerService, prop: any) =>
    modals.open(ReadyWeaponComponent),
  'reasonably-different': (modals: ModalHandlerService, prop: any) =>
    modals.open(ReasonablyDifferentWeaponsComponent),
  'regain-footing': (modals: ModalHandlerService, prop: any) =>
    modals.open(RegainFootingComponent),
  reload: (modals: ModalHandlerService, prop: any) => modals.open(ReloadComponent),
  'running-out-of-mana': (modals: ModalHandlerService, prop: any) =>
    modals.open(RunningOutOfManaComponent),
  'shorter-reach': (modals: ModalHandlerService, prop: any) =>
    modals.open(ShorterReachComponent),
  signal: (modals: ModalHandlerService, prop: any) => modals.open(SignalComponent),
  similar: (modals: ModalHandlerService, prop: any) => modals.open(SimilarWeaponsComponent),
  situational: (modals: ModalHandlerService, prop: any) =>
    modals.open(SituationalModifiersComponent),
  speak: (modals: ModalHandlerService, prop: any) => modals.open(SpeakComponent),
  'special-effects': (modals: ModalHandlerService, prop: any) => modals.specialEffects(prop),
  specialized: (modals: ModalHandlerService, prop: any) =>
    modals.open(SpecializedComponent, prop),
  'spirit-combat': (modals: ModalHandlerService, prop: any) =>
    modals.open(SpiritCombatComponent),
  'spirit-specials': (modals: ModalHandlerService, prop: any) =>
    modals.open(SpiritCombatSpecialEffectsComponent),
  struggle: (modals: ModalHandlerService, prop: any) => modals.open(StruggleComponent),
  'substantially-different': (modals: ModalHandlerService, prop: any) =>
    modals.open(SubstantiallyDifferentWeaponComponent),
  'success-levels': (modals: ModalHandlerService, prop: any) =>
    modals.open(SuccessLevelsComponent),
  surprise: (modals: ModalHandlerService, prop: any) => modals.open(SurpriseComponent),
  'take-cover': (modals: ModalHandlerService, prop: any) => modals.open(TakeCoverComponent),
  'through-contact': (modals: ModalHandlerService, prop: any) =>
    modals.open(ThroughContactComponent),
  traits: (modals: ModalHandlerService, prop: any) => modals.open(TraitsComponent, prop),
  'unarmed-combat': (modals: ModalHandlerService, prop: any) =>
    modals.open(UnarmedCombatComponent),
  'withdraw-from-combat': (modals: ModalHandlerService, prop: any) =>
    modals.open(WithdrawFromCombatComponent),
  ignore: (modals: ModalHandlerService, prop: any) => {},
} as const;

export type ModalKey = keyof typeof modalRegistry;

@Component({
  selector: 'open-modal',
  templateUrl: './open-modal.component.html',
  styleUrls: ['./open-modal.component.scss']
})
export class OpenModalComponent {

  @Input() modal : ModalKey;
  @Input() prop : any;

  constructor(private modals : ModalHandlerService){}

  openModal(){
    modalRegistry[this.modal](this.modals, this.prop);
  }

}
