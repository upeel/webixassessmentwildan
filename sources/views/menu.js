import {JetView, plugins} from "webix-jet";

export default class MenuView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		const screen = this.app.config.size;

		return {
			view:"sidebar",
			css:theme,
			width:200,
			collapsed:(screen !== "wide"),
			tooltip:(obj) => {
				return this.getRoot().config.collapsed ? obj.value : "";
			},
			data:[
				{ id:"add", value:_("Add Player"), icon:"mdi mdi-account-plus" },
				{ id:"players", value:_("Players"), icon:"mdi mdi-account-box" }
			]
		};
	}
	init(sidebar){
		this.use(plugins.Menu,{
			id:sidebar,
			urls:{
				"players":"players?user=1/information"
			}
		});
		this.on(this.app,"menu:toggle",() => sidebar.toggle());
		sidebar.getPopup().attachEvent("onBeforeShow",() => false);
	}
	urlChange(ui,url){
		if (!ui.find(opts => url[1].page === opts.id).length)
			ui.unselect();
	}
}
