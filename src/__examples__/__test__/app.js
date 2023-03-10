// import files and functions which are exported in components/stores...
import { shallowMount } from "@vue/test-utils";
// import "@/main.js";
import App from "../App.vue";

describe("function", () => {
  it("Get a method function and a variable of the component and test it", () => {
    const wrapper = shallowMount(App);

    // for access to the instances of the component. Need to defineExpose in the component before
    const vm = wrapper.vm;

    // expect(wrapper.exists());
    console.log(vm.navigation);
  });
});
