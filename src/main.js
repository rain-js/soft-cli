const program = require('commander')
const { version, name } = require('./utils/constants')  

const path = require('path')

const actionsMap = {
  create: { // 创建模板
    description: 'create project',
    alias: 'cr',
    examples: [
      'soft-cli create <template-name>',
    ],
  },
  // config: { // 配置配置文件
  //   description: 'config info',
  //   alias: 'c',
  //   examples: [
  //     'soft-cli config get <k>',
  //     'soft-cli config set <k> <v>',
  //   ],
  // },
  '*': {
    description: 'command not found',
  },
}
// 循环创建命令
Object.keys(actionsMap).forEach((action) => {
  program
    .command(action) // 命令的名称
    .description(actionsMap[action].description) // 命令的描述
    .action(() => { // 动作
      // console.log(action)
      if (action === '*') { // 如果动作没匹配到说明输入有误
        console.log(acitonMap[action].description)
      } else { // 引用对应的动作文件 将参数传入
        require(path.resolve(__dirname, action))(...process.argv.slice(3))
      }
    })
    .alias(actionsMap[action].alias) // 命令的别名

})

program.on('--help', () => {
  console.log('Examples')
  Object.keys(actionsMap).forEach((action) => {
    (actionsMap[action].examples || []).forEach((example) => {
      console.log(`  ${example}`)
    })
  })
})

program
  .version(version)
  .parse(process.argv) // process.argv就是用户在命令行中传入的参数
