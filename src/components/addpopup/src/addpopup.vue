<template>
    <div class="addpopup">
        <el-dialog :close-on-click-modal="false" :title="delogTitle" :visible.sync="dialogVisible" width="56%">
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
                              <el-button :disabled="false" type="info" @click="dialogChildVisible('formName',delogTitle)">管 理</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="审核信息">
                              <el-button :disabled="false" type="info" @click="dialogReview(data.contractCustomNumber)">审核信息</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 组员 -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="checkaudit" @click="audit('audit',3)">审 核</el-button>
                <el-button type="primary" v-if="checkaudit"  @click="audit('audit',2)">打 回</el-button>
                <el-button type="danger" v-if="checkStop" @click="audit('contractStatus',3)">暂 停</el-button>
                <el-button type="danger" v-if="checkStart" @click="audit('contractStatus',5)">启 动</el-button>
                <el-button type="danger" v-if="checkStop" @click="audit('contractStatus',4)">作 废</el-button>
                <el-button type="primary" v-if="checkStop" @click="audit('contractStatus',2)">结 束</el-button>
                <el-button type="primary" v-if="checkSubmit" @click="submitForm('formName',0)">提 交</el-button>
                <el-button type="primary" v-if="checkSubmit" @click="submitForm('formName',1)">提交并审核</el-button>
                <el-button @click="close()">取 消</el-button>
            </span>
            <add-child-popup ref="childpopup" @byValue="byValue"></add-child-popup>
            <review-popup ref="reviewpopup"></review-popup>
            <el-dialog  append-to-body :close-on-click-modal="false" title="请输入信息" :visible.sync="reviewvisible" width="20%">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入信息" v-model="checkDesc">
                </el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="review(name)">确 定</el-button>
                    <el-button type="primary" @click="none()">取 消</el-button>
                </span>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
import addChildPopup from '@/components/addchildpopup'
import reviewPopup from '@/components/reviewpopup'
import { getContractNo,getCompany,projectTeam,income_source,addContract,checkContract,queryChildContract,updateContractStatus } from '@/api/contractmanagement.js';
export default {
    name: 'addpopup',
    components: {
        addChildPopup,
        reviewPopup
    },
    computed: {
        //暂停作废结束按钮是否显示
        checkStop(){
            if(this.data.status == 1 && this.data.checkStatus !== 1){
                return true
            }
            return false

        },
        //启动按钮是否显示
        checkStart(){
            if(this.data.status == 3 && this.data.checkStatus !== 1){
                return true
            }
            return false
        },
        //提交按钮是否显示
        checkSubmit(){
            if(this.delogTitle == '查看合同'){
                return false
            }
            return true
        },
        checkaudit(){
            if(this.$store.state.checkButton != null){
                if(this.$store.state.checkButton.role == '000' && this.data.checkStatus == 1){
                    return true
                }
            }
            return false
        }
    },
    data(){
        return {
            name: '',//方法索引，判断当前点击的按钮是哪一个
            dialogVisible: false,//当亲弹出框是否打开
            reviewvisible: false,//提交或审核输入信息弹出框是否打开
            checkDesc: '',//提交或审核输入的信息
            dis: false,//当前表单是否禁止使用
            delogTitle: "",//弹出框标题
            status: null,//方法索引，判断当前提交方法所属
            data: {},//表单数据
            fatherData: {},//父组件传值数据
            contract_belong: [],//合同归属选项列表
            income_source_group: [],//输入性质选项列表
            rules: {//验证规则
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
        //表单自定义验证
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
        //获取子合同数据
        async childContract(data){
            let res = await this.RequestqueryChildContract(data.contractCustomNumber)
            this.data.listNew = res.data
        },
        //获取合同编号是否重复
        RequestContraNo(value){
            return getContractNo({contractCustomNumber: value});
        },
        //根据客户名称判断当前客户是新老客户
        RequestCustomerName(value){
            return getCompany({customerName: value});
        },
        //获取已保存的部门信息（只会在编辑与查看界面执行）
        RequestqueryChildContract(contractCustomNumber){
            return queryChildContract({contractCustomNumber:contractCustomNumber})
        },
        //当前弹出框打开时获取的数据
        RequestHttp(){
            projectTeam({}).then( res => {
                this.contract_belong = res.data;
            })
            income_source({}).then( res => {
                this.income_source_group = res.data;
            })
        },
        //监听子组件自定义事件后执行并获取参数
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
                this.childContract(this.data)
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
        //弹出框取消回调
        close() {
            this.dialogVisible = false;
        },
        //审核,打回，暂停，启动，作废，结束完成
        audit(name,value){
            this.reviewvisible = true
            this.status = value
            this.name = name
        },
        //填写审核信息弹出框确定回调
        review(name){
            if(name == 'audit'){
                checkContract({
                    contractCustomNumber: this.data.contractCustomNumber,
                    checkStatus: this.status,
                    checkDesc: this.checkDesc
                }).then( (res) => {
                    this.callback(res)
                })
            }
            if(name == 'contractStatus'){
                updateContractStatus({
                    contractCustomNumber: this.data.contractCustomNumber,
                    status: this.status,
                    statusDesc: this.checkDesc
                }).then( (res) => {
                    this.callback(res)
                })
            }
        },
        //填写审核信息确定回调方法的回调
        callback(res){
            if(res.data.checkOut){
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                this.none()
                this.close()
                this.$parent.RequestHttpTableData()
            }else{
                this.$message.error(res.msg)
            }
        },
        //审核信息弹出框关闭回调
        none(){
            this.checkDesc = ''
            this.reviewvisible = false
        },
        //提交表单
        submitForm(name,value){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.data.listNew.length !== 0){
                        this.data.checkStatus = value
                        addContract(JSON.parse(JSON.stringify(this.data))).then((res) => {
                            if(res.data.checkOut){
                                this.$message(res.msg)
                                this.close();
                                this.$parent.RequestHttpTableData()
                            }else{
                                this.$message.error(res.msg)
                            }
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
        //打开子弹出框
        dialogChildVisible(formName,title){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$refs.childpopup.open(this.data,title);
                } else {
                    return false;
                }
            });
        },
        //打开查看审核信息回调
        dialogReview(e){
            this.$refs.reviewpopup.open(e)
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