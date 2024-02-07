const readPackage = (pkg, context) => {
  if (pkg.peerDependencies) {
    for (const skipName of [
      "react",
      "react-dom",
      "styled-components",
      "three",
    ]) {
      if (pkg.peerDependencies[skipName])
        // fixes react error "Error: Invalid hook call."
        // with multiple copy of react in the node_modules folder
        context.log(
          `[${pkg.name}] Removing ${skipName} as a peer dependency (https://bit.ly/3jmD8J6).`
        );
      delete pkg.peerDependencies[skipName];
    }
  }
  return pkg;
};

module.exports = {
  hooks: {
    readPackage,
  },
};
