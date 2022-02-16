// 把packages目录下得所有包都进行打包

// 找到packages下得所有模块
const fs = require('fs')
const path = require('path')
// 开启子进程，进行打包， 最终使用rollup进行打包
// 必须用5.1.1版本及以下， v6只支持import导入
const execa = require('execa')


// 读取packages下得目录，得忽略掉文件
const targets = fs.readdirSync(path.resolve(process.cwd(), './packages')).filter(f => fs.statSync(`packages/${f}`).isDirectory())


// 对目标进行依次打包，并且并行打包
async function build (target) {
  // rollup -c -environment TARGET:shared
  await execa('rollup', ['-c' , '--environment' ,`TARGET:${target}`],
    {stdio: 'inherit'} // 子进程打包信息共享给父进程
  )
}

function runParallel(targets, iteratorFn) {
  const res = []
  for(const item of targets) {
    const p =  iteratorFn(item)
    res.push(p)
  }
  return Promise.all(res)
}

runParallel(targets, build)