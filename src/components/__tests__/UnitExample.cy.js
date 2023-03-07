// import files and functions which are exported in components/stores...
import { shallowMount } from "@vue/test-utils";
import { mount } from "@cypress/vue";
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

    const wrapperTestUtils = shallowMount(UnitExample, {
      props: { title: "Mount from vue test utils" },
    });

    expect(wrapperTestUtils.exists());
    expect(wrapperTestUtils.vm.test()).equal("exposed test");
    expect(wrapperTestUtils.vm.returnString("string")).equal("string");
    expect(wrapperTestUtils.vm.variable).equal("i'm a variable");

    /**
    
      CYPRESS/VUE
    
    **/

    //                                             👇
    // cypress docs have a missing parenthese "then'('({ wrapper, component }) =>..."
    // cy.mount(COMPONENT).then(({ wrapper, component }) => {
    //   // `wrapper` is the Vue Test Utils wrapper
    //   // `component` is the component instance itself
    // });

    const wrapperCypress = mount(
      UnitExample,
      {
        props: {
          title:
            "Mount from cypress/vue because test utils don't run in browser",
        },
      },
      { shallow: true }
    );

    // i don't know why we can't access to vm directly but vm._.exposed can access to the exposed instances.
    wrapperCypress.then(({ wrapper }) => {
      expect(wrapper.exists());
      expect(wrapper.vm._.exposed.test()).equal("exposed test");
      expect(wrapper.vm._.exposed.returnString("string")).equal("string");
      expect(wrapper.vm._.exposed.variable).equal("i'm a variable");
    });
  });
});
