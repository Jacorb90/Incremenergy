var superUpgs = {
	upgs: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9},
	cols: {
		1: {1: 1, 2: 2, 3: 3},
		2: {4: 4, 5: 5, 6: 6},
		3: {7: 7, 8: 8, 9: 9},
	},
	1: {
		title: "Heroic Stones",
		display() { return "The # of times supercharged adds "+format(tmp.sup.upgs[1].gainPer)+" to the Super-Energy effect." },
		cost(x) { return Decimal.pow(2, x.pow(2)).times(25) },
		target(x) { 
			if (x.lt(25)) return new Decimal(0);
			return x.div(25).log2().sqrt().plus(1).floor();
		},
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
		display() { return "Energy adds "+format(tmp.sup.upgs[2].gainPer.times(tmp.sup.upgs[2].power))+" to the Super-Energy exponent." },
		cost(x) { return Decimal.pow(5, x.pow(2.5)).times(1e3) },
		target(x) { 
			if (x.lt(1e3)) return new Decimal(0);
			return x.div(1e3).log(5).root(2.5).plus(1).floor();
		},
		gainPer() { 
			let per = player.energy.plus(1).log10().plus(1).log10().plus(1).log10().div(5);
			if (per.gte(2)) per = per.times(2).sqrt();
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			return per;
		},
		eff(x) { return tmp.sup.upgs[2].gainPer.times(x) },
		power() { return tmp.sup.upgs[8]?tmp.sup.upgs[8].eff.plus(1):new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[2].eff) },
		extra() { return tmp.sup.upgs[4]?tmp.sup.upgs[4].eff:0 },
		unl() { return player.unlocks.includes("Auto") },
	},
	3: {
		title: "Organic Tellers",
		display() { return "The first 3 Energy Upgrade costs are extended by "+format(tmp.sup.upgs[3].gainPer)+" levels." },
		cost(x) { return Decimal.pow(10, x.pow(3)).times(1e6) },
		target(x) { 
			if (x.lt(1e6)) return new Decimal(0);
			return x.div(1e6).log10().cbrt().plus(1).floor();
		},
		gainPer() { 
			let per = new Decimal(5) 
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			if (player.mega.upgrades.includes(17) && tmp.mega) per = per.plus(tmp.mega.upgs[17].eff)
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
		target(x) { 
			if (x.lt(1e20)) return new Decimal(0);
			return x.div(1e20).log(1e4).root(4).plus(1).floor();
		},
		gainPer() { 
			let per = player.mega.energy.plus(1).log10().plus(1).log10().times(2.5) 
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			return per;
		},
		eff(x) { return tmp.sup.upgs[4].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[4].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
	5: {
		title: "Prestige Cities",
		display() { return "Get "+formatWhole(tmp.sup.upgs[5].gainPer)+" more supercharged resets on each Super reset." },
		cost(x) { return Decimal.pow(1e6, x.pow(5)).times(1e32) },
		target(x) { 
			if (x.lt(1e32)) return new Decimal(0);
			return x.div(1e32).log(1e6).root(5).plus(1).floor();
		},
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
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
	6: {
		title: "Mega Organic Tellers",
		display() { return "The first 6 Energy Upgrade costs are extended by "+format(tmp.sup.upgs[6].gainPer)+" levels." },
		cost(x) { return Decimal.pow(1e10, x.pow(6)).times(1e50) },
		target(x) { 
			if (x.lt(1e50)) return new Decimal(0);
			return x.div(1e50).log(1e10).root(6).plus(1).floor();
		},
		gainPer() { 
			let per = new Decimal(4) 
			if (player.mega.upgrades.includes(6) && tmp.mega) per = per.plus(tmp.mega.upgs[6].eff)
			if (player.mega.upgrades.includes(17) && tmp.mega) per = per.plus(tmp.mega.upgs[17].eff)
			return per;
		},
		eff(x) { return tmp.sup.upgs[6].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[6].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
	},
	7: {
		title: "Subatomic Generators",
		display() { return "Split atoms add "+format(tmp.sup.upgs[7].gainPer)+" to the Super-Energy exponent." },
		cost(x) { return Decimal.pow(1e100, Decimal.pow(10, x.plus(1).log10().pow(2))).times("1e1400") },
		target(x) { 
			if (x.lt("1e1500")) return new Decimal(0);
			return Decimal.pow(10, x.div("1e1400").log(1e100).log10().sqrt()).floor()
		},
		gainPer() { return player.hyper.splitAtoms.plus(1).log10().times(5) },
		eff(x) { return tmp.sup.upgs[7].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return "+"+format(tmp.sup.upgs[7].eff) },
		extra() { return new Decimal(0) },
		unl() { return player.hyper.times.gt(0) },
	},
	8: {
		title: "Hyper Plants",
		display() { return "Power Plants are "+format(tmp.sup.upgs[8].gainPer.times(100))+"% stronger." },
		cost(x) { return Decimal.pow(1e200, Decimal.pow(10, x.plus(1).log10().pow(2.5))).times("1e4800") },
		target(x) { 
			if (x.lt("1e5000")) return new Decimal(0);
			return Decimal.pow(10, x.div("1e4800").log(1e200).log10().root(2.5)).floor()
		},
		gainPer() { 
			let per = new Decimal(0.1) 
			if (player.mega.upgrades.includes(17) && tmp.mega) per = per.plus(tmp.mega.upgs[17].eff.div(100))
			return per;
		},
		eff(x) { return tmp.sup.upgs[8].gainPer.times(x) },
		power() { return new Decimal(1) },
		displayEff() { return format(tmp.sup.upgs[8].eff.times(100))+"% stronger" },
		extra() { return new Decimal(0) },
		unl() { return player.hyper.times.gt(0) },
	},
	9: {
		title: "Skilled Ninja",
		display() { return "Super-Energy multiplies XP gain by "+format(tmp.sup.upgs[9].gainPer)+"." },
		cost(x) { return Decimal.pow(1e250, Decimal.pow(10, x.plus(1).log10().pow(3))).times("1e8750") },
		target(x) { 
			if (x.lt("1e9000")) return new Decimal(0);
			return Decimal.pow(10, x.div("1e8750").log(1e250).log10().cbrt()).floor()
		},
		gainPer() { return player.sup.energy.plus(1).log10().plus(1).log10().plus(1).root(4) },
		eff(x) { return Decimal.pow(tmp.sup.upgs[9].gainPer, x) },
		power() { return new Decimal(1) },
		displayEff() { return format(tmp.sup.upgs[9].eff)+"x" },
		extra() { return new Decimal(0) },
		unl() { return player.hyper.times.gt(0) },
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
	if (player.mega.upgrades.includes(18)) {
		let target = revScaledSuperUpgs(superUpgs[x].target(player.sup.energy).sub(1)).plus(1);
		player.sup.upgs[x] = Decimal.max(player.sup.upgs[x]||0, target);
	} else {
		player.sup.energy = player.sup.energy.sub(tmp.sup.upgs[x].cost)
		player.sup.upgs[x] = Decimal.add(player.sup.upgs[x]||0, 1);
	}
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
	if (tmp.sup.upgs) add = add.plus(tmp.sup.upgs[7].eff)
	if (tmp.hyper) add = add.plus(tmp.hyper.enEff2)
	return add;
}

function multiplySupEnExp() {
	let mult = new Decimal(1);
	if (player.mega.upgrades.includes(5) && tmp.mega) mult = mult.times(tmp.mega.upgs[5].eff);
	if (tmp.hyper) mult = mult.times(tmp.hyper.upgs[1].eff.plus(1))
	return mult;
}

function getSuperExp(x=player.sup.totalExpInput) {
	let toAdd = addToSupEnExp();
	let mult = multiplySupEnExp();
	let exp;
	if (x.lt(12)) exp = new Decimal(toAdd);
	else if (x.lt(144)) exp = Decimal.pow(1.25, x.div(12).sqrt()).sub(1).times(mult).plus(toAdd)
	else if (x.lt(4e8)) exp = Decimal.pow(1.25, Decimal.pow(12, x.log(12).sqrt().sub(Math.sqrt(2)-1)).sqrt()).sub(1).times(mult).plus(toAdd)
	else if (x.lt(5e9)) exp = Decimal.pow(1.25, Decimal.pow(12, Decimal.pow(0.5, x.div(4e8).sqrt().sub(1).max(0)).times(x).log(12).sqrt().sub(Math.sqrt(2)-1)).sqrt()).sub(1).times(mult).plus(toAdd)
	else exp = Decimal.pow(1.25, Decimal.pow(12, x.log(5e9).times(862379150).log(12).sqrt().sub(Math.sqrt(2)-1)).sqrt()).sub(1).times(mult).plus(toAdd)
	if (player.mega.upgrades.includes(16)) {
		if (exp.lt(1e4)) {
			if (exp.gte(6000)) exp = Decimal.sub(6666.67, Decimal.div(6666.67, exp.sub(5000).cbrt().times(exp.sub(5999).log10().plus(1))))
			exp = exp.times(1.5)
		}
	}
	return fortuneNerf(exp);
}

function getSuperResetStatGain() {
	return tmp.sup.upgs[5].eff.plus(1)
}

function superReset(force=false, updates=2) {
	if (!force) {
		if (!canSuperReset()) return;
		player.sup.totalExpInput = player.sup.totalExpInput.plus(tmp.en.exp)
		let newExp = getSuperExp()
		player.sup.energy = player.sup.energy.root(newExp).plus(tmp.sup.gain).pow(newExp);
		player.sup.times = player.sup.times.plus(getSuperResetStatGain());
	}
	player.sup.timer = 1;
	
	player.energy = new Decimal(1)
	player.energyM = new Decimal(1)
	player.upgs = {}
	
	for (let i=1;i<=updates;i++) updateTemp();
}

function getSuperEnergyEff() {
	let eff = player.sup.energy.max(1).log2()
	if (eff.gte(3)) {
		if (player.unlocks.includes("Skills")) {
			let softcapPower = Decimal.sub(1, tmp.skills?tmp.skills[2].eff:0)
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
}