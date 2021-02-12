var superUpgs = {
	upgs: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6},
	cols: {
		1: {1: 1, 2: 2, 3: 3},
		2: {4: 4, 5: 5, 6: 6},
	},
	1: {
		title: "Heroic Stones",
		display() { return "The # of times supercharged adds "+format(tmp.sup.upgs[1].gainPer)+" to the Super-Energy effect." },
		cost(x) { return Decimal.pow(2, x.pow(2)).times(25) },
		gainPer() { 
			let x = player.sup.times.plus(1).log10().div(1.5) 
			if (x.gte(1.5)) x = Decimal.pow(1.5, x.log(1.5).sqrt()).min(x.times(1.5).sqrt())
			if (player.mega.upgrades.includes(6) && tmp.mega) x = x.plus(tmp.mega.upgs[6].eff)
			return x;
		},
		eff(x) { return tmp.sup.upgs[1].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[1].eff) },
		extra() { return tmp.sup.upgs[4]?tmp.sup.upgs[4].eff:0 },
		unl() { return player.unlocks.includes("Auto") },
	},
	2: {
		title: "Power Plants",
		display() { return "Energy adds "+format(tmp.sup.upgs[2].gainPer)+" to the Super-Energy exponent." },
		cost(x) { return Decimal.pow(5, x.pow(2.5)).times(1e3) },
		gainPer() { 
			let per = player.energy.plus(1).log10().plus(1).log10().plus(1).log10().div(5);
			if (per.gte(2)) per = per.times(2).sqrt();
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			return per;
		},
		eff(x) { return tmp.sup.upgs[2].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[2].eff) },
		extra() { return tmp.sup.upgs[4]?tmp.sup.upgs[4].eff:0 },
		unl() { return player.unlocks.includes("Auto") },
	},
	3: {
		title: "Organic Tellers",
		display() { return "The first 3 Energy Upgrade costs are extended by "+format(tmp.sup.upgs[3].gainPer)+" levels." },
		cost(x) { return Decimal.pow(10, x.pow(3)).times(1e6) },
		gainPer() { 
			let per = new Decimal(5) 
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			return per;
		},
		eff(x) { return tmp.sup.upgs[3].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[3].eff) },
		extra() { return tmp.sup.upgs[4]?tmp.sup.upgs[4].eff:0 },
		unl() { return player.unlocks.includes("Auto") },
	},
	4: {
		title: "Mega Trophies",
		display() { return "Mega Energy adds "+format(tmp.sup.upgs[4].gainPer)+" levels to the first 3 Super Upgrades." },
		cost(x) { return Decimal.pow(1e4, x.pow(4)).times(1e20) },
		gainPer() { 
			let per = player.mega.energy.plus(1).log10().plus(1).log10().times(2.5) 
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			return per;
		},
		eff(x) { return tmp.sup.upgs[4].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[4].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.mega.factories.gt(0) },
	},
	5: {
		title: "Prestige Cities",
		display() { return "Get "+formatWhole(tmp.sup.upgs[5].gainPer)+" more supercharged resets on each Super reset." },
		cost(x) { return Decimal.pow(1e6, x.pow(5)).times(1e32) },
		gainPer() { 
			let per = new Decimal(9) 
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			if (player.mega.upgrades.includes(10) && tmp.mega) per = per.times(tmp.mega.upgs[10].eff)
			return per;
		},
		eff(x) { return tmp.sup.upgs[5].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+formatWhole(tmp.sup.upgs[5].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.mega.factories.gt(0) },
	},
	6: {
		title: "Mega Organic Tellers",
		display() { return "The first 6 Energy Upgrade costs are extended by "+format(tmp.sup.upgs[6].gainPer)+" levels." },
		cost(x) { return Decimal.pow(1e10, x.pow(6)).times(1e50) },
		gainPer() { 
			let per = new Decimal(4) 
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			return per;
		},
		eff(x) { return tmp.sup.upgs[6].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[6].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.mega.factories.gt(0) },
	},
}

function scaledSuperUpgs(n) {
	if (n.gte(80)) n = n.pow(2).div(80)
	if (n.gte(500)) n = n.pow(3).div(25e4)
	if (n.gte(2e3)) n = Decimal.pow(2e3, n.log(2e3).pow(2))
	return n;
}

function revScaledSuperUpgs(n) {
	if (n.gte(2e3)) n = Decimal.pow(2e3, n.log(2e3).sqrt());
	if (n.gte(500)) n = n.times(25e4).cbrt()
	if (n.gte(80)) n = n.times(80).sqrt()
	return n;
}

function buySuperUpg(x) {
	if (player.sup.energy.lt(superUpgs[x].cost(scaledSuperUpgs(player.sup.upgs[x]||new Decimal(0))))) return;
	player.sup.energy = player.sup.energy.sub(tmp.sup.upgs[x].cost)
	player.sup.upgs[x] = Decimal.add(player.sup.upgs[x]||0, 1);
}

function canSuperReset() {
	return tmp.en.exp.gte(12)&&player.sup.timer==0
}

function addToSupEnExp() {
	let add = new Decimal(0);
	if (tmp.sup.upgs) add = add.plus(tmp.sup.upgs[2].eff)
	if (tmp.mega) add = add.plus(tmp.mega.enEff);
	if (tmp.en.upgs[9]) add = add.plus(tmp.en.upgs[9].eff);
	if (player.mega.upgrades.includes(11) && tmp.mega) add = add.plus(tmp.mega.upgs[11].eff.sup)
	return add;
}

function multiplySupEnExp() {
	let mult = new Decimal(1);
	if (player.mega.upgrades.includes(5) && tmp.mega) mult = mult.times(tmp.mega.upgs[5].eff);
	return mult;
}

function getSuperExp(x=player.sup.totalExpInput) {
	let toAdd = addToSupEnExp();
	let mult = multiplySupEnExp();
	if (x.lt(12)) return new Decimal(toAdd);
	else if (x.lt(144)) return Decimal.pow(1.25, x.div(12).sqrt()).sub(1).times(mult).plus(toAdd)
	else if (x.lt(4e8)) return Decimal.pow(1.25, Decimal.pow(12, x.log(12).sqrt().sub(Math.sqrt(2)-1)).sqrt()).sub(1).times(mult).plus(toAdd)
	else if (x.lt(5e9)) return Decimal.pow(1.25, Decimal.pow(12, Decimal.pow(0.5, x.div(4e8).sqrt().sub(1).max(0)).times(x).log(12).sqrt().sub(Math.sqrt(2)-1)).sqrt()).sub(1).times(mult).plus(toAdd)
	else return Decimal.pow(1.25, Decimal.pow(12, x.log(5e9).times(862379150).log(12).sqrt().sub(Math.sqrt(2)-1)).sqrt()).sub(1).times(mult).plus(toAdd)
}

function getSuperResetStatGain() {
	return tmp.sup.upgs[5].eff.plus(1)
}

function superReset(force=false) {
	if (!force) {
		if (!canSuperReset()) return;
		player.sup.totalExpInput = player.sup.totalExpInput.plus(tmp.en.exp)
		let newExp = getSuperExp()
		player.sup.energy = player.sup.energy.root(newExp).plus(tmp.sup.gain).pow(newExp);
		player.sup.times = player.sup.times.plus(getSuperResetStatGain());
	}
	player.sup.timer = 1;
	
	player.energy = new Decimal(1)
	player.upgs = {}
	
	updateTemp();
	updateTemp();
}

function getSuperEnergyEff() {
	let eff = player.sup.energy.max(1).log2()
	if (eff.gte(3)) {
		if (player.unlocks.includes("Skills")) {
			let softcapPower = Decimal.sub(1, tmp.skills?tmp.skills[1].eff:0)
			let val1 = Decimal.pow(3, eff.log(3).sqrt()).min(eff.times(3).sqrt());
			let val2 = eff.times(3).sqrt()
			eff = val1.pow(softcapPower).times(val2.pow(Decimal.sub(1, softcapPower)));
		} else eff = Decimal.pow(3, eff.log(3).sqrt()).min(eff.times(3).sqrt())
	}
	if (tmp.sup.upgs) eff = eff.plus(tmp.sup.upgs[1].eff);
	return eff;
}

function doSuperTick(diff) {
	player.sup.timer = Math.max(player.sup.timer-diff, 0)
	if (tmp.sup.divPerSec.gt(1) && !tmp.auto.superEn.active) player.sup.energy = player.sup.energy.div(tmp.sup.divPerSec.pow(diff));
}

function getSuperOverflowStart() {
	let start = new Decimal("1e5000")
	return start;
}

function getSuperOverflowScaleData() {
	let data = {
		1: {
			start: new Decimal("1e250000"),
			power: new Decimal(1),
			impl(x, s) { return Decimal.pow(10, x.log10().pow(s.power.plus(1)).div(s.start.log10().pow(s.power))) },
		},
	}
	return data;
}

function getSuperOverflowDiv() {
	let e = player.sup.energy;
	if (e.lt(tmp.sup.overflowStart)) return new Decimal(1);
	for (let s in tmp.sup.overflowScaling) if (e.gte(tmp.sup.overflowScaling[s].start)) e = tmp.sup.overflowScaling[s].impl(e, tmp.sup.overflowScaling[s])
	let div = e.div(tmp.sup.overflowStart).max(1).root(10)
	return div;
}