<template>
  <div>
    <el-form :inline="true" :model="form" class="form">
      <el-form-item>
        <el-input v-model="form.orderId" placeholder="订单编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.customerId" placeholder="客户账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.customerName" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.carId">
          <el-option v-for="item in options" :key="item.carId" :label="item.carName" :value="item.carId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Order',
    data() {
      return {
        form: {
          orderId: '',
          customerId: '',
          customerName: '',
          carName: '',
        },
        // 预定车型选项
        options: [{
          carId: 0,
          carName: '全部',
        }]
      }
    },
    methods: {
      query() {
        this.$axios({
          method: 'get',
          url: 'api/lease/order/list',
        }).then(res => {
          if (res.data.success) {
            console.log(res)
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    beforeCreate() {
      query()
    }
  }
</script>

<style>
  .form {
    text-align: left;
  }
</style>
