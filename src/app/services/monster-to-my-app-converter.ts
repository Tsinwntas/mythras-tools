export default function convert(parsedValues: any) : string {
    return `<monster>
        <name>${parsedValues['name']}</name>
        <ac>${parsedValues['finalAC']}</ac>
        <hp>${parsedValues['finalHP']}</hp>
        <str>${parsedValues['STR:']}</str>
        <dex>${parsedValues['DEX:']}</dex>
        <con>${parsedValues['CON:']}</con>
        <int>${parsedValues['INT:']}</int>
        <wis>${parsedValues['POW:']}</wis>
        <cha>${parsedValues['CHA:']}</cha>
        <siz>${parsedValues['SIZ:']}</siz>
        <importedSkills>${parsedValues['skills']}</importedSkills>
        ${restOfAbilities(parsedValues)}
        ${attacks(parsedValues)}
    </monster>`;
}

function attacks(parsedValues: any) : string {
    return parsedValues['attacks'].filter((attack : string) => attack != undefined && attack != "").map( (attack : string) => 
        `<action>
            ${checkAttack(attack.split(/ [|] /))}
        </action>`
    ).join("\n"); 
}

function checkAttack(attack: string[]) : string {
    return `<name>${attack[0]}</name>
            <text>${attack[1].replaceAll(/[+]/g," + ").replaceAll(/[-]/g," - ")}</text>`
}

function restOfAbilities(parsedValues: any) : string {
    return parsedValues['abilities'].filter((ability : string)=>ability!=undefined && ability!="").map((ability : string)=>
        `<trait>
            ${checkAbility(ability.split(/:[ ]*/))}
        </trait>`
    ).join("\n");
}

function checkAbility(ability: string[]) : string {
    if(ability.length == 1)
        return `
            <name>Ability</name>
            <text>${ability[0]}</text>
        `
    else 
    return `
            <name>${ability[0]}</name>
            <text>${ability[1]}</text>
        `
}
/*
<monster>
      <name>Animated Object (Large)</name>
    <size>L</size>
    <type>construct</type>
    <alignment>Unaligned</alignment>
    <ac>10 (natural armor)</ac>
    <hp>50 (50d1)</hp>
    <speed>walk 30 ft.</speed>
    <str>14</str>
    <dex>10</dex>
    <con>10</con>
    <int>3</int>
    <wis>3</wis>
    <cha>1</cha>
    <save/>
    <skill/>
    <passive>6</passive>
    <languages/>
    <cr/>
    <resist/>
    <immune/>
    <vulnerable/>
    <conditionImmune/>
    <senses>blindsight 30 ft. (blind beyond this radius)</senses>
    <trait>
        <name>Animated</name>
      <text>If the object lacks legs or other appendages it can use for locomotion, it instead has a flying speed of 30 feet and can hover. If the object is securely attached to a surface or larger object, such as a chain bolted to a wall, its speed is 0.</text>
      <text>When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form.</text>
      <text>The DM might rule that a specific objects slam attack inflicts slashing or piercing damage based on its form.</text>
      </trait>
    <action>
        <name>Slam</name>
      <text>Melee Weapon Attack: +6 to hit, reach 5 ft., one target. 12 (2d10 + 2) bludgeoning damage.</text>
      <attack>Slam|+6|2d10+2</attack>
      </action>
    <description>
Source: Player's Handbook p. 213</description>
    <environment/>
    </monster>

    */