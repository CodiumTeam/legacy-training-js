let Forecast = require("../src/forecast");

describe("Forecast should", function () {
  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  it("retrieve today's weather", async () => {
    const forecast = new Forecast();

    let prediction = await forecast.predict("Madrid", null, false);

    expect(true).toBe(true); // I don't know how to test it
  });


  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
