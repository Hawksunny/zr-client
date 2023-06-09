<template>
  <div>
    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" style="text-align: left;">
      <el-form-item label="账号">
        <el-input v-model="queryForm.userId" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="queryForm.userName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="openAdd" plain >新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据列表 -->
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#f7f7f7',color:'#666666'}">
      <el-table-column prop="userId" label="账号">
      </el-table-column>
      <el-table-column prop="userName" label="姓名">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="change(scope.row)" active-value="1" inactive-value="0"
            active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="roleList" label="拥有角色">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.roleList" :key="item.id">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createId" label="新增人员">
      </el-table-column>
      <el-table-column prop="createTime" label="新增时间">
      </el-table-column>
      <el-table-column prop="modifyId" label="修改人员">
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗?" @confirm="del(scope.row)">
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
    <!-- 新增/修改页面 -->
    <el-dialog :title="title" :visible.sync="show" width="500px">
      <el-input type="hidden" :name="dialogType"></el-input>
      <el-form :model="form" :rules="rules" ref="form" label-width="60px">
        <el-form-item label="账号" prop="userId">
          <el-input v-model="form.userId" clearable :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="重复" prop="repPassword">
          <el-input v-model="form.repPassword" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roles" multiple placeholder="请选择" @change="$forceUpdate()">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="show = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      let validatePass = (rule, value, callback) => {
        if (this.form.password != '' && value === undefined) {
          callback(new Error('请再次输入密码'));
        } else if (this.form.password != '' && value != this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        //查询条件对象
        queryForm: {
          userId: '',
          userName: '',
          pageNum: 1,
          pageSize: 10
        },
        //数据表格数组
        tableData: [],
        //一共多少条数据
        total: 0,
        //对话框标题
        title: '',
        //显示/隐藏对话框
        show: false,
        //初始化表单对象
        form: {},
        //初始化校验对象
        rules: {
          userId: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          userName: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          repPassword: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }]
        },
        //所有角色
        roleList: [],
        //标识是新增还是修改
        dialogType: 'add',
        //主键是否可以被编辑:默认可以编辑
        disabled: false
      }
    },
    methods: {
      //查询数据
      query() {
        this.$axios({
          method: 'post',
          url: 'api/sys/user/list',
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
        //设置校验规则为可校验密码
        this.rules.password[0].required = true;
        this.rules.repPassword[0].required = true;
        //获取所有角色数组
        this.queryRoleList();
        //清除表单校验结果
        this.$nextTick(function() {
          this.$refs['form'].clearValidate();
        });
      },
      openEdit(row) {
        //设置对话框标题
        this.title = "编辑";
        //清空表单
        this.form = {};
        //主键不可以编辑
        this.disabled = true;
        //设置校验规则为不可校验密码
        this.rules.password[0].required = false;
        this.rules.repPassword[0].required = false;
        //打开对话框
        this.show = true;
        //更改标识为新增
        this.dialogType = 'edit';
        //获取所有角色数组
        this.queryRoleList();
        //对列表行对象进行克隆，解决双向绑定问题 注意：select 需要 @change="$forceUpdate()"强制刷新
        this.form = Object.assign({}, row);
        //清空密码
        this.form.password = "";
        //处理角色：row.roleList => form.roles
        this.form.roles = [];
        for (let i = 0; i < row.roleList.length; i++) {
          let role = row.roleList[i];
          this.form.roles.push(role.id);
        }
        //清除表单校验结果
        this.$nextTick(function() {
          this.$refs['form'].clearValidate();
        });
      },
      //更改状态
      change(row) {
        this.$confirm('确认要更改账号状态吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'post',
            url: 'api/sys/user/change',
            data: row
          }).then(res => {
            this.getList();
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          if (row.status == "0") {
            row.status = "1"
          } else {
            row.status = "0"
          }
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.dialogType == 'add') {
              this.$axios({
                method: 'post',
                url: 'api/sys/user/add',
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
                url: 'api/sys/user/edit',
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
          }
        });
      },
      del(row) {
        this.$axios({
          method: 'get',
          url: 'api/sys/user/del/' + row.userId
        }).then(res => {
          //刷新页面
          this.query()
        }).catch(err => {
          console.info(err)
        });
      },
      queryRoleList() {
        this.$axios({
          method: 'post',
          url: 'api/sys/role/selectList'
        }).then(res => {
          this.roleList = res.data.obj;
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
  .el-select {
    width: 100%;
  }
</style>
