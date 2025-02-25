import styled from 'styled-components'
import loginBg from '@/assets/img/login-bg.png'

const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${loginBg}) center/cover no-repeat;
  overflow: hidden;
  .mian {
    width: 360px;
    min-height: 200px;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(6px);
    border-radius: 10px;
    box-shadow: -5px 5px 10px 3px rgba(0, 0, 0, 0.5);
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .card-title {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
      color: rgba(0, 0, 0, 0.6);
    }
    .login-type {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #3f3f3f;
      div {
        cursor: pointer;
      }
    }
  }
`

export default LoginWrapper
