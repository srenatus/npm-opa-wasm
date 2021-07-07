// Copyright 2018 The OPA Authors.  All rights reserved.
// Use of this source code is governed by an Apache2
// license that can be found in the LICENSE file.

const { createHistogram, performance, PerformanceObserver } = require("perf_hooks")

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry)
  })
})

perfObserver.observe({ entryTypes: ["measure"], buffer: true });

const fs = require('fs');
const { loadPolicy } = require("@open-policy-agent/opa-wasm");

// Read the policy wasm file
const policyWasm = fs.readFileSync('policy.wasm');

// Load the policy module asynchronously
loadPolicy(policyWasm).then(policy => {

    // Use console parameters for the input, do quick
    // validation by json parsing. Not efficient.. but
    // will raise an error
    const input = JSON.parse(process.argv[2]);
    // Provide a data document with a string value
    // policy.setData({world: "world"});

    // Evaluate the policy and log the result
    //performance.mark("example-start")
    hist = createHistogram();
    result = [];
    for (let i = 0; i < 1000; i++) {
        result = policy.evaluate(input);
        hist.recordDelta();
    }
    //performance.mark("example-end")
    //performance.measure("example", "example-start", "example-end")
    console.log(hist.percentiles);
    console.log(JSON.stringify(result, null, 2));

}).catch(err => {
    console.log("ERROR: ", err);
    process.exit(1);
});
