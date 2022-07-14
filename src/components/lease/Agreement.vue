<template>
  <div>
    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" style="text-align: left;">
      <el-form-item label="合同名称">
        <el-input v-model="queryForm.name" placeholder="合同名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="openAdd" plain>新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="合同名称" width="100">
      </el-table-column>
      <el-table-column prop="text" label="合同内容">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
      </el-table-column>
      <el-table-column prop="createId" label="新增人员" width="100">
      </el-table-column>
      <el-table-column prop="createTime" label="新增时间" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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
    <!-- 新增、修改页面 -->
    <el-dialog :title="title" :visible.sync="show" width="500px">
      <el-input type="hidden" :name="dialogType"></el-input>
      <el-form :model="form" :rules="rules" ref="form" label-width="60px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="text">
          <el-input v-model="form.text"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
        <el-button @click="show = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Agreement',
    data() {
      return {
        //查询条件对象
        queryForm: {
          name: '',
          pageNum: 1,
          pageSize: 5,
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
        rules: {},
        //标识是新增还是修改
        dialogType: 'add'
      }
    },
    methods: {
      query() {
        this.$axios({
          method: 'post',
          url: 'api/lease/agreement/list',
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
        //打开对话框
        this.show = true;
        //更改标识为新增
        this.dialogType = 'edit';
        //对表单进行复制，解决双向绑定问题
        this.form = Object.assign({}, row);
        //暂时忽略编辑更新时间
        this.form.createTime = '';
        this.form.modifyTime = '';
      },
      submitForm() {
        if (this.dialogType == 'add') {
          this.$axios({
            method: 'post',
            url: 'api/lease/agreement/add',
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
            url: 'api/lease/agreement/edit',
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
          url: 'api/lease/agreement/del/' + row.id
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
