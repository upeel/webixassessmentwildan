import {JetView} from "webix-jet";

export default class ToolView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			view:"toolbar", css:theme,
			height:56,
			elements:[
				{
					paddingY:7,
					rows:[
						{
							view:"icon", icon:"mdi mdi-menu",
							click:() => this.app.callEvent("menu:toggle"),
							tooltip:_("Click to collapse / expand the sidebar")
						}
					]
				},
				{ css:"logo" },
				{},
				{
					paddingY:7,
					rows:[
						{
							margin:8,
							cols:[
								{
									view:"icon", icon:"mdi mdi-settings",
									tooltip:_("Go to settings"),
									click:() => this.show("/top/settings")
								}
							]
						}
					]
				},
				{ width:6 }
			]
		};
	}
	
}
