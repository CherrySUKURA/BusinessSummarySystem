<template>
    <div class="bsinesstypeconfig content">
        <div class="bsinesstypeconfigTable">
            <el-table :data="tableData" :header-cell-style="{backgroundColor:'#20222A',color:'#fff'}" style="width: 100%;">
                <el-table-column prop="typeDesc" width="150" label="职位"></el-table-column>
                <el-table-column prop="proportion" label="分成"></el-table-column>
                <el-table-column fixed="right" width="100" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="openChildPopup('编辑商务类型',scope.row)" type="warning" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <addBusinessTypeConfig ref="addBusinessTypeConfig"></addBusinessTypeConfig>
    </div>
</template>

<script>
import { getAllBusinessType } from '@/api/contractmanagement.js'
import addBusinessTypeConfig from '@/components/addbusinesstypeconfig'
export default {
    name: 'businesstypeconfig',
    components:{
        addBusinessTypeConfig
    },
    data(){
        return {
            tableData:[],
        }
    },
    beforeMount(){
        this.RequestHttpTableData()
    },
    methods: {
        RequestHttpTableData(){
            getAllBusinessType({}).then( res => {
                this.tableData = res.data
            })
        },
        openChildPopup(title,data){
            this.$refs.addBusinessTypeConfig.open(title,data)
        }
    }
}
</script>

<style scoped>
.content{
    padding: 20px 40px;
}
</style>