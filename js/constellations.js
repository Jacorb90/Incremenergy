const STAR_UNLOCKS = [0, 7.5e3, 3e4, 1e6, 1e7, 1e8, 1e12, 1e13, 1e15, 1e22, 1e30, 1e40, 1e45, 1e48, 1e50, 1e52, 1e54, 1e75, 1e100];

function doConstellationTick(diff) {
    if (tmp.const.starsUnl<tmp.const.starsCanUnl) initNewStar();
    if (player.unlocks.includes("Constellations")) {
        let oldEnergy = player.constellations.energy;
        player.constellations.energy = player.constellations.energy.root(tmp.const.exp).plus(diff).pow(tmp.const.exp)
        player.constellations.energy = player.constellations.energy.div(Decimal.pow(getStarEnDivPerSec(), diff));
        if (oldEnergy.gt(player.constellations.energy)) player.constellations.darkness = player.constellations.darkness.plus(oldEnergy.sub(player.constellations.energy));
        for (let d=0;d<Object.keys(player.constellations.stars).length;d++) {
            if (Object.values(player.constellations.stars)[d].type==2) {
                Object.values(player.constellations.stars)[d].time = Math.max(Object.values(player.constellations.stars)[d].time-diff, 0);
                if (Object.values(player.constellations.stars)[d].time==0) Object.values(player.constellations.stars)[d].time = neutronStarCooldownTime() + neutronStarActiveTime();
            }
        }
    }
}

function initNewStar() {
    player.constellations.stars[tmp.const.starsUnl+1] = {
        type: 0,
        time: 0,
    }
}

function getStarExp() {
    let data = Object.values(player.constellations.stars);
    let exp = new Decimal(1);
    let red = redGiantEff();
    let neut = neutronStarEff();
    for (let d=0;d<data.length;d++) {
        if (data[d].type==1) exp = exp.plus(red);
        else if (data[d].type==2 && data[d].time>neutronStarCooldownTime()) exp = exp.plus(neut);
    }
    if (tmp.ultra) exp = exp.plus(tmp.ultra.enEff2)
    return fortuneNerf(exp);
}

function getStarEnDivPerSec() {
    let d = Decimal.pow(2, Object.values(player.constellations.stars).filter(x => x.type==3).length);
    return d;
}

function multiplyDarknessEffs() {
    let m = new Decimal(1);
    if (player.mega.upgrades.includes(30)) m = m.times(tmp.mega.upgs[30].eff);
    return m;
}

function getDarknessEff() {
    return player.constellations.darkness.plus(1).cbrt().times(multiplyDarknessEffs());
}

function getDarknessEff2() {
    return player.constellations.darkness.plus(1).log(40).plus(1).times(multiplyDarknessEffs());
}

function getStarEff() {
    return Decimal.sub(1, Decimal.div(1, player.constellations.energy.plus(1).log2().plus(1).log2().plus(1)));
}

function syncNeutronStarCooldowns() {
    for (let d=0;d<Object.keys(player.constellations.stars).length;d++) {
        let star = player.constellations.stars[Object.keys(player.constellations.stars)[d]];
        star.time = neutronStarCooldownTime();
    }
}

function redGiantEff() { return player.mega.upgrades.includes(30) ? tmp.mega.upgs[30].eff.div(2) : .5 }

function neutronStarEff() { return player.mega.upgrades.includes(30) ? tmp.mega.upgs[30].eff : 1 }
function neutronStarCooldownTime() { return (player.mega.upgrades.includes(29) ? 5 : 15) - (ultraChoice(3, 2) ? 4 : 0) }
function neutronStarActiveTime() { return 5 }