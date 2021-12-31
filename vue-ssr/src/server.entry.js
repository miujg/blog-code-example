import createApp from './app.js'

// 保证每次访问服务器都有新实例
export default () => {
  const { app } = createApp()
  return app
}