import { Route, Routes} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Auth, Login, Register } from './pages/Auth'
import Profile from './pages/Profile'
import ProductPage from './pages/ProductPage'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path='/products' element={<Home></Home>}></Route>

          <Route path='/auth' element={<Auth></Auth>}>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='register' element={<Register></Register>}></Route>
          </Route>

          <Route path='/profile' element={<Profile></Profile>}></Route>

          <Route path='/product/:id' element={<ProductPage></ProductPage>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
