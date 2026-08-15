addLayer("I", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        inf: n(0),
        ipower: n(1),
        best:n(0),
        total:n(0),
        resetTime: 0,
        bestTime:n(1e300),
        tpower:n(0),
        C31base:n(0),
        CTbase:n(0),
        QUBF:n(0),
    }},
    color: "#b67f33",
    requires(){a = n(2).pow(1024)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "Infinity Points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {b=n(1024)
        if(hasMilestone('df',1)) b=n(1000)
        if(hasUpgrade('E',111)) b=n(970)
        a=n(10).log(2).div(b).toNumber()
        return a
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.I.NCtoIP)
        mult = mult.times(tmp.I.ICtoIP)
        mult = mult.times(buyableEffect('I',11))
        if(hasMilestone('qa',0)) mult=mult.times(100).div(7)
        if(hasUpgrade('qa',11)) mult=mult.times(upgradeEffect('qa',11))
        mult = mult.times(buyableEffect('qa',14))
        if(getBuyableAmount('I',61).gte(8)) mult=mult.times(tmp.I.QUBFeff)

        if(hasUpgrade('E',41)) mult=mult.times(upgradeEffect('E',41))
        if(hasUpgrade('E',51)) mult=mult.times(1e15)
        if(hasUpgrade('E',141)) mult=mult.times(upgradeEffect('E',141))
        if(hasUpgrade('E',142)) mult=mult.times(upgradeEffect('E',142))
        if(hasUpgrade('E',143)) mult=mult.times(upgradeEffect('E',143))

        if(hasMilestone('cf',0)) mult=mult.times(buyableEffect('I',61))
        if(hasUpgrade('cf',11)) mult=mult.times(upgradeEffect('cf',11))
        if(hasUpgrade('cf',21)) mult=mult.times(upgradeEffect('cf',21))
        if(hasUpgrade('cf',33)) mult=mult.times(upgradeEffect('cf',33)[1])
        if(hasUpgrade('cf',41)) mult=mult.times(upgradeEffect('cf',41))

        if(inChallenge('E',31)) mult=mult.pow(tmp.E.challenges[31].inChaleffect)
        if(hasChallenge('E',31)) mult=mult.pow(challengeEffect('E',31))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    directMult() {a = n(1)
            return a
    },
    canReset() {return player.points.gte(n(2).pow(1024))},//&&(player.I.points.lt(n(2).pow(1024)))
    update(diff){
        if(hasUpgrade('I',43)) addPoints('I', n(upgradeEffect('I',43)).times(0.1).div(player.I.bestTime).times(diff))
        if(hasUpgrade('I',91)&&!inChallenge('E',14)) player.I.inf = player.I.inf.add(upgradeEffect('I',91).times(diff))
        if(player.I.inf.gte(1)) player.I.challenges[11] = 1
        if((inChallenge('MT',11)||inChallenge('MT',12)||inChallenge('MT',13)||inChallenge('MT',14))&&player.points.gte(n(2).pow(1024))) player.I.challenges[16] = 1
        player.I.ipower = player.I.ipower.add(tmp.I.reaalIPowgen.times(diff))
        if(inChallenge('E',12)||inChallenge('E',32)) player.I.ipower = n(1)

        player.I.tpower = player.I.tpower.add(tmp.I.CTeff.times(diff))

        if(hasUpgrade('I',171)) player.I.QUBF = player.I.QUBF.add(tmp.I.QUBFgain.times(diff))

        if(inChallenge('I',31))player.I.C31base = player.T.points.add(1).times(player.ST.points.add(1)).times(player.MT.points.add(1)).pow(0.02).sub(1).max(player.I.C31base).min('1e2500')
        if(!inChallenge('I',31))player.I.CTbase = player.I.C31base.max(player.I.CTbase).min('1e2500')

        if(hasMilestone('E',14)&&player.I.CTauto&&hasUpgrade('I',131)) {player.I.CTbase = player.T.points.times(player.ST.points).times(player.MT.points).add(1).pow(0.0045).max(player.I.CTbase).min('1e2500')
            if(hasMilestone('li',0)) player.I.CTbase = tmp.I.ctCap
        }

        if(getBuyableAmount('cf',11).add(0.5).lt(tmp.I.boostedIU)) {confirm("Your I-Upgrade Booster is negative! You will be forced to do an Eternity reset to reset it!")
            setClickableState('I',51,1)
            doReset('E',player.I.points.gte(n(2).pow(1024)))
        }
    },
    automate(){
        if(hasMilestone('E',0)&&player.I.IPDauto) layers.I.buyables[11].buyMax()

        if(hasMilestone('E',3)){
            if(player.I.BIB1auto) layers.I.buyables[21].buyMax()
            if(player.I.BIB2auto) layers.I.buyables[22].buyMax()
            if(player.I.BIB3auto) layers.I.buyables[23].buyMax()
            if(player.I.BIB4auto) layers.I.buyables[24].buyMax()}

        if(hasMilestone('E',2)&&player.I.upgrades.length < 4) {player.I.upgrades=['14','24','34','44']
            if(hasMilestone('E',10)) player.I.upgrades.push('61','84')
        }
        if(hasMilestone('E',2)&&player.I.NCauto) {player.I.challenges[11]=1
            player.I.challenges[12]=1
            player.I.challenges[13]=1
            player.I.challenges[14]=1
            player.I.challenges[15]=1
            player.I.challenges[16]=1
        }

        if(hasUpgrade('E',33)) player.I.bestTime = n(0.001)

        if(hasMilestone('E',7)&&player.I.IGauto) layers.I.buyables[31].buyMax()
        if(hasMilestone('E',7)&&player.I.IGMauto) layers.I.buyables[32].buyMax()
        if(hasMilestone('E',7)&&player.I.IEFauto) layers.I.buyables[33].buyMax()

        if(hasMilestone('E',11)&&player.I.ICauto1&&layers.I.buyables[41].canAfford()) layers.I.buyables[41].buy()
        if(hasMilestone('E',11)&&player.I.ICauto2){
            for (let i = 1; i < 9; i++) {
                if(getBuyableAmount('I',41).gte(i)) player.I.challenges[20+i] =1
            }
        }

        if(hasMilestone('E',12)&&player.Q.QUBauto&&hasUpgrade('I',171)) {setBuyableAmount('I', 61,getBuyableAmount('I',61).max(8))
            setClickableState('Q',11,1)
            setClickableState('Q',12,1)
            setClickableState('Q',13,1)
            setClickableState('Q',14,1)
            setClickableState('Q',21,1)
            setClickableState('Q',22,1)
            setClickableState('Q',23,1)
            setClickableState('Q',24,1)
        }

        if(hasMilestone('E',13)&&player.I.TPB1auto) layers.I.buyables[51].buyMax()
        if(hasMilestone('E',13)&&player.I.TPB2auto) layers.I.buyables[52].buyMax()
        if(hasMilestone('E',13)&&player.I.TPB3auto) layers.I.buyables[53].buyMax()
        if(hasMilestone('E',13)&&player.I.TPB4auto) layers.I.buyables[54].buyMax()

        if(hasMilestone('cf',0)&&player.I.QUBauto) layers.I.buyables[61].buyMax()
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b",
        description: "B: Big Crunch for Infinity Points",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked(){return hasAchievement('A',65)}},
    ],
    layerShown(){return hasAchievement('A',65)},
    branches: ['MT'],
    autoUpgrade() {return hasMilestone('E',6)&&player.I.IUauto},
    passiveGeneration()
    {
        mult = new Decimal(0)
        if(hasUpgrade('E',181)) mult=mult.add(0.01)
        //mult=mult.toNumber()
        return mult
    },
    onPrestige(gain){
        if(player.I.inf.gte(1)&&n(player.I.resetTime).lt(player.I.bestTime)) player.I.bestTime = n(player.I.resetTime)
        player.I.inf = player.I.inf.add(tmp.I.infgain)
    },
    tabFormat: {
   "Upgrades": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.I.IUtip],
    ["upgrades",[1,2,3,4]],["buyables",[1]],["display-text", () => tmp.I.IUtip2],
        "clickables",
    ],
    },
    "Normal Challenges": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.I.NCtip],
            ["challenges",[1]],
    ],
    unlocked(){return player.I.inf.gte(1)||hasMilestone('E',2)},
    },
    "Automation": {
        content: [ "main-display","prestige-button","resource-display","milestones",
    ],
    unlocked(){return hasUpgrade('I',14)||hasMilestone('E',1)},
    },
    "Breaking Infinity": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.I.BItip],
            ["upgrades",[5,6,7,8,9,10,11,12]],["buyables",[2]]
    ],
    unlocked(){return (player.I.upgrades.length>=16&&tmp.I.NCcomp.gte(6))||hasMilestone('E',6)},
    },
    "Infinity Generator": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.I.IGtip],
            ["buyables",[3]]
    ],
    unlocked(){return hasMilestone('qa',0)},
    },
    "Infinity Challenges": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.I.ICtip],
            ["challenges",[2]],["buyables",[4]]
    ],
    unlocked(){return hasUpgrade('I',84)},
    },
    "Timewall Power": {
        content: [ "main-display","prestige-button","resource-display",["upgrades",[13]],
            ["display-text", () => tmp.I.TPtip],
            ["challenges",[3]],["buyables",[5]],["upgrades",[14,15,16]]
    ],
    unlocked(){return hasChallenge('I',28)},
    },
    "Q-Upgrade Booster": {
        content: [ "main-display","prestige-button","resource-display",["upgrades",[17]],
            ["display-text", () => tmp.I.UBtip],["buyables",[6]]
    ],
    unlocked(){return hasUpgrade('I',164)},
    },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > 3) {
            player.I.ipower = n(1)
       }
        if (layers[resettingLayer].row == 5) {
    let kept = []
    if(getClickableState('I',51)==0) kept.push('clickables')
    if(hasMilestone('E',0)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
    },
    clickables: {
        11: {
            title() {a='I1-1 Boost'
                if(options.Chinese) a='I1-1 增强'
                return a
            },
            display() {a="Multiply Point Exponent Factory effect based on time played (ignoring softcaps), capped at 1.05."
                a=a+'<br>Currently: '+format(this.effect(),4)+'x'
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于游玩时间增益点数指数因子效果，无视软上限，但上限为x1.05'
                a=a+'<br>当前: '+format(this.effect(),4)+'x'
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=n(player.timePlayed).times(tmp.E.TSeffect).add(1).log(10).add(1).log(10).div(250).add(1)
                a=a.min(1.05)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        21: {
            title() {a='I2-1 Boost'
                if(options.Chinese) a='I2-1 增强'
                return a
            },
            display() {a="Multiply Point Producer Multiplier exponent based on Infinities."
                a=a+'<br>Currently: '+format(this.effect(),4)+'x'
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于无限次数提升点数生产加成器指数'
                a=a+'<br>当前: '+format(this.effect(),4)+'x'
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=a=n(tmp.I.totalInf).add(1).log(10).add(1).log(10).div(150).add(1)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        31: {
            title() {a='I3-1 Boost'
                if(options.Chinese) a='I3-1 增强'
                return a
            },
            display() {a="Power Timewall and Super Timewall gain based on Infinities."
                a=a+'<br>Currently: ^'+format(this.effect(),4)
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于无限次数指数提升时间墙与超级时间墙获取'
                a=a+'<br>当前: ^'+format(this.effect(),4)
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=a=n(tmp.I.totalInf).add(1).log(10).add(1).log(10).div(150).add(1)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        41: {
            title() {a='I4-1 Boost'
                if(options.Chinese) a='I4-1 增强'
                return a
            },
            display() {a="Power Mega Timewall gain based on Infinities."
                a=a+'<br>Currently: ^'+format(this.effect(),4)
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于无限次数指数提升巨大时间墙获取'
                a=a+'<br>当前: ^'+format(this.effect(),4)
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=a=n(tmp.I.totalInf).add(1).log(10).add(1).log(10).div(150).add(1)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        12: {
            title() {a='I1-2 Boost'
                if(options.Chinese) a='I1-2 增强'
                return a
            },
            display() {a="Point Producer Multiplier cost scaling 4.5x -> 4x"
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='点数生产加成器花费折算 4.5x -> 4x'
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        51: {
            title() {a='Reset All I-Upgrade Boost on Eternity'
                if(options.Chinese) a='在永恒时重置所有I-增强升级'
                return a
            },
            display() {a="Currently: "
                if(getClickableState(this.layer,this.id)==1) a=a+'Yes'
                if(getClickableState(this.layer,this.id)==0) a=a+'No'
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return true},
            //style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.Q.clickables[this.id].canClick()?"#eee308":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1-getClickableState(this.layer,this.id))},
        },
        22: {
            title() {a='I2-2 Boost'
                if(options.Chinese) a='I2-2 增强'
                return a
            },
            display() {a="Exponentally reduce QqQe308 requirement based on Infinities."
                a=a+'<br>Currently: ^'+format(this.effect(),4)
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于无限次数指数降低QqQe308需求'
                a=a+'<br>当前: ^'+format(this.effect(),4)
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=a=n(tmp.I.totalInf).add(1).log(10).add(1).log(10).div(150).times(-1).add(1).max(0.1)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        32: {
            title() {a='I3-2 Boost'
                if(options.Chinese) a='I3-2 增强'
                return a
            },
            display() {a="Power Super-QqQe308 and Super-cokecole generation speed based on Infinities."
                a=a+'<br>Currently: ^'+format(this.effect(),4)
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于无限次数指数提升超QqQe308与超cokecole的速度'
                a=a+'<br>当前: ^'+format(this.effect(),4)
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=a=n(tmp.I.totalInf).add(1).log(10).add(1).log(10).div(150).add(1)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        42: {
            title() {a='I4-2 Boost'
                if(options.Chinese) a='I4-2 增强'
                return a
            },
            display() {a="Power Super-qaqe308 generation speed based on Infinities."
                a=a+'<br>Currently: ^'+format(this.effect(),4)
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于无限次数指数提升超qaqe308的速度'
                a=a+'<br>当前: ^'+format(this.effect(),4)
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=a=n(tmp.I.totalInf).add(1).log(10).add(1).log(10).div(150).add(1)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        13: {
            title() {a='I1-3 Boost'
                if(options.Chinese) a='I1-3 增强'
                return a
            },
            display() {a="Multiply Point Exponent Factory effect based on times in this Infinity, capped at 1.03."
                a=a+'<br>Currently: '+format(this.effect(),4)+'x'
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于本次无限中的时间增益点数指数因子效果，无视软上限，但上限为x1.03'
                a=a+'<br>当前: '+format(this.effect(),4)+'x'
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=n(player.I.resetTime).times(tmp.E.TSeffect).add(1).log(10).add(1).log(10).div(250).add(1).min(1.03)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        23: {
            title() {a='I2-3 Boost'
                if(options.Chinese) a='I2-3 增强'
                return a
            },
            display() {a="Multiply Point Producer base effect based on total Infinity Points, again."
                a=a+'<br>Currently: '+format(this.effect())+'x'
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='再次基于总无限点数提升点数生成器基础效果'
                a=a+'<br>当前: '+format(this.effect())+'x'
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=n(player.I.total).pow(0.75).div(4).add(1)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        33: {
            title() {a='I3-3 Boost'
                if(options.Chinese) a='I3-3 增强'
                return a
            },
            display() {a="Multiply Point Producer Multiplier exponent by 1.01."
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='点数生产加成器指数x1.01'
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
        43: {
            title() {a='I4-3 Boost'
                if(options.Chinese) a='I4-3 增强'
                return a
            },
            display() {a="Multiply EP gain based on IP multiplier, capped at 1e10."
                a=a+'<br>Currently: '+format(this.effect())+'x'
                a=a+"<br><br>Requirement: "+format(tmp.I.boostedIU.add(1),0)+' I-Upgrade Booster(s)'
                if(options.Chinese) {a='基于无限点数获取倍率提升永恒点数获取，在1e10处达到上限'
                    a=a+'<br>当前: '+format(this.effect())+'x'
                a=a+"<br><br>需求: "+format(tmp.I.boostedIU.add(1),0)+' 个 I-升级增强器'}
                return a
            },
            effect(){a=tmp.I.gainMult.pow(0.001)
                if(a.gte(1e10)) a=a.div(1e10).pow(0.25).times(1e10)
                if(!hasUpgrade('E',271))a=a.min(1e10)
                return a
            },
            unlocked(){return hasUpgrade('cf',34)},
            canClick(){return getBuyableAmount('cf',11).gte(tmp.I.boostedIU.add(1))&&getClickableState(this.layer,this.id)==0},
            style() { return { 'background-color': getClickableState(this.layer,this.id)==1?"#c3beff":layers.I.clickables[this.id].canClick()?"#b67f33":"#BF8F8F"}},
            onClick(){setClickableState(this.layer,this.id,1)},
        },
    },
    upgrades: {
        11: {
            title: "I1-1",
            description() {a="Multiply Point Producer base effect based on time played."
                if(options.Chinese) a='基于游玩时间提升点数生成器基础效果'
                return a
            },
            effect() {
                return n(player.timePlayed).times(tmp.E.TSeffect).add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(0.5),
            unlocked() {return true},
        },
        21: {
            title: "I2-1",
            description() {a="Multiply Point Producer Multiplier base effect based on Infinities."
                if(options.Chinese) a='基于无限次数提升点数生成器基础效果'
                return a
            },
            effect() {
                a=n(tmp.I.totalInf).add(1)
                if(hasUpgrade('E',31)) a=a.pow(1.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',11)},
        },
        31: {
            title: "I3-1",
            description() {a="Multiply Timewall and Super Timewall gain based on Infinities."
                if(options.Chinese) a='基于无限次数提升时间墙与超级时间墙获取'
                return a
            },
            effect() {
                a=n(tmp.I.totalInf).add(1)
                if(hasUpgrade('E',31)) a=a.pow(1.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',21)},
        },
        41: {
            title: "I4-1",
            description() {a="Multiply Mega Timewall gain based on Infinities."
                if(options.Chinese) a='基于无限次数提升巨大时间墙获取'
                return a
            },
            effect() {
                a=n(tmp.I.totalInf).add(1)
                if(hasUpgrade('E',31)) a=a.pow(1.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',31)},
        },
        
        12: {
            title: "I1-2",
            description() {a="Point Producer Multiplier cost scaling 5x -> 4.5x"
                if(options.Chinese) a='点数生产加成器花费折算 5x -> 4.5x'
                return a
            },
            cost: new Decimal(0.5),
            unlocked() {return true},
        },
        22: {
            title: "I2-2",
            description() {a="Divide QqQe308 requirement based on Infinities."
                if(options.Chinese) a='基于无限次数降低QqQe308需求'
                return a
            },
            effect() {
                a=n(tmp.I.totalInf).add(1)
                if(hasUpgrade('E',31)) a=a.pow(1.5)
                return a
            },
            effectDisplay() { return '/'+format(upgradeEffect(this.layer, this.id)) },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',12)},
        },
        32: {
            title: "I3-2",
            description() {a="Multiply Super-QqQe308 generation speed based on Infinities."
                if(options.Chinese) a='基于无限次数提升超QqQe308速度'
                return a
            },
            effect() {
                a=n(tmp.I.totalInf).add(1)
                if(hasUpgrade('E',31)) a=a.pow(1.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',22)},
        },
        42: {
            title: "I4-2",
            description() {a="Multiply Super-cokecole generation speed based on Infinities."
                if(options.Chinese) a='基于无限次数提升超cokecole速度'
                return a
            },
            effect() {
                a=n(tmp.I.totalInf).add(1)
                if(hasUpgrade('E',31)) a=a.pow(1.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',32)},
        },
        13: {
            title: "I1-3",
            description() {a="Multiply Point Producer base effect based on times in this Infinity."
                if(options.Chinese) a='基于本次无限时间提升点数生成器基础效果'
                return a
            },
            effect() {
                return n(player.I.resetTime).times(tmp.E.TSeffect).add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1),
            unlocked() {return true},
        },
        23: {
            title: "I2-3",
            description() {a="Multiply Point Producer base effect based on total Infinity Points."
                if(options.Chinese) a='基于总无限点数提升点数生成器基础效果'
                return a
            },
            effect() {
                return n(player.I.total).pow(1.5).div(4).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(5),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',13)},
        },
        33: {
            title: "I3-3",
            description() {a="Add 0.5 to the Point Producer Multiplier exponent."
                if(options.Chinese) a='点数生产加成器指数+0.5'
                return a
            },
            cost: new Decimal(10),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',23)},
        },
        43: {
            title: "I4-3",
            description: "",
            description() {a="Generate Infinity Points based on your IP multiplier and your fastest Infinity."
                if(options.Chinese) a='基于无限点数倍率与你最快的无限时间，被动获取无限点数'
                return a
            },
            effect() {
                return tmp.I.gainMult
            },
            effectDisplay() { a=format(upgradeEffect(this.layer, this.id))+" IP per "+formatTime(player.I.bestTime.times(10))
                if(player.I.bestTime.gte(1e300)) a='too slow to generate'
                return a
             },
            cost: new Decimal(15),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',33)},
        },
        14: {
            title: "I1-4",
            description() {a="Unlock autobuyers for row 1 layers, keep milestones in row 1 layers, and gain 50% more Timewall on reset every second."
                if(options.Chinese) a='解锁第1行层级的自动化，保留第1行层级的里程碑，每秒获取50%重置时获取的时间墙'
                return a
            },
            cost: new Decimal(5),
            unlocked() {return true},
        },
        24: {
            title: "I2-4",
            description() {a="Unlock autobuyers for row 2 layers, keep milestones in row 2 layers, and gain 50% more Super-Timewall on reset every second."
                if(options.Chinese) a='解锁第2行层级的自动化，保留第2行层级的里程碑，每秒获取50%重置时获取的超级时间墙'
                return a
            },
            cost: new Decimal(15),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',14)},
        },
        34: {
            title: "I3-4",
            description() {a="Unlock autobuyers for row 3 layers, keep milestones in row 3 layers, and gain 1% more Mega-Timewall on reset every second."
                if(options.Chinese) a='解锁第3行层级的自动化，保留第3行层级的里程碑，每秒获取1%重置时获取的巨大时间墙'
                return a
            },
            cost: new Decimal(30),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',24)},
        },
        44: {
            title: "I4-4",
            description() {a="Unlock autobuyers for MT-Challenge."
                if(options.Chinese) a='解锁自动完成巨大时间墙挑战'
                return a
            },
            cost: new Decimal(50),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',34)},
        },
        51: {
            title() {a="Break Infinity"
                if(options.Chinese) a='打破无限'
                return a
            },
            description() {a="Your points can go above 1.80e308, but it will be harder to get more points. Also delay the point softcap start by 1.34e154 and nerf it."
                if(options.Chinese) a='你的点数可以超过1.80e308，但获取更多点数会更困难。点数软上限延迟1.34e154开始且被削弱'
                return a
            },
            cost() {a=new Decimal(308)
                if(hasMilestone('E',2)) a=n(0)
                    return a
            },
            unlocked() {return (player.I.upgrades.length>=16&&tmp.I.NCcomp.gte(6))||hasMilestone('E',6)},
            canAfford(){return (player.I.upgrades.length>=16&&tmp.I.NCcomp.gte(6))||hasMilestone('E',6)},
        },
        61: {
            title: "BI1-1",
            description() {a="Unlock a buyable in Qi layer which enables you to make more kinds of super-man at a time."
                if(options.Chinese) a='在Qi层解锁一个可购买，使你能够同时超更多的人'
                return a
            },
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('I',51)},
        },
        62: {
            title: "BI1-2",
            description() {a="gain 50% more Mega-Timewall on reset every second, which is not affacted by any multipliers."
                if(options.Chinese) a='每秒获取50%更多的巨大时间墙，不受任何其他加成影响'
                return a
            },
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('I',51)},
        },
        63: {
            title: "BI1-3",
            description() {a="Nerf the Timewall softcap again, and unlock 2 more buyables."
                if(options.Chinese) a='削弱时间墙软上限，解锁2个可购买'
                return a
            },
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('I',51)},
        },
        64: {
            title: "BI1-4",
            description() {a="NC2's effect is always max and applies outside of NC2."
                if(options.Chinese) a='普通挑战2的效果总是最大，在挑战外也生效'
                return a
            },
            cost: new Decimal(2500),
            unlocked() {return hasUpgrade('I',51)},
        },
        71: {
            title: "BI2-1",
            description() {a="Multiply Point Producer Multiplier base effect based on your fastest Infinity."
                if(options.Chinese) a='基于你最快的无限增益点数生产器基础效果'
                return a
            },
            effect() {
                return n(player.I.bestTime).max(0.05).pow(-1).times(1e5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(25000),
            unlocked() {return hasUpgrade('I',51)},
        },
        72: {
            title: "BI2-2",
            description() {a="Multiply Point Producer Multiplier exponent based on your fastest Infinity."
                if(options.Chinese) a='基于你最快的无限增益点数生产加成器指数'
                return a
            },
            effect() {
                return n(1.5).sub(player.I.bestTime.max(0.5)).times(2).max(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(100000),
            unlocked() {return hasUpgrade('I',51)},
        },
        73: {
            title: "BI2-3",
            description() {a="Multiply Point Producer Multiplier base effect based on your Achievements."
                if(options.Chinese) a='基于你的成就数量增益点数生产器基础效果'
                return a
            },
            effect() {
                return n(1.15).pow(player.A.points)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1e7),
            unlocked() {return hasUpgrade('I',51)},
        },
        74: {
            title: "BI2-4",
            description() {a="Give free Point Exponent Factory based on your qaqe308."
                if(options.Chinese) a='基于你的qaqe308数量获得免费的点数指数因子'
                return a
            },
            effect() {
                return player.qa.points.pow(0.5).min(1000)
            },
            effectDisplay() { return '+'+format(upgradeEffect(this.layer, this.id)) },
            cost: new Decimal(1e9),
            unlocked() {return hasUpgrade('I',51)},
        },
        81: {
            title: "BI3-1",
            description() {a="Infinity Power also boost Timewall gain at a reduced rate, and each bought upgrade in this row multiply Infinity Generator base effect by 2."
                if(options.Chinese) a='无限力量也以削弱的效果增益时间墙获取，且此行中购买的每个升级都会使无限之力生成器基础效果x2'
                return a
            },
            effect() {a=n(1)
                if(hasUpgrade('I',81)) a=a.times(2)
                if(hasUpgrade('I',82)) a=a.times(2)
                if(hasUpgrade('I',83)) a=a.times(2)
                if(hasUpgrade('I',84)) a=a.times(2)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(5e9),
            unlocked() {return hasMilestone('qa',0)},
        },
        82: {
            title: "BI3-2",
            description() {a="Infinity Power also boost Super Timewall gain at a reduced rate."
                if(options.Chinese) a='无限力量也以削弱的效果增益超级时间墙获取'
                return a
            },
            cost: new Decimal(2.5e10),
            unlocked() {return hasMilestone('qa',0)},
        },
        83: {
            title: "BI3-3",
            description() {a="Infinity Power also boost Mega Timewall gain at a reduced rate, and unlock 2 more buyables."
                if(options.Chinese) a='无限力量也以削弱的效果增益巨型时间墙获取，且解锁2个可购买'
                return a
            },
            cost: new Decimal(5e10),
            unlocked() {return hasMilestone('qa',0)},
        },
        84: {
            title: "BI3-4",
            description() {a="Unlock Super-qaqe308 and Infinity Challenge."
                if(options.Chinese) a='解锁超qaqe308和无限挑战'
                return a
            },
            cost: new Decimal(1e11),
            unlocked() {return hasMilestone('qa',0)},
        },
        91: {
            title: "BI4-1",
            description() {a="Passively generate Infinity base on your fastest infinity."
                if(options.Chinese) a='基于你的最快无限被动生成无限次数'
                return a
            },
            effect() {a=n(0.2).div(player.I.bestTime)
                return a
            },
            effectDisplay() { return '1.00 per '+formatTime(n(1).div(upgradeEffect(this.layer, this.id)))},
            cost: new Decimal(1e12),
            unlocked() {return hasMilestone('qa',1)},
        },
        92: {
            title: "BI4-2",
            description() {a="Add 0.5 to Infinity Generator Multiplier base."
                if(options.Chinese) a='无限之力加成器底数+0.5'
                return a
            },
            cost: new Decimal(1e13),
            unlocked() {return hasMilestone('qa',1)},
        },
        93: {
            title: "BI4-3",
            description() {a="Multiply Infinity Generator base effect based on Point Producer Multiplier effect."
                if(options.Chinese) a='根据点数生产加成器效果倍增无限之力生成器基础效果'
                return a
            },
            effect() {a=buyableEffect('T',12).pow(0.1).add(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5e13),
            unlocked() {return hasMilestone('qa',1)},
        },
        94: {
            title: "BI4-4",
            description() {a="Multiply Point Producer base effect based on Infinity Generator Multiplier effect."
                if(options.Chinese) a='根据无限生成器乘数效果倍增点数生产器基础效果'
                return a
            },
            effect() {a=buyableEffect('I',32).pow(25)
                if(a.gte('1e1e6')) a=a.div('1e1e6').pow(0.25).times('1e1e6')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(2.5e14),
            unlocked() {return hasMilestone('qa',1)},
        },
        101: {
            title: "BI5-1",
            description() {a="Give free Infinity Generator based on bought IGM and PPM."
                if(options.Chinese) a='根据购买的无限之力加成器乘数和点数生产加成器给予免费的无限之力生成器'
                return a
            },
            effect() {a=getBuyableAmount('I',32).times(getBuyableAmount('T',12))
                return a
            },
            effectDisplay() { return '+'+format(upgradeEffect(this.layer, this.id))},
            cost: new Decimal(1e27),
            unlocked() {return hasUpgrade('qa',14)},
        },
        102: {
            title: "BI5-2",
            description() {a="Multiply free PP and PPM based on bought IG."
                if(options.Chinese) a='根据购买的无限之力生成器倍增免费的点数生产器和点数生产加成器'
                return a
            },
            effect() {a=getBuyableAmount('I',31).pow(2)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5e28),
            unlocked() {return hasUpgrade('qa',14)},
        },
        103: {
            title: "BI5-3",
            description() {a="Give free Infinity Generator Multiplier based on bought IEF."
                if(options.Chinese) a='根据购买的无限之力指数因子给予免费的无限之力加成器'
                return a
            },
            effect() {a=getBuyableAmount('I',33)
                return a
            },
            effectDisplay() { return '+'+format(upgradeEffect(this.layer, this.id))},
            cost: new Decimal(1e30),
            unlocked() {return hasUpgrade('qa',14)},
        },
        104: {
            title: "BI5-4",
            description() {a="Infinity Exponent Factory and Point Exponent Factory is 1.5x effective."
                if(options.Chinese) a='无限之力指数因子和点数指数因子的效果变为原来的1.5倍'
                return a
            },
            cost: new Decimal(1e32),
            unlocked() {return hasUpgrade('qa',14)},
        },
        111: {
            title: "BI6-1",
            description() {a="Multiply Super-cokecole generation speed based on effective Super-qaqe308."
                if(options.Chinese) a='基于超QqQe308次数增益超cokecole的速度'
                return a
            },
            effect() {a=tmp.Qi.effqaqe308.times(100).max(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e38),
            unlocked() {return hasUpgrade('qa',21)},
        },
        112: {
            title: "BI6-2",
            description() {a="Multiply Super-cokecole generation speed based on total Infinity Points."
                if(options.Chinese) a='基于总无限点数增益超cokecole的速度'
                return a
            },
            effect() {a=player.I.total.add(1).pow(0.1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e39),
            unlocked() {return hasUpgrade('qa',21)},
        },
        113: {
            title: "BI6-3",
            description() {a="Multiply Super-qaqe308 generation speed based on effective Super-cokecole."
                if(options.Chinese) a='基于超cokecole的次数倍增超qaqe308的速度'
                return a
            },
            effect() {a=tmp.Qi.effcokecole.add(1).log(10).add(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e40),
            unlocked() {return hasUpgrade('qa',21)},
        },
        114: {
            title: "BI6-4",
            description() {a="Multiply Super-qaqe308 generation speed based on Monika Points."
                if(options.Chinese) a='基于Monika点数倍增超qaqe308的速度'
                return a
            },
            effect() {a=player.qa.monika.pow(0.15)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e45),
            unlocked() {return hasUpgrade('qa',21)},
        },
        121: {
            title: "BI7-1",
            description() {a="Multiply Monika Point gain based on effective Super-qaqe308."
                if(options.Chinese) a='基于超qaqe308的次数倍增Monika点数获取'
                return a
            },
            effect() {a=tmp.Qi.effqaqe308.add(1).pow(0.1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e56),
            unlocked() {return hasChallenge('I',26)},
        },
        122: {
            title: "BI7-2",
            description() {a="Multiply Monika Point gain based on total Infinity Points."
                if(options.Chinese) a='基于总无限点数倍增Monika点数获取'
                return a
            },
            effect() {a=player.I.total.add(1).pow(0.01)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e59),
            unlocked() {return hasChallenge('I',26)},
        },
        123: {
            title: "BI7-3",
            description() {a="Multiply Monika Point gain based on Infinities."
                if(options.Chinese) a='基于无限次数倍增Monika点数获取'
                return a
            },
            effect() {a=tmp.I.totalInf.add(1).pow(0.1)
                if(hasUpgrade('E',31)) a=a.pow(1.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e62),
            unlocked() {return hasChallenge('I',26)},
        },
        124: {
            title: "BI7-4",
            description() {a="Multiply Monika Point gain based on Bought Infinity Generator."
                if(options.Chinese) a='基于购买的无限之力生成器倍增Monika点数获取'
                return a
            },
            effect() {a=getBuyableAmount('I',31).times(0.1).add(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e65),
            unlocked() {return hasChallenge('I',26)},
        },
        131: {
            title() {a="Unlock Timewall Power"
                if(options.Chinese) a='解锁时间墙能量'
                return a
            },
            description() {a="A new feature, a boost to IG."
                if(options.Chinese) a='时间墙能量可以增益无限之力生成器'
                return a
            },
            cost() {a=new Decimal(1e120)
                if(inChallenge('E',24)) a=n(1e310)
                return a
            },
            unlocked() {return hasChallenge('I',28)},
        },
        141: {
            title: "TP1-1",
            description() {a="Multiply Point Producer base effect based on Timewall Power."
                if(options.Chinese) a='基于时间墙能量增益点数生成器基础效果'
                return a
            },
            effect() {a=player.I.tpower.add(1).pow(2)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1000),
            unlocked() {return getBuyableAmount('I',54).gte(1)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        142: {
            title: "TP1-2",
            description() {a="Multiply Super-QqQe308 and Super-cokecole generation speed based on Timewall Power."
                if(options.Chinese) a='基于时间墙能量倍增超QqQe308和超cokecole的速度'
                return a
            },
            effect() {a=player.I.tpower.add(1).pow(0.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(10000),
            unlocked() {return getBuyableAmount('I',54).gte(1)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        143: {
            title: "TP1-3",
            description() {a="Multiply Super-qaqe308 generation speed based on Timewall Power."
                if(options.Chinese) a='基于时间墙能量倍增超qaqe308的速度'
                return a
            },
            effect() {a=player.I.tpower.add(1).pow(0.3)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(50000),
            unlocked() {return getBuyableAmount('I',54).gte(1)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        144: {
            title: "TP1-4",
            description() {a="Multiply Monika Points gain based on Timewall Power, and improve Timewall Power gain formula."
                if(options.Chinese) a='基于时间墙能量倍增Monika点数获取，并改进时间墙能量获取公式'
                return a
            },
            effect() {a=player.I.tpower.add(1).pow(0.1)
                if(a.gte(100)) a=a.sub(99).log(2).add(100)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(250000),
            unlocked() {return getBuyableAmount('I',54).gte(1)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        151: {
            title: "TP2-1",
            description() {a="Multiply Timewall Power gain based on total Infinity Points."
                if(options.Chinese) a='基于总无限点数倍增时间墙能量获取'
                return a
            },
            effect() {a=player.I.total.log(1e20)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e9),
            unlocked() {return getBuyableAmount('I',54).gte(2)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        152: {
            title: "TP2-2",
            description() {a="Multiply Timewall Power gain based on effective Super-qaqe308."
                if(options.Chinese) a='基于超qaqe308的次数倍增时间墙能量获取'
                return a
            },
            effect() {a=tmp.Qi.effqaqe308.add(1).log(10).add(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e11),
            unlocked() {return getBuyableAmount('I',54).gte(2)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        153: {
            title: "TP2-3",
            description() {a="Multiply Timewall Power gain based on Monika Buyables 1 bought."
                if(options.Chinese) a='基于Monika可购买1的购买次数倍增时间墙能量获取'
                return a
            },
            effect() {a=getBuyableAmount('qa',11).add(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e13),
            unlocked() {return getBuyableAmount('I',54).gte(2)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        154: {
            title: "TP2-4",
            description() {a="IC5's effect is nerfed to ^0.6 in 'All in One' challenge."
                if(options.Chinese) a='在“八合一”挑战中，无限挑战5的效果变为^0.6'
                return a
            },
            cost: new Decimal(1e14),
            unlocked() {return getBuyableAmount('I',54).gte(2)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        161: {
            title: "TP3-1",
            description() {a="Multiply Infinity Generator Multiplier based on Timewall Power."
                if(options.Chinese) a='基于时间墙能量增益无限之力加成器底数'
                return a
            },
            effect() {a=player.I.tpower.add(1).log(1e10).add(1).pow(0.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e21),
            unlocked() {return getBuyableAmount('I',54).gte(3)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        162: {
            title: "TP3-2",
            description() {a="Free PP and PPM is raised to ^1.1."
                if(options.Chinese) a='免费的点数生产器和点数生产加成器提升到^1.1'
                return a
            },
            cost: new Decimal(1e24),
            unlocked() {return getBuyableAmount('I',54).gte(3)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        163: {
            title: "TP3-3",
            description() {a="TP1-1's effect also applies to all kinds of Timewall(exclude Compressed Timewall)."
                if(options.Chinese) a='TP1-1的效果适用于所有类型的时间墙（压缩时间墙除外）'
                return a
            },
            cost: new Decimal(1e30),
            unlocked() {return getBuyableAmount('I',54).gte(3)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        164: {
            title: "TP3-4",
            description() {a="Unlock Upgrade Booster."
                if(options.Chinese) a='解锁升级增强器'
                return a
            },
            cost: new Decimal(1e40),
            unlocked() {return getBuyableAmount('I',54).gte(3)},
            currencyLocation() {return player.I},
            currencyDisplayName: 'Timewall Power',
            currencyInternalName: 'tpower',
        },
        171: {
            title() {a="Unlock Q-Upgrade Booster"
                if(options.Chinese) a='解锁Q-升级增强器'
                return a
            },
            description() {a="A new feature, a boost to Q-Upgrades."
                if(options.Chinese) a='Q-升级增强器可以增益QqQe308升级'
                return a
            },
            cost() {a=new Decimal(1e220)
                if(inChallenge('E',24)) a=n(1e310)
                return a
            },
            unlocked() {return hasUpgrade('I',164)},
        },
        172: {
            title() {a="Timewall is weaker now"
                if(options.Chinese) a='时间墙弱化'
                return a
            },
            description() {a="x10 QUBF gain."
                if(options.Chinese) a='Q-升级增强器碎片获取x10'
                return a
            },
            cost: new Decimal(1e256),
            unlocked() {return hasUpgrade('I',171)},
        },
        173: {
            title() {a="Timewall is more weaker"
                if(options.Chinese) a='时间墙弱化 II'
                return a
            },
            description() {a="x5 QUBF and Monika Point gain."
                if(options.Chinese) a='Q-升级增强器碎片和Monika点数增益x5'
                return a
            },
            cost: new Decimal(1e268),
            unlocked() {return hasUpgrade('I',172)},
        },
        174: {
            title() {a="Self-Boost"
                if(options.Chinese) a='自我增强'
                return a
            },
            description() {a="QUBF boosts QUBF gain."
                if(options.Chinese) a='Q-升级增强器增益Q-升级增强器获取'
                return a
            },
            effect() {a=player.I.QUBF.add(10).log(10).max(player.I.QUBF.add(1).pow(0.1))
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e280),
            unlocked() {return hasUpgrade('I',173)},
        },
    },
    challenges: {
        11: {
            name() {a="Normal Challenge 1"
                if(options.Chinese) a='普通挑战1'
                return a
            },
            challengeDescription() {a="Infinity for the first time."
                if(options.Chinese) a='第一次无限'
                return a
            },
            goalDescription(){a="Reach Infinity."
                if(options.Chinese) a='达到无限'
                return a
            },
            rewardDescription(){a="Point boosts Point Producer base effect."
                if(options.Chinese) a='点数提升点数生产器基础效果'
                return a
            },
            rewardEffect(){a=player.points.max(1).pow(0.01)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)||hasMilestone('E',2)}
        },
        12: {
            name() {a="Normal Challenge 2"
                if(options.Chinese) a='普通挑战2'
                return a
            },
            challengeDescription() {a="Point Producer base effect is heavily reduced, but gets an exponentially increasing multiplier, capped at 1e100. This multiplier resets after every reset."
                a=a+'<br/>Currently: '+format(tmp.I.NC2eff)+'x'
                if(options.Chinese) {a='点数生产器基础效果大幅削弱，但获得一个指数增长的乘数，最高1e100，且在任意重置后重置<br/>当前：'+format(tmp.I.NC2eff)+'x'}
                return a
            },
            goalDescription(){a="Reach Infinity."
                if(options.Chinese) a='达到无限'
                return a
            },
            rewardDescription(){a="Point Producer base effect is multiplied by "+format(1000)+", but reduces based on time in this Infinity."
                if(options.Chinese) a='点数生产器基础效果x'+format(1000)+',但在此次无限中随时间减少'
                return a
            },
            rewardEffect(){a=n(1000).sub(n(player.I.resetTime).times(0.1)).max(1)
                if(hasUpgrade('I',64)) a=n(1000)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)||hasMilestone('E',2)}
        },
        13: {
            name() {a="Normal Challenge 3"
                if(options.Chinese) a='普通挑战3'
                return a
            },
            challengeDescription() {a="Point Producer Multiplier exponent is divided by 2."
                if(options.Chinese) a='点数生产加成器指数除以2'
                return a
            },
            goalDescription(){a="Reach Infinity."
                if(options.Chinese) a='达到无限'
                return a
            },
            rewardDescription(){a="Point Producer Multiplier base effect is multiplied by 10."
                if(options.Chinese) a='点数生产加成器基础效果x10'
                return a
            },
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)||hasMilestone('E',2)}
        },
        14: {
            name() {a="Normal Challenge 4"
                if(options.Chinese) a='普通挑战4'
            return a},
            challengeDescription() {a="Bought and free PEF is useless, but its effect is based on total Super-Timewall and Mega-Timewall, capped at 1.50."
                if(options.Chinese) a='点数指数因子无效，但其效果受超级时间墙和巨大时间墙影响，最高^1.50'
                return a
            },
            goalDescription(){a="Reach Infinity."
                if(options.Chinese) a='达到无限'
                return a
            },
            rewardDescription(){a="Multiply Point Exponent Factory base effect by 1.2."
                if(options.Chinese) a='点数指数因子基础效果x1.2'
                return a
            },
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)||hasMilestone('E',2)}
        },
        15: {
            name() {a="Normal Challenge 5"
                if(options.Chinese) a='普通挑战5'
                return a
            },
            challengeDescription() {a="Free buyables are disabled. When you buy a T-buyable, you must pay 1/3 of it in taxes."
                if(options.Chinese) a='免费可购买被禁用，有效的时间墙可购买数量减少1/3'
                return a
            },
            goalDescription(){a="Reach Infinity."
                if(options.Chinese) a='达到无限'
                return a
            },
            rewardDescription(){a="Divide QqQe308 cost scaling based on effective Super-QqQe308."
                if(options.Chinese) a='基于超QqQe308的次数降低QqQe308需求折算'
                return a
            },
            rewardEffect(){a=tmp.Qi.effQqQe308.add(1).pow(0.02).min(10)
                return a
            },
            rewardDisplay(){return '/'+format(challengeEffect(this.layer, this.id))},
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)||hasMilestone('E',2)}
        },
        16: {
            name() {a="Normal Challenge 6"
                if(options.Chinese) a='普通挑战6'
                return a
            },
            challengeDescription() {a="Push yourself in any MT-Challenge in normal Infinity to complete it. You don't need to enter this challenge."
                if(options.Chinese) a='在任意巨大时间墙挑战中达到无限（你无需进入此挑战）'
                return a
            },
            goalDescription(){a="Reach 1.80e308 points in any MT-Challenge in normal Infinity."
                if(options.Chinese) a='在任何巨大时间墙挑战中达到1.80e308点数'
                return a
            },
            rewardDescription(){a="M1-2 and M1-3's effect is powered to ^4."
                if(options.Chinese) a='M1-2和M1-3的效果^4。'
                return a
            },
            canComplete: function() {return false},
            unlocked() {return player.I.inf.gte(1)||hasMilestone('E',2)}
        },
        21: {
            name() {a="Infinity Challenge 1"
                if(options.Chinese) a='无限挑战1'
                return a
            },
            challengeDescription() {a="Normal Challenge 2~5 are actived at once, the effect of NC2 is powered to ^-1, and PEF effect is capped at 1.20."
                if(options.Chinese) a='普通挑战2~5同时激活，普通挑战2的效果变为原来的-1次方，点数指数因子的效果限制在^1.20'
                return a
            },
            goalDescription() {a="1e600 Points in any MT-Challenge."
                if(options.Chinese) a='在任意巨大时间墙挑战中达到1e600点数'
                return a
            },
            rewardDescription() {a="x10 to Infinity Generator base effect per Infinity Challenge completed."
                if(options.Chinese) a='每完成一个无限挑战，无限之力生成器基础效果x10'
                return a
            },
            countsAs:[12,13,14,15],
            rewardEffect(){a=n(10).pow(tmp.I.ICcomp)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte('1e600')&&(inChallenge('MT',11)||inChallenge('MT',12)||inChallenge('MT',13)||inChallenge('MT',14))},
            unlocked() {return getBuyableAmount('I',41).gte(1)}
        },
        22: {
            name() {a="Infinity Challenge 2"
                if(options.Chinese) a='无限挑战2'
                return a
            },
            challengeDescription() {a="MT-Challenge reward is disabled."
                if(options.Chinese) a='巨大时间墙挑战奖励被禁用'
                return a
            },
            goalDescription() {a="1e1750 Points."
                if(options.Chinese) a='1e1750点数'
                return a
            },
            rewardDescription() {a="Power MT-Challenge reward(^1.5 for MTC1, 2, and 4, ^3 for MTC3), and +0.5 to Infinity Generator Multiplier base per Infinity Challenge completed."
                if(options.Chinese) a='强化巨大时间墙挑战奖励（挑战1、2、4效果^1.5，挑战3效果^3），且每完成一个无限挑战，无限之力加成器底数+0.5'
                return a
            },
            rewardEffect(){a=n(0.5).times(tmp.I.ICcomp)
                return a
            },
            rewardDisplay(){return '+'+format(challengeEffect(this.layer, this.id))},
            canComplete: function() {return player.points.gte('1e1750')},
            unlocked() {return getBuyableAmount('I',41).gte(2)}
        },
        23: {//67min
            name() {a="Infinity Challenge 3"
                if(options.Chinese) a='无限挑战3'
                return a
            },
            challengeDescription() {a="Point Exponent Factory boosts Point Producer Multiplier effect instead of Point Producer."
                if(options.Chinese) a='点数指数因子增益点数生产加成器指数而不是点数生产器效果'
                return a
            },
            goalDescription() {a="1e1600 Points."
                if(options.Chinese) a='1e1600点数'
                return a
            },
            rewardDescription() {a="Multiply Point Producer Multiplier Exponent based on bought PEF."
                if(options.Chinese) a='根据购买的点数指数因子数量增益点数生产加成器指数'
                return a
            },
            rewardEffect(){a=getBuyableAmount('T',13).times(0.02).add(1)
                if(a.gte(10)) a=a.div(10).pow(0.35).times(10)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte('1e1600')},
            unlocked() {return getBuyableAmount('I',41).gte(3)}
        },
        24: {//56min
            name() {a="Infinity Challenge 4"
                if(options.Chinese) a='无限挑战4'
                return a
            },
            challengeDescription() {a="Point softcap and Timewall softcap is a lot stronger."
                if(options.Chinese) a='点数软上限和时间墙软上限更强'
                return a
            },
            goalDescription() {a="1e729 Points."
                if(options.Chinese) a='1e729点数'
                return a
            },
            rewardDescription() {a="Multiply Point Exponent Factory effect by 1.05, applies after all softcaps."
                if(options.Chinese) a='点数指数因子效果x1.05，无视软上限'
                return a
            },
            canComplete: function() {return player.points.gte('1e729')},
            unlocked() {return getBuyableAmount('I',41).gte(4)}
        },
        25: {//46min
            name() {a="Infinity Challenge 5"
                if(options.Chinese) a='无限挑战5'
                return a
            },
            challengeDescription() {a="Infinity Exponent Factory effect is multiplied by 0.1."
                if(options.Chinese) a='无限之力指数因子效果x0.1'
                return a
            },
            goalDescription() {a="1e5400 Points."
                if(options.Chinese) a='1e5400点数'
                return a
            },
            rewardDescription() {a="Multiply Infinity Generator base effect based on Infinities."
                if(options.Chinese) a='基于无限次数增益无限之力生成器基础效果'
                return a
            },
            rewardEffect(){a=tmp.I.totalInf.pow(5).max(1)
                if(hasUpgrade('E',31)) a=a.pow(1.5)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte('1e5400')},
            unlocked() {return getBuyableAmount('I',41).gte(5)}
        },
        26: {//no timewall here
            name() {a="Infinity Challenge 6"
                if(options.Chinese) a='无限挑战6'
                return a
            },
            challengeDescription() {a="Your effective Super-QqQe308 is capped at 10000, and you can't gain Super-cokecole."
                if(options.Chinese) a='你最多只能超10000次QqQe308，且无法超cokecole.'
                return a
            },
            goalDescription() {a="1e7000 Points."
                if(options.Chinese) a='1e7000点数'
                return a
            },
            rewardDescription() {a="Multiply first 3 kinds of Super-man generation speed based on total Infinity Points, and unlock the 7th row of BI-Upgrade."
                if(options.Chinese) a='基于总无限点数增益超前三个人的速度，并解锁第7行BI升级.'
                return a
            },
            rewardEffect(){a=player.I.total.add(1).log(2).add(1)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte('1e7000')},
            unlocked() {return getBuyableAmount('I',41).gte(6)}
        },
        27: {//48~49min
            name() {a="Infinity Challenge 7"
                if(options.Chinese) a='无限挑战7'
                return a
            },
            challengeDescription() {a="Monika Buyable is 50% less effective."
                if(options.Chinese) a='Monika可购买效果降低50%'
                return a
            },
            goalDescription() {a="1e10950 Points."
                if(options.Chinese) a='1e10950点数'
                return a
            },
            rewardDescription() {a="Monika Buyable is 50% more effective, and multiply Monika Point gain by 2 per Infinity Challenge completed."
                if(options.Chinese) a='Monika可购买效果增加50%，且每完成一个无限挑战，Monika点数获取量翻倍'
                return a
            },
            rewardEffect(){a=n(2).pow(tmp.I.ICcomp)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte('1e10950')},
            unlocked() {return getBuyableAmount('I',41).gte(7)}
        },
        28: {//18min
            name() {a="Infinity Challenge 8"
                if(options.Chinese) a='无限挑战8'
                return a
            },
            challengeDescription() {a="All pre-Infinity resource and Infinity Power generation speed is divided by 1e50, and you can't reset for all kinds of Timewall."
                if(options.Chinese) a='所有无限前资源和无限之力生成速度/1e50，且你无法重置以获取所有类型的时间墙。'
                return a
            },
            goalDescription() {a="1e15000 Points."
                if(options.Chinese) a='1e15000点数'
                return a
            },
            rewardDescription() {a="Infinity Exponent Factory is twice effective, and unlock Timewall Power."
                if(options.Chinese) a='无限之力指数因子效果翻倍，并解锁时间墙能量。'
                return a
            },
            canComplete: function() {return player.points.gte('1e15000')},
            unlocked() {return getBuyableAmount('I',41).gte(8)}
        },
        31: {
            name() {a="All in One"
                if(options.Chinese) a='八合一'
                return a
            },
            challengeDescription() {a="Infinity Challenge 1~8 are actived at once, but IC5's effect is nerfed to ^0.5."
                if(options.Chinese) a='无限挑战1~8同时激活，但无限挑战5的效果被削弱到^0.5'
                return a
            },
            goalDescription() {a="Gain as many Timewalls as possible."
                if(options.Chinese) a='获得尽可能多的时间墙'
                return a
            },
            rewardDescription() {a="Gain Compressed Timewalls based on your all kinds of Timewall in this challenge."
                if(options.Chinese) a='基于你在本挑战中获得的所有类型的时间墙获得压缩时间墙'
                return a
            },
            countsAs:[21,22,23,24,25,26,27,28],
            rewardEffect(){a=player.I.C31base
                return a
            },
            rewardDisplay(){return '+'+format(challengeEffect(this.layer, this.id))},
            canComplete: function() {return false},
            unlocked() {return hasUpgrade('I',131)}
        },
    },
    milestones:{
        0: {
            requirementDescription() {a="Buy Upgrade I1-4"
                if(options.Chinese) a='购买升级 I1-4'
                return a
            },
            effectDescription() {a="Unlock (or keep) Autobuyers for T-Upgrades, T-Buyables(exclude Timewall Doubler), T-Challenges, QqQe308 reset and Q-Upgrades (arranged in order), keep 25 points on reset, and always show Q layer."
                if(options.Chinese) a='解锁（或保留）时间墙升级、时间墙可购买（不包括时间墙倍增器）、时间墙挑战、QqQe308和QqQe308升级的自动购买器（按顺序排列，下面的里程碑同理），重置时保留25点数，且始终显示Q层级。'
                return a
            },
            done() { return hasUpgrade('I',14) },
            toggles:[["T", "TUauto"],["T", "PPauto"],["T", "PPMauto"],["T", "PEFauto"],["T", "TCauto"],["Q", "QqQauto"],["Q", "QUauto"]]
        },
        1: {
            requirementDescription() {a="Buy Upgrade I2-4"
                if(options.Chinese) a='购买升级 I2-4'
                return a
            },
            effectDescription() {a="Unlock (or keep) Autobuyers for ST-Upgrades, Timewall Doubler, ST-Challenges(even in MT-Challenge), QqQeInfinity reset (arranged in order), always show Qi layer, and unlock a new Q-Milestone."
                if(options.Chinese) a='解锁（或保留）超级时间墙升级、时间墙倍增器、超级时间墙挑战（即使在巨大时间墙挑战中）、QqQeInfinity的自动购买器，始终显示Qi层级，并解锁新的QqQe308里程碑。'
                return a
            },
            done() { return hasUpgrade('I',24) },
            toggles:[["ST", "STUauto"],["T", "TDauto"],["ST", "STCauto"],["Qi", "Qiauto"]]
        },
        2: {
            requirementDescription() {a="Buy Upgrade I3-4"
                if(options.Chinese) a='购买升级 I3-4'
                return a
            },
            effectDescription() {a="Unlock Autobuyers for MT-Upgrades, MT-Challenge buyable and cokecole reset (arranged in order), always show Co layer, unlock 2 new Q-Milestones, and you can always reset for Mega Timewall manually."
                if(options.Chinese) a='解锁巨大时间墙升级、巨大时间墙挑战可购买和cokecole的自动购买器，始终显示Co层级，解锁2个新的QqQe308里程碑，且你一直可以手动重置以获得巨大时间墙。'
                return a
            },
            done() { return hasUpgrade('I',34) },
            toggles:[["MT", "MTUauto"],["MT", "MTCUauto"],["co", "Coauto"]]
        },
        3: {
            requirementDescription() {a="Buy Upgrade I4-4"
                if(options.Chinese) a='购买升级 I4-4'
                return a
            },
            effectDescription() {a="Automatically gain MT-Challenge 1~4 completions based on your points(^0.5 for MT-Challenge 1 and 4)"
                if(options.Chinese) a='基于你的点数自动完成巨大时间墙挑战1~4（对巨大时间墙挑战1和4，有效点数^0.5）'
                return a
            },
            done() { return hasUpgrade('I',44) },
            toggles:[["MT", "MTC1auto"],["MT", "MTC2auto"],["MT", "MTC3auto"],["MT", "MTC4auto"]]
        },
    },
    buyables: {
        11: {
            title(){text = 'IP Doubler'
                if(options.Chinese) text='IP倍增器'
                text=text+'('+format(getBuyableAmount('I', this.id))
                //if(tmp.T.freeTD.neq(0))text=text+' + '+format(tmp.T.freeTD)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(10).pow(x.add(1)) },
            effect(x) {b=x
                e=n(0.5)
                if(hasUpgrade('E',201)) e=n(0.6)
                if(b.gte(200)) b=n(200).add(b.sub(200).pow(e))
                a=tmp.I.IPDbase.pow(b)
                    return a
            },
            display() { a="Multiply IP gain by "+format(tmp.I.IPDbase)+"<br/>Effect:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gt(200)) a=a+'(softcapped)'
                a=a+"<br/>Cost: "+format(this.cost())+' Infinity Points'
                if(options.Chinese) {a="无限点数获取量x"+format(tmp.I.IPDbase)+"<br/>效果:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gt(200)) a=a+'（受软上限限制）'
                a=a+"<br/>花费: "+format(this.cost())+' 无限点数'}
            return a},
            unlocked() {return player.I.upgrades.length >= 16||hasMilestone('E',6)},
            canAfford() { return player.I.points.gte(this.cost())&&player.I.upgrades.length >= 16 },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.points.max(1).log(10).sub(1)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        21: {
            title(){text = 'Nerf point softcap'
                if(options.Chinese) text='点数软上限削弱'
                text=text+'('+format(getBuyableAmount('I', this.id))
                //if(tmp.T.freeTD.neq(0))text=text+' + '+format(tmp.T.freeTD)
                text=text+'/10.00)'
                return text
            },
            cost(x) { return new Decimal(100).pow(x.add(1)) },
            effect(x) {a=x.times(0.01)
                //if(a.gte(1024)) a=n(2).pow(a.log(2).div(10).pow(0.5).times(10))
                    return a
            },
            display() { a="Add 0.01 to point softcap exponent<br/>Effect:+"+format(this.effect())
                a=a+"<br/>Cost: "+format(this.cost())+' Infinity Points'
                if(options.Chinese) {a="点数软上限指数+0.01<br/>效果:"+format(this.effect())+'<br>花费: '+format(this.cost())+' 无限点数'}
            return a},
            unlocked() {return hasUpgrade('I',63)},
            canAfford() { return player.I.points.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(10)
                    return a
            },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.points.max(1).log(100).sub(1)
					let target = tempBuy.plus(1).floor().min(10);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        22: {
            title(){text = 'Nerf Timewall softcap'
                if(options.Chinese) text='时间墙软上限削弱'
                text=text+'('+format(getBuyableAmount('I', this.id))
                //if(tmp.T.freeTD.neq(0))text=text+' + '+format(tmp.T.freeTD)
                text=text+'/10.00)'
                return text
            },
            cost(x) { return new Decimal(1000).pow(x.add(1)) },
            effect(x) {a=x.times(0.02)
                //if(a.gte(1024)) a=n(2).pow(a.log(2).div(10).pow(0.5).times(10))
                    return a
            },
            display() { a="Add 0.02 to Timewall softcap exponent<br/>Effect:+"+format(this.effect())
                a=a+"<br/>Cost: "+format(this.cost())+' Infinity Points'
                if(options.Chinese) {a="时间墙软上限指数+0.02<br/>效果:"+format(this.effect())+'<br>花费: '+format(this.cost())+' 无限点数'}
            return a},
            unlocked() {return hasUpgrade('I',63)},
            canAfford() { return player.I.points.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(10)
                    return a
            },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.points.max(1).log(1000).sub(1)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor().min(10);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        23: {
            title(){text = 'Add qaqe308 effect base'
                if(options.Chinese) text='增加qaqe308效果底数'

                text=text+'('+format(getBuyableAmount('I', this.id))
                //if(tmp.T.freeTD.neq(0))text=text+' + '+format(tmp.T.freeTD)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e5).pow(x.add(2)) },
            effect(x) {a=x
                    return a
            },
            display() { a="Add 1 to qaqe308 effect base<br/>Effect:+"+format(this.effect())
                a=a+"<br/>Cost: "+format(this.cost())+' Infinity Points'
                if(options.Chinese) {a="qaqe308效果底数+1<br/>效果:"+format(this.effect())+'<br>花费: '+format(this.cost())+' 无限点数'}
            return a},
            unlocked() {return hasUpgrade('I',83)},
            canAfford() { return player.I.points.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.points.max(1).log(1e5).sub(2)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        24: {
            title(){text = 'Add Monika Point effect exponent'
                if(options.Chinese) text='增加Monika点数效果指数'
                text=text+'('+format(getBuyableAmount('I', this.id))
                //if(tmp.T.freeTD.neq(0))text=text+' + '+format(tmp.T.freeTD)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e5).pow(x.pow(2).add(2)) },
            effect(x) {a=x.times(0.05)
                    return a
            },
            display() { a="Add 0.05 to Monika Point effect exponent<br/>Effect:+"+format(this.effect())
                a=a+"<br/>Cost: "+format(this.cost())+' Infinity Points'
                if(options.Chinese) {a="Monika点数效果指数+0.05<br/>效果:"+format(this.effect())+'<br>花费: '+format(this.cost())+' 无限点数'}
            return a},
            unlocked() {return hasUpgrade('I',83)},
            canAfford() { return player.I.points.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.points.max(1e5).log(1e5).sub(2).max(0).pow(0.5)
					let target = tempBuy.add(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        31: {
            title(){text = 'Infinity Generator'
                    if(options.Chinese) text='无限之力生产器'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                if(tmp.I.freeIG.neq(0))text=text+' + '+format(tmp.I.freeIG)
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(10).pow(x).times(1e5)
                    return a
             },
            effect(x) {return x.add(tmp.I.freeIG).times(tmp.I.IGmult)},
            display() {a= "Produce "+format(tmp.I.IGmult)+" Infinity Powers Per Second<br/>Effect:produces "+format(this.effect())
                if(buyableEffect('I',33).neq(1)) a=a+'^'+format(buyableEffect('I',33))+'='+format(tmp.I.actualIPowgen)
                a=a+" Infinity Powers/s<br/>"
                if(tmp.I.actualIPowgen.neq(tmp.I.reaalIPowgen)) a=a+'After softcap:'+format(tmp.I.reaalIPowgen)+'/s<br>'
            if(tmp.I.ipowmult.neq(1)) a=a+'Your other effects multiply your Infinity Power gain by '+format(tmp.I.ipowmult)+'.<br>'
            a=a+"Cost: "+format(this.cost())+' Infinity Points'
            if(options.Chinese) {a="每秒生产"+format(tmp.I.IGmult)+"无限之力<br/>效果:每秒生产"+format(this.effect())
            if(buyableEffect('I',33).neq(1)) a=a+'^'+format(buyableEffect('I',33))+'='+format(tmp.I.actualIPowgen)
                a=a+"无限之力/s<br>"
            if(tmp.I.actualIPowgen.gte(1e250)) a=a+'软上限后:'+format(tmp.I.reaalIPowgen)+'/s<br>'
            if(tmp.I.ipowmult.neq(1)) a=a+'你的其他效果使你获得的无限之力乘以'+format(tmp.I.ipowmult)+'.<br>'
            a=a+"花费: "+format(this.cost())+' 无限点数'
            }
            return a },
            unlocked() {return hasMilestone('qa', 0)},
            canAfford() { return player.I.points.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(1.79e309)
                //if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.points.max(1e5).div(1e5).log(10)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        32: {
            title(){text = 'Infinity Generator Multiplier'
                    if(options.Chinese) text='无限之力加成器'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                if(tmp.I.freeIGM.neq(0))text=text+' + '+format(tmp.I.freeIGM)
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(1e3).pow(x).times(1e9)
                    return a
             },
            effect(x) {a= tmp.I.IGMbase.pow(x.add(tmp.I.freeIGM))
                if(x.add(tmp.I.freeIGM).gte(50)) a=tmp.I.IGMbase.pow(n(50).add(x.add(tmp.I.freeIGM).sub(50).pow(0.5)))
                return a
            },
            display() {a= "Multiply Infinity Generator base effect by "+format(tmp.I.IGMbase)+"<br/>Effect:"+format(this.effect())+'x'
            if(getBuyableAmount('I',32).add(tmp.I.freeIGM).gte(50)) a=a+'(Softcapped)'
            a=a+"<br>Cost: "+format(this.cost())+' Infinity Points'
            if(options.Chinese) {a="无限之力生成器基础效果x"+format(tmp.I.IGMbase)+"<br/>效果:"+format(this.effect())+'x'
            if(getBuyableAmount('I',32).add(tmp.I.freeIGM).gte(50)) a=a+'（受软上限限制）'
            a=a+"<br>花费: "+format(this.cost())+' 无限点数'
            }
            return a },
            unlocked() {return hasMilestone('qa', 0)},
            canAfford() { return player.I.points.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.points.max(1e9).div(1e9).log(1e3)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        33: {
            title(){text = 'Infinity Exponent Factory'
                    if(options.Chinese) text='无限之力指数因子'
                text=text+'('+format(getBuyableAmount('I', this.id))
                //if(tmp.T.freePEF.neq(0))text=text+' + '+format(tmp.T.freePEF)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e10).pow(x.pow(2)).times(1e10) },
            effect(x) {a=x.times(tmp.I.IEFbase).add(1)
                if(inChallenge('I',25)) a=a.times(0.1)
                if(inChallenge('I',31)) {a=a.times(5)
                    if(hasUpgrade('I',154)) a=a.times(1.5)
                }
                if(a.gte(1.5)) a=a.sub(1.5).div(10).add(1.5)
                if(a.gte(2)) a=a.add(2).log(2)
                a=a.times(tmp.I.IEFmult)
                if(inChallenge('E',33)) a=n(1)
                    return a
            },
            display() { a="Add "+format(tmp.I.IEFbase)+" to Infinity Generator Effect Exponent<br/>Effect:^"+format(this.effect().div(tmp.I.IEFmult),4)
                if(buyableEffect('I',33).gte(1.5)) a=a+'(Softcapped)' 
                if(tmp.I.IEFmult.neq(1)) a=a+'x'+format(tmp.I.IEFmult,4)+'='+format(this.effect(),4)
                a=a+"<br/>Cost: "+format(this.cost())+' Infinity Points'
                if(options.Chinese) {a="无限之力生成器效果指数+"+format(tmp.I.IEFbase)+"<br/>效果:^"+format(this.effect(),4)
                if(buyableEffect('I',33).gte(1.5)) a=a+'（受软上限限制）'
                if(tmp.I.IEFmult.neq(1)) a=a+'x'+format(tmp.I.IEFmult,4)+'='+format(this.effect(),4)
                a=a+"<br/>花费: "+format(this.cost())+' 无限点数'
                }
            return a },
            unlocked() {return hasMilestone('qa', 0)},
            canAfford() { return player.I.points.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.points.max(1e10).div(1e10).log(1e10).pow(0.5)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        41: {
            title(){text = 'Unlock an Infinity Challenge'
                    if(options.Chinese) text='解锁一个无限挑战'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { let a=[n('1e1500'),n('1e2000'),n('1e3000'),n('1e4800'),n('1e7000'),n('1e9500'),n('1e12500'),n('1e20000'),n(1e310)]
                return a[x.toNumber()]
             },
            effect(x) {return x},
            display() {a= "Unlock an Infinity Challenge per purchase.<br/>"
            a=a+"Requirement: "+format(this.cost())+' points'
            if(options.Chinese) {a="每次购买解锁一个无限挑战<br/>"
            a=a+"要求: "+format(this.cost())+'点数'
            }

            return a },
            unlocked() {return hasUpgrade('I',84)},
            canAfford() { return player.points.gte(this.cost())&&hasUpgrade('I',84) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        51: {
            title(){text = 'QqQe308 Boost'
                    if(options.Chinese) text='QqQe308获取加成'
                text=text+'('+format(getBuyableAmount('I', this.id))
                text=text+'/5.00)'
                return text
            },
            cost(x) { return new Decimal(1e5).pow(x.add(1)) },
            effect(x) {a=x.times(0.2).add(1)
                    return a
            },
            display() { a="Multiply QqQe308 gain by +0.2 per purchase<br/>Effect:x"+format(this.effect())
                a=a+"<br/>Cost: "+format(this.cost())+' Timewall Power'
                if(options.Chinese) {a="每次购买使QqQe308获取倍率+0.2<br/>效果:x"+format(this.effect())
                a=a+"<br/>花费: "+format(this.cost())+' 时间墙能量'
                }
            return a},
            unlocked() {return hasUpgrade('I',131)},
            canAfford() { return player.I.tpower.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(5)
                    return a
            },
            buy() {
                player.I.tpower = player.I.tpower.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.tpower.max(1).log(1e5).sub(1)
					let target = tempBuy.plus(1).floor().min(5);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        52: {
            title(){text = 'QqQeInfinity Boost'
                    if(options.Chinese) text='QqQeInfinity获取加成'
                text=text+'('+format(getBuyableAmount('I', this.id))
                text=text+'/5.00)'
                return text
            },
            cost(x) { return new Decimal(1e8).pow(x.add(1)) },
            effect(x) {a=x.times(0.1).add(1)
                    return a
            },
            display() { a="Multiply QqQeInfinity gain by +0.1 per purchase<br/>Effect:x"+format(this.effect())
                a=a+"<br/>Cost: "+format(this.cost())+' Timewall Power'
                if(options.Chinese) {a="每次购买使QqQeInfinity获取倍率+0.1<br/>效果:x"+format(this.effect())
                a=a+"<br/>花费: "+format(this.cost())+' 时间墙能量'
                }
            return a},
            unlocked() {return hasUpgrade('I',131)},
            canAfford() { return player.I.tpower.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(5)
                    return a
            },
            buy() {
                player.I.tpower = player.I.tpower.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.tpower.max(1).log(1e8).sub(1)
					let target = tempBuy.plus(1).floor().min(5);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        53: {
            title(){text = 'cokecole Boost'
                    if(options.Chinese) text='cokecole获取加成'
                text=text+'('+format(getBuyableAmount('I', this.id))
                text=text+'/5.00)'
                return text
            },
            cost(x) { return new Decimal(1e25).pow(x.add(1)) },
            effect(x) {a=x.times(0.1).add(1)
                    return a
            },
            display() { a="Multiply cokecole gain by +0.1 per purchase<br/>Effect:x"+format(this.effect())
                a=a+"<br/>Cost: "+format(this.cost())+' Timewall Power'
                if(options.Chinese) {a="每次购买使cokecole获取倍率+0.1<br/>效果:x"+format(this.effect())
                a=a+"<br/>花费: "+format(this.cost())+' 时间墙能量'
                }
            return a},
            unlocked() {return hasUpgrade('I',131)},
            canAfford() { return player.I.tpower.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(5)
                    return a
            },
            buy() {
                player.I.tpower = player.I.tpower.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.tpower.max(1).log(1e25).sub(1)
					let target = tempBuy.plus(1).floor().min(5);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        54: {
            title(){text = 'Upgrade Boost'
                    if(options.Chinese) text='升级加成'
                text=text+'('+format(getBuyableAmount('I', this.id))
                text=text+'/3.00)'
                return text
            },
            cost(x) { return new Decimal(1e5).pow(n(2).pow(x)) },
            effect(x) {a=x
                    return a
            },
            display() { a="Unlock a new row of TP-Upgrade per purchase<br/>Effect:+"+format(this.effect())
                a=a+"<br/>Cost: "+format(this.cost())+' Timewall Power'
                if(options.Chinese) {a="每次购买解锁一行时间墙能量升级<br/>效果:+"+format(this.effect())
                a=a+"<br/>花费: "+format(this.cost())+' 时间墙能量'
                }

            return a},
            unlocked() {return hasUpgrade('I',131)},
            canAfford() { return player.I.tpower.gte(this.cost())&&this.unlocked() },
            purchaseLimit() {a = n(3)
                    return a
            },
            buy() {
                player.I.tpower = player.I.tpower.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.tpower.max(1).log(1e5).log(2)
					let target = tempBuy.plus(1).floor().min(3);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        61: {
            title(){text = 'Buy a Q-Upgrade Booster'
                    if(options.Chinese) text='购买一个Q-升级增强器'
                text=text+'('+format(getBuyableAmount('I', this.id))
                if(!hasMilestone('cf',0)) text=text+'/8.00'
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(10).pow(x) },
            effect(x) {a=n(10).pow(x)
                if(a.gte(1e200)) a=n(10).pow(n(200).times(x.div(200).pow(0.5)))
                    return a
            },
            display() { a="Get a Q-Upgrade Booster per purchase"
                if(hasMilestone('cf',0)) {a=a+'<br/>Also multiply IP gain by 10 per purchase'
                    a=a+"<br/>Currently: "+format(this.effect())+'x'
                    if(getBuyableAmount(this.layer,this.id).gte(200)) a=a+'(softcapped)'
                }
                a=a+"<br/>Cost: "+format(this.cost())+' Q-Upgrade Booster Fragment'
                if(options.Chinese) {a="每次购买获得一个Q-升级增强器"
                if(hasMilestone('cf',0)) {a=a+'<br/>每次购买也使无限点数获取x10<br/>当前: '+format(this.effect())+'x'
                    if(getBuyableAmount(this.layer,this.id).gte(200)) a=a+'（受软上限限制）'
                }
                    a=a+"<br/>花费: "+format(this.cost())+' Q-升级增强器碎片'}
            return a},
            unlocked() {return hasUpgrade('I',171)},
            canAfford() { return player.I.QUBF.gte(this.cost()) },
            purchaseLimit() {a = n(8)
                if(hasMilestone('cf',0)) a = n(1.79e309)
                    return a
            },
            buy() {
                player.I.QUBF = player.I.QUBF.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.QUBF.max(0.1).log(10)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
    },
    IUtip(){a='You have gone Infinity '+format(player.I.inf)+' times.<br/>'
        if(player.E.bankedInf.gt(0)) a=a+'You have '+format(player.E.bankedInf)+' Banked Infinities.<br>'
        a=a+'You have spent '+formatTime(player.I.resetTime)+' in this Infinity.<br/>'
        a=a+'Your best Infinity time is '+formatTime(player.I.bestTime)+'.(The first Infinity is not counted in)<br/>'
        a=a+'You will gain '+format(tmp.I.infgain)+' Infinity(ies) on reset.<br>'
        a=a+'Upgrade order: Ix-y -> I(x+1)-y<br/>buying 16 I-Upgrades will give you a "IP Doubler" buyable.'
        if(options.Chinese) {a='你已经无限了'+format(player.I.inf)+'次<br/>'
        if(player.E.bankedInf.gt(0)) a=a+'你有'+format(player.E.bankedInf)+'储存的无限次数<br>'
        a=a+'你在这次无限中度过了'+formatTime(player.I.resetTime)+'<br/>'
        a=a+'你的最佳无限时间是'+formatTime(player.I.bestTime)+'（第一次无限不计入）。<br/>'
        a=a+'你在重置时将获得'+format(tmp.I.infgain)+'次无限次数。<br/>'
        a=a+'升级顺序: Ix-y -> I(x+1)-y<br/>购买16个无限升级将会解锁“IP倍增”可购买。'}
        return a
    },
    NCcomp(){a=n(0)
        for (let i = 11; i < 17; i++) {
            if(hasChallenge('I',i)) a=a.add(1)
        }
        return a
    },
    NCtoIP(){a=tmp.I.NCcomp.add(1)
        return a
    },
    NCtip(){a='You have completed '+format(tmp.I.NCcomp)+' Normal Challenges, giving a multiplier of x'+format(tmp.I.NCtoIP)+' to Infinity Points.'
        a=a+'<br/>Completing all Normal Challenges and buying 16 I-Upgrades will enable you to break Infinity.'
        a=a+'<br>Note: When you complete a challenge, click reset button instead of "Finish" button. It will help you get IP.'
        if(options.Chinese) {a='你已经完成了'+format(tmp.I.NCcomp)+'个普通挑战，使无限点数获取x'+format(tmp.I.NCtoIP)
            a=a+'<br/>完成所有普通挑战并购买16个无限升级后可解锁打破无限'
        a=a+'<br>注意：当你完成一个挑战时点击重置按钮可以获得无限点数'}
        return a
    },
    NC2eff(){a=n(0.01).times(n(1.01).pow(player.T.resetTime)).min(1e100)
        if(hasUpgrade('I',64)) a=n(1e100)
        if(inChallenge('I',21)) a=n(1e-100)
        return a
    },
    IPDbase(){a=n(2)
        a=a.pow(tmp.li.dpeff)
        return a
    },
    BItip(){a='You have gone Infinity '+format(player.I.inf)+' times.<br/>'
        if(player.E.bankedInf.gt(0)) a=a+'You have '+format(player.E.bankedInf)+' Banked Infinities.<br>'
        a=a+'You have spent '+formatTime(player.I.resetTime)+' in this Infinity.<br/>'
        a=a+'Your best Infinity time is '+formatTime(player.I.bestTime)+'.<br/>'
        a=a+'When you break Infinity, there will be more upgrades and a new side layer will be unlocked.'
            if(options.Chinese) {a='你已经无限了'+format(player.I.inf)+'次<br/>'
            if(player.E.bankedInf.gt(0)) a=a+'你有'+format(player.E.bankedInf)+'储存的无限次数<br>'
        a=a+'你在这次无限中度过了'+formatTime(player.I.resetTime)+'<br/>'
        a=a+'你的最佳无限时间是'+formatTime(player.I.bestTime)+'<br/>'
        a=a+'当打破无限后，更多升级将会出现，且你将解锁一个新的支线层级。'}
        return a
    },
    IGmult(){a=n(1)
        if(hasMilestone('qa',0)) a=a.times(tmp.qa.monikatoigmult)
        if(hasUpgrade('I',81)) a=a.times(upgradeEffect('I',81))
        if(hasChallenge('I',21)) a=a.times(challengeEffect('I',21))
        a=a.times(tmp.Qi.qaqe308eff)
        if(hasUpgrade('qa',12)) a=a.times(upgradeEffect('qa',12))
        if(hasUpgrade('I',93)) a=a.times(upgradeEffect('I',93))
        if(hasChallenge('I',25)) a=a.times(challengeEffect('I',25))
        a=a.times(tmp.I.TPeff)
        if(hasUpgrade('E',102)) a=a.times(upgradeEffect('E',102))
        if(hasChallenge('E',12)) a=a.times(challengeEffect('E',12))
        if(hasUpgrade('E',162)) a=a.times('1e70')

        if(inChallenge('E',32)) a=n(0)
        if(inChallenge('E',33)) a=n(1)
        a=a.times(buyableEffect('I',32))
        return a
    },
    IGMbase(){a=n(2)
        if(hasUpgrade('I',92)) a=a.add(0.5)
        if(hasChallenge('I',22)) a=a.add(challengeEffect('I',22))
        if(hasUpgrade('qa',22)) a=a.add(upgradeEffect('qa',22))
        if(hasUpgrade('I',161)) a=a.times(upgradeEffect('I',161))
        if(hasMilestone('df',0)) a=a.times(tmp.df.effect[1])
        if(hasUpgrade('E',82)) a=a.times(upgradeEffect('E',82))

        if(hasMilestone('li',6)) a=a.times(milestoneEffect('li',6))
        if(inChallenge('E',33)) a=n(2)
        return a
    },
    IEFbase(){a=n(0.01)
        if(hasUpgrade('I',104)) a=a.times(1.5)
        if(hasChallenge('I',28)) a=a.times(2)
        if(hasUpgrade('E',261)) a=a.times(1.5)
        return a
    },
    IEFmult(){a=n(1)
        if(hasUpgrade('E',261)) a=a.times(1.05)
        if(inChallenge('E',13)) a=a.times(0.5)
        return a
    },
    IGtip(){a="You have <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>" + format(player.I.ipower) + "</h3> Infinity Powers, which boost:"
        a=a+"<br>Point Producer base effect by "+format(player.I.ipower)+'^'+format(tmp.I.IGexptopt)+"= <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.IGtopt)+'x</h3>'
        if(hasUpgrade('I',81)) a=a+";<br>Timewall gain by "+format(player.I.ipower)+'^'+format(tmp.I.IGexptotw)+"= <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.IGtotw)+'x</h3>'
        if(hasUpgrade('I',82)) a=a+";<br>Super Timewall gain by "+format(player.I.ipower)+'^'+format(tmp.I.IGexptost)+"= <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.IGtost)+'x</h3>'
        if(hasUpgrade('I',83)) a=a+";<br>Mega Timewall gain by "+format(player.I.ipower)+'^'+format(tmp.I.IGexptomt)+"= <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.IGtomt)+'x</h3>'
        a=a+'.'
        a=a+'<br>('+format(tmp.I.reaalIPowgen)+'/sec)'
        if(tmp.I.reaalIPowgen.gte(1e250)) a=a+'<br>After '+format(1e250)+' Infinity Power/s, your Infinity Power gain will be softcapped!(^'+format(tmp.I.IPowscexp)+')'
        if(options.Chinese) {a="你有 <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>" + format(player.I.ipower) + "</h3> 无限之力，使："
        a=a+"<br>点数生产器基础效果x "+format(player.I.ipower)+'^'+format(tmp.I.IGexptopt)+"= <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.IGtopt)+'</h3>'
        if(hasUpgrade('I',81)) a=a+"<br>时间墙获取x "+format(player.I.ipower)+'^'+format(tmp.I.IGexptotw)+"= <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.IGtotw)+'</h3>'
        if(hasUpgrade('I',82)) a=a+"<br>超级时间墙获取x "+format(player.I.ipower)+'^'+format(tmp.I.IGexptost)+"= <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.IGtost)+'</h3>'
        if(hasUpgrade('I',83)) a=a+"<br>巨大时间墙获取x "+format(player.I.ipower)+'^'+format(tmp.I.IGexptomt)+"= <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.IGtomt)+'</h3>'
        a=a+'<br>('+format(tmp.I.reaalIPowgen)+'/s)'
        if(tmp.I.reaalIPowgen.gte(1e250)) a=a+'<br>当无限之力获取速度超过'+format(1e250)+'每秒后，无限之力获取速度将受软上限限制！（^'+format(tmp.I.IPowscexp)+'）'
        }
        return a
    },
    IGexptopt(){a=n(7)
        if(inChallenge('E',23)) a=n(1)
        return a
    },
    IGtopt(){a=player.I.ipower.pow(tmp.I.IGexptopt)
        return a
    },
    IGexptotw(){a=n(5)
        if(inChallenge('E',23)) a=n(1)
        return a
    },
    IGtotw(){a=player.I.ipower.pow(tmp.I.IGexptotw)
        return a
    },
    IGexptost(){a=n(3)
        if(inChallenge('E',23)) a=n(1)
        return a
    },
    IGtost(){a=player.I.ipower.pow(tmp.I.IGexptost)
        return a
    },
    IGexptomt(){a=n(1)
        if(inChallenge('E',23)) a=n(1)
        return a
    },
    IGtomt(){a=player.I.ipower.pow(tmp.I.IGexptomt)
        return a
    },
    actualIPowgen(){a=buyableEffect('I',31).pow(buyableEffect('I',33))
        
        return a
    },
    reaalIPowgen(){a=tmp.I.actualIPowgen.times(tmp.I.ipowmult)//final!
        if(a.gte(1e250)) a=a.div(1e250).pow(tmp.I.IPowscexp).times(1e250)
        if(tmp.li.dilationLevel.gt(0)&&a.gt(10)) a = n(10).pow(a.log(10).pow(n(0.66686).pow(tmp.li.dilationLevel)))
        return a
    },
    IPowscexp(){a=n(0.5)
        if(hasUpgrade('E',72)) a=n(0.75)
        return a
    },
    freeIG(){a=n(0)
        if(hasUpgrade('I',101)) a=a.add(upgradeEffect('I',101))
        if(hasUpgrade('qa',34)) a=a.times(upgradeEffect('qa',34))
        if(inChallenge('E',23)) a=a.times(player.E.timeshard.pow(0.2))
        return a
    },
    freeIGM(){a=n(0)
        if(hasUpgrade('I',103)) a=a.add(upgradeEffect('I',103))
        if(hasUpgrade('qa',34)) a=a.times(upgradeEffect('qa',34))
        return a
    },
    ICcomp(){a=n(0)
        for (let i = 21; i < 29; i++) {
            if(hasChallenge('I',i)) a=a.add(1)
        }
        return a
    },
    ICtoIP(){a=n(2).pow(tmp.I.ICcomp)
        return a
    },
    ICtip(){a='You have completed '+format(tmp.I.ICcomp)+' Infinity Challenges, giving a multiplier of x'+format(tmp.I.ICtoIP)+' to Infinity Points.'
        if(options.Chinese) {a='你已经完成了'+format(tmp.I.ICcomp)+'个无限挑战，使无限点数获取x'+format(tmp.I.ICtoIP)}
        return a
    },
    infgain(){a=n(1)
        a=a.times(buyableEffect('qa',13))
        if(hasUpgrade('E',32)) a=a.times(upgradeEffect('E',32))
        if(hasChallenge('E',14)) a=a.times(challengeEffect('E',14))
        if(hasUpgrade('E',203)) a=a.times(upgradeEffect('E',203))
        if(inChallenge('E',14)) a=n(1)
        return a
    },
    ipowmult(){a=n(1)
        a=a.times(tmp.A.IC8eff)
        a=a.times(tmp.E.TSeffect)
        return a
    },
    CTgain(){a=n(0)
        a=player.I.CTbase
        return a
    },
    CTeff(){a=tmp.I.CTgain.pow(0.5)
        if(hasUpgrade('I',144)) a=a.pow(2)
        if(hasUpgrade('qa',31)) a=a.times(upgradeEffect('qa',31))
        if(hasUpgrade('I',151)) a=a.times(upgradeEffect('I',151))
        if(hasUpgrade('I',152)) a=a.times(upgradeEffect('I',152))
        if(hasUpgrade('I',153)) a=a.times(upgradeEffect('I',153))
        if(getBuyableAmount('I',61).gte(8)) a=a.times(tmp.I.QUBFeff)
        if(hasUpgrade('E',22)) a=a.times(upgradeEffect('E',22))
        if(hasMilestone('df',0)) a=a.times(tmp.df.effect[3])
        a=a.times(tmp.E.TSeffect)
        return a
    },
    TPeff(){a=player.I.tpower.add(2).log(2).pow(2)
        if(hasUpgrade('E',21)) a=a.times(upgradeEffect('E',21))
        return a
    },
    TPtip(){a="You have <h3 style='color: #00eeff; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.CTgain)+"</h3> Compressed Timewalls (capped at "+format(tmp.I.ctCap)+"), which produce <h3 style='color: #00eeff; text-shadow: 0 0 3px #c2b280'>"
        a=a+format(tmp.I.CTeff)+"</h3> Timewall Power per second.<br/>"
        a=a+"You have <h3 style='color: #00eeff; text-shadow: 0 0 3px #c2b280'>"+format(player.I.tpower)+"</h3> Timewall Power, which multiply Infinity Generator base effect by "+format(tmp.I.TPeff)+'.'
        if(options.Chinese) {a="你有 <h3 style='color: #00eeff; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.CTgain)+"</h3> 压缩时间墙（在"+format(tmp.I.ctCap)+"处达到上限），每秒生产 <h3 style='color: #00eeff; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.CTeff)+"</h3> 时间墙能量<br/>"
        a=a+"你有 <h3 style='color: #00eeff; text-shadow: 0 0 3px #c2b280'>"+format(player.I.tpower)+"</h3> 时间墙能量，使无限之力生成器基础效果x"+format(tmp.I.TPeff)+'.'}
        if(!hasUpgrade('I',131)) a=''
        return a
    },
    UBtip(){a="You have <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(player.I.QUBF,4)+"</h3> Q-Upgrade Booster Fragments."
        a=a+"<br>You produce <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.QUBFgain,4)+"</h3> Q-Upgrade Booster Fragments per second based on your Infinity Points.(Start at 1e220 IP)"
        if(getBuyableAmount('I',61).gte(8)) {a=a+'<br>When all Q-Upgrade Boosters are bought, your extra QUBF multiply your IP and Timewall Power gain by '+format(tmp.I.QUBFeff)+'.'
        if(player.I.QUBF.gte(1e10)) a=a+'(capped)'}
        if(options.Chinese) {a="你有 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(player.I.QUBF,4)+"</h3> Q-升级增强器碎片<br/>"
        a=a+"基于你的超过1e220的无限点数，你每秒生产 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.QUBFgain,4)+"</h3> Q-升级增强器碎片<br/>"
        if(getBuyableAmount('I',61).gte(8)) {a=a+'当所有Q-升级增强器都购买后，额外的Q-升级增强器碎片将使你的无限点数和时间墙能量获取x'+format(tmp.I.QUBFeff)+'.'
        if(player.I.QUBF.gte(1e10)) a=a+'（已达到上限）'}}
        if(!hasUpgrade('I',171)) a=''
        return a
    },
    QUBFgain(){a=n(0)
        if(player.I.points.gte(1e220)) a=player.I.points.div(1e220).pow(0.02).sub(1).div(200)
        if(hasUpgrade('qa',32)) a=a.times(upgradeEffect('qa',32))
        if(hasUpgrade('I',172)) a=a.times(10)
        if(hasUpgrade('I',173)) a=a.times(5)
        if(hasUpgrade('I',174)) a=a.times(upgradeEffect('I',174))
        if(hasUpgrade('cf',14)) a=a.pow(upgradeEffect('cf',14))
        a=a.times(tmp.E.TSeffect)
        return a
    },
    QUBFeff(){a=player.I.QUBF.min(1e10).max(1)
        if(getBuyableAmount('I',61).lt(8)) a=n(1)
        return a
    },
    boostedIU(){
        a=n(0)
        for (let i = 1; i < 5; i++) {
            for (let j = 0; j < 4; j++) {
                if(getClickableState('I',i*10+j)==1) a=a.add(1)
            }
        }
        return a
    },
    IUtip2(){
        a='You have '+format(getBuyableAmount('cf',11),0)+' I-Upgrade Booster(s).'
        if(options.Chinese) a='你有'+format(getBuyableAmount('cf',11),0)+'个I-升级增强器'
        if(!hasUpgrade('cf',34)) a=''
        return a
    },
    totalInf(){a=player.I.inf.add(player.E.bankedInf)
        return a
    },
    ctCap(){a=n('1e2500')
        a=a.pow(gridEffect('li',301))
        return a
    }
})

addLayer("qa", {
    name: "qaqe308", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Qa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best:n(0),
        monika: n(0)
    }},
    color: "#ab4308",
    requires(){a = new Decimal('1e919')
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "qaqe308", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: n(1e101),
    exponent() {a=2
        if(inChallenge('E',21)) a=3
        return a
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    directMult() {mult = n(1)
        if(hasUpgrade('E',131)) mult=mult.times(1.1)
        return mult
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a",
        description: "A: Reset for qaqe308",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked(){return layers[this.layer].layerShown()&&!layers[this.layer].autoPrestige()}},
    ],
    layerShown(){return hasUpgrade('I',51)},
    branches: ['I'],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 5) {
    let kept = []
    if(hasMilestone('df',1)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
    },
    update(diff){
        player.qa.monika = player.qa.monika.add(tmp.qa.effect.times(diff))
    },
    autoUpgrade(){return hasMilestone('E',9)&&player.qa.qaUauto},
    automate(){
        if(hasMilestone('E',8)){
            if(player.qa.MB1auto) layers.qa.buyables[11].buyMax()
            if(player.qa.MB2auto) layers.qa.buyables[12].buyMax()
            if(player.qa.MB3auto) layers.qa.buyables[13].buyMax()
            if(player.qa.MB4auto) layers.qa.buyables[14].buyMax()}
    },
    autoPrestige() {a = hasMilestone('E',4)&&player.qa.qaqauto&&(!hasUpgrade('E',131)||hasUpgrade('li',23))
        return a
    },
    resetsNothing() {return hasMilestone('E',4)},
    canBuyMax() {return hasMilestone('E',5)&&player.qa.qaqauto&&(!hasUpgrade('E',131)||hasUpgrade('li',23))},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    tabFormat: {
    "Milestones": {
        content: [ "main-display","prestige-button","resource-display","milestones",
    ],
    unlocked(){return true},
    },
    "Monika Buyables": {
    content: [ "main-display","prestige-button","resource-display",
        ["display-text", () => tmp.qa.Showdetail],"buyables"
    ],
    unlocked(){return hasMilestone('qa',0)},
    },
    "Upgrades": {
    content: [ "main-display","prestige-button","resource-display",
        "upgrades"
    ],
    unlocked(){return hasMilestone('qa',1)},
    },
    },
    milestones: {
        0: {
            requirementDescription: "1 qaqe308",
            effectDescription() {a="Unlock Monika buyables and Infinity Generator, multiply IP gain by 100/7, and unlock the 3rd row of BI-Upgrades."
                if(options.Chinese) a="解锁Monika可购买和无限之力生成器，无限点数获取x100/7，并解锁第3行BI升级"
                return a},
            done() { return player.qa.points.gte(1) }
        },
        1: {
            requirementDescription: "4 qaqe308",
            effectDescription() {a="Unlock qaqe308 Upgrades and the 4th row of BI-Upgrades."
                if(options.Chinese) a="解锁qaqe308升级和第4行BI升级"
                return a},
            unlocked(){return hasMilestone('qa',0)},
            done() { return player.qa.points.gte(4) }
        },
        2: {
            requirementDescription: "16 qaqe308",
            effectDescription() {a="Unlock more qaqe308 Upgrades."
                if(options.Chinese) a="解锁更多qaqe308升级"
                return a},
            unlocked(){return hasMilestone('qa',1)},
            done() { return player.qa.points.gte(16) }
        },
    },
    buyables: {
        11: {
            title(){text = 'Point Boost'
                if(options.Chinese) text='点数增益'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(100).pow(x.add(1)) },
            effect(x) {b=x
                if(b.gte(tmp.qa.MBsc)) b=b.div(tmp.qa.MBsc).pow(0.5).times(tmp.qa.MBsc)
                //if(b.gte(1e10)) b=b.slog().sub(2).add(1e10)
                a=n(1e100).pow(b.times(tmp.qa.MBeff))
                    return a
            },
            display() { a="Multiply Point Producer base effect by "+format(n(1e100).pow(tmp.qa.MBeff))+"<br/>Effect:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gte(tmp.qa.MBsc)) a=a+'(softcapped)'
                a=a+"<br/>Cost: "+format(this.cost())+' Monika Points'
                if(options.Chinese) {a="点数生产器基础效果x"+format(n(1e100).pow(tmp.qa.MBeff))+"<br/>效果:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gte(tmp.qa.MBsc)) a=a+'（已达到软上限）'
                a=a+"<br/>花费: "+format(this.cost())+' Monika点数'}
            return a},
            unlocked() {return hasMilestone('qa',0)},
            canAfford() { return player.qa.monika.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.qa.monika = player.qa.monika.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.qa.monika.max(1).log(100).sub(1)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        12: {
            title(){text = 'Super-man Boost'
                if(options.Chinese) text='超人增益'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1000).pow(x.add(2)) },
            effect(x) {b=x
                if(b.gte(tmp.qa.MBsc)) b=b.div(tmp.qa.MBsc).pow(0.5).times(tmp.qa.MBsc)
                //if(b.gte(1e10)) b=b.slog().sub(2).add(1e10)
                a=n(100).pow(b.times(tmp.qa.MBeff))
                    return a
            },
            display() { a="Multiply Super-QqQe308 and Super-cokecole generation speed by "+format(n(100).pow(tmp.qa.MBeff))+"<br/>Effect:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gte(tmp.qa.MBsc)) a=a+'(softcapped)'
                a=a+"<br/>Cost: "+format(this.cost())+' Monika Points'
                if(options.Chinese) {a="超QqQe308和超cokecole的速度x"+format(n(100).pow(tmp.qa.MBeff))+"<br/>效果:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gte(tmp.qa.MBsc)) a=a+'（已达到软上限）'
                a=a+"<br/>花费: "+format(this.cost())+' Monika点数'}
            return a},
            unlocked() {return hasMilestone('qa',0)},
            canAfford() { return player.qa.monika.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.qa.monika = player.qa.monika.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.qa.monika.max(1).log(1000).sub(2)
					let target = tempBuy.plus(1).floor().max(0);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        13: {
            title(){text = 'Infinity Boost'
                if(options.Chinese) text='无限次数增益'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e5).pow(x.add(2)) },
            effect(x) {b=x
                if(b.gte(tmp.qa.MBsc)) b=b.div(tmp.qa.MBsc).pow(0.5).times(tmp.qa.MBsc)
                //if(b.gte(1e10)) b=b.slog().sub(2).add(1e10)
                    a=n(2).pow(b.times(tmp.qa.MBeff))
                    return a
            },
            display() { a="Multiply Infinity gain by "+format(n(2).pow(tmp.qa.MBeff))+"<br/>Effect:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gte(tmp.qa.MBsc)) a=a+'(softcapped)'
                a=a+"<br/>Cost: "+format(this.cost())+' Monika Points'
                if(options.Chinese) {a="无限次数获取x"+format(n(2).pow(tmp.qa.MBeff))+"<br/>效果:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gte(tmp.qa.MBsc)) a=a+'（已达到软上限）'
                a=a+"<br/>花费: "+format(this.cost())+' Monika点数'}
            return a},
            unlocked() {return hasMilestone('qa',0)},
            canAfford() { return player.qa.monika.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.qa.monika = player.qa.monika.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.qa.monika.max(1).log(1e5).sub(2)
					let target = tempBuy.plus(1).floor().max(0);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        14: {
            title(){text = 'IP Boost'
                if(options.Chinese) text='无限点数增益'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e6).pow(x.add(2)) },
            effect(x) {b=x
                if(b.gte(tmp.qa.MBsc)) b=b.div(tmp.qa.MBsc).pow(0.5).times(tmp.qa.MBsc)
                //if(b.gte(1e10)) b=b.slog().sub(2).add(1e10)
                    a=n(10).pow(b.times(tmp.qa.MBeff))
                    return a
            },
            display() { a="Multiply Infinity Point gain by "+format(n(10).pow(tmp.qa.MBeff))+"<br/>Effect:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gte(tmp.qa.MBsc)) a=a+'(softcapped)'
                a=a+"<br/>Cost: "+format(this.cost())+' Monika Points'
                if(options.Chinese) {a="无限点数获取x"+format(n(10).pow(tmp.qa.MBeff))+"<br/>效果:"+format(this.effect())+'x'
                if(getBuyableAmount(this.layer,this.id).gte(tmp.qa.MBsc)) a=a+'（已达到软上限）'
                a=a+"<br/>花费: "+format(this.cost())+' Monika点数'}
            return a},
            unlocked() {return hasMilestone('qa',0)},
            canAfford() { return player.qa.monika.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.qa.monika = player.qa.monika.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.qa.monika.max(1).log(1e6).sub(2)
					let target = tempBuy.plus(1).floor().max(0);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
    },
    upgrades: {
        11: {
            title: "Qa1-1",
            description() {a="Each qaqe308 multiplies your IP gain by 2."
                if(options.Chinese) a="每个qaqe308使无限点数获取x2"
                return a
            },
            unlocked(){return hasMilestone('qa',1)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(10).pow(b.log(10).div(2).pow(0.5).times(2))
                a=n(2).pow(b)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(4)
            return a},
            tooltip() {a='All effects of qaqe308 Upgrades are softcapped after 100 qaqe308!'
                if(options.Chinese) a='当qaqe308数量达到100后，所有qaqe308升级的效果都将被软上限限制！'
                return a
            }
        },
        12: {
            title: "Qa1-2",
            description() {a='Each qaqe308 multiplies your IG base effect by 10.'
                if(options.Chinese) a='每个qaqe308使你的无限之力生产器基础效果x10'
                return a
            },
            unlocked(){return hasMilestone('qa',1)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(10).pow(b.log(10).div(2).pow(0.5).times(2))
                a=n(10).pow(b)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5)
            return a},
        },
        13: {
            title: "Qa1-3",
            description() {a="Each qaqe308 multiplies your Super-qaqe308 generation speed by 1.125."
                if(options.Chinese) a="每个qaqe308使你超qaqe308的速度x1.125"
                return a
            },

            unlocked(){return hasMilestone('qa',1)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(10).pow(b.log(10).div(2).pow(0.5).times(2))
                a=n(1.125).pow(b)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(6)
            return a},
        },
        14: {
            title: "Qa1-4",
            description() {a="Each qaqe308 divides QqQeInfinity cost scaling by 1.005. (capped at 100 qaqe308) Also unlock the 5th row of BI-Upgrades."
                if(options.Chinese) a="每个qaqe308使QqQeInfinity需求折算/1.005（在100 qaqe308时达到上限），并解锁第5行BI升级"
                return a
            },

            unlocked(){return hasMilestone('qa',1)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(100)
                a=n(1.005).pow(b)
                    return a
            },
            effectDisplay(){return '/'+format(this.effect(),3)},
            cost(){
                a=n(7)
            return a},
        },
        21: {
            title: "Qa2-1",
            description() {a="Each qaqe308 divides cokecole cost by +0.01. Also unlock the 6th row of BI-Upgrades."
                if(options.Chinese) a="每个qaqe308使cokecole需求除数+0.01，并解锁第6行BI升级"
                return a
            },

            unlocked(){return hasMilestone('qa',1)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(10).pow(b.log(10).div(2).pow(0.5).times(2))
                a=n(0.01).times(b).add(1)
                    return a
            },
            effectDisplay(){return '/'+format(this.effect())},
            cost(){
                a=n(8)
            return a},
        },
        22: {
            title: "Qa2-2",
            description() {a="Each qaqe308 adds 0.05 to your IGM base."
                if(options.Chinese) a="每个qaqe308使你的无限之力加成器底数+0.05"
                return a
            },
            unlocked(){return hasMilestone('qa',1)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(10).pow(b.log(10).div(2).pow(0.5).times(2))
                a=n(0.05).times(b)
                    return a
            },
            effectDisplay(){return '+'+format(this.effect())},
            cost(){
                a=n(9)
            return a},
        },
        23: {
            title: "Qa2-3",
            description() {a="Each qaqe308 multiplies your PPM exponent by 1.01. (capped at 100 qaqe308)"
                if(options.Chinese) a="每个qaqe308使你的点数生产加成器指数x1.01(在100 qaqe308时达到上限)"
                return a
            },
            unlocked(){return hasMilestone('qa',1)},
            effect(){b=player.qa.points
                a=n(1.01).pow(b.min(100))
                    return a
            },
            effectDisplay(){return format(this.effect(),3)+'x'},
            cost(){
                a=n(11)
            return a},
        },
        24: {
            title: "Qa2-4",
            description() {a="Each qaqe308 multiplies Super-cokecole effect by 1.015."
                if(options.Chinese) a="每个qaqe308使超cokecole的效果x1.015"
                return a
            },
            unlocked(){return hasMilestone('qa',1)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(10).pow(b.log(10).div(2).pow(0.5).times(2))
                a=n(1.015).pow(b)
                    return a
            },
            effectDisplay(){return format(this.effect(),3)+'x'},
            cost(){
                a=n(13)
            return a},
        },
        31: {
            title: "Qa3-1",
            description() {a="Each qaqe308 multiplies Timewall Power gain by 1.25."
                if(options.Chinese) a="每个qaqe308使时间墙能量获取x1.25"
                return a
            },
            unlocked(){return hasMilestone('qa',2)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(10).pow(b.log(10).div(2).pow(0.5).times(2))
                a=n(1.25).pow(b)
                    return a
            },
            effectDisplay(){return format(this.effect(),2)+'x'},
            cost(){
                a=n(17)
            return a},
        },
        32: {
            title: "Qa3-2",
            description() {a="Each qaqe308 multiplies "
                if(!hasUpgrade('I',171)) a=a+'???'
                if(hasUpgrade('I',171)) a=a+'Q-Upgrade Booster Fragment'
                a=a+" gain by 1.15."
                if(options.Chinese) {a="每个qaqe308使你的"
                if(!hasUpgrade('I',171)) a=a+'???'
                if(hasUpgrade('I',171)) a=a+'Q-升级增强器碎片'
                a=a+"获取x1.15"}
            return a},
            unlocked(){return hasMilestone('qa',2)},
            effect(){b=player.qa.points
                if(b.gte(100)) b=n(10).pow(b.log(10).div(2).pow(0.5).times(2))
                a=n(1.15).pow(b)
                    return a
            },
            effectDisplay(){return format(this.effect(),2)+'x'},
            cost(){
                a=n(22)
            return a},
        },
        33: {
            title: "Qa3-3",
            description() {a="Each qaqe308 makes your Monika Buyables +0.5% more effective. (capped at 100 qaqe308)"
                if(options.Chinese) a="每个qaqe308使你的Monika可购买效果+0.5%(在100 qaqe308时达到上限)"
                return a
            },
            unlocked(){return hasMilestone('qa',2)},
            effect(){a=n(0.005).times(player.qa.points).min(0.5)
                    return a
            },
            effectDisplay(){return '+'+format(this.effect().times(100))+'%'},
            cost(){
                a=n(24)
            return a},
        },
        34: {
            title: "Qa3-4",
            description() {a="Each qaqe308 multiplies free IG and IGM by 1.05. (capped at 100 qaqe308)"
                if(options.Chinese) a="每个qaqe308使免费的无限之力生产器和无限之力加成器x1.05(在100 qaqe308时达到上限)"
                return a
            },
            unlocked(){return hasMilestone('qa',2)},
            effect(){b=player.qa.points
                a=n(1.05).pow(b.min(100))
                    return a
            },
            effectDisplay(){return format(this.effect(),2)+'x'},
            cost(){
                a=n(25)
            return a},
        },
    },
    Showdetail() {
        a = "You have <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>" + format(player.qa.monika) + "</h3> Monika Points，which multiply your Infinity Generator base effect by "+format(player.qa.monika)+"^"+format(tmp.qa.monikatoigexp)+"=" +format(tmp.qa.monikatoigmult)+ "x."
        if(options.Chinese) a="你有<h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>" + format(player.qa.monika) + "</h3> Monika点数，使你的无限之力生成器基础效果x "+format(player.qa.monika)+"^"+format(tmp.qa.monikatoigexp)+"=" +format(tmp.qa.monikatoigmult)
        return a
    },
    monikatoigexp(){a=n(0.5)
        a=a.add(buyableEffect('I',24))
        return a
    },
    monikatoigmult() {a=player.qa.monika.max(0).pow(tmp.qa.monikatoigexp)
        return a
    },
    effect(){
        a = tmp.qa.effbeforeSC
        if(a.gte('1e100')) a=n(10).pow(a.log(10).div(100).pow(0.5).times(100))
        a=a.times(tmp.E.TSeffect)
        if(hasUpgrade('E',133)&&!hasUpgrade('li',23)) a=a.div(10)
        if(hasUpgrade('E',132)) a=a.times(3)
        if(hasUpgrade('cf',33)) a=a.times(upgradeEffect('cf',33)[0])
        if(hasUpgrade('E',251)) a=a.times(upgradeEffect('E',251))
        if(hasUpgrade('E',171)) a=a.pow(1.03)
        if(isNaN(a)) a=n(0)
            return a
    },
    effbase(){a=n(2)
        a=a.add(buyableEffect('I',23))
        if(hasMilestone('df',0)) a=a.times(tmp.df.effect[2])
        if(hasChallenge('E',13)) a=a.times(challengeEffect('E',13))
        if(hasUpgrade('E',133)) a=a.times(upgradeEffect('E',133))
        return a
    },
      effectDescription() { 
        a = "which produce <h2 style='color: #ab4308; text-shadow: 0 0 10px #c2b280'>"+format(tmp.qa.effect)+'</h2> Monika Points per second.'
        if(tmp.qa.effbeforeSC.gte(1e100)) a=a+'(softcapped)'
        if(options.Chinese) {a="每秒生产 <h2 style='color: #ab4308; text-shadow: 0 0 10px #c2b280'>"+format(tmp.qa.effect)+'</h2> Monika点数'
        if(tmp.qa.effbeforeSC.gte(1e100)) a=a+'（受软上限限制）'}
        return a
    },
    MBeff(){a=n(1)
        if(hasChallenge('I',27)) a=a.add(0.5)
        if(hasUpgrade('qa',33)) a=a.add(upgradeEffect('qa',33))
        if(hasUpgrade('E',132)) a=a.add(0.15)
        if(hasChallenge('E',21)) a=a.add(challengeEffect('E',21))
        if(hasUpgrade('cf',43)) a=a.add(upgradeEffect('cf',43))
        a=a.add(gridEffect('li',303))
        if(inChallenge('I',27)) a=a.times(0.5)
        return a
    },
    MBsc(){a=n(100)
        return a
    },
    effbeforeSC(){a = tmp.qa.effbase.pow(player.qa.points).sub(1)
        if(hasUpgrade('I',121)) a=a.times(upgradeEffect('I',121))
        if(hasUpgrade('I',122)) a=a.times(upgradeEffect('I',122))
        if(hasUpgrade('I',123)) a=a.times(upgradeEffect('I',123))
        if(hasUpgrade('I',124)) a=a.times(upgradeEffect('I',124))
        if(hasChallenge('I',27)) a=a.times(challengeEffect('I',27))
        if(hasUpgrade('I',144)) a=a.times(upgradeEffect('I',144))
        if(hasUpgrade('I',173)) a=a.times(5)

        if(inChallenge('E',13)) a=a.max(0).pow(0.5)
        return a},
})