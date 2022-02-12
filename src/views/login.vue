<script setup>
import { ref, onMounted } from "vue";
import { post } from '../api'
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import md5 from 'js-md5';
var username = ref();
var password = ref();
const router = useRouter();// 路由跳转第一步
async function submit() {
  console.log(username.value)
  let { data } = await post('/api/login', {
      username: username.value,
      password: md5(password.value), 
  });
  if (data.cc === 0) {
    // alert('提交成功！')
    message.success('登录成功');
    // 加入token
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      "username": username.value
    }));
    console.log(router.push);
    if (data.isFirst) {
      // 其他渠道首次登录需要修改用户信息
      router.push('userUpdate');
    } else {
      // 登录到用户首页
      router.push('/home');
    }
  } else {
    message.error(data.message);
    // router.push('/login');
  }
}
function turnToRegister() {
    router.push('/registe');

}

onMounted(()=>{
  });

</script>

<template>
<div class="change-box">
  <div>
    <div class="title">登录</div>
    <label for=""><a-input v-model:value="username" placeholder="用户名称"/></label>
    <label for=""><a-input-password v-model:value="password" placeholder="输入密码"/></label>
    <a-button  type="primary" @click="submit">登录</a-button>
    <div class="detail">
      <i>忘记密码</i>
      <i @click="turnToRegister">注册</i>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.change-box {
  width: 100%;
  height: 100%;
  & > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 240px;
    height: 240px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px #999;
    .title {
      width: 200px;
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
}
button {
  width: 200px;
  height: 40px;
  display: block;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
}
label {
  display: block;
  max-width: 200px;
  text-align: left;
  margin-bottom: 10px;
}
.detail {
  width: 100%;
  display: flex;
  padding: 0 20px;
  font-size: 12px;
  color: #1890ff;
  justify-content: space-between;
  i {
    font-style: normal;
  }
}
</style>
