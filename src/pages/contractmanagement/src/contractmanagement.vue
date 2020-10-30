<template>
    <div class="contractmanagement">
        <!-- 表单查询 -->
        <div class="seachBtn">
            <el-form label-position="right" label-width="100px" :inline="true" :model="tableDataParam">
                <el-row :gutter = "24">
                    <el-col :span="6">
                        <el-form-item label="合同编号">
                            <el-input v-model="tableDataParam.contractCustomNumber" placeholder="合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合同名称">
                            <el-input v-model="tableDataParam.contractName" placeholder="合同名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合同生成时间">
                            <el-date-picker v-model="tableDataParam.createTime" type="date" value-format="timestamp" placeholder="合同生成时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="审核状态">
                            <el-select v-model="tableDataParam.checkStatus" placeholder="审核状态">
                                <el-option v-for="(item,index) in audit" :key="index" :label="item.checkDesc" :value="item.checkStatus"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="合同状态">
                            <el-select v-model="tableDataParam.contractStatus" placeholder="合同状态">
                                <el-option v-for="(item,index) in contract" :key="index" :label="item.contractStatusDesc" :value="item.contractStatus"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit()">查询合同</el-button>
                            <el-button type="primary" @click="reset()">重置查询</el-button>
                            <el-button type="primary" @click="open('新建合同',)">新建合同</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 合同表格 -->
        <div class="contractTableList">
            <el-table ref="filterTable" :data="tableData" height="500px" style="width: 100%;">
                <el-table-column prop="contractCustomNumber" :show-overflow-tooltip="true" label="合同编号" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="contractName" :show-overflow-tooltip="true" label="合同名称" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="customerName" :show-overflow-tooltip="true" label="客户名称" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="projectTeamName" :show-overflow-tooltip="true" label="合同归属" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="entryTime" :show-overflow-tooltip="true" label="入账时间" :formatter="getTimeStr" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="estimatedContractAmount" :show-overflow-tooltip="true" label="收入总金额(元)" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="outsourcingCostEstimation" :show-overflow-tooltip="true" label="第三方费用" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="incomeSourceDesc" :show-overflow-tooltip="true" label="收入性质" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="合同生成时间" :formatter="getTimeStr" width="140" align="center">
                </el-table-column>
                <el-table-column prop="contractStatusDesc" :show-overflow-tooltip="true" label="状态" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.contractStatusDesc === '已完结' ? 'primary' : 'success'" disable-transitions>{{scope.row.contractStatusDesc}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="260" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="open('查看合同',scope.row)" size="small">查看</el-button>
                        <el-button type="warning" @click="open('编辑合同',scope.row)" size="small">编辑</el-button>
                        <el-button type="danger" @click="delClick(scope.row)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableDataParam.page_no" :page-sizes="[15, 20, 25, 30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <add-popup ref="popup"></add-popup>
    </div>
</template>

<script>
    import addPopup from '@/components/addpopup';
    import { queryContract,deleteContract,getCheckInfo,getContractStatusInfo } from '@/api/index.js'
    export default {
        name: 'contractmanagement',
        components: {
            addPopup
        },
        created(){
            this.RequestHttpauditStatus();
            this.RequestHttpContractStatus();
            this.RequestHttpTableData();
        },
        data() {
            return {
                audit: [],
                contract: [],
                dialogVisible: false, //是否打开弹出层
                tableDataParam: {
                    contractCustomNumber: '',
                    contractName: '',
                    checkStatus:'',
                    contractStatus:'',
                    createTime:'',
                    pageNo: 1,//默认第一页,
                    pageSize: 15
                },
                total: 0,
                tableData: []   //表格信息
            }
        },
        methods: {
            RequestHttpauditStatus(){
                getCheckInfo({}).then( res => {
                    this.audit = res.data
                })
            },
            RequestHttpContractStatus() {
                getContractStatusInfo({}).then( res => {
                    this.contract = res.data
                })
            },
            RequestHttpTableData() {
                queryContract(this.tableDataParam).then( res => {
                    this.tableData = res.data
                    this.total = res.data_total
                })
            },
            getTimeStr(row,colum,cellValue){
                let now = new Date(cellValue),
                y = now.getFullYear(),
                m = ("0" + (now.getMonth() + 1)).slice(-2),
                d = ("0" + now.getDate()).slice(-2);
                return y + "-" + m + "-" + d + " " ;
            },
            //打开弹出框
            open(title,rowData = null){
                this.$refs.popup.open(title,rowData)
            },
            //查询按钮回调
            onSubmit() {
                this.RequestHttpTableData()
            },
            reset(){
                this.tableDataParam = {
                    contractCustomNumber: '',
                    contractName: '',
                    checkStatus:'',
                    contractStatus:'',
                    createTime:'',
                    pageNo: 1,//默认第一页,
                    pageSize: 15
                }
                this.RequestHttpTableData()
            },
            //查看按钮回调
            // seeClick(title,rowData){
            //     this.$refs.popup.open(title,rowData)
            // },
            //编辑按钮回调
            // editorClick(title,rowData){
            //     this.$refs.popup.open(title,rowData)
            // },
            //删除按钮回调
            delClick(rowData){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteContract({contractCustomNumber: rowData.contractCustomNumber}).then( () => {
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
                
            },
            //选择每页多少条回调
            handleSizeChange(val) {
                this.tableDataParam.page_size = val
                this.RequestHttpTableData()
            },
            //改变页数回调
            handleCurrentChange(val) {
                this.tableDataParam.page_no = val
                this.RequestHttpTableData()
            }
        }
    }
</script>

<style scoped>
.seachBtn{
    padding: 20px;
    box-sizing: border-box;
}
.el-form-item{
    display: flex;
}
.el-form-item>>>.el-form-item__content{
    flex: 1;
}
.el-pagination{
    margin: 50px 0;
    text-align: center;
}
.el-select,.el-input{
    width: 100%;
}
</style>