import { h } from "virtual-dom";
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
    name: 'header_links',
    initialize() {
        // Add links
        // Got code from this plugin: https://github.com/discourse/discourse-custom-header-links/blob/main/javascripts/discourse/initializers/discourse-custom-header-links.js.es6
        withPluginApi("0.8.20", (api) => {
            const deviceClass = '.vdm';  // View: vdm = desktop and mobile, vdo = desktop only, vmo = mobile only.
            const base_url = "https://pulse-game.com/";
            const base_forum = "https://forum.pulse-game.com/";
            const headerLinks = [
                h("li.headerLink${deviceClass}.keep${linkClass}", h("a.active.fw-bold", {title: "Forum Homepage", href: "https://forum.pulse-game.com/",}, "FORUM")),
                h("li.headerLink${deviceClass}.hide_on_medium_screen${linkClass}", h("a", {title: "Token", href: base_url+"/tokenomics/",}, "TOKEN")),
                h("li.headerLink${deviceClass}.hide_on_very_small_screen${linkClass}", h("a", {title: "Shop", href: base_url+"/shop/",}, "SHOP")),
                h("li.headerLink${deviceClass}.hide_on_small_screen${linkClass}", h("a.play_now_btn.btn", {title: "Play Now", href: base_url+"/play_now/",}, "PLAY NOW")),
            ];
            api.decorateWidget("header-buttons:before", (helper) => {
                return helper.h("ul.custom-header-links", headerLinks);
            });
            $("body").on("click", ".hamburger-dropdown", function(){  // Add links to hamburger menu on small screens
                setTimeout(function(){
                    if($(".menu-container-header-small-links").length < 1){
                        const tokenomics_info = headerLinks[1].children[0];
                        const shop_info = headerLinks[2].children[0];
                        const play_now_info = headerLinks[3].children[0];
                        $(".menu-container-general-links").before("<div class='menu-container-header-small-links show_on_medium_screen'><ul class='menu-links columned'>" +
                        "<li><a class='widget-link show_on_very_small_screen' title='" + shop_info.properties.title + "' href='" + shop_info.properties.href + "'>" + shop_info.children[0].text + "</a></li>" +
                        "<li><a class='widget-link show_on_medium_screen' title='" + tokenomics_info.properties.title + "' href='" + tokenomics_info.properties.href + "'>" + tokenomics_info.children[0].text + "</a></li>" +
                        "<li><a class='widget-link show_on_small_screen play_now_btn btn' title='" + play_now_info.properties.title + "' href='" + play_now_info.properties.href + "'>" + play_now_info.children[0].text + "</a></li>" +
                        "</ul></div><hr class='show_on_medium_screen'>");
                    }
                }, 10);
            });

            // Change header logo link to base_url instead of forum.
            $(document).ready(function(){
                $("#site-logo").closest("a").attr("href", base_url);
            });
            
        });
    }
  };