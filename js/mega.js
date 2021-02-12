var megaUpgs = {
	upgs: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12},
	cols: {
		1: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6},
		2: {7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12},
	},
	1: {
		title: "Mega Evolution",
		display: "Increase the Mega Energy exponent by 0.02 for every Super Upgrade level.",
		cost: new Decimal(40),
		eff() { return Decimal.mul(0.02, tmp.sup.totalUpgs) },
		displayEff() { return "+"+format(tmp.mega.upgs[1].eff) },
		unl() { return player.mega.factories.gte(1) },
	},
	2: {
		title: "Anti-Slowdown Measures",
		display: "Energy Overflow starts 1e10x later for every Energy Upgrade level.",
		cost: new Decimal(1e5),
		eff() { return Decimal.pow(1e10, tmp.en.totalUpgs) },
		displayEff() { return format(tmp.mega.upgs[2].eff)+"x" },
		unl() { return player.mega.factories.gte(2) },
	},
	3: {
		title: "Excess Explosion",
		display: "Buy max Energy Upgrades, and add 0.5 to Mega-Energy exponent for each Mega Upgrade.",
		cost: new Decimal(1e8),
		eff() { return Decimal.mul(0.5, player.mega.upgrades.length) },
		displayEff() { return "+"+format(tmp.mega.upgs[3].eff) },
		unl() { return player.mega.factories.gte(3) },
	},
	4: {
		title: "Antitrust Energy",
		display: "The Mega-Energy effect uses a better formula (sqrt(log(x)) -> (log(x)*2)^0.8)",
		cost: new Decimal(5e9),
		unl() { return player.mega.factories.gte(4) },
	},
	5: {
		title: "Purged Heroes",
		display: "Mega Factories boost the base Super-Energy exponent.",
		cost: new Decimal(1e18),
		eff() { return player.mega.factories.plus(1).sqrt() },
		displayEff() { return format(tmp.mega.upgs[5].eff)+"x" },
		unl() { return player.mega.factories.gte(4) },
	},
	6: {
		title: "Haven of Gods",
		display: "Mega Factories add to the first 6 Super Upgrade effects.",
		cost: new Decimal(1e23),
		eff() { return player.mega.factories.plus(1).log2().plus(1).root(5).sub(1).div(2) },
		displayEff() { return "+"+format(tmp.mega.upgs[6].eff) },
		unl() { return player.mega.factories.gte(6) },
	},
	7: {
		title: "False Denial",
		display: "Self-Charging Batteries & Holy Destroyers are boosted by your Mega-Energy.",
		cost: new Decimal(1e26),
		eff() { return player.mega.energy.plus(1).log10().plus(1).log10().times(2).plus(1).pow(1.5) },
		displayEff() { return format(tmp.mega.upgs[7].eff)+"x" },
		unl() { return player.mega.factories.gte(7) },
	},
	8: {
		title: "Skill Plus",
		display: "The first two Skills gain more XP based on your Mega Factories.",
		cost: new Decimal(1e50),
		eff() { return Decimal.pow(1.2, player.mega.factories) },
		displayEff() { return format(tmp.mega.upgs[8].eff)+"x" },
		unl() { return player.mega.factories.gte(12) },
	},
	9: {
		title: "Dirt Regime",
		display: "Skill Levels require less XP based on your Energy exponent.",
		cost: new Decimal(1e60),
		eff() { return tmp.en.exp.plus(1).log10().plus(1) },
		displayEff() { return "/"+format(tmp.mega.upgs[9].eff) },
		unl() { return player.mega.factories.gte(15) },
	},
	10: {
		title: "Prestigeless Power",
		display: "Prestige Cities boost themselves.",
		cost: new Decimal(1e72),
		eff() { return Decimal.pow(2, tmp.sup.upgs[5].lvl) },
		displayEff() { return format(tmp.mega.upgs[10].eff)+"x" },
		unl() { return player.mega.factories.gte(16) },
	},
	11: {
		title: "Experienced Ancient",
		display: "Skill XP adds to the Energy, Super-Energy, & Mega-Energy exponents.",
		cost: new Decimal(1e80),
		eff() { return {
			normal: new Decimal(player.mega.xp[1]||0).plus(1).log10().plus(1).log10().plus(1).pow(20).sub(1),
			sup: new Decimal(player.mega.xp[2]||0).plus(1).log10().plus(1).log10().plus(1).pow(10).sub(1),
			mega: new Decimal(player.mega.xp[3]||0).plus(1).log10().plus(1).log10().plus(1).pow(3).sub(1),
		}},
		displayEff() { return "<span style='font-size: 7px;'>Energy: +"+format(tmp.mega.upgs[11].eff.normal)+"<br>Super-Energy: +"+format(tmp.mega.upgs[11].eff.sup)+"<br>Mega-Energy: +"+format(tmp.mega.upgs[11].eff.mega)+"</span>" },
		unl() { return player.mega.factories.gte(17) },
	},
	12: {
		title: "Mega Drives",
		display: "Remove the softcaps of Self-Charging Batteries & Super Drives.",
		cost: new Decimal(1e100),
		unl() { return player.mega.factories.gte(20) },
	},
}

function getMegaFactoryEff() {
	let f = player.mega.factories;
	let eff = f;
	if (tmp.skills) eff = eff.times(tmp.skills[1].eff.plus(1))
	return eff;
}

function getMegaExp() {
	let exp = tmp.mega.factoryEff;
	if (tmp.mega.upgs && player.mega.upgrades.includes(1)) exp = exp.plus(tmp.mega.upgs[1].eff);
	if (player.mega.upgrades.includes(3) && tmp.mega.upgs) exp = exp.plus(tmp.mega.upgs[3].eff);
	if (player.mega.upgrades.includes(11) && tmp.mega.upgs) exp = exp.plus(tmp.mega.upgs[11].eff.mega)
	return exp;
}

function getMegaEnergyEff() {
	let eff = player.mega.energy.max(1).log10().sqrt();
	if (player.mega.upgrades.includes(4)) eff = player.mega.energy.max(1).log10().times(2).pow(.8);
	if (eff.gte(100)) eff = Decimal.pow(100, eff.log(100).sqrt());
	return eff;
}

function getMegaReq() {
	let f = player.mega.factories;
	if (f.gte(20)) f = Decimal.pow(1.05, f.sub(18)).times(19)
	if (f.gte(5)) f = Decimal.pow(5, f.log(5).pow(1.1))
	if (f.gte(2)) f = f.times(Math.pow(2, 3))
	return f.pow(2.25).times(7/8).plus(1).times(4e3)
}

function canMegaReset() {
	return tmp.en.exp.gte(getMegaReq())
}

function megaReset(force=false) {
	if (!force) {
		if (!canMegaReset()) return;
		player.mega.energy = new Decimal(1);
		player.mega.factories = player.mega.factories.plus(1);
	}
	
	player.sup =  {
		totalExpInput: new Decimal(0),
		energy: new Decimal(1),
		times: new Decimal(0),
		timer: 1,
		upgs: {},
	}
	
	superReset(true)
}

function doMegaTick(diff) {
	player.mega.energy = player.mega.energy.root(tmp.mega.exp).plus(diff).pow(tmp.mega.exp);
}

function buyMegaUpg(x) {
	if (player.mega.upgrades.includes(x)) return
	if (player.mega.energy.lt(megaUpgs[x].cost)) return;
	player.mega.energy = player.mega.energy.sub(megaUpgs[x].cost)
	player.mega.upgrades.push(x)
}