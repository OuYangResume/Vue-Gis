/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 11:23:30
 * @LastEditTime: 2019-10-17 16:31:04
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import { Popup, Coordinate } from 'mapbox-gl';

import * as components from './src';

let currentPopup;
let instance;
let Template;
const popovers = [];

const getPopover = function (_str) {
    Template = Vue.extend(components[_str]);
};

function closePopover() {
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
        instance.$destroy();
    }
}

function clearAll() {
    if (popovers && popovers.length > 0) {
        for (let i = 0; i < popovers.length; i++) {
            popovers[i].remove();
            popovers.splice(i, 1);
        }
    }
}

// 默认回调
const defaultCallback = action => {
    if (currentPopup) {
        const callback = currentPopup.callback;
        if (typeof callback === 'function') {
            callback(action);
        } else {
            closePopover();
        }
    }
};

// 创建实例
const initInstance = (data) => {
    instance = new Template({
        data,
        el: document.createElement('div'),
    });
    instance.callback = defaultCallback;
};

const getPopoverElement = (type, options) => {
    if (!type) return;
    getPopover(type);
    initInstance(options);
    instance.action = '';
    if (popovers.length > 0) {
        const _options = options;
        if (_options.callback === undefined) {
            instance.callback = defaultCallback;
        }

        Object.keys(_options).forEach(prop => {
            if (_options[prop]) {
                instance[prop] = _options[prop];
            }
        });

        document.body.appendChild(instance.$el);
        Vue.nextTick(() => {
            instance.visible = true;
        });
    }
    return instance.$el;
};

const showPopover = function (type, map, options = {}) {
    if (options.closeLast) {
        closePopover();
    }

    if (!options.coordinates || !options.coordinates[0] || !options.coordinates[1]) {
        console.warn('无空间信息！');
        return false;
    }

    const contentHtml = getPopoverElement(type, options);

    const popover = new Popup(Object.assign({}, {

    }, options));
    const coords = options.coordinates;

    popover.setLngLat(coords)
        .setDOMContent(contentHtml)
        .addTo(map);

    currentPopup = popover;
    popovers.push(currentPopup);

    if (options.autoCenter) {
        map.animateTo({
            center: coords
        });
    }
};

const updatePopover = options => {
    if (currentPopup) {
        currentPopup.options = Object.assign(currentPopup.options, options);
        currentPopup._update();
    }
};

export {
    showPopover, closePopover,
    clearAll, updatePopover,
};

export default showPopover;
