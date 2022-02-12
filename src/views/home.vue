<script setup>
import { ref, onMounted, reactive } from "vue";
import { post } from "../api";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { MenuOutlined } from '@ant-design/icons-vue';
const router = useRouter();// 路由跳转第一步
const visible = ref(false);
const selectedKeys = ref(['1']); // 选择第几个菜单
const openKeys = ref(['sub1']); // 目前打开第几个菜单
const menuList = ref([
  {
    key: 1,
    name: '用户管理',
    route:'#/home',
    child: [
      {
        key: 11,
        name: '用户管理',
        route:'home',
      },
      {
        key: 12,
        name: '角色管理',
        route:'home',
      },
      {
        key: 13,
        name: '菜单管理',
        route:'home',
      }
    ]
  }, {
    key: 2,
    name: 'PDF转TXT',
    child: [{
      key: 21,
      name: '设置次数',
      route:'setTimes',
    },{
      key: 22,
      name: 'PDF转TXT',
      route:'/',
    }]
  }, {
    key: 3,
    name: '微信时间轴',
    child: [{
      key: 31,
      name: '时间轴',
      route: 'timeLineEdit',
    }]
  }
]);
const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};
const handleClick =  e => {
      console.log('click', e);
      if (e.item.route) {
        router.push(e.item.route)
      }
    };
const titleClick = (e) => {
    console.log('titleClick', e);
  };
onMounted(() => {});
</script>

<template>
  <div class="change-box">
    <a-page-header class="pageTop" title="首页" sub-title="" @back="showDrawer">
      <template #backIcon>
        <menu-outlined />
      </template>
      <template #extra>
        <a-avatar style="background-color: #009bf5;cursor:pointer;">K</a-avatar>  
      </template>
    </a-page-header>
  </div>

  <a-drawer
    title="菜单"
    :placement="'left'"
    :closable="false"
    :visible="visible"
    width="300px"
    @close="onClose"
  >
    <a-menu
    id="menu"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="inline"
    @click="handleClick"
  >
    <template v-for="(item) in menuList" :key="item.key">
      <a-sub-menu @titleClick="titleClick" v-if="item.child" :key="item.key" :route="item.route">
        <template #title>{{item.name}}</template>
        <a-menu-item v-for="(d) in item.child" :key="d.key" :route="d.route">{{d.name}}</a-menu-item>
      </a-sub-menu>
      <a-menu-item v-if="!item.child" :route="item.route">{{item.name}}</a-menu-item>
    </template>
  </a-menu>
  </a-drawer>
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
