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
        s14:n(0),
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
        player.E.timeshard = player.E.timeshard.add(tmp.E.TSgen.times(diff))
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
            ["upgrade-tree",[[11],[21, 22],[31,32,33,34],[41,42],[51],[61,62],[71,72,73],[81,82,83],[91,92,93],[101,102,103],[111,112]]],
    ],
    unlocked(){return hasMilestone('E',1)},
    },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > 4) {
            player.E.timeshard=n(1)
            if(getClickableState('E',12)==1) {if(hasUpgrade('E',34)) player.E.points = player.E.points.add(5)
                if(hasUpgrade('E',62)) player.E.points = player.E.points.add(100)
                if(hasUpgrade('E',112)) player.E.points = player.E.points.add(10000)
                player.E.upgrades=[]
            setClickableState('E',12,0)
            }
       }
        if (layers[resettingLayer].row == 6) {
    let kept = []
    layerDataReset(this.layer, kept)
       }
    },
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
            toggles:[["E", "IPDauto"]]
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
            toggles:[["E", "NCauto"]]
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
            toggles:[["E", "BIB1auto"],["E", "BIB2auto"],["E", "BIB3auto"],["E", "BIB4auto"]]
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
            toggles:[["E", "qaqauto"]]
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
            toggles:[["E", "IUauto"]]
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
            toggles:[["E", "IGauto"],["E", "IGMauto"],["E", "IEFauto"],]
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
            toggles:[["E", "MB1auto"],["E", "MB2auto"],["E", "MB3auto"],["E", "MB4auto"],]
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
            toggles:[["E", "qaUauto"]]
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
            toggles:[["E", "ICauto1"],['E','ICauto2']]
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
            toggles:[["E", "QUBauto"]]
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
            toggles:[["E", "TPB1auto"],["E", "TPB2auto"],["E", "TPB3auto"],["E", "TPB4auto"]]
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
            toggles:[["E", "CTauto"]]
        },
        15: {
            requirementDescription() {a="16 Eternities"
                if(options.Chinese) a='永恒16次'
                return a
            },
            effectDescription() {a="Unlock a new side layer."
                if(options.Chinese) a="解锁一个新的支线层级"
                return a
            },
            done() { return player.E.etr.gte(16) },
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
                //if(buyableEffect('E',13).neq(1)) a=a+'^'+format(buyableEffect('E',13))+'='+format(tmp.E.TSgen)
                a=a+" timeshards/s<br/>"
            a=a+"Cost: "+format(this.cost())+' Eternity Points'
            if(options.Chinese) {a= "每秒生产"+format(tmp.E.TGmult)+"时间碎片<br/>总效果:每秒生产"+format(this.effect())
                if(buyableEffect('E',13).neq(1)) a=a+'^'+format(buyableEffect('E',13))+'='+format(tmp.E.TSgen)
                a=a+"时间碎片<br/>"
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
            effect(x) {a= tmp.E.TMbase.pow(x)
                return a
            },
            display() { a= "Multiply Timeshard Generator base effect by "+format(tmp.E.TMbase)+"<br/>Effect:"+format(this.effect())
                a=a+"x<br/>Cost: "+format(this.cost())+' Eternity Points'
                if(options.Chinese){a= "时间碎片生成器效果x"+format(tmp.E.TMbase)+"<br/>效果:"+format(this.effect())
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
        13: {//incompleted
            title(){text = 'Timeshare Exponent Factory'
                if(options.Chinese) text='时间碎片指数因子(TEF)'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))
                //if(tmp.T.freePEF.neq(0))text=text+' + '+format(tmp.T.freePEF)
                text=text+')'
                return text
            },
            cost(x) { return new Decimal(1e100).pow(x.pow(2)).times('1e1500') },
            effect(x) {a=x.times(tmp.T.PEFbase).add(1)
                if(inChallenge('I',14)) a=player.ST.total.add(1).pow(0.6).times(player.MT.total.add(1)).log(10).times(0.01).add(1).min(1.5)
                if(inChallenge('ST',13)) a=n(1)
                if(inChallenge('MT',14)) a=n(1)
                if(inChallenge('I',21)) a=a.min(1.2)
                if(inChallenge('T',11)) a=a.times(0.75)
                if(inChallenge('ST',11)) a=a.times(0.5)
                if(a.gte(1.5)) a=a.sub(1.5).div(10).add(1.5)
                if(a.gte(2)) a=a.add(2).log(2)
                if(a.gte(3)) a=a.div(3).pow(0.5).times(3)
                a=a.times(tmp.T.PEFmult)
                    return a
            },
            display() { a="Add "+format(tmp.T.PEFbase,4)+" to Point Producer Effect Exponent<br/>Effect:^"+format(this.effect().div(tmp.T.PEFmult),4)
                if(buyableEffect('T',13).gte(n(1.5).times(tmp.T.PEFmult))) a=a+'(Softcapped)'
                if(tmp.T.PEFmult.neq(1)) a=a+'x'+format(tmp.T.PEFmult)+'='+format(this.effect(),4)
                a=a+"<br/>Cost: "+format(this.cost())+' points'
            if(options.Chinese) {a="点数生产器总效果指数+"+format(tmp.T.PEFbase,4)+"<br/>效果:^"+format(this.effect().div(tmp.T.PEFmult),4)
                if(buyableEffect('T',13).gte(n(1.5).times(tmp.T.PEFmult))) a=a+'(受软上限限制)'
                if(tmp.T.PEFmult.neq(1)) a=a+'x'+format(tmp.T.PEFmult)+'='+format(this.effect(),4)
                a=a+"<br/>花费:"+format(this.cost())+'点数'}
            return a },
            unlocked() {return false},
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
					let tempBuy = player.E.points.max(2e5).div(2e5).log(20).pow(0.5)
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
            player.E.upgrades = []
            doReset('E',true)
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
            canAfford() {return hasUpgrade('E',61)&&!hasUpgrade('E',72)&&!hasUpgrade('E',73)},
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
            description() {a="Each bought Upgrade Points multiply your Point Producer base effect by 1e100."
                if(options.Chinese) a='每个购买的升级点数使点数生产器基础效果x1e100'
                return a
            },
            effect() {a=n(1e100).pow(getBuyableAmount('E',21).add(getBuyableAmount('E',22)).add(getBuyableAmount('E',23)))
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
            canAfford() {return hasUpgrade('E',61)&&!hasUpgrade('E',71)&&!hasUpgrade('E',73)},
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
            description() {a="Each bought Upgrade Points multiply your Infinity Generator base effect by 1e6."
                if(options.Chinese) a='每个购买的升级点数使无限生成器基础效果x1e6'
                return a
            },
            effect() {a=n(1e6).pow(getBuyableAmount('E',21).add(getBuyableAmount('E',22)).add(getBuyableAmount('E',23)))
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(7),
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
            canAfford() {return hasUpgrade('E',61)&&!hasUpgrade('E',71)&&!hasUpgrade('E',72)},
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
            effect() {a=tmp.E.TSeffect.pow(0.05).min('1e50')
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
            description() {a="Each bought Upgrade Points multiply your Timeshard Generator base effect by 2."
                if(options.Chinese) a='每个购买的升级点数使时间碎片生成器基础效果x2'
                return a
            },
            effect() {a=n(2).pow(getBuyableAmount('E',21).add(getBuyableAmount('E',22)).add(getBuyableAmount('E',23)))
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x'},
            cost: new Decimal(7),
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
    },
    etrgain(){a=n(1)
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
    TGtip(){a="You have <h3 style='color: #b743de; text-shadow: 0 0 3px #c2b280'>" + format(player.E.timeshard) + "</h3> Timeshards, which boost all pre-Eternity resource generation and effective time in the Time-based boosts by " +format(tmp.E.TSeffect)+'.'
        a=a+'<br>Your Eternity amount give your Timeshard Generator a multiplier of x'+format(player.E.etr.times(0.01).min(1))+'.'
        if(options.Chinese){a="你有 <h3 style='color: #b743de; text-shadow: 0 0 3px #c2b280'>" + format(player.E.timeshard) + "</h3> 时间碎片, 使所有永恒前资源生成与基于时间加成中的有效时间x" +format(tmp.E.TSeffect)+'.'
            a=a+'<br>你的永恒次数使你的时间碎片生成器效果x'+format(player.E.etr.times(0.01).min(1))
        }
        a=a+'<br>('+format(tmp.E.TSgen)+'/sec)'
        return a
    },
    TSeffect(){a=n(1)
        a=n(10).pow(player.E.timeshard.log(10).pow(0.5)).min(player.E.timeshard)
        return a
    },
    TSgen(){a=buyableEffect('E',11)
        a=a.times(buyableEffect('E',12))
        return a
    },
    TGmult(){a=player.E.etr.times(0.01).min(1)
        if(hasUpgrade('E',11)) a=a.times(upgradeEffect('E',11))
        if(hasUpgrade('E',34)) a=a.times(upgradeEffect('E',34))
        if(hasUpgrade('E',62)) a=a.times(upgradeEffect('E',62))
        if(hasUpgrade('E',93)) a=a.times(upgradeEffect('E',93))
        if(hasUpgrade('E',103)) a=a.times(upgradeEffect('E',103))
        if(hasUpgrade('E',112)) a=a.times(upgradeEffect('E',112))
        return a
    },
    TMbase(){a=n(2)
        if(hasUpgrade('E',83)) a=a.times(upgradeEffect('E',83))
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
    totalUPcal(){a=getBuyableAmount('E',21).add(getBuyableAmount('E',22)).add(getBuyableAmount('E',23))
        if(hasMilestone('df',0)) a=a.add(tmp.df.effect[5])
        return a
    },
    currentUP(){a=tmp.E.totalUPcal
        a1=[11,21,22,31,32,33,41,42,51,61,71,72,73,81,82,83,91,92,93,101,102,103,111,]
        b1=[1 ,2 ,2 ,3 ,4 ,2 ,5 ,5 ,6 ,4 ,3 ,5 ,5 ,5 ,4 ,5 ,4 ,5 ,4 ,5  ,7  ,7  ,12 ,]
        for (let i = 0; i < a1.length; i++) {
            if(hasUpgrade('E',a1[i])) a=a.sub(b1[i])
        }
    return a
    }
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
    unlocked(){hasMilestone('E',15)}},
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
                a=a+'+'+format(tmp.df.effect[5])+' free Upgrade Points'
                if(options.Chinese){a='基于DeFe308数量获得各种加成。当前：<br>'
                a=a+'点数指数因子效果x'+format(tmp.df.effect[0],3)+'，无视软上限<br>'
                a=a+'无限之力加成器底数x'+format(tmp.df.effect[1])+'<br>'
                a=a+'Monika点数x'+format(tmp.df.effect[2])+'<br>'
                a=a+'时间墙能量x'+format(tmp.df.effect[3])+'<br>'
                a=a+'永恒点数x'+format(tmp.df.effect[4])+'<br>'
                a=a+'免费升级点数+'+format(tmp.df.effect[5])}
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
            unlocked() {return hasMilestone('df', 0)},
        },
        2: {
            requirementDescription: "5 DeFe308",
            effectDescription(){a='Unlock Eternity Challenges[v2.2].'
                if(options.Chinese)a='解锁永恒挑战[v2.2]'
                return a
            },
            done() { return player.df.points.gte(5) },
            unlocked() {return hasMilestone('df', 1)}
        },
    },
    effect(){a=player.df.points.times(0.001).add(1)
        b=player.df.points.times(0.1).add(1)
        c=player.df.points.times(0.2).add(1)
        d=n(100).pow(player.df.points)
        e=n(3).pow(player.df.points)
        f=n(2).times(player.df.points)
        g=[a,b,c,d,e,f]
        return g
    },
})