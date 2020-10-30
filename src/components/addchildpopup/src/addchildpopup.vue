<template>
    <div class="addchildpopup">
        <el-dialog title="子合同信息" append-to-body :visible.sync="vis" width="45%">
            <el-form :model="fromdata" ref="addchildpopup" :rules="rules" :inline="true" label-width="110px">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="部门名称" prop="id">
                            <el-select v-model="fromdata.id" @change="RequestTeamList(fromdata.id)">
                                <el-option v-for="(item,index) in department" :key="index" :label="item.projectTeamName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="部门金额" prop="money">
                            <el-input  :disabled="disabled" v-model="fromdata.money" oninput="value=value.replace(/[^0-9.]/g,'')"  @change="RequestamountAllocation(list.clientType,fromdata.money)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="比例" prop="proportion">
                            <el-input disabled v-model="fromdata.proportion"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="商务奖基准值" prop="businessStandard">
                            <el-input disabled v-model="fromdata.businessStandard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="管理奖基准值" prop="pmStandard">
                            <el-input disabled v-model="fromdata.pmStandard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="btn">
                <el-button :disabled="disabled" @click="addItme()">添加</el-button>
                <el-button :disabled="disabled" @click="removeItem(checkSelect)">删除</el-button>
            </div>
            <el-table :data="fromdata.child" style="width: 100%;max-height: 400px" @selection-change = 'check'>
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="staffCode" align="center" label="姓名" width="180">
                    <template slot-scope="scope">
                        <el-select  :disabled="disabled" v-model="scope.row.staffCode">
                            <el-option v-for="(item,index) in team" :key="index" :label="item.staffName" :value="item.staffCode"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="id"  align="center"  label="分工" width="180">
                    <template slot-scope="scope">
                        <el-select :disabled="disabled" v-model="scope.row.id" @change="Requestintoinfo(scope.row.id,fromdata.proportion,fromdata.money,scope.$index)">
                            <el-option v-for="(item,index) in divisionList" :key="index" :label="item.typeDesc + '(' + renderContent(item.proportion) + ')'" :value="item.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="selfProportion"  align="center" width="180" label="分成"></el-table-column>
                <el-table-column prop="leader"  align="center"  label="身份" width="180">
                    <template slot-scope="scope">
                        <el-select :disabled="disabled" v-model="scope.row.leader">
                            <el-option label="组长" :value="0"></el-option>
                            <el-option label="组员" :value="1"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit()">提 交</el-button>
                <el-button @click="cancel('addchildpopup')">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { projectTeam,teamInfo,getAllBusinessType,moneyProportion,selfMoney } from '@/api/index.js'
export default {
    name: 'addchildpopup',
    data(){
        return {
            listNew:[],//所有部门信息
            vis: false,//当前弹出框是否打开
            disabled: false,
            department: [],//部门名称列表
            team:[],//成员信息列表
            divisionList: [],//分工列表
            list: {},//父页面信息
            fromdata: {//当前部门信息
                id: 1,
                money: "0",
                proportion: 0,
                businessStandard: 0,
                pmStandard: 0,
                child:[]  
            },
            checkSelect: [],//选择的成员信息
            rules: {//验证规则
                id: [
                    { required: true , message: '请选择部门名称' , trigger: 'blur' }
                ],
                money: [
                    { required: true , validator: this.departmentAmountRuler , trigger: 'blur'}
                ]
            },
        }
    },
    mounted(){
        
    },
    computed:{
        //计算剩余总金额
        money(){
            let publicMoney
            let ncome = this.list.estimatedContractAmount
            if(this.listNew.length == 0){
                return ncome
            }else{
                this.listNew.forEach( (item) => {
                    publicMoney = ncome - item.money
                    if(item.id == this.fromdata.id){
                        publicMoney = parseInt(publicMoney) + parseInt(this.fromdata.money)
                    }
                })
                return publicMoney
            }
        }
    },
    methods: {
        //循环增加index，保证添加的信息在当前选择的信息上
        tableDataFor(){
            if(this.fromdata.child != null){
                this.fromdata.child.forEach( (item,index) => {
                    item.index = index
                })
            }
        },
        //进入后获取信息
        RequestHttp(){
            //获取部门信息列表
            projectTeam({}).then( res => {
                this.department = res.data
            })
            //获取分工信息列表
            getAllBusinessType({}).then( res => {
                this.divisionList = res.data
            })
        },
        //部门信息关联二级列表，获取部门成员列表，并判断是新增成员信息还是切换部门如果是切换部门就需要重置信息如果不是就不需要
        RequestTeamList(id,name = null){
            if(name == null){
                this.selectDepartment()
            }
            this.tableDataFor()
            teamInfo( {num:id} ).then( res => {
                this.team = res.data
            })
        },
        //如果部门金额改变获取比例与基准值信息
        RequestamountAllocation(clientType,money){
            moneyProportion( {client: clientType , money: money}).then( res => {
                this.fromdata.businessStandard = res.data.businessStandard 
                this.fromdata.proportion = res.data.proportion
                this.fromdata.pmStandard = res.data.pmStandard    
            })
        },
        //如果分工改变获得个人分成信息
        Requestintoinfo(id,proportion,money,index){
            if(String(money) == ""){
                this.$message('请先填写部门金额')
                this.fromdata.child[index].id = ''
                return false
            }
            selfMoney(
                {
                    "id": id,
                    "money": money,
                    "proportion": proportion,
                }
            ).then( res => {
                this.fromdata.child[index].selfProportion = res.data.selfProportion
            })
        },
        //清空函数
        empty(){
            this.fromdata.money = '0';
            this.fromdata.child = []
        },
        //判断获取已保存的部门信息中是否有当前显示的部门的信息，如果有将保存的显示出来，如果没有就清空重置
        selectDepartment(){
            let beal = false
            for( let i = 0;i<this.listNew.length;i++){
                if(this.fromdata.id === this.listNew[i].id){
                    beal = true
                    this.fromdata = JSON.parse(JSON.stringify(this.listNew[i]))
                    break
                }else{
                    beal = false
                }
            }
            if(!beal){
                this.empty()
            }
            this.RequestamountAllocation(this.list.clientType,this.fromdata.money)
        },
        //验证规则函数，验证部门金额
        departmentAmountRuler(rule,value,callback){
            if(value == ""){
                callback( new Error('请填写部门金额'))
            }
            if(parseFloat(this.money) < parseFloat(value)){
                callback( new Error('超出分配金额'))
            }else{
                callback()
            }
        },
        //计算百分比方法
        renderContent(value){
            if (value != undefined && value != null) {
                const scale = ((value * 10000)/100.00).toFixed(0) + '%';
                return scale;
            }
        },
        //多选参数回调
        check(e){
            this.checkSelect = e
        },
        //增加成员信息方法
        addItme(){
            this.fromdata.child.push({
                staffCode: '',
                id: '',
                selfProportion: '',
                leader: '',
            })
            this.RequestTeamList(this.fromdata.id,'add')
        },
        //删除成员信息方法
        removeItem(e){
            e.forEach( (item) => {
                this.fromdata.child.forEach ( (tableitme,tableindex) => {
                    if(item.index == tableitme.index){
                        this.fromdata.child.splice(tableindex,1)
                    }
                })
            })
        },
        //打开当前弹出框方法（父级页面调用）
        open(list,title){
            this.RequestHttp();
            this.list = JSON.parse(JSON.stringify(list))
            this.listNew = this.list.listNew
            if(title == '查看合同'){
                this.disabled = true
            }else{
                this.disabled = false
            }
            this.RequestTeamList(this.fromdata.id)
            this.RequestamountAllocation(this.list.clientType,this.fromdata.money)
            this.vis = true
        },
        //提交方法
        submit(){
            let data = JSON.parse(JSON.stringify(this.fromdata))
            if(this.listNew.length == 0){
                this.listNew.push(data)
                this.$emit("byValue",this.listNew)
                return true
            }
            for(let i = 0 ; i < this.listNew.length ; i++){
                if(this.fromdata.id == this.listNew[i].id){
                    this.listNew.splice(i,1)
                    this.listNew.push(data)
                    break
                }else{
                    this.listNew.push(data)
                    break
                }
            }
            this.$emit("byValue",this.listNew)
        },
        //取消方法
        cancel(name){
            this.close(name)
        },
        //关闭当前弹出框方法
        close(name) {
            this.vis = false
            this.$refs[name].resetFields()
            this.empty()
        },
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
    .btn{
        float: right;
    }
</style>