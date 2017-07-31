import React from 'react'
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  // constructor () {
  //   super()
  //   this.goToStore = this.goToStore.bind(this)
  // }

  goToStore (event) {
    event.preventDefault()
    console.log('changed URL')
    // grab text from box
    const storeId = this.storeInput.value
    console.log(`Going To ${storeId}`)
    // transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`)
  }
  render () {
    return (
      <form className='store-selector' onSubmit={(e) => this.goToStore(e)}>
        {/* A JSX Comment */}
        <h2>Please Enter A Store</h2>
        <input type='text' required placeholder='Store Name' defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
        <button type='submit'>Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker
