import styled from 'styled-components'

const PhoneLoginWrapper = styled.div`
  .code-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      width: 100px;
      text-align: center;
      line-height: 30px;
      background-color: #eee;
      cursor: pointer;
      user-select: none;
      font-size: 13px;
      color: #646464;
    }
    .btn-dis {
      cursor: not-allowed;
      color: #999;
    }
  }
`

export default PhoneLoginWrapper
