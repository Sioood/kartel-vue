import { withSetup } from "./withSetup";
import { composable } from "./composable";

describe("Example for unit with composables", () => {
  it("Should results letters and numbers", () => {
    // examples
    /**
    
      with setup for lifecycle
    
    **/
    // overkill for composable in this situation because it don't have lifecycle to setup with a mount
    const [results, app] = withSetup(composable, [1,2,3]);

    expect(results).toHaveProperty("letters").toHaveProperty("numbers")

    /**
    
      just the composable, execute like a function -> if it don't have lifecycle
    
    **/
    expect(composable([1,2,3])).toHaveProperty("letters").toHaveProperty("numbers")

    //Assert results
    // console.log("results :", results);

    app.unmount()
  });
});
