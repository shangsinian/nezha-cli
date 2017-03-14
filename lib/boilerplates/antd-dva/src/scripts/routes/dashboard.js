import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

class Dashboard extends React.Component {
	constructor(props, context) {
    super(props)
		this.state = {
	  }
  }

  componentDidMount (){
    var { dispatch } = this.props
    dispatch({
      type: `user/query`,
      payload: {data:"hahha"}
    })
  }

  render() {
    return (
      <div>
        <div>Hello world</div>
      </div>  
    );
  }
}

export default connect(({app, user}) => ({app, user}))(Dashboard)