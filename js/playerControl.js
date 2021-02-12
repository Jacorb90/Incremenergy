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
}