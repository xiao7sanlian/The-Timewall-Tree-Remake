addLayer("A", {
    name: "Achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ach: new Decimal(0)
    }},
    color: "#ffe125",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Achievements", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    //type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    devSpeedCal(){
	    let dev=n(1)
        if(player.A.speed1==true) dev=dev.add(1)
        if(player.A.speed2==true) dev=dev.add(2)
        if(player.A.speed3==true) dev=dev.add(4)
        //if(player.A.speed4==true) dev=dev.add(8)
        if(player.T.pause.gte(1))dev=n(0)
	    return dev
	   },
       doReset(resettingLayer) {
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
        "Achievements":{
        content: [ "main-display",
        "achievements",
    ["display-text", () => tmp.A.tips],
    ],},
    "Speed-up":{
        content: [ "main-display",
        "milestones",
    ],},
    },
    effectDescription(){return ' and there are 40 in total.'},
    achievements: {
        11: {
     name() {return "First Point"},
     done() {return player.points.gte(1)}, 
     unlocked(){return true},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Get 1 Point."}, 
     textStyle: {'color': '#ffe125'},
        },
        12: {
     name(){return "Not Autoclicker"},
     done() {return buyableEffect('T',11).gte(1)}, 
     unlocked(){return true},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Start Producting Points."}, 
     textStyle: {'color': '#ffe125'},
        },
        13: {
     name() {return "Mass Production"},
     done() {return gba('T',12).gte(1)}, 
     unlocked(){return true},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy a Points Producer Multiplier."}, 
     textStyle: {'color': '#ffe125'},
        },
        14: {
     name() {return "Powerful Production"},
     done() {return gba('T',13).gte(1)}, 
     unlocked(){return true},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy a Points Exponent Factory."}, 
     textStyle: {'color': '#ffe125'},
        },
        15: {
     name() {return "The Beginning of Timewall"},
     done() {return player.T.points.gte(1)}, 
     unlocked(){return true},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Get 1 Timewall."}, 
     textStyle: {'color': '#ffe125'},
        },
        21: {
     name() {return "A Huge Point"},
     done() {return player.points.gte(16777216)}, 
     unlocked(){return player.A.points.gte(5)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Get 16,777,216 Points."}, 
     textStyle: {'color': '#ffe125'},
        },
        22: {
     name() {return "Automated"},
     done() {return hasUpgrade('T',31)}, 
     unlocked(){return player.A.points.gte(5)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Unlock Automation."}, 
     textStyle: {'color': '#ffe125'},
        },
        23: {
     name() {return "Waiting for so long"},
     done() {return hasUpgrade('Q',11)}, 
     unlocked(){return player.A.points.gte(5)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy a QqQe308 Upgrade."}, 
     textStyle: {'color': '#ffe125'},
        },
        24: {
     name(){return "Rich Employer"},
     done() {return getBuyableAmount('T',11).gte(100)}, 
     unlocked(){return player.A.points.gte(5)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy 100 Point Producers."}, 
     textStyle: {'color': '#ffe125'},
        },
        25: {
     name(){return "Challenging"},
     done() {return hasUpgrade('T',34)}, 
     unlocked(){return player.A.points.gte(5)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Unlock Challenges."}, 
     textStyle: {'color': '#ffe125'},
        },
        31: {
     name(){return "Super Wall"},
     done() {return player.ST.points.gte(1)}, 
     unlocked(){return player.A.points.gte(10)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Get 1 Super Timewall."}, 
     textStyle: {'color': '#ffe125'},
        },
        32: {
     name(){return "All is for Points"},
     done() {return hasUpgrade('ST',11)&&hasUpgrade('ST',12)&&hasUpgrade('ST',13)&&hasUpgrade('ST',14)}, 
     unlocked(){return player.A.points.gte(10)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy All Upgrades of S1-x."}, 
     textStyle: {'color': '#ffe125'},
        },
        33: {
     name(){return "Remarkable Progress"},
     done() {return tmp.A.ProgressToInf.gte(10)}, 
     unlocked(){return player.A.points.gte(10)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 10% Progress to Infinity."}, 
     textStyle: {'color': '#ffe125'},
        },
        34: {
     name(){return "Fully Automated"},
     done() {return hasUpgrade('ST',21)&&hasUpgrade('ST',22)&&hasUpgrade('ST',23)&&hasUpgrade('ST',24)}, 
     unlocked(){return player.A.points.gte(10)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy All Upgrades of S2-x."}, 
     textStyle: {'color': '#ffe125'},
        },
        35: {
     name(){return "Another Side Layer"},
     done() {return player.Qi.points.gte(1)}, 
     unlocked(){return player.A.points.gte(10)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Get 1 QqQeInfinity."}, 
     textStyle: {'color': '#ffe125'},
        },
        41: {
     name(){return "Really Persistant"},
     done() {return tmp.Qi.effQqQe308.gte(20)}, 
     unlocked(){return player.A.points.gte(15)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 20 Super-QqQe308."}, 
     textStyle: {'color': '#ffe125'},
        },
        42: {
     name(){return "Challenging Again"},
     done() {return hasChallenge('ST',11)}, 
     unlocked(){return player.A.points.gte(15)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete a ST-Challenge."}, 
     textStyle: {'color': '#ffe125'},
        },
        43: {
     name(){return "Googol"},
     done() {return player.points.gte(1e100)}, 
     unlocked(){return player.A.points.gte(15)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 1e100 Points."}, 
     textStyle: {'color': '#ffe125'},
        },
        44: {
     name(){return "How the tables have turned..."},
     done() {return tmp.T.freePP.gte(getBuyableAmount('T',11).times(100000))&&tmp.T.freePP.gt(0)&&getBuyableAmount('T',11).gt(0)}, 
     unlocked(){return player.A.points.gte(15)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Make free Point Producer 100,000 times more than bought Point Producer."}, 
     textStyle: {'color': '#ffe125'},
        },
        45: {
     name(){return "Now it becomes easier"},
     done() {return tmp.Qi.effQqQe308.gte(1e4)}, 
     unlocked(){return player.A.points.gte(15)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 10,000 effective Super-QqQe308."}, 
     textStyle: {'color': '#ffe125'},
        },
        51: {
     name(){return "Mega Wall"},
     done() {return player.MT.points.gte(1)}, 
     unlocked(){return player.A.points.gte(20)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Get 1 Mega Timewall."}, 
     textStyle: {'color': '#ffe125'},
        },
        52: {
     name(){return "Halfway to Infinity"},
     done() {return tmp.A.ProgressToInf.gte(50)}, 
     unlocked(){return player.A.points.gte(20)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 50% Progress to Infinity."}, 
     textStyle: {'color': '#ffe125'},
        },
        53: {
     name(){return "Round Three"},
     done() {return tmp.MT.totalcomp.gte(1)}, 
     unlocked(){return player.A.points.gte(20)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete a MT-Challenge."}, 
     textStyle: {'color': '#ffe125'},
        },
        54: {
     name(){return "Layer 6"},
     done() {return player.co.points.gte(1)}, 
     unlocked(){return player.A.points.gte(20)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Get 1 cokecole."}, 
     textStyle: {'color': '#ffe125'},
        },
        55: {
     name(){return "Googol^2"},
     done() {return player.points.gte(1e200)}, 
     unlocked(){return player.A.points.gte(20)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 1e200 points."}, 
     textStyle: {'color': '#ffe125'},
        },
        61: {
     name(){return "The Final Trial"},
     done() {return hasChallenge('MT',14)}, 
     unlocked(){return player.A.points.gte(25)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete MT-Challenge 4 once."}, 
     textStyle: {'color': '#ffe125'},
        },
        62: {
     name(){return "Even More Timewall"},
     done() {return tmp.Qi.effcokecole.gte(10)}, 
     unlocked(){return player.A.points.gte(25)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 10 effective Super-cokecole."}, 
     textStyle: {'color': '#ffe125'},
        },
        63: {
     name(){return "Is this useful?"},
     done() {return getClickableState('T',12)==100}, 
     unlocked(){return player.A.points.gte(25)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Click \"+1 Point\" clickable when point is more than 1e250."}, 
     textStyle: {'color': '#ffe125'},
        },
        64: {
     name(){return "Free Day"},
     done() {return tmp.T.freePP.gte(1e13)}, 
     unlocked(){return player.A.points.gte(25)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Have 1e13 free Point Producers."}, 
     textStyle: {'color': '#ffe125'},
        },
        65: {
     name(){return "The End is a New Start"},
     done() {return tmp.A.ProgressToInf.gte(100)}, 
     unlocked(){return player.A.points.gte(25)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach Infinity."}, 
     textStyle: {'color': '#ffe125'},
        },
        71: {
     name(){return "Real reset"},
     done() {return player.I.inf.gte(1)}, 
     unlocked(){return player.A.points.gte(30)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Infinity once."}, 
     textStyle: {'color': '#ffe125'},
        },
        72: {
     name(){return "From 9:00 a.m. to 5:00 p.m."},
     done() {return player.I.bestTime.lte(n(8).times(3600))}, 
     unlocked(){return player.A.points.gte(30)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Infinity in less than 8 hours."}, 
     textStyle: {'color': '#ffe125'},
        },
        73: {
     name(){return "Major Challenge"},
     done() {return tmp.I.NCcomp.gte(3)}, 
     unlocked(){return player.A.points.gte(30)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete 3 Normal Challenges."}, 
     textStyle: {'color': '#ffe125'},
        },
        74: {
     name(){return "It's fast"},
     done() {return player.I.bestTime.lte(3600)}, 
     unlocked(){return player.A.points.gte(30)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Infinity in less than 1 hour."}, 
     textStyle: {'color': '#ffe125'},
        },
        75: {
     name(){return "Lots of Infinities"},
     done() {return player.I.inf.gte(10)}, 
     unlocked(){return player.A.points.gte(30)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Infinity 10 times."}, 
     textStyle: {'color': '#ffe125'},
        },
        81: {
     name(){return "It's even faster!"},
     done() {return player.I.bestTime.lte(600)}, 
     unlocked(){return player.A.points.gte(35)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Infinity in less than 10 minutes."}, 
     textStyle: {'color': '#ffe125'},
        },
        82: {
     name(){return "No DLC Required"},
     done() {return player.I.upgrades.length >= 16}, 
     unlocked(){return player.A.points.gte(35)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy 16 Infinity Upgrades."}, 
     textStyle: {'color': '#ffe125'},
        },
        83: {
     name(){return "Forever isn't that long"},
     done() {return player.I.bestTime.lte(60)}, 
     unlocked(){return player.A.points.gte(35)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Infinity in less than 1 minutes."}, 
     textStyle: {'color': '#ffe125'},
        },
        84: {
     name(){return "Prepared to Break Infinity"},
     done() {return tmp.I.NCcomp.gte(6)}, 
     unlocked(){return player.A.points.gte(35)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete all Normal Challenges."}, 
     textStyle: {'color': '#ffe125'},
        },
        85: {
     name(){return "You don't need it"},
     done() {return player.points.gte(n(2).pow(1024))&&player.MT.challenges[11]==0}, 
     unlocked(){return player.A.points.gte(35)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach Infinity without completing MT-Challenge 1."}, 
     textStyle: {'color': '#ffe125'},
        },
        91: {
     name(){return "Impossible"},
     done() {return false}, 
     unlocked(){return player.A.points.gte(41)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "This achievement is impossible."}, 
     textStyle: {'color': '#ffe125'},
        },
    },
    milestones:{
        0: {
            requirementDescription: "Speed-up",
            effectDescription() {return "The Game is too Slow? Use this to speed it up! Anyhow, I promise this game is balanced at normal speed. The buttons reffer to +1x,+2x,+4x,+8x(removed) speed, you can speed the game up to 8x."},
            done() { return true },
            toggles:[["A", "speed1"],["A", "speed2"],["A", "speed3"],]//["A", "speed4"],]
        },
    },
    tips(){a='Some coming achievements:<br>'
        for (let i = 1; i < 9; i++) {
            for (let b = 1; b < 6; b++) {
                if(!hasAchievement('A',i*10+b)&&player.A.points.gte(i*5-8+b)) a=a+layers.A.achievements[i*10+b].name()+': '+layers.A.achievements[i*10+b].tooltip()+'<br>'
            }
            
        }
        return a
    },
    ProgressToInf(){a=player.points.max(1).log(10).div(n(2).pow(1024).log(10)).times(100).min(100)
        return a
    },
    ProgressToEtr(){a=player.I.points.max(1).log(10).div(n(2).pow(1024).log(10)).times(100).min(100)
        return a
    },
})

addLayer("T", {
    name: "Timewall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        pause: n(0),
        total:n(0),
        best:n(0),
        resetTime:0,
    }},
    color: "#4adb13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Timewalls", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "costum", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    prestigeButtonText(){a='Reset for '+format(tmp.T.getResetGain)+' Timewalls'
        if(tmp.T.getResetGain.lt(1)) a=a+'<br>You need 50 PP, 5 PPM and 1 PEF to reset'
        return a
     },
    getResetGain(){x=getBuyableAmount('T',11)
        if(x.gte(400)) x=x.div(400).pow(0.5).times(400)
        a=n(1.1).pow(x.sub(50))
        y=getBuyableAmount('T',12)
        if(y.gte(175)) y=y.div(175).pow(0.5).times(175)
        b=n(1.5).pow(y.sub(5))
        c=n(2).pow(getBuyableAmount('T',13).pow(1.5).sub(1))
        if(a.lt(1))a=n(0)
        if(b.lt(1))b=n(0)
        if(c.lt(1))c=n(0)
            d=a.times(b).times(c)
        d=d.times(buyableEffect('T',14))
        if(hasUpgrade('Q',23)&&!inChallenge('MT',13)) d=d.times(upgradeEffect('Q',23))
        if(hasUpgrade('MT',11)) d=d.times(upgradeEffect('MT',11))
        if(hasUpgrade('I',31)) d=d.times(upgradeEffect('I',31))
        if(inChallenge('MT',12)) d=d.pow(0.5)
        exp=n(0.5)
        if(hasUpgrade('ST',32)) exp=exp.add(0.05)
        if(d.gt(10))d=d.div(10).pow(exp).times(10)
        if(inChallenge('ST',14)) d=n(0)
        if(inChallenge('MT',14)) d=n(0)
            return d
    },
    canReset(){return tmp.T.getResetGain.gte(1)},
    hotkeys: [
        {key: "1",
        description: "1: Buy a Point Producer",
        onPress(){if (layers.T.buyables[11].canAfford()) layers.T.buyables[11].buy()},
        unlocked() {return hasUpgrade('T',11)&&(!player.T.PPauto||!hasMilestone('T',0))}},
        {key: "2",
        description: "2: Buy a Point Producer Multiplier",
        onPress(){if (layers.T.buyables[12].canAfford()) layers.T.buyables[12].buy()},
        unlocked() {return hasUpgrade('T',11)&&(!player.T.PPauto||!hasMilestone('T',0))}},
        {key: "3",
        description: "3: Buy a Point Exponent Factory",
        onPress(){if (layers.T.buyables[13].canAfford()) layers.T.buyables[13].buy()},
        unlocked() {return hasUpgrade('T',11)&&(!player.T.PPauto||!hasMilestone('T',0))}},
        {key: "t",
        description: "T: Reset for Timewall",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return true}},
    ],
    layerShown(){return true},
    tabFormat: {
   "Upgrades": {
        content: [ "main-display","prestige-button","resource-display",
    ["display-text", () => tmp.T.resourcetip],
    "clickables","buyables","upgrades",
    ],
    },
    "Automation": {
        content: [ "main-display","prestige-button","resource-display","milestones",
    ],
    unlocked(){return hasMilestone('T',0)},
    },
    "Challenges": {
        content: [ "main-display","prestige-button","resource-display","challenges",
    ],
    unlocked(){return hasUpgrade('T',34)},
    },
    },
    doReset(resettingLayer) {
        setBuyableAmount('T',11,n(0))
        setBuyableAmount('T',12,n(0))
        setBuyableAmount('T',13,n(0))
        if (layers[resettingLayer].row == 2) {
    let kept = []
    if(hasUpgrade('ST',21)||hasUpgrade('I',14)) kept.push('milestones')
    if(hasUpgrade('ST',22)) kept.push('upgrades')
    if(hasUpgrade('ST',22)) kept.push('challenges')
    layerDataReset(this.layer, kept)
       }
       if (layers[resettingLayer].row == 3) {
    let kept = []
    if(hasUpgrade('MT',13)) kept.push('milestones','upgrades','challenges')
    if(hasUpgrade('I',14)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
       if (layers[resettingLayer].row == 4) {
    let kept = []
    if(hasUpgrade('I',14)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
    },
    update(diff){
        player.devSpeed = tmp.A.devSpeedCal
        if(!hasUpgrade('I',51)) player.points=player.points.min(n(2).pow(1024))
        if(!hasMilestone('Q',1)){
        if(((hasMilestone('T',0)&&player.T.PPauto==true)||(hasMilestone('I',0)&&player.I.TBauto))&&layers.T.buyables[11].canAfford()) layers.T.buyables[11].buy()
        if(((hasMilestone('T',0)&&player.T.PPMauto==true)||(hasMilestone('I',0)&&player.I.TBauto))&&layers.T.buyables[12].canAfford()) layers.T.buyables[12].buy()
        if(((hasMilestone('T',0)&&player.T.PEFauto==true)||(hasMilestone('I',0)&&player.I.TBauto))&&layers.T.buyables[13].canAfford()) layers.T.buyables[13].buy()}
        if(hasMilestone('Q',1)){
        if(((hasMilestone('T',0)&&player.T.PPauto==true)||(hasMilestone('I',0)&&player.I.TBauto))&&layers.T.buyables[11].canAfford()) layers.T.buyables[11].buyMax()
        if(((hasMilestone('T',0)&&player.T.PPMauto==true)||(hasMilestone('I',0)&&player.I.TBauto))&&layers.T.buyables[12].canAfford()) layers.T.buyables[12].buyMax()
        if(((hasMilestone('T',0)&&player.T.PEFauto==true)||(hasMilestone('I',0)&&player.I.TBauto))&&layers.T.buyables[13].canAfford()) layers.T.buyables[13].buyMax()}
        if(((hasMilestone('ST',1)&&player.ST.TDauto==true)||(hasMilestone('I',1)&&player.I.TDauto))&&layers.T.buyables[14].canAfford()&&!hasMilestone('Q',4)) layers.T.buyables[14].buy()
        if(((hasMilestone('ST',1)&&player.ST.TDauto==true)||(hasMilestone('I',1)&&player.I.TDauto))&&layers.T.buyables[14].canAfford()&&hasMilestone('Q',4)) layers.T.buyables[14].buyMax()
        if(hasUpgrade('T',33)||hasUpgrade('I',14)) player.points = player.points.max(25)
        if(hasUpgrade('MT',11)&&!hasUpgrade('T',31)) player.T.upgrades.push(31)
        if(hasUpgrade('MT',11)&&!hasUpgrade('T',33)) player.T.upgrades.push(33)
        if(hasUpgrade('MT',12)&&!hasMilestone('Q',1)) player.Q.milestones.push(1)
        if(hasUpgrade('MT',12)&&!hasMilestone('Q',2)) player.Q.milestones.push(2)
        if(hasMilestone('I',0)&&player.I.TCauto){
            if(hasUpgrade('T',34)&&player.points.gte(1e10)) player.T.challenges[11] = 1
            if(hasUpgrade('ST',23)&&player.points.gte(1e23)) player.T.challenges[12] = 1}
    },
    passiveGeneration()
    {
        mult = new Decimal(0)
        if(hasUpgrade('ST',24)) mult=mult.add(0.5)
        if(hasUpgrade('I',14)) mult=mult.add(0.5)
        return mult
    },
    autoUpgrade() { return hasMilestone('I',0)&&player.I.TUauto},
    upgrades: {
        11: {
            title: "T1-1",
            description: "Unlock a Clickable and 3 Buyables.",
            cost(){
                a=n(0)
            return a},
        },
        21: {
            title: "T2-1",
            description: "Multiply Point Producer base effect based on total Timewall.",
            unlocked(){return player.T.total.gte(1)},
            effect(){a=player.T.total.add(1).pow(0.5).times(player.T.total.add(1).log(10).add(1))
                b=n(0.5)
                if(hasUpgrade('Q',11)&&!inChallenge('MT',13)) b=b.add(0.25)
                if(a.gte(10))a=a.div(10).pow(b).times(10)
                //if(a.gte('1e10000')) a=n('1e10000')
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1)
            return a},
            //tooltip(){return "Softcap start: 10x<br>hardcap: 1e10000x"},
        },
        22: {
            title: "T2-2",
            description: "Multiply Point Producer base effect based on Point Producer bought.",
            unlocked(){return player.T.total.gte(1)},
            effect(){a=getBuyableAmount('T',11).times(0.05).add(1)
                //if(a.gte(4))a=a.div(4).pow(0.5).times(4)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5)
            return a},
        },
        23: {
            title: "T2-3",
            description: "The effect of Point Producer Multiplier is raised to ^1.5.",
            unlocked(){return player.T.total.gte(1)},
            //effect(){return getBuyableAmount('T',11).pow(0.2)},
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(35)
            return a},
        },
        24: {
            title: "T2-4",
            description: "Multiply Point Producer Multiplier base effect based on Point Producer Multiplier bought.",
            unlocked(){return player.T.total.gte(1)},
            effect(){return getBuyableAmount('T',12).times(0.1).add(1)},
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(100)
            return a},
        },
        31: {
            title: "T3-1",
            description: "Unlock Automation and a side layer.",
            unlocked(){return hasUpgrade('T',21)&&hasUpgrade('T',22)&&hasUpgrade('T',23)&&hasUpgrade('T',24)},
            effect(){a=n(1)
                    return a
            },
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(150)
            return a},
        },
        32: {
            title: "T3-2",
            description: "Give free Point Producers based on Point Producer Multiplier bought.",
            unlocked(){return hasUpgrade('T',21)&&hasUpgrade('T',22)&&hasUpgrade('T',23)&&hasUpgrade('T',24)},
            effect(){return getBuyableAmount('T',12)},
            effectDisplay(){return '+'+format(this.effect())},
            cost(){
                a=n(250)
            return a},
            tooltip(){return "doesn't affect T2-2 effect"},
        },
        33: {
            title: "T3-3",
            description: "Your points will not decrease and will not be less than 25.",
            unlocked(){return hasUpgrade('T',21)&&hasUpgrade('T',22)&&hasUpgrade('T',23)&&hasUpgrade('T',24)},
            effect(){a=n(1)
                    return a
            },
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(500)
            return a},
        },
        34: {
            title: "T3-4",
            description: "Unlock challenges.",
            unlocked(){return hasUpgrade('T',21)&&hasUpgrade('T',22)&&hasUpgrade('T',23)&&hasUpgrade('T',24)},
            effect(){a=n(1)
                    return a
            },
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(100000)
            return a},
        },
        41: {
            title: "T4-1",
            description: "Point Producer cost scaling 1.15x -> 1.10x",
            unlocked(){return hasUpgrade('Q',14)},
            effect(){a=n(1)
                    return a
            },
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(2e6)
            return a},
        },
        42: {
            title: "T4-2",
            description: "Point Exponent Factory is twice effective.",
            unlocked(){return hasUpgrade('Q',14)},
            //effect(){return getBuyableAmount('T',12).times(0.1).add(1)},
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5e8)
            return a},
        },
        43: {
            title: "T4-3",
            description: "Give free Point Producer Multipliers based on Point Exponent Factory bought.",
            unlocked(){return hasUpgrade('Q',14)},
            effect(){return getBuyableAmount('T',13)},
            effectDisplay(){return '+'+format(this.effect())},
            cost(){
                a=n(1e10)
            return a},
            tooltip(){return "doesn't affect T2-4 effect"},
        },
        44: {
            title: "T4-4",
            description: "Unlock next layer.",
            unlocked(){return hasUpgrade('Q',14)},
            //effect(){return getBuyableAmount('T',12).times(0.1).add(1)},
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1e12)
            return a},
        },
    },
    clickables:{
        11: {
            title: "Pause",
            display() {return "Click to Pause, Click Again to Unpause"},
            canClick() {return true},
            onClick() {player.T.pause = player.T.pause.add(1)
                if (player.T.pause.gt(1)) player.T.pause = n(0)
            },
        },
        12: {
            title: "+1 Point",
            display() {return "+1 Point"},
            unlocked(){return hasUpgrade('T',11)},
            canClick() {return player.T.pause.eq(0)},
            onClick() {player.points = player.points.add(1)
                if(player.points.gte(1e250)) setClickableState(this.layer,this.id,100)
            },
        },
    },
    buyables: {
        11: {
            title(){text = 'Point Producer'
                text=text+'('+format(getBuyableAmount('T', this.id))
                if(tmp.T.freePP.neq(0))text=text+' + '+format(tmp.T.freePP)
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(1.15).pow(x).times(25)
                if(hasUpgrade('T',41))a= new Decimal(1.1).pow(x).times(25)
                    return a
             },
            effect(x) {return x.add(tmp.T.freePP).times(tmp.T.PPmult)},
            display() {a= "Produce "+format(tmp.T.PPmult)+" Points Per Second<br/>Effect:produces "+format(this.effect())
                if(buyableEffect('T',13).neq(1)) a=a+'^'+format(buyableEffect('T',13))+'='+format(tmp.T.ptGain)
                a=a+" points/s<br/>"
            if(tmp.T.ptGain.gte(tmp.T.softcapstart)) a=a+'After softcap: '+format(getPointGen())+' points/s<br/>'
            a=a+"Cost: "+format(this.cost())+' points'
            return a },
            unlocked() {return hasUpgrade('T', 11)},
            canAfford() { return player.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                //if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
            buy() {
                if(!hasUpgrade('T',33))player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.points.max(25).div(25).log(1.15)
                    if(hasUpgrade('T',41)) tempBuy = player.points.max(25).div(25).log(1.1)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        12: {
            title(){text = 'Point Producer Multiplier'
                text=text+'('+format(getBuyableAmount('T', this.id))
                if(tmp.T.freePPM.neq(0))text=text+' + '+format(tmp.T.freePPM)
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(5).pow(x).times(500)
                if(hasUpgrade('I',12))a= new Decimal(4.5).pow(x).times(500)
                return a
             },
            effect(x) {a= x.add(tmp.T.freePPM).times(tmp.T.PPMbase)
                if(inChallenge('T',12)) a=n(0)
                if(inChallenge('MT',14)) a=n(0)
                return a
            },
            display() { a= "Add "+format(tmp.T.PPMbase)+" to Point Producer Multiplier<br/>Effect:+ "+format(this.effect())
                if(tmp.T.PPMexp.neq(1)) a=a+ '^'+format(tmp.T.PPMexp)+'='+format(this.effect().pow(tmp.T.PPMexp))
                a=a+"x<br/>Cost: "+format(this.cost())+' points'
            return a },
            unlocked() {return hasUpgrade('T', 11)},
            canAfford() { return player.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                //if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
            buy() {
                if(!hasUpgrade('T',33))player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.points.max(500).div(500).log(5)
                    if(hasUpgrade('I',12)) tempBuy = player.points.max(500).div(500).log(4.5)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        13: {
            title(){text = 'Point Exponent Factory'
                text=text+'('+format(getBuyableAmount('T', this.id))
                if(tmp.T.freePEF.neq(0))text=text+' + '+format(tmp.T.freePEF)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(20).pow(x.pow(2)).times(2e5) },
            effect(x) {a=x.add(tmp.T.freePEF).times(tmp.T.PEFbase).add(1)
                if(inChallenge('I',14)) a=player.ST.total.add(1).pow(0.6).times(player.MT.total.add(1)).log(10).times(0.01).add(1).min(1.5)
                if(inChallenge('ST',13)) a=n(1)
                if(inChallenge('MT',14)) a=n(1)
                if(inChallenge('T',11)) a=a.times(0.75)
                if(inChallenge('ST',11)) a=a.times(0.5)
                if(a.gte(1.5)) a=a.sub(1.5).div(10).add(1.5)
                if(a.gte(2)) a=a.add(2).log(2)
                    return a
            },
            display() { a="Add "+format(tmp.T.PEFbase)+" to Point Producer Effect Exponent<br/>Effect:^"+format(this.effect())
                if(buyableEffect('T',13).gte(1.5)) a=a+'(Softcapped)' 
                a=a+"<br/>Cost: "+format(this.cost())+' points'
            return a },
            unlocked() {return hasUpgrade('T', 11)},
            canAfford() { return player.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                //if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
            buy() {
                if(!hasUpgrade('T',33))player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.points.max(2e5).div(2e5).log(20).pow(0.5)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        14: {
            title(){text = 'Timewall Doubler'
                text=text+'('+format(getBuyableAmount('T', this.id))
                if(tmp.T.freeTD.neq(0))text=text+' + '+format(tmp.T.freeTD)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(10).pow(x.add(1)) },
            effect(x) {a=tmp.T.TDbase.pow(x.add(tmp.T.freeTD))
                if(a.gte(1024)) a=n(2).pow(a.log(2).div(10).pow(0.5).times(10))
                    return a
            },
            display() { a="Multiply Timewall gain by "+format(tmp.T.TDbase)+" <br/>Effect:"+format(this.effect())+'x'
                if(buyableEffect(this.layer,this.id).gt(1024)) a=a+'(softcapped)'
                a=a+"<br/>Cost: "+format(this.cost())+' Timewalls'
            return a},
            unlocked() {return hasUpgrade('ST', 11)},
            canAfford() { return player.T.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                //if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
            buy() {
                if(!hasUpgrade('ST',33))player.T.points = player.T.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.T.points.max(1).log(10).sub(1)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
    },
    milestones:{
        0: {
            requirementDescription: "Buy Upgrade T3-1",
            effectDescription() {return "Unlock Autobuyers for PP, PPM, and PEF."},
            done() { return hasUpgrade('T',31)||hasUpgrade('ST',21) },
            toggles:[["T", "PPauto"],["T", "PPMauto"],["T", "PEFauto"]]
        },
    },
    challenges: {
        11: {
            name: "Point Crisis",
            challengeDescription: "Point Exponent Factory effect is multiplied by 0.75.",
            goalDescription:"1e10 Points",
            rewardDescription:"Unlock more QqQe308 upgrades.",
            canComplete: function() {return player.points.gte(1e10)},
            unlocked() {return hasUpgrade('T',34)}
        },
        12: {
            name: "Anti-Multiplier",
            challengeDescription: "Point Producer Multiplier is disabled.",
            goalDescription:"1e23 Points",
            rewardDescription:"Unlock more QqQe308 upgrades.",
            canComplete: function() {return player.points.gte(1e23)},
            unlocked() {return hasUpgrade('ST',23)}
        },
    },
    PPmult(){a=n(1)
        a=a.times(buyableEffect('T',12).pow(tmp.T.PPMexp).add(1))
        if(hasUpgrade('T',21)) a=a.times(upgradeEffect('T',21))
        if(hasUpgrade('T',22)) a=a.times(upgradeEffect('T',22))
        if(hasUpgrade('Q',12)&&!inChallenge('MT',13)) a=a.times(upgradeEffect('Q',12))
        if(hasUpgrade('Q',13)&&!inChallenge('MT',13)) a=a.times(upgradeEffect('Q',13))
        if(hasUpgrade('ST',12)) a=a.times(upgradeEffect('ST',12))
        if(hasUpgrade('ST',14)) a=a.times(upgradeEffect('ST',14))
        if(hasUpgrade('Q',21)&&!inChallenge('MT',13)) a=a.times(upgradeEffect('Q',21))
        if(hasUpgrade('ST',31)) a=a.times(upgradeEffect('ST',31))
        if(hasUpgrade('Q',24)&&!inChallenge('MT',13)) a=a.times(upgradeEffect('Q',24))
        if(hasChallenge('ST',11)) a=a.times(challengeEffect('ST',11))
        if(hasUpgrade('MT',11)) a=a.times(upgradeEffect('MT',11))
        if(hasChallenge('MT',11)) a=a.times(challengeEffect('MT',11))
        if(hasUpgrade('MT',22)) a=a.times(upgradeEffect('MT',22))
        if(hasMilestone('co',0)) a=a.times(tmp.co.effect)
        if(hasUpgrade('MT',31)) a=a.times(upgradeEffect('MT',31))
        if(hasUpgrade('I',11)) a=a.times(upgradeEffect('I',11))
        if(hasUpgrade('I',13)) a=a.times(upgradeEffect('I',13))
        if(hasUpgrade('I',23)) a=a.times(upgradeEffect('I',23))
        if(hasChallenge('I',11)) a=a.times(challengeEffect('I',11))
        if(hasChallenge('I',12)) a=a.times(challengeEffect('I',12))
        if(inChallenge('I',12)) a=a.times(tmp.I.NC2eff)
        return a
    },
    PPMbase(){a=n(1)
        if(hasUpgrade('T',24)) a=a.times(upgradeEffect('T',24))
        if(hasUpgrade('ST',13)) a=a.times(upgradeEffect('ST',13))
        if(hasMilestone('Qi',0)) a=a.times(10)
        if(hasUpgrade('MT',32)) a=a.times(upgradeEffect('MT',32))
        if(hasUpgrade('MT',51)) a=a.times(upgradeEffect('MT',51))
        if(hasUpgrade('I',21)) a=a.times(upgradeEffect('I',21))
        if(hasChallenge('I',13)) a=a.times(10)
        return a
    },
    PPMexp(){a=n(1)
        if(hasUpgrade('T',23)) a=n(1.5)
        if(hasUpgrade('ST',21)) a=a.add(0.5)
        if(hasMilestone('MT',1)) a=a.add(0.5)
        if(hasUpgrade('I',33)) a=a.add(0.5)
        if(inChallenge('I',13)) a=a.div(2)
        return a
    },
    PEFbase(){a=n(0.01)
        if(hasUpgrade('T',42)) a=a.times(2)
        if(hasUpgrade('ST',34)) a=a.times(1.5)
        if(hasUpgrade('MT',33)) a=a.times(upgradeEffect('MT',33))
        if(hasChallenge('I',14)) a=a.times(1.2)
        if(inChallenge('I',14)) a=n(0)
        return a
    },
    TDbase(){a=n(2)
        if(hasChallenge('ST',14)) a=a.times(challengeEffect('ST',14))
        return a
    },
    resourcetip(){a="You get Timewalls based on your buyable amount. The base Tw gain formula is: 1.1^(PP-50)x1.5^(PPM-5)x2^(PEF^1.5-1)"
        if(tmp.T.getResetGain.gte(10)) a=a+'<br>The Timewall gain will be softcapped after 10.'
        if(getBuyableAmount('T',11).gte(400)) a=a+'<br>The Point Producer in the formula will be softcapped after 400.'
        if(getBuyableAmount('T',12).gte(175)) a=a+'<br>The Point Producer Multiplier in the formula will be softcapped after 175.'
        return a
    },
    freePP(){a=n(0)
        if(hasUpgrade('T',32)) a=a.add(upgradeEffect('T',32))
        if(hasUpgrade('ST',41)) a=a.times(upgradeEffect('ST',41))
        if(hasChallenge('ST',13)) a=a.times(challengeEffect('ST',13))
        if(hasMilestone('MT',0)) a=a.times(tmp.MT.mil0effect)
        if(hasUpgrade('MT',42)) a=a.times(upgradeEffect('MT',42))
        if(inChallenge('MT',14)) a=n(0)
        if(inChallenge('I',15)) a=getBuyableAmount('T',11).div(3)
        return a
    },
    freePPM(){a=n(0)
        if(hasUpgrade('T',43)) a=a.add(upgradeEffect('T',43))
        if(hasUpgrade('ST',42)) a=a.times(upgradeEffect('ST',42))
        if(hasChallenge('ST',13)) a=a.times(challengeEffect('ST',13))
        if(hasUpgrade('MT',42)) a=a.times(upgradeEffect('MT',42))
        if(inChallenge('MT',14)) a=n(0)
        if(inChallenge('I',15)) a=getBuyableAmount('T',12).div(3)
        return a
    },
    freePEF(){a=n(0)
        if(hasChallenge('MT',14)) a=a.add(challengeEffect('MT',14))
        if(hasMilestone('MT',4)) a=a.add(1)
        if(inChallenge('MT',14)) a=n(0)
        if(inChallenge('I',15)) a=getBuyableAmount('T',13).div(3)
        return a
    },
    freeTD(){a=n(0)
        if(hasUpgrade('ST',33)) a=a.add(upgradeEffect('ST',33))
        if(inChallenge('MT',14)) a=n(0)
        if(inChallenge('I',15)) a=getBuyableAmount('T',14).div(3)
        return a
    },
    softcapstart(){a=n(2).pow(512)
        if(hasUpgrade('I',51)) a=a.times(n(2).pow(512))
        if(inChallenge('MT',11)) a=n(1)
        return a
    },
    softcapexp(){a=n(0.5)
        if(hasUpgrade('I',51)) a=n(0.75)
        if(inChallenge('MT',11)) a=n(0.25)
        return a
    },
    ptGain(){return new Decimal(buyableEffect('T',11)).pow(buyableEffect('T',13))},
})

addLayer("Q", {
    name: "QqQe308", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best:n(0),
    }},
    color: "#eee308",
    requires(){a = new Decimal(1e9)
        if(inChallenge('ST',12)||inChallenge('MT',14)) a=n(Infinity)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "QqQe308", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return 2}, // Prestige currency exponent
    base() {a=n(1)
        if(hasUpgrade('MT',54)) a=a.div(upgradeEffect('MT',54))
        if(hasChallenge('I',15)) a=a.div(challengeEffect('I',15))
        a=a.add(1)
    return a
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.div(tmp.Qi.QqQe308eff)
        if(hasUpgrade('I',22)) mult = mult.div(upgradeEffect('I',22))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if(hasUpgrade('MT',23)) exp=exp.div(0.75)
        return exp
    },
    directMult() {mult = n(1)
        if(inChallenge('MT',12)) mult=mult.times(0.5)
        return mult
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q",
        description: "Q: Reset for QqQe308",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return hasUpgrade('T',31)&&(!player.ST.QqQauto||!hasMilestone('ST',0))}},
    ],
    autoPrestige() {a = (player.ST.QqQauto&&hasMilestone('ST',0))||(player.I.QqQauto&&hasMilestone('I',0))
        return a
    },
    canBuyMax() {a = hasMilestone('Q',3)
        return a
    },
    resetsNothing() {return hasMilestone('Q',2)},
    layerShown(){return hasUpgrade('T',31)||hasMilestone('ST',0)||hasMilestone('I',0)},
    branches: ['T'],
    tabFormat: {
    "Milestones": {
        content: [ "main-display",
    "prestige-button",
    "resource-display",
    "milestones",
    ],
    unlocked(){return true},
    },
    "Upgrades": {
    content: [ "main-display","prestige-button","resource-display","upgrades",
    ],
    unlocked(){return hasMilestone('Q',0)},
    },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 2) {
    let kept = []
    if(hasUpgrade('ST',23)||hasUpgrade('I',14)) kept.push('milestones')
    if(hasUpgrade('ST',23)) kept.push('upgrades')
    layerDataReset(this.layer, kept)
       }
       if (layers[resettingLayer].row == 3) {
    let kept = []
    if(hasUpgrade('MT',13)) kept.push('milestones','upgrades')
    if(hasUpgrade('I',14)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
       if (layers[resettingLayer].row == 4) {
    let kept = []
    if(hasUpgrade('I',14)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    autoUpgrade(){return hasMilestone('I',0)&&player.I.QUauto},
    milestones: {
        0: {
            requirementDescription: "1 QqQe308",
            effectDescription: "Unlock QqQe308 Upgrades.",
            done() { return player.Q.points.gte(1) }
        },
        1: {
            requirementDescription: "3 QqQe308",
            effectDescription: "Autobuyers for PP, PPM, and PEF now buy max.",
            unlocked(){return hasMilestone('Q',0)},
            done() { return player.Q.points.gte(3) }
        },
        2: {
            requirementDescription: "8 QqQe308",
            effectDescription: "QqQe308 resets nothing.",
            unlocked(){return hasMilestone('Q',1)},
            done() { return player.Q.points.gte(8) }
        },
        3: {
            requirementDescription: "11 QqQe308",
            effectDescription: "Autobuyer for QqQe308 now buy max.",
            unlocked(){return hasMilestone('Q',2)},
            done() { return player.Q.points.gte(11) }
        },
        4: {
            requirementDescription: "15 QqQe308",
            effectDescription: "Autobuyers for Timewall Doubler now buy max.",
            unlocked(){return hasMilestone('Q',3)},
            done() { return player.Q.points.gte(15) }
        },
        5: {
            requirementDescription: "75 QqQe308",
            effectDescription: "Autobuyers for QqQeInfinity now buy max.",
            unlocked(){return hasMilestone('Q',4)&&hasMilestone('I',1)},
            done() { return player.Q.points.gte(75)&&hasMilestone('I',1) }
        },
        6: {
            requirementDescription: "80 QqQe308",
            effectDescription: "Cokecole resets nothing.",
            unlocked(){return hasMilestone('Q',5)&&hasMilestone('I',2)},
            done() { return player.Q.points.gte(80)&&hasMilestone('I',2) }
        },
        7: {
            requirementDescription: "100 QqQe308",
            effectDescription: "Autobuyers for cokecole now buy max.",
            unlocked(){return hasMilestone('Q',4)&&hasMilestone('I',2)},
            done() { return player.Q.points.gte(100)&&hasMilestone('I',2) }
        },
    },
    upgrades: {
        11: {
            title: "Q1-1",
            description: "Nerf the softcap of T2-1.",
            unlocked(){return hasMilestone('Q',0)},
            cost(){
                a=n(1)
            return a},
        },
        12: {
            title: "Q1-2",
            description: "Multiply Point Producer base effect based on time played.",
            unlocked(){return hasMilestone('Q',0)},
            effect(){a=n(player.timePlayed).log(2).pow(2)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(2)
            return a},
        },
        13: {
            title: "Q1-3",
            description: "Multiply Point Producer base effect based on best QqQe308.",
            unlocked(){return hasChallenge('T',11)},
            effect(){a=player.Q.best.max(1).pow(2)
                if(hasUpgrade('Q',23)) a=a.pow(2)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(4)
            return a},
        },
        14: {
            title: "Q1-4",
            description: "Unlock a new row of timewall upgrades.",
            unlocked(){return hasChallenge('T',11)},
            effect(){a=n(1)
                    return a
            },
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5)
            return a},
        },
        21: {
            title: "Q2-1",
            description: "Multiply Point Producer base effect based on time played since last Super Timewall reset.",
            unlocked(){return hasChallenge('T',12)},
            effect(){a=n(player.ST.resetTime).add(1)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(9)
            return a},
        },
        22: {
            title: "Q2-2",
            description: "S1-2 effect is squared.",
            unlocked(){return hasChallenge('T',12)},
            effect(){a=n(2)
                    return a
            },
            //effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(10)
            return a},
        },
        23: {
            title: "Q2-3",
            description: "Multiply Timewall gain based on best QqQe308, and Q1-3 effect is squared.",
            unlocked(){return hasChallenge('T',12)},
            effect(){a=player.Q.best.max(1).pow(2)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(14)
            return a},
        },
        24: {
            title: "Q2-4",
            description(){a = "Multiply Point Producer base effect based on "
                if(!hasUpgrade('ST',34)) a=a+'???'
                if(hasUpgrade('ST',34)) a=a+'QqQeInfinity'
                a=a+"."
            return a},
            unlocked(){return hasChallenge('T',12)},
            effect(){a=n(player.Qi.points).add(1).pow(10)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(17)
            return a},
        },
    },
})

addLayer("ST", {
    name: "Super_Timewall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "St", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
	    points: new Decimal(0),
        total:n(0),
        best:n(0),
        resetTime:0,
    }},
    color: "#ab4abc",
    requires() {a = new Decimal(1e12)
            return a
    }, // Can be a function that takes requirement increases into account
    resource: "Super Timewalls", // Name of prestige currency
    baseResource: "Timewalls", // Name of resource prestige is based on
    baseAmount() {return player.T.points}, // Get the current amount of baseResource
    type: "costum", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    prestigeButtonText(){a='Reset for '+format(tmp.ST.getResetGain)+' Super Timewalls'
        if(tmp.ST.getResetGain.lt(1)) a=a+'<br>You need 1e12 Timewalls and 6 QqQe308 to reset'
        return a
    },
    getResetGain(){x=n(10).pow(player.T.points.max(1).div(1e12).log(1e12))
            y=player.Q.points.sub(5)
            if(hasUpgrade('ST',43)) y=y.max(n(1.5).pow(y))
            if(x.lt(1)) x=n(0)
            if(player.Q.points.sub(5).lt(1)) y=n(0)
            d=x.times(y)
            if(hasUpgrade('MT',12)) d=d.times(upgradeEffect('MT',12))
            if(hasUpgrade('MT',52)) d=d.times(upgradeEffect('MT',52))
            if(hasUpgrade('I',31)) d=d.times(upgradeEffect('I',31))
            if(inChallenge('MT',12)) d=d.pow(0.5)
            return d
    },
    canReset(){return tmp.ST.getResetGain.gte(1)},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s",
        description: "S: Reset for Super Timewall",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked(){return hasUpgrade('T',44)||hasAchievement('A',31)}},
    ],
    layerShown(){return hasUpgrade('T',44)||hasAchievement('A',31)},
    tabFormat: {
   "Upgrades": {
        content: [ "main-display","prestige-button","resource-display",
    ["display-text", () => tmp.ST.resourcetip],
    "upgrades",
    ],
    },
    "Automations": {
        content: [ "main-display","prestige-button","resource-display","milestones",
    ],
    unlocked(){return hasMilestone('ST',0)},},
    "Challenges": {
        content: [ "main-display","prestige-button","resource-display","challenges",
    ],
    unlocked(){return hasUpgrade('ST',44)},
    },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 3) {
    let kept = []
    if(hasUpgrade('MT',34)||hasUpgrade('I',24)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
       if (layers[resettingLayer].row == 4) {
    let kept = []
    if(hasUpgrade('I',24)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
    },
    autoUpgrade() {return (hasMilestone('co',1)&&player.co.STupgauto)||(hasMilestone('I',1)&&player.I.STUauto)},
    passiveGeneration()
    {
        mult = n(0)
        if(hasMilestone('co',1)) mult=n(0.5)
        if(hasUpgrade('I',24)) mult=mult.add(0.5)
        return mult
    },
    branches: ['T','Q'],
    update(diff){
        if(hasUpgrade('MT',13)&&!hasUpgrade('ST',21)) player.ST.upgrades.push(21)
        if(hasUpgrade('MT',13)&&!hasUpgrade('ST',22)) player.ST.upgrades.push(22)
        if(hasUpgrade('MT',13)&&!hasUpgrade('ST',23)) player.ST.upgrades.push(23)
        if(hasUpgrade('MT',13)&&!hasUpgrade('ST',24)) player.ST.upgrades.push(24)
        if(hasMilestone('I',1)&&player.I.STCauto&&hasUpgrade('ST',44)){
            player.ST.challenges[11] = 1
            player.ST.challenges[12] = 1
            player.ST.challenges[13] = 1
            player.ST.challenges[14] = 1
        }
    },
    upgrades: {
        11: {
            title: "S1-1",
            description: "Unlock Timewall Doubler, which doubles timewall gain per purchase.",
            cost: new Decimal(1),
        },
        12: {
            title: "S1-2",
            description: "Multiply Point Producer base effect based on total Super Timewall.",
            unlocked(){return true},
            effect(){a=player.ST.total.add(1).log(2).add(1).pow(2)
                if(hasUpgrade('Q',22)&&!inChallenge('MT',13)) a=a.pow(2)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1)
            return a},
        },
        13: {
            title: "S1-3",
            description: "Multiply Point Producer Multiplier base effect based on total Super Timewall.",
            unlocked(){return true},
            effect(){a=player.ST.total.add(1).log(10).add(1)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5)
            return a},
        },
        14: {
            title: "S1-4",
            description: "Timewall Doubler effect also applies to Point Producer base effect at a reduced rate.",
            unlocked(){return true},
            effect(){a=buyableEffect('T',14).pow(0.5)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(10)
            return a},
        },
        21: {
            title: "S2-1",
            description: "Keep Automation in Super Timewall reset, and add 0.5 to the Point Producer Multiplier exponent.",
            unlocked(){return hasUpgrade('ST',11)&&hasUpgrade('ST',12)&&hasUpgrade('ST',13)&&hasUpgrade('ST',14)},
            cost(){
                a=n(20)
            return a},
        },
        22: {
            title: "S2-2",
            description: "Keep T-Upgrades and T-Challenges in Super Timewall reset, and unlock a QqQe308 Autobuyer.",
            unlocked(){return hasUpgrade('ST',11)&&hasUpgrade('ST',12)&&hasUpgrade('ST',13)&&hasUpgrade('ST',14)},
            cost(){
                a=n(30)
            return a},
        },
        23: {
            title: "S2-3",
            description: "Keep Q-Milestones and Q-Upgrades in Super Timewall reset, and unlock the 2nd T-Challenge.",
            unlocked(){return hasUpgrade('ST',11)&&hasUpgrade('ST',12)&&hasUpgrade('ST',13)&&hasUpgrade('ST',14)},
            cost(){
                a=n(50)
            return a},
        },
        24: {
            title: "S2-4",
            description: "Unlock autobuyer for Timewall Doubler, and gain 50% of Timewall on reset every second.",
            unlocked(){return hasUpgrade('ST',11)&&hasUpgrade('ST',12)&&hasUpgrade('ST',13)&&hasUpgrade('ST',14)},
            cost(){
                a=n(100)
            return a},
        },
        31: {
            title: "S3-1",
            description: "Multiply Point Producer base effect based on points.",
            unlocked(){return hasUpgrade('ST',21)&&hasUpgrade('ST',22)&&hasUpgrade('ST',23)&&hasUpgrade('ST',24)},
            effect(){a=player.points.add(1).pow(0.05)
                //if(a.gte(1e10)) a=n(10).pow(a.log(10).div(10).pow(0.5).times(10))
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(350)
            return a},
        },
        32: {
            title: "S3-2",
            description: "Nerf the Timewall softcap.",
            unlocked(){return hasUpgrade('ST',21)&&hasUpgrade('ST',22)&&hasUpgrade('ST',23)&&hasUpgrade('ST',24)},
            cost(){
                a=n(500)
            return a},
        },
        33: {
            title: "S3-3",
            description: "Give free Timewall Doublers based on Point Exponent Factory bought, and buying TDs no longer spend Timewalls.",
            unlocked(){return hasUpgrade('ST',21)&&hasUpgrade('ST',22)&&hasUpgrade('ST',23)&&hasUpgrade('ST',24)},
            effect(){a=getBuyableAmount('T',13).pow(2)
                //if(a.gte(1e10)) a=n(10).pow(a.log(10).div(10).pow(0.5).times(10))
                return a
            },
            effectDisplay(){return '+'+format(this.effect())},
            cost(){
                a=n(1000)
            return a},
        },
        34: {
            title: "S3-4",
            description: "Unlock a new side layer, and multiply Point Exponent Factory effect by 1.5.",
            unlocked(){return hasUpgrade('ST',21)&&hasUpgrade('ST',22)&&hasUpgrade('ST',23)&&hasUpgrade('ST',24)},
            cost(){
                a=n(5000)
            return a},
        },
        41: {
            title: "S4-1",
            description: "Multiply free Point Producer based on effective Super-QqQe308.",
            unlocked(){return hasMilestone('Qi',1)},
            effect(){a=tmp.Qi.effQqQe308.add(1)
                //if(a.gte(1e10)) a=n(10).pow(a.log(10).div(10).pow(0.5).times(10))
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(7000)
            return a},
        },
        42: {
            title: "S4-2",
            description: "Multiply free Point Producer Multiplier based on effective Super-QqQe308.",
            unlocked(){return hasMilestone('Qi',1)},
            effect(){a=tmp.Qi.effQqQe308.add(1).pow(0.75)
                //if(a.gte(1e10)) a=n(10).pow(a.log(10).div(10).pow(0.5).times(10))
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(10000)
            return a},
        },
        43: {
            title: "S4-3",
            description: "The QqQe308 in Super Timewall gain formula is more impactful[max(QqQ-5,1.5^(QqQ-5)].",
            unlocked(){return hasMilestone('Qi',1)},
            cost(){
                a=n(20000)
            return a},
        },
        44: {
            title: "S4-4",
            description: "Unlock ST-Challenge.",
            unlocked(){return hasMilestone('Qi',1)},
            cost(){
                a=n(100000)
            return a},
        },
        51: {
            title: "S5-1",
            description: "Multiply Super-QqQe308 generation speed based on ST-Challenges completed.",
            unlocked(){return hasChallenge('ST',11)},
            effect(){a=n(1)
                if(hasChallenge('ST',11)) a=a.times(2)
                if(hasChallenge('ST',12)) a=a.times(2)
                if(hasChallenge('ST',13)) a=a.times(2)
                if(hasChallenge('ST',14)) a=a.times(2)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(150000)
            return a},
        },
        52: {
            title: "S5-2",
            description: "Multiply Super-QqQe308 generation speed based on Timewalls.",
            unlocked(){return hasChallenge('ST',12)},
            effect(){a=player.T.points.add(1).log(1e10).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1500000)
            return a},
        },
        53: {
            title: "S5-3",
            description: "Timewall Doubler boosts Super-QqQe308 generation speed at a reduced rate.",
            unlocked(){return hasChallenge('ST',13)},
            effect(){a=buyableEffect('T',14).pow(0.1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(50000000)
            return a},
        },
        54: {
            title: "S5-4",
            description: "Unlock next layer.",//<br/>You have reached the current endgame!",
            unlocked(){return hasChallenge('ST',14)},
            cost(){
                a=n(5e9)
            return a},
        },
    },
    milestones:{
        0: {
            requirementDescription: "Buy Upgrade S2-2",
            effectDescription() {return "Unlock Autobuyer for QqQe308, and the Q layer is always shown."},
            done() { return hasUpgrade('ST',22) },
            toggles:[["ST", "QqQauto"]]
        },
        1: {
            requirementDescription: "Buy Upgrade S2-4",
            effectDescription() {return "Unlock Autobuyer for Timewall Doubler."},
            done() { return hasUpgrade('ST',24) },
            toggles:[["ST", "TDauto"]]
        },
    },
    challenges: {
        11: {
            name: "Point Crisis II",
            challengeDescription: "Point Exponent Factory effect is multiplied by 0.5.",
            goalDescription:"1e24 Points",
            rewardDescription:"Multiply Point Producer base effect based on completed challenges.<br>Unlock a new upgrade for each completed challenge.",
            rewardEffect(){a=n(1)
                if(hasChallenge('ST',11)) a=a.times(1e5)
                if(hasChallenge('ST',12)) a=a.times(1e5)
                if(hasChallenge('ST',13)) a=a.times(1e5)
                if(hasChallenge('ST',14)) a=a.times(1e5)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(1e24)},
            unlocked() {return hasUpgrade('ST',44)}
        },
        12: {
            name: "Anti-QqQe308",
            challengeDescription: "You can't gain QqQe308.",
            goalDescription:"1e75 Points",
            rewardDescription:"Multiply Timewall gain based on completed challenges.",
            rewardEffect(){a=n(1)
                if(hasChallenge('ST',11)) a=a.times(1e3)
                if(hasChallenge('ST',12)) a=a.times(1e3)
                if(hasChallenge('ST',13)) a=a.times(1e3)
                if(hasChallenge('ST',14)) a=a.times(1e3)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(1e75)},
            unlocked() {return hasUpgrade('ST',44)}
        },
        13: {
            name: "Useless Exponent",
            challengeDescription: "Point Exponent Factory effect is fixed to 1.",
            goalDescription:"1e75 Points",
            rewardDescription:"Multiply free PP and PPM based on completed challenges.",
            rewardEffect(){a=n(1)
                if(hasChallenge('ST',11)) a=a.times(2)
                if(hasChallenge('ST',12)) a=a.times(2)
                if(hasChallenge('ST',13)) a=a.times(2)
                if(hasChallenge('ST',14)) a=a.times(2)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(1e75)},
            unlocked() {return hasUpgrade('ST',44)}
        },
        14: {
            name: "Anti-Timewall",
            challengeDescription: "You can't gain timewall. The effects of \"Anti-QqQe308\" and \"Point Crisis II\" are also active.",
            goalDescription:"1e36 Points",
            rewardDescription:"Multiply Timewall Doubler base effect based on completed challenges.",
            rewardEffect(){a=n(0)
                if(hasChallenge('ST',11)) a=a.add(0.25)
                if(hasChallenge('ST',12)) a=a.add(0.25)
                if(hasChallenge('ST',13)) a=a.add(0.25)
                if(hasChallenge('ST',14)) a=a.add(0.25)
                b=n(2).pow(a)
                return b
            },
            countsAs:[11,12],
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(1e36)},
            unlocked() {return hasUpgrade('ST',44)}
        },
    },
    resourcetip(){a="You get Super Timewalls based on your Timewall and QqQe308 amount. The base STw gain formula is: 10^(log<sub>1e12</sub>Tw-1)x(QqQ-5)"
        //if(tmp.T.getResetGain.gte(10)) a=a+'<br>The timewall gain will be softcapped after 10.'
        //if(getBuyableAmount('T',11).gte(400)) a=a+'<br>The Point Producer in the formula will be softcapped after 400.'
        return a
    },
})

addLayer("Qi", {
    name: "QqQeInfinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Qi", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        QqQe308: n(0),
        cokecole:n(0),
    }},
    color: "#aee308",
    requires() {a = new Decimal(12)
        return a}, // Can be a function that takes requirement increases into account
    resource: "QqQeInfinity", // Name of prestige currency
    baseResource: "QqQe308", // Name of resource prestige is based on
    baseAmount() {return player.Q.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base(){return n(1.15)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        //if (player.Qi.points.gte(160)) exp = exp.div(player.Qi.points.times(0.05).add(1))
        return exp
    },
    directMult() {mult = n(1)
        return mult
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i",
        description: "I: Reset for QqQeInfinity",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked(){return hasUpgrade('ST',34)&&!(hasMilestone('co',0)&&player.co.Qiauto)}},
    ],
    layerShown(){return hasUpgrade('ST',34)||hasUpgrade('MT',34)||hasMilestone('I',1)},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 3) {
            let kept = []
            kept.push('cokecole')
            if(hasUpgrade('MT',34)||hasUpgrade('I',24)) kept.push('milestones','clickables')
            layerDataReset(this.layer, kept)
    }
    if (layers[resettingLayer].row == 4) {
    let kept = []
    if(hasUpgrade('I',24)) kept.push('milestones')
    if(hasUpgrade('I',34)) kept.push('clickables')
    layerDataReset(this.layer, kept)
       }
    },
    autoPrestige() {a = (hasMilestone('co',0)&&player.co.Qiauto)||(hasMilestone('I',1)&&player.I.Qiauto)
        return a
    },
    resetsNothing() {return hasMilestone('co',0)},
    canBuyMax(){return hasMilestone('Q',5)},
    update(diff){
        if(getClickableState(this.layer, 11)==1&&!inChallenge('MT',13)) player.Qi.QqQe308 = player.Qi.QqQe308.add(tmp.Qi.QqQe308speed.times(diff))
        if(getClickableState(this.layer, 12)==1) player.Qi.cokecole = player.Qi.cokecole.add(tmp.Qi.cokecolespeed.times(diff))
    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    branches: ['ST'],
    tabFormat: {
    "Milestones": {
        content: [ "main-display","prestige-button","resource-display","milestones",
    ],
    unlocked(){return true},
    },
    "Super-man": {
    content: [ "main-display","prestige-button","resource-display",
        ["display-text", () => tmp.Qi.Showdetail],"clickables",
    ],
    unlocked(){return hasMilestone('Qi',0)},
    },
    },
    milestones: {
        0: {
            requirementDescription: "1 QqQeInfinity",
            effectDescription: "Multiply Point Producer Multiplier base effect by 10, and unlock super-man.",
            done() { return player.Qi.points.gte(1) }
        },
        1: {
            requirementDescription: "2 QqQeInfinity",
            effectDescription: "Unlock the 4th row of Super Timewall upgrades.",
            done() { return player.Qi.points.gte(2) }
        },
    },
    clickables:{
        11: {
            title(){ a="Make Super-QqQe308"
                if(getClickableState(this.layer, this.id)==1) a='Stop making Super-QqQe308'
                return a
            },
            display() {a= "You are currently"
                if(getClickableState(this.layer, this.id)==0) a=a+' NOT'
                a=a+" making Super-QqQe308"
            return a},
            unlocked() {return hasMilestone('Qi', 0)},
            canClick() {return hasMilestone('Qi', 0)&&(tmp.Qi.currentActive.lt(tmp.Qi.maxActive)||getClickableState(this.layer, this.id)==1)},
            onClick() {setClickableState(this.layer, this.id, 1-getClickableState(this.layer, this.id))},
        },
        12: {
            title(){ a="Make Super-cokecole"
                if(getClickableState(this.layer, this.id)==1) a='Stop making Super-cokecole'
                return a
            },
            display() {a= "You are currently"
                if(getClickableState(this.layer, this.id)==0) a=a+' NOT'
                a=a+" making Super-cokecole"
            return a},
            unlocked() {return hasMilestone('Qi', 0)&&hasMilestone('MT',3)},
            canClick() {return hasMilestone('Qi', 0)&&hasMilestone('MT',3)&&(tmp.Qi.currentActive.lt(tmp.Qi.maxActive)||getClickableState(this.layer, this.id)==1)},
            onClick() {setClickableState(this.layer, this.id, 1-getClickableState(this.layer, this.id))},
        },
    },
    Showdetail() {a=''
        if(hasMilestone('Qi',0)) {a = "You have made <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.QqQe308) + "</h3> Super-QqQe308.<br/>"
        a=a+"Your effective Super-QqQe308 is <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>" + format(tmp.Qi.effQqQe308) + "</h3>"
        if(tmp.Qi.effQqQe308.gte(2000)) a=a+'(softcapped)'
        a=a+", dividing the requirement of QqQe308 by <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'> "+format(tmp.Qi.QqQe308eff)+"</h3>"
        if(tmp.Qi.QqQe308eff.gte('1e500')) a=a+"(softcapped)" 
        a=a+".<br/>Based your QqQeInfinity amount，your QqQeInfinity makes <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.QqQe308speed) +"</h3> Super-QqQe308 per second,"
        a=a+"which means making one Super-QqQe308 per <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.QqQe308speed))+"</h3> seconds.<br/>"}

        if(hasMilestone('Qi',0)&&hasMilestone('MT',3)) {a =a+"<br/>You have made <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.cokecole) + "</h3> Super-cokecole.<br/>"
        a=a+"Your effective Super-cokecole is <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>" + format(tmp.Qi.effcokecole) + "</h3>"
        //if(tmp.Qi.effQqQe308.gte(2000)) a=a+'(softcapped)'
        a=a+", raising cokecole effect by ^<h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+format(tmp.Qi.cokecoleeff)+"</h3>.<br>" 
        a=a+"Based your QqQeInfinity amount，your QqQeInfinity makes <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.cokecolespeed) +"</h3> Super-cokecole per second,"
        a=a+"which means making one Super-cokecole per <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.cokecolespeed))+"</h3> seconds.<br/>Super-cokecole is kept on row 3 reset."}

        a=a+'<br/><br/>You can only make '+format(tmp.Qi.maxActive,0)+' kind(s) of super-man at a time.'
        return a
    },
    maxActive(){a=n(1)
        return a
    },
    currentActive(){a=n(0)
        a=a.add(n(getClickableState('Qi',11)))
        a=a.add(n(getClickableState('Qi',12)))
        return a
    },
    effQqQe308(){a=player.Qi.QqQe308.floor()//effective QqQe308
        if(a.gte(2000)) a=a.div(2000).pow(0.5).times(2000)
        if(a.gte(10000)) a=n(10).pow(a.log(10).div(4).pow(0.5).times(4))
        return a
    },
    QqQe308speed(){a=n(1).div(120)
        a=a.times(n(2).pow(player.Qi.points.sub(1)))
        if(hasUpgrade('ST',51)) a=a.times(upgradeEffect('ST',51))
        if(hasUpgrade('ST',52)) a=a.times(upgradeEffect('ST',52))
        if(hasUpgrade('ST',53)) a=a.times(upgradeEffect('ST',53))
        if(hasChallenge('MT',13)) a=a.times(challengeEffect('MT',13))
        if(hasUpgrade('MT',41)) a=a.times(upgradeEffect('MT',41))
        if(hasUpgrade('I',32)) a=a.times(upgradeEffect('I',32))
        return a
    },
    QqQe308eff(){b=tmp.Qi.effQqQe308
        if(b.gte(2.5e5)) b=b.div(2.5e5).pow(0.25).times(2.5e5)
        a=n(10).pow(b.pow(0.5))
        return a
    },
    effcokecole(){a=player.Qi.cokecole.floor()
        return a
    },
    cokecolespeed(){a=n(1).div(1e5)
        a=a.times(n(2).pow(player.Qi.points.sub(1)))
        if(hasUpgrade('MT',43)) a=a.times(upgradeEffect('MT',43))
        if(hasUpgrade('MT',44)) a=a.times(upgradeEffect('MT',44))
        if(hasUpgrade('MT',53)) a=a.times(upgradeEffect('MT',53))
        if(hasUpgrade('I',42)) a=a.times(upgradeEffect('I',42))
        return a
    },
    cokecoleeff(){a=tmp.Qi.effcokecole.add(1).log(10).add(1).pow(0.5)
        return a
    },
})

addLayer("MT", {
    name: "Mega_Timewall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Mt", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: n(0),
        total:n(0),
        resetTime: 0,
    }},
    color: "#dcadc2",
    requires() {a = new Decimal(1e10)
            return a
    }, // Can be a function that takes requirement increases into account
    resource: "Mega Timewalls", // Name of prestige currency
    baseResource: "Super Timewalls", // Name of resource prestige is based on
    baseAmount() {return player.ST.points}, // Get the current amount of baseResource
    type: "costum", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    prestigeButtonText(){a='Reset for '+format(tmp.MT.getResetGain)+' Mega Timewalls'
    if(tmp.MT.getResetGain.lt(1)) a=a+'<br>You need 1e10 Super Timewalls and 1e4 effective Super-QqQe308 to reset'
    return a
    },
    getResetGain(){x=player.ST.points.pow(0.1).div(10)
            y=tmp.Qi.effQqQe308.pow(0.25).div(10)
            if(x.lt(1)) x=n(0)
            if(y.lt(1)) y=n(0)
            d=x.times(y)
            if(hasChallenge('MT',12)) d=d.times(challengeEffect('MT',12))
            if(hasUpgrade('I',41)) d=d.times(upgradeEffect('I',41))
            return d
    },
    canReset(){return tmp.MT.getResetGain.gte(1)&&(!hasUpgrade('MT',14)||hasMilestone('I',2))},
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m",
        description: "M: Reset for Mega Timewall",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return hasUpgrade('ST', 54)||hasAchievement('A', 51)}
        },
    ],
    layerShown(){return hasUpgrade('ST', 54)||hasAchievement('A', 51)},
    passiveGeneration()
    {
        mult = n(0)
        if(hasUpgrade('MT',14)) mult=n(0.01)
        if(hasUpgrade('I',34)) mult=mult.add(0.01)
        if(hasMilestone('MT',0)) mult=mult.times(tmp.MT.mil0effect2)
        return mult
    },
    update(diff){
        if(inChallenge('MT',11)) player.MT.challenges[11] = player.points.max(1).log(10).sub(2).floor().min(1.79e308).max(challengeCompletions('MT',11)).toNumber()
        if(inChallenge('MT',12)) player.MT.challenges[12] = player.points.max(1).log(1e5).sub(9).floor().min(1.79e308).max(challengeCompletions('MT',12)).toNumber()
        if(inChallenge('MT',13)) player.MT.challenges[13] = player.points.max(1).log(1e5).sub(23).floor().min(1.79e308).max(challengeCompletions('MT',13)).toNumber()
        if(inChallenge('MT',14)) player.MT.challenges[14] = player.points.max(1).log(1e3).sub(9).floor().min(1.79e308).max(challengeCompletions('MT',14)).toNumber()
        if(hasMilestone('MT',2)&&player.MT.STCauto&&!inChallenge('MT',11)&&!inChallenge('MT',12)&&!inChallenge('MT',13)&&!inChallenge('MT',14)&&hasUpgrade('ST',44)){
            player.ST.challenges[11] = 1
            player.ST.challenges[12] = 1
            player.ST.challenges[13] = 1
            player.ST.challenges[14] = 1
        }
        if((hasMilestone('I',2)&&player.I.MTCUauto)&&layers.MT.buyables[11].canAfford()) layers.MT.buyables[11].buy()
        if(hasMilestone('I',3)){
            if(player.I.MTC1auto&&getBuyableAmount('MT',11).gte(1)) player.MT.challenges[11] = player.points.pow(0.5).max(1).log(10).sub(2).floor().min(1.79e308).max(challengeCompletions('MT',11)).toNumber()
            if(player.I.MTC2auto&&getBuyableAmount('MT',11).gte(2)) player.MT.challenges[12] = player.points.max(1).log(1e5).sub(9).floor().min(1.79e308).max(challengeCompletions('MT',12)).toNumber()
            if(player.I.MTC3auto&&getBuyableAmount('MT',11).gte(3)) player.MT.challenges[13] = player.points.max(1).log(1e5).sub(23).floor().min(1.79e308).max(challengeCompletions('MT',13)).toNumber()
            if(player.I.MTC4auto&&getBuyableAmount('MT',11).gte(4)) player.MT.challenges[14] = player.points.pow(0.5).max(1).log(1e3).sub(9).floor().min(1.79e308).max(challengeCompletions('MT',14)).toNumber()
        }
    },
    branches: ['Qi','ST'],
    tabFormat: {
   "Upgrades": {
        content: [ "main-display","prestige-button","resource-display",
    ["display-text", () => tmp.MT.resourcetip],
    "upgrades",
    ],
    },
    "Challenges": {
        content: [ "main-display","prestige-button","resource-display",["display-text", () => tmp.MT.challengetip],"challenges","buyables"
    ],
    unlocked(){return hasUpgrade('MT',21)},
    },
    "Completion Milestones": {
        content: [ "main-display","prestige-button","resource-display","milestones",
    ],
    unlocked(){return hasMilestone('MT',0)},},
    },
    autoUpgrade(){return hasMilestone('I',2)&&player.I.MTUauto},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 4) {
    let kept = []
    if(hasUpgrade('I',34)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
    },
    upgrades: {
        11: {
            title: "M1-1",
            description: "Multiply Point Producer base effect and Timewall gain based on total Mega Timewall.",
            unlocked(){return true},
            effect(){a=player.MT.total.add(1).log(2).max(1).times(10)
                if(hasUpgrade('MT',12)) a=a.pow(2)
                if(hasUpgrade('MT',13)) a=a.pow(2)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1)
            return a},
            tooltip(){return "also keep T3-1 and T3-3 on reset"},
        },
        12: {
            title: "M1-2",
            description: "M1-1's effect is squared, and also applied to Super Timewall gain at a reduced rate.",
            unlocked(){return true},
            effect(){a=upgradeEffect('MT',11).pow(0.25)
                if(hasChallenge('I',16)) a=a.pow(4)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1)
            return a},
            tooltip(){return "also keep 3 & 8 QqQe308 on reset"},
        },
        13: {
            title: "M1-3",
            description: "M1-1's effect is squared again, and also applied to Point Producer Multiplier base effect at a reduced rate.",
            unlocked(){return true},
            effect(){a=upgradeEffect('MT',11).pow(0.125)
                if(hasChallenge('I',16)) a=a.pow(4)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(2)
            return a},
            tooltip(){return "also keep S2-x on reset"},
        },
        14: {
            title: "M1-4",
            description: "Gain 1% of Mega Timewall on reset every second, but you can't reset for Mega Timewall manually.",
            unlocked(){return true},
            cost(){
                a=n(10)
            return a},
        },
        21: {
            title: "M2-1",
            description: "Unlock MT-Challenge.",
            unlocked(){return hasUpgrade('MT',11)&&hasUpgrade('MT',12)&&hasUpgrade('MT',13)&&hasUpgrade('MT',14)},
            cost(){
                a=n(25)
            return a},
        },
        22: {
            title: "M2-2",
            description: "Multiply Point Producer base effect based on time played since last Mega Timewall reset.",
            unlocked(){return hasUpgrade('MT',11)&&hasUpgrade('MT',12)&&hasUpgrade('MT',13)&&hasUpgrade('MT',14)},
            effect(){a=n(player.MT.resetTime).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(50)
            return a},
        },
        23: {
            title: "M2-3",
            description: "The requirement of QqQe308 is raised to ^0.75.",
            unlocked(){return hasUpgrade('MT',11)&&hasUpgrade('MT',12)&&hasUpgrade('MT',13)&&hasUpgrade('MT',14)},
            cost(){
                a=n(250)
            return a},
        },
        24: {
            title: "M2-4",
            description: "Unlock the third side layer.",
            unlocked(){return hasUpgrade('MT',11)&&hasUpgrade('MT',12)&&hasUpgrade('MT',13)&&hasUpgrade('MT',14)},
            cost(){
                a=n(2500)
            return a},
        },
        31: {
            title: "M3-1",
            description: "Multiply Point Producer base effect based on effective Super-QqQe308.",
            unlocked(){return hasUpgrade('MT',21)&&hasUpgrade('MT',22)&&hasUpgrade('MT',23)&&hasUpgrade('MT',24)},
            effect(){a=tmp.Qi.effQqQe308.div(100).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(100000)
            return a},
        },
        32: {
            title: "M3-2",
            description: "Multiply Point Producer Multiplier base effect based on effective Super-QqQe308.",
            unlocked(){return hasUpgrade('MT',21)&&hasUpgrade('MT',22)&&hasUpgrade('MT',23)&&hasUpgrade('MT',24)},
            effect(){a=tmp.Qi.effQqQe308.pow(0.5).div(100).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5000000)
            return a},
        },
        33: {
            title: "M3-3",
            description: "Multiply Point Exponent Factory base effect based on effective Super-QqQe308.",
            unlocked(){return hasUpgrade('MT',21)&&hasUpgrade('MT',22)&&hasUpgrade('MT',23)&&hasUpgrade('MT',24)},
            effect(){a=tmp.Qi.effQqQe308.add(1).log(10).div(10).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1e8)
            return a},
        },
        34: {
            title: "M3-4",
            description: "Keep ST-Automation and Qi-Milestone on reset, and always show Qi layer.",
            unlocked(){return hasUpgrade('MT',21)&&hasUpgrade('MT',22)&&hasUpgrade('MT',23)&&hasUpgrade('MT',24)},
            cost(){
                a=n(1e9)
            return a},
        },
        41: {
            title: "M4-1",
            description: "Multiply Super-QqQe308 generation speed based on effective Super-cokecole.",
            unlocked(){return hasMilestone('co',2)},
            effect(){a=tmp.Qi.effcokecole.add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1e12)
            return a},
        },
        42: {
            title: "M4-2",
            description: "Multiply free PP and PPM based on effective Super-cokecole.",
            unlocked(){return hasMilestone('co',2)},
            effect(){a=tmp.Qi.effcokecole.add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5e13)
            return a},
        },
        43: {
            title: "M4-3",
            description: "Multiply Super-cokecole generation speed based on effective Super-QqQe308.",
            unlocked(){return hasMilestone('co',2)},
            effect(){a=tmp.Qi.effQqQe308.add(1).log(10).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1e14)
            return a},
        },
        44: {
            title: "M4-4",
            description: "Multiply Super-cokecole generation speed based on total Mega Timewall.",
            unlocked(){return hasMilestone('co',2)},
            effect(){a=player.MT.total.add(1).log(10).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5e14)
            return a},
        },
        51: {
            title: "M5-1",
            description: "Multiply Point Producer Multiplier base effect based on MT-Challenge completion.",
            unlocked(){return hasMilestone('MT',4)},
            effect(){a=tmp.MT.totalcomp.pow(0.5).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1e16)
            return a},
        },
        52: {
            title: "M5-2",
            description: "Multiply Super Timewall gain based on MT-Challenge completion.",
            unlocked(){return hasMilestone('MT',4)},
            effect(){a=tmp.MT.totalcomp.add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(5e16)
            return a},
        },
        53: {
            title: "M5-3",
            description: "Multiply Super-cokecole generation speed based on MT-Challenge completion.",
            unlocked(){return hasMilestone('MT',4)},
            effect(){a=tmp.MT.totalcomp.div(10).add(1)
                return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1e17)
            return a},
        },
        54: {
            title: "M5-4",
            description: "Divide QqQe308 cost scaling based on MT-Challenge completion.",
            unlocked(){return hasMilestone('MT',4)},
            effect(){a=tmp.MT.totalcomp.add(10).log(10).pow(0.5)
                return a
            },
            effectDisplay(){return '/'+format(this.effect())},
            cost(){
                a=n(5e17)
            return a},
        },
    },
    challenges: {
        11: {
            name: "Stronger Softcap",
            challengeDescription() {return "Point softcap starts at 1 and becomes stronger.<br/>Completion: "+format(n(challengeCompletions(this.layer,this.id)))+'/Infinity'},
            goal(){
                a=n(10).pow(n(challengeCompletions(this.layer,this.id)).add(3))
                return a
            },
            goalDescription(){return format(this.goal())+" Points"},
            rewardDescription:"Multiply Point Producer base effect.",
            rewardEffect(){a=n(10).pow(challengeCompletions(this.layer,this.id))
                if(a.gte(1e20)) a=a.div(1e20).pow(0.5).times(1e20)
                if(a.gte(1e40)) a=a.div(1e40).pow(0.2).times(1e40)
                if(a.gte(1e100)) a=n(10).pow(a.log(10).div(100).pow(0.8).times(100))
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(this.goal())},
            completionLimit() {return new Decimal(1.79e308)},
            unlocked() {return getBuyableAmount('MT',11).gte(1)}
        },
        12: {
            name: "Less Resource",
            challengeDescription() {return "Timewall and Super Timewall gain is raised to ^0.5, and QqQe308 gain is halved.<br/>Completion: "+format(n(challengeCompletions(this.layer,this.id)))+'/Infinity'},
            goal(){
                a=n(10).pow(n(challengeCompletions(this.layer,this.id)).times(5).add(50))
                return a
            },
            goalDescription(){return format(this.goal())+" Points"},
            rewardDescription:"Multiply Mega Timewall gain.",
            rewardEffect(){a=n(2).pow(challengeCompletions(this.layer,this.id))
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(this.goal())},
            completionLimit() {return new Decimal(1.79e308)},
            unlocked() {return getBuyableAmount('MT',11).gte(2)}
        },
        13: {
            name: "No Side Layer",
            challengeDescription() {return "All of QqQe308 upgrades except Q1-4 is disabled, and you can't generate Super-QqQe308.<br/>Completion: "+format(n(challengeCompletions(this.layer,this.id)))+'/Infinity'},
            goal(){
                a=n(10).pow(n(challengeCompletions(this.layer,this.id)).times(5).add(120))
                return a
            },
            goalDescription(){return format(this.goal())+" Points"},
            rewardDescription:"Multiply Super-QqQe308 generation speed.",
            rewardEffect(){a=n(challengeCompletions(this.layer,this.id)).add(1)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(this.goal())},
            completionLimit() {return new Decimal(1.79e308)},
            unlocked() {return getBuyableAmount('MT',11).gte(3)}
        },
        14: {
            name: "The Simple Challenge",
            challengeDescription() {return "PPM, PEF and free buyables are disabled. You can't gain Timewall and QqQe308.<br/>Completion: "+format(n(challengeCompletions(this.layer,this.id)))+'/Infinity'},
            goal(){
                a=n(10).pow(n(challengeCompletions(this.layer,this.id)).times(3).add(30))
                return a
            },
            goalDescription(){return format(this.goal())+" Points"},
            rewardDescription:"Free Point Exponent Factory.",
            rewardEffect(){a=n(challengeCompletions(this.layer,this.id)).div(10).pow(0.5)
                return a
            },
            rewardDisplay(){return '+'+format(challengeEffect(this.layer, this.id))},
            canComplete: function() {return player.points.gte(this.goal())},
            completionLimit() {return new Decimal(1.79e308)},
            unlocked() {return getBuyableAmount('MT',11).gte(4)}
        },
    },
    buyables: {
        11: {
            title(){text = 'Unlock a MT-Challenge'
                text=text+'('+format(getBuyableAmount('MT', this.id))
                text=text+')'
                return text
            },
            cost(x) { let a=[n(1e160),n(1e180),n(1e200),n(1e220),n(1e310)]
                return a[x.toNumber()]
             },
            effect(x) {return x},
            display() {a= "Unlock a MT-Challenge per purchase.<br/>"
            a=a+"Requirement: "+format(this.cost())+' points'
            return a },
            unlocked() {return hasUpgrade('MT', 21)},
            canAfford() { return player.points.gte(this.cost())&&hasUpgrade('MT',21) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    milestones:{
        0: {
            requirementDescription: "1 MT-Challenge completion",
            effectDescription() {return "Multiply free Point Producer and Mega Timewall generation based on MT-Challenge completion.<br/>Currently: "+format(tmp.MT.mil0effect)+'x free PP, '+format(tmp.MT.mil0effect2)+'x MT generation'},
            done() { return tmp.MT.totalcomp.gte(1) },
        },
        1: {
            requirementDescription: "16 MT-Challenge completions",
            effectDescription() {return "Add 0.5 to the Point Producer Multiplier exponent."},
            done() { return tmp.MT.totalcomp.gte(16) },
        },
        2: {
            requirementDescription: "32 MT-Challenge completions",
            effectDescription() {return "Automatically complete ST-Challenge when unlocked and not in MT-Challenge."},
            done() { return tmp.MT.totalcomp.gte(32) },
            toggles:[["MT", "STCauto"]]
        },
        3: {
            requirementDescription: "64 MT-Challenge completions",
            effectDescription() {return "Unlock Super-cokecole (Super-QqQe308 should be unlocked at first)."},
            done() { return tmp.MT.totalcomp.gte(64) },
        },
        4: {
            requirementDescription: "128 MT-Challenge completions",
            effectDescription() {return "Give 1 free Point Exponent Factory, and unlock the 5th row of MT-Upgrade."},
            done() { return tmp.MT.totalcomp.gte(128) },
        },
    },
    resourcetip(){a="You get Mega Timewalls based on your Super-Timewall and effective Super-QqQe308 amount. The base MTw gain formula is: 0.01STw<sup>0.1</sup>SQqQ<sup>0.25</sup>"
        //if(tmp.T.getResetGain.gte(10)) a=a+'<br>The timewall gain will be softcapped after 10.'
        //if(getBuyableAmount('T',11).gte(400)) a=a+'<br>The Point Producer in the formula will be softcapped after 400.'
        return a
    },
    challengetip(){a="Unlike other challenges, ST-Challenge can be completed infinitely. You can gain completions automatically without exiting it."
        return a
    },
    totalcomp(){a=n(0)
        a=a.add(challengeCompletions('MT',11))
        a=a.add(challengeCompletions('MT',12))
        a=a.add(challengeCompletions('MT',13))
        a=a.add(challengeCompletions('MT',14))
        return a
    },
    mil0effect(){a=tmp.MT.totalcomp.add(1).pow(0.5)
        return a
    },
    mil0effect2(){a=tmp.MT.totalcomp.add(1)
        return a
    },
})

addLayer("co", {
    name: "cokecole", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Co", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#cce308",
    requires(){a = new Decimal(9)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "cokecole", // Name of prestige currency
    baseResource: "QqQeInfinity", // Name of resource prestige is based on
    baseAmount() {return player.Qi.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base(){return n(1.1)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    directMult() {mult = n(1)
        return mult
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c",
        description: "C: Reset for cokecole",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked(){return hasUpgrade('MT',24)}},
    ],
    layerShown(){return hasUpgrade('MT',24)||hasMilestone('I',2)},
    branches: ['MT'],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 4) {
    let kept = []
    if(hasUpgrade('I',34)) kept.push('milestones')
    layerDataReset(this.layer, kept)
       }
    },
    autoPrestige() {a = hasMilestone('I',2)&&player.I.Coauto
        return a
    },
    update(diff){
    },
    effect(){
        a = n(1e5).pow(player.co.points)
        a=a.pow(tmp.Qi.cokecoleeff)
            return a
      },
      effectDescription() { 
            a = " which multiplies your Point Producer base effect by "+format(tmp.co.effect)+'.'
        return a
    },
    resetsNothing() {return hasMilestone('Q',6)},
    canBuyMax(){return hasMilestone('Q',7)},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    milestones: {
        0: {
            requirementDescription: "1 cokecole",
            effectDescription: "Unlock an autobuyer for QqQeInfinity and QqQeInfinity resets nothing.",
            done() { return player.co.points.gte(1) },
            toggles:[["co", "Qiauto"]]
        },
        1: {
            requirementDescription: "2 cokecole",
            effectDescription: "Unlock an autobuyer for ST-Upgrade, and gain 50% of Super Timewall on reset every second.",
            done() { return player.co.points.gte(2) },
            unlocked(){return hasMilestone('co',0)},
            toggles:[["co", "STupgauto"]]
        },
        2: {
            requirementDescription: "3 cokecole",
            effectDescription: "Unlock the 4th row of MT-Upgrade.",
            done() { return player.co.points.gte(3) },
            unlocked(){return hasMilestone('co',1)},
        },
    },
})

addLayer("I", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        inf: n(0),
        ipower: n(1),
        id1: n(0),
        id2: n(0),
        id3: n(0),
        id4: n(0),
        id5: n(0),
        id6: n(0),
        id7: n(0),
        id8: n(0),
        best:n(0),
        total:n(0),
        resetTime: 0,
        bestTime:n(1e300),
    }},
    color: "#b67f33",
    requires(){a = n(2).pow(1024)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "Infinity Points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {a=n(10).log(2).div(1024).toNumber()
        return a
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.I.NCtoIP)
        mult = mult.times(buyableEffect('I',11))
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
        if(hasUpgrade('I',43)) {player.I.points = player.I.points.add(n(upgradeEffect('I',43)).times(0.1).div(player.I.bestTime).times(diff))
            player.I.total = player.I.total.add(n(upgradeEffect('I',43)).times(0.1).div(player.I.bestTime).times(diff))
        }
        if(player.I.inf.gte(1)) player.I.challenges[11] = 1
        if((inChallenge('MT',11)||inChallenge('MT',12)||inChallenge('MT',13)||inChallenge('MT',14))&&player.points.gte(n(2).pow(1024))) player.I.challenges[16] = 1
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
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 5) {
            let kept = []
            layerDataReset(this.layer, kept)
    }
    },
    autoUpgrade() {return false},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    onPrestige(gain){
        if(player.I.inf.gte(1)&&n(player.I.resetTime).lt(player.I.bestTime)) player.I.bestTime = n(player.I.resetTime)
        player.I.inf = player.I.inf.add(1)
    },
    tabFormat: {
   "Upgrades": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.I.IUtip],
    ["upgrades",[1,2,3,4]],["buyables",[1]]
    ],
    },
    "Normal Challenges": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.I.NCtip],
            ["challenges",[1]],
    ],
    unlocked(){return player.I.inf.gte(1)},
    },
    "Automation": {
        content: [ "main-display","prestige-button","resource-display","milestones",
    ],
    unlocked(){return hasUpgrade('I',14)},
    },
    "Breaking Infinity": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.I.BItip],
            ["upgrades",[5]]
    ],
    unlocked(){return player.I.upgrades.length>=16&&tmp.I.NCcomp.gte(6)},
    },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 5) {
    let kept = []
    layerDataReset(this.layer, kept)
       }
    },
    upgrades: {
        11: {
            title: "I1-1",
            description: "Multiply Point Producer base effect based on times played.",
            effect() {
                return n(player.timePlayed).add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(0.5),
            unlocked() {return true},
        },
        21: {
            title: "I2-1",
            description: "Multiply Point Producer Multiplier base effect based on Infinities.",
            effect() {
                return n(player.I.inf).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',11)},
        },
        31: {
            title: "I3-1",
            description: "Multiply Timewall and Super Timewall gain based on Infinities.",
            effect() {
                return n(player.I.inf).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',21)},
        },
        41: {
            title: "I4-1",
            description: "Multiply Mega Timewall gain based on Infinities.",
            effect() {
                return n(player.I.inf).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',31)},
        },
        
        12: {
            title: "I1-2",
            description: "Point Producer Multiplier cost scaling 5x -> 4.5x",
            cost: new Decimal(0.5),
            unlocked() {return true},
        },
        22: {
            title: "I2-2",
            description: "Divide QqQe308 requirement based on Infinities.",
            effect() {
                return n(player.I.inf).add(1)
            },
            effectDisplay() { return '/'+format(upgradeEffect(this.layer, this.id)) },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',12)},
        },
        32: {
            title: "I3-2",
            description: "Multiply Super-QqQe308 generation speed based on Infinities.",
            effect() {
                return n(player.I.inf).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',22)},
        },
        42: {
            title: "I4-2",
            description: "Multiply Super-cokecole generation speed based on Infinities.",
            effect() {
                return n(player.I.inf).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',32)},
        },
        13: {
            title: "I1-3",
            description: "Multiply Point Producer base effect based on times in this Infinity.",
            effect() {
                return n(player.I.resetTime).add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1),
            unlocked() {return true},
        },
        23: {
            title: "I2-3",
            description: "Multiply Point Producer base effect based on total Infinity Points.",
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
            description: "Add 0.5 to the Point Producer Multiplier exponent.",
            cost: new Decimal(10),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',23)},
        },
        43: {
            title: "I4-3",
            description: "Generate Infinity Points based on your IP multiplier and your fastest Infinity.",
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
            description: "Unlock autobuyers for row 1 layers, keep milestones in row 1 layers, and gain 50% more Timewall on reset every second.",
            cost: new Decimal(5),
            unlocked() {return true},
        },
        24: {
            title: "I2-4",
            description: "Unlock autobuyers for row 2 layers, keep milestones in row 2 layers, and gain 50% more Super-Timewall on reset every second.",
            cost: new Decimal(15),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',14)},
        },
        34: {
            title: "I3-4",
            description: "Unlock autobuyers for row 3 layers, keep milestones in row 3 layers, and gain 1% more Mega-Timewall on reset every second.",
            cost: new Decimal(30),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',24)},
        },
        44: {
            title: "I4-4",
            description: "Unlock autobuyers for MT-Challenge.",
            cost: new Decimal(50),
            unlocked() {return true},
            canAfford(){return hasUpgrade('I',34)},
        },
        51: {
            title: "Break Infinity",
            description: "Your points can go above 1.80e308, but it will be harder to get more points. Also delay the point softcap start by 1.34e154 and nerf it.",
            cost: new Decimal(308),
            unlocked() {return player.I.upgrades.length>=16&&tmp.I.NCcomp.gte(6)},
            canAfford(){return player.I.upgrades.length>=16&&tmp.I.NCcomp.gte(6)},
        },
    },
    challenges: {
        11: {
            name: "Normal Challenge 1",
            challengeDescription: "Infinity for the first time.",
            goalDescription:"Reach Infinity.",
            rewardDescription:"Point boosts Point Producer bast effect.",
            rewardEffect(){a=player.points.max(1).pow(0.01)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)}
        },
        12: {
            name: "Normal Challenge 2",
            challengeDescription() {a="Point Producer base effect is heavily reduced, but gets an exponentially increasing multiplier, capped at 1e100. This multiplier resets after every reset."
                a=a+'<br/>Currently: '+format(tmp.I.NC2eff)+'x'
                return a
            },
            goalDescription:"Reach Infinity.",
            rewardDescription:"Point Producer base effect is multiplied by "+format(1000)+", but reduces based on time in this Infinity.",
            rewardEffect(){a=n(1000).sub(n(player.I.resetTime).times(0.1)).max(1)
                return a
            },
            rewardDisplay(){return format(challengeEffect(this.layer, this.id))+'x'},
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)}
        },
        13: {
            name: "Normal Challenge 3",
            challengeDescription: "Point Producer Multiplier exponent is divided by 2.",
            goalDescription:"Reach Infinity.",
            rewardDescription:"Point Producer Multiplier base effect is multiplied by 10.",
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)}
        },
        14: {
            name: "Normal Challenge 4",
            challengeDescription() {a="Bought and free PEF is useless, but its effect is based on total Super-Timewall and Mega-Timewall, capped at 1.50."
                return a
            },
            goalDescription:"Reach Infinity.",
            rewardDescription:"Multiply Point Exponent Factory base effect by 1.2.",
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)}
        },
        15: {
            name: "Normal Challenge 5",
            challengeDescription: "Free buyables are disabled. When you buy a T-buyable, you must pay 1/3 of it in taxes.",
            //The former effect is "You can't gain QqQe308, QqQeInfinity and cokecole"
            //99%->90%->75%->50%->1/3
            goalDescription:"Reach Infinity.",
            rewardDescription:"Divide QqQe308 cost scaling based on effective Super-QqQe308.",
            rewardEffect(){a=tmp.Qi.effQqQe308.add(1).pow(0.02)
                return a
            },
            rewardDisplay(){return '/'+format(challengeEffect(this.layer, this.id))},
            canComplete: function() {return player.points.gte(n(2).pow(1024))},
            unlocked() {return player.I.inf.gte(1)}
        },
        16: {
            name: "Normal Challenge 6",
            challengeDescription: "Push yourself in any MT-Challenge in normal Infinity to complete it. You don't need to enter this challenge.",
            goalDescription:"Reach 1.80e308 points in any MT-Challenge in normal Infinity.",
            rewardDescription:"M1-2 and M1-3's effect is powered to ^4.",
            canComplete: function() {return false},
            unlocked() {return player.I.inf.gte(1)}
        },
    },
    milestones:{
        0: {
            requirementDescription: "Buy Upgrade I1-4",
            effectDescription() {return "Unlock Autobuyers for T-Upgrades, T-Buyables(exclude Timewall Doubler), T-Challenges, QqQe308 reset and Q-Upgrades, keep 25 points on reset, and always show Q layer."},
            done() { return hasUpgrade('I',14) },
            toggles:[["I", "TUauto"],["I", "TBauto"],["I", "TCauto"],["I", "QqQauto"],["I", "QUauto"]]
        },
        1: {
            requirementDescription: "Buy Upgrade I2-4",
            effectDescription() {return "Unlock Autobuyers for ST-Upgrades, Timewall Doubler, ST-Challenges(even in MT-Challenge), QqQeInfinity reset, always show Qi layer, and unlock a new Q-Milestone."},
            done() { return hasUpgrade('I',24) },
            toggles:[["I", "STUauto"],["I", "TDauto"],["I", "STCauto"],["I", "Qiauto"]]
        },
        2: {
            requirementDescription: "Buy Upgrade I3-4",
            effectDescription() {return "Unlock Autobuyers for MT-Upgrades, MT-Challenge buyable and cokecole reset, always show Co layer, unlock 2 new Q-Milestones, and you can always reset for Mega Timewall manually."},
            done() { return hasUpgrade('I',34) },
            toggles:[["I", "MTUauto"],["I", "MTCUauto"],["I", "Coauto"]]
        },
        3: {
            requirementDescription: "Buy Upgrade I4-4",
            effectDescription() {return "Automatically gain MT-Challenge 1~4 completions based on your points(^0.5 for MT-Challenge 1 and 4)"},
            done() { return hasUpgrade('I',44) },
            toggles:[["I", "MTC1auto"],["I", "MTC2auto"],["I", "MTC3auto"],["I", "MTC4auto"]]
        },
    },
    buyables: {
        11: {
            title(){text = 'IP Doubler'
                text=text+'('+format(getBuyableAmount('I', this.id))
                //if(tmp.T.freeTD.neq(0))text=text+' + '+format(tmp.T.freeTD)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(10).pow(x.add(1)) },
            effect(x) {a=tmp.I.IPDbase.pow(x)
                //if(a.gte(1024)) a=n(2).pow(a.log(2).div(10).pow(0.5).times(10))
                    return a
            },
            display() { a="Multiply IP gain by "+format(tmp.I.IPDbase)+" <br/>Effect:"+format(this.effect())+'x'
                //if(buyableEffect(this.layer,this.id).gt(1024)) a=a+'(softcapped)'
                a=a+"<br/>Cost: "+format(this.cost())+' Infinity Points'
            return a},
            unlocked() {return player.I.upgrades.length >= 16},
            canAfford() { return player.I.points.gte(this.cost()) },
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
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
    },
    IUtip(){a='You have gone Infinity '+format(player.I.inf)+' times.<br/>'
        a=a+'You have spent '+formatTime(player.I.resetTime)+' in this Infinity.<br/>'
        a=a+'Your best Infinity time is '+formatTime(player.I.bestTime)+'.<br/>'
        a=a+'Upgrade order: Ix-y -> I(x+1)-y<br/>buying 16 I-Upgrades will give you a "IP Doubler" buyable.'
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
        return a
    },
    NC2eff(){a=n(0.01).times(n(1.01).pow(player.T.resetTime)).min(1e100)
        return a
    },
    IPDbase(){a=n(2)
        return a
    },
    BItip(){a='You have gone Infinity '+format(player.I.inf)+' times.<br/>'
        a=a+'You have spent '+formatTime(player.I.resetTime)+' in this Infinity.<br/>'
        a=a+'Your best Infinity time is '+formatTime(player.I.bestTime)+'.<br/>'
        a=a+'When you break Infinity, there will be more upgrades.'
        return a
    },
})