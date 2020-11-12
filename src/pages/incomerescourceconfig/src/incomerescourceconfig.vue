<template>
    <div class="incomerescourceconfig">
        <div class="incomerescourceconfigTable">
            <div class="btn">
                <el-button @click="openChildPopup('新增比例')">新增收入性质</el-button>
            </div>
            <el-table :data="tableData" :header-cell-style="{backgroundColor:'#20222A',color:'#fff'}" style="width: 100%;">
                <el-table-column prop="incomeSourceDesc" label="收入性质"></el-table-column>
                <el-table-column fixed="right" width="145" label="操作" align="center">
                    <template slot-scope="scope" >
                        <el-button @click="openChildPopup('编辑收入性质',scope.row)" type="warning" size="small">编辑</el-button>
                        <el-button @click="delData(scope.row)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <addIncomereScourceConfig ref="addContractConfig"></addIncomereScourceConfig>
    </div>
</template>

<script>
import { income_source } from '@/api/contractmanagement.js'
import { deleteIncomeById } from '@/api/incomerescourceconfig.js'
import addIncomereScourceConfig from '@/components/addincomerescourceconfig'
export default {
    name: 'incomerescourceconfig',
    components:{
        addIncomereScourceConfig
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
            income_source({}).then( res => {
                this.tableData = res.data
            })
        },
        openChildPopup(title,data = null){
            if(data == null){
                this.$refs.addContractConfig.open(title,{
                    id: '',
                    incomeSourceDesc: ""
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
                deleteIncomeById({id: rowData.id}).then( () => {
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
.incomerescourceconfig{
    padding: 20px 40px;
}
.btn{
    float:right;
    margin: 10px 0;
}
</style>