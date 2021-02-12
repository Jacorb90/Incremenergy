function updateTemp() {
	updateEnergyTemp();
	updateSuperTemp();
	updateTempAuto();
	updateMegaTemp();
	updateSkillsTemp();
}

function updateEnergyTemp() {
	if (!tmp.en) tmp.en = {}
	tmp.en.gain = new Decimal(1);
	tmp.en.exp = getEnergyExp();
	tmp.en.overflowStart = getEnergyOverflowStart()
	tmp.en.overflowScaling = getEnergyOverflowScaleData()
	tmp.en.divPerSec = getEnergyOverflowDiv()
	
	tmp.en.totalUpgs = new Decimal(0);
	if (!tmp.en.upgs) tmp.en.upgs = {};
	for (let i in energyUpgs.upgs) {
		if (!tmp.en.upgs[i]) tmp.en.upgs[i] = {};
		tmp.en.upgs[i].power = energyUpgs[i].power();
		if (energyUpgs[i].extra) tmp.en.upgs[i].extra = energyUpgs[i].extra()
		else tmp.en.upgs[i].extra = new Decimal(0)
		tmp.en.upgs[i].lvl = Decimal.add(player.upgs[i]||new Decimal(0), tmp.en.upgs[i].extra);
		if (energyUpgs[i].gainPer) tmp.en.upgs[i].gainPer = energyUpgs[i].gainPer();
		tmp.en.upgs[i].eff = energyUpgs[i].eff(tmp.en.upgs[i].lvl.times(tmp.en.upgs[i].power));
		tmp.en.upgs[i].cost = energyUpgs[i].cost(scaledEnergyUpgs(player.upgs[i]||new Decimal(0)));
		tmp.en.totalUpgs = tmp.en.totalUpgs.plus(tmp.en.upgs[i].lvl);
	}
}

function updateSuperTemp() {
	if (!tmp.sup) tmp.sup = {}
	tmp.sup.can = canSuperReset();
	tmp.sup.gain = new Decimal(1);
	tmp.sup.exp = getSuperExp();
	tmp.sup.expInc = getSuperExp(player.sup.totalExpInput.plus(tmp.en.exp)).sub(tmp.sup.exp).max(0);
	tmp.sup.enEff = getSuperEnergyEff()
	tmp.sup.overflowStart = getSuperOverflowStart()
	tmp.sup.overflowScaling = getSuperOverflowScaleData()
	tmp.sup.divPerSec = getSuperOverflowDiv()
	
	tmp.sup.totalUpgs = new Decimal(0);
	if (!tmp.sup.upgs) tmp.sup.upgs = {};
	for (let i in superUpgs.upgs) {
		if (!tmp.sup.upgs[i]) tmp.sup.upgs[i] = {};
		tmp.sup.upgs[i].power = superUpgs[i].power();
		if (superUpgs[i].extra) tmp.sup.upgs[i].extra = superUpgs[i].extra()
		else tmp.sup.upgs[i].extra = new Decimal(0)
		tmp.sup.upgs[i].lvl = Decimal.add(player.sup.upgs[i]||new Decimal(0), tmp.sup.upgs[i].extra);
		if (superUpgs[i].gainPer) tmp.sup.upgs[i].gainPer = superUpgs[i].gainPer();
		tmp.sup.upgs[i].eff = superUpgs[i].eff(tmp.sup.upgs[i].lvl.times(tmp.sup.upgs[i].power));
		tmp.sup.upgs[i].cost = superUpgs[i].cost(scaledSuperUpgs(player.sup.upgs[i]||new Decimal(0)));
		tmp.sup.totalUpgs = tmp.sup.totalUpgs.plus(tmp.sup.upgs[i].lvl||0)
	}
}

function updateTempAuto() {
	if (!tmp.auto) tmp.auto = {}
	for (let c in auto_data.map) for (let x in auto_data.map[c]) {
		if (!tmp.auto[x]) tmp.auto[x] = {}
		tmp.auto[x].unl = auto_data[x].unl();
		tmp.auto[x].active = player.autoUnls.includes(x) && player.autos[x] && tmp.auto[x].unl
	}
}

function updateMegaTemp() {
	if (!tmp.mega) tmp.mega = {};
	tmp.mega.factoryEff = getMegaFactoryEff();
	tmp.mega.exp = getMegaExp();
	tmp.mega.enEff = getMegaEnergyEff();
	tmp.mega.req = getMegaReq();
	tmp.mega.can = canMegaReset();
	
	if (!tmp.mega.upgs) tmp.mega.upgs = {};
	for (let i in megaUpgs.upgs) {
		if (!tmp.mega.upgs[i]) tmp.mega.upgs[i] = {};
		if (megaUpgs[i].eff) tmp.mega.upgs[i].eff = megaUpgs[i].eff();
	}
}

function updateSkillsTemp() {
	if (!tmp.skills) tmp.skills = {}
	tmp.skills.divCosts = divSkillCosts();
	for (let i in skill_data) {
		if (!tmp.skills[i]) tmp.skills[i] = {};
		tmp.skills[i].xpGain = getXPGain(i);
		tmp.skills[i].lvl = skill_data[i].levels(player.mega.xp[i]||new Decimal(0));
		tmp.skills[i].next = skill_data[i].req(tmp.skills[i].lvl.plus(1)).sub(player.mega.xp[i]||0);
		tmp.skills[i].eff = skill_data[i].eff();
	}
}