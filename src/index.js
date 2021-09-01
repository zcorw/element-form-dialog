import Dialog from './dialog.vue';

const install = (Vue, opt) => {
  console.log("🚀 ~ file: index.js ~ line 6 ~ install ~ Dialog", Dialog)
  if (opt.cancelText) {
    Vue.prototype.$dialogCancelText = opt.cancelText;
  }
  if (opt.cancelText) {
    Vue.prototype.$dialogSuccessText = opt.successText;
  }
  Vue.component(Dialog.name, Dialog);
}

export default { install, Dialog };