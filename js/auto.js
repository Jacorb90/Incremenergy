var auto_data = {
	map: {
		1: {
			upg1: true,
			upg2: true,
			upg3: true,
		},
		2: {
			upg4: true,
			upg5: true,
			upg6: true,
		},
		3: {
			upg7: true,
			upg8: true,
			upg9: true,
		},
		
		4: {
			superEn: true,
			superExp: true,
			superStat: true,
		},
		5: {
			super1: true,
			super2: true,
			super3: true,
		},
		6: {
			super4: true,
			super5: true,
			super6: true,
		},
		7: {
			super7: true,
			super8: true,
			super9: true,
		},
		
		8: {
			factories: true,
			skillXP: true,
			megaUpgs: true,
		},
		
		9: {
			gifts: true,
		},
	},
	upg1: {
		title: "Automated Chargers",
		tab: "Main",
		unl() { return true },
		cost: new Decimal(10),
	},
	upg2: {
		title: "Automated Self-Charging Batteries",
		tab: "Main",
		unl() { return true },
		cost: new Decimal(10),
	},
	upg3: {
		title: "Automated Galvanic Compressors",
		tab: "Main",
		unl() { return true },
		cost: new Decimal(10),
	},
	upg4: {
		title: "Automated Superchargers",
		tab: "Main",
		unl() { return player.sup.times.gt(0)||player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(20),
	},
	upg5: {
		title: "Automated Super Drives",
		tab: "Main",
		unl() { return player.sup.times.gt(0)||player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(20),
	},
	upg6: {
		title: "Automated Archaic Processors",
		tab: "Main",
		unl() { return player.sup.times.gt(0)||player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(20),
	},
	upg7: {
		title: "Automated True Souls",
		tab: "Main",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e18),
	},
	upg8: {
		title: "Automated Holy Destroyers",
		tab: "Main",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e40),
	},
	upg9: {
		title: "Automated Voltaic Conductors",
		tab: "Main",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e75),
	},
	superEn: {
		title: "1 Base Super-Energy/sec",
		tab: "Super",
		unl() { return player.sup.times.gt(0)||player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(250),
	},
	superExp: {
		title: "Automated Super-Energy exponent gain",
		tab: "Super",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e16),
	},
	superStat: {
		title: "1 reset of Supercharged resets/sec",
		tab: "Super",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e20),
	},
	super1: {
		title: "Automated Heroic Stones",
		tab: "Super",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e16),
	},
	super2: {
		title: "Automated Power Plants",
		tab: "Super",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e19),
	},
	super3: {
		title: "Automated Organic Tellers",
		tab: "Super",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e22),
	},
	super4: {
		title: "Automated Mega Trophies",
		tab: "Super",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e30),
	},
	super5: {
		title: "Automated Prestige Cities",
		tab: "Super",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e80),
	},
	super6: {
		title: "Automated Mega Organic Tellers",
		tab: "Super",
		unl() { return player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		cost: new Decimal(1e150),
	},
	super7: {
		title: "Automated Subatomic Generators",
		tab: "Super",
		unl() { return player.hyper.times.gt(0) },
		cost: new Decimal("1e2500"),
	},
	super8: {
		title: "Automated Hyper Plants",
		tab: "Super",
		unl() { return player.hyper.times.gt(0) },
		cost: new Decimal("1e6000"),
	},
	super9: {
		title: "Automated Skilled Ninja",
		tab: "Super",
		unl() { return player.hyper.times.gt(0) },
		cost: new Decimal("1e10000"),
	},
	factories: {
		title: "Automated Mega Factories",
		tab: "Mega",
		unl() { return player.hyper.times.gt(0) },
		cost: new Decimal("1e2250"),
	},
	skillXP: {
		title: "Automated Skill XP Gain",
		tab: "Mega",
		unl() { return player.hyper.times.gt(0) },
		cost: new Decimal("1e3000"),
	},
	megaUpgs: {
		title: "Automated Mega Upgrades",
		tab: "Mega",
		unl() { return player.hyper.times.gt(0) },
		cost: new Decimal("1e5000"),
	},
	gifts: {
		title: "20 Gift clicks/sec",
		tab: "Fortune",
		unl() { return player.unlocks.includes("Fortune") },
		cost: new Decimal("1e20000"),
	},
}

function unlockAuto(name) {
	if (player.autoUnls.includes(name)) return;
	if (player.sup.energy.lt(auto_data[name].cost)) return;
	player.sup.energy = player.sup.energy.sub(auto_data[name].cost)
	player.autoUnls.push(name);
}

function automate(diff) {
	for (let i=1;i<=9;i++) if (tmp.auto["upg"+i].active) buyEnergyUpg(i)
	if (tmp.auto.superEn.active) player.sup.energy = player.sup.energy.root(tmp.sup.exp).plus(diff).pow(tmp.sup.exp);
	if (tmp.auto.superExp.active) player.sup.totalExpInput = player.sup.totalExpInput.plus(tmp.en.exp.times(diff));
	if (tmp.auto.superStat.active) player.sup.times = player.sup.times.plus(getSuperResetStatGain().times(diff));
	for (let i=1;i<=9;i++) if (tmp.auto["super"+i].active) buySuperUpg(i)
	if (tmp.auto.megaUpgs.active) {
		let len = player.mega.upgrades.length;
		let next;
		if (len==0) next = 1;
		else if (len==1) {
			if (player.mega.upgrades.includes(15)) next = 1;
			else next = player.mega.upgrades[0]+1
		} else {
			if (player.mega.upgrades.includes(15)) next = Object.keys(megaUpgs.upgs).map(x => Number(x)).filter(x => !player.mega.upgrades.includes(x)).sort(function(a, b) {return a-b})[0]
			else next = player.mega.upgrades.sort(function(a, b) {return b-a})[0]+1
		}
		if (next<=Object.keys(megaUpgs.upgs).length) buyMegaUpg(next)
	}
	if (tmp.auto.skillXP.active) for (let i=1;i<=3;i++) upgradeSkill(i, true);
	if (tmp.auto.factories.active && tmp.mega.can) megaReset(false, false, true);
	if (tmp.auto.gifts.active && player.fortune.energy.gte(fortune_req)) giftRNG();
}