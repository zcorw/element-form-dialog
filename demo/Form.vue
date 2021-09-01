<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="0">
    <el-form-item prop="name" required>
      <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item prop="address" required>
      <el-input v-model="ruleForm.address" placeholder="请输入地址" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "table-form",
  props: {
    initData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      ruleForm: { ...this.initData },
    };
  },
  watch: {
    initData(newData) {
      this.ruleForm = newData;
    },
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    request() {
      return Promise.resolve(this.ruleForm);
    },
  },
};
</script>