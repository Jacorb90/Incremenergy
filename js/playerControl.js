function getStartPlayer() {
	let p = {
		unlocks: [],
		energy: new Decimal(1),
		autosave: true,
		upgs: {},
		sup: {
			totalExpInput: new Decimal(0),
			energy: new Decimal(1),
			times: new Decimal(0),
			timer: 1,
			upgs: {},
		},
		autoUnls: [],
		autos: {},
		mega: {
			factories: new Decimal(0),
			energy: new Decimal(1),
			upgrades: [],
			xp: {},
		},
		hyper: {
			splitAtoms: new Decimal(0),
			power: new Decimal(0),
			energy: new Decimal(1),
			times: new Decimal(0),
			upgs: {},
		},
		fortune: {
			active: false,
			furthest: new Decimal(0),
			energy: new Decimal(1),
			gifts: new Decimal(0),
			karma: new Decimal(0),
		},
	};
	return p;
}

function fixPlayer() {
	let start = getStartPlayer();
	fixPlayerObj(player, start);
	
	transformPlayerToDecimal();
}

function fixPlayerObj(obj, start) {
	for (let x in start) {
		if (obj[x] === undefined) obj[x] = start[x]
		else if (typeof start[x] == "object" && !(start[x] instanceof Decimal)) fixPlayerObj(obj[x], start[x])
		else if (start[x] instanceof Decimal) obj[x] = new Decimal(obj[x])
	}
	if (Array.isArray(player.autos)) player.autos = {};
}

function transformPlayerToDecimal() {
	player.energy = new Decimal(player.energy)
	for (let id in player.upgs) player.upgs[id] = new Decimal(player.upgs[id])
	player.sup.energy = new Decimal(player.sup.energy)
	player.sup.times = new Decimal(player.sup.times)
	player.sup.totalExpInput = new Decimal(player.sup.totalExpInput)
	for (let id in player.sup.upgs) player.sup.upgs[id] = new Decimal(player.sup.upgs[id])
	player.mega.factories = new Decimal(player.mega.factories)
	player.mega.energy = new Decimal(player.mega.energy)
	for (let id in player.mega.xp) player.mega.xp[id] = new Decimal(player.mega.xp[id])
	player.hyper.splitAtoms = new Decimal(player.hyper.splitAtoms)
	player.hyper.power = new Decimal(player.hyper.power)
	player.hyper.energy = new Decimal(player.hyper.energy)
	for (let id in player.hyper.upgs) player.hyper.upgs[id] = new Decimal(player.hyper.upgs[id])
	player.fortune.furthest = new Decimal(player.fortune.furthest)
	player.fortune.energy = new Decimal(player.fortune.energy);
	player.fortune.gifts = new Decimal(player.fortune.gifts);
	player.fortune.karma = new Decimal(player.fortune.karma);
}