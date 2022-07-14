<template>
  <el-from>
  <div>
    <!-- 下拉菜单 -->
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item name ="1" title="折线统计图" >

      <template>

          <div style="text-align: left;">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            value-format = "yyyy-MM-dd">
          </el-date-picker>
          至

          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            value-format = "yyyy-MM-dd">
          </el-date-picker>

        <el-button type="danger" @click="submitTime()">统计</el-button>
          </div>

         <el-form :model="incomeForm" :inline="true" style="text-align: left;">
           <el-form-item label="总收入" >
            <el-input v-model="incomeForm.totalIncome" :disabled="true" ></el-input>
            </el-form-item>
        </el-form>
      </template>

          <LineEcharts />

      </el-collapse-item>
    </el-collapse>
  </div>
  </el-from>
</template>


<script>
  import LineEcharts from "@/components/Rep/Line.vue"
export default {
  components:{LineEcharts},
  name:'table2',
       data() {

            return {
              activeNames:['1'],
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },

              },
              value1: '',
              value2: '',
              incomeForm :{
                totalIncome: 0
              }

            };
          },

    methods:{
      count: function(){
        this.$axios({
          method:'post',
          url:'api/table/listOrder',
        }).then(res =>{
          if(res.data.success){
            console.info(res)
            this.$store.commit('simpleOrderList',res.data.obj)
          }
        }).catch(err =>{
          console.info(err)
        })
      },
      submitTime(){
        this.$axios({
          method:'post',
          url:'api/table/submitTime',
          data:{
            startTime :this.value1,
            endTime : this.value2
          }
        }).then(res =>{
         if(res.data.success){
           this.count()
         }
        }).catch(err =>{
          console.info(err)
        })
        this.$router.go(0)
        location.reload()
      }
    },
    created() {
      this.count();

var simpleList = this.$store.state.simpleOrderList
   for(let i =simpleList.length-1 ;i>=0;i--){
     this.incomeForm.totalIncome += simpleList[i].total
   }
    }
  };
</script>

<style>
 .incomeClass{
   width: 200px;
   display: inline-block;
 }
</style>
