<!--
 * @Description: In User Settings Edit
 * @Author: oouyang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-01 15:10:46
 * @LastEditTime: 2019-03-18 15:31:53
 -->

<template>
  <div>
    <p>区域树型组件:{{activeItem._source.areaname}}</p>
    <!-- 右：
    <i class="iconfont icon-right"></i>
    上：
    <i class="iconfont icon-up"></i>
    下：
    <i class="iconfont icon-down"></i>
    x：
    <i class="iconfont icon-close-circle-fill"></i>-->
    <div v-clickoutside="handleClose">
      <div class="tree_input" @click="showTree">
        <p>{{activeItem._source.areaname}}</p>
        <transition name="fade">
          <i class="iconfont" :class="['icon-'+prefixCls ]"></i>
        </transition>
      </div>
      <transition name="fade">
        <div class="tree" id="tree" v-if="treeShow">
          <ul v-for="(childTree,nodeIndex) in treeList" :key="nodeIndex">
            <li
              :class="{active : activeIndex == item._id,parent:showParent(item)}"
              v-for="item in childTree"
              :key="item._id"
              @click="_getItemList(item,nodeIndex)"
            >
              <div>
                {{item._source.areaname}}
                <i v-if="item._id.length<15" class="iconfont icon-right"></i>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <!-- <div>后面的数据</div> -->
  </div>
</template>

<script>
import axios from "axios";
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
export default {
  name: "regionalTree",
  data() {
    return {
      treeList: [], //核心数组
      treeShow: false, //控制tree的显示隐藏
      activeIndex: null, //当前选择区域
      activeItem: {
        //当前选择数据
        _source: {
          areaname: "请选择"
        }
      }
    };
  },
  computed: {
    prefixCls() {
      let inputStyle = ["up", "down", "close-circle-fill"];
      if (this.treeShow) {
        if (this.activeItem._source.areaname == "请选择") {
          return inputStyle[0];
        } else {
          return inputStyle[2];
        }
      } else {
        return inputStyle[1];
      }
    }
  },
  filters: {},
  created() {},
  mounted() {
    let vm = this;
    vm.getChildList("440305").then(res => {
      console.log(res);
      vm.treeList.push(res);
    });
  },
  directives: {
    clickoutside: {
      // 初始化指令
      bind(el, binding, vnode) {
        function documentHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      update() {},
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  methods: {
    handleClose() {
      this.treeShow = false;
    },
    showTree() {
        this.treeShow = true;    
    },
    /**
     * @description: 样式处理。高亮父级
     * @param {type}
     * @return:
     */
    showParent(item) {
      return this.activeItem._id
        ? this.activeItem._id.indexOf(item._id) != -1
          ? true
          : false
        : false;
    },
    /**
     * @description:
     * @param {Object} item子树对象
     * @param {Number} nodeIndex用于判断当前点击有没有list
     * @return:
     */
    _getItemList(item, nodeIndex) {
      console.log(item, nodeIndex);
      let vm = this;
      vm.activeIndex = item._id;
      vm.activeItem = item;
      let code = item._source.areacode;
      vm.getChildList(code).then(res => {
        //如果核心数组里面存在，先删除，再push
        if (vm.treeList[nodeIndex + 1]) {
          let arr = vm.treeList;
          arr = arr.slice(0, nodeIndex + 1);
          vm.treeList = arr;
          vm.treeList.push(res);
        } else {
          if (res != undefined) {
            vm.treeList.push(res);
          }
        }
      });
    },
    /**
     * @description: 根据父级区域code获取子区域数据
     * @param {parentCode}
     * @return: ArrayList
     */
    getChildList(parentCode) {
      return axios({
        method: "post",
        url: "http://192.168.100.181:8990/cubeData/api/getAreaInfoByParentcode",
        params: {
          parentCode: parentCode
        }
      }).then(response => {
        console.log(response);
        if (response.data.code == 200) {
          return Promise.resolve(response.data.data);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tree_input {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: #fff;
  background-image: none;
  cursor: pointer;
  p {
    width: 100%;
    color: #515a6e;
    font-size: 14px;
  }
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  &:hover {
    border-color: #57a3f3;
    box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
  }
}

.tree {
  display: flex;
  position: absolute;
  background-color: #fff;
  box-sizing: border-box;
  margin: 5px 0;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  ul {
    min-width: 100px;
    border-right: 1px solid #e8eaec;
    padding: 0px;
    margin: 0px;
    list-style-type: none;
    &:last-child {
      margin-right: -1px;
    }
    li {
      position: relative;
      cursor: pointer;
      padding: 7px 16px;
      clear: both;
      color: #515a6e;
      font-size: 12px;
      &:hover {
        background: #f3f3f3;
      }
      i {
        font-size: 12px;
        position: absolute;
        right: 15px;
        top: 50%;
        margin-top: -6px;
      }
    }
    li.active,
    li.parent {
      color: #2d8cf0;
      background: #f3f3f3;
    }
  }
}
</style>


