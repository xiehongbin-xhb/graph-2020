## 本地如何使用 https 进行开发
https://juejin.cn/post/6844904116481687565

## 在 typeScript 中写mixins
http://t.zoukankan.com/lsAxy-p-14914053.html
- 使用 vue-typed-mixins
- 升级为 Vue3
- export default (Vue as VueConstructor<Vue & InstanceType<typeof MixinA>& InstanceType<typeof MixinB>>).extend({mixins: [MixinA, MixinB],