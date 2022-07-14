<template>
  <div>
    <el-form :inline="true" :model="queryForm" style="text-align: left;">
      <el-form-item label="客户名称">
        <el-input v-model="queryForm.name" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="openAdd" plain>新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="customerId" label="客户账号">
      </el-table-column>
      <el-table-column prop="name" label="客户名称">
      </el-table-column>
      <el-table-column prop="idcard" label="身份证号">
      </el-table-column>
      <el-table-column prop="contact" label="紧急联系人">
      </el-table-column>
      <el-table-column prop="ctel" label="紧急联系人电话">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="createId" label="新增人员">
      </el-table-column>
      <el-table-column prop="createTime" label="新增时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗" @confirm="del(scope.row)">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-show="total > 0" background @size-change="query" @current-change="query"
      :current-page.sync="queryForm.pageNum" :page-size.sync="queryForm.pageSize"
      layout="total,sizes,prev, pager, next,jumper" :total="total">
    </el-pagination>
    <!-- 新增、修改页面 -->
    <el-dialog :title="title" :visible.sync="show" width="500px">
      <el-input type="hidden" :name="dialogType"></el-input>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="账号" prop="customerId">
          <el-input v-model="form.customerId" clearable :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认" prop="repPassword">
          <el-input v-model="form.repPassword" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="form.idcard" type="idcard" clearable></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人" prop="contact">
          <el-input v-model="form.contact" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="ctel">
          <el-input v-model="form.ctel" type="tel" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提 交</el-button>
        <el-button @click="show = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Customer',
    data() {
      return {
        //查询条件对象
        queryForm: {
          name: '',
          pageNum: 1,
          pageSize: 10
        },
        //数据表格数组
        tableData: [],
        //一共多少条数据
        total: 0,
        //对话框标题
        title: '',
        //显示、隐藏对话框
        show: false,
        //初始化表单对象
        form: {},
        //初始化校验对象
        rules: {},
        //标识是新增还是修改
        dialogType: 'add',
        //主键是否可以被编辑，默认可编辑
        disabled: false
      }
    },
    methods: {
      query() {
        this.$axios({
          method: 'post',
          url: 'api/lease/customer/list',
          data: this.queryForm
        }).then(res => {
          if (res.data.success) {
            this.tableData = res.data.obj.list;
            this.total = res.data.obj.total;
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(err => {
          console.info(err)
        });
      },
      openAdd() {
        //设置对话框标题
        this.title = "新增";
        //清空表单
        this.form = {};
        //主键可编辑
        this.disabled = false;
        //打开对话框
        this.show = true;
        //更改标识为新增
        this.dialogType = 'add';
      },
      openEdit(row) {
        //设置对话框标题
        this.title = "编辑";
        //清空表单
        this.form = {};
        //主键不可编辑
        this.disabled = true;
        //打开对话框
        this.show = true;
        //更改标识为新增
        this.dialogType = 'edit';
        //对列表行对象进行克隆，解决双向绑定问题
        this.form = Object.assign({}, row);
        //清空密码
        this.form.password = "";
        //暂时忽略编辑更新时间
        this.form.createTime = '';
        this.form.modifyTime = '';
      },
      submitForm() {
        if (this.dialogType == 'add') {
          this.$axios({
            method: 'post',
            url: 'api/lease/customer/add',
            data: this.form
          }).then(res => {
            //关闭对话框
            this.show = false;
            //刷新页面
            this.query()
          }).catch(err => {
            console.info(err)
          });
        } else {
          this.$axios({
            method: 'post',
            url: 'api/lease/customer/edit',
            data: this.form
          }).then(res => {
            //关闭对话框
            this.show = false;
            //刷新页面
            this.query()
          }).catch(err => {
            console.info(err)
          });
        }
      },
      del(row) {
        this.$axios({
          method: 'get',
          url: 'api/lease/customer/del/' + row.id
        }).then(res => {
          //刷新页面
          this.query()
        }).catch(err => {
          console.info(err)
        });
      }
    },
    created() {
      //初始化页面时进行数据查询
      this.query();
    }
  }
</script>

<style>
</style>
