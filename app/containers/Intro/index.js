import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

import styles from './styles.css';


class Intro extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Helmet title="Intro" />
        <h1 className={styles.title}>Intro Page</h1>
        <div>
          <img src="/assets/images/head.png"/>
        </div>
        <Link to="/main">to main</Link>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Intro)
