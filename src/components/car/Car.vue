<template>
	<div>
		<!--查询条件-->
		<el-form :inline="true" :model="queryForm" style="text-align: left;">
			<el-form-item>
				<el-input v-model="queryForm.name" placeholder="车辆名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="primary" @click="openAdd" plain>新增</el-button>
			</el-form-item>
		</el-form>
		<!--数据列表-->
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="名称" width="100px">
			</el-table-column>
			<el-table-column prop="brand" label="品牌" width="80px">
			</el-table-column>
			<el-table-column prop="model" label="型号" width="100px">
			</el-table-column>
			<el-table-column prop="box" label="箱数" width="50px">
			</el-table-column>
			<el-table-column prop="volume" label="排量" width="50px">
			</el-table-column>
			<el-table-column prop="door" label="门数" width="50px">
			</el-table-column>
			<el-table-column prop="seat" label="座数" width="50px">
			</el-table-column>
			<el-table-column prop="gears" label="档位" width="50px">
			</el-table-column>
			<el-table-column prop="auto" label="档位类型" width="80px">
			</el-table-column>
			<el-table-column prop="price" label="价格(元/天)" width="100px">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="50px">
			</el-table-column>
			<el-table-column prop="createId" label="新增人员">
			</el-table-column>
			<el-table-column prop="createTime" label="新增时间" width="160px">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="208px">
				<template slot-scope="scope">
					<el-button size="mini" type="primary">图片</el-button>
					<el-button size="mini" type="warning" @click="openEdit(scope.row)">编辑</el-button>
					<el-popconfirm title="确认删除？" @confirm="del(scope.row)">
						<el-button slot="reference" size="mini" type="danger">删除</el-button>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination v-show="total > 0" background @size-change="query" @current-change="query"
			:current-page.sync="queryForm.pageNum" :page-size.sync="queryForm.pageSize"
			layout="total,sizes,prev, pager, next,jumper" :total="total">
		</el-pagination>
		<!--新增/编辑页面-->
		<el-dialog :title="title" :visible.sync="show" width="500px">
			<el-input type="hidden" :name="dialogType"></el-input>
			<el-form :model="form" :rules="rules" ref="form" label-width="100px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" clearable></el-input>
				</el-form-item>
				<el-form-item label="品牌" prop="brand">
					<el-input v-model="form.brand" clearable></el-input>
				</el-form-item>
				<el-form-item label="型号" prop="model">
					<el-input v-model="form.model" clearable></el-input>
				</el-form-item>
				<el-form-item label="箱数" prop="box">
					<el-input v-model="form.box" clearable></el-input>
				</el-form-item>
				<el-form-item label="排量" prop="volume">
					<el-input v-model="form.volume" clearable></el-input>
				</el-form-item>
				<el-form-item label="门数" prop="door">
					<el-input v-model="form.door" clearable></el-input>
				</el-form-item>
				<el-form-item label="座数" prop="seat">
					<el-input v-model="form.seat" clearable></el-input>
				</el-form-item>
				<el-form-item label="挡位" prop="gears">
					<el-input v-model="form.gears" clearable></el-input>
				</el-form-item>
				<el-form-item label="挡位类型" prop="auto">
					<el-select v-model="form.auto" placeholder="请选择挡位类型">
						<el-option label="手动" value="手动"></el-option>
						<el-option label="一体" value="一体"></el-option>
						<el-option label="自动" value="自动"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="价格(元/天)" prop="price">
					<el-input v-model="form.price" clearable></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-select v-model="form.status" placeholder="请选择状态">
						<el-option label="正常" value="正常"></el-option>
						<el-option label="下架" value="下架"></el-option>
					</el-select>
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
		name: 'Car',
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
				//显示/隐藏
				show: false,
				//初始化表单对象
				form: {},
				//初始化校验对象
				rules: {
					name: [{
						required: true,
						message: '请输入车名',
						trigger: 'blur'
					}],
					brand: [{
						required: true,
						message: '请输入品牌',
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: '请输入型号',
						trigger: 'blur'
					}],
					auto: [{
						required: true,
						message: '请选择挡位类型',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请输入价格',
						trigger: 'blur'
					}],
					status: [{
						required: true,
						message: '请选择状态',
						trigger: 'blur'
					}],
				},
				//标识新增还是修改
				dialogType: 'add',
			}
		},
		methods: {
			//查询数据
			query() {
				this.$axios({
					method: 'post',
					url: 'api/car/car/list',
					data: this.queryForm
				}).then(res => {
					if (res.data.success) {
						this.tableData = res.data.obj;
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
				this.title = "车辆新增";
				//清空表单
				this.form = {};
				//打开对话框
				this.show = true;
				//更改标识为新增
				this.dialogType = 'add';
				//清除表单校验结果
				this.$nextTick(function(){
					this.$refs['form'].clearValidate();
				})
			},
			openEdit(row) {
				//设置对话框标题
				this.title = "编辑车辆";
				//清空表单
				this.form = {};
				//打开对话框
				this.show = true;
				//更改标识为新增
				this.dialogType = 'edit';
				//对列表对象进行克隆，解决双向绑定问题
				this.form = Object.assign({}, row);
				//清除表单校验结果
				this.$nextTick(function(){
					this.$refs['form'].clearValidate();
				})

				this.form.createTime = '';
				this.form.modifyTime = '';
			},
			change(row) {
				console.info(row);
			},
			submitForm() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if (this.dialogType == 'add') {
							this.$axios({
								method: 'post',
								url: "api/car/car/add",
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
								url: "api/car/car/edit",
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
					url: "api/car/car/del/" + row.id
				}).then(res => {
					//刷新页面
					this.query()
				}).catch(err => {
					console.info(err)
				});
			},
		},
		created() {
			//初始化页面时进行页面查询
			this.query();
		}
	}
</script>

<style>
</style>
