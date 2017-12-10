import React, { Component } from 'react'
import './Search.css'
import { connect } from 'react-redux'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onHandleChange = this.onHandleChange.bind(this)
  }

  onHandleChange (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  onFormSubmit (event) {
    event.preventDefault()

    this.props.onSearchTermSubmit(this.state.inputValue)
  }

  render () {
    return (
      <form onSubmit={this.onFormSubmit}
        className='col-lg-6 offset-lg-3'>
        <div className='input-group'>
          <input type='search'
            value={this.state.inputValue}
            onChange={this.onHandleChange}
            className='form-control'
            placeholder='people from phoenix are phoenicians'
            aria-label='Search for...' />

          <span className='input-group-btn'>
            <button disabled={!this.state.inputValue}
              className='btn btn-secondary'
              type='submit'>Search!</button>
          </span>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({snapQuery, videos}) => {
  return {
    snapQuery,
    videos
  }
}

export default connect(mapStateToProps)(Search)
