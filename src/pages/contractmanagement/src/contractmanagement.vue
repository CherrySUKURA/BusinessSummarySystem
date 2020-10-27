<template>
    <div class="contractmanagement">
        <!-- 表单查询 -->
        <div class="seachBtn">
            <el-form label-position="right" label-width="80px" :inline="true" :model="formInline">
                <el-row :gutter = "24">
                    <el-col :span="6">
                        <el-form-item label="审批人">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="审批人">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="活动区域">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询合同</el-button>
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
                <el-table-column prop="contractBelongNo" :show-overflow-tooltip="true" label="合同归属" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="entryTime" :show-overflow-tooltip="true" label="入账时间" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="estimatedContractAmount" :show-overflow-tooltip="true" label="收入总金额(元)" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="outsourcingCostEstimation" :show-overflow-tooltip="true" label="第三方费用" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="incomeSourceId" :show-overflow-tooltip="true" label="收入性质" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="合同生成时间" width="140" align="center">
                </el-table-column>
                <el-table-column prop="checkStatus" :show-overflow-tooltip="true" label="状态" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === '已完结' ? 'primary' : 'success'" disable-transitions>{{scope.row.status}}</el-tag>
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
    import { queryContract } from '@/api/index.js'
    export default {
        name: 'contractmanagement',
        components: {
            addPopup
        },
        created(){
            this.RequestHttpTableData()
        },
        data() {
            return {
                formInline: {  //双向绑定表单
                    user: '',
                    region: ''
                },
                dialogVisible: false, //是否打开弹出层
                tableDataParam: {
                    pageNo: 1,//默认第一页,
                    pageSize: 15
                },
                total: 0,
                tableData: []   //表格信息
            }
        },
        methods: {
            RequestHttpTableData() {
                queryContract(this.tableDataParam).then( res => {
                    this.tableData = res.data
                    this.total = res.data_total
                })
            },
            //打开弹出框
            open(title,rowData = null){
                    this.$refs.popup.open(title,rowData)
            },
            //查询按钮回调
            onSubmit() {
                console.log('submit!');
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
                console.log(rowData)
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