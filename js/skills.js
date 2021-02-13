var skill_data = {
	1: {
		symbol: "&#9876;",
		basedOn: "Energy",
		base() { return player.energy.plus(1).log10().div(1e3).sqrt() },
		levels(xp) { return Decimal.pow(2, xp.times(tmp.skills.divCosts).div(1.5).plus(1).log10().plus(1).log2().root(1.1)).pow(1.1).sub(1).floor() },
		req(lvl) { return Decimal.pow(10, Decimal.pow(2, lvl.plus(1).root(1.1).log2().pow(1.1)).sub(1)).sub(1).times(1.5).div(tmp.skills.divCosts).ceil() },
		desc() { return "The 2nd Energy Upgrade's cost increases "+format(tmp.skills[1].eff.times(100))+"% slower" },
		eff(pow) { return Decimal.sub(1, Decimal.div(1, tmp.skills[1].lvl.times(pow).plus(1).sqrt())) },
	},
	2: {
		symbol: "&#10683;",
		basedOn: "Super-Energy",
		base() { return Decimal.pow(10, player.sup.energy.plus(1).log10().sqrt().div(15)) },
		levels(xp) { return Decimal.pow(2, xp.times(tmp.skills.divCosts).div(1.5).plus(1).log10().plus(1).log2().root(1.2)).pow(1.1).sub(1).floor() },
		req(lvl) { return Decimal.pow(10, Decimal.pow(2, lvl.plus(1).root(1.1).log2().pow(1.2)).sub(1)).sub(1).times(1.5).div(tmp.skills.divCosts).ceil() },
		desc() { return "The Super-Energy effect softcap is "+format(tmp.skills[2].eff.times(100))+"% weaker" },
		eff(pow) { return Decimal.sub(1, Decimal.div(1, tmp.skills[2].lvl.times(pow).plus(1).sqrt())) },
	},
	3: {
		symbol: "&#937;",
		basedOn: "Mega-Energy",
		base() { return player.mega.energy.pow(0.055) },
		levels(xp) { return Decimal.pow(2, xp.times(tmp.skills.divCosts).div(1.5).plus(1).log10().plus(1).log2().root(1.3)).pow(1.1).sub(1).floor() },
		req(lvl) { return Decimal.pow(10, Decimal.pow(2, lvl.plus(1).root(1.1).log2().pow(1.3)).sub(1)).sub(1).times(1.5).div(tmp.skills.divCosts).ceil() },
		desc() { return "Mega Factories are "+format(tmp.skills[3].eff.times(100))+"% more efficient" },
		eff(pow) { return tmp.skills[3].lvl.times(pow).div(15).sqrt() },
	}
}

function getExtraXP() {
	return new Decimal(0)
}

function divSkillCosts() {
	let div = new Decimal(1);
	if (player.mega.upgrades.includes(9)) div = div.times(tmp.mega.upgs[9].eff);
	return div;
}

function getXPGainMult(x) {
	let mult = tmp.sup.upgs[9].eff;
	if (player.mega.upgrades.includes(8) && x<3) mult = mult.times(tmp.mega.upgs[8].eff);
	return mult;
}

function getXPGain(x) {
	return skill_data[x].base().times(getXPGainMult(x)).sub(player.mega.xp[x]||0).sub(tmp.skills.extraXP).floor().max(0)
}

function nextXP(x) {
	let end = new Decimal(player.mega.xp[x]||0).plus(tmp.skills.extraXP).plus(tmp.skills[x].xpGain).plus(1).div(getXPGainMult(x))
	if (x==1) return Decimal.pow(10, end.pow(2).times(1e3)).sub(1)
	else if (x==2) return Decimal.pow(10, end.log10().times(15).pow(2)).sub(1)
	else if (x==3) return end.root(0.055)
}

function upgradeSkill(x, noReset=false) {
	if (tmp.skills[x].xpGain.lt(1)) return;
	if (!noReset) {
		switch(x) {
			case "1": 
				player.energy = new Decimal(1);
				break;
			case "2":
				player.sup.energy = new Decimal(1);
				break;
			case "3": 
				player.mega.energy = new Decimal(1);
				break;
		}
	}
	player.mega.xp[x] = Decimal.add(player.mega.xp[x], tmp.skills[x].xpGain)
}

function getGlobalSkillPower() {
	let pow = new Decimal(1);
	if (player.mega.upgrades.includes(20)) pow = pow.times(tmp.mega.upgs[20].eff)
	return pow;
}