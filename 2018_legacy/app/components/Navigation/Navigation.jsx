import React           from 'react'
import PropTypes       from 'prop-types'
import scrollToElement from 'scroll-to-element'
import { connect }     from 'react-redux'
import { browserHistory } from 'react-router'

import IndustrialHeader from './IndustrialHeader'
import Footer           from '../Footer'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showScrollTop: '' }
    this.scrollTop    = this.scrollTop.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  scrollTop () {
    scrollToElement('body')
  }

  handleScroll (e) {
    if (window.scrollY > 260) {
      this.setState({ showScrollTop: 'showScrollTop' })
    } else {
      this.setState({ showScrollTop: '' })
    }
  }

  componentDidMount () {
    if (!this.props.fixed) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount () {
    if (!this.props.fixed) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  componentWillReceiveProps (p) {
    setTimeout(() => {
      if (p.location.query && p.location.query.scrollTo) {
        scrollToElement(`#${p.location.query.scrollTo}Content`, { offset: -60 })
        browserHistory.push({ search: '' })
      }
    }, 0)
  }

  render () {
    // console.log('+++ Navigation:', this.props, this.state)

    return (
      <div style={{ marginBottom: '650px' }} >
        <IndustrialHeader location={this.props.location} fixed={this.props.route.fixed} />
        <div className="page-content" >
          { this.props.children }
        </div>
        <button className={`scroltop fa fa-chevron-up`} style={{ display: this.state.showScrollTop === 'showScrollTop' ? 'block' : 'none' }} onClick={() => this.scrollTop() }></button>
        <Footer fixed={true} />
      </div>
    )
  }
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapS = (state, ownProps) => {
  return {
    navCollapse: state.navCollapse,
  }
}

export default connect(mapS)(Navigation)

