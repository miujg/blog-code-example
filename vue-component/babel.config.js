module.exports = {
  presets: [ // babel解析预设 反着执行
    '@babel/preset-env',
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,        // ?支持所有文件扩展名
      }, 
    ]
  ]
}