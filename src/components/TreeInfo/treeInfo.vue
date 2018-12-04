<template>
    <div class="tree" @click="showTreeDoms" id="showTree">
        <div class="showText">
            <span v-if="treeData.label!=null" :title="treeData.label[0].label+ '/' +treeData.label[1].label+ '/' +treeData.label[2].label">{{treeData.label[0].label}} / {{treeData.label[1].label}} / {{treeData.label[2].label}}</span>
        </div>
        <div class="showTree" :class="{'active': showActive}">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>
            <div class="treeDom">
                <el-tree :data="treeData.list" :props="treeData.defaultProps" :filter-node-method="filterNode" show-checkbox node-key="id" :highlight-current="true" :expand-on-click-node="false" check-on-click-node default-expand-all ref="tree" @check-change="checkChange">
                </el-tree>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "treeInfo",
    data() {
        return {
            //下拉数据
            treeData: {
                list: [],
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                value: null,
                label: null
            },
            showActive: false,
            filterText: "",
            i: 0,
            editCheckId: ""
        };
    },
    props: {
        treeOptionsData: {
            type: Array,
            default: null
        },
        treeOptionsValue: {
            type: Array,
            default: null
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isActive(val) {
            var vm = this;
            if (val) {
                vm.treeData.list = vm.treeOptionsData;
                if (
                    vm.treeOptionsValue != null &&
                    vm.treeOptionsValue != undefined &&
                    vm.treeOptionsValue != ""
                ) {
                    var promise = new Promise((resolve, reject) => {
                        vm.$refs.tree.setCheckedKeys(vm.treeOptionsValue);
                        resolve(true);
                    });
                    promise.then(response => {
                        if (response) {
                            vm.getTreeSelectData();
                        }
                    });
                }
            }
        },
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted() {},
    methods: {
        checkChange(item, node, self) {
            var vm = this;
            if (node) {
                vm.editCheckId = item.id;
                vm.$refs.tree.setCheckedKeys([item.id]);
                if (item.children) {
                    vm.$refs.tree.setCheckedKeys([item.children[0].id]);
                }
            }
            vm.getTreeSelectData();
        },
        //获取已选数据
        getTreeSelectData() {
            var vm = this;
            var newArr = vm.$refs.tree.getHalfCheckedNodes();
            newArr.push(vm.$refs.tree.getCheckedNodes()[0]);
            if (newArr != undefined && newArr != "" && newArr != null) {
                vm.treeData.label = newArr;
            } else {
                vm.treeData.label = null;
            }
        },
        //点击显示树形
        showTreeDoms() {
            var vm = this;
            vm.showActive = true;

            $(document).bind("click", function(e) {
                //点击空白处，设置的弹框消失
                var target = $(e.target);
                var tag = $("#showTree");
                if (target.closest(tag).length == 0 && vm.showActive == true) {
                    vm.showActive = false;
                }
            });
        },
        //模糊查询
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }
};
</script>
<style lang="scss" scoped="" type="text/css">
.tree {
    float: left;
    width: 100%;
    height: 32px;
    position: relative;
    box-sizing: border-box;
    .showText {
        float: left;
        width: 100%;
        line-height: 30px;
        height: 100%;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 0 10px;
        span {
            float: left;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
    .showTree {
        width: 100%;
        max-height: 200px;
        position: absolute;
        left: 0;
        top: 30px;
        background: #fff;
        z-index: 9;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 10px;
        box-sizing: border-box;
        overflow: auto;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
        display: none;
    }
    .showTree.active {
        display: block;
    }
}
</style>
