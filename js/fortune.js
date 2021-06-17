var fortune_req = new Decimal(2);

function getFortuneExp() {
	let exp = tmp.fortune.furthestToExp
	if (player.mega.upgrades.includes(19)) exp = exp.plus(.1)
	if (player.mega.upgrades.includes(23)) exp = exp.plus(tmp.mega.upgs[23].eff)
	if (tmp.ultra) exp = exp.plus(tmp.ultra.enEff2)
	if (ultraChoice(6, 1) && player.mega.upgrades.includes(27) && player.mega.upg27active) exp = exp.plus(tmp.mega.upgs[27].eff)
	
	exp = exp.times(tmp.fortune.eff1)
	return fortuneNerf(exp)
}

function getFortuneFurthestEff() {
	let eff = Decimal.pow(2, player.fortune.furthest.plus(1).log2().sqrt()).sub(1).div(50);
	if (player.unlocks.includes("Constellations") && tmp.const) eff = eff.times(tmp.const.darkEff2);
	return eff;
}

function doFortuneTick(diff) {
	player.fortune.energy = player.fortune.energy.root(tmp.fortune.exp).plus(diff).pow(tmp.fortune.exp);
	if (player.fortune.active) player.fortune.furthest = player.fortune.furthest.max(tmp.en.exp);
}

function startUnfortuneRun() {
	player.fortune.active = !player.fortune.active
	hyperReset(true)
}

function fortuneNerf(x) {
	if (player.fortune.active && x.gte(1)) return x.sqrt();
	else return x;
}

function giftGainMult() {
	let mult = new Decimal(1);
	if (player.mega.upgrades.includes(19)) mult = new Decimal(1.5);
	if (player.mega.upgrades.includes(21)) mult = mult.times(tmp.mega.upgs[21].eff);
	if (player.unlocks.includes("Constellations") && tmp.const) mult = mult.times(tmp.const.darkEff);
	return mult;
}

function upperLimGiftGainMult() {
	let mult = new Decimal(1);
	if (player.mega.upgrades.includes(30)) mult = mult.times(tmp.hyper.upgs[5].eff);
	return mult;
}

function fortuneGainSoftcap(x) {
	if (x.gte(10)) x = Decimal.pow(10, x.log10().sqrt())
	return x;
}

function addToKarma() {
	let add = new Decimal(0);
	if (player.mega.upgrades.includes(24)) add = tmp.mega.upgs[24].eff.karma;
	if (ultraChoice(4, 2)) add = add.plus(.25);
	return add;
}

function giftRNG(auto=false) {
	if (player.fortune.energy.lt(fortune_req)) return;
	let oMin = tmp.fortune.minGain
	let max = tmp.fortune.maxGain
	let range;
	let min;
	let toAdd;
	if (ultraChoice(4, 2)) {
		range = max.div(oMin.max(1)).pow(player.fortune.karma.plus(tmp.fortune.addKarma));
		min = oMin.times(range).max(1);
		toAdd = min.times(max.div(min).pow(Math.random()))
	} else {
		range = max.sub(oMin).times(player.fortune.karma.plus(tmp.fortune.addKarma))
		min = oMin.plus(range).max(0)
		toAdd = min.plus(max.sub(min).times(Math.random()))
	}
	player.fortune.gifts = player.fortune.gifts.plus(toAdd)
	player.fortune.karma = oMin.plus(max.sub(oMin).div(2)).sub(toAdd).div(max).times(2)
	player.fortune.energy = (player.mega.upgrades.includes(19)||player.mega.upgrades.includes(27))?player.fortune.energy.sub(1):new Decimal(1);
}