function toPlaces(x, precision, maxAccepted) {
	x = new Decimal(x)
	let result = x.toStringWithDecimalPlaces(precision)
	if (new Decimal(result).gte(maxAccepted)) {
		result = new Decimal(maxAccepted-Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
	}
	return result
}

function exponentialFormat(num, precision) {
	let e = num.log10().floor()
	let m = num.div(Decimal.pow(10, e))
	if (m.gte(10)) {
		m = m.div(10);
		e = e.plus(1);
	} else if (m.gte(9.999999999)) {
		m = new Decimal(1)
		e = e.plus(1);
	}
	return toPlaces(m, precision, 10)+"e"+formatWhole(e)
}

function commaFormat(num, precision) {
	if (num === null || num === undefined) return "NaN"
	if (num.mag < 0.001) return (0).toFixed(precision)
	return toPlaces(num, precision, 1e9).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function sumValues(x) {
	x = Object.values(x)
	if (!x[0]) return new Decimal(0)
	return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision=2) {
	if (decimal=="X") return "X"
	decimal = new Decimal(decimal)
	if (isNaN(decimal.sign)||isNaN(decimal.layer)||isNaN(decimal.mag)) {
		player.hasNaN = true;
		return "NaN"
	}
	if (decimal.sign<0) return "-"+format(decimal.neg(), precision)
	if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
	if (decimal.gte("eeee10")) {
		var slog = decimal.slog()
		if (slog.gte(1e9)) return "10^^" + format(slog.floor())
		else if (slog.gte(1000)) return "10^^"+commaFormat(slog, 0)
		else return "10^^" + commaFormat(slog, 2)
	} else if (decimal.gte("e1e6")) return "e"+formatWhole(decimal.log10(), 2)
	else if (decimal.gte("1e1000")) return exponentialFormat(decimal, Math.max(3-(decimal.log10().log10().toNumber()-3), 0))
	else if (decimal.gte(1e9)) return exponentialFormat(decimal, 3)
	else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
	else return commaFormat(decimal, precision)
}

function formatWhole(decimal) {
	return format(decimal, 0)
}

function formatTime(decimal, precision=2) {
	if (decimal=="X") return "X"
	decimal = new Decimal(decimal)
	if (isNaN(decimal.sign)||isNaN(decimal.layer)||isNaN(decimal.mag)) {
		player.hasNaN = true;
		return "NaN"
	}
	if (decimal.sign<0) return "-"+formatTime(decimal.neg(), precision)
	if (decimal.lt(1)) return format(decimal.times(1e3), precision)+"ms";
	else if (decimal.lt(60)) return format(decimal, precision)+"s";
	else if (decimal.lt(3600)) return formatWhole(decimal.div(60).floor())+"m "+format(decimal.sub(decimal.div(60).floor().times(60)), precision)+"s";
	else if (decimal.lt(86400)) return formatWhole(decimal.div(3600).floor())+"h "+format(decimal.div(60).sub(decimal.div(3600).floor().times(60)).floor(), precision)+"m";
	else if (decimal.lt(31556736)) return formatWhole(decimal.div(86400).floor())+"d "+format(decimal.div(3600).sub(decimal.div(86400).floor().times(24)).floor(), precision)+"h";
	else if (decimal.lt(31556736000)) return formatWhole(decimal.div(31556736).floor())+"y "+format(decimal.div(86400).sub(decimal.div(31556736).floor().times(365.24)).floor(), precision)+"d";
	else return formatWhole(decimal.div(31556736).floor())+"y"
}