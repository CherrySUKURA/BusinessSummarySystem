<template>
    <div class="contractconfig">
        <div class="contractconfigTable">
            <div class="btn">
                <el-button @click="openChildPopup('新增比例')">新增比例</el-button>
            </div>
            <el-table :data="tableData" :header-cell-style="{backgroundColor:'#20222A',color:'#fff'}" style="width: 100%;">
                <el-table-column prop="startMoney" width="180" label="开始金额"></el-table-column>
                <el-table-column prop="endMoney" width="180" label="结束金额"></el-table-column>
                <el-table-column prop="percentage" label="分成比例"></el-table-column>
                <el-table-column fixed="right" width="145" label="操作" align="center">
                    <template slot-scope="scope" >
                        <el-button @click="openChildPopup('编辑比例',scope.row)" type="warning" size="small">编辑</el-button>
                        <el-button @click="delData(scope.row)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <add-contract-config ref="addContractConfig"></add-contract-config>
    </div>
</template>

<script>
import { queryAllReturnMoney,deleteReturnMoneyById } from '@/api/returnmoneyconfig.js'
import addContractConfig from '@/components/addcontractconfig'
export default {
    name: 'contractconfig',
    components:{
        addContractConfig
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
            queryAllReturnMoney({}).then( res => {
                this.tableData = res.data
            })
        },
        openChildPopup(title,data = null){
            if(data == null){
                this.$refs.addContractConfig.open(title,{
                    "id": '',
                    "startMoney": 0,
                    "endMoney": 0,
                    "percentage": 0
                })
            }else{
                this.$refs.addContractConfig.open(title,data)
            }
        },
        delData(rowData){
            this.$confirm('此操作将永久删除该分成比例吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteReturnMoneyById({id: rowData.id}).then( () => {
                    this.RequestHttpTableData()
                }).then( () => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>

<style scoped>
.contractconfig{
    padding: 20px 40px;
}
.btn{
    float:right;
    margin: 10px 0;
}
</style>