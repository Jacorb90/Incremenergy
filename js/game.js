var player;
var tmp = {};
var tab = "Main";
var subtabs = {
	Auto: "Main",
	Mega: "Main",
	Hyper: "Main",
};
var intervals = {};
var version = 0.1;
var gameID = "exponentGoUpYay"
var allTabs = ["Options", "Info", "Main", "Auto", "Super", "Mega", "Hyper", "Ultra"] // shhhhhhhhhh, you're seeing spoilers...
var tabUnlocks = {
	Options() { return true },
	Info() { return true },
	Main() { return true },
	Auto() { return player.unlocks.includes("Auto") },
	Super() { return player.unlocks.includes("Super") },
	Mega() { return player.unlocks.includes("Mega") },
	Hyper() { return player.unlocks.includes("Hyper") },
	Ultra() { return false },
}
var allSubtabs = {
	Auto: ["Main", "Super", "Mega", "Fortune"],
	Mega: ["Main", "Skills"],
	Hyper: ["Main", "Fortune"],
};
var subtabUnlocks = {
	Auto: {
		Main() { return true },
		Super() { return player.sup.times.gt(0)||player.mega.factories.gt(0)||player.unlocks.includes("Hyper") },
		Mega() { return player.hyper.times.gt(0) },
		Fortune() { return player.unlocks.includes("Fortune") },
	},
	Mega: {
		Main() { return true },
		Skills() { return player.unlocks.includes("Skills") },
	},
	Hyper: {
		Main() { return true },
		Fortune() { return player.unlocks.includes("Fortune") },
	},
}

function loadGame() {
	let get = localStorage.getItem(gameID)
	if (get) player = JSON.parse(atob(get));
	else player = getStartPlayer();
	
	fixPlayer();
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	loadVue();
	
	intervals.game = setInterval(function() { gameLoop(50/1000) }, 50)
	intervals.save = setInterval(function() { if (player.autosave) save(); }, 2500)
}

function save() {
	localStorage.setItem(gameID, btoa(JSON.stringify(player)));
}

function importSave() {
	let data = prompt("Paste save data: ")
	if (data===undefined||data===null||data=="") return;
	try {
		player = JSON.parse(atob(data));
		save()
		window.location.reload();
	} catch(e) {
		console.log("Import failed!");
		console.error(e);
		return;
	}
}

function exportSave() {
	let data = btoa(JSON.stringify(player))
	const a = document.createElement('a');
	a.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
	a.setAttribute('download', "incremenergy.txt");
	a.setAttribute('id', 'downloadSave');

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function toggleAutosave() {
	player.autosave = !player.autosave;
}

function hardReset() {
	if (!confirm("Are you sure you want to reset everything???")) return;
	player = getStartPlayer();
	save();
	window.location.reload();
}

function getUnlockText() {
	if (!player.unlocks.includes("Super")) return "Next Feature: Requires an Energy exponent of "+formatWhole(12)+"."
	else if (!player.unlocks.includes("Auto")) return "Next Feature: Requires "+formatWhole(50)+" Super-Energy."
	else if (!player.unlocks.includes("Mega")) return "Next Feature: Requires an Energy exponent of "+formatWhole(4e3)+"."
	else if (!player.unlocks.includes("Skills")) return "Next Feature: Requires "+formatWhole(10)+" Mega Factories."
	else if (!player.unlocks.includes("Hyper")) return "Next Feature: Requires an Energy exponent of "+formatWhole(6e8)+"."
	else if (!player.unlocks.includes("Fortune")) return "Next Feature: Requires an Energy exponent of "+formatWhole(5e12)+"."
	else if (!player.unlocks.includes("Constellations")) return "End of game: Requires "+format("1e1000")+" Mega-Energy."
	else return "You have reached the end!"
}

function getUnlockProgress() {
	if (!player.unlocks.includes("Super")) return tmp.en.exp.eq(0)?0:Decimal.div(tmp.en.exp, 12).min(1).toNumber()
	else if (!player.unlocks.includes("Auto")) return player.sup.energy.max(1).log(50).toNumber()
	else if (!player.unlocks.includes("Mega")) return tmp.en.exp.eq(0)?0:Decimal.div(tmp.en.exp, 4e3).min(1).toNumber()
	else if (!player.unlocks.includes("Skills")) return player.mega.factories.div(10).min(1).toNumber()
	else if (!player.unlocks.includes("Hyper")) return tmp.en.exp.eq(0)?0:Decimal.div(tmp.en.exp, 6e8).min(1).toNumber()
	else if (!player.unlocks.includes("Fortune")) return tmp.en.exp.eq(0)?0:Decimal.div(tmp.en.exp, 5e12).min(1).toNumber()
	else if (!player.unlocks.includes("Constellations")) return player.mega.energy.max(1).log("1e1000").toNumber()
	else return 1
}

function updateUnlocks() {
	if (tmp.en.exp.gte(12) && !player.unlocks.includes("Super")) player.unlocks.push("Super")
	if (player.sup.energy.gte(50) && !player.unlocks.includes("Auto")) player.unlocks.push("Auto")
	if (tmp.en.exp.gte(4e3) && !player.unlocks.includes("Mega")) player.unlocks.push("Mega")
	if (player.mega.factories.gte(10) && !player.unlocks.includes("Skills")) player.unlocks.push("Skills")
	if (tmp.en.exp.gte(6e8) && !player.unlocks.includes("Hyper")) player.unlocks.push("Hyper")
	if (tmp.en.exp.gte(5e12) && !player.unlocks.includes("Fortune")) player.unlocks.push("Fortune")
	if (player.mega.energy.gte("1e1000") && !player.unlocks.includes("Constellations")) player.unlocks.push("Constellations")
}

function gameLoop(diff) {
	updateTemp();
	updateUnlocks();
	
	doEnergyTick(diff);
	doSuperTick(diff);
	doMegaTick(diff);
	doHyperTick(diff);
	automate(diff);
}