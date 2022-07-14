<template>
  <el-from>
  <div>
    <!-- 下拉菜单 -->
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item name ="1">
        <template slot="title" trigger="hover">
          月份/数量<i></i>
        </template>
      <template>
          <span class="demonstration"></span>
          <div style="text-align: left;">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            value-format = "yyyy-MM-dd">
          </el-date-picker>
          至
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            value-format = "yyyy-MM-dd">
          </el-date-picker>

        <el-button type="danger" @click="submitTime()">统计</el-button>
          </div>
      </template>
          <EchartsDemo />
      </el-collapse-item>
    </el-collapse>
  </div>
  </el-from>
</template>


<script>
  import EchartsDemo from "@/components/rep/Bar.vue"
export default {
  components:{EchartsDemo},
  name:'table1',
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
            };
          },

    methods:{
      count: function(){
        this.$axios({
          method:'post',
          url:'api/table/countCarNum',
        }).then(res =>{
          if(res.data.success){
            console.info(res)
            this.$store.commit('carNumCountList',res.data.obj)
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
    },
  };
</script>

<style>

</style>
