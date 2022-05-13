const axios = require('axios')
const ora = require('ora')
const Inquirer = require('inquirer')
const wrapFetchAddLoding = require('./utils/wrapFetchAddLoading')

const fetchTagList = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/soft-vue/${repo}/tags`)
  return data
}

module.exports = async (repo) => {
  let tags = await wrapFetchAddLoding(fetchTagList, 'fetching tag list')(repo)

  // 选择版本
  tags = tags.map((item) => item.name)
  const { tag } = await Inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: 'please choice tag to create project',
    choices: tags,
  })
  return tag
}
