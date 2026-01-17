let modInfo = {
	name: "The Timewall Tree Remake",
	author: "QqQeInfinity & DeFe308",
	id: "timewall remake",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Super Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1 Basic 2026/1/10~2026/1/11</h3><br>
		- Added 2 layers.<br>
		- Added 10 achievements.<br>
	<h3>v0.1.1 Bug Fix 2026/1/16</h3><br>
		- Fixed a bug about 'resetTime', which made it impossible to import save.<br>
		- Added speed-up in the achievement tab, and now you can speed up to 16x, which will reduce the timewall.<br>
	<h3>v0.2 Super Update 2026/1/17</h3><br>
		- Added Super-Timewall layer, with 20 Upgrades, 4 Challenges, and of course, Automations.<br>
		- Added QqQeInfinity layer, with 2 Milestones and Super-QqQe308.<br>
		- Added more contants in QqQe308 layer.<br>
		- The speed-up is nerfed, and you can only speed up to 8x now.<br>
		- The point is capped at 1e150.<br>
		- Some small text changes<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.points.lt(1e150)
	//return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(buyableEffect('T',11)).pow(buyableEffect('T',13))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){a='Progress to Infinity:'+format(tmp.A.ProgressToInf)+'%'
		return a
	}
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('ST',54)
	//return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

//快捷定义
function n(num){
    return new Decimal(num)
}
//检测旁边的升级是否被购买
function checkAroundUpg(UPGlayer,place){
    place = Number(place)
    return hasUpgrade(UPGlayer,place-1)||hasUpgrade(UPGlayer,place+1)||hasUpgrade(UPGlayer,place-10)||hasUpgrade(UPGlayer,place+10)
}
//指数软上限
function powsoftcap(num,start,power){
	if(num.gt(start)){
		num = num.root(power).mul(start.pow(one.sub(one.div(power))))
	}
    return num
}
//e后数字开根
function expRoot(num,root){
    return ten.pow(num.log10().root(root))
}
//e后数字乘方
function expPow(num,pow){
    return ten.pow(num.log10().pow(pow))
}
//e后数字指数软上限
function expRootSoftcap(num,start,power){
    if(num.lte(start)) return num;
    num = num.log10();start = start.log10()
    return ten.pow(num.root(power).mul(start.pow(one.sub(one.div(power)))))
}
//修改class属性
function setClass(id,toClass = []){
    var classes = ""
    for(i in toClass) classes += " "+toClass[i]
    if(classes != "") classes = classes.substr(1)
    document.getElementById(id).className = classes
}
//快速创建sub元素
function quickSUB(str){
    return `<sub>${str}</sub>`
}
//快速创建sup元素
function quickSUP(str){
    return `<sup>${str}</sup>`
}
//快速给文字上色
function quickColor(str,color){
    return `<text style='color:${color}'>${str}</text>`
}

function gba(a,b){return getBuyableAmount(a,b)}

function gcs(a,b){return getClickableState(a,b)}

function ce(a,b) {return clickableEffect(a,b)}