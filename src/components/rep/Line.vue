<template>
  <div id ="main"></div>
</template>

<script>
  import * as echarts from 'echarts';

 export default {
   //注册必须的组件
   created() {
   echarts.use([
     TitleComponent,
     TooltipComponent,
     GridComponent,
     DatasetComponent,
     TransformComponent,
     BarChart,
     LabelLayout,
     UniversalTransition,
     CanvasRenderer
   ]);
 },
 mounted() {

    let data1 = []
    let data2 = []
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    let option;

    option = {
      
      xAxis: {
        type: 'category',
        data: data1,
        },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data2,

          type: 'line'
        }
      ]
    };

    option && myChart.setOption(option);
   var simpleList = this.$store.state.simpleOrderList
   for(let i =simpleList.length-1 ;i>=0;i--){
     console.info(simpleList[i])
     data1.unshift(simpleList[i].orderTime);
     data2.unshift(simpleList[i].total)
   }
   myChart.setOption(option);
   },
   };

</script>

<style>
  #main{
    width:1200px;
    height:450px;
    margin: 50px auto;
  }
</style>
