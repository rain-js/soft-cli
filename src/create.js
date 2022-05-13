const fetchRepoList = require('./fetchRepoList')
const fetchTagList = require('./fetchTagList')
const downloadTemplate = require('./downloadTemplate')
const renderTemplate = require('./renderTemplate')

module.exports = async (projectName) => {
  let repo = await fetchRepoList()
  let tag = await fetchTagList(repo)
  let target = await downloadTemplate(repo, tag)
  // let target = await downloadTemplate(repo)
  await renderTemplate(target, projectName)  
}