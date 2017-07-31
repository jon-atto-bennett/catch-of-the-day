import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

class App extends React.Component {
  constructor () {
    super()

    this.addFish = this.addFish.bind(this)
    this.updateFish = this.updateFish.bind(this)
    this.removeFish = this.removeFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount () {
      // runs before app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      })

      // check if there is any order in local storage
    const localStoreRef = window.localStorage.getItem(`order-${this.props.params.storeId}`)

    if (localStoreRef) {
        // update our App components orderIds
      this.setState({
        order: JSON.parse(localStoreRef)
      })
    }
  }

  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  componentWillUpdate (nextProps, nextState) {
    window.localStorage.setItem(`order-${this.props.params.storeId}`,
    JSON.stringify(nextState.order))
  }

  addFish (fish) {
    // update state
    // use spread to put in existing state
    const fishes = {...this.state.fishes}
    // add in our new fish
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish
    // set state
    this.setState({ fishes })
  }

  updateFish (key, updatedFish) {
    const fishes = {...this.state.fishes}
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  removeFish (key) {
    const fishes = {...this.state.fishes}
    fishes[key] = null // A Firebase thing
    this.setState({ fishes })
  }

  loadSamples () {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder (key) {
    const order = {...this.state.order}
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  removeFromOrder (key) {
    const order = {...this.state.order}
    delete order[key] // remove item from order
    this.setState({ order })
  }

  render () {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='list-of-fishes'>
            {Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                />)
          }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
         />
        <Inventory
          addFish={this.addFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
        />
      </div>
    )
  }
}

export default App
