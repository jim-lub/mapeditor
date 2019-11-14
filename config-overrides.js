const {override, addWebpackModuleRule} = require('customize-cra');

module.exports = override(
  config => ({
    ...config,
    output: {
      ...config.output,
      globalObject: 'this'
    },
  }),
  addWebpackModuleRule(
    {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' }
    }
  )
)

// const {override, addWebpackModuleRule} = require('customize-cra')
//
// module.exports = override(
//   addWebpackModuleRule(
//     {
//       test: /\.worker\.js$/,
//       use: { loader: 'worker-loader' }
//     }
//   )
// )
