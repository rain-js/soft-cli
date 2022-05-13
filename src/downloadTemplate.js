const { promisify } = require('util')
let downLoadGit = require('download-git-repo')
downLoadGit = promisify(downLoadGit)

const wrapFetchAddLoding = require('./utils/wrapFetchAddLoading')

const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`

const download = async (repo, tag) => {
  let api = `soft-vue/${repo}` // 下载项目
  if (tag) {
    api += `#${tag}`
  }
  console.log(`api => ${api}`)
  const dest = `${downloadDirectory}/${repo}` // 将模板下载到对应的目录中
  await downLoadGit(api, dest)

  // await downLoadGit('direct:http://192.168.1.80/tmc/tmc-wechatProgram.git', 'test', { clone: true })

  return dest // 返回下载目录
}



module.exports = async (repo, tag) => {
  // 下载项目
  const target = await wrapFetchAddLoding(download, 'download template')(repo, tag)

  return target
}