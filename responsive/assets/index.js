var Util = {};

Util.addClass = function(node, cls) {
    var rCls = new RegExp("(^|\s+)" + cls + "(\s+|$)", "g");
    if (!rCls.test(node.className)) {
        node.className += " " + cls;
    }
};

Util.removeClass = function(node, cls) {
    var rCls = new RegExp("(^|\s+)" + cls + "(\s+|$)", "g");
    node.className = node.className.replace(rCls, "");
};

Util.replaceClass = function(node, ncls, ocls) {
    var rCls = new RegExp("(^|\s+)" + ocls + "(\s+|$)", "g");
    node.className = node.className.replace(rCls, " " + ncls);
};

(function(){
    var ua = navigator.userAgent;
    var rIe = /msie\s?(\d{1,2})/ig;
    var htmlNode = document.getElementsByTagName("html")[0];
    var timer = null;
    var sizes = [640, 1024];
    var ieVersion = null;

    if (rIe.test(ua)) {
        ieVersion = RegExp.$1;
        Util.addClass(htmlNode, "isie");
        Util.addClass(htmlNode, "ie" + ieVersion);
    }

    if (!ieVersion) {
        return;
    }

    function getSize(w, sizes) {
        var len = sizes.length;
        if (len === 1) {
            if (w > sizes[0]) {
                return -1;
            } else {
                return 0;
            }
        } else {
            if (w <= sizes[0]) {
                return 0;
            } else {
                var index = -1;
                for (var i = 1; i < len; i++) {
                    if (w <= sizes[i]) {
                        index = i;
                        break;
                    }
                }
                return index;
            }
        }
    }

    function doResize(){
        var winWidth = (document.body || document.documentElement).offsetWidth;
        var curSize = getSize(winWidth, sizes);
        if (curSize !== -1) {
            htmlNode.className = htmlNode.className.replace(/(^|\s+)w\d+(\s+|$)/g, "");
            Util.addClass(htmlNode, "w" + sizes[curSize]);
        } else {
            htmlNode.className = htmlNode.className.replace(/(^|\s+)w\d+(\s+|$)/g, "");
        }
    }

    window.onload = doResize;

    window.onresize = function(){
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function(){
            doResize();
        }, 50);
    };
})();