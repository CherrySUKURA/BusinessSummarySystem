<template>
    <div class="reviewpopup">
        <el-dialog title="审核信息" append-to-body :visible.sync="visible" width="30%">
            <div class="info">
                <p v-html="info"></p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close()">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {getCheckDescInfo} from '@/api/index.js'
export default {
    name: 'reviewpopup',
    data(){
        return {
            visible: false,
            info: '暂无信息'
        }
    },
    methods: {
        open(e){
            getCheckDescInfo({ contractCustomNumber: e}).then( res => {
                if(res.data.checkDesc != null){
                    this.info = res.data.checkDesc
                }
                this.visible = true
            })
        },
        close(){
            this.visible = false;
        }
    }
}
</script>

<style scoped>
    .info{
        height: 400px;
        padding: 20px;
        overflow-y: auto;
    }
    .info p{
        font-size: 16px;
        line-height: 50px;
    }
    *::-webkit-scrollbar {
        /*滚动条整体样式*/
        width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    *::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
        /* border-radius   : 10px; */
        background-color: rgba(0, 0, 0, 0.1);
        /* background-image: -webkit-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
        ); */
    }
    *::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background   : #ededed;
        /* border-radius: 10px; */
    }
</style>