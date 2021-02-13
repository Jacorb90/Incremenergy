var megaUpgs = {
	upgs: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24},
	cols: {
		1: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6},
		2: {7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12},
		3: {13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18},
		4: {19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24},
	},
	1: {
		title: "Mega Evolution",
		display: "Increase the Mega Energy exponent by 0.02 for every Super Upgrade level.",
		cost: new Decimal(40),
		eff() { return Decimal.mul(0.02, tmp.sup.totalUpgs) },
		displayEff() { return "+"+format(tmp.mega.upgs[1].eff) },
		unl() { return player.mega.factories.gte(1)||player.unlocks.includes("Hyper") },
	},
	2: {
		title: "Anti-Slowdown Measures",
		display: "Energy Overflow starts 1e10x later for every Energy Upgrade level.",
		cost: new Decimal(1e5),
		eff() { return Decimal.pow(1e10, tmp.en.totalUpgs) },
		displayEff() { return format(tmp.mega.upgs[2].eff)+"x" },
		unl() { return player.mega.factories.gte(2)||player.unlocks.includes("Hyper") },
	},
	3: {
		title: "Excess Explosion",
		display: "Buy max Energy Upgrades, and add 0.5 to Mega-Energy exponent for each Mega Upgrade.",
		cost: new Decimal(1e8),
		eff() { return Decimal.mul(0.5, player.mega.upgrades.length) },
		displayEff() { return "+"+format(tmp.mega.upgs[3].eff) },
		unl() { return player.mega.factories.gte(3)||player.unlocks.includes("Hyper") },
	},
	4: {
		title: "Antitrust Energy",
		display: "The Mega-Energy effect uses a better formula (sqrt(log(x)) -> (log(x)*2)^0.8)",
		cost: new Decimal(5e9),
		unl() { return player.mega.factories.gte(4)||player.unlocks.includes("Hyper") },
	},
	5: {
		title: "Purged Heroes",
		display: "Mega Factories boost the base Super-Energy exponent.",
		cost: new Decimal(1e18),
		eff() { return player.mega.factories.plus(1).sqrt() },
		displayEff() { return format(tmp.mega.upgs[5].eff)+"x" },
		unl() { return player.mega.factories.gte(4)||player.unlocks.includes("Hyper") },
	},
	6: {
		title: "Haven of Gods",
		display: "Mega Factories add to the first 6 Super Upgrade effects.",
		cost: new Decimal(1e23),
		eff() { return player.mega.factories.plus(1).log2().plus(1).root(5).sub(1).div(2) },
		displayEff() { return "+"+format(tmp.mega.upgs[6].eff) },
		unl() { return player.mega.factories.gte(6)||player.unlocks.includes("Hyper") },
	},
	7: {
		title: "False Denial",
		display: "Self-Charging Batteries & Holy Destroyers are boosted by your Mega-Energy.",
		cost: new Decimal(1e26),
		eff() { return player.mega.energy.plus(1).log10().plus(1).log10().times(2).plus(1).pow(1.5) },
		displayEff() { return format(tmp.mega.upgs[7].eff)+"x" },
		unl() { return player.mega.factories.gte(7)||player.unlocks.includes("Hyper") },
	},
	8: {
		title: "Skill Plus",
		display: "The first two Skills gain more XP based on your Mega Factories.",
		cost: new Decimal(1e50),
		eff() { return Decimal.pow(1.2, player.mega.factories) },
		displayEff() { return format(tmp.mega.upgs[8].eff)+"x" },
		unl() { return player.mega.factories.gte(12)||player.unlocks.includes("Hyper") },
	},
	9: {
		title: "Dirt Regime",
		display: "Skill Levels require less XP based on your Energy exponent.",
		cost: new Decimal(1e60),
		eff() { return tmp.en.exp.plus(1).log10().plus(1) },
		displayEff() { return "/"+format(tmp.mega.upgs[9].eff) },
		unl() { return player.mega.factories.gte(15)||player.unlocks.includes("Hyper") },
	},
	10: {
		title: "Prestigeless Power",
		display: "Prestige Cities boost themselves.",
		cost: new Decimal(1e72),
		eff() { return Decimal.pow(2, tmp.sup.upgs[5].lvl) },
		displayEff() { return format(tmp.mega.upgs[10].eff)+"x" },
		unl() { return player.mega.factories.gte(16)||player.unlocks.includes("Hyper") },
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
		unl() { return player.mega.factories.gte(17)||player.unlocks.includes("Hyper") },
	},
	12: {
		title: "Mega Drives",
		display: "Remove the softcaps of Self-Charging Batteries & Super Drives.",
		cost: new Decimal(1e100),
		unl() { return player.mega.factories.gte(20)||player.unlocks.includes("Hyper") },
	},
	13: {
		title: "Titanium Vessels",
		display: "Uranium Vessels are stronger based on their level.",
		cost: new Decimal(1e250),
		eff() { 
			let level = tmp.hyper?tmp.hyper.upgs[2].lvl:new Decimal(0)
			return level.pow(4).times(1e5).max(1)
		},
		displayEff() { return format(tmp.mega.upgs[13].eff)+"x" },
		unl() { return player.hyper.times.gt(0)&&player.mega.factories.gte(30) },
	},
	14: {
		title: "Hyper End",
		display: "Each Mega Upgrade adds 0.05 to the Hyper-Energy exponent.",
		cost: new Decimal(1e300),
		eff() { return player.mega.upgrades.length/20 },
		displayEff() { return "+"+format(tmp.mega.upgs[14].eff) },
		unl() { return player.hyper.times.gt(0)&&player.mega.factories.gte(50) },
	},
	15: {
		title: "Maintained Power",
		display: "All Mega Upgrades beyond the first two rows are kept on Hyper reset, and the Split Atom effect is 75% stronger.",
		cost: new Decimal("1e325"),
		unl() { return player.hyper.times.gt(0)&&player.mega.factories.gte(60) },
	},
	16: {
		title: "Swordsmith's Dream",
		display: "The first Skill's effect also affects the first & third scalings, and the Super-Energy exponent is 50% higher when below 10,000.",
		cost: new Decimal("1e350"),
		unl() { return player.hyper.times.gt(0)&&player.mega.factories.gte(65) },
	},
	17: {
		title: "Manufactured Tellers",
		display: "Split Atoms add to the Organic Teller, Mega Organic Teller, and Hyper Plant effects.",
		cost: new Decimal("1e375"),
		eff() { return player.hyper.splitAtoms.plus(1).log10().times(6) },
		displayEff() { return "+"+format(tmp.mega.upgs[17].eff) },
		unl() { return player.hyper.times.gt(0)&&player.mega.factories.gte(70) },
	},
	18: {
		title: "Excess Nuclearity",
		display: "Buy max Super-Energy Upgrades, and the first softcap of all Energy Upgrades (except Self-Charging Batteries) is 20% weaker.",
		cost: new Decimal("1e405"),
		unl() { return player.hyper.times.gt(0)&&player.mega.factories.gte(80) },
	},
	19: {
		title: "Gift Power",
		display: "Getting Gifts only decreases your Fortune Energy by 1, Gift gain is increased by 50%, and the Fortune Energy exponent is increased by 0.1.",
		cost: new Decimal("1e420"),
		unl() { return player.unlocks.includes("Fortune")&&player.mega.factories.gte(85) },
	},
	20: {
		title: "Neutral Karma",
		display: "Fortune Energy & Gifts make Skills stronger.",
		cost: new Decimal("1e430"),
		eff() { return player.fortune.energy.plus(1).log10().times(player.fortune.gifts.plus(1).log10()).plus(1).log10().div(4).plus(1) },
		displayEff() { return format(tmp.mega.upgs[20].eff.sub(1).times(100))+"% stronger" },
		unl() { return player.unlocks.includes("Fortune")&&player.mega.factories.gte(88) },
	},
	21: {
		title: "The Atomic Present",
		display: "Mega Factories boost Split Atom & Gift gain.",
		cost: new Decimal("1e440"),
		eff() { return Decimal.pow(1.02, player.mega.factories) },
		displayEff() { return format(tmp.mega.upgs[21].eff)+"x" },
		unl() { return player.unlocks.includes("Fortune")&&player.mega.factories.gte(90) },
	},
	22: {
		title: "Hypercharged",
		display: "Self-Charged Batteries add to the Mega & Hyper-Energy exponents at a reduced rate.",
		cost: new Decimal("1e450"),
		eff() { return tmp.en.upgs[2].eff.plus(1).log10().div(player.mega.upgrades.includes(24)?1.1:2) },
		displayEff() { return "<span style='font-size: 8px;'>Mega: +"+format(tmp.mega.upgs[22].eff.times(25))+"<br>Hyper: +"+format(tmp.mega.upgs[22].eff)+"</span>" },
		unl() { return player.unlocks.includes("Fortune")&&player.mega.factories.gte(92) },
	},
	23: {
		title: "Unfazed Reactions",
		display: "Split Atoms' effect is 25% stronger, and they add to the Fortune Energy exponent at a reduced rate.",
		cost: new Decimal("1e700"),
		eff() { return (tmp.hyper?tmp.hyper.powerToExp:new Decimal(0)).sqrt().div(10) },
		displayEff() { return "+"+format(tmp.mega.upgs[23].eff) },
		unl() { return player.unlocks.includes("Fortune")&&player.mega.factories.gte(94) },
	},
	24: {
		title: "Hyper Luck",
		display: "Fortune Energy adds to the Hyper-Energy exponent & to Karma.",
		cost: new Decimal("1e800"),
		eff() { return {
			hyper: player.fortune.energy.plus(1).log10().times(1.5).root(1.1),
			karma: player.fortune.energy.plus(1).log10().plus(1).log10().sqrt().div(10).min(0.25)
		}},
		displayEff() { return "<span style='font-size: 8px;'>Hyper: +"+format(tmp.mega.upgs[24].eff.hyper)+"<br>Karma: +"+format(tmp.mega.upgs[24].eff.karma.times(100))+"%</span>" },
		unl() { return player.unlocks.includes("Fortune")&&player.mega.factories.gte(95) },
	},
}

function getMegaFactoryEff() {
	let f = player.mega.factories;
	let eff = f;
	if (tmp.skills) eff = eff.times(tmp.skills[3].eff.plus(1))
	return eff;
}

function getMegaExp() {
	let exp = tmp.mega.factoryEff;
	if (tmp.mega.upgs && player.mega.upgrades.includes(1)) exp = exp.plus(tmp.mega.upgs[1].eff);
	if (player.mega.upgrades.includes(3) && tmp.mega.upgs) exp = exp.plus(tmp.mega.upgs[3].eff);
	if (player.mega.upgrades.includes(11) && tmp.mega.upgs) exp = exp.plus(tmp.mega.upgs[11].eff.mega)
	if (tmp.hyper) exp = exp.plus(tmp.hyper.enEff2)
	if (player.mega.upgrades.includes(22) && tmp.mega.upgs) exp = exp.plus(tmp.mega.upgs[22].eff.times(25))
	return fortuneNerf(exp);
}

function getMegaEnergyEff() {
	let eff = player.mega.energy.max(1).log10().sqrt();
	if (player.mega.upgrades.includes(4)) eff = player.mega.energy.max(1).log10().times(2).pow(.8);
	if (eff.gte(100)) {
		if (player.unlocks.includes("Fortune")) {
			let power = Decimal.sub(1, tmp.fortune?tmp.fortune.eff2:1)
			eff = Decimal.pow(100, eff.log(100).root(power.plus(1)));
		} else eff = Decimal.pow(100, eff.log(100).sqrt());
	}
	return eff;
}

function getMegaReqSub() {
	let sub = new Decimal(0);
	if (tmp.hyper) sub = sub.plus(tmp.hyper.upgs[2].eff)
	return sub;
}

function getMegaReq() {
	let f = player.mega.factories;
	if (f.gte(20)) f = Decimal.pow(1.05, f.sub(18)).times(19)
	if (f.gte(5)) f = Decimal.pow(5, f.log(5).pow(1.1))
	if (f.gte(2)) f = f.times(Math.pow(2, 3))
	return f.pow(2.25).times(7/8).plus(1).times(4e3).sub(getMegaReqSub()).max(0)
}

function getMegaTarget() {
	let t = tmp.en.exp.plus(getMegaReqSub()).div(4e3).sub(1).div(7/8).root(2.25)
	if (t.gte(2)) t = t.div(Math.pow(2, 3))
	if (t.gte(5)) t = Decimal.pow(5, t.log(5).root(1.1))
	if (t.gte(20)) t = t.div(19).log(1.05).add(18)
	return t.plus(1).floor();
}

function canMegaReset() {
	return tmp.en.exp.gte(getMegaReq())
}

function megaReset(force=false, updates=2, max=false) {
	if (!force) {
		if (!(max?tmp.mega.can:canMegaReset())) return;
		if (!max) {
			player.mega.energy = new Decimal(1);
			player.mega.factories = player.mega.factories.plus(1);
		} else {
			player.mega.factories = player.mega.factories.max(getMegaTarget()).max(player.mega.factories.plus(1));
			return;
		}
	}
	
	player.sup =  {
		totalExpInput: new Decimal(0),
		energy: new Decimal(1),
		times: new Decimal(0),
		timer: 1,
		upgs: {},
	}
	
	superReset(true, updates+1)
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