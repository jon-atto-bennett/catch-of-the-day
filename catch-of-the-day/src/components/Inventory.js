import React from 'react'
import AddFishForm from './AddFishForm'
import base from '../base'

class Inventory extends React.Component {
  constructor () {
    super()
    this.renderInventory = this.renderInventory.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.state = {
      uid: null,
      owner: null
    }
  }

  handleChange (e, key) {
    const fish = this.props.fishes[key]
    // take a copy of that fish and update
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish)
  }

  authenticate (provider) {
    base.auth().signInWithPopup(provider)
    .then(function (result) {
      const authData = result.user
      console.log(authData)
    })
  }
// eslint-disable-next-line
  authHandler (err, authData) {
    console.log('handler')
  }

  renderLogin () {
    return (
      <nav className='login'>
        <h2>Inventory</h2>
        <p>Sign in to manage your stores inventory</p>
        <button className='github' onClick={() => this.authenticate(new base.auth.GithubAuthProvider())}>
          Login with Github
        </button>
        <button className='facebook' onClick={() => this.authenticate(new base.auth.FacebookAuthProvider())}>
          Login with Facebook
        </button>
        <button className='twitter' onClick={() => this.authenticate(new base.auth.TwitterAuthProvider())}>
          Login with Twitter
        </button>
      </nav>
    )
  }

  renderInventory (key) {
    const fish = this.props.fishes[key]
    return (
      <div className='fish-edit' key={key}>
        <input type='text' name='name' value={fish.name} placeholder='Fish Name'
          onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='price' value={fish.price}
          onChange={(e) => this.handleChange(e, key)} placeholder='Fish Price' />
        <select type='text' name='status' value={fish.status}
          onChange={(e) => this.handleChange(e, key)} placeholder='Fish Status'>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea type='text' name='desc' value={fish.desc}
          onChange={(e) => this.handleChange(e, key)} placeholder='Fish Desc' />
        <input type='text' name='image' value={fish.image}
          onChange={(e) => this.handleChange(e, key)} placeholder='Fish Image' />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }
  render () {
    const logout = <button>Log Out</button>
    // check to see if logged in
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
}

export default Inventory
