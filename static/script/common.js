import axios from 'axios'

export default {
    install(Vue) {
        Vue.prototype.testFun = function () {
            alert(1);
        },
            /*
            功能：框架两个div的显示隐藏;
            参数：lr分别是两个div的id;
            active是点击后的样式
            */
            Vue.prototype.leftNavHidden = function (l, r) {
                var l = $('#' + l);
                var r = $('#' + r);
                l.toggleClass('active');
                r.toggleClass('active');
            },

            /*
            ** 转换请求参数 obj to str
            */
            Vue.prototype.paramsToStr = function (obj) {
                var qs = require('qs');
                var newkey = Object.keys(obj).sort();
                var newObj = {};
                for (var i = 0; i < newkey.length; i++) {
                    newObj[newkey[i]] = obj[newkey[i]];
                }
                return qs.stringify(newObj)
            }
        //请求事件类型方法
        Vue.prototype.getEventType = function () {
            var vm = this;
            var params = {
                AccessToken: "mtawoa9fd3bf9510e64ea38d11caa30d4ffd65",
                Method: 'findTemplateDetailList',
                istree: true,
            }
            return new Promise((resolve, reject) => {
                //创建Promise方法
                axios.post("http://192.168.1.251:8080/ucenter/gwapi", vm.paramsToStr(params)).then(response => {//数据请求
                    if (response.data.Status == 0) {
                        var res = response.data.data;
                        if (res.isOk) {
                            var data = res.data;
                            var newArray = [
                                {
                                    start: 'type_id',
                                    end: 'value'
                                },
                                {
                                    start: 'type_name',
                                    end: 'label'
                                }
                            ]
                            resolve(vm.replaceKeyName(newArray, data));
                        }
                    }
                }).catch((error) => {
                    reject(error)//请求失败数据返回
                })
            })
        }
        //替换数据key
        Vue.prototype.replaceKeyName = function (array, data) {
            for (var key in array) {
                data = JSON.parse(JSON.stringify(data).replace(new RegExp(array[key].start, 'g'), array[key].end));
            }
            return data;
        }
    }
}