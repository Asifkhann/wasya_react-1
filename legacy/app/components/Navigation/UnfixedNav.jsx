import React           from 'react'
import PropTypes       from 'prop-types'
import scrollToElement from 'scroll-to-element'

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

  render () {
    // console.log('+++ Navigation:', this.props, this.state)

    return (
      <div style={{ marginBottom: '440px' }}>
        <IndustrialHeader location={this.props.location} />
        <div className="page-content" >
          { this.props.children }
        </div>
        <button className={`scroltop fa fa-chevron-up`} style={{ display: this.state.showScrollTop === 'showScrollTop' ? 'block' : 'none' }} onClick={() => this.scrollTop() }></button>
        <Footer />
      </div>
    )
  }
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Navigation
