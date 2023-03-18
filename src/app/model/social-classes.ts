import { SocialClass } from "./social-class"

export class SocialClasses {
}

export const BarbarianSocialClasses : {percLow: number; percHigh: number, socialClass : SocialClass}[] = [
    {percLow : 1, percHigh : 5, socialClass: {class:'Outcast', titles:'Exile, Outlaw', moneyMultiplier:0.25, resources:'Nothing but the clothes on their back, and maybe some personal armament'}},
    {percLow : 6, percHigh : 15, socialClass: {class:'Slave', titles:'Bondsman, Caxtos, Peon, Serf, Thrall', moneyMultiplier:0.5, resources:'Resides on owners property; owns a few keepsakes'}},
    {percLow : 16, percHigh : 80, socialClass: {class:'Freeman', titles:'Churl, Commoner, Feine, Freedman, Karl, Labourer', moneyMultiplier:1, resources:'Rented accommodation or farmaland; possesses own tools or livestock, simple weapons'}},
    {percLow : 81, percHigh : 95, socialClass: {class:'Gentry', titles:'Exile, Outlaw', moneyMultiplier:3, resources:'Owns a house and either a farmstead, business or ship; furniture; tools, weapons and armour, mount, several servant or slave retainers; support from locals'}},
    {percLow : 96, percHigh : 100, socialClass: {class:'Ruling', titles:'Exile, Outlaw', moneyMultiplier:5, resources:'Owns a great hall and either a farmstead, business or ship; furniture; tools, weapons and armour all of high quality, mount, several servant or slave retainers; fealty from a country or smaller region'}},
]