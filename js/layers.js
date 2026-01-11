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
    },
    effectDescription(){return ' and there are 10 in total.'},
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
        resetTime:n(0),
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
    prestigeButtonText(){return 'Reset for '+format(tmp.T.getResetGain)+' Timewalls' },
    getResetGain(){x=getBuyableAmount('T',11)
        if(x.gte(400)) x=x.div(400).pow(0.5).times(400)
        a=n(1.1).pow(x.sub(50))
        b=n(1.5).pow(getBuyableAmount('T',12).sub(5))
        c=n(2).pow(getBuyableAmount('T',13).pow(1.5).sub(1))
        if(a.lt(1))a=n(0)
        if(b.lt(1))b=n(0)
        if(c.lt(1))c=n(0)
            d=a.times(b).times(c)
        if(d.gt(10))d=d.div(10).pow(0.5).times(10)
            return d
    },
    canReset(){return tmp.T.getResetGain.gte(1)},
    hotkeys: [
        {key: "1",
        description: "1: Buy a Point Producer",
        onPress(){if (layers.T.buyables[11].canAfford()) layers.T.buyables[11].buy()},
        unlocked() {return hasUpgrade('T',11)}},
        {key: "2",
        description: "2: Buy a Point Producer Multiplier",
        onPress(){if (layers.T.buyables[12].canAfford()) layers.T.buyables[12].buy()},
        unlocked() {return hasUpgrade('T',11)}},
        {key: "3",
        description: "3: Buy a Point Exponent Factory",
        onPress(){if (layers.T.buyables[13].canAfford()) layers.T.buyables[13].buy()},
        unlocked() {return hasUpgrade('T',11)}},
        {key: "t",
        description: "T: Do a Timewall Reset",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return hasUpgrade('T',11)}},
    ],
    layerShown(){return true},
    tabFormat: {
   "Upgrades": {
        content: [ "main-display",
    "prestige-button",
    "resource-display",
    ["display-text", () => tmp.T.resourcetip
                    ],
    "clickables","buyables",
    "upgrades",
    ],
    },
    "Automation": {
        content: [ "main-display",
    "prestige-button",
    "resource-display",
    "milestones",
    ],
    unlocked(){return hasUpgrade('T',31)},
    },
    "Challenges": {
        content: [ "main-display",
    "prestige-button",
    "resource-display",
    "challenges",
    ],
    unlocked(){return hasUpgrade('T',34)},
    },
    },
    doReset(resettingLayer) {
        setBuyableAmount('T',11,n(0))
        setBuyableAmount('T',12,n(0))
        setBuyableAmount('T',13,n(0))
        if (layers[resettingLayer].row > layers[this.layer].row) {
    let kept = []
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
        if(hasUpgrade('T',33)) player.points = player.points.max(25)
    },
    passiveGeneration()
    {
        mult = new Decimal(0)
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
            description: "Multiply Point Producer base effect based on total timewall.",
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
            description: "Unlock next layer.<br>You have reached the current endgame!",
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
                if(tmp.T.freePP.gt(0))text=text+'+'+format(tmp.T.freePP)
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
                if(tmp.T.freePPM.gt(0))text=text+'+'+format(tmp.T.freePPM)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(5).pow(x).times(500) },
            effect(x) {return x.add(tmp.T.freePPM).times(tmp.T.PPMbase)},
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
    },
    milestones:{
        0: {
            requirementDescription: "Buy Upgrade T3-1",
            effectDescription() {return "Unlock Autobuyers of 3 buyables."},
            done() { return hasUpgrade('T',31) },
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
    },
    PPmult(){a=n(1)
        a=a.times(buyableEffect('T',12).pow(tmp.T.PPMexp).add(1))
        if(hasUpgrade('T',21)) a=a.times(upgradeEffect('T',21))
        if(hasUpgrade('T',22)) a=a.times(upgradeEffect('T',22))
        if(hasUpgrade('Q',12)) a=a.times(upgradeEffect('Q',12))
        if(hasUpgrade('Q',13)) a=a.times(upgradeEffect('Q',13))
        return a
    },
    PPMbase(){a=n(1)
        if(hasUpgrade('T',24)) a=a.times(upgradeEffect('T',24))
        return a
    },
    PPMexp(){a=n(1)
        if(hasUpgrade('T',23)) a=n(1.5)
        return a
    },
    PEFbase(){a=n(0.01)
        if(hasUpgrade('T',42)) a=a.times(2)
        return a
    },
    resourcetip(){a="You get timewalls based on you buyable amount. The base Tw gain formula is: 1.1^(PP-50)x1.5^(PPM-5)x2^(PEF^1.5-1)"
        if(tmp.T.getResetGain.gte(10)) a=a+'<br>The timewall gain will be softcapped after 10.'
        if(getBuyableAmount('T',11).gte(400)) a=a+'<br>The Point Producer in the formula will be softcapped after 400.'
        return a
    },
    freePP(){a=n(0)
        if(hasUpgrade('T',32)) a=a.add(upgradeEffect('T',32))
            return a
    },
    freePPM(){a=n(0)
        if(hasUpgrade('T',43)) a=a.add(upgradeEffect('T',43))
            return a
    },
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
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "QqQe308", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q",
        description: "Q: Do a QqQe308 reset",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return hasUpgrade('T',31)}},
    ],
    autoPrestige() {a = false
        return a
    },
    canBuyMax() {a = false
        return a
    },
    resetsNothing() {return false},
    layerShown(){return hasUpgrade('T',31)},
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
    content: [ "main-display",
    "prestige-button",
    "resource-display",
    "upgrades",
    ],
    unlocked(){return hasMilestone('Q',0)},
    },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
    let kept = []
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
            effectDescription: "Autobuyers of 3 buyables now buy max.",
            done() { return player.Q.points.gte(3) }
        },
    },
    upgrades: {
        11: {
            title: "Q1-1",
            description: "Nerf the softcap of T2-1.",
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
    },
})