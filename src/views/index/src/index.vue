<template>
  <div class="index">
    <el-container>
      <el-aside>
        <div class="logo">
          <span>热浪商务汇总系统</span>
        </div>
        <navigartion-bar :menuData="menuData"></navigartion-bar>
      </el-aside>
      <el-container>
        <el-header>
          <sys-header :imgSrc="imgSrc"></sys-header>
        </el-header>
        <el-main>
          <div class="tab_view">
            <crumbs></crumbs>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navigartionBar from '@/components/navigationbar';
import crumbs from '@/components/crumbs';
import sysHeader from '@/components/sysheader';
export default {
  name: 'index',
  components: {
    navigartionBar,
    crumbs,
    sysHeader
  },
  computed: {

  },
  created(){
    
  },
  beforeMount(){
    this.refreshPage() 
    this.menuData = this.$store.state.dynamicRouter
  },
  data(){
    return {
      imgSrc: require("assets/admin.png"),
      menuData: []
    }
  },
  methods: {
    //进入页面时进行tab赋值
    refreshPage(){
      this.$store.commit('delete_tabs_all')
      if(this.$route.path !== '/contractmanagement' && this.$route.path !== '/'){
        this.$store.commit('add_tabs',{path: '/contractmanagement',name: '合同管理'});
        this.$store.commit("add_tabs",{path: this.$route.path,name: this.$route.name});
        this.$store.commit('set_active_index', this.$route.path);
      }else{
        this.$store.commit('add_tabs', {path: '/contractmanagement', name: '合同管理'});
        this.$store.commit('set_active_index', '/contractmanagement');
        this.$router.push('/contractmanagement'); 
      }
    }
  }
}
</script>

<style scoped>
  .index{
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
  }
  .index::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /* background: url("../assets/system_bg.jpg") no-repeat; */
    background: white;
    background-size: cover;
    /* filter:blur(8px); */
    z-index: -1;
  }
  .el-header {
    height: 60px;
    background-color: rgba(255,255,255,1);
    color: #333;
  }
  .el-aside {
    height: 100vh;
    background: #20222A;
  }
  .el-main {
    height: calc(100vh - 60px);
    background-color:  #f2f2f2;
    padding: 15px;
  } 
  .logo{
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #20222A;
    color: rgba(255,255,255,.8);
  }
  .tab_view{
    padding: 10px;
    box-sizing: border-box;
    background: white;
    min-height: 100%;
  }
</style>