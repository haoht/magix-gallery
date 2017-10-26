/*
    generate by magix-combine@3.7.0: https://github.com/thx/magix-combine
    author: kooboy_li@163.com
    loader: cmd
 */
define('mx-checkbox/linkage',["$","magix"],function(require,exports,module){
/*$,Magix*/

/*
ver:1.3.1
*/
/*
    author:xinglie.lkf@alibaba-inc.com
 */
var $ = require('$');
var Magix = require('magix');
var FindNames = function (node) {
    node = $(node);
    var subs = node.find('input[linkage-parent]');
    var names = {};
    subs.each(function (idx, item) {
        var name = $(item).attr('linkage-parent');
        names[name] = 1;
    });
    node.find('input[linkage]').each(function (idx, item) {
        var name = $(item).attr('linkage');
        names[name] = 1;
    });
    return Magix.keys(names);
};
var SyncState = function (node, checkbox, name) {
    var all = node.find('input[linkage=' + name + ']');
    var subs = node.find('input[linkage-parent=' + name + ']');
    var indeterminate = false;
    var noneChecked = false;
    var toggle = all[0] == checkbox;
    var checked = checkbox && checkbox.checked;
    subs.each(function (index, item) {
        if (toggle) {
            item.checked = checked;
        }
        if (item.checked) {
            indeterminate = true;
        }
        else {
            noneChecked = true;
        }
    });
    all.prop('indeterminate', false);
    if (indeterminate && !noneChecked) {
        all.prop('checked', true);
    }
    else if (noneChecked && !indeterminate) {
        all.prop('checked', false);
    }
    else if (indeterminate) {
        all.prop('indeterminate', true);
    }
};
var ApplyTableCheckbox = function (node, checkbox) {
    node = $(node);
    var names = FindNames(node);
    if (names.length) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name = names_1[_i];
            SyncState(node, checkbox, name);
        }
    }
};
module.exports = {
    ctor: function () {
        var me = this;
        me.on('rendered', function () {
            ApplyTableCheckbox('#' + me.id);
        });
        if (DEBUG) {
            var mixins = me.mixins;
            var linkageBeforeState = false;
            var findLinkage = false;
            for (var _i = 0, mixins_1 = mixins; _i < mixins_1.length; _i++) {
                var m = mixins_1[_i];
                if (m.getSelectedIds) {
                    findLinkage = true;
                }
                else if (m.getStoreState) {
                    if (findLinkage) {
                        linkageBeforeState = true;
                    }
                }
            }
            if (linkageBeforeState) {
                console.error('put `app/gallery/mx-checkbox/storestate` before `app/gallery/mx-checkbox/linkage`');
            }
        }
    },
    getSelectedIds: function (name) {
        var ids = [];
        $('#' + this.id + ' input:checked').each(function (idx, input) {
            var value = input.value;
            var node = $(input);
            var pName = node.attr('linkage-parent');
            if (pName && value && (!name || (name && name == pName))) {
                ids.push(input.value);
            }
        });
        return ids;
    },
    '$input[linkage-parent]<change>': function (e) {
        ApplyTableCheckbox('#' + this.id, e.eventTarget);
    },
    '$input[linkage]<change>': function (e) {
        ApplyTableCheckbox('#' + this.id, e.eventTarget);
    }
};

});