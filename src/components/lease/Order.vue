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
        <el-input v-model="form.customerName" placeholder="客户名称" @change="query()"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.carId" @change="query()">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
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
          <el-button type="text" size="small" v-text="scope.row.orderId"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="客户账号" width="180" />
      <el-table-column prop="customerName" label="客户姓名" width="180" />
      <el-table-column prop="carName" label="预定车型" width="180" />
      <el-table-column prop="fromCityName" label="取车城市" width="180" />
      <el-table-column prop="fromShopName" label="取车门店" width="180" />
      <el-table-column prop="fromTime" label="取车时间" width="180" />
      <el-table-column prop="toCityName" label="还车城市" width="180" />
      <el-table-column prop="toShopName" label="还车门店" width="180" />
      <el-table-column prop="toTime" label="还车时间" width="180" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column prop="orderTime" label="订单日期" width="180" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="showDialog(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination layout="total, sizes, prev, pager, next, jumper" :current-page.sync="form.pageNum"
      :page-size.sync="form.pageSize" :total="total" @current-change="query()" background>
    </el-pagination>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible" :append-to-body="true" width="30%" :center="true">
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
        <el-button type="plain" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Order',
    data() {
      return {
        form: {
          carId: '',
          pageNum: 1,
          pageSize: 10,
        },
        // 预定车型选项
        options: this.$store.state.carOptions,
        dialogFormVisible: false,
        dialogData: {},
      }
    },
    computed: {
      total() {
        return this.$store.state.order.total
      },
      tableData() {
        return this.$store.state.order.list
      },
      pageSize() {
        return this.$store.state.order.pageSize
      },
      pageNum() {
        return this.$store.state.order.pageNum
      },
      pageCount() {
        return this.$store.state.order.pages
      }
    },
    methods: {
      showDialog(row) {
        this.dialogData = row
        this.dialogFormVisible = true
      },
      query() {
        this.$axios({
          method: 'post',
          url: 'api/lease/order/list',
          data: this.form,
        }).then(res => {
          if (res.data.success) {
            // console.log(res.data.obj)
            this.$store.commit('order', res.data.obj)
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
    created() {
      this.query()
      this.$axios({
        method: 'post',
        url: 'api/car/car/list',
        data: {
          pageNum: 1,
          pageSize: 100
        },
      }).then(res => {
        if (res.data.success) {
          res.data.obj.unshift({
            id: '',
            name: '全部'
          })
          // console.log(res.data.obj)
          this.$store.commit('carOptions', res.data.obj)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style>
  .form {
    text-align: left;
  }
</style>
