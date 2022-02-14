// 打特定的包

// 必须用5.1.1版本及以下， v6只支持import导入
const execa = require('execa')

const target = 'reactivity'

build(target)

// 对目标进行依次打包，并且并行打包
async function build (target) {
  // rollup -c -environment TARGET:shared
  await execa('rollup', ['-cw' , '--environment' ,`TARGET:${target}`],
    {stdio: 'inherit'} // 子进程打包信息共享给父进程
  )
}
