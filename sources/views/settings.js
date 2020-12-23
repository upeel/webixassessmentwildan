import {JetView} from "webix-jet";
import {getLangsList} from "models/langslist";

import "locales/webix/de.js";
import "locales/webix/es.js";
import "locales/webix/ko.js";
import "locales/webix/ru.js";
import "locales/webix/zh.js";

export default class SettingsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		const combo_theme_value = theme ? "1" : "0";

		return {
			rows:[
				{ template:_("Settings"), type:"header", css:"webix_header" + theme },
				{
					view:"form", elementsConfig:{ labelPosition:"top" },
					rules:{
						$all:webix.rules.isNotEmpty
					},
					elements:[
						{ template:_("Environment settings"), type:"section" },
						{
							cols:[
								{
									label:_("Theme"), view:"richselect",
									name:"theme", minWidth:144, gravity:3,
									value:combo_theme_value,
									tooltip:_("Change the color of the sidebar and toolbars"),
									options:[
										{ id:"0", value:_("Light") },
										{ id:"1", value:_("Dark") }
									],
									on:{
										onChange:newtheme => {
											const th = this.app.config.theme = newtheme === "1" ? "webix_dark" : "";
											try{
												webix.storage.local.put("bank_app_theme",th);
											}
											catch(err){/* if cookies are blocked */}
										}
									}
								},
								{},
								{
								
								},
								{ gravity:9 }
							]
						},
						{},
						{
							margin:10, cols:[
								{
									view:"button", value:_("Default settings"),
									autowidth:true, tooltip:_("Reset to default settings"),
									click:function(){
										this.getFormView().setValues(this.$scope._defaults);
									}
								},
								{},
								{
									view:"button", value:_("Save"),
									autowidth:true, type:"form",
									tooltip:"Apply changes",
									click:function(){
										if (this.getFormView().validate()){
											this.$scope.app.getService("locale").setLang(this.$scope._lang);
											webix.message(_("Settings have been applied"), "success");
										}
									}
								}
							]
						}
					]
				}
			]
		};
	}
	init(){
		this._lang = this.app.getService("locale").getLang();

		this._defaults = {
			lang:"en",
			dateformat:"%j %F, %H:%i",
			moneyformat:"1",
			theme:"0",
			maxlist:50
		};
	}
}
