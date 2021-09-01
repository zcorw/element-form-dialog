<script>
export default {
  name: "el-form-dialog",
  props: {
    title: String,
    width: Number,
    cancelText: String,
    successText: String,
    size: {
      type: String,
      default: "normal",
    },
    onCloseClear: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      visible: false,
      modalBody: undefined,
      loading: false,
      handleCancel: undefined,
      handleSubmit: undefined,
      // 暂存数据，多用于修改功能的表单弹窗
      data: undefined,
    };
  },
  computed: {
    w() {
      if (this.width) {
        return `${this.width}px`;
      }
      switch (this.size) {
        case "small":
          return "400px";
        default:
          return "600px";
      }
    },
  },
  methods: {
    closeModel() {
      this.visible = false;
      this.handleSubmit = undefined;
      this.handleCancel = undefined;
      this.data = undefined;
    },
    openModel(handle) {
      this.visible = true;
      this.handleSubmit = handle && handle.submit;
      this.handleCancel = handle && handle.cancel;
      this.data = handle && handle.data;
    },
    submit() {
      console.log("🚀 ~ file: dialog.vue ~ line 74 ~ submit ~ this.modalBody.componentInstance", this.modalBody.componentInstance)

      this.modalBody.componentInstance
        .validate()
        .then(() => {
          this.loading = true;
          return this.modalBody.componentInstance.request();
        })
        .then((res) => {
          this.$emit("submit", res);
          return this.handleSubmit && this.handleSubmit(res);
        })
        .then(() => this.closeModel())
        .catch((e) => {
          e && console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.closeModel();
      this.$emit("cancel");
      this.handleCancel && this.handleCancel();
    },
    closedEvent() {
      this.$emit("closed");
    },
  },
  render() {
    return (
      <el-dialog
        ref="dialog"
        title={this.title}
        width={this.w}
        visible={this.visible}  
        destroy-on-close    
        scopedSlots={{
          default: () => {
            if (this.visible) {
              const [vnode] = this.$scopedSlots.default({data: this.data});
              const _vnode = this.$createElement(vnode.componentOptions.Ctor, {
                ...vnode.data,
                on: vnode.on,
                props: {
                  ...vnode.componentOptions.propsData,
                }
              }, vnode.componentOptions.children);
              this.modalBody = _vnode;
              return _vnode;
            } else {
              this.modalBody = undefined;
              return undefined;
            }
          },
        }}
        close-on-click-modal={false}
        close-on-press-escape={false}
        onClose={this.closeModel}
        onClosed={this.closedEvent}
      >
        <div slot="footer" class="dialog-footer">
          <el-button onClick={this.cancel}>
            {this.cancelText || this.$dialogCancelText || 'Cancel'}
          </el-button>
          <el-button
            type="primary"
            onClick={this.submit}
            v-loading={this.loading}
          >
            {this.successText || this.$dialogSuccessText || 'Ok'}
          </el-button>
        </div>
      </el-dialog>
    );
  },
};
</script>