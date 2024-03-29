jQuery(document).ready(function(e) {
    function n() {
        var n = e(".cd-dropdown").hasClass("dropdown-is-active") ? !1 : !0;
        e(".cd-dropdown").toggleClass("dropdown-is-active", n), e(".cd-dropdown-trigger").toggleClass("dropdown-is-active", n), n || e(".cd-dropdown").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
            e(".has-children ul").addClass("is-hidden"), e(".move-out").removeClass("move-out"), e(".is-active").removeClass("is-active")
        })
    }
    e(".cd-dropdown-trigger").on("click", function(e) {
        e.preventDefault(), n()
    }), e(".cd-dropdown .cd-close").on("click", function(e) {
        e.preventDefault(), n()
    }), e(".has-children").children("a").on("click", function(n) {
        n.preventDefault();
        var a = e(this);
        a.next("ul").removeClass("is-hidden").end().parent(".has-children").parent("ul").addClass("move-out")
    });
    var a = e(".cd-dropdown-wrapper").hasClass("open-to-left") ? "left" : "right";
    e(".cd-dropdown-content").menuAim({
        activate: function(n) {
            e(n).children().addClass("is-active").removeClass("fade-out"), 0 == e(".cd-dropdown-content .fade-in").length && e(n).children("ul").addClass("fade-in")
        },
        deactivate: function(n) {
            e(n).children().removeClass("is-active"), (0 == e("li.has-children:hover").length || e("li.has-children:hover").is(e(n))) && (e(".cd-dropdown-content").find(".fade-in").removeClass("fade-in"), e(n).children("ul").addClass("fade-out"))
        },
        exitMenu: function() {
            return e(".cd-dropdown-content").find(".is-active").removeClass("is-active"), !0
        },
        submenuDirection: a
    }), e(".go-back").on("click", function() {
        var n = e(this);
        e(this).parent("ul").parent(".has-children").parent("ul");
        n.parent("ul").addClass("is-hidden").parent(".has-children").parent("ul").removeClass("move-out")
    }), Modernizr.input.placeholder || (e("[placeholder]").focus(function() {
        var n = e(this);
        n.val() == n.attr("placeholder") && n.val("")
    }).blur(function() {
        var n = e(this);
        ("" == n.val() || n.val() == n.attr("placeholder")) && n.val(n.attr("placeholder"))
    }).blur(), e("[placeholder]").parents("form").submit(function() {
        e(this).find("[placeholder]").each(function() {
            var n = e(this);
            n.val() == n.attr("placeholder") && n.val("")
        })
    }))
});