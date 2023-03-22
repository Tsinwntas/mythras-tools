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

@Component({
  selector: 'open-modal',
  templateUrl: './open-modal.component.html',
  styleUrls: ['./open-modal.component.scss']
})
export class OpenModalComponent {

  @Input() modal : string;
  @Input() prop : any;

  constructor(private modals : ModalHandlerService){}

  openModal(){
    switch(this.modal){
      case 'aiming': this.modals.open(AimingComponent);return;
      case 'all-styles': this.modals.open(AllCombatStylesComponent, this.prop);return;
      case 'armor-penalty': this.modals.open(ArmorPenaltyComponent);return;
      case 'assess-situation': this.modals.open(AssessSituationComponent);return;
      case 'augment': this.modals.open(AugmentModalComponent);return;
      case 'background-events': this.modals.open(BackgroundEventsModalComponent);return;
      case 'brace': this.modals.open(BraceComponent);return;
      case 'broadly-similar': this.modals.open(BroadlySimilarWeaponsComponent);return;
      case 'cast-magic': this.modals.open(CastMagicComponent);return;
      case 'change-range': this.modals.open(ChangeRangeComponent);return;
      case 'character': this.modals.open(CharacterComponent);return;
      case 'charging': this.modals.open(ChargingComponent);return;
      case 'close-combat-situational': this.modals.open(CloseCombatSituationalComponent);return;
      case 'combat-styles': this.modals.open(CombatStylesComponent, this.prop);return;
      case 'counterspell': this.modals.open(CounterspellComponent);return;
      case 'damage-reduction': this.modals.open(DamageReductionComponent);return;
      case 'deadly-ability': this.modals.open(DeadlyAbilityComponent);return;
      case 'defensive-specials': this.modals.open(DefensiveSpecialEffectsComponent);return;
      case 'delay': this.modals.open(DelayComponent);return;
      case 'different-weapons': this.modals.open(DropWeaponComponent);return;
      case 'difficulty-grades': this.modals.open(DifficultyGradesComponent);return;
      case 'dither': this.modals.open(DitherComponent);return;
      case 'drop-weapon': this.modals.open(DropWeaponComponent);return;
      case 'enc-penalty': this.modals.encModal(this.prop);return;
      case 'evade': this.modals.open(EvadeComponent);return;
      case 'falling-and-combat': this.modals.open(FallingAndCombatComponent);return;
      case 'familiar-unfamiliar': this.modals.open(FamiliarUnfamiliarComponent);return;
      case 'fatigue': this.modals.open(FatigueComponent);return;
      case 'firing-into-crowd': this.modals.open(FiringIntoCrowdComponent);return;
      case 'firing-moving': this.modals.open(FiringMovingComponent);return;
      case 'grapple': this.modals.open(GrappleComponent);return;
      case 'group-luck': this.modals.open(GroupLuckComponent);return;
      case 'healing-wounds': this.modals.open(HealingWoundsComponent);return;
      case 'heroic-last-action': this.modals.open(HeroicLastActionComponent);return;
      case 'hit-locations': this.modals.open(HitLocationsComponent);return;
      case 'hold-magic': this.modals.open(HoldMagicComponent);return;
      case 'inanimate-object': this.modals.open(InanimateObjectsComponent);return;
      case 'initiative': this.modals.initiativeNotes(this.prop);return;
      case 'interrupt': this.modals.open(InterruptComponent);return;
      case 'into-contact': this.modals.open(IntoContactComponent);return;
      case 'knockback': this.modals.open(KnockbackComponent);return;
      case 'leaping-attacks': this.modals.open(LeapingAttacksComponent);return;
      case 'luck-point': this.modals.open(LuckPointComponent);return;
      case 'magic-situational': this.modals.open(MagicSituationalComponent);return;
      case 'mount': this.modals.open(MountComponent);return;
      case 'mounted-combat': this.modals.open(MountedCombatComponent);return;
      case 'move': this.modals.open(MoveComponent);return;
      case 'natural-specials': this.modals.open(NaturalSpecialsComponent);return;
      case 'offensive-specials': this.modals.open(OffensiveSpecialEffectsComponent);return;
      case 'outmaneuvre': this.modals.open(OutmanoeuvringComponent);return;
      case 'parry': this.modals.open(ParryComponent);return;
      case 'passive-blocking': this.modals.open(PassiveBlockingComponent);return;
      case 'possession-exorcism': this.modals.open(PossessionExorcismComponent);return;
      case 'ranged-situational': this.modals.open(RangedSituationalComponent);return;
      case 'ready-weapon': this.modals.open(ReadyWeaponComponent);return;
      case 'reasonably-different': this.modals.open(ReasonablyDifferentWeaponsComponent);return;
      case 'regain-footing': this.modals.open(RegainFootingComponent);return;
      case 'reload': this.modals.open(ReloadComponent);return;
      case 'running-out-of-mana': this.modals.open(RunningOutOfManaComponent);return;
      case 'shorter-reach': this.modals.open(ShorterReachComponent);return;
      case 'signal': this.modals.open(SignalComponent);return;
      case 'similar': this.modals.open(SimilarWeaponsComponent);return;
      case 'situational': this.modals.open(SituationalModifiersComponent);return;
      case 'speak': this.modals.open(SpeakComponent);return;
      case 'special-effects': this.modals.specialEffects(this.prop);return;
      case 'specialized': this.modals.open(SpecializedComponent, this.prop);return;
      case 'spirit-combat': this.modals.open(SpiritCombatComponent);return;
      case 'spirit-specials': this.modals.open(SpiritCombatSpecialEffectsComponent);return;
      case 'struggle': this.modals.open(StruggleComponent);return;
      case 'substantially-different': this.modals.open(SubstantiallyDifferentWeaponComponent);return;
      case 'success-levels': this.modals.open(SuccessLevelsComponent);return;
      case 'surprise': this.modals.open(SurpriseComponent);return;
      case 'take-cover': this.modals.open(TakeCoverComponent);return;
      case 'through-contact': this.modals.open(ThroughContactComponent);return;
      case 'traits': this.modals.open(TraitsComponent, this.prop);return;
      case 'unarmed-combat': this.modals.open(UnarmedCombatComponent);return;
      case 'withdraw-from-combat': this.modals.open(WithdrawFromCombatComponent);return;
    }
  }

}
