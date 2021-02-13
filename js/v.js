var app;

function loadVue() {
	Vue.component('subtab-display', {
		props: ["tabname"],
		computed: {
			subtabs() { return subtabs },
			all() { return allSubtabs[this.tabname] },
			unl() { return subtabUnlocks[this.tabname] },
		},
		template: `
			<table v-if="Object.values(unl).filter(x => x()).length>=2">
				<tr>
					<td v-for="t in all"><button v-if="unl[t]()" v-bind:class="{small: true, unlocked: true, [t.toLowerCase()]: true}" v-on:click="subtabs[tabname] = t">{{t}}</button></td>
				</tr>
			</table>
		`
	})
	
	app = new Vue({
	    el: "#app",
	    data: {
			player,
			tmp,
			format,
			formatWhole,
			getUnlockText,
			getUnlockProgress,
			tab,
			subtabs,
			allTabs,
			allSubtabs,
			tabUnlocks,
			subtabUnlocks,
			energyUpgs,
			buyEnergyUpg,
			auto_data,
			unlockAuto,
			superUpgs,
			buySuperUpg,
			megaUpgs,
			buyMegaUpg,
			skill_data,
			upgradeSkill,
			nextXP,
			hyperUpgs,
			buyHyperUpg,
			fortune_req,
        }
	})
}