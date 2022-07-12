<template>
	<div>
		<!--查询条件-->
		<el-form :inline="true" :model="queryForm" style="text-align: left;">
			<el-form-item label="城市名称">
				<el-input v-model="queryForm.name" placeholder="请输入城市名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="primary" @click="openAdd" plain >新增</el-button>
			</el-form-item>
		</el-form>
		<!--数据列表-->
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="id" label="城市ID">
			</el-table-column>
			<el-table-column prop="provinceId" label="省份">
				<template slot-scope="scope">
					<span v-if="scope.row.provinceId == 11">北京市</span>
					<span v-if="scope.row.provinceId == 22">吉林省</span>
					<span v-if="scope.row.provinceId == 34">安徽省</span>
					<span v-if="scope.row.provinceId == 21">辽宁省</span>
					<span v-if="scope.row.provinceId == 35">福建省</span>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="城市">
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
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination v-show="total > 0" background @size-change="query" @current-change="query"
		:current-page.sync="queryForm.PageNum" page-size.sync="queryForm.Pagesize"
		layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<!--新增/编辑页面-->
		<el-dialog :title="title" :visible.sync="show" width="500px">
			<span>这是一段信息</span>
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
				show: false
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
					} else {
						this.$message.error(res.data.msg);
					}
					this.loading = false;
				}).catch(err => {
					console.info(err)
				});
			}
		},
		openAdd(){
			this.title = "新增";
			this.show = true;
		},
		created() {
			//初始化页面时进行页面查询
			this.query();
		}
	}
</script>

<style>
</style>
