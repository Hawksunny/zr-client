<template>
  <div id="main"></div>
</template>

<script>
  // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
  import * as echarts from 'echarts/core';
  // 引入柱状图图表，图表后缀都为 Chart
  import {
    BarChart
  } from 'echarts/charts';
  // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
  } from 'echarts/components';
  // 标签自动布局，全局过渡动画等特性
  import {
    LabelLayout,
    UniversalTransition
  } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import {
    CanvasRenderer
  } from 'echarts/renderers';
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
    var myChart = echarts.init(document.getElementById("main"));
    let option = {
      title: {
        text: '各车辆租赁次数统计'
      },
      tooltip: {},
      xAxis: {
        data:data1,
      },
      yAxis: {},
      series: [
        {
        name: '租赁量',
        type: 'bar',
        data: data2,
        },
      ],
    };
    var countNumList = this.$store.state.carNumCountList
    for(let i=0;i<countNumList.length;i++){
      console.info(countNumList[i])
      data1.unshift(countNumList[i].carname);
      data2.unshift(countNumList[i].num)
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
