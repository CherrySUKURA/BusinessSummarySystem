<template>
    <div class="addpopup">
        <el-dialog :title="delogTitle" :visible.sync="dialogVisible" width="56%" :before-close="handleClose">
            <el-form :model="data" ref="formName" :rules="rules" label-position="right" label-width="110px" :inline="true">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="合同编号" prop="contractCustomNumber">
                            <el-input  :disabled = "dis" v-model="data.contractCustomNumber" placeholder="合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同名称" prop="contractName">
                            <el-input  :disabled = "dis" v-model="data.contractName" placeholder="合同名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称" prop="customerName">
                            <el-input  :disabled = "dis" v-model="data.customerName" placeholder="客户名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="客户类型" prop="clientType">
                            <el-input  disabled v-model="data.clientType" placeholder="客户类型"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同归属" prop="contractBelongNo">
                            <el-select  :disabled = "dis" v-model="data.contractBelongNo">
                                <el-option v-for="(item,index) in contract_belong" :key="index" :label="item.projectTeamName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="甲方签订时间" prop="ownerSignedTime">
                            <el-date-picker  :disabled = "dis" v-model="data.ownerSignedTime" type="date" value-format="timestamp" placeholder="甲方签订时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="乙方签订时间" prop="secondPartySignedTime">
                            <el-date-picker  :disabled = "dis" v-model="data.secondPartySignedTime" type="date" value-format="timestamp" placeholder="乙方签订时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入账时间" prop="entryTime">
                            <el-date-picker  :disabled = "dis" v-model="data.entryTime" type="date" value-format="timestamp" placeholder="入账时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入账金额" prop="estimatedContractAmount">
                            <el-input  :disabled = "dis" v-model="data.estimatedContractAmount" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="入账金额"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="第三方费用" prop="outsourcingCostEstimation">
                            <el-input  :disabled = "dis" v-model="data.outsourcingCostEstimation" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="第三方费用"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收入性质" prop="incomeSourceId">
                            <el-select  :disabled = "dis" v-model="data.incomeSourceId">
                                <el-option v-for="(item,index) in income_source_group" :key="index" :label="item.incomeSourceDesc" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据记录时间" prop="createTime">
                            <el-date-picker :disabled = "dis" v-model="data.createTime" type="date" value-format="timestamp" placeholder="数据记录时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="子合同管理">
                              <el-button :disabled="false" type="info" @click="dialogChildVisible('formName',data,delogTitle)">管理</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 组员 -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('formName',0)">提 交</el-button>
                <el-button type="primary" @click="submitForm('formName',1)">提交并审核</el-button>
                <el-button @click="cancel('formName')">取 消</el-button>
            </span>
            <add-child-popup ref="childpopup" @byValue="byValue"></add-child-popup>
        </el-dialog>
    </div>
</template>
<script>
import addChildPopup from '@/components/addchildpopup'
import { getContractNo,getCompany,projectTeam,income_source,addContract } from '@/api/index.js';
export default {
    name: 'addpopup',
    components: {
        addChildPopup
    },
    data(){
        return {
            username: "admin",
            from: "shanghai",
            dialogVisible: false,
            dis: false,
            delogTitle: "",
            data: {},
            fatherData: {},
            contract_belong: [],
            income_source_group: [],
            rules: {
                contractCustomNumber: [
                    { required: true,validator: this.contracNoRuler,trigger: 'blur' },
                ],
                contractName: [
                    { required: true,message: '请输入合同名称',trigger: 'blur' },
                ],
                customerName: [
                    { required: true,validator: this.customerNameRuler,trigger: 'blur' },
                ],
                contractBelongNo: [
                    { required: true,message: '请选择合同归属',trigger: 'change' }
                ],
                ownerSignedTime: [
                    { type: 'date', required: true,message: '请选择日期',trigger: 'blur'}
                ],
                secondPartySignedTime: [
                    { type: 'date', required: true,message: '请选择日期',trigger: 'blur'}
                ],
                entryTime: [
                    { type: 'date', required: true,message: '请选择日期',trigger: 'blur' }
                ],
                estimatedContractAmount: [
                    { required: true, message: '请输入入账金额',trigger: 'blur' }
                ],
                outsourcingCostEstimation: [
                    { required: true, message: '请输入第三方费用',trigger: 'blur'}
                ],
                incomeSourceId: [
                    {  required: true, message: '请选择收入性质',trigger: 'change' }
                ],
                createTime: [
                    { type: 'date', required: true, message: '请选择日期',trigger: 'blur'}
                ]
            },
        }
    },
    methods:{
        //表单自定义验证
        async contracNoRuler(rule,value,callback){
            if(this.delogTitle == '查看合同'){
                callback()
            }
            if(this.delogTitle == '编辑合同'){
                if(this.fatherData.contractCustomNumber == this.data.contractCustomNumber){
                    callback()
                }else{
                    if( value == ""){
                        callback(new Error('合同编号不能为空'));
                    }else{
                        let res = await this.RequestContraNo(value);
                        if(!res.data.checkOut){
                            callback(new Error('合同编号已存在'));
                        }else{
                            callback();
                        }
                    }
                }
            }
            if(this.delogTitle == '新建合同'){
                if( value == ""){
                    callback(new Error('合同编号不能为空'));
                }else{
                    let res = await this.RequestContraNo(value);
                    if(!res.data.checkOut){
                        callback(new Error('合同编号已存在'));
                    }else{
                        callback();
                    }
                }
            }
            
        },
        async customerNameRuler(rule,value,callback){
            if(this.delogTitle == '新建合同'){
                if(value == ""){
                    this.data.clientType = "";
                    callback(new Error('客户名称不能为空'));
                }else{
                    let res = await this.RequestCustomerName(value);
                    if(res.data.checkOut){
                        this.data.clientType = "老客户";
                    }else{
                        this.data.clientType = "新客户";
                    }
                }
            }else{
                callback()
            }
        },
        RequestContraNo(value){
            return getContractNo({contractCustomNumber: value});
        },
        RequestCustomerName(value){
            return getCompany({customerName: value});
        },
        RequestHttp(){
            projectTeam({}).then( res => {
                this.contract_belong = res.data;
            })
            income_source({}).then( res => {
                this.income_source_group = res.data;
            })
        },
        byValue(e){
            this.data.listNew = e;
            if(this.data.listNew.length !== 0){
                this.$message({
                    message: '成功提交',
                    type: 'success'
                })
            }
        },
        //打开弹出框
        open(Title,data){
            this.RequestHttp();
            this.dialogVisible = true;
            this.delogTitle = Title;
            if(data != null){
                this.fatherData = data
                this.data = JSON.parse(JSON.stringify(data));
            }else{
                this.data = {
                    contractCustomNumber: '',
                    contractName: '',
                    customerName: '',
                    clientType: '',
                    contractBelongNo: '',
                    ownerSignedTime: '',
                    secondPartySignedTime: '',
                    entryTime: '',
                    estimatedContractAmount: "0",
                    outsourcingCostEstimation: '0',
                    incomeSourceId: '',
                    createTime: '',
                    checkStatus: '',
                    listNew: [
                        
                    ]
                }
            }
            if(Title == "查看合同"){
                this.dis = true;
            }else{
                this.dis = false;
            }
            projectTeam({})
        },
        //关闭回调
        close(name){
            this.dialogVisible = false;
            this.$refs[name].resetFields();
        },
        //弹出框取消回调
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then( () => {
                done();
            })
            .catch( () => {});
        },
        //提交表单
        submitForm(name,value){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.data.listNew.length !== 0){
                        this.data.checkStatus = value
                        addContract(JSON.parse(JSON.stringify(this.data))).then(() => {
                            this.$message('请求成功')
                            this.close(name);
                            this.$parent.RequestHttpTableData()
                        })
                    }else{
                        this.$message({
                            message: '请先填写子合同信息',
                            type: 'warning'
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        //提交并审核表单
        submitReview(name){
            this.close(name);
        },
        //取消回调
        cancel(name){
            this.close(name);
        },
        //打开子弹出框
        dialogChildVisible(formName,data,title){
            console.log(title)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$refs.childpopup.open(data,title);
                } else {
                    return false;
                }
            });

        }
    }
}
</script>
<style scoped>
    .el-form-item{
        display: flex!important;
    }
    .el-form-item>>>.el-form-item__content{
        flex: 1;
    }
    .el-select,.el-input {
        width: 100%;
    }
    .el-checkbox{
        margin-left: 0!important;
    }
</style>