addLayer("R", {
    name: "Rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        pause: n(0),
        total:n(0),
        best:n(0),
        resetTime:0,
        pauseTime:n(0),
    }},
    color: "#4adb13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Rebirth Timewalls", // Name of prestige currency
    baseResource: "Eternity Points", // Name of resource prestige is based on
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
    row: 6, // Row the layer is in on the tree (0 is the first row)
    prestigeButtonText(){a='Reset for '+format(tmp.R.getResetGain)+' Rebirth Timewalls'
        if(tmp.R.getResetGain.lt(1)) a=a+'<br>You need 1.80e308 Eternity Points to reset'
        if(options.Chinese){a='重置以获得 '+format(tmp.R.getResetGain)+' 重生时间墙'
        if(tmp.R.getResetGain.lt(1)) a=a+'<br>你需要1.80e308永恒点数以进行重置'}
        return a
     },
    getResetGain(){a=n(0)
            return a
    },
    canReset(){return tmp.R.getResetGain.gte(1)},
    hotkeys: [
        {key: "r",
        description: "R: Rebirth",
        onPress(){if (canReset(this.layer)) doReset(this.layer)},
        unlocked() {return hasUpgrade('E',272)}},
    ],
    layerShown(){return hasUpgrade('E',272)},
    tabFormat: {
   "Gem": {
        content: [ "main-display","prestige-button","resource-display",
    ["display-text", () => ''],
    "clickables",
    ],
    },
    "Rebirth Dimensions": {
        content: [ "main-display","prestige-button","resource-display","buyables",
    ],
    unlocked(){return true},
    },
    "Automation Center": {
        content: [ "main-display","prestige-button","resource-display","milestones",
    ],
    unlocked(){return true},
    },
    },
    doReset(resettingLayer) {
    },
    update(diff){
    },
    passiveGeneration(){
        mult = new Decimal(0)
        return mult
    },
    autoUpgrade() { return false},
    upgrades: {
    },
    clickables:{
    },
    buyables: {
    },
    milestones:{
    },
    challenges: {
    },
})