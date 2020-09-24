<template>
    <div class="crumbs">
        <div class="template_tabs">
            <el-tabs
                v-model="activeIndex"
                type="card"
                closable
                v-if="openTab.length"
                @tab-click="tabClick"
                @tab-remove="removeTab">
                <el-tab-pane
                v-for="(item) in openTab"
                :key="item.name"
                :label="item.name"
                :name="item.path"
                >
                    
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default { 
    name: "crumbs",
    computed:{
        ...mapState({
            openTab: state => state.openTab
        }),
        activeIndex: {
            get(){
                return this.$store.state.activeIndex
            },
            set(newVal){
                this.$store.state.activeIndex = newVal
            }
        }
    },
    data(){
        return {

        }
    },
    methods: {
        tabClick(){
            let path = this.activeIndex;
            this.$router.push({path:path})
        },
        removeTab(targerName){
            //首页不可删除  
            if (targerName == '/contractmanagement'){
                return
            }
            //openTab
            this.$store.commit('delete_tabs',targerName);

            //还同时需要处理一种情况需要移除的页面为当前激活的页面时，将上一个tab页作为激活tab
            if(this.activeIndex === targerName){
                //设置当前激活的路由
                if(this.openTab && this.openTab.length >= 1) {
                    this.$store.commit('set_active_index',this.openTab[this.openTab.length - 1].path);
                    this.$router.push({path: this.activeIndex});
                }else{
                    this.$router.push({path: '/contractmanagement'});
                }
            }
        }
    }
}
</script>

<style scoped>

</style>