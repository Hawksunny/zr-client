<template>
	<div>
		<!--查询条件-->
		<el-form :inline="true" :model="queryForm" style="text-align: left;">
			<el-form-item label="城市名称">
				<el-input v-model="queryForm.name" placeholder="请输入城市名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="primary" @click="openAdd" plain>新增</el-button>
			</el-form-item>
		</el-form>
		<!--数据列表-->
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="provinceId" label="省份" width='150px'>
				!<template slot-scope="scope">
					<span v-if="scope.row.provinceId == 1">北京</span>
					<span v-if="scope.row.provinceId == 2">安徽</span>
					<span v-if="scope.row.provinceId == 3">福建</span>
					<span v-if="scope.row.provinceId == 4">甘肃</span>
					<span v-if="scope.row.provinceId == 5">广东</span>
					<span v-if="scope.row.provinceId == 6">广西</span>
					<span v-if="scope.row.provinceId == 7">贵州</span>
					<span v-if="scope.row.provinceId == 8">海南</span>
					<span v-if="scope.row.provinceId == 9">河北</span>
					<span v-if="scope.row.provinceId == 10">河南</span>
					<span v-if="scope.row.provinceId == 11">黑龙江</span>
					<span v-if="scope.row.provinceId == 12">湖北</span>
					<span v-if="scope.row.provinceId == 13">湖南</span>
					<span v-if="scope.row.provinceId == 14">吉林</span>
					<span v-if="scope.row.provinceId == 15">江苏</span>
					<span v-if="scope.row.provinceId == 16">江西</span>
					<span v-if="scope.row.provinceId == 17">辽宁</span>
					<span v-if="scope.row.provinceId == 18">内蒙古</span>
					<span v-if="scope.row.provinceId == 19">宁夏</span>
					<span v-if="scope.row.provinceId == 20">青海</span>
					<span v-if="scope.row.provinceId == 21">山东</span>
					<span v-if="scope.row.provinceId == 22">山西</span>
					<span v-if="scope.row.provinceId == 23">陕西</span>
					<span v-if="scope.row.provinceId == 24">上海</span>
					<span v-if="scope.row.provinceId == 25">四川</span>
					<span v-if="scope.row.provinceId == 26">天津</span>
					<span v-if="scope.row.provinceId == 27">西藏</span>
					<span v-if="scope.row.provinceId == 28">新疆</span>
					<span v-if="scope.row.provinceId == 29">云南</span>
					<span v-if="scope.row.provinceId == 30">浙江</span>
					<span v-if="scope.row.provinceId == 31">重庆</span>
					<span v-if="scope.row.provinceId == 32">香港</span>
					<span v-if="scope.row.provinceId == 33">澳门</span>
					<span v-if="scope.row.provinceId == 34">台湾</span>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="城市" width='200px'>
			</el-table-column>
			<el-table-column prop="createId" label="新增人员">
			</el-table-column>
			<el-table-column prop="createTime" label="新增时间">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width='140px'>
				<template slot-scope="scope">
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
			<el-form :model="form" :rules="rules" ref="form" label-width="60px">
				<el-form-item label="省份" prop="provinceId">
					<el-select v-model="form.provinceId" placeholder="请选择" @change="$forceUpdate()">
						<el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="城市" prop="name">
					<el-input v-model="form.name" clearable></el-input>
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
		name: 'City',
		data() {
			return {
				//查询条件对象
				queryForm: {
					cityName: '',
					pageNum: 1,
					pageSize: 10
				},
				//数据表格对象
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
						message: '请输入城市名',
						trigger: 'blur'
					}],
					provinceId: [{
						required: true,
						message: '请选择省份',
						trigger: 'change'
					}],
				},
				//所有省份
				provinceList: [],
				//标识新增还是修改
				dialogType: 'add',
			}
		},
		methods: {
			//查询数据
			query() {
				this.$axios({
					method: 'post',
					url: 'api/shop/city/list',
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
				//获取所有省份数组
				this.queryProvinceList();
				//清除表单校验结果
				this.$nextTick(function() {
					this.$refs['form'].clearValidate();
				})
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
				//获取所有省份数组
				this.queryProvinceList();
				//对列表对象进行克隆，解决双向绑定问题
				this.form = Object.assign({}, row);
				//清除表单校验结果
				this.$nextTick(function() {
					this.$refs['form'].clearValidate();
				})

				this.form.createTime = '';
				this.form.modifyTime = '';
			},
			//更改状态
			change(row) {
				console.info(row);
			},
			submitForm() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if (this.dialogType == 'add') {
							this.$axios({
								method: 'post',
								url: "api/shop/city/add",
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
								url: "api/shop/city/edit",
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
				})
			},
			del(row) {
				this.$axios({
					method: 'get',
					url: "api/shop/city/del/" + row.id
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
					url: "api/shop/province/selectList"
				}).then(res => {
					this.provinceList = res.data.obj;
				}).catch(err => {
					console.info(err)
				});
			},
			created() {
				//初始化页面时进行页面查询
				this.query();
			},
		},
	}
</script>

<style>
	.el-select {
		width: 100%;
	}
</style>
