addLayer("R", {
    name: "Rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        gemPoints:n(0),
        shard:n(0),
        rPower:n(1),
        reb:n(0),
        total:n(0),
        best:n(0),
        resetTime:0,
        bestTime:n(1e300),
        rd1:n(0),
        rd2:n(0),
        rd3:n(0),
        rd4:n(0),
        rd5:n(0),
        rd6:n(0),
        rd7:n(0),
        rd8:n(0),
    }},
    color: "#4adb13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Rebirth Timewalls", // Name of prestige currency
    baseResource: "Eternity Points", // Name of resource prestige is based on
    baseAmount() {return player.E.points}, // Get the current amount of baseResource
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
    row: 6, // Row the layer is in on the tree (0 is the first row)
    prestigeButtonText(){a='Reset for '+format(tmp.R.getResetGain)+' Rebirth Timewalls, '+format(tmp.R.getResetGP)+' Gem Points and '+format(tmp.R.getResetShard)+' Rebirth Shard'
        if(tmp.R.getResetGain.lt(1)) a=a+'<br>You need 1.80e308 Eternity Points to reset'
        if(options.Chinese){a='重置以获得 '+format(tmp.R.getResetGain)+' 重生时间墙，'+format(tmp.R.getResetGP)+' 宝石点数与'+format(tmp.R.getResetShard)+' 重生碎片'
        if(tmp.R.getResetGain.lt(1)) a=a+'<br>你需要1.80e308永恒点数以进行重置'}
        return a
     },
    getResetGain(){a=n(10).pow(player.E.points.log(2).div(1024).sub(1)).times(player.cf.points.pow(0.00125).div(10))

        a=a.floor()

        if(player.E.points.lt(n(2).pow(1024))||player.cf.points.lt('1e800'))a=n(0)
        return a
    },
    getResetGP(){b=player.E.points.pow(1/1024).div(2)
        c=player.E.etr.pow(1/6).div(10).max(1)
        d=player.li.points.div(1e6).pow(1/10).div(10).max(1)
        a=b.times(c).times(d)
        a=a.floor()
        return a
    },
    getResetShard(){a=n(1)
        return a
    },
    rebGain(){a=n(1)
        return a
    },
    branches: ['E','cf'],
    canReset(){return tmp.R.getResetGain.gte(1)},
    hotkeys: [
        {key: "r",
        description: "R: Rebirth",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return hasUpgrade('E',272)||hasAchievement('A',251)}},
    ],
    layerShown(){return hasUpgrade('E',272)||hasAchievement('A',251)},
    tabFormat: {
   "Gem": {
        content: [ "main-display","prestige-button","resource-display",
    ["display-text", () => tmp.R.rebTip],["display-text", () => tmp.R.gemTip],
    ["buyables",[2]],["display-text", () => tmp.R.gemTip2],
    ],
    },
    "Rebirth Dimensions": {
        content: [ "main-display","prestige-button","resource-display",["display-text", () => tmp.R.rebTip],
        ["display-text", () => tmp.R.rdTip],["buyables",[1]],
    ],
    unlocked(){return true},
    },
    "Rebirth Upgrades": {
        content: [ "main-display","prestige-button","resource-display",["display-text", () => tmp.R.rebTip],["upgrades",[11]],"achievements",
    ],
    unlocked(){return true},
    },
    "Automation Center": {
        content: [ "main-display","prestige-button","resource-display",["display-text", () => tmp.R.rebTip],["upgrades",[1]],
    ],
    unlocked(){return true},
    },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > 5) {
            player.R.rPower = n(1)
       }
    },
    onPrestige(gain){
        if(player.R.reb.gte(1)&&n(player.R.resetTime).lt(player.R.bestTime)) player.R.bestTime = n(player.R.resetTime)
        player.R.gemPoints=player.R.gemPoints.add(tmp.R.getResetGP)
        player.R.shard=player.R.shard.add(tmp.R.getResetShard)
        player.R.reb = player.R.reb.add(tmp.R.rebGain)
    },
    update(diff){
        player.R.rd1 = player.R.rd1.max(getBuyableAmount('R',11))
        player.R.rPower = player.R.rPower.add(buyableEffect('R',11).times(diff))
    },
    passiveGeneration(){
        mult = n(0)
        return mult
    },
    autoUpgrade() { return false},
    upgrades: {
        11: {
            title: "START",
            description() {a="Keep '2 Eternities' milestone after rebirth."
                if(options.Chinese) a='在重生后保留"2次永恒"的里程碑'
                return a
            },
            cost: new Decimal(1),
            unlocked() {return true},
            onPurchase(){player.E.milestones.push(1)},
            currencyLocation() {return player.R},
            currencyDisplayName: 'Rebirth Shard',
            currencyInternalName: 'shard',
        },
        111: {
            title: "Welcome to Rebirth",
            description() {a="Add 0.002 to the softcap exponent per Rebirth, up to 0.1."
                if(options.Chinese) a='每次重生使软上限指数+0.002，最多+0.1'
                return a
            },
            effect() {b=player.R.reb.times(0.002).min(0.1)
                return b
            },
            effectDisplay() { return '+'+format(upgradeEffect(this.layer, this.id))},
            tooltip() {a="Each Rebirth Upgrade can be bought only with the following achievement unlocked."
                if(options.Chinese) a="每个重生升级只能在解锁对应成就后购买"
                return a
            },
            cost: new Decimal(1),
            unlocked() {return true},
            canAfford(){return hasAchievement('R',11)},
        },
    },
    achievements: {
        11: {
     name() {return "Welcome to Rebirth"},
     done() {return player.points.gte('e10002228')}, 
     unlocked(){return true},
     onComplete() {},
     tooltip() {return "Reach e10,002,228 Point."}, 
     textStyle: {'color': '#4bd123'},
        },
    },
    clickables:{
    },
    buyables: {
        11: {
            title(){text = '1st Rebirth Dimension'
                    if(options.Chinese) text='第一重生维度'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))+')'
                return text
            },
            cost(x) { a= new Decimal(10).pow(x)
                    return a
            },
            mult() {a=n(2).pow(getBuyableAmount(this.layer,this.id)).times(tmp.R.allRDmult)
                return a
            },
            effect(x) {return player.R.rd1.times(this.mult())},
            display() {a= "Amount: "+format(player.R.rd1)+'<br>Mult: x'+format(this.mult())
            a=a+"<br>Cost: "+format(this.cost())+' Rebirth Points'
            if(options.Chinese) {a= "数量: "+format(player.R.rd1)+'<br>倍率: x'+format(this.mult())
            a=a+"<br>花费: "+format(this.cost())+' 重生点数'
            }
            return a },
            unlocked() {return true},
            canAfford() { return player.R.points.gte(this.cost())&&this.unlocked() },
            buy() {
                player.R.points = player.R.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.R.rd1=player.R.rd1.add(1)
            },
            buyMax() {
					if (!this.canAfford()) return;
					let tempBuy = player.R.points.max(0.1).log(10)
					let target = tempBuy.plus(1).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
        21: {
            title(){text = 'Timewall Gem'
                    if(options.Chinese) text='时间墙宝石'
                text=text+'('+format(getBuyableAmount(this.layer, this.id))+' x '
                text=text+format(tmp.R.gemPower)+' = '+format(getBuyableAmount(this.layer, this.id).times(tmp.R.gemPower))
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(1)
                    return a
            },
            effect(x) {f=x.times(tmp.R.rpEff).times(0.01)
                a=f.times(10).add(1).log(10).add(1).log(10).div(50).add(1)//pt exponent
                b=n(10).pow(f.times(10).add(1).log(10).add(1).pow(2).sub(1))//pre-inf boost
                c=f.times(10).add(1).pow(2)//super-man boost
                d=f.times(10).add(1).log(10).add(1).log(10).pow(2).div(100).min(0.5).toNumber()//qqqe308 exp reduce
                return [a,b,c,d]
            },
            display() {a= "Point Exponent Factory effect x"+format(this.effect()[0],4)
                a=a+"<br>Point Producer base effect and all pre-Inf Timewall gain x"+format(this.effect()[1])
                a=a+"<br>Pre-Rebirth Super-man speed x"+format(this.effect()[2])
                a=a+"<br>QqQe308 requirement exponent -"+format(this.effect()[3])
            if(options.Chinese) {a= "点数指数因子效果 x"+format(this.effect()[0],4)
                a=a+"<br>点数生产器基础效果与无限前所有时间墙获取 x"+format(this.effect()[1])
                a=a+"<br>重生前超人速度 x"+format(this.effect()[2])
                a=a+"<br>QqQe308需求指数 -"+format(this.effect()[3])
            }
            return a },
            unlocked() {return true},
            canAfford() { return player.R.gemPoints.gte(this.cost())&&this.unlocked() },
            buy() {
                player.R.gemPoints = player.R.gemPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    milestones:{
    },
    challenges: {
    },
    effectDescription(){return "<h2 style='color: #4abd13; text-shadow: 0 0 3px #c2b280'>"+format(player.R.gemPoints)+"</h2> Gem Points and <h2 style='color: #4abd13; text-shadow: 0 0 3px #c2b280'>"+format(player.R.shard)+"</h2> Rebirth Shards"},
    rebTip(){a='You have gone Rebirth '+format(player.R.reb)+' times.<br/>'
        a=a+'You have spent '+formatTime(player.R.resetTime)+' in this Rebirth.<br/>'
        a=a+'Your best Rebirth time is '+formatTime(player.R.bestTime)+'. (The first Rebirth is not counted in)<br/>'
        a=a+'You will gain '+format(tmp.R.rebGain)+' Rebirth(s) on reset.<br>'
        if(options.Chinese){a='你已经重生了'+format(player.R.reb)+'次<br/>'
        a=a+'你在本次重生中花费了'+formatTime(player.R.resetTime)+'<br/>'
        a=a+'你最快的重生时间为'+formatTime(player.R.bestTime)+'(第一次重生不计入)<br/>'
        a=a+'在重生后，你将获得'+format(tmp.R.rebGain)+'次重生次数<br>'}
        return a
    },
    rdTip(){a="You have <h3 style='color: #4abd13; text-shadow: 0 0 3px #c2b280'>"+format(player.R.rPower)+"</h3> Rebirth Power, providing "+format(tmp.R.rpEff)+" free Upgrade Points and add "+format(tmp.R.rpEff)+"% to gem power."
        a=a+'<br>You are gaining '+format(buyableEffect('R',11))+' Rebirth Power per second.'
        if(options.Chinese){a="你有 <h3 style='color: #4abd13; text-shadow: 0 0 3px #c2b280'>"+format(player.R.rPower)+"</h3>重生之力，提供"+format(tmp.R.rpEff)+"个免费的升级点数并使宝石之力+"+format(tmp.R.rpEff)+"%"
            a=a+'<br>你每秒获取'+format(buyableEffect('R',11))+'重生之力'
        }
        return a
    },
    gemTip(){a="You can spend your Gem Points on your gems to get verious boosts to your progress."
        a=a+'<br>Gem Power: '+format(tmp.R.gemPower.times(100))+'%'
        if(options.Chinese){a="你可以将宝石点数花费在你的宝石上来获得各种各样的加成。"
            a=a+'<br>宝石能量: '+format(tmp.R.gemPower.times(100))+'%'
        }
        return a
    },
    allRDmult(){a=n(1)
        return a
    },
    rpEff(){a=player.R.rPower.max(1).log(2)
        return a
    },
    gemPower(){a=tmp.R.rpEff.times(0.01)
        return a
    },
    rebEff(){a=player.R.reb.add(1)//IP
        b=player.R.reb.add(1)//Etr
        c=player.R.reb.times(0.5).add(1)//EP
        d=player.R.reb.add(1).pow(0.5)//DP
        return [a,b,c,d]
    },
    gemTip2(){a="Rebirth bonus:"
        a=a+'<br>IP gain x'+format(tmp.R.rebEff[0])
        a=a+'<br>Eternity gain x'+format(tmp.R.rebEff[1])
        a=a+'<br>EP gain x'+format(tmp.R.rebEff[2])
        a=a+'<br>Dilation Point gain x'+format(tmp.R.rebEff[3])
        if(options.Chinese){a="重生奖励"
        a=a+'<br>无限点数获取x'+format(tmp.R.rebEff[0])
        a=a+'<br>永恒次数获取x'+format(tmp.R.rebEff[1])
        a=a+'<br>永恒点数获取x'+format(tmp.R.rebEff[2])
        a=a+'<br>膨胀点数获取x'+format(tmp.R.rebEff[3])
        }
        return a
    },
})