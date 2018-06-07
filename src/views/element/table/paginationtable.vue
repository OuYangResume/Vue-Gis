<template>
    <div>
        分页{{name}}


    <el-table :data="newusers"   element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center"  width="65" label="id">
        <template slot-scope="scope" >
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center"  label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" width="150px" label="密码" >
        <template slot-scope="scope">
          <span>{{scope.row.password}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="年龄">
        <template slot-scope="scope">
          <span>{{scope.row.age}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">{{$t('table.publish')}}
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.draft')}}
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
       :current-page="listQuery.page" :page-sizes="[3,5,8, 10]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
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
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
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
      total: null
    };
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      axios
      .get("http://localhost:8888/getList",{
          params:{
              pageNum:this.listQuery.page,
              pageSize:this.listQuery.limit
          }
      })
      .then(response => {
           //console.log(response);
         this.newusers = response.data.list
         this.total=response.data.total
      })
      .catch(error => {
        console.log("axios==" + error);
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getUsers();
    },
     handleCurrentChange(val) {
      this.listQuery.page = val
      this.getUsers()
    },
  }
};
</script>