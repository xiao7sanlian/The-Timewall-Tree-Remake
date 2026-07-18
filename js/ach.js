addLayer("A", {
    name: "Achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ach: new Decimal(0),
        Speedmult: new Decimal(1),
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
       player.A.Speedmult = player.A.Speedmult.min(64).max(1)
        if(player.A.speed1==true) dev=dev.add(1)
        if(player.A.speed2==true) dev=dev.add(2)
        if(player.A.speed3==true) dev=dev.add(4)
        if(player.A.speed4==true) dev=dev.add(8)
        if(getClickableState('A',11)==1) dev=dev.times(player.A.Speedmult)
        if(player.T.pause.gte(1))dev=n(0)
	    return dev
	   },
      update(diff){
         if(getClickableState('A',11)==1&&player.devSpeed.gte(1)) player.offlineTime = player.offlineTime.sub(player.A.Speedmult.sub(1).times(diff).div(player.devSpeed)).max(0)
         if(player.devSpeed.eq(0)) player.offlineTime = player.offlineTime.add(player.Dif)
      },
       doReset(resettingLayer) {
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
        "Achievements":{
        content: [ "main-display",
        "achievements",
    //["display-text", () => tmp.A.tips],
    ],},
    "Speed-up":{
        content: [ "main-display",
        "milestones",["display-text", () => tmp.A.offTimetext],["text-input", "Speedmult"],'clickables',
    ],},
    },
    effectDescription(){return ' and there are 100 in total.'},
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
     name(){return "Break Limit"},
     done() {return hasUpgrade('I',51)}, 
     unlocked(){return player.A.points.gte(40)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Break Infinity."}, 
     textStyle: {'color': '#ffe125'},
        },
        92: {
     name(){return "QqQe30800?"},
     done() {return player.Q.points.gte(100)}, 
     unlocked(){return player.A.points.gte(40)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 100 QqQe308."}, 
     textStyle: {'color': '#ffe125'},
        },
        93: {
     name(){return "New Beginning!"},
     done() {return player.I.ipower.gt(1)}, 
     unlocked(){return player.A.points.gte(40)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Start Generating Infinity Power."}, 
     textStyle: {'color': '#ffe125'},
        },
        94: {
     name(){return "Point Inflation"},
     done() {return player.points.gt('1e1500')}, 
     unlocked(){return player.A.points.gte(40)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 1e1500 points."}, 
     textStyle: {'color': '#ffe125'},
        },
        95: {
     name(){return "Blink of an eye"},
     done() {return player.I.bestTime.lte(0.25)}, 
     unlocked(){return player.A.points.gte(40)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Infinity in under 250 ms."}, 
     textStyle: {'color': '#ffe125'},
        },
        101: {
     name(){return "Infinity Challenging"},
     done() {return tmp.I.ICcomp.gte(1)}, 
     unlocked(){return player.A.points.gte(45)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete an Infinity Challenge."}, 
     textStyle: {'color': '#ffe125'},
        },
        102: {
     name(){return "Infinity Timewall"},
     done() {return player.T.points.gte(n(2).pow(1024))}, 
     unlocked(){return player.A.points.gte(45)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 1.80e308 Timewall."}, 
     textStyle: {'color': '#ffe125'},
        },
        103: {
     name(){return "A Strong Wall"},
     done() {return tmp.Qi.effqaqe308.gte(10)}, 
     unlocked(){return player.A.points.gte(45)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 10 effective Super-qaqe308."}, 
     textStyle: {'color': '#ffe125'},
        },
        104: {
     name(){return "Squared Points"},
     done() {return buyableEffect('T',13).gte(2)}, 
     unlocked(){return player.A.points.gte(45)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Make your PEF effect more than 2."}, 
     textStyle: {'color': '#ffe125'},
        },
        105: {
     name(){return "Is this enough?"},
     done() {return player.qa.points.gte(7)}, 
     unlocked(){return player.A.points.gte(45)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 7 qaqe308."}, 
     textStyle: {'color': '#ffe125'},
        },
        111: {
     name(){return "It took about 1 hour"},
     done() {return hasChallenge('I',24)}, 
     unlocked(){return player.A.points.gte(50)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete Infinity Challenge 4."}, 
     textStyle: {'color': '#ffe125'},
        },
        112: {
     name(){return "Another Remarkable Progress"},
     done() {return tmp.A.ProgressToEtr.gte(10)}, 
     unlocked(){return player.A.points.gte(50)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 10% progress to Eternity."}, 
     textStyle: {'color': '#ffe125'},
        },
        113: {
     name(){return "Infinity is now useful"},
     done() {return hasChallenge('I',25)}, 
     unlocked(){return player.A.points.gte(50)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete Infinity Challenge 5."}, 
     textStyle: {'color': '#ffe125'},
        },
        114: {
     name(){return "I promise there will be no more BI-Upgrades"},
     done() {return hasUpgrade('I',124)}, 
     unlocked(){return player.A.points.gte(50)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy the last BI-Upgrade."}, 
     textStyle: {'color': '#ffe125'},
        },
        115: {
     name(){return "Preparation for Another Feature"},
     done() {return hasChallenge('I',28)}, 
     unlocked(){return player.A.points.gte(50)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Complete Infinity Challenge 8."}, 
     textStyle: {'color': '#ffe125'},
        },
        121: {
     name(){return "New Beginning II"},
     done() {return player.I.tpower.gt(0)}, 
     unlocked(){return player.A.points.gte(55)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Start producing Timewall Power."}, 
     textStyle: {'color': '#ffe125'},
        },
        122: {
     name(){return "Is Replicanti Exist?"},
     done() {return player.I.points.gte(1e140)}, 
     unlocked(){return player.A.points.gte(55)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 1e140 Infinity Points."}, 
     textStyle: {'color': '#ffe125'},
        },
        123: {
     name(){return "QqQe308000?!"},
     done() {return player.Q.points.gte(1000)}, 
     unlocked(){return player.A.points.gte(55)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 1000 QqQe308."}, 
     textStyle: {'color': '#ffe125'},
        },
        124: {
     name(){return "Halfway to Eternity"},
     done() {return tmp.A.ProgressToEtr.gte(50)}, 
     unlocked(){return player.A.points.gte(55)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 50% progress to Eternity."}, 
     textStyle: {'color': '#ffe125'},
        },
        125: {
     name(){return "Compress To 1e30"},
     done() {return tmp.I.CTgain.gte(1e30)}, 
     unlocked(){return player.A.points.gte(55)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 1e30 Compressed Timewalls."}, 
     textStyle: {'color': '#ffe125'},
        },
        131: {
     name(){return "New Beginning III"},
     done() {return player.I.QUBF.gt(0)}, 
     unlocked(){return player.A.points.gte(60)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Start producing Q-Upgrade Booster Fragment."}, 
     textStyle: {'color': '#ffe125'},
        },
        132: {
     name(){return "When can we reach it?"},
     done() {return player.I.QUBF.gt(9)}, 
     unlocked(){return player.A.points.gte(60)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 9 Q-Upgrade Booster Fragment."}, 
     textStyle: {'color': '#ffe125'},
        },
        133: {
     name(){return "2 Million Infinities"},
     done() {return player.I.inf.gt(2000000)}, 
     unlocked(){return player.A.points.gte(60)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 2,000,000 Infinities."}, 
     textStyle: {'color': '#ffe125'},
        },
        134: {
     name(){return "Fully Boosted"},
     done() {return getBuyableAmount('I',61).gte(8)}, 
     unlocked(){return player.A.points.gte(60)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Buy 8 Q-Upgrade Boosters."}, 
     textStyle: {'color': '#ffe125'},
        },
        135: {
     name(){return "v2.0 is 5 hours later"},
     done() {return tmp.A.ProgressToEtr.gte(100)}, 
     unlocked(){return player.A.points.gte(60)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Reach 1.80e308 Infinity Points."}, 
     textStyle: {'color': '#ffe125'},
        },
        141: {
     name(){return "v2.0 is now!"},
     done() {return player.E.etr.gte(1)}, 
     unlocked(){return player.A.points.gte(65)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {return "Eternity."}, 
     textStyle: {'color': '#ffe125'},
        },
        142: {
     name(){a="Eternity is not so long"
        if(options.Chinese) a='永恒不需要那么长'
        return a
     },
     done() {return player.E.bestTime.lte(3600)}, 
     unlocked(){return player.A.points.gte(65)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Eternity in under 1 hour."
        if(options.Chinese) a='在1小时内永恒'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        143: {
     name(){a="Power of Author"
        if(options.Chinese) a='作者之力'
        return a
     },
     done() {return player.df.points.gte(1)}, 
     unlocked(){return player.A.points.gte(65)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 1 DeFe308."
        if(options.Chinese) a='获得1个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        144: {
     name(){a="20 Billion Infinities"
        if(options.Chinese) a='200亿无限'
        return a
     },
     done() {return player.I.inf.gte(2e10)}, 
     unlocked(){return player.A.points.gte(65)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Reach 2e10 Infinities."
        if(options.Chinese) a='无限2e10次'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        145: {
     name(){a="DeFe616"
        return a
     },
     done() {return player.df.points.gte(2)}, 
     unlocked(){return player.A.points.gte(65)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 2 DeFe308."
        if(options.Chinese) a='获得2个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        151: {
     name(){a="Eternity is shorter now"
        if(options.Chinese) a='永恒变得更短了'
        return a
     },
     done() {return player.E.bestTime.lte(60)}, 
     unlocked(){return player.A.points.gte(70)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Eternity in under 1 minute."
        if(options.Chinese) a='在1分钟内永恒'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        152: {
     name(){a="DeFe924"
        return a
     },
     done() {return player.df.points.gte(3)}, 
     unlocked(){return player.A.points.gte(70)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 3 DeFe308."
        if(options.Chinese) a='获得3个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        153: {
     name(){a="Do you really need a guide for this?"
        if(options.Chinese) a='你真的需要这个成就的指南吗？'
        return a
     },
     done() {return player.I.points.gte(n(2).pow(1024))&&player.I.inf.lt(10)}, 
     unlocked(){return player.A.points.gte(70)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Reach 1.79e308 Infinity Points with less than 10 Infinities."
        if(options.Chinese) a='在10次无限内达到1.79e308无限点数'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        154: {
     name(){a="DeFe1232"
        return a
     },
     done() {return player.df.points.gte(4)}, 
     unlocked(){return player.A.points.gte(70)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 4 DeFe308."
        if(options.Chinese) a='获得4个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        155: {
     name(){a="Challenge Tier 6"
        if(options.Chinese) a='第六挑战层'
        return a
     },
     done() {return hasMilestone('df',2)}, 
     unlocked(){return player.A.points.gte(70)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Unlock Eternity Challenges."
        if(options.Chinese) a='解锁永恒挑战'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        161: {
     name(){a="The End of Timewall Power Buyables"
        if(options.Chinese) a='时间墙能量可购买的尽头'
        return a
     },
     done() {return getBuyableAmount('I',53).gte(5)}, 
     unlocked(){return player.A.points.gte(75)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Buy 'cokecole Boost' 5 times."
        if(options.Chinese) a='购买5次\'cokecole获取加成\'可购买'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        162: {
     name(){a="DeFe1848"
        return a
     },
     done() {return player.df.points.gte(6)}, 
     unlocked(){return player.A.points.gte(75)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 6 DeFe308."
        if(options.Chinese) a='获得6个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        163: {
     name(){a="QqQeInfinity^100"
        return a
     },
     done() {return player.Qi.points.gte(100)}, 
     unlocked(){return player.A.points.gte(75)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 100 QqQeInfinity."
        if(options.Chinese) a='获得100个QqQeInfinity'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    164: {
     name(){a="This achievement doesn't exist...?"
        if(options.Chinese) a='此成就不存在……吗？'
        return a
     },
     done() {return player.I.points.gte('9.99e999')}, 
     unlocked(){return player.A.points.gte(75)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 9.99e999 Infinity Points."
        if(options.Chinese) a='获得9.99e999无限点数'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    165: {
     name(){a="Fragment is not useless"
        if(options.Chinese) a='碎片的高光时刻'
        return a
     },
     done() {return player.I.QUBF.gte(1e36)}, 
     unlocked(){return player.A.points.gte(75)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 1e36 Q-Upgrade Booster Fragments."
        if(options.Chinese) a='获得1e36个Q-升级增强器碎片'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    171: {
     name(){a="DeFe2464"
        return a
     },
     done() {return player.df.points.gte(8)}, 
     unlocked(){return player.A.points.gte(80)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 8 DeFe308."
        if(options.Chinese) a='获得8个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    172: {
     name(){a="Upgrade Master"
        if(options.Chinese) a='升级大师'
        return a
     },
     done() {return player.cf.upgrades.length >= 4}, 
     unlocked(){return player.A.points.gte(80)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Have 4 CF-Upgrades."
        if(options.Chinese) a='购买4个CF层级的升级'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    173: {
     name(){a="Squared Squared Points"
        if(options.Chinese) a='平方<sup>2</sup>点数'
        return a
     },
     done() {return buyableEffect('T',13).gte(4)}, 
     unlocked(){return player.A.points.gte(80)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Make your PEF effect greater than 4."
        if(options.Chinese) a='使你的点数指数因子的效果超过^4'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    174: {
     name(){a="One Shot"
        if(options.Chinese) a='一击必杀'
        return a
     },
     done() {return player.I.points.gte(n(2).pow(1024))&&player.I.inf.lte(1)}, 
     unlocked(){return player.A.points.gte(80)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Reach 1.79e308 Infinity Points in 1 Infinity."
        if(options.Chinese) a='在1次无限内达到1.79e308无限点数'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    175: {
     name(){a="DeFe3080"
        return a
     },
     done() {return player.df.points.gte(10)}, 
     unlocked(){return player.A.points.gte(80)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 10 DeFe308."
        if(options.Chinese) a='获得10个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    181: {
     name(){a="Eternity Challenge is too easy"
        if(options.Chinese) a='永恒挑战太简单了'
        return a
     },
     done() {return challengeCompletions('E',12)>=5}, 
     unlocked(){return player.A.points.gte(85)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Fully complete Eternity Challenge 2."
        if(options.Chinese) a='完整完成永恒挑战2'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    182: {
     name(){a="+100% Monika Buyables"
        if(options.Chinese) a='双倍的Monika可购买'
        return a
     },
     done() {return tmp.qa.MBeff.gte(2)}, 
     unlocked(){return player.A.points.gte(85)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Make Monika Buyables twice effective."
        if(options.Chinese) a='使Monika可购买强度+100%'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    183: {
     name(){a="DeFe3388"
        return a
     },
     done() {return player.df.points.gte(11)}, 
     unlocked(){return player.A.points.gte(85)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 11 DeFe308."
        if(options.Chinese) a='获得11个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    184: {
     name(){a="Infinity Monika"
        if(options.Chinese) a='无限的Monika'
        return a
     },
     done() {return player.qa.monika.gte(n(2).pow(1024))}, 
     unlocked(){return player.A.points.gte(85)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Reach 1.80e308 Monika points."
        if(options.Chinese) a='获得1.79e308 Monika点数'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    185: {
     name(){a="Another One"
        if(options.Chinese) a='另一个'
        return a
     },
     done() {return hasUpgrade('cf',34)}, 
     unlocked(){return player.A.points.gte(85)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Unlock I-Upgrade Booster."
        if(options.Chinese) a='解锁I-升级增强器<br>!?强强?!'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    191: {
     name(){a="The 'Fast' Progress"
        if(options.Chinese) a='"快速"过程'
        return a
     },
     done() {return player.cf.IUBF.gte(1)}, 
     unlocked(){return player.A.points.gte(90)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Reach 1 I-Upgrade Booster Fragment."
        if(options.Chinese) a='获得1个I-升级增强器碎片<br>!?墙墙?!'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      192: {
     name(){a="DeFe3696"
        return a
     },
     done() {return player.df.points.gte(12)}, 
     unlocked(){return player.A.points.gte(90)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 12 DeFe308."
        if(options.Chinese) a='获得12个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      193: {
     name(){a="Can we name the achievement without 'DeFe'?"
      if(options.Chinese) a='能不能不要在成就名称中重复使用DeFe了'
        return a
     },
     done() {return player.df.points.gte(13)}, 
     unlocked(){return player.A.points.gte(90)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 13 DeFe308."
        if(options.Chinese) a='获得13个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      194: {
     name(){a="qaqe30800"
        return a
     },
     done() {return player.qa.points.gte(100)}, 
     unlocked(){return player.A.points.gte(90)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 100 qaqe308."
        if(options.Chinese) a='获得100个qaqe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      195: {
     name(){a="EC progress: 50%"
      if(options.Chinese) a='永恒挑战完成进度：50%'
        return a
     },
     done() {return tmp.E.ECcomp.gte(30)}, 
     unlocked(){return player.A.points.gte(90)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Complete 30 EC Tiers."
        if(options.Chinese) a='完成30次永恒挑战'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      201: {
     name(){a="Eternities are the new infinity"
        if(options.Chinese) a='永恒是新的无限'
        return a
     },
     done() {return player.E.bestTime.lte(0.25)}, 
     unlocked(){return player.A.points.gte(70)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Eternity in under 250 ms."
        if(options.Chinese) a='在250毫秒内永恒'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      202: {
     name(){a="eMillionaire"
        return a
     },
     done() {return player.points.gte('1e1e6')}, 
     unlocked(){return player.A.points.gte(95)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Reach 1e1,000,000 points."
        if(options.Chinese) a='获得1e1,000,000点数'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      203: {
     name(){a="Another Superman"
      if(options.Chinese) a='再次超人'
        return a
     },
     done() {return player.Qi.QqQeInf.gte(1)}, 
     unlocked(){return player.A.points.gte(95)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 1 Super-QqQeInfinity."
        if(options.Chinese) a='超一次QqQeInfinity'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      204: {
     name(){a="←↑No, we can't -- DeFe4620"
      if(options.Chinese) a='←↑我做不到——DeFe4620'
        return a
     },
     done() {return player.df.points.gte(15)}, 
     unlocked(){return player.A.points.gte(95)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Get 15 DeFe308."
        if(options.Chinese) a='获得15个DeFe308'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
      205: {
     name(){a="Liuliu66686 is too dilated"
      if(options.Chinese) a='溜溜溜达嘿太膨胀了'
        return a
     },
     done() {return hasUpgrade('cf',52)}, 
     unlocked(){return player.A.points.gte(95)},
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip() {a= "Unlock Liuliu66686."
        if(options.Chinese) a='解锁溜溜溜达嘿'
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    },
    milestones:{
        0: {
            requirementDescription: "Speed-up",
            effectDescription() {a='balanced'
                if(hasMilestone('A',1)) a='possibly balanced'
                if(hasAchievement('A',141)) a='possibly unbalanced'
                b= "The Game is too Slow? Use this to speed it up! Anyhow, I promise this game is "+a+" at normal speed. The buttons reffer to +1x,+2x,+4x speed, you can speed the game up to 8x."
            return b},
            done() { return true },
            toggles:[["A", "speed1"],["A", "speed2"],["A", "speed3"],]//["A", "speed4"],]
        },
        1: {
            requirementDescription: "Speed-up II",
            effectDescription() {return "The Game is too Slow? Use this to speed it up! You can get this milestone by Big Crunch. This button reffer to +8x speed, you can speed the game up to 16x now."},
            done() { return hasAchievement('A',71) },
            toggles:[["A", "speed4"]]
        },
    },
    clickables:{
        11: {
            title() {a="Speed-up even more"
                if(options.Chinese) a='继续加速'
                return a
            },
            display() {a="The game runs "+format(player.A.Speedmult)+'x faster, but you spend '+formatTime(player.A.Speedmult.sub(1))+' Time Flux per second.<br>Currently:'
               if(getClickableState(this.layer,this.id)==1) a=a+'On'
                if(getClickableState(this.layer,this.id)==0) a=a+'Off'
                if(options.Chinese) {a="游戏速度x"+format(player.A.Speedmult)+'，但你每秒消耗'+formatTime(player.A.Speedmult.sub(1))+'时间流量<br>当前:'
               if(getClickableState(this.layer,this.id)==1) a=a+'开'
                if(getClickableState(this.layer,this.id)==0) a=a+'关'}
                return a
            },
            canClick() {return player.offlineTime.gt(0)},
            unlocked(){return hasAchievement('SA',31)},
            onClick() {setClickableState(this.layer,this.id,1-getClickableState(this.layer,this.id))
            },
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
        //if(a.gte(50)) a=a.div(50).pow(0.5).times(50)
        return a
    },
    IC8eff(){a=n(1)
        if(inChallenge('I',28)) a=a.times(1e-50)
        return a
    },
    realPTgen(){gain = tmp.T.ptGain
	if(gain.gte(tmp.T.softcapstart)) gain = gain.div(tmp.T.softcapstart).pow(tmp.T.softcapexp).times(tmp.T.softcapstart)
    if(gain.gte('1e1e10')) gain =n(10).pow(gain.log(10).pow(0.5).times(1e5))
    return gain},
   offTimetext(){a='You have '+formatTime(player.offlineTime)+' Time Flux.<br>Enter the multiplier for speed-up here (1~64x):'
      if(options.Chinese) a='你有'+formatTime(player.offlineTime)+'时间流量<br>在下面输入你想要加速的倍率(1~64x)：'
      return a
   },
})

addLayer("SA", {
    name: "Secret Achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "sa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ach: new Decimal(0),
        newsIndex:n(0),
        newsTime:n(0),
        newshasSeen:n(0),
    }},
    color: "#878787",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Secret Achievements", // Name of prestige currency
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
       doReset(resettingLayer) {
    },
    update(diff){
        player.SA.newsTime = player.SA.newsTime.add(diff)
        if(player.SA.newsTime.gte(10)) {
            player.SA.newsTime = n(0)
            player.SA.newsIndex = n(tmp.SA.news.length).times(Math.random()).floor()
            if(options.NewsTicker) player.SA.newshasSeen = player.SA.newshasSeen.add(1)
        }
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
        "Achievements":{
        content: [ "main-display",
        "achievements",'clickables',
    //["display-text", () => tmp.A.tips],
    ],},
    "News Messages":{
        content: [ "main-display",
    ["display-text", () => tmp.SA.newsShowed],
    ],
        unlocked(){return hasAchievement('SA',24)},
    },
    },
    effectDescription(){return ' and there are 10 in total.'},
    achievements: {
        11: {
     name(){a="This isn't '+1 Point'"
        if(options.Chinese) a='这不是“+1点数”'
        return a
     },
     done() {return player.T.pauseTime.gte(25)}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',11)) {a= "Click the 'Pause' button 25 times."
        if(options.Chinese) a='点击“暂停”按钮25次'}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        12: {
     name(){a="News Addiction"
        if(options.Chinese) a='消息成瘾'
        return a
     },
     done() {return player.SA.newshasSeen.gte(3000)}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "See 3000 news messages."
            a=a+'<br>Reward: show how many news messages you have seen here: '+format(player.SA.newshasSeen)
        if(options.Chinese) {a='看到3000条新闻消息'
            a=a+'<br>奖励：在这里看到你看了多少条新闻消息：'+format(player.SA.newshasSeen)
        }}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        13: {
     name(){a="The Not Intended Way to Play"
        if(options.Chinese) a='非正常游玩方式'
        return a
     },
     done() {return !options.offlineProd}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "Turn off offline production."
        if(options.Chinese) a='关闭离线进度'}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        14: {
     name(){a="You do know how these work, right?"
        if(options.Chinese) a='你知道这些是怎么运作的，对吧？'
        return a
     },
     done() {return player.E.s14.gte(1)}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "Reset Eternity Upgrades without buying any of them."
        if(options.Chinese) a='在不购买任何永恒升级的情况下重置永恒升级'}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        21: {
     name(){a="One day one layer"
        if(options.Chinese) a='一天一层'
        return a
     },
     done() {return player.timePlayed > 864000+86400}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "Play for 11 days."
        if(options.Chinese) a='游玩11天'}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        22: {
     name(){a="RNG Idle"
        if(options.Chinese) a='RNG放置'
        return a
     },
     done() {return Math.random() > 0.999999}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "You have a 1 in 1,000,000 chance to get this achievement every tick."
        if(options.Chinese) a='每一帧你有1/1,000,000的几率获得此成就'}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        23: {
     name(){a="News Addiction II"
        if(options.Chinese) a='消息成瘾 II'
        return a
     },
     done() {return player.SA.newshasSeen.gte(60000)}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "See 60000 news messages."
            a=a+'<br>Reward: Unlock a clickable, which allows you to skip current news message instantly.'
        if(options.Chinese) {a='看到60000条新闻消息'
            a=a+'<br>奖励：解锁一个可点击，允许你跳过当前的新闻消息'
        }}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        24: {
     name(){a="News Addiction III"
        if(options.Chinese) a='消息成瘾 III'
        return a
     },
     done() {return player.SA.newshasSeen.gte(1000000)}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "See 1,000,000 news messages."
            a=a+'<br>Reward: Show all news messages in the "News Messages" tab.'
        if(options.Chinese) {a='看到1,000,000条新闻消息'
            a=a+'<br>奖励：在"News Messages"标签页中显示所有新闻消息'
        }}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        31: {
     name(){a="No Cheating"
        if(options.Chinese) a='不要升桂'
        return a
     },
     done() {return player.devSpeed.gt(1)}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)
      player.offlineTime = player.offlineTime.add(1800)
     },
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "Speed up the game.<br>Reward: Unlock a clickable, which allows you to speed up the game even more, but spend Time Flux. Also give you 30 minutes of Time Flux."
        if(options.Chinese) a='加速游戏<br>奖励：解锁花费时间流量的进一步加速功能，并给予30分钟的初始时间流量'}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
        32: {
     name(){a="Self-discipline"
        if(options.Chinese) a='自律'
        return a
     },
     done() {return player.offlineTime.gte(n(86400).times(7))}, 
     unlocked(){return player.SA.points.gte(0)},
     onComplete() {player.SA.points = player.SA.points.add(1)},
     tooltip() {a= "???"
        if(hasAchievement('SA',this.id)) {a= "Reach 7 days of Time Flux."
        if(options.Chinese) a='获得7天的时间流量'}
        return a
     }, 
     textStyle: {'color': '#ffe125'},
        },
    },
    clickables:{
        11: {
            title() {a="Skip current news message"
                if(options.Chinese) a='跳过当前的新闻消息'
                return a
            },
            display() {a="lol"
                if(options.Chinese) a='QqQe308挨超'
                return a
            },
            canClick() {return true},
            unlocked(){return hasAchievement('SA',23)},
            onClick() {player.SA.newsTime = n(0)
            player.SA.newsIndex = n(tmp.SA.news.length).times(Math.random()).floor()
            if(options.NewsTicker) player.SA.newshasSeen = player.SA.newshasSeen.add(1)
            },
        },
    },
    news(){a=['This is the first news message in the news message list.',
    'And this is the second news message in the news message list.',
    'How to reach Infinity? Just Click "+1 Point" 25 times, buy a Point Producer and wait for 1.80e308 seconds.',
    'This news message is not generated by AI.',
    'Not on Steam!',
    'Click this news message to get nothing.',
    'You have played this game for '+formatTime(player.timePlayed)+'.',
    'Currently, the version of The Timewall Tree Remake is v2.3.',
    'Do you know that the duration of per news message is 10 seconds? and '+format(n(10).sub(player.SA.newsTime))+' seconds left for this message.',
    'This is a unique news message, and the chance of seeing it is 1/'+format(n(tmp.SA.news.length),0)+'.',
    "If you want to play The Timewall Tree 'Unremake', you can click this button: <a href='https://xiao7sanlian.github.io/The-Timewall-Tree/' target='_blank'>https://xiao7sanlian.github.io/The-Timewall-Tree/</a>. However, the 'Unremake' version is not updated anymore, and it may contain some bugs and unbalanced content. Moreover, it has only Chinese language.",
    "Here are some tips for secret achievements. Secret Ach 11: I forgot",
    "Some of the game's content is inspired by Antimatter Dimensions.",
    "The Antimatter is a lie.",
    "The last update is in -5 hours.",
    "I'm out of ideas for news messages, so you can suggest some interesting news messages for this game at <a href='https://github.com/xiao7sanlian/The-Timewall-Tree-Remake/issues/3' target='_blank'>here</a>!",
    '"Fay Surry Gex" or "Say Gurry Fex"',//v2.1
    'Play for 1.79e308 seconds to get a secret!',//v2.1
    'This message is hardca-',//v2.2
    'This message is S O F T C A P P E D',//v2.2
    '"This game is cool" - Man who played this game for 1 second',//v2.2
    'Currently, the version of The Timewall Tree Remake is v……0.1?',//2.2
    'pigeonhole principle: given that there are some cylinders (5.1in in length, 4.5in in girth) and some m&m tubes filled with butter and microwaved mashed bananas, if there are more cylinders than m&m tubes, then there must be at least one tube with more than one cylinder. for more details regarding rules of cylinders, please check the relevant news message.',//v2.2
    "Nobody knows what a QqQe308 is. People made myths like they give you unlimited power, or are a paradox and Whoever knows what they are, get erased from existence. We don't think so and we will bust that myth. We are the myth busters. In this room before us, we have a singular QqQe308. Jeremy, point the camera to the door. We will open it in DESTRUCTION 3,2,1...",//v2.2
    '',//v2.3
    'Liuliu66686 is too dilated',//v2.3
    'Liuliu too ated',//v2.3
    'How dare Revolution Idle copy our idea of Time Flux'//v2.3
    ]
    if(hasAchievement('A',23)) a.push("Do you know why the first side layer is called 'QqQe308'? Well, I don't know as well.")
    if(hasAchievement('A',51)) a.push("Here we have 3 kinds of Timewall. Will there be more Timewall in the future?")
    if(hasAchievement('A',71)) a.push("The author said that he will remove the speed-up in v1.3.0 because it's too OP.",
        "Generally speaking, it takes about 25 hours to get the first Infinity. You are so persistent!",
        "Why there are only 6 Normal Challenges instead of 12? Because the author lacks creativity.",
    )
    if(hasAchievement('A',91)) a.push("Point Exponent Factory is too powerful, so please nerf it in the future.")
    if(hasAchievement('A',121)) a.push("Is Timewall Power a kind of Replicanti?")
    if(hasAchievement('A',131)) a.push("Q-Upgrade Booster be like: Unlock the ability to Charge an Infinity Upgrade, with the ability to Charge an additional one every 2 Teresa Levels (maxing out with all 12 at Level 24).")
    if(hasAchievement('A',141)) a.push("Long times ago, a man started his journey of Timewall. He got Timewalls, Super Timewalls, Mega Timewalls and other things. Then, he reached Infinity, and gained Infinity Points. After that, he went through many timewalls, and finally reached Eternity. This story shows us that where there is a will, there is a way.",
        "Long times ago, a man opened The Timewall Tree. He clicked '+1 Point' once, and closed the game. The end.",
        "The spoiler for next layer: Unity, Attack, Mineral, Tarot, and so on.",
        "The spoiler for next layer: Reality, Glyphs, Perk, Celestials, and so on.",
    )
    if(player.SA.points.gte(2)) a.push('"I Just Got 2 Secret Achievements" - Felipe')//v2.2
        return a
    },
    newsShowed(){a=''
        for (let i = 0; i < tmp.SA.news.length; i++) {
            a=a+tmp.SA.news[i]+'<br>'
        }
        return a
    },
})