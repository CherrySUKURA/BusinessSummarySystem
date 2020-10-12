<template>
    <div class="addchildpopup">
        <el-dialog title="子合同信息" append-to-body :visible.sync="vis" width="50%" :before-close="handleClose">
            <el-form :model="departments" :inline="true" label-width="80px">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="金额分成">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="金额分成">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="金额分成">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit()">提 交</el-button>
                <el-button @click="cancel()">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'addchildpopup',
    data(){
        return {
            vis: false,
            departments: []
        }
    },
    methods: {
        open(data){
            this.departments = data;
            this.vis = true
        },
        close(){
            this.vis = false
        },
        submit(){
            this.vis = false
        },
        cancel(){
            this.vis = false
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then( () => {
                done();
            })
            .catch( () => {});
        },
    }
}
</script>

<style scoped>

</style>