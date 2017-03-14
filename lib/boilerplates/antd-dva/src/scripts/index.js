import 'babel-polyfill'
import dva from 'dva'
import 'antd/dist/antd.css'

const app = dva()

// 3. Router
app.router(require('./router'))

app.model(require('./models/user'))
// 4. Start
app.start('#stage')