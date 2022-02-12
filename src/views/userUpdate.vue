<script setup>
import { ref, onMounted } from "vue";
import { post, get } from '../api'
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import md5 from 'js-md5';
var username = ref();
var passwordOld = ref();
var passwordNew = ref();
var phone = ref();
var email = ref();
var updateId = '';
const router = useRouter();// 路由跳转第一步
async function submit() {
  // 验证是否输入的密码一致
  if (passwordOld.value == passwordNew.value) {
    message.error('两次密码必须不同');
    return;
  }
  let { data } = await post('/api/user/update', {
      id: updateId,
      username: username.value,
      passwordOld: md5(passwordOld.value),
      passwordNew: md5(passwordNew.value),
      phone: phone.value,
      email: email.value,
  });
  if (data.cc === 0) {
    message.success('修改成功');
    // 跳转到登录页
    router.push('/login');
  } else {
    message.error(data.message);
  }
}

async function queryUser() {
  console.log(JSON.parse(localStorage.getItem('user')));
   let un = JSON.parse(localStorage.getItem('user')).username;
   username.value = un;
    let {data} = await post('/api/user/query', {
      username: un,
    });
    if (data.cc === 0) {
      phone.value = data.phone;
      email.value = data.email;
      updateId = data._id;
    }
}

onMounted(()=>{
  queryUser();
  });

</script>

<template>

<div class="change-box">
  <a-page-header
    class="pageTop"
    title="修改个人信息"
    sub-title=""
    @back="() => $router.go(-1)"
    >
    </a-page-header>
  <div class="change-box-content">
    <label for=""><a-input v-model:value="username" placeholder="用户名称"/></label>
    <label for=""><a-input v-model:value="phone" placeholder="手机号码"/></label>
    <label for=""><a-input v-model:value="email" placeholder="邮箱"/></label>
    <label for=""><a-input-password v-model:value="passwordOld" placeholder="请输入旧密码"/></label>
    <label for=""><a-input-password v-model:value="passwordNew" placeholder="请输入新密码"/></label>
    <a-button type="primary" class="button" @click="submit">确定</a-button>
  </div>
</div>
</template>

<style scoped lang="scss">
.pageTop {
  position: absoulte;
  width: 100%;
  background: #fff;
  z-index: 10;
  top: 0;
  left: 0;
}
.change-box {
  width: 100%;
  height: 100%;
  .change-box-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 240px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
  }
}
button {
  width: 200px;
  height: 40px;
  display: block;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
label {
  display: block;
  max-width: 200px;
  text-align: left;
  margin-bottom: 10px;
}
</style>
