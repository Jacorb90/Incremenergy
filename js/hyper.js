var hyperUpgs = {
	upgs: {1: 1, 2: 2, 3: 3},
	cols: {
		1: {1: 1, 2: 2, 3: 3},
	},
	1: {
		title: "Accelerated Neutrinos",
		display() { return "Hyper-Energy increases the Super-Energy exponent by "+format(tmp.hyper.upgs[1].gainPer.times(100))+"%." },
		cost(x) { return Decimal.pow(10, Decimal.pow(2, x.plus(1).log2().pow(2))) },
		gainPer() { return player.hyper.energy.plus(1).log10().sqrt().div(50) },
		eff(x) { return tmp.hyper.upgs[1].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.hyper.upgs[1].eff.times(100))+"%" },
		extra() { return new Decimal(0) },
		unl() { return player.hyper.times.gt(0) },
	},
	2: {
		title: "Uranium Vessels",
		display() { return "Split atoms subtract the Mega Factory requirement by "+format(tmp.hyper.upgs[2].gainPer)+"." },
		cost(x) { return Decimal.pow(30, Decimal.pow(3, x.plus(1).log(3).pow(3))).times(5/3) },
		gainPer() { 
			let per = player.hyper.splitAtoms.pow(10).plus(1).log2().sqrt().times(1e3) 
			if (player.mega.upgrades.includes(13)) per = per.times(tmp.mega.upgs[13].eff);
			return per;
		},
		eff(x) { return tmp.hyper.upgs[2].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "-"+format(tmp.hyper.upgs[2].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.hyper.times.gt(0) },
	},
	3: {
		title: "Broken Particles",
		display() { return "Mega Factories add "+format(tmp.hyper.upgs[3].gainPer)+" levels to all Energy upgrades." },
		cost(x) { return Decimal.pow(50, Decimal.pow(5, x.plus(1).log(5).pow(5))).times(5) },
		gainPer() { return player.mega.factories.cbrt() },
		eff(x) { return tmp.hyper.upgs[3].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.hyper.upgs[3].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.hyper.times.gt(0) },
	},
}

function canHyperReset() {
	return tmp.en.exp.gte(6e8)
}

function getHyperGainMult() {
	let mult = new Decimal(1);
	if (player.mega.upgrades.includes(21)) mult = mult.times(tmp.mega.upgs[21].eff);
	return mult;
}

function getHyperGain() {
	if (tmp.en.exp.lt(6e8)) return new Decimal(0);
	return Decimal.pow(6e8, tmp.en.exp.log(6e8).sqrt()).div(6e8).times(getHyperGainMult()).floor()
}

function getHyperPowerToExpMult() {
	let mult = new Decimal(1);
	if (player.mega.upgrades.includes(15)) mult = new Decimal(1.75);
	if (player.mega.upgrades.includes(23)) mult = mult.times(1.25);
	return mult;
}

function getHyperPowerToExp() {
	let power = getHyperPowerToExpMult()
	return Decimal.pow(2, player.hyper.power.times(player.hyper.splitAtoms.pow(power)).plus(1).log10().plus(1).log2().sqrt()).sub(1).times(power)
}

function getHyperExp() {
	let exp = tmp.hyper.powerToExp
	if (player.mega.upgrades.includes(14)) exp = exp.plus(tmp.mega.upgs[14].eff)
	if (player.mega.upgrades.includes(22)) exp = exp.plus(tmp.mega.upgs[22].eff)
	if (player.mega.upgrades.includes(24)) exp = exp.plus(tmp.mega.upgs[24].eff.hyper)
	if (tmp.hyper.totalUpgs) exp = exp.sub(tmp.hyper.totalUpgs.times(tmp.hyper.upgDecExp))
	else return new Decimal(0);
	return fortuneNerf(exp.max(0));
}

function getInternalHyperPowerGain() {
	return player.hyper.splitAtoms.pow(2).times(tmp.en.exp.plus(1).root(25))
}

function doHyperTick(diff) {
	player.hyper.energy = player.hyper.energy.root(tmp.hyper.exp).plus(diff).pow(tmp.hyper.exp);
	player.hyper.power = player.hyper.power.plus(getInternalHyperPowerGain().times(diff));
	
	doFortuneTick(diff);
}

function hyperReset(force=false, updates=2) {
	if (!force) {
		if (!canHyperReset()) return;
		player.hyper.splitAtoms = player.hyper.splitAtoms.plus(tmp.hyper.gain)
		player.hyper.times = player.hyper.times.plus(1);
	}
	
	player.mega = {
		factories: new Decimal(0),
		energy: new Decimal(1),
		upgrades: (player.mega.upgrades.includes(15)&&updates==2)?player.mega.upgrades.filter(x => x>12):[],
		xp: {},
	}
	
	megaReset(true, updates+1)
}

function getHyperEnergyEff() {
	return Decimal.sub(1, Decimal.div(1, player.hyper.energy.max(1).log10().plus(1)))
}

function getHyperEnergyEff2() {
	let log = player.hyper.energy.max(1).log10().times(2);
	if (log.gte(10)) log = Decimal.pow(10, log.log10().sqrt())
	return log
}

function scaledHyperUpgs(n) {
	if (n.gte(50)) n = n.pow(2).div(50)
	if (n.gte(1e3)) n = n.pow(3).div(1e6)
	if (n.gte(1e5)) n = Decimal.pow(1e5, n.log(1e5).pow(2))
	return n;
}

function revScaledHyperUpgs(n) {
	if (n.gte(1e5)) n = Decimal.pow(1e5, n.log(1e5).sqrt());
	if (n.gte(1e3)) n = n.times(1e6).cbrt()
	if (n.gte(50)) n = n.times(50).sqrt()
	return n;
}

function buyHyperUpg(x) {
	if (player.hyper.energy.lt(hyperUpgs[x].cost(scaledHyperUpgs(player.hyper.upgs[x]||new Decimal(0))))) return;
	player.hyper.energy = player.hyper.energy.sub(tmp.hyper.upgs[x].cost)
	player.hyper.upgs[x] = Decimal.add(player.hyper.upgs[x]||0, 1);
}

function resetHyperUpgs() {
	if (tmp.hyper.totalUpgs.lt(1)) return;
	if (!confirm("Are you sure you want to reset your Hyper Upgrades? This will force a Hyper reset!")) return;
	player.hyper.upgs = {};
	hyperReset(true)
}