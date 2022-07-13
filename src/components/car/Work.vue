<template>
  <div>
    <!-- 查询栏 -->
    <el-form :inline="true" :model="form" class="form">
      <el-form-item>
        <el-input v-model="form.orderId" placeholder="订单编号" @change="query()"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.customerId" placeholder="客户账号" @change="query()"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 记录表 -->
    <el-table :data="tableData" style="width: 100%" height="450" stripe border
      :header-cell-style="{background:'#f7f7f7',color:'#666666'}">
      <el-table-column fixed="left" prop="orderId" label="订单编号" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-text="scope.row.orderId" @click="showDialog(scope.row.orderId)" />
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="客户账号" width="180" />
      <el-table-column prop="customerName" label="客户姓名" width="180" />
      <el-table-column prop="carNo" label="车牌号码" width="180" />
      <el-table-column prop="outTime" label="出车时间" width="180" />
      <el-table-column prop="inTime" label="回车时间" width="180" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="showDetail(scope.row)">详情</el-button>
          <el-button v-if="scope.row.status === '已准备'" type="success" size="small" @click="showChuChe(scope.row)">出车
          </el-button>
          <el-button v-else-if="scope.row.status === '已出车'" type="success" size="small" @click="showHuiChe(scope.row)">
            回车
          </el-button>
          <el-button v-else-if="scope.row.status === '已回车'" type="success" size="small"
            @click="showZhengBei(scope.row)">
            整备
          </el-button>
          <el-button v-else type="success" size="small" disabled>
            整备
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination layout="total, sizes, prev, pager, next, jumper" :current-page.sync="form.pageNum"
      :page-size.sync="form.pageSize" :total="total" @current-change="query()" background>
    </el-pagination>

    <!-- 订单详情弹窗 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" :append-to-body="true" width="30%" :center="true">
      <el-form :model="dialogData" label-width="120px">
        <el-form-item label="订单编号">
          <el-input :value="dialogData.orderId" />
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input :value="dialogData.customerId" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input :value="dialogData.customerName" />
        </el-form-item>
        <el-form-item label="预定车型">
          <el-input :value="dialogData.carName" />
        </el-form-item>
        <el-form-item label="取车城市">
          <el-input :value="dialogData.fromCityName" />
        </el-form-item>
        <el-form-item label="取车门店">
          <el-input :value="dialogData.fromShopName" />
        </el-form-item>
        <el-form-item label="取车时间">
          <el-input :value="dialogData.fromTime" />
        </el-form-item>
        <el-form-item label="还车城市">
          <el-input :value="dialogData.toCityName" />
        </el-form-item>
        <el-form-item label="还车门店">
          <el-input :value="dialogData.toShopName" />
        </el-form-item>
        <el-form-item label="还车时间">
          <el-input :value="dialogData.toTime" />
        </el-form-item>
        <el-form-item label="合同名称">
          <el-input :value="dialogData.agreementName" />
        </el-form-item>
        <el-form-item label="不计免赔险">
          <el-input :value="dialogData.nomp" />
        </el-form-item>
        <el-form-item label="车上人员责任险">
          <el-input :value="dialogData.psur" />
        </el-form-item>
        <el-form-item label="支付金额">
          <el-input :value="dialogData.total" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="detailVisible" :append-to-body="true" width="30%" :center="true">
      <el-form :model="detailData" label-width="120px">
        <el-form-item label="订单编号">
          <el-input :value="detailData.orderId" />
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input :value="detailData.customerId" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input :value="detailData.customerName" />
        </el-form-item>
        <el-form-item label="预定车型">
          <el-input :value="detailData.carName" />
        </el-form-item>
        <el-form-item label="出车门店">
          <el-input :value="detailData.fromShopName" />
        </el-form-item>
        <el-form-item label="出车时间">
          <el-input :value="detailData.outTime" />
        </el-form-item>
        <el-form-item label="出车人员">
          <el-input :value="detailData.outUserId" />
        </el-form-item>
        <el-form-item label="回车门店">
          <el-input :value="detailData.toShopName" />
        </el-form-item>
        <el-form-item label="回车时间">
          <el-input :value="detailData.inTime" />
        </el-form-item>
        <el-form-item label="回车人员">
          <el-input :value="detailData.inUserId" />
        </el-form-item>
        <el-form-item label="整备时间">
          <el-input :value="detailData.outFitTime" />
        </el-form-item>
        <el-form-item label="整备人员">
          <el-input :value="detailData.outFitUserId" />
        </el-form-item>
        <el-form-item label="差价">
          <el-input :value="detailData.total" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input :value="detailData.status" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 出车弹窗 -->
    <el-dialog title="出车详情" :visible.sync="chuCheVisible" :append-to-body="true" width="30%" :center="true">
      <el-form :model="chuCheData" label-width="120px">
        <el-form-item label="客户姓名">
          <el-input :value="chuCheData.customerName" disabled />
        </el-form-item>
        <el-form-item label="取车门店">
          <el-input :value="chuCheData.fromShopName" disabled />
        </el-form-item>
        <el-form-item label="预定车型">
          <el-input :value="chuCheData.carName" disabled />
        </el-form-item>
        <el-form-item label="车牌号码">
          <el-input v-model="chuReturnData.carNo" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chuCheClose()">确 定</el-button>
        <el-button type="primary" @click="chuCheVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 回车弹窗 -->
    <el-dialog title="回车详情" :visible.sync="huiCheVisible" :append-to-body="true" width="30%" :center="true">
      <el-form :model="huiCheData" label-width="120px">
        <el-form-item label="客户姓名">
          <el-input :value="huiCheData.customerName" disabled />
        </el-form-item>
        <el-form-item label="还车门店">
          <el-input :value="huiCheData.fromShopName" disabled />
        </el-form-item>
        <el-form-item label="预定车型">
          <el-input :value="huiCheData.carName" disabled />
        </el-form-item>
        <el-form-item label="车牌号码">
          <el-input :value="huiCheData.carNo" disabled />
        </el-form-item>
        <el-form-item label="补齐差价">
          <el-input v-model="huiReturnData.total" placeholder="0.00" />
        </el-form-item>
        <el-form-item label="提示">
          <div>请检查车辆情况，并在支付差价后确认收车！</div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="huiReturnData.mark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="huiCheClose()">确 定</el-button>
        <el-button type="primary" @click="huiCheVisible = false">取消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  export default {

    name: 'Work',

    data() {
      return {
        // 查询表单
        form: {
          pageNum: 1,
          pageSize: 10
        },
        // 表格数据
        tableData: [],
        // 分页器要的属性
        total: 0,
        // 订单表单展示对话框
        dialogVisible: false,
        dialogData: {},
        // 详情对话框
        detailVisible: false,
        detailData: {},
        // 出车表单对话框
        chuCheVisible: false,
        chuCheData: {},
        chuReturnData: {},
        // 回车表单对话框
        huiCheVisible: false,
        huiCheData: {},
        huiReturnData: {},
        // 整备确认对话框
        zhengBeiVisible: false,
        zhengBeiData: {},
        zhengReturnData: {}
      }
    },

    methods: {
      query() {
        this.$axios({
          method: 'post',
          url: 'api/car/work/list',
          data: this.form
        }).then(res => {
          if (res.data.success) {
            // console.log(res)
            this.tableData = res.data.obj.list
            this.total = res.data.obj.total
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },

      showDialog(id) {
        this.$axios({
          method: 'post',
          url: 'api/lease/order/list',
          data: {
            orderId: id,
            pageNum: 1,
            pageSize: 1
          },
        }).then(res => {
          if (res.data.success) {
            this.dialogData = res.data.obj.list[0]
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
        this.dialogVisible = true
      },

      showDetail(row) {
        let obj = row
        this.$axios({
          method: 'post',
          url: 'api/lease/order/list',
          data: {
            orderId: row.id,
            pageNum: 1,
            pageSize: 1
          },
        }).then(res => {
          if (res.data.success) {
            obj.fromShopName = res.data.obj.list[0].fromShopName
            obj.toShopName = res.data.obj.list[0].toShopName
            obj.carName = res.data.obj.list[0].carName
            this.detailData = obj
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
        this.detailVisible = true
      },

      showChuChe(row) {
        this.$axios({
          method: 'post',
          url: 'api/lease/order/list',
          data: {
            orderId: row.id,
            pageNum: 1,
            pageSize: 1
          },
        }).then(res => {
          if (res.data.success) {
            this.chuCheData = res.data.obj.list[0]
            this.chuReturnData = this.chuCheData
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
        this.chuCheVisible = true
      },

      showHuiChe(row) {
        this.$axios({
          method: 'post',
          url: 'api/lease/order/list',
          data: {
            orderId: row.id,
            pageNum: 1,
            pageSize: 1
          },
        }).then(res => {
          if (res.data.success) {
            this.huiCheData = res.data.obj.list[0]
            this.huiCheData.carNo = row.carNo
            this.huiReturnData = this.huiCheData
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
        this.huiCheVisible = true
      },

      showZhengBei() {
        return null
      },

      chuCheClose() {
        this.chuReturnData.id = this.chuReturnData.orderId
        this.chuReturnData.status = "已出车"
        this.chuReturnData.outTime = this.$moment().format("YYYY-MM-DD HH:mm:ss")
        this.chuReturnData.outUserId = this.$store.state.loginUserId
        this.$axios({
          method: 'post',
          url: 'api/car/work/update',
          data: this.chuReturnData
        }).then(res => {
          this.query()
          this.chuCheVisible = false
        }).catch(err => {
          console.log(err)
          this.chuCheVisible = false
        })
      },

      huiCheClose() {
        this.huiReturnData.id = this.huiReturnData.orderId
        this.huiReturnData.status = "已回车"
        this.huiReturnData.inTime = this.$moment().format("YYYY-MM-DD HH:mm:ss")
        this.huiReturnData.inUserId = this.$store.state.loginUserId
        this.$axios({
          method: 'post',
          url: 'api/car/work/update',
          data: this.huiReturnData
        }).then(res => {
          this.query()
          this.huiCheVisible = false
        }).catch(err => {
          console.log(err)
          this.huiCheVisible = false
        })
      }
    },

    created() {
      this.query()
    }
  }
</script>

<style>
  .form {
    text-align: left;
  }
</style>
