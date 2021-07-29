<template>
  <div id="dialog">
    <div class="border">
      <button @click="closeDialog" class="closeImg">X</button>
      <span class="message">添加成功，请前往购物车查看</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  data(){
    return {}
  },
  methods:{
    closeDialog(){
      //给父组件传参
      this.$emit('closeDialog',false)
    }
  }
}
</script>

<style scoped>
#dialog{
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  width: 100%;
  height: 100%;
}
.message{
  text-align: center;
  position: absolute;
  top: 50%;
}
.closeImg{
  width: 20px;
  height: 20px;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
}
.border{
  text-align: center;
  background-color: white;
  border-radius: 20px;
  width: 50%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>