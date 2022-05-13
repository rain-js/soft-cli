const axios = require('axios')
const ora = require('ora')
const Inquirer = require('inquirer')
const wrapFetchAddLoding = require('./utils/wrapFetchAddLoading')

// 1).获取仓库列表
const fetchRepoList = async () => {
  // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
  const { data } = await axios.get('https://api.github.com/orgs/soft-vue/repos');
  return data;
};

module.exports = async (projectName) => {
  let repos = await wrapFetchAddLoding(fetchRepoList, 'fetching repo list')()
  // 选择模板
  repos = repos.map((item) => item.name);
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choice repo template to create project',
    choices: repos, // 选择模式
  });
  return repo
};