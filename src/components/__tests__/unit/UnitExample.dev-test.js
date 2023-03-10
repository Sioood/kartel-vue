// import files and functions which are exported in components/stores...
import { shallowMount } from "@vue/test-utils";
import "@/main.js";

import { useConfigApi } from "@/stores/configApi";

import UnitExample from "./UnitExample.vue";
import { sum, value } from "./UnitExample.js";

describe("function", () => {
  const storeApi = useConfigApi();

  it("test externals functions", () => {
    expect(storeApi.getId("test/2")).to.eq(2);

    expect(sum(1, 1)).to.eq(2);
    expect(value.value).to.eq(2);

    value.value = 3;

    expect(value.value).to.eq(3);
  });

  it("Get a method function and a variable of the component and test it", () => {
    /**
    
      You need to expose variables & methods inside a vue "script setup" component by defineExpose({ variable or method });
    
    **/

    /**
    
      VUE TEST UTILS
    
    **/

    // this help me a lot 👉 https://stackoverflow.com/questions/71342022/jest-unit-test-cannot-find-component-functions-when-using-vue3-script-setup-synt
    // with vue test utils and shallowMount

    const wrapper = shallowMount(UnitExample, {
      props: { title: "Mount from vue test utils" },
    });

    // for access to the instances of the component. Need to defineExpose in the component before
    const vm = wrapper.vm;

    expect(wrapper.exists());
    expect(vm.test()).equal("exposed test");
    expect(vm.returnString("string")).equal("string");
    expect(vm.variable).equal("i'm a variable");
  });
});
