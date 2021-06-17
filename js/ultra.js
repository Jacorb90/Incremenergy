function canUltraReset() { return player.hyper.energy.gte("1e1000") };
function getUltraTimesEff() { return player.ultra.times.plus(1).log10().plus(.2) };
function getUltraExp() { 
	let exp = tmp.ultra.timesEff;
	if (ultraChoice(7, 2)) exp = exp.plus(.5);
	return exp;
};

function ultraReset(force=false, updates=3) {
	if (!force) {
		if (!canUltraReset()) return;
        if (player.ultra.times.lt(5)) if (!confirm("Are you sure you want to do this reset? You will have to build your way back up!")) return;
        player.ultra.energy = player.ultra.energy.root(tmp.ultra.exp).plus(tmp.ultra.gain).pow(tmp.ultra.exp)
		player.ultra.times = player.ultra.times.plus(1);
	}
	
	player.hyper = {
		splitAtoms: new Decimal(0),
		power: new Decimal(0),
		energy: new Decimal(1),
		times: new Decimal(0),
		upgs: {},
	};
    player.fortune = {
        active: false,
		furthest: new Decimal(0),
		energy: new Decimal(1),
		gifts: new Decimal(0),
		karma: new Decimal(0),
    };
    player.constellations = {
        selected: 0,
		stars: {},
		energy: new Decimal(0),
		darkness: new Decimal(0),
    };
	
	hyperReset(true, updates+1)
}

function getUltraEnergyEff() { return player.ultra.energy.max(1).log(1.25).times(3).plus(1).log(5).plus(1) };

function getUltraEnergyEff2() { return player.ultra.energy.max(1).log10().root(1.5).times(11.11) };

const ULTRA_CHOICE_REQS = [null, 2, 10, 100, 500, 1500, 1e4, 7.5e4, 1e6];

function ultraChoice(x, y) { 
	if (player.ultra.energy.lt(ULTRA_CHOICE_REQS[x])) return false;
	else if (x<=3 && ultraChoice(6, 2)) return true;
	else if ((x==4||x==5) && ultraChoice(8, 2)) return true;
	else return player.ultra.choices[x]==y 
}

function toggleUltraChoice(x, y) {
	if (player.ultra.energy.lt(ULTRA_CHOICE_REQS[x])) return;
	if (player.ultra.choices[x]==y) player.ultra.choices[x] = undefined;
	else player.ultra.choices[x] = y;
}

function getUltraGain() {
	if (ultraChoice(2, 1)) {
		let gain = player.hyper.energy.max("1e1000").log("1e1000").sqrt()
		return gain;
	} else return new Decimal(1);
}