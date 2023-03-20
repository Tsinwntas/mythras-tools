import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CombatFlowComponent } from './pages/combat-flow/combat-flow.component';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';


import { FormsModule } from '@angular/forms';

import { StartOfCombatComponent } from './pages/start-of-combat/start-of-combat.component';
import { StartOfCombatRoundComponent } from './pages/start-of-combat-round/start-of-combat-round.component';
import { FatigueCheckComponent } from './pages/fatigue-check/fatigue-check.component';
import { StartOfCombatCycleComponent } from './pages/start-of-combat-cycle/start-of-combat-cycle.component';
import { AttackerActionComponent } from './pages/attacker-action/attacker-action.component';
import { FreeActionsComponent } from './pages/free-actions/free-actions.component';
import { DefenderActionComponent } from './pages/defender-action/defender-action.component';
import { CompareResultsComponent } from './pages/compare-results/compare-results.component';
import { EndOfCycleComponent } from './pages/end-of-cycle/end-of-cycle.component';
import { FatigueComponent } from './modals/fatigue/fatigue.component';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { AugmentModalComponent } from './modals/augment-modal/augment-modal.component';
import { SituationalModifiersComponent } from './modals/situational-modifiers/situational-modifiers.component';
import { OpenModalComponent } from './open-modal/open-modal.component';
import { RangedSituationalComponent } from './modals/ranged-situational/ranged-situational.component';
import { EncPenaltyComponent } from './modals/enc-penalty/enc-penalty.component';
import { DifferentWeaponsComponent } from './modals/different-weapons/different-weapons.component';
import { SubstantiallyDifferentWeaponComponent } from './modals/substantially-different-weapon/substantially-different-weapon.component';
import { ReasonablyDifferentWeaponsComponent } from './modals/reasonably-different-weapons/reasonably-different-weapons.component';
import { BroadlySimilarWeaponsComponent } from './modals/broadly-similar-weapons/broadly-similar-weapons.component';
import { SimilarWeaponsComponent } from './modals/similar-weapons/similar-weapons.component';
import { FamiliarUnfamiliarComponent } from './modals/familiar-unfamiliar/familiar-unfamiliar.component';
import { DifficultyGradesComponent } from './modals/difficulty-grades/difficulty-grades.component';
import { WeaponsNotCoveredComponent } from './modals/weapons-not-covered/weapons-not-covered.component';
import { TableComponent } from './table-component/table.component';
import { BraceComponent } from './modals/brace/brace.component';
import { ChangeRangeComponent } from './modals/change-range/change-range.component';
import { OutmanoeuvringComponent } from './modals/outmanoeuvring/outmanoeuvring.component';
import { RegainFootingComponent } from './modals/regain-footing/regain-footing.component';
import { CastMagicComponent } from './modals/cast-magic/cast-magic.component';
import { DelayComponent } from './modals/delay/delay.component';
import { DitherComponent } from './modals/dither/dither.component';
import { HoldMagicComponent } from './modals/hold-magic/hold-magic.component';
import { MountComponent } from './modals/mount/mount.component';
import { ReadyWeaponComponent } from './modals/ready-weapon/ready-weapon.component';
import { StruggleComponent } from './modals/struggle/struggle.component';
import { TakeCoverComponent } from './modals/take-cover/take-cover.component';
import { ChargingComponent } from './modals/charging/charging.component';
import { ThroughContactComponent } from './modals/through-contact/through-contact.component';
import { IntoContactComponent } from './modals/into-contact/into-contact.component';
import { FallingAndCombatComponent } from './modals/falling-and-combat/falling-and-combat.component';
import { LeapingAttacksComponent } from './modals/leaping-attacks/leaping-attacks.component';
import { MountedCombatComponent } from './modals/mounted-combat/mounted-combat.component';
import { SurpriseComponent } from './modals/surprise/surprise.component';
import { WithdrawFromCombatComponent } from './modals/withdraw-from-combat/withdraw-from-combat.component';
import { PassiveBlockingComponent } from './modals/passive-blocking/passive-blocking.component';
import { AssessSituationComponent } from './modals/assess-situation/assess-situation.component';
import { DropWeaponComponent } from './modals/drop-weapon/drop-weapon.component';
import { SignalComponent } from './modals/signal/signal.component';
import { SpeakComponent } from './modals/speak/speak.component';
import { GroupLuckComponent } from './modals/group-luck/group-luck.component';
import { LuckPointComponent } from './modals/luck-point/luck-point.component';
import { EvadeComponent } from './modals/evade/evade.component';
import { UnarmedCombatComponent } from './modals/unarmed-combat/unarmed-combat.component';
import { ShorterReachComponent } from './modals/shorter-reach/shorter-reach.component';
import { GrappleComponent } from './modals/grapple/grapple.component';
import { DamageReductionComponent } from './modals/damage-reduction/damage-reduction.component';
import { ReloadComponent } from './modals/reload/reload.component';
import { CounterspellComponent } from './modals/counterspell/counterspell.component';
import { InterruptComponent } from './modals/interrupt/interrupt.component';
import { HeroicLastActionComponent } from './modals/heroic-last-action/heroic-last-action.component';
import { AttackOptionsComponent } from './pages/attack-options/attack-options.component';
import { ParryComponent } from './modals/parry/parry.component';
import { NaturalSpecialsComponent } from './modals/natural-specials/natural-specials.component';
import { SpecialEffectsComponent } from './modals/special-effects/special-effects.component';
import { KnockbackComponent } from './modals/knockback/knockback.component';
import { HealingWoundsComponent } from './modals/healing-wounds/healing-wounds.component';
import { SuccessLevelsComponent } from './modals/success-levels/success-levels.component';
import { ArmorPenaltyComponent } from './modals/armor-penalty/armor-penalty.component';
import { MoveComponent } from './modals/move/move.component';
import { AimingComponent } from './modals/aiming/aiming.component';
import { FiringIntoCrowdComponent } from './modals/firing-into-crowd/firing-into-crowd.component';
import { FiringMovingComponent } from './modals/firing-moving/firing-moving.component';
import { MagicSituationalComponent } from './modals/magic-situational/magic-situational.component';
import { RunningOutOfManaComponent } from './modals/running-out-of-mana/running-out-of-mana.component';
import { SpiritCombatComponent } from './modals/spirit-combat/spirit-combat.component';
import { OffensiveSpecialEffectsComponent } from './modals/offensive-special-effects/offensive-special-effects.component';
import { DefensiveSpecialEffectsComponent } from './modals/defensive-special-effects/defensive-special-effects.component';
import { SpiritCombatSpecialEffectsComponent } from './modals/spirit-combat-special-effects/spirit-combat-special-effects.component';
import { InitiativeNotesComponent } from './modals/initiative-notes/initiative-notes.component';
import { CharacterSheetComponent } from './modals/character-sheet/character-sheet.component';
import { InanimateObjectsComponent } from './modals/inanimate-objects/inanimate-objects.component';
import { RangedModTableComponent } from './ranged-mod-table/ranged-mod-table.component';
import { DistancePenaltiesComponent } from './distance-penalties/distance-penalties.component';
import { CloseCombatSituationalComponent } from './modals/close-combat-situational/close-combat-situational.component';
import { HitLocationsComponent } from './modals/hit-locations/hit-locations.component';
import { PossessionExorcismComponent } from './modals/possession-exorcism/possession-exorcism.component';
import { DeadlyAbilityComponent } from './modals/deadly-ability/deadly-ability.component';
import { CharacterComponent } from './modals/character/character.component';
import { CharacterCreationComponent } from './pages/character-creation/character-creation.component';
import { DetailsComponent } from './character/details/details.component';
import { SkillsComponent } from './character/skills/skills.component';
import { StatsComponent } from './character/stats/stats.component';
import { SpecialsComponent } from './character/specials/specials.component';
import { SpellsComponent } from './character/spells/spells.component';
import { HeightWeightComponent } from './character/height-weight/height-weight.component';
import { CombatStylesComponent } from './character/modals/combat-styles/combat-styles.component';
import { StartingMoneyComponent } from './character/modals/starting-money/starting-money.component';
import { SocialClassComponent } from './character/social-class/social-class.component';
import { FamilyComponent } from './character/family/family.component';
import { CareerComponent } from './character/career/career.component';
import { RoundingOutComponent } from './character/rounding-out/rounding-out.component';
import { StartingMagicComponent } from './character/starting-magic/starting-magic.component';
import { RanksComponent } from './character/ranks/ranks.component';
import { BackstoryComponent } from './character/backstory/backstory.component';
import { SummaryComponent } from './character/summary/summary.component';
import { ConceptComponent } from './character/concept/concept.component';
import { StatePageComponent } from './pages/state-page/state-page.component';
import { SizeTableComponent } from './character/size-table/size-table.component';
import { AgeComponent } from './character/age/age.component';
import { CultureComponent } from './character/culture/culture.component';
import { SpecializedComponent } from './character/modals/specialized/specialized.component';
import { AllCombatStylesComponent } from './modals/all-combat-styles/all-combat-styles.component';
import { StylesTableComponent } from './styles-table/styles-table.component';
import { TraitsComponent } from './modals/traits/traits.component';
import { StyleFiltersComponent } from './style-filters/style-filters.component';



@NgModule({
  declarations: [
    AppComponent,
    CombatFlowComponent,
    StartOfCombatComponent,
    StartOfCombatRoundComponent,
    FatigueCheckComponent,
    StartOfCombatCycleComponent,
    AttackerActionComponent,
    FreeActionsComponent,
    DefenderActionComponent,
    CompareResultsComponent,
    EndOfCycleComponent,
    FatigueComponent,
    InfoModalComponent,
    AugmentModalComponent,
    SituationalModifiersComponent,
    OpenModalComponent,
    RangedSituationalComponent,
    EncPenaltyComponent,
    DifferentWeaponsComponent,
    SubstantiallyDifferentWeaponComponent,
    ReasonablyDifferentWeaponsComponent,
    BroadlySimilarWeaponsComponent,
    SimilarWeaponsComponent,
    FamiliarUnfamiliarComponent,
    DifficultyGradesComponent,
    WeaponsNotCoveredComponent,
    TableComponent,
    BraceComponent,
    ChangeRangeComponent,
    OutmanoeuvringComponent,
    RegainFootingComponent,
    CastMagicComponent,
    DelayComponent,
    DitherComponent,
    HoldMagicComponent,
    MountComponent,
    ReadyWeaponComponent,
    StruggleComponent,
    TakeCoverComponent,
    ChargingComponent,
    ThroughContactComponent,
    IntoContactComponent,
    FallingAndCombatComponent,
    LeapingAttacksComponent,
    MountedCombatComponent,
    SurpriseComponent,
    WithdrawFromCombatComponent,
    PassiveBlockingComponent,
    AssessSituationComponent,
    DropWeaponComponent,
    SignalComponent,
    SpeakComponent,
    GroupLuckComponent,
    LuckPointComponent,
    EvadeComponent,
    UnarmedCombatComponent,
    ShorterReachComponent,
    GrappleComponent,
    DamageReductionComponent,
    ReloadComponent,
    CounterspellComponent,
    InterruptComponent,
    HeroicLastActionComponent,
    AttackOptionsComponent,
    ParryComponent,
    NaturalSpecialsComponent,
    SpecialEffectsComponent,
    KnockbackComponent,
    HealingWoundsComponent,
    SuccessLevelsComponent,
    ArmorPenaltyComponent,
    MoveComponent,
    AimingComponent,
    FiringIntoCrowdComponent,
    FiringMovingComponent,
    MagicSituationalComponent,
    RunningOutOfManaComponent,
    SpiritCombatComponent,
    OffensiveSpecialEffectsComponent,
    DefensiveSpecialEffectsComponent,
    SpiritCombatSpecialEffectsComponent,
    InitiativeNotesComponent,
    CharacterSheetComponent,
    InanimateObjectsComponent,
    RangedModTableComponent,
    DistancePenaltiesComponent,
    CloseCombatSituationalComponent,
    HitLocationsComponent,
    PossessionExorcismComponent,
    DeadlyAbilityComponent,
    CharacterComponent,
    CharacterCreationComponent,
    DetailsComponent,
    SkillsComponent,
    StatsComponent,
    SpecialsComponent,
    SpellsComponent,
    HeightWeightComponent,
    CombatStylesComponent,
    StartingMoneyComponent,
    SocialClassComponent,
    FamilyComponent,
    CareerComponent,
    RoundingOutComponent,
    StartingMagicComponent,
    RanksComponent,
    BackstoryComponent,
    SummaryComponent,
    ConceptComponent,
    StatePageComponent,
    SizeTableComponent,
    AgeComponent,
    CultureComponent,
    SpecializedComponent,
    AllCombatStylesComponent,
    StylesTableComponent,
    TraitsComponent,
    StyleFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
