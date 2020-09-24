<template>
    <div class="navigationbar">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
            background-color="#20222A"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
            <template v-for="(item,index) in menuchildData">
            <el-submenu :index="item.path" v-if="item.children" :key="index">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
                </template>
                <el-menu-item-group>
                <template v-for="(childitem,childindex) in item.children">
                    <el-submenu v-if="childitem.children" :index="childitem.path"  :key="childindex">
                        <template slot="title">
                            <span style="padding:20px">{{childitem.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <template v-for="(sonitem,sonindex) in childitem.children">
                            <el-menu-item :key="sonindex" :index="sonitem.path"><span  style="padding:20px">{{sonitem.name}}</span></el-menu-item>
                            </template>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item  v-else :key="childindex" :index="childitem.path">{{childitem.name}}</el-menu-item>
                </template>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key="index">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
            </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        menuData: {
            type: Array,
            default(){
                return []
            }
        }
    },
    mounted () {

    },
    watch: {
        '$route': 'getPath'
    },
    data(){
        return {
            menuchildData: this.menuData,
        }
    },
    methods: {
        getPath(to){
           let flag = false;//判断是否页面中已经存在该路由下的tab页
           //options记录当前页面中已经存在的tab页
           for( let option of this.openTab) {
               //用名称匹配，如果存在即将对应的tab页设置为active显示桌面前端
               if(option.name === to.name) {
                   flag = true;
                   this.$store.commit('set_active_index',to.path)
               }
           }
           //如果不存在，则新增tab页，再将新增的tab页设置为active显示在桌面前端
           if(!flag) {
               this.$store.commit('add_tabs',{path: to.path,name: to.name});
               this.$store.commit('set_active_index',to.path)
           }
        },
        handleOpen(key, keyPath){
            console.log(key, keyPath);
        },
        handleClose(key, keyPath){
            console.log(key, keyPath);
        }
    },
    computed: {
        ...mapState({
            openTab: state => state.openTab,
            activeIndex: state => state.activeIndex
        })
    }
}
</script>

<style scoped>
    .el-menu-vertical-demo{
        border: 0;
    }
    .el-submenu .el-menu-item{
        padding: 0 60px 0 60px!important;
    }
</style>