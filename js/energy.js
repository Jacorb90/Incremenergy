var energyUpgs = {
	upgs: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9},
	cols: {
		1: {1: 1, 2: 2, 3: 3},
		2: {4: 4, 5: 5, 6: 6},
		3: {7: 7, 8: 8, 9: 9},
	},
	1: {
		title: "Chargers",
		display() { return "Increase the Energy exponent by "+format(tmp.en.upgs[1].gainPer)+"." },
		cost(x) { 
			if (tmp.sup) x = x.sub(tmp.sup.upgs[3].eff||0).sub(tmp.sup.upgs[6].eff||0);
			if (x.lte(0)) return new Decimal(1);
			return Decimal.pow(10, x.sub(1).max(0).pow(2).plus(1)) 
		},
		target(r) {
			if (r.lt(1)) return new Decimal(0);
			if (r.lt(10)) return new Decimal(1).add(tmp.sup.upgs[3].eff||0).add(tmp.sup.upgs[6].eff||0);
			r = r.max(1).log10().sub(1).sqrt().plus(1)
			if (tmp.sup) r = r.add(tmp.sup.upgs[3].eff||0).add(tmp.sup.upgs[6].eff||0);
			return r.plus(1).floor();
		},
		gainPer() { return Decimal.add(1, tmp.en.upgs[4]?tmp.en.upgs[4].eff:0).plus(tmp.en.upgs[7]?tmp.en.upgs[7].eff:0) },
		eff(x) { return tmp.en.upgs[1].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[1].eff) },
		extra() { return tmp.sup?tmp.sup.enEff:new Decimal(0) },
		unl() { return true },
	},
	2: {
		title: "Self-Charging Batteries",
		display() { return "Energy increases its exponent by "+format(tmp.en.upgs[2].gainPer)+"." },
		cost(x) { 
			if (tmp.sup) x = x.sub(tmp.sup.upgs[3].eff).sub(tmp.sup.upgs[6].eff||0);
			if (tmp.skills) x = x.times(Decimal.sub(1, tmp.skills[1].eff))
			return Decimal.pow(50, x.lt(0)?x:(x.pow(2.5))).times(1e4) 
		},
		target(r) {
			if (r.lt(1e4)) return new Decimal(0);
			r = r.div(1e4).max(1).log(50).root(2.5);
			if (tmp.skills) r = r.div(Decimal.sub(1, tmp.skills[1].eff))
			if (tmp.sup) r = r.add(tmp.sup.upgs[3].eff||0).add(tmp.sup.upgs[6].eff||0);
			return r.plus(1).floor();
		},
		gainPer() { 
			let per = player.energy.plus(1).log10().plus(1).log10();
			if (per.gte(2) && !player.mega.upgrades.includes(12)) per = per.times(2).sqrt();
			if (per.gte(3) && !player.mega.upgrades.includes(12)) per = Decimal.pow(3, per.log(3).sqrt());
			if (player.mega.upgrades.includes(7) && tmp.mega) per = per.times(tmp.mega.upgs[7].eff)
			if (tmp.en.upgs[8]) per = per.plus(tmp.en.upgs[8].eff);
			return per;
		},
		eff(x) { return tmp.en.upgs[2].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[2].eff) },
		extra() { return Decimal.add(tmp.sup?tmp.sup.enEff:0, tmp.en.upgs[5]?tmp.en.upgs[5].eff:0) },
		unl() { return true },
	},
	3: {
		title: "Galvanic Compressors",
		display() { return "Increase the Energy exponent by "+format(tmp.en.upgs[3].gainPer.times(100))+"%." },
		cost(x) { 
			if (tmp.sup) x = x.sub(tmp.sup.upgs[3].eff).sub(tmp.sup.upgs[6].eff||0);
			return Decimal.pow(5, x.pow(3).plus(1)).times(1e8) 
		},
		target(r) {
			if (r.lt(1e8)) return new Decimal(0);
			r = r.div(1e8).max(1).log(5).root(3);
			if (tmp.sup) r = r.add(tmp.sup.upgs[3].eff||0).add(tmp.sup.upgs[6].eff||0);
			return r.plus(1).floor();
		},
		gainPer() { return new Decimal(0.1).times(tmp.en.upgs[6]?tmp.en.upgs[6].eff:1) },
		eff(x) { return tmp.en.upgs[3].gainPer.times(x).plus(1) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[3].eff.sub(1).times(100))+"%" },
		extra() { return tmp.sup?tmp.sup.enEff:new Decimal(0) },
		unl() { return true },
	},
	4: {
		title: "Superchargers",
		display() { return "Increase the above upgrade's effect by "+format(tmp.en.upgs[4].gainPer)+"." },
		cost(x) { 
			if (tmp.sup) x = x.sub(tmp.sup.upgs[6].eff||0);
			return Decimal.pow(125, x.lt(0)?x:(x.plus(1).pow(4))).times(8e15) 
		},
		target(r) {
			if (r.lt(8e15)) return new Decimal(0);
			r = r.div(8e15).max(1).log(125).root(4);
			if (tmp.sup) r = r.add(tmp.sup.upgs[6].eff||0);
			return r.plus(1).floor();
		},
		gainPer() { return new Decimal(0.25).plus(tmp.en.upgs[7]?tmp.en.upgs[7].eff:0) },
		eff(x) { return tmp.en.upgs[4].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[4].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.sup.times.gt(0)||player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
	5: {
		title: "Super Drives",
		display() { return "Super-Energy adds "+format(tmp.en.upgs[5].gainPer)+" free levels to the above upgrade." },
		cost(x) { 
			if (tmp.sup) x = x.sub(tmp.sup.upgs[6].eff||0);
			return Decimal.pow(100, x.plus(1).pow(5)).times(1e34) 
		},
		target(r) {
			if (r.lt(1e34)) return new Decimal(0);
			r = r.div(1e34).max(1).log(100).root(5);
			if (tmp.sup) r = r.add(tmp.sup.upgs[6].eff||0);
			return r.plus(1).floor();
		},
		gainPer() {
			let per = player.sup.energy.max(1).log10().plus(1).log10().times(10)
			if (per.gte(3) && !player.mega.upgrades.includes(12)) per = per.times(3).sqrt();
			if (per.gte(5) && !player.mega.upgrades.includes(12)) per = Decimal.pow(5, per.log(5).sqrt());
			return per;
		},
		eff(x) { return tmp.en.upgs[5].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[5].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.sup.times.gt(0)||player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
	6: {
		title: "Archaic Processors",
		display() { return "Increase the above upgrade's effect by "+format(tmp.en.upgs[6].gainPer.times(100))+"%." },
		cost(x) { 
			if (tmp.sup) x = x.sub(tmp.sup.upgs[6].eff||0);
			return Decimal.pow(10, x.lt(0)?x:(x.plus(1).pow(6))).times(1e99) 
		},
		target(r) {
			if (r.lt(1e99)) return new Decimal(0);
			r = r.div(1e99).max(1).log10().root(6);
			if (tmp.sup) r = r.add(tmp.sup.upgs[6].eff||0);
			return r.plus(1).floor();
		},
		gainPer() { return new Decimal(0.15) },
		eff(x) { return tmp.en.upgs[6].gainPer.times(x).plus(1) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[6].eff.sub(1).times(100))+"%" },
		extra() { return new Decimal(0) },
		unl() { return player.sup.times.gt(0)||player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
	7: {
		title: "True Souls",
		display() { return "Mega Factories increase the effects of both above upgrades by "+format(tmp.en.upgs[7].gainPer)+"." },
		cost(x) { return Decimal.pow("1e1000", Decimal.pow(1.5, x.plus(1).log2().pow(2))).times("1e2000") },
		target(r) {
			if (r.lt("1e3000")) return new Decimal(0);
			r = Decimal.pow(2, r.div("1e2000").max(1).log("1e1000").max(1).log(1.5).sqrt()).sub(1)
			return r.plus(1).floor();
		},
		gainPer() { return new Decimal(0.075).times(player.mega.factories) },
		eff(x) { return tmp.en.upgs[7].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[7].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
	8: {
		title: "Holy Destroyers",
		display() { return "Self-Charging Batteries increase their effect by "+format(tmp.en.upgs[8].gainPer)+"." },
		cost(x) { return Decimal.pow("1e2000", Decimal.pow(1.75, x.plus(1).log2().pow(2))).times("1e18000") },
		target(r) {
			if (r.lt("1e20000")) return new Decimal(0);
			r = Decimal.pow(2, r.div("1e18000").max(1).log("1e2000").max(1).log(1.75).sqrt()).sub(1)
			return r.plus(1).floor();
		},
		gainPer() { 
			let per = tmp.en.upgs[2].lvl.plus(1).log10().cbrt().div(10) 
			if (player.mega.upgrades.includes(7) && tmp.mega) per = per.times(tmp.mega.upgs[7].eff)
			return per;
		},
		eff(x) { return tmp.en.upgs[8].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[8].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
	9: {
		title: "Voltaic Conductors",
		display() { return "Galvanic Compressors increase the Super-Energy exponent by "+format(tmp.en.upgs[9].gainPer)+"." },
		cost(x) { return Decimal.pow("1e3000", Decimal.pow(2, x.plus(1).log2().pow(2))).times("1e77000") },
		target(r) {
			if (r.lt("1e80000")) return new Decimal(0);
			r = Decimal.pow(2, r.div("1e77000").max(1).log("1e3000").max(1).log2().sqrt()).sub(1)
			return r.plus(1).floor();
		},
		gainPer() { return tmp.en.upgs[3].lvl.plus(1).log10().plus(1).log10().div(2) },
		eff(x) { return tmp.en.upgs[9].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.en.upgs[9].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
}

function getGlobalEnergyUpgPower() {
	return new Decimal(1);
}

function getEnergyExp() {
	if (!tmp.en.upgs) return new Decimal(1);
	let exp = new Decimal(0);
	exp = exp.plus(tmp.en.upgs[1].eff)
	exp = exp.plus(tmp.en.upgs[2].eff)
	if (tmp.mega) exp = exp.plus(tmp.mega.enEff);
	if (player.mega.upgrades.includes(11) && tmp.mega) exp = exp.plus(tmp.mega.upgs[11].eff.normal)
	if (tmp.hyper) exp = exp.plus(tmp.hyper.enEff2)
	
	exp = exp.times(tmp.en.upgs[3].eff)
	return fortuneNerf(exp);
}

function getEnergyUpgScalingPower(x, y) {
	let power = new Decimal(1)
	if (player.mega.upgrades.includes(16) && tmp.skills && x==2 && (y==1||y==3)) power = Decimal.sub(1, tmp.skills[1].eff)
	if (player.mega.upgrades.includes(18) && y==1 && x!=2) power = new Decimal(.8);
	return power;
}

function scaledEnergyUpgs(n, x) {
	if (n.gte(80)) {
		let p = getEnergyUpgScalingPower(x, 1).max(.28)
		n = n.pow(p.times(2)).div(Decimal.pow(80, p.times(2).sub(1)))
	}
	if (n.gte(500)) {
		let p = getEnergyUpgScalingPower(x, 2).max(.28)
		n = n.pow(p.times(3)).div(Decimal.pow(500, p.times(3).sub(1)))
	}
	if (n.gte(2e3)) {
		let p = getEnergyUpgScalingPower(x, 3).max(.28)
		n = Decimal.pow(2e3, n.log(2e3).pow(p.times(2)))
	}
	if (n.gte(1.75e5)) {
		let p = getEnergyUpgScalingPower(x, 4)
		n = Decimal.pow(p.times(4).plus(1), n.div(1.75e5).sub(1).max(0)).times(1.75e5)
	}
	return n;
}

function revScaledEnergyUpgs(n, x) {
	if (n.gte(1.75e5)) {
		let p = getEnergyUpgScalingPower(x, 4)
		n = n.div(1.75e5).log(p.times(4).plus(1)).plus(1).times(1.75e5)
	}
	if (n.gte(2e3)) {
		let p = getEnergyUpgScalingPower(x, 3).max(.28)
		n = Decimal.pow(2e3, n.log(2e3).root(p.times(2)))
	}
	if (n.gte(500)) {
		let p = getEnergyUpgScalingPower(x, 2).max(.28)
		n = n.times(Decimal.pow(500, p.times(3).sub(1))).root(p.times(3))
	}
	if (n.gte(80)) {
		let p = getEnergyUpgScalingPower(x, 1).max(.28)
		n = n.times(Decimal.pow(80, p.times(2).sub(1))).root(p.times(2))
	}
	return n;
}

function buyEnergyUpg(x) {
	if (player.energy.lt(energyUpgs[x].cost(scaledEnergyUpgs(player.upgs[x]||new Decimal(0), x)))) return;
	if (player.mega.upgrades.includes(3)) {
		let target = revScaledEnergyUpgs(energyUpgs[x].target(player.energy).sub(1), x).plus(1);
		player.upgs[x] = Decimal.max(player.upgs[x]||0, target);
	} else {
		player.energy = player.energy.sub(tmp.en.upgs[x].cost).max(0)
		player.upgs[x] = Decimal.add(player.upgs[x]||0, 1);
	}
}

function doEnergyTick(diff) {
	if (tmp.en.divPerSec.gt(1)) {
		player.energy = player.energy.root(tmp.en.exp).plus(tmp.en.gain.times(diff)).pow(tmp.en.exp)
		player.energy = player.energy.div(tmp.en.divPerSec.pow(diff));
	} else player.energy = player.energy.root(tmp.en.exp).plus(tmp.en.gain.times(diff)).pow(tmp.en.exp)
}

function getEnergyOverflowStart() {
	let start = new Decimal("1e5000")
	if (player.mega.upgrades.includes(2) && tmp.mega) start = start.times(tmp.mega.upgs[2].eff)
	return start;
}

function getEnergyOverflowScaleData() {
	let data = {
		1: {
			start: new Decimal("1e250000"),
			impl(x, s, p) { return Decimal.pow(10, x.log10().pow(p.plus(1)).div(s.start.log10().pow(p))) },
		},
	}
	return data;
}

function getEnergyOverflowPower() {
	let power = new Decimal(1);
	if (tmp.hyper) power = power.sub(tmp.hyper.enEff)
	return power;
}

function getEnergyOverflowDiv(e=player.energy) {
	if (e.lt(tmp.en.overflowStart)) return new Decimal(1);
	let p = getEnergyOverflowPower();
	for (let s in tmp.en.overflowScaling) if (e.gte(tmp.en.overflowScaling[s].start)) e = tmp.en.overflowScaling[s].impl(e, tmp.en.overflowScaling[s], p)
	let div = e.div(tmp.en.overflowStart).max(1).root(Decimal.div(10, p))
	return div;
}

function getGlobalEnergyLevels() {
	let lvl = new Decimal(0);
	if (tmp.hyper) lvl = lvl.plus(tmp.hyper.upgs[3].eff)
	return lvl
}