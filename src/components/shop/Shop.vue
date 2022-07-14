<template>
  <div>
    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" style="text-align: left;">
      <el-form-item label="门店名称">
        <el-input v-model="queryForm.name" placeholder="门店名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="openAdd" plain>新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="province" label="省份名称">
        <template slot-scope="scope">{{scope.row.province.name}}
        </template>
      </el-table-column>
      <el-table-column prop="city" label="城市名称">
        <template slot-scope="scope">{{scope.row.city.name}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="门店名称">
      </el-table-column>
      <el-table-column prop="address" label="门店地址">
      </el-table-column>
      <el-table-column prop="tel" label="电话">
      </el-table-column>
      <el-table-column prop="admin" label="负责人">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="change(scope.row)" active-value="在营" inactive-value="未营"
            active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createId" label="新增人员">
      </el-table-column>
      <el-table-column prop="createTime" label="新增时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="del(scope.row)">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-show="total > 0" background @size-change="query" @current-change="query"
      :current-page.sync="queryForm.pageNum" :page-size-sync="queryForm.pageSize"
      layout="total,sizes,prev, pager, next,jumper" :total="total">
    </el-pagination>
    <!-- 新增/修改页面 -->
    <el-dialog :title="title" :visible.sync="show" width="500px">
      <el-input type="hidden" :name="dialogType"></el-input>
      <el-form :model="form" :rules="rules" ref="form" label-width="60px">
        <el-form-item label="省份" prop="id">
          <el-select v-model="form.province.id" clearable placeholder="请选择" @change="changeSelect()">
            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
          <el-select v-model="form.cityId" clearable placeholder="请选择" @change="$forceUpdate()">
            <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="form.tel" clearable></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="admin">
          <el-input v-model="form.admin" clearable></el-input>
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
    name: 'Shop',
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
        //显示/隐藏对话框
        show: false,
        //初始化form对象
        form: {
          province: {
            id: ''
          }
        },
        //初始化校验对象
        rules: {
          id: [{
            required: true,
            message: '请输入省份',
            trigger: 'blur'
          }],
          cityId: [{
            required: true,
            message: '请输入城市',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入门店名字',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }],
          tel: [{
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }],
          admin: [{
            required: true,
            message: '请输入新增人员',
            trigger: 'blur'
          }]
        },
        //所有省份
        provinceList: [],
        //所有城市
        cityList: [],
        //城市选择
        cityOptions: [],
        //标识是新增还是修改
        dialogType: 'add'
      }
    },
    methods: {
      //查询数据
      query() {
        this.$axios({
          method: 'post',
          url: 'api/shop/shop/list',
          data: this.queryForm
        }).then(res => {
          if (res.data.success) {
            this.tableData = res.data.obj.list;
            this.total = res.data.obj.total;
          } else {
            this.$message.error(res.data.msg);
          }
          this.loading = false;
        }).catch(err => {
          console.info(err)
        });
      },
      openAdd() {
        //设置对话框标题
        this.title = "新增";
        //清空表单
        this.form = {
          province: {
            id: ''
          }
        };
        //打开对话框
        this.show = true;
        //更新标识为新增
        this.dialogType = 'add';
        //获取所有省份数组
        this.queryProvinceList();
        //获取所有城市数组
        this.queryCityList();
        //清除表单校验结果
        this.$nextTick(function() {
          this.$refs['form'].clearValidate();
        });

      },
      openEdit() {
        //设置对话框标题
        this.title = "编辑";
        //清空表单
        this.form = {
          province: {
            id: ''
          }
        };
        //打开对话框
        this.show = true;
        //更新标识为新增
        this.dialogType = 'edit';
        //获取所有省份数组
        this.queryProvinceList();
        //获取所有城市数组
        this.queryCityList();
        //对列表行对象进行克隆，解决双向绑定问题 注意：select 需要 @change="$forceUpdate()"强制刷新
        this.form = Object.assign({}, row);
        this.form.cityId = '';
        //
        this.form.createTime = '';
        this.form.modifyTime = '';
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
            url: 'api/shop/shop/change',
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
      changeSelect() {
        this.cityOptions = [];
        //每次点击消除cityName
        this.form.cityId = '';
        let i = 0;
        //遍历
        for (let k = 0; k < this.cityList.length; k++) {
          //城市内容与省份对比
          if (this.form.province.id == this.cityList[k].provinceId) {
            this.cityOptions[i] = this.cityList[k];
            i++;
          }
        }
      },
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.dialogType == 'add') {
              this.$axios({
                method: 'post',
                url: 'api/shop/shop/add',
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
                url: 'api/shop/shop/edit',
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
          url: 'api/shop/shop/del/' + row.address
        }).then(res => {
          //刷新页面
          this.query()
        }).catch(err => {
          console.info(err)
        });
      },
      queryProvinceList() {
        this.$axios({
          method: 'post',
          url: 'api/shop/province/selectList'
        }).then(res => {
          this.provinceList = res.data.obj;
        }).catch(err => {
          console.info(err)
        });
      },
      queryCityList() {
        this.$axios({
          method: 'post',
          url: 'api/shop/city/selectList'
        }).then(res => {
          this.cityList = res.data.obj;
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
