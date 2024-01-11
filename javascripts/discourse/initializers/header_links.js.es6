import { h } from "virtual-dom";
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
    name: 'header_links',
    initialize() {
        if(!settings.Enable_header_links){
            return;
        }
        // Add links
        // Got code from this plugin: https://github.com/discourse/discourse-custom-header-links/blob/main/javascripts/discourse/initializers/discourse-custom-header-links.js.es6
        withPluginApi("0.8.20", (api) => {
            const deviceClass = '.vdm';  // View: vdm = desktop and mobile, vdo = desktop only, vmo = mobile only.
            const base_url = settings.Base_url; // "https://pulse-game.com/";
            const { iconNode } = require("discourse-common/lib/icon-library");
            
            const headerLinks = [
                // Add fontawesome CSS to the forum
                h("link", {rel:"stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css"}),
                h("li${deviceClass}${linkClass}", h("a.icon.btn-flat", {title: "Homepage", href: base_url,}, h("i.d-icon.fa-solid.fa-house", ""))),
                h("li${deviceClass}${linkClass}", h("a.icon.btn-flat", {title: "Play Now", href: base_url+"play-now",}, h("i.d-icon..fa-solid.fa-gamepad", ""))),
            ];
            api.decorateWidget("header-buttons:before", (helper) => {
                return helper.h("ul.custom-header-links.icons.d-header-icons", headerLinks);  // Add links in header
            });
            

            // Add the game name to the logo
            api.decorateWidget("home-logo:after", helper => {
                const titleVisible = helper.attrs.minimized;
                const headerText = "ATONE";
                
                if (!titleVisible) {
                    return api.h("span.header-text", headerText);
                }
            });
            
        });
    }
  };