<template>
  <div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="输入您要查询的用户" v-model="listQuery.userName">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button style="margin-left: 10px;" @click="handleCreate" type="success" class="filter-item" icon="el-icon-edit">添加</el-button>
    </div>

    <el-table :data="newusers" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" width="65" type="index">

      </el-table-column>
      <el-table-column align="center" width="65" label="id">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" width="80" align="center" label="密码">
        <template slot-scope="scope">
          <span>{{scope.row.password}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="年龄">
        <template slot-scope="scope">
          <span>{{scope.row.age}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="地址">
        <template slot-scope="scope">
          <span v-if="scope.row.lnglat.length>0 && scope.row.lnglat[0].address !=''">{{scope.row.lnglat[0].address}}</span>
          <span v-else>该用户还未添加地址</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[3,5,8, 10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 80%; margin-left:50px;'>
        <el-form-item label="名称">
          <el-input v-model="temp.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="temp.password"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="temp.age"></el-input>
        </el-form-item>
        <el-form-item label="地址名称">
          <el-input v-model="temp.address"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">更新</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "表格",
      listQuery: {
        page: 1,
        limit: 3,
        userName: ""
      },
      users: [
        {
          age: 6541,
          id: 2,
          password: " VWTR",
          userName: "651"
        },
        {
          age: 25,
          id: 4,
          password: "asdf",
          userName: "asdf"
        },
        {
          age: 25,
          id: 6,
          password: "asedfdsf",
          userName: "ouaty"
        },
        {
          age: 18,
          id: 7,
          password: "ASDF ",
          userName: "asd rfase "
        }
      ],
      newusers: [],
      total: null,
      centerDialogVisible: false,
      dialogStatus: "",
      temp: {
        id: undefined,
        age: "",
        password: "",
        userName: "",
        address: "",
        lnglatid: undefined
      },
      textMap: {
        update: "修改用户信息",
        create: "添加用户信息"
      }
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    //获取数据
    getUsers() {
      axios
        .get("http://39.108.100.163:8888/selectUserList", {
          params: {
            page: this.listQuery.page,
            rows: this.listQuery.limit,
            userName: this.listQuery.userName
          }
        })
        .then(response => {
          //consoleconsole.log(response);
          this.newusers = response.data.list;
          this.total = response.data.total;
        })
        .catch(error => {
          console.log("axios==" + error);
        });
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
    },
    //修改用户信息之前获取该用户信息
    handleUpdate(row) {
      console.log(row);
      this.dialogStatus = "update";
      this.temp = Object.assign({}, row); // copy obj
      if (row.lnglat.length > 0) {
        this.temp.address = row.lnglat["0"].address;
      } else {
        this.temp.address = null;
      }
      if (row.lnglat.length > 0) {
        this.temp.lnglatid = row.lnglat["0"].id;
      } else {
        this.temp.lnglatid = null;
      }
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //修改用户信息
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          console.log(tempData);
          axios
            .get("http://39.108.100.163:8888/updateUser", {
              params: {
                id: tempData.id,
                age: tempData.age,
                password: tempData.password,
                userName: tempData.userName,
                address: tempData.address,
                lnglatid: tempData.lnglatid
              }
            })
            .then(() => {
              this.getUsers();
              this.centerDialogVisible = false;
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            });
        }
      });
    },
    //删除用户信息
    handleDelete(row) {
      // console.log(row.id);
      this.$confirm("确认删除？")
        .then(_ => {
          axios
            .get("http://39.108.100.163:8888/deleteUser", {
              params: {
                id: row.id
              }
            })
            .then(() => {
              this.getUsers();
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000,
                position: "top-right"
              });
            })
            .catch(error => {
              console.log("axios==" + error);
            });
        })
        .catch(_ => {
          this.getUsers();
        });
    },
    //添加用户信息之前
    resetTemp() {
      this.temp = {
        id: undefined,
        age: "",
        password: "",
        userName: "",
        address: ""
      };
    },
    handleCreate() {
      this.resetTemp(); //清空表单数据
      this.dialogStatus = "create";
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //添加用户
    createData() {
      const tempData = Object.assign({}, this.temp);
      axios
        .get("http://39.108.100.163:8888/addUser", {
          params: {
            age: tempData.age,
            password: tempData.password,
            userName: tempData.userName,
            address: tempData.address
          }
        })
        .then(() => {
          this.getUsers();
          this.centerDialogVisible = false;
          this.$notify({
            title: "成功",
            message: "添加成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(error => {
          console.log("axios==" + error);
          this.centerDialogVisible = false;
          this.$notify({
            title: "失败",
            message: "添加失败",
            type: "error",
            duration: 2000
          });
        });
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
