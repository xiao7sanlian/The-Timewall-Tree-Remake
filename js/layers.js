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
    effectDescription(){return ' and there are 20 in total.'},
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
        if(!hasAchievement('A',11)) a=a+layers.A.achievements[11].name()+': '+layers.A.achievements[11].tooltip()+'<br>'
        if(!hasAchievement('A',12)) a=a+layers.A.achievements[12].name()+': '+layers.A.achievements[12].tooltip()+'<br>'
        if(!hasAchievement('A',13)) a=a+layers.A.achievements[13].name()+': '+layers.A.achievements[13].tooltip()+'<br>'
        if(!hasAchievement('A',14)&&player.A.points.gte(1)) a=a+layers.A.achievements[14].name()+': '+layers.A.achievements[14].tooltip()+'<br>'
        if(!hasAchievement('A',15)&&player.A.points.gte(2)) a=a+layers.A.achievements[15].name()+': '+layers.A.achievements[15].tooltip()+'<br>'
        if(!hasAchievement('A',21)&&player.A.points.gte(3)) a=a+layers.A.achievements[21].name()+': '+layers.A.achievements[21].tooltip()+'<br>'
        if(!hasAchievement('A',22)&&player.A.points.gte(4)) a=a+layers.A.achievements[22].name()+': '+layers.A.achievements[22].tooltip()+'<br>'
        if(!hasAchievement('A',23)&&player.A.points.gte(5)) a=a+layers.A.achievements[23].name()+': '+layers.A.achievements[23].tooltip()+'<br>'
        if(!hasAchievement('A',24)&&player.A.points.gte(6)) a=a+layers.A.achievements[24].name()+': '+layers.A.achievements[24].tooltip()+'<br>'
        if(!hasAchievement('A',25)&&player.A.points.gte(7)) a=a+layers.A.achievements[25].name()+': '+layers.A.achievements[25].tooltip()+'<br>'
        if(!hasAchievement('A',31)&&player.A.points.gte(8)) a=a+layers.A.achievements[31].name()+': '+layers.A.achievements[31].tooltip()+'<br>'
        if(!hasAchievement('A',32)&&player.A.points.gte(9)) a=a+layers.A.achievements[32].name()+': '+layers.A.achievements[32].tooltip()+'<br>'
        if(!hasAchievement('A',33)&&player.A.points.gte(10)) a=a+layers.A.achievements[33].name()+': '+layers.A.achievements[33].tooltip()+'<br>'
        if(!hasAchievement('A',34)&&player.A.points.gte(11)) a=a+layers.A.achievements[34].name()+': '+layers.A.achievements[34].tooltip()+'<br>'
        if(!hasAchievement('A',35)&&player.A.points.gte(12)) a=a+layers.A.achievements[35].name()+': '+layers.A.achievements[35].tooltip()+'<br>'
        if(!hasAchievement('A',41)&&player.A.points.gte(13)) a=a+layers.A.achievements[41].name()+': '+layers.A.achievements[41].tooltip()+'<br>'
        if(!hasAchievement('A',42)&&player.A.points.gte(14)) a=a+layers.A.achievements[42].name()+': '+layers.A.achievements[42].tooltip()+'<br>'
        if(!hasAchievement('A',43)&&player.A.points.gte(15)) a=a+layers.A.achievements[43].name()+': '+layers.A.achievements[43].tooltip()+'<br>'
        if(!hasAchievement('A',44)&&player.A.points.gte(16)) a=a+layers.A.achievements[44].name()+': '+layers.A.achievements[44].tooltip()+'<br>'
        if(!hasAchievement('A',45)&&player.A.points.gte(17)) a=a+layers.A.achievements[45].name()+': '+layers.A.achievements[45].tooltip()+'<br>'
        return a
    },
    ProgressToInf(){a=player.points.max(1).log(10).div(n(2).pow(1024).log(10)).min(1).times(100)
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
        exp=n(0.5)
        if(hasUpgrade('ST',32)) exp=exp.add(0.05)
        if(d.gt(10))d=d.div(10).pow(exp).times(10)
        if(inChallenge('ST',14)) d=n(0)
            return d
    },
    canReset(){return tmp.T.getResetGain.gte(1)},
    hotkeys: [
        {key: "1",
        description: "1: Buy a Point Producer",
        onPress(){if (layers.T.buyables[11].canAfford()) layers.T.buyables[11].buy()},
        unlocked() {return hasUpgrade('T',11)&&!player.T.PPauto}},
        {key: "2",
        description: "2: Buy a Point Producer Multiplier",
        onPress(){if (layers.T.buyables[12].canAfford()) layers.T.buyables[12].buy()},
        unlocked() {return hasUpgrade('T',11)&&!player.T.PPMauto}},
        {key: "3",
        description: "3: Buy a Point Exponent Factory",
        onPress(){if (layers.T.buyables[13].canAfford()) layers.T.buyables[13].buy()},
        unlocked() {return hasUpgrade('T',11)&&!player.T.PEFauto}},
        {key: "t",
        description: "T: Reset for Timewall",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return hasUpgrade('T',11)}},
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
        if (layers[resettingLayer].row = 2) {
    let kept = []
    if(hasUpgrade('ST',21)) kept.push('milestones')
    if(hasUpgrade('ST',22)) kept.push('upgrades')
    if(hasUpgrade('ST',22)) kept.push('challenges')
    layerDataReset(this.layer, kept)
       }
    },
    update(diff){
        player.devSpeed = tmp.A.devSpeedCal
        //player.points=player.points.min('e1.79e308')
        if(!hasMilestone('Q',1)){
        if(hasMilestone('T',0)&&player.T.PPauto==true&&layers.T.buyables[11].canAfford()) layers.T.buyables[11].buy()
        if(hasMilestone('T',0)&&player.T.PPMauto==true&&layers.T.buyables[12].canAfford()) layers.T.buyables[12].buy()
        if(hasMilestone('T',0)&&player.T.PEFauto==true&&layers.T.buyables[13].canAfford()) layers.T.buyables[13].buy()}
        if(hasMilestone('Q',1)){
        if(hasMilestone('T',0)&&player.T.PPauto==true&&layers.T.buyables[11].canAfford()) layers.T.buyables[11].buyMax()
        if(hasMilestone('T',0)&&player.T.PPMauto==true&&layers.T.buyables[12].canAfford()) layers.T.buyables[12].buyMax()
        if(hasMilestone('T',0)&&player.T.PEFauto==true&&layers.T.buyables[13].canAfford()) layers.T.buyables[13].buyMax()}
        if(hasMilestone('ST',1)&&player.ST.TDauto==true&&layers.T.buyables[14].canAfford()&&!hasMilestone('Q',4)) layers.T.buyables[14].buy()
        if(hasMilestone('ST',1)&&player.ST.TDauto==true&&layers.T.buyables[14].canAfford()&&hasMilestone('Q',4)) layers.T.buyables[14].buyMax()
        if(hasUpgrade('T',33)) player.points = player.points.max(25)
    },
    passiveGeneration()
    {
        mult = new Decimal(0)
        if(hasUpgrade('ST',24)) mult=mult.add(0.5)
        return mult
    },
    autoUpgrade() { return false},
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
                if(hasUpgrade('Q',11)) b=b.add(0.25)
                if(a.gte(10))a=a.div(10).pow(b).times(10)
                if(a.gte('1e10000')) a=n('1e10000')
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
            cost(){
                a=n(1)
            return a},
            tooltip(){return "Softcap start: 10x<br>hardcap: 1e10000x"},
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
            },
        },
    },
    buyables: {
        11: {
            title(){text = 'Point Producer'
                text=text+'('+format(getBuyableAmount('T', this.id))
                if(tmp.T.freePP.gt(0))text=text+' + '+format(tmp.T.freePP)
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(1.15).pow(x).times(25)
                if(hasUpgrade('T',41))a= new Decimal(1.1).pow(x).times(25)
                    return a
             },
            effect(x) {return x.add(tmp.T.freePP).times(tmp.T.PPmult)},
            display() {a= "Produce "+format(tmp.T.PPmult)+" Points Per Second<br/>Effect:produces "+format(this.effect())
                if(buyableEffect('T',13).neq(1)) a=a+'^'+format(buyableEffect('T',13))+'='+format(getPointGen())
                a=a+" points/s<br/>Cost: "+format(this.cost())+' points'
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
                if(tmp.T.freePPM.gt(0))text=text+' + '+format(tmp.T.freePPM)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(5).pow(x).times(500) },
            effect(x) {a= x.add(tmp.T.freePPM).times(tmp.T.PPMbase)
                if(inChallenge('T',12)) a=n(0)
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
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        13: {
            title(){text = 'Point Exponent Factory'
                text=text+'('+format(getBuyableAmount('T', this.id))+')'
                return text
            },
            cost(x) { return new Decimal(20).pow(x.pow(2)).times(2e5) },
            effect(x) {a=x.times(tmp.T.PEFbase).add(1)
                if(inChallenge('T',11)) a=a.times(0.75)
                if(inChallenge('ST',11)) a=a.times(0.5)
                if(inChallenge('ST',13)) a=n(1)
                    return a
            },
            display() { return "Add "+format(tmp.T.PEFbase)+" to Point Producer Effect Exponent<br/>Effect:^"+format(this.effect())+"<br/>Cost: "+format(this.cost())+' points' },
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
                if(tmp.T.freeTD.gt(0))text=text+' + '+format(tmp.T.freeTD)
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
        if(hasUpgrade('Q',12)) a=a.times(upgradeEffect('Q',12))
        if(hasUpgrade('Q',13)) a=a.times(upgradeEffect('Q',13))
        if(hasUpgrade('ST',12)) a=a.times(upgradeEffect('ST',12))
        if(hasUpgrade('ST',14)) a=a.times(upgradeEffect('ST',14))
        if(hasUpgrade('Q',21)) a=a.times(upgradeEffect('Q',21))
        if(hasUpgrade('ST',31)) a=a.times(upgradeEffect('ST',31))
        if(hasUpgrade('Q',24)) a=a.times(upgradeEffect('Q',24))
        if(hasChallenge('ST',11)) a=a.times(challengeEffect('ST',11))
        return a
    },
    PPMbase(){a=n(1)
        if(hasUpgrade('T',24)) a=a.times(upgradeEffect('T',24))
        if(hasUpgrade('ST',13)) a=a.times(upgradeEffect('ST',13))
        if(hasMilestone('Qi',0)) a=a.times(10)
        return a
    },
    PPMexp(){a=n(1)
        if(hasUpgrade('T',23)) a=n(1.5)
        if(hasUpgrade('ST',21)) a=a.add(0.5)
        return a
    },
    PEFbase(){a=n(0.01)
        if(hasUpgrade('T',42)) a=a.times(2)
        if(hasUpgrade('ST',34)) a=a.times(1.5)
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
        return a
    },
    freePPM(){a=n(0)
        if(hasUpgrade('T',43)) a=a.add(upgradeEffect('T',43))
        if(hasUpgrade('ST',42)) a=a.times(upgradeEffect('ST',42))
        if(hasChallenge('ST',13)) a=a.times(challengeEffect('ST',13))
        return a
    },
    freeTD(){a=n(0)
        if(hasUpgrade('ST',33)) a=a.add(upgradeEffect('ST',33))
        return a
    }
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
        if(inChallenge('ST',12)) a=n(Infinity)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "QqQe308", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return 2}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.div(tmp.Qi.QqQe308eff)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    directMult() {mult = n(1)
        return mult
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q",
        description: "Q: Reset for QqQe308",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return hasUpgrade('T',31)&&!player.ST.QqQauto}},
    ],
    autoPrestige() {a = player.ST.QqQauto&&hasMilestone('ST',0)
        return a
    },
    canBuyMax() {a = hasMilestone('Q',3)
        return a
    },
    resetsNothing() {return hasMilestone('Q',2)},
    layerShown(){return hasUpgrade('T',31)||hasMilestone('ST',0)},
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
        if (layers[resettingLayer].row = 2) {
    let kept = []
    if(hasUpgrade('ST',23)) kept.push('milestones')
    if(hasUpgrade('ST',23)) kept.push('upgrades')
    layerDataReset(this.layer, kept)
       }
    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
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
            effectDescription: "Autobuyers of Timewall Doubler now buy max.",
            unlocked(){return hasMilestone('Q',3)},
            done() { return player.Q.points.gte(15) }
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
        if (layers[resettingLayer].row > layers[this.layer].row) {
    let kept = []
    layerDataReset(this.layer, kept)
       }
    },
    autoUpgrade() {return false},
    passiveGeneration()
    {
        mult = n(0)
        return mult
    },
    branches: ['T','Q'],
    update(diff){
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
                if(hasUpgrade('Q',22)) a=a.pow(2)
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
            description: "Unlock next layer.<br/>You have reached the current endgame!",
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
        unlocked(){return hasUpgrade('ST',34)}},
    ],
    layerShown(){return hasUpgrade('ST',34)},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = []
            layerDataReset(this.layer, kept)
    }
    },
    autoPrestige() {a = false
        return a
    },
    resetsNothing() {return false},
    update(diff){
        if(getClickableState(this.layer, 11)==1) player.Qi.QqQe308 = player.Qi.QqQe308.add(tmp.Qi.QqQe308speed.times(diff))
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
            canClick() {return hasMilestone('Qi', 0)},
            onClick() {setClickableState(this.layer, this.id, 1-getClickableState(this.layer, this.id))},
        },
    },
    Showdetail() {a=''
        if(hasMilestone('Qi',0)) {a = "You have made <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.QqQe308) + "</h3> Super-QqQe308.<br/>"
        a=a+"Your effective Super-QqQe308 is <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>" + format(tmp.Qi.effQqQe308) + "</h3>"
        if(tmp.Qi.effQqQe308.gte(2000)) a=a+'(softcapped)'
        a=a+", dividing the requirement of QqQe308 by <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'> "+format(tmp.Qi.QqQe308eff)+"</h3>.<br>" 
        a=a+"Based your QqQeInfinity amount，your QqQeInfinity makes <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.QqQe308speed) +"</h3> Super-QqQe308 per second,"
        a=a+"which means making one Super-QqQe308 per <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.QqQe308speed))+"</h3> seconds.<br/>"}
        return a
    },
    maxActive(){a=n(1)
        return a
    },
    currentActive(){a=n(0)
        a=a.add(n(getClickableState('Qi',11)))
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
        return a
    },
    QqQe308eff(){a=n(10).pow(tmp.Qi.effQqQe308.pow(0.5))
        return a
    },
})