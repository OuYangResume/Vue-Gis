<template>
  <div>
    <el-table :data="tableData" highlight-current-row:true style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope1">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope1.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="地址" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-dialog width="80%" :visible.sync="innerVisible" append-to-body>
        <pickUpMap v-on:getLngLat="getzuobiao">地图窗口</pickUpMap>
      </el-dialog>
      <el-form :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="temp.date" type="datetime" placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="temp.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="innerVisible = true">打开地图</el-button>
          <el-input v-model="temp.x" :disabled="true" />
          <el-input v-model="temp.y" :disabled="true" />
        </el-form-item>
      </el-form>

      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import draw from "@/views/map/leaflet/draw";
import pickUpMap from "@/components/Map/PickUpMap";
export default {
  components: {
    draw,
    pickUpMap
  },
  data() {
    return {
      centerDialogVisible: false,
      innerVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      temp: {
        date: new Date(),
        name: "",
        address: "",
        x: null,
        y: null
      }
    };
  },
  methods: {
    //修改之前方法
    handleEdit(index, row) {
      // console.log(index, row);
      this.temp = Object.assign({}, row); // copy obj
      this.temp.date = new Date(this.temp.date);
      this.centerDialogVisible = true;
    },
    // 删除方法
    handleDelete(index, row) {
      console.log(index, row);
    },
    //获取从map中的坐标
    getzuobiao(lng, lat) {
      this.temp.x = lng;
      this.temp.y = lat;
      console.log(lng + "adfas" + lat);
    }
  }
};
</script>