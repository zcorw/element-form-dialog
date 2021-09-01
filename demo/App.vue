<template>
  <div>
    <el-button @click="handleAdd">添加</el-button>
    <el-table :data="tableData">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="action" label="操作">
        <template slot-scope="scope">
          <el-button size="smail" plain @click="() => handleUpdate(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-form-dialog ref="dialog" @submit="handleSumbit">
      <template v-slot:default="scope">
        <table-form
          :initData="scope.data"
        />
      </template>
    </el-form-dialog>
  </div>
</template>

<script>
import TableForm from "./Form.vue";
export default {
  name: "app",
  components: { TableForm },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    handleAdd() {
      this.$refs.dialog.openModel();
    },
    handleSumbit(data) {
      if (data.id) {
        this.tableData.splice(data.id - 1, 1, data);
      } else {
        this.tableData.push({ id: this.tableData.length + 1, ...data });
      }
    },
    handleUpdate(data) {
      this.$refs.dialog.openModel({ data });
    },
  },
};
</script>