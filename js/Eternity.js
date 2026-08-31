addLayer("E", {
    name: "Eternity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        etr: n(0),
        best:n(0),
        total:n(0),
        resetTime: 0,
        bestTime:n(1e300),
        timeshard:n(1),
        upoint:n(0),

        bankedInf: n(0),

        s14:n(0),
        basicupg:[],
        allupg:[11,21,22,31,32,33,41,42,51,61,71,72,73,81,82,83,91,92,93,101,102,103,111,121,122,123,131,132,133,141,142,143,151,161,162,171,181,191,192,193,201,202,203,204],
    }},
    color: "#b743de",
    requires(){a = n(2).pow(1024)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "Eternity Points", // Name of prestige currency
    baseResource: "Infinity Points", // Name of resource prestige is based on
    baseAmount() {return player.I.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {a=n(10).log(2).div(1024).toNumber()
        return a
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasMilestone('df',0)) mult=mult.times(tmp.df.effect[4])
        if(hasUpgrade('E',61)) mult=mult.times(15)
        if(hasUpgrade('E',121)) mult=mult.times(upgradeEffect('E',121))
        if(hasUpgrade('E',122)) mult=mult.times(upgradeEffect('E',122))
        if(hasUpgrade('E',123)) mult=mult.times(upgradeEffect('E',123))
        if(hasUpgrade('E',244)) mult=mult.times(upgradeEffect('E',244))

        if(hasUpgrade('cf',22)) mult=mult.times(upgradeEffect('cf',22))
        if(hasUpgrade('cf',31)) mult=mult.times(upgradeEffect('cf',31))

        if(hasUpgrade('cf',41)) mult=mult.times(buyableEffect('cf',12))

        if(player.R.reb.gte(1)) mult=mult.times(tmp.R.rebEff[2])

        if(getClickableState('I',43)==1) mult=mult.times(clickableEffect('I',43))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    directMult() {a = n(1)
            return a
    },
    canReset() {return player.I.points.gte(n(2).pow(1024))},//&&(player.I.points.lt(n(2).pow(1024)))
    update(diff){
        player.E.timeshard = player.E.timeshard.add(tmp.E.RealTSgen.times(diff))
        if(inChallenge('E',11)||inChallenge('E',32)) player.E.timeshard = n(1)

        if(inChallenge('E',33)&&player.E.resetTime<0.3) player.E.timeshard = n(1)

        player.E.basicupg = [11,21,22,31,32,33,34,41,42,51,61,62,71,72,73,81,82,83,91,92,93,101,102,103,111,112,121,122,123,131,132,133,141,142,143,151,152,161,162,171,181,191,192,193,201,202,203,204,211,212,213,221,222,231]
        player.E.allupg = [11,21,22,31,32,33,41,42,51,61,71,72,73,81,82,83,91,92,93,101,102,103,111,121,122,123,131,132,133,141,142,143,151,161,162,171,181,191,192,193,201,202,203,204,211,213,221,222,231,241,242,243,244,251,252,253,254,261,262,271,272]
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e",
        description: "E: Eternity",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked(){return hasAchievement('A',135)}},
    ],
    layerShown(){return hasAchievement('A',135)},
    branches: ['I'],
    autoUpgrade() {return false},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    onPrestige(gain){
        if(player.E.etr.gte(1)&&n(player.E.resetTime).lt(player.E.bestTime)) player.E.bestTime = n(player.E.resetTime)
        player.E.etr = player.E.etr.add(tmp.E.etrgain)
        if(hasUpgrade('E',191)) player.E.bankedInf = player.E.bankedInf.add(player.I.inf.times(0.05))
    },
    tabFormat: {
    "Eternity Milestones": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.E.EMtip],"milestones",
        ],
    },
    "Timeshard Generator": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.E.TGtip],
            ["buyables",[1]]
    ],
    unlocked(){return hasMilestone('E',0)},
    },
    "Eternity Upgrades": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.E.EUtip],['buyables',[2]],
            ["clickables",[1]],
            ["upgrade-tree",[[11],[21, 22],[31,32,33,34],[41,42],[51],[61,62],[71,72,73],[81,82,83],[91,92,93],[101,102,103],[111,112],[121,122,123],[131,132,133],[141,142,143],[151,152],[161,162],[171],[181],[191,192,193],[201,202,203,204],[211,212,213],[221,222],[231],[241,242,243,244],[251,252,253,254],[261,262],[271,272]]]
    ],
    unlocked(){return hasMilestone('E',1)},
    },
    "Eternity Challenges": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.E.ECtip],['challenges',[1,2,3]],
    ],
    unlocked(){return hasMilestone('df',2)},
    },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > 4) {
            player.E.timeshard=n(1)
            if(getClickableState('E',12)==1) {if(hasUpgrade('E',34)) player.E.points = player.E.points.add(5)
                if(hasUpgrade('E',62)) player.E.points = player.E.points.add(100)
                if(hasUpgrade('E',112)) player.E.points = player.E.points.add(10000)
                if(hasUpgrade('E',152)) player.E.points = player.E.points.add(1e10)
                if(hasUpgrade('E',212)) player.E.points = player.E.points.add(1e50)
                player.E.upgrades=[]
            setClickableState('E',12,0)
            }
       }
        if (layers[resettingLayer].row == 6) {
    let kept = []
    layerDataReset(this.layer, kept)
    if(hasUpgrade('R',11))player.E.milestones.push(1)
       }
    },
    autoPrestige(){return hasMilestone('E',15)&&player.E.ETRauto},
    milestones:{
        0: {
            requirementDescription() {a="1 Eternity"
                if(options.Chinese) a='永恒1次'
                return a
            },
            effectDescription() {a="Unlock Autobuyers for IP Doubler, which buy max IP Doubler without spending IP, and unlock Timeshard."
                if(options.Chinese) a="解锁IP倍增的自动购买器，其最大化购买IP倍增且不消耗无限点数，并解锁时间碎片"
                return a
            },
            done() { return player.E.etr.gte(1) },
            toggles:[["I", "IPDauto"]]
        },
        1: {
            requirementDescription() {a="2 Eternities"
                if(options.Chinese) a='永恒2次'
                return a
            },
            effectDescription() {a="Keep I-Automations on Eternity, and unlock Eternity Upgrades."
                if(options.Chinese) a="在永恒时保留无限层级的所有自动化，并解锁永恒升级"
                return a
            },
            done() { return player.E.etr.gte(2) },
        },
        2: {
            requirementDescription() {a="3 Eternities"
                if(options.Chinese) a='永恒3次'
                return a
            },
            effectDescription() {a="Keep Ix-4 on Eternity, complete all normal challenges automatically, and Break Infinity no longer need IP."
                if(options.Chinese) a="在永恒时保留第四列无限升级，自动完成所有普通挑战，打破无限不再需要无限点数"
                return a
            },
            done() { return player.E.etr.gte(3) },
            toggles:[["I", "NCauto"]]
        },
        3: {
            requirementDescription() {a="4 Eternities"
                if(options.Chinese) a='永恒4次'
                return a
            },
            effectDescription() {a="Unlock Autobuyers for BI-buyables, which buy max without spending IP."
                if(options.Chinese) a="解锁打破无限页面可购买的自动购买器，其最大化购买且不消耗无限点数"
                return a
            },
            done() { return player.E.etr.gte(4) },
            toggles:[["I", "BIB1auto"],["I", "BIB2auto"],["I", "BIB3auto"],["I", "BIB4auto"]]
        },
        4: {
            requirementDescription() {a="5 Eternities"
                if(options.Chinese) a='永恒5次'
                return a
            },
            effectDescription() {a="Unlock Autobuyer for qaqe308, and qaqe308 resets nothing."
                if(options.Chinese) a="解锁qaqe308自动购买器，qaqe308不重置任何东西"
                return a
            },
            done() { return player.E.etr.gte(5) },
            toggles:[["qa", "qaqauto"]]
        },
        5: {
            requirementDescription() {a="6 Eternities"
                if(options.Chinese) a='永恒6次'
                return a
            },
            effectDescription() {a="Autobuyer for qaqe308 now buy max, and auto complete T-Challenge 3 if auto T-Challenge is open."
                if(options.Chinese) a="自动最大化获得qaqe308，自动完成时间墙挑战也作用于第三个时间墙挑战"
                return a
            },
            done() { return player.E.etr.gte(6) },
        },
        6: {
            requirementDescription() {a="7 Eternities"
                if(options.Chinese) a='永恒7次'
                return a
            },
            effectDescription() {a="Unlock Autobuyer for All Upgrades in I layer, and breaking Infinity and IP Doubler no longer has requirements for unlock."
                if(options.Chinese) a="解锁无限层级所有升级的自动购买器，且打破无限与IP倍增器不再有解锁需求"
                return a
            },
            done() { return player.E.etr.gte(7) },
            toggles:[["I", "IUauto"]]
        },
        7: {
            requirementDescription() {a="8 Eternities"
                if(options.Chinese) a='永恒8次'
                return a
            },
            effectDescription() {a="Unlock Autobuyers for IG, IGM and IEF, which buy max without spending IP."
                if(options.Chinese) a="解锁IG，IGM与IEF的自动购买器，其最大化购买且不消耗无限点数"
                return a
            },
            done() { return player.E.etr.gte(8) },
            toggles:[["I", "IGauto"],["I", "IGMauto"],["I", "IEFauto"],]
        },
        8: {
            requirementDescription() {a="9 Eternities"
                if(options.Chinese) a='永恒9次'
                return a
            },
            effectDescription() {a="Unlock Autobuyers for Monika Buyables, which buy max without spending Monika Points."
                if(options.Chinese) a="解锁Monika可购买的自动购买器，其最大化购买且不消耗Monika点数"
                return a
            },
            done() { return player.E.etr.gte(9) },
            toggles:[["qa", "MB1auto"],["qa", "MB2auto"],["qa", "MB3auto"],["qa", "MB4auto"],]
        },
        9: {
            requirementDescription() {a="10 Eternities"
                if(options.Chinese) a='永恒10次'
                return a
            },
            effectDescription() {a="Unlock Autobuyer for qaqe308 Upgrade."
                if(options.Chinese) a="解锁qaqe308升级的自动购买器"
                return a
            },
            done() { return player.E.etr.gte(10) },
            toggles:[["qa", "qaUauto"]]
        },
        10: {
            requirementDescription() {a="11 Eternities"
                if(options.Chinese) a='永恒11次'
                return a
            },
            effectDescription() {a="Keep BI1-1, BI3-4 and Super-man state on Eternity."
                if(options.Chinese) a="在永恒时保留BI1-1,BI3-4与超人状态"
                return a
            },
            done() { return player.E.etr.gte(11) },
        },
        11: {
            requirementDescription() {a="12 Eternities"
                if(options.Chinese) a='永恒12次'
                return a
            },
            effectDescription() {a="Automatically unlock Infinity Challenges and automatically complete them as soon as unlock."
                if(options.Chinese) a="自动解锁无限挑战，解锁后立刻自动完成"
                return a
            },
            done() { return player.E.etr.gte(12) },
            toggles:[["I", "ICauto1"],['I','ICauto2']]
        },
        12: {
            requirementDescription() {a="13 Eternities"
                if(options.Chinese) a='永恒13次'
                return a
            },
            effectDescription() {a="When unlock Q-Upgrade Booster, automatically gain 8 Q-Upgrade Boosters, with all Q-Upgrade Boost purchased."
                if(options.Chinese) a="在解锁Q升级增强器后，立即获得8个Q升级增强器并购买所有Q层级增强升级"
                return a
            },
            done() { return player.E.etr.gte(13) },
            toggles:[["Q", "QUBauto"]]
        },
        13: {
            requirementDescription() {a="14 Eternities"
                if(options.Chinese) a='永恒14次'
                return a
            },
            effectDescription() {a="Unlock Autobuyers for Timewall Power Buyables, which buy max without spending Timewall Power."
                if(options.Chinese) a="解锁时间墙能量可购买的自动购买器，其最大化购买且不消耗时间墙能量"
                return a
            },
            done() { return player.E.etr.gte(14) },
            toggles:[["I", "TPB1auto"],["I", "TPB2auto"],["I", "TPB3auto"],["I", "TPB4auto"]]
        },
        14: {
            requirementDescription() {a="15 Eternities"
                if(options.Chinese) a='永恒15次'
                return a
            },
            effectDescription() {a="Automatically gain Compressed Timewall."
                if(options.Chinese) a="自动获取压缩时间墙"
                return a
            },
            done() { return player.E.etr.gte(15) },
            toggles:[["I", "CTauto"]]
        },
        15: {
            requirementDescription() {a="16 Eternities"
                if(options.Chinese) a='永恒16次'
                return a
            },
            effectDescription() {a="Unlock a new side layer and auto Eternity."
                if(options.Chinese) a="解锁一个新的支线层级与自动永恒"
                return a
            },
            done() { return player.E.etr.gte(16) },
            toggles:[["E", "ETRauto"]]
        },
    },
    buyables: {
        11: {
            title(){text = 'Timeshard Generator'
                if(options.Chinese) text='时间碎片生产器(TG)'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                if(tmp.E.FreeTG.neq(0))text=text+' + '+format(tmp.E.FreeTG)
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(3).pow(x).times(1)
                    return a
             },
            effect(x) {return x.add(tmp.E.FreeTG).times(tmp.E.TGmult)},
            display() {a= "Produce "+format(tmp.E.TGmult)+" Timeshards Per Second<br/>Effect:produces "+format(this.effect())
                if(buyableEffect('E',13).neq(1)) a=a+'^'+format(buyableEffect('E',13))+'='+format(tmp.E.TSgen)
                a=a+" timeshards/s<br/>"
            if(tmp.E.TSgen.neq(tmp.E.RealTSgen)) a=a+'After Softcap:'+format(tmp.E.RealTSgen)+'/s<br>'
            a=a+"Cost: "+format(this.cost())+' Eternity Points'
            if(options.Chinese) {a= "每秒生产"+format(tmp.E.TGmult)+"时间碎片<br/>总效果:每秒生产"+format(this.effect())
                if(buyableEffect('E',13).neq(1)) a=a+'^'+format(buyableEffect('E',13))+'='+format(tmp.E.TSgen)
                a=a+"时间碎片<br/>"
            if(tmp.E.TSgen.neq(tmp.E.RealTSgen)) a=a+'<br>软上限后:'+format(tmp.E.RealTSgen)+'/s'
            a=a+"花费:"+format(this.cost())+'永恒点数'}
            return a },
            unlocked() {return hasMilestone('E', 0)},
            canAfford() { return player.E.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                //if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
            buy() {
                player.E.points = player.E.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.E.points.max(1).div(1).log(3).sub(1)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        12: {
            title(){text = 'Timeshard Multiplier'
                if(options.Chinese) text='时间碎片加成器(TM)'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                //if(tmp.T.freePPM.neq(0))text=text+' + '+format(tmp.T.freePPM)
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(10).pow(x).times(1000)
                return a
             },
            effect(x) {a= x
                if(a.gt(25)) a=a.pow(0.5).times(5)
                b=tmp.E.TMbase.pow(a)
                return b
            },
            display() { a= "Multiply Timeshard Generator base effect by "+format(tmp.E.TMbase)+"<br/>Effect:"+format(this.effect())+'x'
                if(getBuyableAmount('E',12).gt(25)) a=a+'(Softcapped)'
                a=a+"<br/>Cost: "+format(this.cost())+' Eternity Points'
                if(options.Chinese){a= "时间碎片生成器效果x"+format(tmp.E.TMbase)+"<br/>效果:"+format(this.effect())
                if(getBuyableAmount('E',12).gt(25)) a=a+'(受软上限限制)'
                a=a+"x<br/>花费:"+format(this.cost())+'永恒点数'}
            return a },
            unlocked() {return hasMilestone('E', 0)},
            canAfford() { return player.E.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                //if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
            buy() {
                player.E.points = player.E.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.E.points.max(1000).div(1000).log(10).sub(1)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        13: {
            title(){text = 'Timeshare Exponent Factory'
                if(options.Chinese) text='时间碎片指数因子(TEF)'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                //if(tmp.T.freePEF.neq(0))text=text+' + '+format(tmp.T.freePEF)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e10).pow(x.add(1).pow(2)).times(1e190) },
            effect(x) {a=x.times(tmp.E.TEFbase).add(1)
                if(a.gte(1.5)) a=a.sub(1.5).div(10).add(1.5)
                if(a.gte(2)) a=a.add(2).log(2)
                a=a.times(tmp.E.TEFmult)
                    return a
            },
            display() { a="Add "+format(tmp.E.TEFbase,4)+" to Timeshard Generator Effect Exponent<br/>Effect:^"+format(this.effect().div(tmp.E.TEFmult),4)
                if(buyableEffect(this.layer,this.id).gte(n(1.5).times(tmp.E.TEFmult,4))) a=a+'(Softcapped)'
                if(tmp.E.TEFmult.neq(1)) a=a+'x'+format(tmp.E.TEFmult)+'='+format(this.effect(),4)
                a=a+"<br/>Cost: "+format(this.cost())+' points'
            if(options.Chinese) {a="时间碎片生产器总效果指数+"+format(tmp.T.TEFbase,4)+"<br/>效果:^"+format(this.effect().div(tmp.E.TEFmult),4)
                if(buyableEffect(this.layer,this.id).gte(n(1.5).times(tmp.E.TEFmult,4))) a=a+'(受软上限限制)'
                if(tmp.E.TEFmult.neq(1)) a=a+'x'+format(tmp.E.TEFmult)+'='+format(this.effect(),4)
                a=a+"<br/>花费:"+format(this.cost())+'点数'}
            return a },
            unlocked() {return hasUpgrade('E',262)||getBuyableAmount(this.layer,this.id).gte(1)},
            canAfford() { return player.E.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                //if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
            buy() {
                player.E.points = player.E.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.E.points.div(1e190).max(1).log(1e10).pow(0.5)
					//if (tempBuy.gte(25)) tempBuy = tempBuy.times(625).cbrt();
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        21: {
            title(){text = 'Upgrade Points I'
                if(options.Chinese) text='升级点数 I'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal('1e20000').pow(x.add(1))
                return a
             },
            effect(x) {a= x
                return a
            },
            display() { a= "Get 1 Upgrade Points per purchase"
                a=a+"<br/>Cost: "+format(this.cost())+' Points'
                if(options.Chinese){a= "每次购买获得1个升级点数"
                a=a+"<br/>花费:"+format(this.cost())+'点数'}
            return a },
            unlocked() {return hasMilestone('E', 1)},
            canAfford() { return player.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.points.max(1).log(1e20000).sub(1)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
            style: {'height':'100px'},
        },
        22: {
            title(){text = 'Upgrade Points II'
                if(options.Chinese) text='升级点数 II'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal('1e100').pow(x)
                return a
             },
            effect(x) {a= x
                return a
            },
            display() { a= "Get 1 Upgrade Points per purchase"
                a=a+"<br/>Cost: "+format(this.cost())+' Infinity Points'
                if(options.Chinese){a= "每次购买获得1个升级点数"
                a=a+"<br/>花费:"+format(this.cost())+'无限点数'}
            return a },
            unlocked() {return hasMilestone('E', 1)},
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
					let tempBuy = player.I.points.max(0.1).log(1e100)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
            style: {'height':'100px'},
        },
        23: {
            title(){text = 'Upgrade Points III'
                if(options.Chinese) text='升级点数 III'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal('2').pow(x)
                return a
             },
            effect(x) {a= x
                return a
            },
            display() { a= "Get 1 Upgrade Points per purchase"
                a=a+"<br/>Cost: "+format(this.cost())+' Eternity Points'
                if(options.Chinese){a= "每次购买获得1个升级点数"
                a=a+"<br/>花费:"+format(this.cost())+'永恒点数'}
            return a },
            unlocked() {return hasMilestone('E', 1)},
            canAfford() { return player.E.points.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.E.points = player.E.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.E.points.max(0.5).log(2)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
            style: {'height':'100px'},
        },
    },
    clickables:{
        11: {
            title() {a="Reset Eternity Upgrade"
                if(options.Chinese) a='重置永恒升级'
                return a
            },
            display() {a="But do an Eternity reset instantly!"
                if(options.Chinese) a='但是立刻进行永恒重置！'
                return a},
            unlocked(){return hasMilestone('E',1)},
            canClick() {return true},
            onClick() {
            if(player.E.upgrades.length == 0) player.E.s14 =n(1)
            if(hasUpgrade('E',34)) player.E.points = player.E.points.add(5)
            if(hasUpgrade('E',62)) player.E.points = player.E.points.add(100)
            if(hasUpgrade('E',112)) player.E.points = player.E.points.add(10000)
            if(hasUpgrade('E',152)) player.E.points = player.E.points.add(1e10)
            if(hasUpgrade('E',212)) player.E.points = player.E.points.add(1e50)
            player.E.upgrades = []
            doReset('E',player.I.points.lt(n(2).pow(1024)))
           },
        },
        12: {
            title() {a="Reset Eternity Upgrade on Eternity"
                if(options.Chinese) a='下次永恒时重置永恒升级'
                return a
            },
            display() {a="Currently: "
                if(getClickableState(this.layer,this.id)==1) a=a+'Yes'
                if(getClickableState(this.layer,this.id)==0) a=a+'No'
                if(options.Chinese) {a="当前: "
                if(getClickableState(this.layer,this.id)==1) a=a+'是'
                if(getClickableState(this.layer,this.id)==0) a=a+'否'}
                return a},
            unlocked(){return hasMilestone('E',1)},
            canClick() {return true},
            onClick() {
            setClickableState(this.layer,this.id,1-getClickableState(this.layer,this.id))
           },
        },
        13: {
            title() {a="Reset Eternity Upgrade below row 23"
                if(options.Chinese) a='重置第23行后的永恒升级'
                return a
            },
            display() {a="But do an Eternity reset instantly!"
                if(options.Chinese) a='但是立刻进行永恒重置！'
                return a},
            unlocked(){return hasMilestone('li',3)},
            canClick() {return true},
            onClick() {
            a=[]
            for (let i = 0; i < player.E.basicupg.length; i++) {
            if(hasUpgrade('E',player.E.basicupg[i])) a.push(player.E.basicupg[i])
            }
            player.E.upgrades = a
            doReset('E',player.I.points.lt(n(2).pow(1024)))
           },
        },
        23: {
            title() {a="Export Eternity Upgrade"
                if(options.Chinese) a='导出永恒升级'
                return a
            },
            display() {a="No word ha ha"
                if(options.Chinese) a='滚木'
                return a},
            unlocked(){return hasMilestone('E',1)&&false},
            canClick() {return true},
            onClick() {
            const el = document.createElement("textarea");
	        el.value = player.E.upgrades.join(",");
	        document.body.appendChild(el);
	        el.select();
	        el.setSelectionRange(0, 99999);
	        document.execCommand("copy");
	        document.body.removeChild(el);
           },
        },
        24: {
            title() {a="Import Eternity Upgrade"
                if(options.Chinese) a='导入永恒升级'
                return a
            },
            display() {a="Enter text here"
                if(options.Chinese) a='请输入文本'
                return a},
            unlocked(){return hasMilestone('E',1)&&false},
            canClick() {return true},
            onClick() {
            //if (imported === undefined)
		imported = prompt("Paste your Eternity Upgrade here<br>This will force an Eternity reset!");
	try {
        player.E.upgrades = []
        if(hasUpgrade('E',34)) player.E.points = player.E.points.add(5)
        if(hasUpgrade('E',62)) player.E.points = player.E.points.add(100)
        if(hasUpgrade('E',112)) player.E.points = player.E.points.add(10000)
        if(hasUpgrade('E',152)) player.E.points = player.E.points.add(1e10)
        a=imported.split(",").map(x => parseInt(x))
        for (let i = 0; i < a.length; i++) {
            if(tmp.E.upgrades[a[i]].canAfford === true&&tmp.E.currentUP.gte(tmp.E.upgrades[a[i]].cost)){player.E.upgrades.push(a[i])}
            sleep(100)
        }
        doReset('E',true)
		//player.E.upgrades = imported.split(",").map(x => parseInt(x));
        //const set2 = new Set(player.E.allupg);
        //player.E.upgrades = [...new Set(player.E.upgrades.filter(item => set2.has(item)))];
	} catch (e) {
		return
	}
           },
        },
    },
    upgrades: {
        11: {
            title: "E1-1",
            description() {a="Multiply Timeshard Generator base effect based on Timeshard, capped at 1e100."
                if(options.Chinese) a='基于时间碎片增益时间碎片生产器效果，上限为1e100'
                return a
            },
            effect() {a=player.E.timeshard.pow(0.01).min(1e100)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1),
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return true},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        21: {
            title: "E2-1",
            description() {a="Improve Timewall Power effect. (an extra multiplier of TP^0.1)."
                if(options.Chinese) a='改进时间墙能量效果（额外乘以时间墙能量^0.1）'
                return a
            },
            effect() {a=player.I.tpower.add(1).pow(0.1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(2),
            branches:[11],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',11)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        22: {
            title: "E2-2",
            description() {a="Multiply Timewall Power gain based on total Eternity Points."
                if(options.Chinese) a='基于总永恒点数增益时间墙能量获取'
                return a
            },
            effect() {a=player.E.total.add(1).pow(0.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(2),
            branches:[11],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',11)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        31: {
            title: "E3-1",
            description() {a="Powers up bonuses that are based on your Infinities (Bonuses^1.5)."
                if(options.Chinese) a='所有基于无限次数加成的升级效果^1.5'
                return a
            },
            cost: new Decimal(3),
            branches:[21],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',21)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        32: {
            title: "E3-2",
            description() {a="Multiply Infinities gain based on bought Infinity Generator Multiplier."
                if(options.Chinese) a='基于购买的无限之力加成器增益无限次数'
                return a
            },
            effect() {a=getBuyableAmount('I',32).add(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(4),
            branches:[22],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',22)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        33: {
            title: "E3-3",
            description() {a="Your best Infinity time is always 0.001s."
                if(options.Chinese) a='你最快的无限次数始终为0.001s'
                return a
            },
            cost: new Decimal(2),
            branches:[22],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',22)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        34: {
            title: "E3-4",
            description() {a="Timeshard Generator multiplier based on fastest Eternity time, capped at 1s."
                if(options.Chinese) a='基于最快的永恒增益时间碎片生成器，在1秒时达到上限'
                return a
            },
            effect() {a=n(600).div(player.E.bestTime).min(600).max(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[33],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',33)},
        },
        41: {
            title: "E4-1",
            description() {a="Each bought Point Exponent Factory multiplies your IP gain by 1.1."
                if(options.Chinese) a='每个购买的点数指数因子使你的无限点数获取x1.1'
                return a
            },
            effect() {a=n(1.1).pow(getBuyableAmount('T',13))
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[31],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',31)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        42: {
            title: "E4-2",
            description() {a="Each bought Infinity Exponent Factory multiplies your first 3 kinds of Super-man generation speed by 100."
                if(options.Chinese) a='每个购买的无限之力指数因子使你超前3个人的速度x100'
                return a
            },
            effect() {a=n(100).pow(getBuyableAmount('I',33))
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[32],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',32)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        51: {
            title: "E5-1",
            description() {a="Gain 1e15 times more Infinity Points."
                if(options.Chinese) a='无限点数获取x1e15'
                return a
            },
            effect() {a=n(1e15)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(6),
            branches:[41,42],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',41)||hasUpgrade('E',42)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        61: {
            title: "E6-1",
            description() {a="Gain 15 times more Eternity Points."
                if(options.Chinese) a='永恒点数获取x15'
                return a
            },
            effect() {a=n(15)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(4),
            branches:[51],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',51)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        62: {
            title: "E6-2",
            description() {a="Timeshard Generator multiplier based on DeFe308."
                if(options.Chinese) a='基于DeFe308数量增益时间碎片生成器'
                return a
            },
            effect() {a=n(2).pow(player.df.points)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(100),
            branches:[51],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',51)},
        },
        71: {
            title() {a= "E7-1 Pre-Infinity"
                if(options.Chinese) a='E7-1 时间墙'
                return a
            },
            description() {a="Multiply free PP and PPM based on Timewalls."
                if(options.Chinese) a='基于时间墙数量增益免费点数生产器和点数生产加成器'
                return a
            },
            effect() {a=player.T.points.add(1).pow(0.005)
                if(a.gte('1e50')) a=a.pow(0.25).times(n(10).pow(37.5))
                a=a.min('1e1000')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(3),
            branches:[61],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',61)&&tmp.E.cross1.gt(0)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        81: {
            title() {a= "E8-1 Pre-Infinity"
                if(options.Chinese) a='E8-1 时间墙'
                return a
            },
            description() {a="Multiply Point Producer Multiplier exponent by 1.01."
                if(options.Chinese) a='点数生产加成器指数x1.01'
                return a
            },
            effect() {a=n(1.01)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[71],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',71)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        91: {
            title() {a= "E9-1 Pre-Infinity"
                if(options.Chinese) a='E9-1 时间墙'
                return a
            },
            description() {a="The effect of QqQeInfinity is stronger.(2^(x-1) -> 5^(x-1))"
                if(options.Chinese) a='增强QqQeInfinity的效果（2^(x-1) -> 5^(x-1)）'
                return a
            },
            cost: new Decimal(4),
            branches:[81],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',81)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        101: {
            title() {a= "E10-1 Pre-Infinity"
                if(options.Chinese) a='E10-1 时间墙'
                return a
            },
            description() {a="Each bought Upgrade Points multiply your Point Producer base effect by 1e100, capped at e100,000."
                if(options.Chinese) a='每个购买的升级点数使点数生产器基础效果x1e100，在e100,000处达到上限'
                return a
            },
            effect() {a=n(1e100).pow(getBuyableAmount('E',21).add(getBuyableAmount('E',22)).add(getBuyableAmount('E',23)))
                if(a.gte('e1e5')) a=n(10).pow(a.log(10).div(1e5).pow(0.33).times(1e5))
                if(!hasMilestone('li',5))a=a.min('e1e5')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[91],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',91)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        72: {
            title() {a= "E7-2 Infinity"
                if(options.Chinese) a='E7-2 无限'
                return a
            },
            description() {a="Nerf Infinity Power gain softcap.(^0.5 to ^0.75)"
                if(options.Chinese) a='削弱无限之力获取软上限(^0.5 -> ^0.75)'
                return a
            },
            cost: new Decimal(5),
            branches:[61],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',61)&&tmp.E.cross1.gt(0)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        82: {
            title() {a= "E8-2 Infinity"
                if(options.Chinese) a='E8-2 无限'
                return a
            },
            description() {a="Multiply Infinity Generator Multiplier base effect based on Infinity Power."
                if(options.Chinese) a='基于无限之力增益无限之力加成器基础效果'
                return a
            },
            effect() {a=player.I.ipower.add(1).log(1e100).pow(0.5).add(1).min('1e100')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(4),
            branches:[72],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',72)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        92: {
            title() {a= "E9-2 Infinity"
                if(options.Chinese) a='E9-2 无限'
                return a
            },
            description() {a="The effect of Super-qaqe308 is powered to ^1.5.(Before softcap)"
                if(options.Chinese) a='超qaqe308的效果变为原来的1.5次方(软上限前)'
                return a
            },
            cost: new Decimal(5),
            branches:[82],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',82)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        102: {
            title() {a= "E10-2 Infinity"
                if(options.Chinese) a='E10-2 无限'
                return a
            },
            description() {a="Each bought Upgrade Points multiply your Infinity Generator base effect by 1e6, capped at 1e6000."
                if(options.Chinese) a='每个购买的升级点数使无限生成器基础效果x1e6，在1e6000处达到上限'
                return a
            },
            effect() {a=n(1e6).pow(getBuyableAmount('E',21).add(getBuyableAmount('E',22)).add(getBuyableAmount('E',23)))
                if(a.gte('e6000')) a=n(10).pow(a.log(10).div(6000).pow(0.33).times(6000))
                if(!hasMilestone('li',5))a=a.min('e6000')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[92],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',92)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        73: {
            title() {a= "E7-3 Eternity"
                if(options.Chinese) a='E7-3 永恒'
                return a
            },
            description() {a="Gain free TG based on total Eternity Points."
                if(options.Chinese) a='基于总永恒点数获得免费时间碎片生成器'
                return a
            },
            effect() {a=player.E.total.add(1).pow(0.075)
                return a
            },
            effectDisplay() { return '+'+format(upgradeEffect(this.layer, this.id))},
            cost: new Decimal(5),
            branches:[61],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',61)&&tmp.E.cross1.gt(0)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        83: {
            title() {a= "E8-3 Eternity"
                if(options.Chinese) a='E8-3 永恒'
                return a
            },
            description() {a="Multiply Timeshard Generator Multiplier base effect based on Timeshard effect."
                if(options.Chinese) a='基于时间碎片效果增加时间碎片加成器基础效果'
                return a
            },
            effect() {a=tmp.E.TSeffect.pow(0.05).min('1e12')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[73],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',73)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        93: {
            title() {a= "E9-3 Eternity"
                if(options.Chinese) a='E9-3 永恒'
                return a
            },
            description() {a="The effect of Super-qaqe308 also applies to Timeshard Generator base effect in a reduced rate."
                if(options.Chinese) a='超qaqe308的效果以削弱的效果加成时间碎片加成器基础效果'
                return a
            },
            effect() {a=tmp.Qi.qaqe308eff.pow(0.01).min('1e50')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(4),
            branches:[83],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',83)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        103: {
            title() {a= "E10-3 Eternity"
                if(options.Chinese) a='E10-3 永恒'
                return a
            },
            description() {a="Each bought Upgrade Points multiply your Timeshard Generator base effect by 2, capped at 1e200."
                if(options.Chinese) a='每个购买的升级点数使时间碎片生成器基础效果x2，在1e200处达到上限'
                return a
            },
            effect() {a=n(2).pow(getBuyableAmount('E',21).add(getBuyableAmount('E',22)).add(getBuyableAmount('E',23)))
                if(a.gte('e200')) a=n(10).pow(a.log(10).div(200).pow(0.33).times(200))
                if(!hasMilestone('li',5))a=a.min('e200')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[93],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',93)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        111: {
            title() {a= "E11-1"
                return a
            },
            description() {a="Improve Infinity Points gain formula:(pt/(2^1024))^ ((log<sub>2</sub>10)/b), where b reduces from 1000 to 970."
                if(options.Chinese) a='改善无限点数获取公式:(pt/(2^1024))^ ((log<sub>2</sub>10)/b), 其中b从1000减少到970'
                return a
            },
            cost: new Decimal(12),
            branches:[101,102,103],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',101)||hasUpgrade('E',102)||hasUpgrade('E',103)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        112: {
            title() {a= "E11-2"
                return a
            },
            description() {a="Timeshard Generator multiplier based on Eternity amounts."
                if(options.Chinese) a='基于永恒次数增益时间碎片生成器'
                return a
            },
            effect() {a=n(player.E.etr).add(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(10000),
            branches:[111],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',111)},
        },
        121: {
            title() {a= "E12-1 Active"
                if(options.Chinese) a='E12-1 活跃'
                return a
            },
            description() {a="Multiply EP gain by 50, decaying with time passes in this Eternity."
                if(options.Chinese) a='永恒点数获取x50, 但随本次永恒中的时间流逝衰减'
                return a
            },
            effect() {a=n(50).div(n(player.E.resetTime).div(1800).add(1)).max(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[111],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',111)&&!hasUpgrade('E',122)&&!hasUpgrade('E',123)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        131: {
            title() {a= "E13-1 Active"
                if(options.Chinese) a='E13-1 活跃'
                return a
            },
            description() {
                a="You gain 10% more qaqe308, but Autobuyer and Buymax for qaqe308 and is disabled, and you can't gain DeFe308."
                if(hasUpgrade('li',23))a="You gain 10% more qaqe308, but you can't gain DeFe308."
                if(options.Chinese) {a='qaqe308获取+10%，但禁用自动获取qaqe308与最大化获取qaqe308，且无法获取DeFe308'
                    if(hasUpgrade('li',23))a='qaqe308获取+10%，但你无法获取DeFe308'
                }
                return a
            },
            cost: new Decimal(8),
            branches:[121],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',121)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        141: {
            title() {a= "E14-1 Active"
                if(options.Chinese) a='E14-1 活跃'
                return a
            },
            description() {a="Multiply IP gain by 1e45, decaying with time passes in this Infinity."
                if(options.Chinese) a='无限点数获取x1e45, 但随本次无限中的时间流逝衰减'
                return a
            },
            effect() {a=n(1e45).div(n(player.I.resetTime).add(1).pow(0.25)).div(n(player.I.resetTime).add(2).log(2)).max(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(6),
            branches:[131],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',131)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        122: {
            title() {a= "E12-2 Passive"
                if(options.Chinese) a='E12-2 被动'
                return a
            },
            description() {a="Multiply EP gain by 35."
                if(options.Chinese) a='永恒点数获取x35'
                return a
            },
            effect() {a=n(35)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[111],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',111)&&!hasUpgrade('E',121)&&!hasUpgrade('E',123)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        132: {
            title() {a= "E13-2 Passive"
                if(options.Chinese) a='E13-2 被动'
                return a
            },
            description() {a="Monika Buyables are +15% stronger, and multiply Monika Point gain by 3, ignoring softcaps."
                if(options.Chinese) a='Monika可购买效果+15%，且Monika点数获取x3(无视软上限)'
                return a
            },
            cost: new Decimal(8),
            branches:[122],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',122)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        142: {
            title() {a= "E14-2 Passive"
                if(options.Chinese) a='E14-2 被动'
                return a
            },
            description() {a="Multiply IP gain by 1e30."
                if(options.Chinese) a='无限点数获取x1e30'
                return a
            },
            effect() {a=n(1e30)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(6),
            branches:[132],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',132)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        123: {
            title() {a= "E12-3 Idle"
                if(options.Chinese) a='E12-3 空闲'
                return a
            },
            description() {a="Multiply EP gain based on time in this Eternity, unaffected by Timeshard effect."
                if(options.Chinese) a='基于本次永恒中的时间流逝增强永恒点数获取，不受时间碎片效果影响'
                return a
            },
            effect() {a=n(player.E.resetTime).times(1.37).add(1).pow(0.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            branches:[111],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',111)&&!hasUpgrade('E',122)&&!hasUpgrade('E',121)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        133: {
            title() {a= "E13-3 Idle"
                if(options.Chinese) a='E13-3 空闲'
                return a
            },
            description() {a="Multiply qaqe308 base by (qaqe308 amount)^0.5, but Monika Point gain is divided by 10."
                if(hasUpgrade('li',23))a="Multiply qaqe308 base by (qaqe308 amount)^0.5."
                if(options.Chinese) {a='基于qaqe308数量增强Monika点数获取基数（x^0.5），但Monika点数获取/10'
                    if(hasUpgrade('li',23))a='基于qaqe308数量增强Monika点数获取基数（x^0.5）'
                }
                return a
            },
            effect() {a=player.qa.points.pow(0.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(8),
            branches:[123],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',123)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        143: {
            title() {a= "E14-3 Idle"
                if(options.Chinese) a='E14-3 空闲'
                return a
            },
            description() {a="Multiply IP gain based on time in this Infinity, unaffected by Timeshard effect."
                if(options.Chinese) a='基于本次无限中的时间流逝增强无限点数获取，不受时间碎片效果影响'
                return a
            },
            effect() {a=n(10).pow(n(player.I.resetTime).add(2).log(2).times(n(player.I.resetTime).add(1).pow(0.25)))
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(6),
            branches:[133],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',133)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        151: {
            title() {a= "E15-1"
                return a
            },
            description() {a="Each bought Timeshard Generator multiply Timeshard Generator base effect by 1.25."
                if(options.Chinese) a='每个购买的时间碎片生成器使其基础效果x1.25'
                return a
            },
            effect() {a=n(1.25).pow(getBuyableAmount('E',11))
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(10),
            branches:[141,142,143],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',141)||hasUpgrade('E',142)||hasUpgrade('E',143)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        152: {
            title() {a= "E15-2"
                return a
            },
            description() {a="Multiply Timeshard Multiplier base effect by 2.5."
                if(options.Chinese) a='时间碎片加成器基础效果x2.5'
                return a
            },
            cost: new Decimal(1e10),
            branches:[151],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',151)},
        },
        161: {
            title() {a= "E16-1"
                return a
            },
            description() {a="1e600x multiplier to Point Producer base effect."
                if(options.Chinese) a='点数生产器基础效果x1e600'
                return a
            },
            cost: new Decimal(15),
            branches:[151],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',151)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        162: {
            title() {a= "E16-2"
                return a
            },
            description() {a="1e70x multiplier to Infinity Generator base effect."
                if(options.Chinese) a='无限之力生成器基础效果x1e70'
                return a
            },
            cost: new Decimal(15),
            branches:[151],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',151)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        171: {
            title() {a= "E17-1"
                return a
            },
            description() {a="Raise Monika Point gain to ^1.03."
                if(options.Chinese) a='Monika点数获取^1.03'
                return a
            },
            cost: new Decimal(20),
            branches:[161,162],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',161)||hasUpgrade('E',162)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        181: {
            title() {a= "E18-1"
                return a
            },
            description() {a="Passively gain 1% IP on reset per second."
                if(options.Chinese) a='每秒被动获得1%重置时获得的无限点数'
                return a
            },
            cost: new Decimal(125),
            branches:[171],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',171)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        191: {
            title() {a= "E19-1"
                return a
            },
            description() {a="Gain 5% banked Infinity on Eternity. Banked Infinity persists through Eternity."
                if(options.Chinese) a='永恒时获得5%储存的无限次数，在永恒后保留'
                return a
            },
            cost: new Decimal(15),
            branches:[181],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',181)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        192: {
            title() {a= "E19-2"
                return a
            },
            description() {a="Pick another path from Eternity Upgrades in Rows 7-10."
                if(options.Chinese) a='允许你从第7~10行中再选择一条升级路径进行购买'
                return a
            },
            cost: new Decimal(150),
            branches:[181],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',181)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        193: {
            title() {a= "E19-3"
                return a
            },
            description() {a="Double Eternity gain, and multiply Point Producer base effect based on Eternities, capped at "+format(this.hardcap())+"."
                if(options.Chinese) a='永恒次数获取翻倍，基于永恒次数增益点数生产器基础效果，在'+format(this.hardcap())+'时达到上限'
                return a
            },
            effect() {a=n(100).pow(player.E.etr).min(this.hardcap())
                return a
            },
            hardcap(){a=n('1e5000')
                if(hasUpgrade('cf',51)) a=a.pow(tmp.Qi.QqQeInfeff[0])
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(25),
            branches:[181],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',181)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        201: {
            title() {a= "E20-1"
                return a
            },
            description() {a="Nerf the softcap of IP Doubler.(^0.5 -> ^0.6 after 200)"
                if(options.Chinese) a='削弱IP倍增器在购买200个以上时的软上限（^0.5 -> ^0.6）'
                return a
            },
            cost: new Decimal(40),
            branches:[191],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',191)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        202: {
            title() {a= "E20-2"
                return a
            },
            description() {a="Multiply Point Producer Multiplier exponent based on Timeshard, capped at x1.5."
                if(options.Chinese) a='基于时间碎片增益点数生产加成器指数，在x1.5时达到上限'
                return a
            },
            effect() {a=player.E.timeshard.log(10).add(1).pow(0.01).min(1.5)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(40),
            branches:[191],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',191)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        203: {
            title() {a= "E20-3"
                return a
            },
            description() {a="Multiply Eternity gain by 10, and multiply Infinity gain based on Eternity amount."
                if(options.Chinese) a='永恒次数获取x10，且基于永恒次数提升无限次数'
                return a
            },
            effect() {a=player.E.etr.add(1).pow(3)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(40),
            branches:[193],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',193)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        204: {
            title() {a= "E20-4"
                return a
            },
            description() {a="Square the second effect of Super-QqQeInfinity."
                if(options.Chinese) a='超QqQeInfinity的第二个效果变为原来的平方'
                return a
            },
            cost: new Decimal(40),
            branches:[193],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',193)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        211: {
            title() {a= "E21-1"
                return a
            },
            description() {a="Add 2 to effective DeFe308."
                if(options.Chinese) a='使有效DeFe308增加2'
                return a
            },
            cost: new Decimal(100),
            branches:[201,203],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',201)||hasUpgrade('E',203)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        212: {
            title() {a= "E21-2"
                return a
            },
            description() {a="For each day you played, multiply Timeshard Generator Multiplier base effect by 2, effective day capped at "+format(this.hardcap(),0)+'.'
                if(options.Chinese) a='每玩一天，你的时间碎片生产加成器效果翻倍，在'+format(this.hardcap(),0)+'天时达到上限'
                return a
            },
            hardcap(){return player.A.points.div(10).floor()},
            effect() {b=n(Math.floor(player.timePlayed / 86400)).min(this.hardcap())
                a=n(2).pow(b)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            tooltip(){a='The cap formula: Achievement/10'
                if(options.Chinese) a='上限公式：成就数量/10'
                return a
            },
            cost: new Decimal(1e50),
            branches:[202,203],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',202)||hasUpgrade('E',203)},
        },
        213: {
            title() {a= "E21-3"
                return a
            },
            description() {a="Triple Dilation Point gain."
                if(options.Chinese) a='膨胀点数获取x3'
                return a
            },
            cost: new Decimal(100),
            branches:[202,204],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',202)||hasUpgrade('E',204)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        221: {
            title() {a= "E22-1"
                return a
            },
            description() {a="The effect of T2-2 is a lot stronger."
                if(options.Chinese) a='升级T2-2的效果大幅加强'
                return a
            },
            cost: new Decimal(200),
            branches:[211],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',211)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        222: {
            title() {a= "E22-2"
                return a
            },
            description() {a="The effect of T2-4 is a lot stronger."
                if(options.Chinese) a='升级T2-4的效果大幅加强'
                return a
            },
            cost: new Decimal(200),
            branches:[213],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',213)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        231: {
            title() {a= "E23-1"
                return a
            },
            description() {a="Improve Dilation Point gain formula.<br>After improvement, your DP gain will be multiplied by "+format(this.effect())+'.'
                if(options.Chinese) a='改进膨胀点数获取公式<br>在改进后，你的膨胀点数获取将会x'+format(this.effect())
                return a
            },
            effect() {a=player.li.points.div(256).pow(0.5).max(1)
                return a
            },
            cost: new Decimal(1),
            branches:[221,222],
            unlocked() {return hasMilestone('E',1)},
            canAfford() {return hasUpgrade('E',221)||hasUpgrade('E',222)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        241: {
            title() {a= "E24-1"
                return a
            },
            description() {a="Monika Buyble 1 also applies to Point Producer Multiplier base effect, but weaker.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a='Monika可购买1以削弱的效果作用于点数生产加成器基础效果<br>当前：'+format(this.effect())
                return a
            },
            effect() {a=buyableEffect('qa',11).pow(0.001)
                return a
            },
            cost: new Decimal(66686),
            branches:[231],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',231)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        242: {
            title() {a= "E24-2"
                return a
            },
            description() {a="Monika Buyble 2 also applies to Super-QqQeInfinity generation, but weaker.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a='Monika可购买2以削弱的效果作用于超QqQeInfinity的速度<br>当前：'+format(this.effect())
                return a
            },
            effect() {a=buyableEffect('qa',12).pow(0.01)
                return a
            },
            cost: new Decimal(66686),
            branches:[231],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',231)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        243: {
            title() {a= "E24-3"
                return a
            },
            description() {a="Monika Buyble 3 also applies to Eternity gain, but weaker.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a='Monika可购买3以削弱的效果作用于永恒次数获取<br>当前：'+format(this.effect())
                return a
            },
            effect() {a=buyableEffect('qa',13).pow(0.01)
                return a
            },
            cost: new Decimal(66686),
            branches:[231],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',231)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        244: {
            title() {a= "E24-4"
                return a
            },
            description() {a="Monika Buyble 4 also applies to Eternity Point gain, but weaker.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a='Monika可购买4以削弱的效果作用于永恒点数获取<br>当前：'+format(this.effect())
                return a
            },
            effect() {a=buyableEffect('qa',14).pow(0.01)
                return a
            },
            cost: new Decimal(66686),
            branches:[231],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',231)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        251: {
            title() {a= "E25-1"
                return a
            },
            description() {a="E24-1 also applies to Monika Point gain, ignoring softcaps.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a='上一个升级也作用于Monika点数获取，无视软上限<br>当前：'+format(this.effect())
                return a
            },
            effect() {a=upgradeEffect('E',this.id-10)
                return a
            },
            cost: new Decimal(200000),
            branches:[241],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',this.id-10)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        252: {
            title() {a= "E25-2"
                return a
            },
            description() {a="E24-2 also applies to Timeshard Generator base effect.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a='上一个升级也作用于时间碎片生成器基础效果<br>当前：'+format(this.effect())
                return a
            },
            effect() {a=upgradeEffect('E',this.id-10)
                return a
            },
            cost: new Decimal(200000),
            branches:[242],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',this.id-10)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        253: {
            title() {a= "E25-3"
                return a
            },
            description() {a="E24-3 also applies to Dilation Point gain.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a='上一个升级也作用于膨胀点数获取<br>当前：'+format(this.effect())
                return a
            },
            effect() {a=upgradeEffect('E',this.id-10)
                return a
            },
            cost: new Decimal(200000),
            branches:[243],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',this.id-10)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        254: {
            title() {a= "E25-4"
                return a
            },
            description() {a="E24-4 also applies to I-Upgrade Booster Fragment gain.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a='上一个升级也作用于I-升级增强器碎片获取<br>当前：'+format(this.effect())
                return a
            },
            effect() {a=upgradeEffect('E',this.id-10)
                return a
            },
            cost: new Decimal(200000),
            branches:[244],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',this.id-10)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        261: {
            title() {a= "E26-1"
                return a
            },
            description() {a="Multiply Infinity Exponent Factory effect by 1.05, ignoring softcaps. Also multiply its base effect by 1.5."
                if(options.Chinese) a='无限之力指数因子的效果x1.05，无限软上限，其基础效果x1.5'
                return a
            },
            cost: new Decimal(1000000),
            branches:[251,252,253,254],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',251)||hasUpgrade('E',252)||hasUpgrade('E',253)||hasUpgrade('E',254)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        262: {
            title() {a= "E26-2"
                return a
            },
            description() {a="Unlock Timeshard Exponent Factory, and multiply its effect by 1.05.<br>Buy a TEF to permently unlock it."
                if(options.Chinese) a='解锁时间碎片指数因子，并将其效果x1.05<br>在购买一次时间碎片指数因子后，其将永久解锁'
                return a
            },
            cost: new Decimal(4e6),
            branches:[261],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',261)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        271: {
            title() {a= "E27-1"
                return a
            },
            description() {a="Gain 1.1x more cokecole, and replace the hardcap of 'I4-3 Boost' with softcap."
                if(options.Chinese) a='获得1.1倍的cokecole，并将"I4-3 Boost"中的硬上限替换为软上限'
                return a
            },
            cost: new Decimal(1e8),
            branches:[262],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',262)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
        272: {
            title() {a= "E27-2"
                return a
            },
            description() {a="Unlock [5 hours later]. (Require at least 1.80e308 Eternity Points and 120 Achievements)"
                if(options.Chinese) a='解锁[5小时后更新] (至少需要1.80e308永恒点数与120成就来购买)'
                return a
            },
            cost: new Decimal(1),
            branches:[271],
            unlocked() {return hasMilestone('li',3)},
            canAfford() {return hasUpgrade('E',271)&&player.E.points.gte(n(2).pow(1024))&&player.A.points.gte(120)},
            currencyLocation() {return tmp.E},
            currencyDisplayName: 'Upgrade Points',
            currencyInternalName: 'currentUP',
        },
    },
    challenges:{
        11: {
            name() {a="Eternity Challenge 1"
            if(options.Chinese) a='永恒挑战1'
            return a},
            challengeDescription(){a="Timeshard Generator is disabled.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='时间碎片生成器被禁用<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 2 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 2 未使用的升级点数'
                return a
            },
            rewardDescription(){a="Timeshard effect is improved.<br>Currently：x"+format(this.rewardEffect())
                if(options.Chinese) a='时间碎片效果得到改善<br>当前：x'+format(this.rewardEffect())
                return a
            },
            unlocked(){return hasMilestone('df',2)},
        goal(){
                let a=[n('1e600'),n('e675'),n('e900'),n('e1275'),n('e1800'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(0.1),n(0.2),n(0.3),n(0.4),n(0.5)]
                c=player.E.timeshard
                //if(c.gte('1e500')) c=n(10).pow(c.log(10).div(500).pow(0.5).times(500))
                b=c.pow(a[challengeCompletions(this.layer,this.id)])
                return b
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(2)},
        },
        12: {
            name() {a="Eternity Challenge 2"
            if(options.Chinese) a='永恒挑战2'
            return a},
            challengeDescription(){a="Infinity Generator is disabled.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='无限之力生成器被禁用<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 2 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 2 未使用的升级点数'
                return a
            },
            rewardDescription(){a="Multiply Infinity Generator base effect based on MT-Challenge 1 (Stronger Softcap) completions.<br>Currently：x"+format(this.rewardEffect())
                if(options.Chinese) a='基于巨大时间墙挑战1完成次数增强无限之力生成器基础效果<br>当前：x'+format(this.rewardEffect())
                return a
            },
            unlocked(){return challengeCompletions(this.layer,11)>=2},
        goal(){
                let a=[n('1e500'),n('e525'),n('e600'),n('e900'),n('e1500'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(25),n(40),n(60),n(80),n(100)]
                return n(challengeCompletions('MT',11)).pow(a[challengeCompletions(this.layer,this.id)]).max(1)
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(2)},
        },
        13: {
            name() {a="Eternity Challenge 3"
            if(options.Chinese) a='永恒挑战3'
            return a},
            challengeDescription(){a="Point Exponent Factory and Infinity Exponent Factory base effect is multiplied by 0.5, and Monika Point gain is raised to ^0.5.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='点数指数因子和无限之力指数因子基础效果乘以0.5,且Monika点数获取^0.5<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 3 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 3 未使用的升级点数'
                return a
            },
            rewardDescription(){a="Multiply qaqe308 base.<br>Currently：x"+format(this.rewardEffect())
                if(options.Chinese) a='增加Monika点数获取基数<br>当前：x'+format(this.rewardEffect())
                return a
            },
            unlocked(){return challengeCompletions(this.layer,12)>=2},
        goal(){
                let a=[n('1e100'),n('e300'),n('e500'),n('e750'),n('e1200'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(1),n(1.5),n(2),n(2.5),n(3),n(4)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(3)},
        },
        14: {
            name() {a="Eternity Challenge 4"
            if(options.Chinese) a='永恒挑战4'
            return a},
            challengeDescription(){a="Infinity generation and multiplier is disabled, and you have to reach the goal within certain Infinities.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='无限次数被动生成与倍率被禁用，你必须在一定数量的无限次数内达到目标<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 4 unspent Upgrade Points & no more than "+format(this.goal2(),0)+' Infinities'
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 4 未使用的升级点数 & 不超过 '+format(this.goal2(),0)+' 次无限'
                return a
            },
            rewardDescription(){a="Multiply Infinity gain based on total Infinity Points.<br>Currently：x"+format(this.rewardEffect())
                if(options.Chinese) a='基于总无限点数提升无限次数获取<br>当前：x'+format(this.rewardEffect())
                return a
            },
            unlocked(){return challengeCompletions(this.layer,13)>=2},
        goal(){
                let a=[n('1e800'),n('e1200'),n('e1600'),n('e2750'),n('e3500'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
            goal2(){let a=[n(16),n(8),n(4),n(2),n(0),n(0)]
                return a[challengeCompletions(this.layer,this.id)]},
        rewardEffect() {let a=[n(0),n(0.0025),n(0.005),n(0.007),n(0.009),n(0.01)]
                return player.I.total.add(1).pow(a[challengeCompletions(this.layer,this.id)])
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(4)&&player.I.inf.lte(this.goal2())},
        },
        21: {
            name() {a="Eternity Challenge 5"
            if(options.Chinese) a='永恒挑战5'
            return a},
            challengeDescription(){a="qaqe308 requirement scaling is increased.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='qaqe308需求折算上涨<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 5 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 5 未使用的升级点数'
                return a
            },
            rewardDescription(){a="+10% Monika Buyable strength per completion.<br>Currently：+"+format(this.rewardEffect().times(100))+'%'
                if(options.Chinese) a='每完成一次该挑战，Monika可购买增强+10%<br>当前：+'+format(this.rewardEffect().times(100))+'%'
                return a
            },
            unlocked(){return challengeCompletions(this.layer,14)>=2},
        goal(){
                let a=[n('1e900'),n('e1250'),n('e1700'),n('e2600'),n('e3200'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(0.1),n(0.2),n(0.3),n(0.4),n(0.5)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(5)},
        },
        22: {
            name() {a="Eternity Challenge 6"
            if(options.Chinese) a='永恒挑战6'
            return a},
            challengeDescription(){a="Your Point Exponent Factory effect and Point Producer Multiplier Exponent are always 1.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='你的点数指数因子效果和点数生产加成器指数始终为1<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 100 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 100 未使用的升级点数'
                return a
            },
            rewardDescription(){a="Multiply Point Exponent Factory effect.<br>Currently：x"+format(this.rewardEffect(),4)
                if(options.Chinese) a='倍增点数指数因子效果<br>当前：x'+format(this.rewardEffect(),4)
                return a
            },
            unlocked(){return challengeCompletions(this.layer,21)>=2},
        goal(){
                let a=[n('1e280'),n('e460'),n('e850'),n('e1250'),n('e1500'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(1),n(1.005),n(1.0075),n(1.01),n(1.013),n(1.02)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(100)},
        },
        23: {
            name() {a="Eternity Challenge 7"
            if(options.Chinese) a='永恒挑战7'
            return a},
            challengeDescription(){a="Infinity Power and Timeshard are ineffective, but multiply free Infinity Generator by Timeshard^0.2 and multiply free Point Producer by Infinity Power^0.2.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='无限之力与时间碎片无效果，但是时间碎片倍增免费的无限之力生产器，无限之力倍增免费的点数生产器，效果为各资源的0.2次方<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 50 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 50 未使用的升级点数'
                return a
            },
            rewardDescription(){a="Multiply free Point Producer based on Timeshards.<br>Currently：x"+format(this.rewardEffect())
                if(options.Chinese) a='基于时间碎片增益免费点数生产器<br>当前：x'+format(this.rewardEffect(),4)
                return a
            },
            unlocked(){return challengeCompletions(this.layer,22)>=2},
        goal(){
                let a=[n('1e1660'),n('e2222'),n('e3150'),n('e4000'),n('e5000'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(0.2),n(0.35),n(0.45),n(0.53),n(0.65)]
                return player.E.timeshard.pow(a[challengeCompletions(this.layer,this.id)])
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(50)},
        },
        24: {
            name() {a="Eternity Challenge 8"
            if(options.Chinese) a='永恒挑战8'
            return a},
            challengeDescription(){a="You can't unlock Timewall Power and Q-Upgrade Booster.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='你不能解锁时间墙能量与Q-升级增强器<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 200 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 200 未使用的升级点数'
                return a
            },
            rewardDescription(){a="Multiply I-Upgrade Booster Fragment gain.<br>Currently：x"+format(this.rewardEffect())
                if(options.Chinese) a='倍增I-升级增强器碎片获取<br>当前：x'+format(this.rewardEffect())
                return a
            },
            unlocked(){return challengeCompletions(this.layer,23)>=2},
        goal(){
                let a=[n('1e1500'),n('e2343'),n('e3200'),n('e4600'),n('e6160'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(1),n(1e4),n(1e12),n(1e20),n(1e30),n(1e40)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(200)},
        },
        31: {
            name() {a="Eternity Challenge 9"
            if(options.Chinese) a='永恒挑战9'
            return a},
            challengeDescription(){a="Your Point Exponent Factory effect and IP multiplier exponent are multiplied by a number based on your points, always less than 1.<br>Currently: x"+format(this.inChaleffect(),6)+"<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='你的点数指数因子与无限点数倍率指数被削弱，但是随点数提升而逐渐恢复<br>当前：x'+format(this.inChaleffect(),6)+'<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 30 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 30 未使用的升级点数'
                return a
            },
            rewardDescription(){a="Power Infinity Point multiplier.<br>Currently：^"+format(this.rewardEffect(),3)
                if(options.Chinese) a='指数增益无限点数倍率<br>当前：^'+format(this.rewardEffect(),3)
                return a
            },
            inChaleffect(){a=n(1).sub(player.points.add(1).log(10).add(1).log(10).add(1).pow(-1)).pow(3)
                return a
            },
            unlocked(){return challengeCompletions(this.layer,24)>=2},
        goal(){
                let a=[n('1e1840'),n('e2160'),n('e3000'),n('e4444'),n('e6000'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(1),n(1.005),n(1.01),n(1.015),n(1.02),n(1.025)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(30)},
        },
        32: {
            name() {a="Eternity Challenge 10"
            if(options.Chinese) a='永恒挑战10'
            return a},
            challengeDescription(){a="Infinity Generator and Timeshard Generator are disabled. However, you gain a huge multiplier to Point Producer base effect based on Infinities(^100).<br>Currently: x"+format(this.inChaleffect())+"<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='无限之力生成器与时间碎片生成器被禁用，但基于无限次数大幅提升点数生产器基础效果(^100)<br>当前：x'+format(this.inChaleffect())+'<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 300 unspent Upgrade Points"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 300 未使用的升级点数'
                return a
            },
            rewardDescription(){a="A multiplier to Point Producer base effect based on Infinities.<br>Currently："+format(this.rewardEffect())+'x'
                if(options.Chinese) a='挑战效果也应用于挑战外，但是被削弱了<br>当前：'+format(this.rewardEffect())+'x'
                return a
            },
            inChaleffect(){a=tmp.I.totalInf.add(1).pow(100)
                return a
            },
            unlocked(){return challengeCompletions(this.layer,31)>=2},
        goal(){
                let a=[n('1e2222'),n('e2560'),n('e5600'),n('e7500'),n('e9000'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(0.15),n(0.35),n(0.5),n(0.75),n(1)]
                return this.inChaleffect().pow(a[challengeCompletions(this.layer,this.id)])
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(300)},
        },
        33: {
            name() {a="Eternity Challenge 11"
            if(options.Chinese) a='永恒挑战11'
            return a},
            challengeDescription(){a="All boosts for Producer and Generator (and Multiplier) are disabled except for the effect of timeshard, Infinity Power and Producer/Generator Multiplier.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='所有生产(加成)器的加成被禁用，除了时间碎片、无限之力和生产加成器的效果<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" Infinity Points & 1 unspent Upgrade Point"
                if(options.Chinese) a=''+format(this.goal())+' 无限点数 & 1 未使用的升级点数'
                return a
            },
            rewardDescription(){a="Multiply Dilation Point effect.<br>Currently：x"+format(this.rewardEffect())
                if(options.Chinese) a='倍增膨胀点数效果<br>当前：x'+format(this.rewardEffect())
                return a
            },
            onEnter(){player.devSpeed=n(0)
                player.E.timeshard=n(1)
            },
            unlocked(){return challengeCompletions(this.layer,32)>=2},
        goal(){
                let a=[n('1'),n('e1200'),n('e1600'),n('e2000'),n('e2250'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(1),n(1.1),n(1.21),n(1.33),n(1.46),n(1.6)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&tmp.E.currentUP.gte(1)},
        },
        34: {
            name() {a="Eternity Challenge 12"
            if(options.Chinese) a='永恒挑战12'
            return a},
            challengeDescription(){a="You are trapped in Liuliu66686 Dilation level 3, and the effect of timeshard is fixed at 0.001. You have to reach the goal within certain time.<br>Completion："+challengeCompletions(this.layer,this.id)+"/5"
                if(options.Chinese) a='你被困在三重溜胀中，时间碎片的效果固定为0.001，且你必须在一定时间内完成挑战<br>完成次数：'+challengeCompletions(this.layer,this.id)+"/5"
                return a
            },
            goalDescription(){a = format(this.goal())+" points & 1 unspent Upgrade Point & within "+format(this.goal2(),0)+' seconds'
                if(options.Chinese) a=''+format(this.goal())+' 点数 & 1 未使用的升级点数 & '+format(this.goal2(),0)+' 秒内完成挑战'
                return a
            },
            rewardDescription(){a="Multiply Dilation Point gain.<br>Currently：x"+format(this.rewardEffect())
                if(options.Chinese) a='倍增膨胀点数获取<br>当前：x'+format(this.rewardEffect())
                return a
            },
            onEnter(){player.devSpeed=n(0)
                player.E.timeshard=n(1)
            },
            unlocked(){return challengeCompletions(this.layer,33)>=2},
        goal(){
                let a=[n('1e25'),n('e30'),n('e35'),n('e40'),n('e45'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        goal2(){let a=[n(1000),n(800),n(600),n(300),n(100),n(1)]
                return a[challengeCompletions(this.layer,this.id)]},
        rewardEffect() {let a=[n(1),n(2),n(4),n(16),n(64),n(256)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.points.gte(this.goal())&&tmp.E.currentUP.gte(1)&&n(player.E.resetTime).lte(this.goal2())},
        },
    },
    etrgain(){a=n(1)
        if(hasUpgrade('E',193)) a=a.times(2)
        if(hasUpgrade('E',203)) a=a.times(10)
        if(hasUpgrade('E',243)) a=a.times(upgradeEffect('E',243))

        if(player.R.reb.gte(1)) a=a.times(tmp.R.rebEff[1])
        return a
    },
    EMtip(){a='You have gone Eternity '+format(player.E.etr)+' times.<br/>'
        a=a+'You have spent '+formatTime(player.E.resetTime)+' in this Eternity.<br/>'
        a=a+'Your best Eternity time is '+formatTime(player.E.bestTime)+'.(The first Eternity is not counted in)<br/>'
        a=a+'You will gain '+format(tmp.E.etrgain)+' Eternity(ies) on reset.<br>'
        if(options.Chinese){a='你已经永恒了'+format(player.E.etr)+'次<br/>'
        a=a+'你在本次永恒中花费了'+formatTime(player.E.resetTime)+'<br/>'
        a=a+'你最快的永恒时间为'+formatTime(player.E.bestTime)+'(第一次永恒不计入)<br/>'
        a=a+'在永恒后，你将获得'+format(tmp.E.etrgain)+'次永恒次数<br>'}
        return a
    },
    TGtip(){a="You have <h3 style='color: #b743de; text-shadow: 0 0 3px #c2b280'>" + format(player.E.timeshard) + "</h3> Timeshards, which boost all pre-Eternity resource generation and effective time in the Time-based boosts by " +format(tmp.E.TSeffect)+', ignoring softcaps and exponent.'
        a=a+'<br>Your Eternity amount give your Timeshard Generator a multiplier of x'+format(player.E.etr.times(0.01).min(1))+'.'
        if(options.Chinese){a="你有 <h3 style='color: #b743de; text-shadow: 0 0 3px #c2b280'>" + format(player.E.timeshard) + "</h3> 时间碎片, 使所有永恒前资源生成与基于时间加成中的有效时间x" +format(tmp.E.TSeffect)+'，无视软上限与其他指数'
            a=a+'<br>你的永恒次数使你的时间碎片生成器效果x'+format(player.E.etr.times(0.01).min(1))
        }
        a=a+'<br>('+format(tmp.E.RealTSgen)+'/sec)'
        return a
    },
    TSeffect(){a=n(10).pow(player.E.timeshard.log(10).pow(0.5)).min(player.E.timeshard)
        if(hasChallenge('E',11)) a=a.times(challengeEffect('E',11))
        if(inChallenge('E',11)||inChallenge('E',23)) a=n(1)
        if(inChallenge('E',34)) a=n(0.001)
        return a
    },
    TSgen(){a=buyableEffect('E',11)
        a=a.pow(buyableEffect('E',13))
        //a=a.times(buyableEffect('E',12))
        return a
    },
    RealTSgen(){a=tmp.E.TSgen
        if(tmp.li.dilationLevel.gt(0)&&a.gt(10)) a = n(10).pow(a.log(10).pow(n(0.66686).pow(tmp.li.dilationLevel)))
        return a
    },
    TGmult(){a=player.E.etr.times(0.01).min(1)
        if(hasUpgrade('E',11)) a=a.times(upgradeEffect('E',11))
        if(hasUpgrade('E',34)) a=a.times(upgradeEffect('E',34))
        if(hasUpgrade('E',62)) a=a.times(upgradeEffect('E',62))
        if(hasUpgrade('E',93)) a=a.times(upgradeEffect('E',93))
        if(hasUpgrade('E',103)) a=a.times(upgradeEffect('E',103))
        if(hasUpgrade('E',112)) a=a.times(upgradeEffect('E',112))
        if(hasUpgrade('E',151)) a=a.times(upgradeEffect('E',151))
        if(hasUpgrade('E',252)) a=a.times(upgradeEffect('E',252))

        if(hasUpgrade('cf',24)) a=a.times(upgradeEffect('cf',24))
        if(hasUpgrade('cf',31)) a=a.times(upgradeEffect('cf',31))
        if(hasUpgrade('cf',41)) a=a.times(upgradeEffect('cf',41))

        if(hasUpgrade('li',13)) a=a.times(upgradeEffect('li',13))
        if(hasUpgrade('li',21)) a=a.times(upgradeEffect('li',21))

        if(inChallenge('E',11)) a=a.times(0)
        if(inChallenge('E',32)) a=n(0)

        if(inChallenge('E',33)) a=n(1)

        a=a.times(buyableEffect('E',12))
        return a
    },
    TMbase(){a=n(2)
        if(hasUpgrade('E',83)) a=a.times(upgradeEffect('E',83))
        if(hasUpgrade('E',152)) a=a.times(2.5)
        if(hasUpgrade('E',212)) a=a.times(upgradeEffect('E',212))
        if(inChallenge('E',33)) a=n(2)
        return a
    },
    TEFbase(){a=n(0.01)
        return a
    },
    TEFmult(){a=n(1)
        if(hasUpgrade('E',262)) a=a.times(1.05)
        return a
    },
    FreeTG(){a=n(0)
        if(hasUpgrade('E',73)) a=a.add(upgradeEffect('E',73))
        return a
    },
    EUtip(){a='You can buy Eternity Upgrades through Upgrade Points.<br>You have '+format(tmp.E.currentUP)+'/'+format(tmp.E.totalUPcal)+' Upgrade Points.'
        if(options.Chinese) a='你可以通过升级点数购买永恒升级<br>你有'+format(tmp.E.currentUP)+'/'+format(tmp.E.totalUPcal)+'升级点数'
        return a
    },
    ECtip(){a='You have completed '+format(tmp.E.ECcomp)+' Eternity Challenge Tiers, giving '+format(tmp.E.ECcomp)+' free Upgrade Points.<br>Next Eternity Challenge will be unlocked at 2 completions of the current Eternity Challenges.'
        if(options.Chinese) a='你已经完成了'+format(tmp.E.ECcomp)+'次永恒挑战，给予'+format(tmp.E.ECcomp)+'免费的升级点数<br>每个永恒挑战完成2次后将解锁下一个永恒挑战'
        return a
    },
    totalUPcal(){a=getBuyableAmount('E',21).add(getBuyableAmount('E',22)).add(getBuyableAmount('E',23))
        if(hasMilestone('df',0)) a=a.add(tmp.df.effect[5])
        if(hasUpgrade('li',24)) a=a.add(upgradeEffect('li',24))
        a=a.add(tmp.R.rpEff)
        a=a.add(tmp.E.ECcomp)
        return a
    },
    currentUP(){a=tmp.E.totalUPcal
        //a1=[11,21,22,31,32,33,41,42,51,61,71,72,73,81,82,83,91,92,93,101,102,103,111,121,122,123,131,132,133,141,142,143,151,161,162,171,181,]
        b1=[]
        for (let i = 0; i < player.E.allupg.length; i++) {
            b1.push(tmp.E.upgrades[player.E.allupg[i]].cost)
        }
        for (let i = 0; i < player.E.allupg.length; i++) {
            if(hasUpgrade('E',player.E.allupg[i])) a=a.sub(b1[i])
        }
    return a
    },
    ECcomp(){a=n(0)
        for (let i = 11; i <= 15; i++) {
            a=a.add(challengeCompletions('E',i))
        }
        for (let i = 21; i <= 25; i++) {
            a=a.add(challengeCompletions('E',i))
        }
        for (let i = 31; i <= 35; i++) {
            a=a.add(challengeCompletions('E',i))
        }
        return a},
    cross1(){a=n(1)
        if(hasUpgrade('E',192)){a=a.add(1)
            if(hasUpgrade('li',22)) a=a.add(1)
        }
        for (let i = 71; i <= 74; i++) {
            if(hasUpgrade('E',i)) a=a.sub(1)
        }
        return a
    },
})

addLayer("df", {
    name: "DeFe308", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: n(0),
    }},
    color: "#d8ade6",
    requires(){a = new Decimal(27)
        if(hasUpgrade('E',131)) a=n(1.79e310)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "DeFe308", // Name of prestige currency
    baseResource: "qaqe308", // Name of resource prestige is based on
    baseAmount() {return player.qa.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: n(1.1),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d",
        description: "D: Reset for DeFe308",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked(){return layers[this.layer].layerShown()&&!layers[this.layer].autoPrestige()}},
    ],
    layerShown(){return hasMilestone('E',15)},
    branches: ['E','qa'],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 6) {
    let kept = []
    layerDataReset(this.layer, kept)
       }
    },
    update(diff){
    },
    autoPrestige() {a = false
        return a
    },
    resetsNothing() {return false},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    milestones: {
        0: {
            requirementDescription: "1 DeFe308",
            effectDescription(){a='Get verious boosts based on your number of DeFe308. Currently:<br>'
                a=a+'x'+format(tmp.df.effect[0],3)+' to Point Exponent Factory effect, ignoring softcap<br>'
                a=a+'x'+format(tmp.df.effect[1])+' to Infinity Generator Multiplier base<br>'
                a=a+'x'+format(tmp.df.effect[2])+' to qaqe308 base<br>'
                a=a+'x'+format(tmp.df.effect[3])+' to Timewall Power<br>'
                a=a+'x'+format(tmp.df.effect[4])+' to Eternity Point<br>'
                a=a+'+'+format(tmp.df.effect[5])+' free Upgrade Points<br>'
                a=a+'Your current effective DeFe308 is '+format(tmp.df.effDeF)+'.'
                if(options.Chinese){a='基于DeFe308数量获得各种加成。当前：<br>'
                a=a+'点数指数因子效果x'+format(tmp.df.effect[0],3)+'，无视软上限<br>'
                a=a+'无限之力加成器底数x'+format(tmp.df.effect[1])+'<br>'
                a=a+'Monika点数获取基数x'+format(tmp.df.effect[2])+'<br>'
                a=a+'时间墙能量x'+format(tmp.df.effect[3])+'<br>'
                a=a+'永恒点数x'+format(tmp.df.effect[4])+'<br>'
                a=a+'免费升级点数+'+format(tmp.df.effect[5])+'<br>你当前有效的DeFe308数量为'+format(tmp.df.effDeF)}
                return a
            },
            done() { return player.df.points.gte(1) }
        },
        1: {
            requirementDescription: "4 DeFe308",
            effectDescription(){a='Improve Infinity Points gain formula:(pt/(2^1024))^((log<sub>2</sub>10)/b), where b reduces from 1024 to 1000<br>'
                a=a+'Specifically, for each x10 IP, you need 2^1000 times more points rather than 2^1024.<br>Moreover, keep qaqe308 milestones after row 5 reset.'
                if(options.Chinese){a='改进无限点数获取公式：(pt/(2^1024))^((log<sub>2</sub>10)/b)中的b由1024降低至1000<br>'
                    a=a+'具体来说，点数每翻2^1000倍（先前为2^1024倍），无限点数便翻10倍<br>除此之外，在第五行重置时保留qaqe308里程碑'
                }
                return a
            },
            done() { return player.df.points.gte(4) },
            unlocked() {return true},
        },
        2: {
            requirementDescription: "5 DeFe308",
            effectDescription(){a='Unlock Eternity Challenges.'
                if(options.Chinese)a='解锁永恒挑战'
                return a
            },
            done() { return player.df.points.gte(5) },
            unlocked() {return hasMilestone('df', 1)}
        },
        3: {
            requirementDescription: "7 DeFe308",
            effectDescription(){a='Unlock a new layer.'
                if(options.Chinese)a='解锁一个新的层级'
                return a
            },
            done() { return player.df.points.gte(7) },
            unlocked() {return hasMilestone('df', 2)}
        },
    },
    effect(){a=tmp.df.effDeF.times(0.001).add(1)
        b=tmp.df.effDeF.times(0.1).add(1)
        c=tmp.df.effDeF.times(0.2).add(1)
        d=n(100).pow(tmp.df.effDeF)
        e=n(3).pow(tmp.df.effDeF)
        f=n(2).times(tmp.df.effDeF)
        g=[a,b,c,d,e,f]
        for (let i = 0; i < g.length; i++) {
            g[i]=g[i].pow(gridEffect('li',404))
        }
        return g
    },
    effDeF(){a=player.df.points
        if(hasUpgrade('E',211)) a=a.add(2)
        return a
    },
})

addLayer("cf", {
    name: "Compressed Fragment", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: n(0),
        total: n(0),
        best:n(0),

        IUBF:n(0),
    }},
    color: "#04f2ff",
    requires(){a = new Decimal(1e36)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "Compressed Fragments", // Name of prestige currency
    baseResource: "Fragment Value", // Name of resource prestige is based on
    baseAmount() {return tmp.cf.fragmentValue}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f",
        description: "F: Reset for Compressed Fragment",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked(){return hasMilestone('df',3)}},
    ],
    layerShown(){return hasMilestone('df',3)},
    branches: ['I'],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 6) {
    let kept = []
    layerDataReset(this.layer, kept)
       }
    },
    update(diff){
        if(hasUpgrade('cf',34)) player.cf.IUBF=player.cf.IUBF.add(tmp.cf.IUBFgain.times(diff))
    },
    autoPrestige() {a = false
        return a
    },
    resetsNothing() {return false},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    tabFormat: {
    "Milestones": {
        content: [ "main-display","prestige-button","resource-display",
            "milestones",
        ],
    },
    "Upgrades": {
        content: [ "main-display","prestige-button","resource-display",
            ["upgrades",[1,2,3]],
        ],
        unlocked() {return hasMilestone('cf',1)},
    },
    "I-Upgrade Booster": {
        content: [ "main-display","prestige-button","resource-display",
            ["display-text", () => tmp.cf.IBtip],["buyables",[1]],["upgrades",[4,5]],
    ],
    unlocked(){return hasUpgrade('cf',34)},
    },
    },
    milestones: {
        0: {
            requirementDescription() {a="1 Compressed Fragment"
                if(options.Chinese) a='1 压缩碎片'
                return a
            },
            effectDescription(){a='Q-Upgrade Booster can be bought Infinitely without spending Q-Upgrade Booster Fragments, and each of Q-Upgrade Booster multiply your IP gain by 10. Also, unlock the Autobuyer for Q-Upgrade Booster.'
                a=a+'<br>By the way, Fragment Value is calculated based on your all kinds of Upgrade Booster Fragments.'
                if(options.Chinese){a='Q-升级增强器可以无限购买且不消耗碎片，每个Q-升级增强器使你的无限点数获取x10，同时解锁Q-升级增强器的自动购买器<br>顺便，碎片价值是基于你所有类型的升级增强器碎片计算的'}
                return a
            },
            done() { return player.cf.points.gte(1) },
            toggles:[["I", "QUBauto"]],
        },
        1: {
            requirementDescription() {a="5 Compressed Fragments"
                if(options.Chinese) a='5 压缩碎片'
                return a
            },
            effectDescription(){a='Unlock CF-Upgrades, which have different purchase requirements.'
                if(options.Chinese){a='解锁CF层级的升级，这些升级有着不同的购买条件'}
                return a
            },
            done() { return player.cf.points.gte(5) },
            unlocked() {return hasMilestone('cf',0)},
        },
        2: {
            requirementDescription() {a="Unlock CF1-1"
                if(options.Chinese) a='解锁CF1-1'
                return a
            },
            effectDescription(){a='Reach 1e20000 points without any IP.'
                if(options.Chinese){a='在不获得任何无限点数的情况下达到1e20000点数'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.points.gte('1e20000')&&!player.I.total.gt(0) },
            unlocked() {return hasMilestone('cf',1)},
        },
        3: {
            requirementDescription() {a="Unlock CF1-2"
                if(options.Chinese) a='解锁CF1-2'
                return a
            },
            effectDescription(){a='Have at least 1e36 effective Super-QqQe308 in Eternity Challenge 1.'
                if(options.Chinese){a='在永恒挑战1中超1e36次QqQe308（真实次数）'}
                return a
            },
            done() { return hasMilestone('cf',1)&&tmp.Qi.effQqQe308.gte('1e36')&&inChallenge('E',11) },
            unlocked() {return hasMilestone('cf',1)},
        },
        4: {
            requirementDescription() {a="Unlock CF1-3"
                if(options.Chinese) a='解锁CF1-3'
                return a
            },
            effectDescription(){a='Reach 1e580 Infinity Points without buying any Eternity Upgrade.'
                if(options.Chinese){a='不购买任何永恒升级，达到1e580无限点数'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.I.points.gte('1e580')&&player.E.upgrades.length==0 },
            unlocked() {return hasMilestone('cf',1)},
        },
        5: {
            requirementDescription() {a="Unlock CF1-4"
                if(options.Chinese) a='解锁CF1-4'
                return a
            },
            effectDescription(){a='Reach 90 total Upgrade Points.'
                if(options.Chinese){a='总共有90个升级点数'}
                return a
            },
            done() { return hasMilestone('cf',1)&&tmp.E.totalUPcal.gte(90) },
            unlocked() {return hasMilestone('cf',1)},
        },
        6: {
            requirementDescription() {a="Unlock CF2-1"
                if(options.Chinese) a='解锁CF2-1'
                return a
            },
            effectDescription(){a='Reach 1e144 Monika Points without any Monika Buyables.'
                if(options.Chinese){a='不购买任何Monika可购买，达到1e144 Monika点数'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.qa.monika.gte('1e144')&&player.qa.buyables[11].lte(0)&&player.qa.buyables[12].lte(0)&&player.qa.buyables[13].lte(0)&&player.qa.buyables[14].lte(0) },
            unlocked() {return hasMilestone('cf',1)},
        },
        7: {
            requirementDescription() {a="Unlock CF2-2"
                if(options.Chinese) a='解锁CF2-2'
                return a
            },
            effectDescription(){a='Reach at least 83 Achievements.'
                if(options.Chinese){a='至少获得83个成就'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.A.points.gte(83) },
            unlocked() {return hasMilestone('cf',1)},
        },
        8: {
            requirementDescription() {a="Unlock CF2-3"
                if(options.Chinese) a='解锁CF2-3'
                return a
            },
            effectDescription(){a='Purchase at least 6 CF-Upgrades.'
                if(options.Chinese){a='至少购买6个CF层级的升级'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.cf.upgrades.length>=6 },
            unlocked() {return hasMilestone('cf',1)},
        },
        9: {
            requirementDescription() {a="Unlock CF2-4"
                if(options.Chinese) a='解锁CF2-4'
                return a
            },
            effectDescription(){a='Complete 14 EC tiers.'
                if(options.Chinese){a='完成14个永恒挑战等级'}
                return a
            },
            done() { return hasMilestone('cf',1)&&tmp.E.ECcomp.gte(14) },
            unlocked() {return hasMilestone('cf',1)},
        },
        10: {
            requirementDescription() {a="Unlock CF3-1"
                if(options.Chinese) a='解锁CF3-1'
                return a
            },
            effectDescription(){a='Reach 107107 QqQe308.'
                if(options.Chinese){a='拥有107107 QqQe308'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.Q.points.gte(107107) },
            unlocked() {return hasMilestone('cf',1)},
        },
        11: {
            requirementDescription() {a="Unlock CF3-2"
                if(options.Chinese) a='解锁CF3-2'
                return a
            },
            effectDescription(){a='Have at least 1e18 total EP, no IP, at least 1 Point Producer, and 1e50 ~ 1e500 points after 10 seconds of any reset.'
                if(options.Chinese){a='在任意一次重置10秒后，拥有至少1e18永恒点数，没有无限点数，至少一个点数生产器，并且保持点数大于1e50且小于1e500'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.E.points.gte(1e18)&&player.I.points.eq(0)&&getBuyableAmount('T',11).gte(1)&&player.points.gt(1e50)&&player.points.lt('1e500')&&player.T.resetTime>10 },
            unlocked() {return hasMilestone('cf',1)},
        },
        12: {
            requirementDescription() {a="Unlock CF3-3"
                if(options.Chinese) a='解锁CF3-3'
                return a
            },
            effectDescription(){a='Reach 1.80e308 Monika Points.'
                if(options.Chinese){a='到达1.79e308 Monika点数'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.qa.monika.gte(n(2).pow(1024)) },
            unlocked() {return hasMilestone('cf',1)},
        },
        13: {
            requirementDescription() {a="Unlock CF3-4"
                if(options.Chinese) a='解锁CF3-4'
                return a
            },
            effectDescription(){a='Reach 1e576 Infinity Points, without any Super-man and qaqe308.'
                if(options.Chinese){a='在不超人且没有qaqe308的情况下，获得1e576无限点数'}
                return a
            },
            done() { return hasMilestone('cf',1)&&player.I.points.gte('1e576')&&player.Qi.QqQe308.eq(0)&&player.Qi.cokecole.eq(0)&&player.Qi.qaqe308.eq(0)&&player.qa.points.eq(0) },
            unlocked() {return hasMilestone('cf',1)},
        },
    },
    upgrades: {
        11: {
            title: "CF1-1",
            description() {a="Multiply IP gain based on total Compressed Fragments."
                if(options.Chinese) a='基于总压缩碎片增益无限点数获取'
                return a
            },
            effect() {a=player.cf.total.add(1).pow(10)
                if(a.gte('1e100')) a=a.pow(0.25).times('1e75')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(5),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',2)},
        },
        12: {
            title: "CF1-2",
            description() {a="Multiply the first 3 kinds of Super-man generation speed based on total Compressed Fragments."
                if(options.Chinese) a='基于总压缩碎片增益QqQeInfinity超前3个人的速度'
                return a
            },
            effect() {a=player.cf.total.add(1).pow(8)
                if(a.gte('1e75')) a=a.pow(n(1).div(3)).times('1e50')
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(25),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',3)},
        },
        13: {
            title: "CF1-3",
            description() {a="Each bought Eternity Upgrade multiplies Point Producer and Point Producer Multiplier base effect by 100."
                if(options.Chinese) a='每购买一个永恒升级，点数生产器和点数生产加成器的基础效果x100'
                return a
            },
            effect() {a=n(100).pow(player.E.upgrades.length)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(20),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',4)},
        },
        14: {
            title: "CF1-4",
            description() {a="Raise QUBF gain based on total Compressed Fragments, capped at 1.20."
                if(options.Chinese) a='基于总压缩碎片指数增益Q-升级增强器碎片获取，在^1.20时达到硬上限'
                return a
            },
            effect() {a=n(1).add(player.cf.total.add(1).log(10).pow(0.15).div(100)).min(1.2)
                return a
            },
            effectDisplay() { return '^'+format(upgradeEffect(this.layer, this.id),4)},
            cost: new Decimal(100),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',5)},
        },
        21: {
            title: "CF2-1",
            description() {a="Multiply IP gain based on Monika Points."
                if(options.Chinese) a='基于Monika点数增益无限点数获取'
                return a
            },
            effect() {a=player.qa.monika.add(1).pow(0.1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e6),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',6)},
        },
        22: {
            title: "CF2-2",
            description() {a="Multiply EP gain by the number of Achievements."
                if(options.Chinese) a='基于成就数量增益永恒点数获取'
                return a
            },
            effect() {a=player.A.points
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e7),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',7)},
        },
        23: {
            title: "CF2-3",
            description() {a="Power Timewall gain based on Eternities, capped at 1.10."
                if(options.Chinese) a='基于永恒次数指数增益时间墙获取，在^1.10时达到硬上限'
                return a
            },
            effect() {a=n(1).add(player.E.etr.add(1).log(10).div(1000)).min(1.1)
                return a
            },
            effectDisplay() { return '^'+format(upgradeEffect(this.layer, this.id),4)},
            cost: new Decimal(1e9),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',8)},
        },
        24: {
            title: "CF2-4",
            description() {a="Multiply Timeshard Generator base effect based on total EC completion."
                if(options.Chinese) a='基于永恒挑战完成次数增益时间碎片生成器基础效果'
                return a
            },
            effect() {a=n(10).pow(tmp.E.ECcomp)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e10),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',9)},
        },
        31: {
            title: "CF3-1",
            description() {a="Boost EP gain and Timeshard Generator base effect based on total Compressed Fragments."
                if(options.Chinese) a='基于总压缩碎片增益永恒点数获取与时间碎片生成器基础效果'
                return a
            },
            effect() {a=player.cf.total.add(1).pow(0.1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e24),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',10)},
        },
        32: {
            title: "CF3-2",
            description() {a="The effect of MT-Challenge 'No Side Layer' is powered to ^5 and also applies to Super-cokecole and Super-qaqe308."
                if(options.Chinese) a='巨大时间墙挑战“无支线层级”的效果^5，且同时影响超cokecole与qaqe308的速度'
                return a
            },
            effect() {a=challengeEffect('MT',13)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e29),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',11)},
        },
        33: {
            title: "CF3-3",
            description() {a="Monika Point and Infinity Point boost each other, ignoring Monika Point softcap."
                if(options.Chinese) a='Monika点数与无限点数互相增益，无视Monika点数软上限'
                return a
            },
            effect() {a=player.I.points.pow(0.0075).add(1)
                b=player.qa.monika.pow(0.15).add(1)
                c=[a,b]
                return c
            },
            effectDisplay() { a= format(this.effect()[0])+'x Monika Point, '+format(this.effect()[1])+'x Infinity Point'
                if(options.Chinese) a=format(this.effect()[0])+'x Monika点数, '+format(this.effect()[1])+'x 无限点数'
                return a
            },
            cost: new Decimal(1e35),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',12)},
        },
        34: {
            title: "CF3-4",
            description() {a="Unlock I-Upgrade Booster."
                if(options.Chinese) a='解锁I-升级增强器'
                return a
            },
            cost: new Decimal(1e39),
            unlocked() {return hasMilestone('cf',1)},
            canAfford(){return hasMilestone('cf',13)},
        },
        41: {
            title: "CF4-1",
            description() {a="IUBF boosts IP gain and Timeshard Generator base effect, and unlock EP tripler."
                if(options.Chinese) a='I-升级加成器碎片(IUBF)其增益无限点数获取与时间碎片生成器基础效果，并解锁永恒点数x3可购买'
                return a
            },
            effect() {a=player.cf.IUBF.add(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(1e88),
            unlocked() {return hasUpgrade('cf',34)},
        },
        42: {
            title: "CF4-2",
            description() {a="Fragment Value is multiplied by IUBF."
                if(options.Chinese) a='I-升级加成器碎片也影响碎片价值'
                return a
            },
            cost: new Decimal(1e93),
            unlocked() {return hasUpgrade('cf',34)},
        },
        43: {
            title: "CF4-3",
            description() {a="Each OoM of IUBF makes Monika Buyables 0.2% stronger, capped at +50%."
                if(options.Chinese) a='每个数量级的I-升级加成器碎片使Monika可购买增强0.2%，在+50%时达到硬上限'
                return a
            },
            effect() {a=player.cf.IUBF.add(1).log(10).times(0.002)
                return a
            },
            effectDisplay() { return '+'+format(upgradeEffect(this.layer, this.id).times(100))+'%'},
            cost: new Decimal(1e100),
            unlocked() {return hasUpgrade('cf',34)},
        },
        44: {
            title: "CF4-4",
            description() {a="Multiply IUBF gain by 100."
                if(options.Chinese) a='I-升级加成器碎片获取x100'
                return a
            },
            cost: new Decimal(1e105),
            unlocked() {return hasUpgrade('cf',34)},
        },
        51: {
            title(){a= "More Mechanics I"
                if(options.Chinese) a='更多机制 I'
                return a
            },
            description() {a="Unlock Super-QqQeInfinity. The generation speed of it is not affected by Timeshard."
                if(options.Chinese) a='解锁QqQeInfinity超QqQeInfinity的功能，其速度不受时间碎片影响'
                return a
            },
            cost: new Decimal(1e108),
            tooltip(){a='Require at least 34 EC tiers completed'
                    if(options.Chinese) a='需要完成至少34次永恒挑战'
                return a
            },
            unlocked() {return hasUpgrade('cf',44)},
            canAfford(){return tmp.E.ECcomp.gte(34)},
        },
        52: {
            title(){a= "More Mechanics II"
                if(options.Chinese) a='更多机制 II'
                return a
            },
            description() {a="Unlock Liuliu66686."
                if(options.Chinese) a='解锁Liuliu66686'
                return a
            },
            cost: new Decimal(1e122),
            tooltip(){a='Require at least 2 EC10 completion'
                    if(options.Chinese) a='需要完成至少2次永恒挑战10'
                return a
            },
            unlocked() {return hasUpgrade('cf',51)},
            canAfford(){return n(challengeCompletions('E',32)).gte(2)},
        },
    },
        buyables: {
        11: {
            title(){text = 'Buy a I-Upgrade Booster'
                    if(options.Chinese) text='购买一个I-升级增强器'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+'/12.00'
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e10).pow(x) },
            effect(x) {a=n(10).pow(x)
                if(a.gte(1e200)) a=n(10).pow(n(200).times(x.div(200).pow(0.5)))
                    return a
            },
            display() { a="Get a I-Upgrade Booster per purchase"
                //if(hasMilestone('cf',0)) {a=a+'<br/>Also multiply IP gain by 10 per purchase'
                    //a=a+"<br/>Currently: "+format(this.effect())+'x'
                    //if(getBuyableAmount(this.layer,this.id).gte(200)) a=a+'(softcapped)'
                //}
                a=a+"<br/>Cost: "+format(this.cost())+' I-Upgrade Booster Fragment'
                if(options.Chinese) {a="每次购买获得一个I-升级增强器"
                //if(hasMilestone('cf',0)) {a=a+'<br/>每次购买也使无限点数获取x10<br/>当前: '+format(this.effect())+'x'
                    //if(getBuyableAmount(this.layer,this.id).gte(200)) a=a+'（受软上限限制）'
                //}
                    a=a+"<br/>花费: "+format(this.cost())+' I-升级增强器碎片'}
            return a},
            unlocked() {return hasUpgrade('cf',34)},
            canAfford() { return player.cf.IUBF.gte(this.cost()) },
            purchaseLimit() {a = n(12)
                //if(hasMilestone('cf',0)) a = n(1.79e309)
                    return a
            },
            buy() {
                player.cf.IUBF = player.cf.IUBF.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.I.QUBF.max(0.1).log(10)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        12: {
            title(){text = 'EP Tripler'
                    if(options.Chinese) text='永恒点数x3'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e5).pow(x) },
            effect(x) {a=n(3).pow(x)
                    return a
            },
            display() { a="Multiply EP gain by 3 per purchase"
                //if(hasMilestone('cf',0)) {a=a+'<br/>Also multiply IP gain by 10 per purchase'
                    a=a+"<br/>Currently: "+format(this.effect())+'x'
                    //if(getBuyableAmount(this.layer,this.id).gte(200)) a=a+'(softcapped)'
                //}
                a=a+"<br/>Cost: "+format(this.cost())+' I-Upgrade Booster Fragment'
                if(options.Chinese) {a="每次购买使永恒点数获取x3"
                    a=a+'当前: '+format(this.effect())+'x'
                //if(hasMilestone('cf',0)) {a=a+'<br/>每次购买也使无限点数获取x10<br/>当前: '+format(this.effect())+'x'
                    //if(getBuyableAmount(this.layer,this.id).gte(200)) a=a+'（受软上限限制）'
                //}
                    a=a+"<br/>花费: "+format(this.cost())+' I-升级增强器碎片'}
            return a},
            unlocked() {return hasUpgrade('cf',41)},
            canAfford() { return player.cf.IUBF.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                //if(hasMilestone('cf',0)) a = n(1.79e309)
                    return a
            },
            buy() {
                player.cf.IUBF = player.cf.IUBF.sub(this.cost())
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
    fragmentValue(){a=player.I.QUBF.max(1)
        if(hasUpgrade('cf',42)) a=a.times(player.cf.IUBF.add(1))
        return a
    },
    IBtip(){a="You have <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(player.cf.IUBF,4)+"</h3> I-Upgrade Booster Fragments."
        a=a+"<br>You produce <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.cf.IUBFgain,4)+"</h3> I-Upgrade Booster Fragments per second based on your Q-Upgrade Booster Fragment and Compressed Fragment."
        //if(getBuyableAmount('I',61).gte(8)) {a=a+'<br>When all Q-Upgrade Boosters are bought, your extra QUBF multiply your IP and Timewall Power gain by '+format(tmp.I.QUBFeff)+'.'
        //if(player.I.QUBF.gte(1e10)) a=a+'(capped)'}
        if(options.Chinese) {a="你有 <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(player.cf.IUBF,4)+"</h3> I-升级增强器碎片<br/>"
        a=a+"基于你的Q-升级增强器碎片与压缩碎片，你每秒生产 <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.cf.IUBFgain,4)+"</h3> I-升级增强器碎片<br/>"
        //if(getBuyableAmount('I',61).gte(8)) {a=a+'当所有Q-升级增强器都购买后，额外的Q-升级增强器碎片将使你的无限点数和时间墙能量获取x'+format(tmp.I.QUBFeff)+'.'
        //if(player.I.QUBF.gte(1e10)) a=a+'（已达到上限）'}
        }
        if(!hasUpgrade('cf',34)) a=''
        return a
    },
    IUBFgain(){a=player.I.QUBF.times(player.cf.points.pow(2)).div('1e275')
        if(a.gt(1)) a=a.pow(0.01)
        if(hasChallenge('E',24)) a=a.times(challengeEffect('E',24))
        if(hasUpgrade('cf',44)) a=a.times(100)
        if(hasUpgrade('E',254)) a=a.times(upgradeEffect('E',254))
        return a
    },
})

addLayer("li", {
    name: "Liuliu66686", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Li", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: n(0),
        //total: n(0),
        best:n(0),

        dilpoint:n(0),
        effGrid:[101,102,103,104,105,202,303,404,505,201,301,401,501],
        boostGrid:[0,501,501,501,0,505,505,505,0,105,105,105,0],
        preGrid:[0,101,102,103,104,101,202,303,404,101,201,301,401],
        chosenGrid:0,
    }},
    color: "#7c7c7c",
    requires(){a = new Decimal(1e36)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "Liuliu66686 Points", // Name of prestige currency
    //baseResource: "point", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        //{key: "c",
       // description: "C: Reset for Compressed Fragment",
        //onPress(){if (canReset(this.layer)) doReset(this.layer)},
    //unlocked(){hasMilestone('df',3)}},
    ],
    layerShown(){return hasUpgrade('cf',52)},
    branches: ['E'],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row == 6) {
    let kept = []
    layerDataReset(this.layer, kept)
       }
    },
    update(diff){
        player.li.dilpoint=player.li.dilpoint.add(tmp.li.effect.times(diff))

        if(tmp.li.unspentDvP.lt(0)) {confirm("Your Divinity Power is negative! You will be forced to do an Eternity reset to reset it!")
            resetDvp()
        }
    },
    autoPrestige() {a = false
        return a
    },
    resetsNothing() {return false},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    tabFormat: {
    "Dilation": {
        content: [ "main-display","prestige-button","resource-display",
            ["clickables",[1]],["display-text", () => tmp.li.dptext],['buyables',[1]],["upgrades",[1,2,3]],
        ],
        unlocked() {return hasUpgrade('cf',52)},
    },
    "Divinity Power": {
        content: [ "main-display","prestige-button","resource-display",
            ["clickables",[1]],["display-text", () => tmp.li.dptext],['buyables',[2]],["display-text", () => tmp.li.dvptext],'grid',["display-text", () => tmp.li.dvpuShow],["clickables",[2]],
        ],
        unlocked() {return hasUpgrade('li',31)},
    },
    "DvP Milestones": {
        content: [ "main-display","prestige-button","resource-display",
            ["clickables",[1]],'milestones',
        ],
        unlocked() {return hasUpgrade('li',31)},
    },
    },
    milestones: {
        0: {
            requirementDescription() {a="1 Total Divinity Power"
                if(options.Chinese) a='总计1神权'
                return a
            },
            effectDescription() {a="Compressed Timewalls are always their cap, and multiply Point Producer base effect by 1e2500 per Divinity Power.<br>Currently: x"+format(tmp.li.mil0eff)
                if(options.Chinese) a="压缩时间墙总是设为它的上限，每个神权使点数生产器基础效果x1e2500<br>当前：x"+format(tmp.li.mil0eff)
                return a
            },
            done() { return getBuyableAmount('li',21).gte(1) },
        },
        1: {
            requirementDescription() {a="4 Total Divinity Power"
                if(options.Chinese) a='总计4神权'
                return a
            },
            effectDescription() {a="Multiply Dilation Point gain by your total DvP amounts, but only in Liuliu66686 Dilation.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a="仅在溜胀中膨胀点数获取乘以总神权数量<br>当前: x"+format(this.effect())
                return a
            },
            effect(){a =getBuyableAmount('li',21).max(1)
                if(hasMilestone('Q',9)) a=a.pow(milestoneEffect('Q',9))
                return a
            },
            done() { return getBuyableAmount('li',21).gte(4) },
            unlocked(){return hasMilestone('li',0)},
        },
        2: {
            requirementDescription() {a="5 Total Divinity Power & get 'We all make miskate' achievement"
                if(options.Chinese) a='总计5神权 & 获得"我们都会范错" 成就'
                return a
            },
            effectDescription() {a="Resetting DvP Upgrade no longer resets Liuliu66686 Points."
                if(options.Chinese) a="重置神权升级不再重置溜溜点数"
                return a
            },
            done() { return getBuyableAmount('li',21).gte(5)&&hasAchievement('A',234) },
            unlocked(){return hasMilestone('li',1)},
        },
        3: {
            requirementDescription() {a="6 Total Divinity Power"
                if(options.Chinese) a='总计6神权'
                return a
            },
            effectDescription() {a="Unlock more Eternity Upgrades."
                if(options.Chinese) a="解锁更多的永恒升级"
                return a
            },
            done() { return getBuyableAmount('li',21).gte(6)},
            unlocked(){return hasMilestone('li',2)},
        },
        4: {
            requirementDescription() {a="7 Total Divinity Power"
                if(options.Chinese) a='总计7神权'
                return a
            },
            effectDescription() {a="The effects of D1-x (x=2,3,4) are raised to the power of 1.1."
                if(options.Chinese) a="膨胀升级D1-x (x=2,3,4) 的效果变为原来的1.1次方"
                return a
            },
            done() { return getBuyableAmount('li',21).gte(7)},
            unlocked(){return hasMilestone('li',3)},
        },
        5: {
            requirementDescription() {a="8 Total Divinity Power"
                if(options.Chinese) a='总计8神权'
                return a
            },
            effectDescription() {a="Replace the hardcaps of upgrade E10-x (x=1,2,3) with softcaps, and unlock more QqQe308 milestones."
                if(options.Chinese) a="升级E10-x (x=1,2,3) 的硬上限变为软上限，并解锁更多QqQe308里程碑"
                return a
            },
            done() { return getBuyableAmount('li',21).gte(8)},
            unlocked(){return hasMilestone('li',4)},
        },
        6: {
            requirementDescription() {a="9 Total Divinity Power"
                if(options.Chinese) a='总计9神权'
                return a
            },
            effectDescription() {a="Multiply Infinity Generator Multiplier base effect based on total Divinity Power.<br>Currently: x"+format(this.effect())
                if(options.Chinese) a="基于总计神权数量增益无限之力加成器基础效果<br>当前: x"+format(this.effect())
                return a
            },
            effect(){a=n(10).pow(getBuyableAmount('li',21).div(2))
                return a
            },
            done() { return getBuyableAmount('li',21).gte(8)},
            unlocked(){return hasMilestone('li',4)},
        },
    },
    upgrades: {
        11: {
            title: "D1-1",
            description() {a="Double the effect of Dilation Point."
                if(options.Chinese) a='膨胀点数的效果翻倍'
                return a
            },
            cost: new Decimal(5e5),
            unlocked() {return hasUpgrade('cf',52)},
            canAfford() {return true},
            tooltip(){
                t=this.cost.sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyLocation() {return player.li},
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
        12: {
            title: "D1-2",
            description() {a="Multiply Point Producer base effect based on Dilation Point."
                if(options.Chinese) a='基于膨胀点数提升点数生产器基础效果'
                return a
            },
            cost: new Decimal(7.5e6),
            unlocked() {return hasUpgrade('cf',52)},
            effect() {a=player.li.dilpoint.add(1).pow(500)
                if(hasMilestone('li',4)) a=a.pow(1.1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            canAfford() {return true},
            currencyLocation() {return player.li},
            tooltip(){
                t=this.cost.sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
        13: {
            title: "D1-3",
            description() {a="Multiply free Point Producer and Timeshard Generator base effect based on Dilation Point."
                if(options.Chinese) a='基于膨胀点数增益免费点数生产器数量与时间碎片生产器基础效果'
                return a
            },
            cost: new Decimal(2.5e7),
            unlocked() {return hasUpgrade('cf',52)},
            effect() {a=player.li.dilpoint.add(1).pow(7)
                if(hasMilestone('li',4)) a=a.pow(1.1)
                //if(inChallenge('E',33)) a=a.pow(0.2)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            canAfford() {return true},
            tooltip(){
                t=this.cost.sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyLocation() {return player.li},
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
        14: {
            title: "D1-4",
            description() {a="Multiply Super-QqQeInfinity generation speed based on Dilation Point."
                if(options.Chinese) a='基于膨胀点数增益超QqQeInfinity的速度'
                return a
            },
            cost: new Decimal(5e8),
            unlocked() {return hasUpgrade('cf',52)},
            effect() {a=player.li.dilpoint.add(1).pow(2)
                if(hasMilestone('li',4)) a=a.pow(1.1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            canAfford() {return true},
            tooltip(){
                t=this.cost.sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyLocation() {return player.li},
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
        21: {
            title: "D2-1",
            description() {a="Multiply Timeshard Generator base effect based on Timewall Power, softcapped at 1e500."
                if(options.Chinese) a='基于时间墙能量提升时间碎片生产器基础效果'
                return a
            },
            cost: new Decimal(3e9),
            unlocked() {return hasUpgrade('cf',52)},
            effect() {a=player.I.tpower.add(1).pow(0.1)
                if(a.gte('1e500')) a=a.pow(0.5).times(1e250)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            canAfford() {return true},
            tooltip(){
                t=this.cost.sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyLocation() {return player.li},
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
        22: {
            title: "D2-2",
            description() {a="If E19-2 is bought, you can pick all path from Eternity Upgrades in Rows 7-10."
                if(options.Chinese) a='当购买升级E19-2后，你将能购买永恒升级第7~10行的所有升级'
                return a
            },
            cost: new Decimal(5e10),
            unlocked() {return hasUpgrade('cf',52)},
            canAfford() {return true},
            tooltip(){
                t=this.cost.sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyLocation() {return player.li},
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
        23: {
            title: "D2-3",
            description() {a="Remove the side effect of E13-1 and E13-3. (You still can't get DeFe308 with E13-1)"
                if(options.Chinese) a='移除升级E13-1与E13-3的副作用（你仍然不能在购买E13-1的情况下获得DeFe308）'
                return a
            },
            cost: new Decimal(1e11),
            unlocked() {return hasUpgrade('cf',52)},
            canAfford() {return true},
            tooltip(){
                t=this.cost.sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyLocation() {return player.li},
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
        24: {
            title: "D2-4",
            description() {a="Get free Upgrade Points based on best Liuliu66686 Points."
                if(options.Chinese) a='基于最高溜溜点数获得免费的升级点数'
                return a
            },
            cost: new Decimal(5e12),
            unlocked() {return hasUpgrade('cf',52)},
            effect() {a=player.li.best.pow(0.5)
                if(a.eq(0)) a=player.li.points.pow(0.5)
                return a
            },
            effectDisplay() { return '+'+format(upgradeEffect(this.layer, this.id))},
            canAfford() {return true},
            tooltip(){
                t=this.cost.sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyLocation() {return player.li},
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
        31: {
            title: "D3-1",
            description() {a="Unlock Divinity Power (Require 1e15 Dilation Points)."
                if(options.Chinese) a='解锁神权（需要1e15膨胀点数）'
                return a
            },
            cost: new Decimal(0),
            unlocked() {return hasUpgrade('cf',52)},
            canAfford() {return player.li.dilpoint.gte(1e15)},
            tooltip(){
                t=n(1e15).sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||hasUpgrade(this.layer,this.id)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            currencyLocation() {return player.li},
            currencyDisplayName: 'Dilation Points',
            currencyInternalName: 'dilpoint',
        },
    },
    buyables: {
        11: {
            title(){text = 'DP Doubler'
                if(options.Chinese) text='膨胀点数倍增器'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(10).pow(x.add(4)) },
            base(){a=n(2).add(gridEffect('li',202))
                return a
            },
            effect(x) {
                a=n(this.base()).pow(x)
                    return a
            },
            display() { a="Multiply DP gain by "+format(this.base())+"<br/>Effect:"+format(this.effect())+'x'
                a=a+"<br/>Cost: "+format(this.cost())+' Dilation Points'
                if(options.Chinese) {a="膨胀点数获取量x"+format(this.base())+"<br/>效果:"+format(this.effect())+'x'
                a=a+"<br/>花费: "+format(this.cost())+' 膨胀点数'}
            return a},
            unlocked() {return hasUpgrade('cf',52)},
            canAfford() { return player.li.dilpoint.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            tooltip(){
                t=this.cost().sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            buy() {
                player.li.dilpoint = player.li.dilpoint.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.li.dilpoint.max(1).log(10).sub(4)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        12: {
            title(){text = 'Formula Improver'
                if(options.Chinese) text='公式改进器'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+'/8.00)'
                return text
            },
            cost(x) { return new Decimal(1e3).pow(x.add(2)) },
            effect(x) {
                a=n(10).sub(x)
                    return a
            },
            display() { a="Improve DP effect formula, but reset Dilation Point<br/>Currently: (log<sub>"+format(this.effect(),0)+'</sub>(DP+1)+1)<sup>0.5</sup>'
                if(getBuyableAmount(this.layer,this.id).lt(8)) a=a+'<br>Next level: (log<sub>'+format(this.effect().sub(1),0)+'</sub>(DP+1)+1)<sup>0.5</sup>'
                a=a+"<br/>Cost: "+format(this.cost())+' Dilation Points'
                if(options.Chinese) {a="改进膨胀点数效果公式，但是重置膨胀点数<br/>当前: (log<sub>"+format(this.effect(),0)+'</sub>(DP+1)+1)<sup>0.5</sup>'
                if(getBuyableAmount(this.layer,this.id).lt(8)) a=a+'<br>下一级: (log<sub>'+format(this.effect().sub(1),0)+'</sub>(DP+1)+1)<sup>0.5</sup>'
                a=a+"<br/>花费: "+format(this.cost())+' 膨胀点数'}
            return a},
            unlocked() {return hasUpgrade('cf',52)},
            canAfford() { return player.li.dilpoint.gte(this.cost()) },
            purchaseLimit() {a = n(8)
                    return a
            },
            tooltip(){
                t=this.cost().sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||t.lte(0)||getBuyableAmount(this.layer,this.id).gte(8)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            buy() {
                player.li.dilpoint = n(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.li.dilpoint.max(1).log(1000).sub(2)
					let target = tempBuy.plus(1).floor().min(8);
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        13: {
            title(){text = 'LP Tripler'
                if(options.Chinese) text='溜溜点数倍增器'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(100).pow(x).times(1e8) },
            effect(x) {
                a=n(3).pow(x)
                    return a
            },
            display() { a="Multiply LP gain by "+format(3)+"<br/>Effect:"+format(this.effect())+'x'
                a=a+"<br/>Cost: "+format(this.cost())+' Dilation Points'
                if(options.Chinese) {a="溜溜点数获取量x"+format(3)+"<br/>效果:"+format(this.effect())+'x'
                a=a+"<br/>花费: "+format(this.cost())+' 膨胀点数'}
            return a},
            unlocked() {return hasUpgrade('cf',52)},
            canAfford() { return player.li.dilpoint.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            tooltip(){
                t=this.cost().sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTime(t)
                return a
            },
            buy() {
                player.li.dilpoint = player.li.dilpoint.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.li.dilpoint.max(1).div(1e8).max(1).log(100)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        21: {
            title(){text = 'Divinity Power'
                if(options.Chinese) text='神权'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                text=text+')'
                return text
            },
            cost(x) { a=new Decimal(10).pow(n(x).times(x.add(1)).div(2)).times(1e15)
                return a
             },
            effect(x) {
                a=x
                    return a
            },
            display() { a='Get 1 Divinity Power per purchase'
                a=a+"<br/>Cost: "+format(this.cost())+' Dilation Points'
                if(options.Chinese) {a='每次购买获得一个神权'
                a=a+"<br/>花费: "+format(this.cost())+' 膨胀点数'}
            return a},
            tooltip(){
                t=this.cost().sub(player.li.dilpoint).div(tmp.li.effect)
                if(tmp.li.effect.eq(0)||t.lte(0)) return ''
                a='Time remaining: '
                if(options.Chinese) a='预计所需时间：'
                a=a+formatTimeR(t)
                return a
            },
            unlocked() {return hasUpgrade('li',31)},
            canAfford() { return player.li.dilpoint.gte(this.cost()) },
            purchaseLimit() {a = n(1.79e309)
                    return a
            },
            buy() {
                player.li.dilpoint = player.li.dilpoint.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					//if (!this.canAfford()) return;
					//let tempBuy = player.li.dilpoint.div(1e15).max(1).log(10).pow(2)
					//let target = tempBuy.plus(1).floor();
					//player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
            style: {'height':'100px','width':'250px'},
        },
    },
    clickables:{
        11: {
            title() {a="Enter"
                if(getClickableState(this.layer,this.id)==1) a='Exit'
                a=a+' Liuliu66686 Dilation'
                if(options.Chinese) {a="进入"
                if(getClickableState(this.layer,this.id)==1) a='退出'
                a=a+'溜胀'}
                return a
            },
            display() {a="Your Liuliu66686 Dilation level is "+format(tmp.li.dilationLevel)
                a=a+".<br>In Liuliu66686 Dilation, the exponent of your points, Timewall, Super Timewall, Mega Timewall, Infinite Power, and Timeshards is powered to ^0.66686 per Liuliu Dilation level!"
                if(getClickableState(this.layer,this.id)==1)a=a+'<br>You can gain '+format(tmp.li.LPformula)+' Liuliu66686 Points if you exit Dilation now.'
                if(options.Chinese) {a='你的溜胀等级为'+format(tmp.li.dilationLevel)
                a=a+'<br>在溜胀中，每个溜胀等级将使你的点数、前3种时间墙、无限之力与时间碎片的指数变为原来的0.66686次方！'
                if(getClickableState(this.layer,this.id)==1)a=a+'<br>现在退出膨胀，你将获得'+format(tmp.li.LPformula)+'溜溜溜达嘿点数'
                }
                return a
            },
            canClick() {return true},
            onClick() {if(getClickableState(this.layer,this.id)==1) addPoints('li',tmp.li.LPformula)
                setClickableState(this.layer,this.id,1-getClickableState(this.layer,this.id))
                doReset('E',player.I.points.lt(n(2).pow(1024)))
                player.devSpeed=n(0)
            },
            style: {'height':'200px','width':'300px'},
        },
        21: {
            title() {a="Buy This Upgrade"
                if(options.Chinese) {a="购买这一升级"}
                return a
            },
            display() {a="Cost: 1 Divinity Power"
                if(options.Chinese) {a='花费：1神权'
                }
                return a
            },
            canClick() {for (let i = 0; i < player.li.effGrid.length; i++) {
            if(player.li.chosenGrid == player.li.effGrid[i]) {a= getGridData('li',player.li.chosenGrid)<5&&tmp.li.unspentDvP.gte(1)
            if(player.li.preGrid[i]!==0)a=a&&getGridData('li',player.li.preGrid[i])>0
            return a}
        }},
            onClick() {setGridData(this.layer, player.li.chosenGrid, getGridData('li',player.li.chosenGrid)+1)
            },
            //style: {'height':'200px','width':'300px'},
        },
        22: {
            title() {a="Reset DvP Upgrade"
                if(options.Chinese) {a="重置神权升级"}
                return a
            },
            display() {a="But do an Eternity reset instantly, and reset your Liuliu66686 Points and Dilation Points!"
                if(options.Chinese) {a='但是立刻进行一次永恒，并重置溜溜点数与膨胀点数！'
                }
                return a
            },
            canClick() {return true},
            onClick() {if (!confirm("Are you sure you want to reset your DvP upgrade?")) return
            resetDvp()
            },
            //style: {'height':'200px','width':'300px'},
        },
    },
    grid: {
    rows: 5, // If these are dynamic make sure to have a max value as well!
    cols: 5,
    getStartData(id) {
        return 0
    },
    getUnlocked(id) { // Default
        return true
    },
    getStyle(data, id){
        for (let i = 0; i < player.li.effGrid.length; i++) {
            if(id == player.li.chosenGrid) return {'background-color':"#d24aff"}
        }
    },
    getCanClick(data, id) {
        for (let i = 0; i < player.li.effGrid.length; i++) {
            if(id == player.li.effGrid[i]) return true
        }
    },
    getEffect(data, id){switch (id) {
        case 101:
            return player.E.points.max(1).log(10).times(0.01).add(1).pow(n(data).times(gridEffect('li',501)));
        case 102:
            return n(1).sub(n(data).times(gridEffect('li',501)).times(0.01));
        case 103:
            return n(1).add(n(data).times(gridEffect('li',501)).times(0.2));
        case 104:
            return tmp.E.totalUPcal.max(1).pow(n(data).times(gridEffect('li',501)).times(0.1));
        case 105:
            return n(1).add(n(data).times(0.2));
        case 202:
            return n(data).times(gridEffect('li',505)).times(0.1);
        case 303:
            return n(data).times(gridEffect('li',505)).times(0.1);
        case 404:
            return n(1).add(n(data).times(gridEffect('li',505)).times(0.08));
        case 505:
            return n(1).add(n(data).times(0.2));
        case 201:
            return n(1).add(n(data).times(gridEffect('li',105)).times(0.1));
        case 301:
            return n(1).add(n(data).times(gridEffect('li',105)).times(0.2));
        case 401:
            return n(2).pow(n(data).times(gridEffect('li',105)).times(0.1)).pow(player.df.points);
        case 501:
            return n(1).add(n(data).times(0.2));
    }},
    onClick(data, id) { 
        //player[this.layer].grid[id]++
        player.li.chosenGrid=id
    },
    getDisplay(data, id) {
        for (let i = 0; i < player.li.effGrid.length; i++) {
            if(id == player.li.effGrid[i]){a='<h2>'+data
                if(player.li.boostGrid[i]!==0&&getGridData('li',player.li.boostGrid[i])>0) a=a+'x'+format(gridEffect('li',player.li.boostGrid[i]),1)+'<br>='+format(n(data).times(gridEffect('li',player.li.boostGrid[i])),1)
                a=a+'</h2>'
            return a}
        }
    },
    },
    effect(){a=player.li.points
        a=a.times(buyableEffect('li',11))
        if(hasUpgrade('E',213)) a=a.times(3)
        if(hasChallenge('E',34)) a=a.times(challengeEffect('E',34))
        if(hasUpgrade('E',231)) a=a.times(upgradeEffect('E',231))
        if(hasUpgrade('E',253)) a=a.times(upgradeEffect('E',253))

        a=a.times(gridEffect('li',101))
        a=a.times(gridEffect('li',104))
        a=a.times(gridEffect('li',401))

        if(player.R.reb.gte(1)) a=a.times(tmp.R.rebEff[3])

        if(hasMilestone('li',1)&&tmp.li.dilationLevel.gt(0)) a=a.times(milestoneEffect('li',1))
        return a
    },
    effectDescription(){a='producing '+format(this.effect())+' Dilation Points per second.'
        if(options.Chinese) a='每秒生产'+format(this.effect())+'膨胀点数'
        return a
    },
    dilationLevel(){a=n(getClickableState(this.layer,11))
        if(inChallenge('E',34)) a=a.add(3)

        a=a.times(gridEffect('li',102))
        return a
    },
    LPformula(){if(tmp.li.dilationLevel.eq(0)) return n(0)
        a=player.points.add(1).log(100).div(100).pow(2)
        a=a.times(buyableEffect('li',13))
        a=a.sub(player.li.points).max(0)
        return a
    },
    dpeff(){a=player.li.dilpoint.add(1).log(buyableEffect('li',12)).add(1).pow(0.5)
        if(hasUpgrade('li',11)) a=a.times(2)
        if(hasChallenge('E',33)) a=a.times(challengeEffect('E',33))
        a=a.times(gridEffect('li',201))
        return a
    },
    dptext(){a='You have '+format(player.li.dilpoint)+' Dilation Points, raising IP doubler base to ^'+format(tmp.li.dpeff)+'.'
        if(options.Chinese) a='你有'+format(player.li.dilpoint)+'膨胀点数, 使IP倍增器底数变为原来的'+format(tmp.li.dpeff)+'次方'
        return a
    },
    dvptext(){a='You have '+format(tmp.li.unspentDvP,0)+'/'+format(getBuyableAmount('li',21),0)+' Divinity Power.'
        if(options.Chinese) a='你有'+format(tmp.li.unspentDvP,0)+'/'+format(getBuyableAmount('li',21),0)+'神权'
        return a
    },
    unspentDvP(){a=getBuyableAmount('li',21)
        for (let i = 0; i < player.li.effGrid.length; i++) {
            a=a.sub(getGridData('li',player.li.effGrid[i]))
        }
        return a
    },
    dvpuShow(){return dvpuText(player.li.chosenGrid,options.Chinese)},
    mil0eff(){a=n('1e2500').pow(getBuyableAmount('li',21))
        return a
    }
})