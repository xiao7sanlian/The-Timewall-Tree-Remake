let modInfo = {
	name: "The Timewall Tree Remake",
	author: "QqQeInfinity & DeFe308",
	id: "timewall remake",
	pointsName: "points",
	modFiles: ["tree.js","layers.js","Infinity.js","Eternity.js","ach.js"],//'Rebirth.js',

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 114514,  // In hours
}

document.title='The Timewall Tree Remake'

// Set your version in num and name
let VERSION = {
	num: "2.5.2",
	name: "Another small update, still not v3.0",
	beta:'',
	pre:'',
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1 Basic 2026/1/10~2026/1/11</h3><br>
		- Added 2 layers.<br>
		- Added 10 achievements.<br><br>

	<h3>v0.1.1 Bug Fix 2026/1/16</h3><br>
		- Fixed a bug about 'resetTime', which made it impossible to import save.<br>
		- Added speed-up in the achievement tab, and now you can speed up to 16x, which will reduce the timewall.<br><br>

	<h3>v0.2 Super Update 2026/1/17</h3><br>
		- Added Super-Timewall layer, with 20 Upgrades, 4 Challenges, and of course, Automations.<br>
		- Added QqQeInfinity layer, with 2 Milestones and Super-QqQe308.<br>
		- Added more contents in QqQe308 layer.<br>
		- The speed-up is nerfed, and you can only speed up to 8x now.<br>
		- The point is capped at 1e150.<br>
		- Some small text changes<br><br>

	<h3>v0.3 Mega Update 2026/1/24~2026/1/31</h3><br>
		- Added Mega-Timewall layer, with 20 Upgrades, 4 Challenges, and 5 Milestones.<br>
		- Added cokecole layer, with 3 Milestones.<br>
		- Added more contents in QqQeInfinity layer.<br>
		- Some other changes<br><br>

	<h3>v1.0 Infinity Update 2026/2/1~2026/2/11</h3><br>
		- Added Infinity layer, with 17 Upgrades, 6 Challenges, and Automations.<br>
		- Added 10 achievements.<br>
		- Added more contents in QqQe308 layer.<br>
		- Some other changes.<br>
		- Endgame: Break Infinity<br><br>

	<h3>v1.0.1 Technical Update 2026/2/20</h3><br>
		- The number less than 0.0001 can be expressed in scientific notation.<br>
		- Incompleted achievements are shown now.<br>
		- Added 'Speed-up II', which allows you to speed up to 16x.<br>
		- Added save notice popup.<br>
		- I4-3 now use addPoints() function. (What am I saying?)<br>
		- Fixed a bug in TMT: when a resource generation goes beyond 1.79e308, it will bring Infinity resources.<br>
		- The Softcap exponent for point and Timewall is shown now.<br><br>

	<h3>v1.0.2 Another Technical Update 2026/2/21</h3><br>
		- Added a setting which can hide save notifications.<br><br>

	<h3>v1.1 Break-Infinity Update 2026/2/21~2026/2/24</h3><br>
		- Added 29 Upgrades, 8 Buyables, Infinity Generator, and 8 Infinity Challenges in I layer.<br>
		- Added qaqe308 layer, with 2 Milestones, 4 Buyables, and 8 Upgrades.<br>
		- Added more contents in QqQeInfinity layer.<br>
		- Some other changes.<br>
		- Endgame: Reach 1e120 Infinity Points<br>
		- Note: Some Infinity Challenge might contain a large timewall. Please use Speed-up at any time.<br><br>

	<h3>v1.1.1 BI2-2 Fix 2026/2/25</h3><br>
		- Fixed a bug: the effect of upgrade BI2-2 is NaNx when your Best Infinity time is very long.<br>
		- Improved IC8 performance.<br><br>

	<h3>v1.1.2 NC5 & IC1 Fix 2026/2/26</h3><br>
		- Fixed a bug: when in NC5 or IC1 and have BI4-3, Infinity Power will be NaN on reset.<br>
		- Added ??? in Infinity layer.<br><br>

	<h3>v1.2 Timewall Power Update 2026/2/27~2026/3/1</h3><br>
		- Added Timewall Power in Infinity layer, with 12 Upgrades, 4 Buyables and 1 Challenges.<br>
		- Added Upgrade Booster in Infinity layer, with 4 Upgrades and 1 Buyables.<br>
		- Added more contents in QqQe308 and qaqe308 layer.<br>
		- Some other changes.<br>
		- Endgame: Reach 1.80e308 Infinity Points<br>
		- Note: Some of the contents might contain a large timewall. Please use Speed-up at any time.<br><br>

	<h3>v1.2.1 Translation Update (Part. I) 2026/3/7</h3><br>
		- Added language setting, and you can play this game in Chinese now!<br>
		- Completed the translation of T and Q layer.<br>
		- Note: Some things won't be translated, such as currency name.<br>
		Chinese version:<br>
		- 增加语言设置，现在这个游戏适配中文了！<br>
		- 完成了T，Q两个层级的翻译<br>
		- 注意:资源名称等一些物品不会被翻译<br><br>

	<h3>v1.2.2 Translation Update (Part. II) 2026/3/14</h3><br>
		- Completed the translation of ST, Qi, MT and Co layer.<br>
		- Added a softcap to Q1-3 Boost and Q2-3 Boost.(After 5000 QqQe308)<br>
		Chinese version:<br>
		- 完成了ST，Qi，MT, Co四个层级的翻译<br>
		- 为Q1-3 Boost和Q2-3 Boost效果增加了软上限（始于5000 QqQe308）<br><br>

	<h3>v1.2.3 Small Update 2026/3/15~2026/3/21</h3><br>
		- Fixed some bugs and some small changes.<br>
		- Added some features of the new layer.<br><br>

	<h3>v2.0 Eternity Update 2026/3/28~2026/4/5</h3><br>
		- Added Eternity layer, with 16 Milestones, an Upgrade tree and Timeshard!<br>
		- Added DeFe308 layer, with 1 Milestone.<br>
		- Added more contents in Timewall layer.<br>
		- Some other changes.<br>
		- Endgame: 1 DeFe308<br>
		Chinese version:<br>
		- 增加永恒层级，包括16个里程碑，一个升级树与时间碎片<br>
		- 增加DeFe308层级，包括1个里程碑<br>
		- 在时间墙层级增加了更多的内容<br>
		- 一些其他更改<br>
		- 终局: 1 DeFe308<br><br>

	<h3>v2.0.1 Translation Update (Part. III) 2026/4/11~2026/4/12</h3><br>
		- Completed the translation of I and Qa layer.<br>
		Chinese version:<br>
		- 完成了I和Qa两个层级的翻译<br><br>

	<h3>v2.0.2 News Ticker Update 2026/4/25</h3><br>
		- Added News Ticker. (only have English version)<br>
		- Added 4 secret Achievements.<br><br>

	<h3>v2.1 Pre-Eternity Challenge Update 2026/5/1~2026/5/24</h3><br>
		- Added more upgrades in the Upgrade tree.<br>
		- Added 2 DeFe308 Milestones.<br>
		- Added 1 secret Achievement.<br>
		- Some other changes, and more news messages.<br>
		- Endgame: 5 DeFe308.<br>
		Chinese version:<br>
		- 在升级树中增加了更多的升级<br>
		- 增加了2个DeFe308里程碑<br>
		- 增加了1个隐藏成就<br>
		- 一些其他更改，以及更多的新闻消息<br>
		- 终局: 5 DeFe308<br><br>

	<h3>v2.2 Eternity Challenge Update (Part. I) 2026/5/31~2026/6/19</h3><br>
		- Added 7 Eternity Challenges and more upgrades in the Upgrade Tree.<br>
		- Added 1 milestone in DeFe308 layer.<br>
		- Added a new layer, with 14 Milestones and 12 Upgrades.<br>
		- Some other changes, and more news messages.<br>
		- Endgame: Get all achievements.<br>
		Chinese version:<br>
		- 增加7个永恒挑战，在升级树中增加了更多的升级<br>
		- 增加了1个DeFe308里程碑<br>
		- 增加了一个新层级，包含14个里程碑与12个升级<br>
		- 一些其他更改，以及更多的新闻消息<br>
		- 终局: 完成所有成就<br><br>

	<h3>v2.3 Eternity Challenge Update (Part. II) 2026/7/13~2026/7/18</h3><br>
		- Added 4 more Eternity Challenges and more upgrades in the Upgrade Tree.<br>
		- Added I-Upgrade Booster and related contents in CF layer.<br>
		- Added 5 secret Achievements.<br>
		- Added Time Flux.<br>
		- Some other changes, and more news messages.<br>
		- Endgame: Unlock Liuliu66686.<br>
		Chinese version:<br>
		- 又增加了4个永恒挑战，在升级树中增加了更多的升级<br>
		- 在CF层级中增加了I-升级增强器和相关的升级<br>
		- 增加了5个隐藏成就与时间流量<br>
		- 一些其他更改，以及更多的新闻消息<br>
		- 终局: 解锁Liuliu66686<br><br>

	<h3>v2.4 Liuliu66686 Update 2026/7/20~2026/7/25</h3><br>
		- Added 1 more Eternity Challenges and more upgrades in the Upgrade Tree.<br>
		- Added Li layer, with Liuliu66686 Dilation and many upgrades and buyables.<br>
		- Some other changes.<br>
		- Endgame: 1 Divinity Power.<br>
		Chinese version:<br>
		- 又增加了1个永恒挑战，在升级树中增加了更多的升级<br>
		- 增加了Li层级，包括溜胀和一大堆升级与可购买<br>
		- 一些其他更改<br>
		- 终局: 1神权<br><br>

	<h3>v2.4.1 Balance 2026/7/27</h3><br>
		- Added a hardcap for the effect of E21-2.<br>
		Chinese version:<br>
		- 对升级E21-2增加了软上限<br><br>

	<h3>v2.5 Divinity Power Update 2026/7/30~2026/8/4</h3><br>
		- Added Divinity Power Tree, with a grid containing 13 'upgrades'.<br>
		- Added more upgrades in the Upgrade Tree.<br>
		- Reduced the requirement of 'Eternities are the new infinity' achievement.
		- Some other changes, and more news messages.<br>
		- Added Chinese News Ticker.<br>
		- Added 6 secret Achievements, and modified SA24.<br>
		- Endgame: Unlock [5 hours later]. (e10,000,000 points)<br>
		Chinese version:<br>
		- 增加了神权树，包括13个"升级"<br>
		- 在升级树中增加了更多的升级<br>
		- 成就'永恒是新的无限'的需求被降低了<br>
		- 一些其他更改，以及更多的新闻消息<br>
		- 增加了中文新闻消息<br>
		- 增加了6个隐藏成就，并修改了隐藏成就24<br>
		- 终局: 解锁[5小时后更新]（e10,000,000点数）<br><br>

	<h3>v2.5.1 A small update, not v3.0 2026/8/11~2026/8/12</h3><br>
		- Divided achievements into stages. (just visual effect)<br>
		- Changed the color of clickables in Qi layer.<br>
		- Changed the layer most automation belongs.<br>
		- Note: You may need to re-enable your automation.<br>
		Chinese version:<br>
		- 在成就界面中为成就分阶段了（不过没有实际用途）<br>
		- 更改了Qi层级超人按钮的颜色<br>
		- 更改了大部分自动化所属的层级<br>
		- 注：在更新后，你可能需要重新启用自动化<br><br>

	<h3>v2.5.2 Another small update, still not v3.0 2026/8/15</h3><br>
		- Fixed an issue about negative Q-Upgrade Booster, I-Upgrade Booster and Divinity Power.<br>
		Chinese version:<br>
		- 修复了负数升级增强器与神权的bug<br><br>
	`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.points.lt('ee7')
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = tmp.A.realPTgen
	//if(gain.gte(tmp.T.softcapstart)) gain = gain.div(tmp.T.softcapstart).pow(tmp.T.softcapexp).times(tmp.T.softcapstart)
	//if(tmp.li.dilationLevel.gt(0)&&gain.gt(10)) gain = n(10).pow(gain.log(10).pow(n(0.66686).pow(tmp.li.dilationLevel)))
	gain = gain.times(tmp.T.ptmult)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	//NiShuoDeDuiDanShiWoShiDeFe308NiMenWanLe:'DeFe308'
	//offTime = { remain: 0 }
	title:'The Timewall Tree Remake',
	offlineTime: n(0),
	Dif:n(0),
}}

// Display extra things at the top of the page
var displayThings = [
	function(){a='Progress to Infinity:'+format(tmp.A.ProgressToInf)+'%<br/>'
		if(hasUpgrade('I',51)&&player.points.gte(n(2).pow(1024))) {a='Progress to Eternity:'+format(tmp.A.ProgressToEtr)+'%<br>'}
		if(tmp.E.ECcomp.gte(1)&&player.I.points.gte(n(2).pow(1024))) {a='Progress to Universe Filled:'+format(tmp.A.ProgressTo3)+'%<br>'}
			//if(tmp.A.ProgressToEtr.gte(100)) a=a+"You have reached the Endgame!"
		if(tmp.A.ProgressToInf.gte(100)&&!hasUpgrade('I',51)) a=a+"You can't gain more points after 1.80e308!<br>"
		if(tmp.A.ProgressTo3.gte(100)) a=a+quickColor("Your point is hardcapped at e10,000,000!",'#ff0000')+"<br>"
		if(inChallenge('E',34)) a=a+'EC12 progress: '+format(player.E.resetTime)+'s/'+format(tmp.E.challenges[34].goal2)+'s<br>'
		if(tmp.T.ptGain.gte(tmp.T.softcapstart)&&getPointGen().neq(NaN)) a=a+'After '+format(tmp.T.softcapstart)+' points/s, your point gain will be softcapped!(^'+format(tmp.T.softcapexp)+')'
		if(options.NewsTicker) a=a+'<br>'+tmp.SA.news[player.SA.newsIndex]
		return a
	}
]

// Determines when the game "ends"
function isEndgame() {
	//return hasUpgrade('ST',54)
	//return hasMilestone('df',2)
	//return hasUpgrade('cf',34)
	//return hasUpgrade('cf',52)
	//return getBuyableAmount('li',21).gte(1)
	return hasUpgrade('E',272)
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

function sleep(ms) {
	const start = Date.now();
	while (Date.now()-start<ms){}
}

function dvpuText(id,Chinese = false){
	if(!Chinese){switch (id) {
		case 101:
			return '<br>DvP-C<br>Increase DP gain by 1% per OoM of Eternity Point per level<br>Currently: x'+format(gridEffect('li',id));
		case 102:
			return '<br>DvP-T-1<br>Nerf Liuliu66686 Dilation by multipling its level by 0.99 (-0.01 per level)<br>Currently: x'+format(gridEffect('li',id));
		case 103:
			return '<br>DvP-T-2<br>Multiply the effect of Point Exponent Factory by 1.2 (+0.2 per level), but only in Liuliu66686 Dilation<br>Currently: x'+format(gridEffect('li',id));
		case 104:
			return '<br>DvP-T-3<br>After having at least 48 Eternity Upgrades, multiply DP gain by Upgrade Point^0.1 (+0.1 per level)<br>Currently: x'+format(gridEffect('li',id));
		case 105:
			return '<br>DvP-T-4<br>Upgrade DvP-B-x (x=1,2,3) is 20% stronger per level<br>Currently: x'+format(gridEffect('li',id));
		case 202:
			return '<br>DvP-M-1<br>Add 0.1 to the base of buyable "DP Doubler" per level<br>Currently: +'+format(gridEffect('li',id));
		case 303:
			return '<br>DvP-M-2<br>Monika buyable is 10% stronger per level<br>Currently: +'+format(gridEffect('li',id).times(100))+'%';
		case 404:
			return '<br>DvP-M-3<br>Raise all effects of DeFe308 to the power of 1.08 (+0.08 per level)<br>Currently: ^'+format(gridEffect('li',id));
		case 505:
			return '<br>DvP-M-4<br>Upgrade DvP-M-x (x=1,2,3) is 20% stronger per level<br>Currently: x'+format(gridEffect('li',id));
		case 201:
			return '<br>DvP-B-1<br>Multiply the effect of Dilation Point by 1.1 (+0.1 per level)<br>Currently: x'+format(gridEffect('li',id));
		case 301:
			return '<br>DvP-B-2<br>Raise the Compressed Timewall cap to the power of 1.2 (+0.2 per level)<br>Currently: ^'+format(gridEffect('li',id));
		case 401:
			return '<br>DvP-B-3<br>Each DeFe308 multiply DP gain by 2^0.1 (+0.1 per level)<br>Currently: x'+format(gridEffect('li',id));
		case 501:
			return '<br>DvP-B-4<br>Upgrade DvP-T-x (x=1,2,3) is 20% stronger per level<br>Currently: x'+format(gridEffect('li',id));
	}}
	else{switch (id) {
		case 101:
			return '<br>DvP-C<br>永恒点数每多一个数量级，膨胀点数获取+1%，每级使效果作用次数+1<br>当前: x'+format(gridEffect('li',id));
		case 102:
			return '<br>DvP-T-1<br>削弱溜胀，将其等级x0.99 (每级-0.01)<br>当前: x'+format(gridEffect('li',id));
		case 103:
			return '<br>DvP-T-2<br>点数指数因子效果x1.2 (每级+0.2)，但只在溜胀中生效<br>当前: x'+format(gridEffect('li',id));
		case 104:
			return '<br>DvP-T-3<br>在拥有至少48个永恒升级后，膨胀点数获取x(总升级点数^0.1) (每级指数+0.1)<br>当前: x'+format(gridEffect('li',id));
		case 105:
			return '<br>DvP-T-4<br>每级使升级DvP-B-x (x=1,2,3) 的有效等级+20%<br>当前: +'+format(gridEffect('li',id))+'%';
		case 202:
			return '<br>DvP-M-1<br>每级使膨胀点数倍增器的底数+0.1<br>当前: +'+format(gridEffect('li',id));
		case 303:
			return '<br>DvP-M-2<br>每级使Monika可购买的强度+10%<br>当前: +'+format(gridEffect('li',id).times(100))+'%';
		case 404:
			return '<br>DvP-M-3<br>DeFe308的所有效果变为原来的1.08次方 (每级+0.08)<br>当前: ^'+format(gridEffect('li',id));
		case 505:
			return '<br>DvP-M-4<br>每级使升级DvP-M-x (x=1,2,3) 的有效等级+20%<br>当前: +'+format(gridEffect('li',id))+'%';
		case 201:
			return '<br>DvP-B-1<br>膨胀点数的效果x1.05 (每级+0.05)<br>当前: x'+format(gridEffect('li',id));
		case 301:
			return '<br>DvP-B-2<br>压缩时间墙上限变为原来的1.2次方 (每级+0.2)<br>当前: ^'+format(gridEffect('li',id));
		case 401:
			return '<br>DvP-B-3<br>每个DeFe308使膨胀点数获取变为原来的2^0.1倍 (每级使指数+0.1)<br>当前: x'+format(gridEffect('li',id));
		case 501:
			return '<br>DvP-B-4<br>每级使升级DvP-T-x (x=1,2,3) 的有效等级+20%<br>当前: +'+format(gridEffect('li',id))+'%';
	}}
}

function resetDvp(){
	if(getBuyableAmount('li',21).sub(tmp.li.unspentDvP).gte(5)) grantAchievement('A',234)
    if(getBuyableAmount('li',21).sub(tmp.li.unspentDvP).eq(0)) grantAchievement('SA',43)
    for (let i = 0; i < player.li.effGrid.length; i++) {setGridData('li',player.li.effGrid[i],0)}
    if(!hasMilestone('li',2)) player.li.points=n(0)
    player.li.dilpoint=n(0)
    doReset('E',player.I.points.lt(n(2).pow(1024)))
}