<template>
    <div>
        <div>
            <el-table :data="userData.list" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" width="65" type="index">

                </el-table-column>
                <el-table-column align="center" width="65" label="id">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150px" align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.username}}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="150px" width="180" align="center" label="密码">
                    <template slot-scope="scope">
                        <span>{{scope.row.password}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="110px" align="center" label="年龄">
                    <template slot-scope="scope">
                        <span>{{scope.row.age}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="地址">
                    <template slot-scope="scope">
                        {{scope.row.describe}}
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                    :page-sizes="[3,5,8, 10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import Mock from 'mockjs'
    export default {
        data() {
            return {
                name: "表格",
                listQuery: {
                    page: 1,
                    limit: 3,
                    userName: ""
                },  
                userData: {
                    total: null,
                    list: []
                },
                total:null
            };
        },
        created() {
            // this.getUsers();
            this.getUserData();
            // this.initGetData();
        },
        methods: {
            initGetData: function () {
                new Promise((resolve, reject) => {})
                    .then(this.getUserData())
                    .catch(
                        reject(error)//请求失败数据返回
                    )
            },
            //Mock生成数据
            templateFunction: () => {
                const Random = Mock.Random;
                var id = 0;
                var len = 10;
                let data = {
                    code: 1000,
                    msg: '成功',
                    total: len,
                    data: new Array()
                }
                for (var i = 0; i < len; i++) {
                    var obj = new Object();
                    obj.id = id++;
                    obj.age = Random.integer(18, 25);//生成1-5随机值
                    obj.password = Random.natural();//生成16位随机值
                    obj.username = Random.ctitle();//生成4位中文
                    obj.time = Random.date('yyyy-MM-dd');//生成日期
                    obj.describe = Random.cparagraph();//生成一句话
                    data.data.push(obj);
                }
                return data;
            },
            getUserData() {
                var vm = this;
                Mock.mock("getAllUserData", vm.templateFunction);
                axios.get("getAllUserData").then(res => {
                    console.log(res);
                    vm.userData.total = res.data.total;
                    vm.userData.list = res.data.data;
                })
            },
            //添加用户名的模糊搜索
            handleFilter() {
                this.listQuery.page = 1;
                this.getUsers();
            },
            //修改每页的数量，重新获取数据
            handleSizeChange(val) {
                this.listQuery.limit = val;
                this.getUsers();
            },
            // 修改第几页。
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getUsers();
            }
        }
    };
</script>

<style scoped>
    .filter-container {
        padding-bottom: 10px;
    }

    .filter-item {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 10px;
    }
</style>