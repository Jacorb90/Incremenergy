var hyperUpgs = {
	upgs: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9},
	cols: {
		1: {1: 1, 2: 2, 3: 3},
		2: {4: 4, 5: 5, 6: 6},
		3: {7: 7, 8: 8, 9: 9},
	},
	1: {
		title: "Accelerated Neutrinos",
		display() { return "Hyper-Energy increases the Super-Energy exponent by "+format(tmp.hyper.upgs[1].gainPer.times(100))+"%." },
		cost(x) { return Decimal.pow(10, Decimal.pow(2, x.plus(1).log2().pow(2))) },
		gainPer() { return player.hyper.energy.plus(1).log10().sqrt().div(50) },
		eff(x) { return tmp.hyper.upgs[1].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.hyper.upgs[1].eff.times(100))+"%" },
		extra() { return (player.ultra.energy.gte(1e4)&&tmp.hyper.upgs[9])?tmp.hyper.upgs[9].eff:new Decimal(0) },
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
		extra() { return (player.ultra.energy.gte(1e4)&&tmp.hyper.upgs[9])?tmp.hyper.upgs[9].eff:new Decimal(0) },
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
		extra() { return (player.ultra.energy.gte(1e4)&&tmp.hyper.upgs[9])?tmp.hyper.upgs[9].eff:new Decimal(0) },
		unl() { return player.hyper.times.gt(0) },
	},
	4: {
		title: "Gravity Pillars",
		display() { return "Increase the Mega-Energy effect by "+format(tmp.hyper.upgs[4].gainPer.times(100))+"% (based on upg level)" },
		cost(x) { return Decimal.pow(1e20, Decimal.pow(1.5, x.pow(1.5))).times(1e180) },
		gainPer() { return Decimal.mul(1.5, player.hyper.upgs[4]||0).plus(1) },
		eff(x) { return tmp.hyper.upgs[4].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.hyper.upgs[4].eff.times(100))+"%" },
		extra() { return (player.ultra.energy.gte(1e4)&&tmp.hyper.upgs[9])?tmp.hyper.upgs[9].eff:new Decimal(0) },
		unl() { return player.hyper.times.gt(0) && player.mega.upgrades.includes(30) },
	},
	5: {
		title: "Electric Presents",
		display() { return "Multiply the upper limit of Gift gain by "+format(tmp.hyper.upgs[5].gainPer) },
		cost(x) { return Decimal.pow(1e80, Decimal.pow(10, x.root(1.5).plus(1).log10().pow(2))).times("1e320") },
		gainPer() { return new Decimal(20) },
		eff(x) { return Decimal.pow(tmp.hyper.upgs[5].gainPer, x) },
		power() { return new Decimal(1) },
		displayEff() { return format(tmp.hyper.upgs[5].eff)+"x" },
		extra() { return (player.ultra.energy.gte(1e4)&&tmp.hyper.upgs[9])?tmp.hyper.upgs[9].eff:new Decimal(0) },
		unl() { return player.hyper.times.gt(0) && player.mega.upgrades.includes(30) },
	},
	6: {
		title: "Atomic Eruptions",
		display() { return "Unlocked Stars increase Split Atom gain & effect exponents by "+format(tmp.hyper.upgs[6].gainPer) },
		cost(x) { 
			let y = x;
			if (y.gte(30)) y = Decimal.pow(30, y.log(30).pow(2));
			if (y.gte(25)) y = y.pow(2).div(25);
			return Decimal.pow(1e50, Decimal.pow(1.4, y.pow(1.1))).times("1e375") 
		},
		gainPer() { 
			let x = tmp.const?tmp.const.starsCanUnl:0;
			if (x>=10) x = Math.pow(x, 2)/10
			return Decimal.mul(0.02, x); 
		},
		eff(x) { return tmp.hyper.upgs[6].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.hyper.upgs[6].eff) },
		extra() { return (player.ultra.energy.gte(1e4)&&tmp.hyper.upgs[9])?tmp.hyper.upgs[9].eff:new Decimal(0) },
		unl() { return player.hyper.times.gt(0) && player.mega.upgrades.includes(30) },
	},
	7: {
		title: "Evolved Amoebas",
		display() { return "Increase the "+(ultraChoice(2, 2)?"Mega & ":"")+"Hyper-Energy exponent"+(ultraChoice(2, 2)?"s":"")+" by "+format(tmp.hyper.upgs[7].gainPer.times(100))+"%" },
		cost(x) { return Decimal.pow(1e33, Decimal.pow(1.5, x.pow(2))).times("3.33e300") },
		gainPer() { return new Decimal(0.5) },
		eff(x) { return tmp.hyper.upgs[7].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.hyper.upgs[7].eff.times(100))+"%" },
		extra() { return (player.ultra.energy.gte(1e4)&&tmp.hyper.upgs[9])?tmp.hyper.upgs[9].eff:new Decimal(0) },
		unl() { return player.ultra.times.gt(0) },
	},
	8: {
		title: "Nuclear Strings",
		display() { return "Ultra-Energy increases the Split Atom & Mega Factory effect exponents by "+format(tmp.hyper.upgs[8].gainPer.times(100))+"%" },
		cost(x) { return Decimal.pow(Number.MAX_VALUE, Decimal.pow(2, x.pow(1.5)).sub(1)).times("1e10000") },
		gainPer() { return player.ultra.energy.plus(1).log10().plus(1).log2().times(1.5) },
		eff(x) { return tmp.hyper.upgs[8].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.hyper.upgs[8].eff.times(100))+"%" },
		extra() { return (player.ultra.energy.gte(1e4)&&tmp.hyper.upgs[9])?tmp.hyper.upgs[9].eff:new Decimal(0) },
		unl() { return player.ultra.energy.gte(1500) },
	},
	9: {
		title: "Concentrated Plutonium",
		display() { return "Add "+format(tmp.hyper.upgs[9].gainPer)+" free levels to all previous Hyper Upgrades." },
		cost(x) { return Decimal.pow("1e5000", Decimal.pow(2.5, x.pow(2.5)).sub(1)).times("1e200000") },
		gainPer() { return new Decimal(1.5) },
		eff(x) { return tmp.hyper.upgs[9].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.hyper.upgs[9].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.ultra.energy.gte(1e4) },
	},
}

function canHyperReset() {
	return tmp.en.exp.gte(6e8)
}

function getHyperGainMult() {
	let mult = new Decimal(1);
	if (player.mega.upgrades.includes(21)) mult = mult.times(tmp.mega.upgs[21].eff);
	if (player.mega.upgrades.includes(28)) mult = mult.times(player.hyper.times.max(1));
	if (player.unlocks.includes("Constellations") && tmp.const) mult = mult.times(tmp.const.darkEff);
	return mult;
}

function getHyperGainExp() {
	let exp = new Decimal(.5);
	if (player.mega.upgrades.includes(30) && tmp.hyper.upgs) exp = exp.plus(tmp.hyper.upgs[6].eff);
	return exp;
}

function getHyperGain() {
	if (tmp.en.exp.lt(6e8)) return new Decimal(0);
	let exp = tmp.en.exp;
	if (exp.gte(1e16)) exp = Decimal.pow(1e16, exp.log(1e16).root(exp.log(1e16).plus(1).log2().plus(1)))
	return Decimal.pow(6e8, exp.log(6e8).pow(getHyperGainExp())).div(6e8).times(getHyperGainMult()).floor()
}

function getHyperPowerToExpMult() {
	let mult = new Decimal(1);
	if (player.mega.upgrades.includes(15)) mult = new Decimal(1.75);
	if (player.mega.upgrades.includes(23)) mult = mult.times(1.25);

	if (player.mega.upgrades.includes(30) && tmp.hyper.upgs) mult = mult.times(tmp.hyper.upgs[6].eff.plus(1));
	if (player.ultra.energy.gte(1500) && tmp.hyper.upgs) mult = mult.times(tmp.hyper.upgs[8].eff.plus(1));
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
	if (tmp.ultra) exp = exp.plus(tmp.ultra.enEff2)

	if (player.mega.upgrades.includes(26)) exp = exp.times(1.2);
	if (tmp.ultra) exp = exp.times(tmp.ultra.enEff);
	if (player.ultra.times.gt(0) && tmp.hyper.upgs) exp = exp.times(tmp.hyper.upgs[7].eff.plus(1));

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
	doConstellationTick(diff);
}

function getHyperResetGain() {
	return ultraChoice(3, 1)?player.ultra.times.plus(1):1
}

function hyperReset(force=false, updates=2) {
	if (!force) {
		if (!canHyperReset()) return;
		player.hyper.splitAtoms = player.hyper.splitAtoms.plus(tmp.hyper.gain)
		player.hyper.times = player.hyper.times.plus(getHyperResetGain());
	}
	
	player.mega = {
		factories: new Decimal(0),
		energy: new Decimal(1),
		upgrades: ((player.mega.upgrades.includes(15)||player.mega.upgrades.includes(27))&&updates<=2)?player.mega.upgrades.filter(x => x>((player.mega.upgrades.includes(27)&&player.mega.upg27active)?24:12)):[],
		xp: {},
		upg27active: updates<=2?player.mega.upg27active:true,
	}
	
	megaReset(true, updates+1)
}

function getHyperEnergyEff() {
	let e = player.hyper.energy;
	if (e.gte("1e5000")) e = Decimal.pow(10, Decimal.sub(5000, Decimal.div(5000, e.log("1e5000").max(1).log10().plus(1))).plus(5000))
	return Decimal.sub(1, Decimal.div(1, e.max(1).log10().plus(1)))
}

function getHyperEnergyEff2() {
	let log = player.hyper.energy.max(1).log10().times(2);
	if (log.gte(10)) log = Decimal.pow(10, log.log10().root(Decimal.sub(2, tmp.starEff||0)))
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