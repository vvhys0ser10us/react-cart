import CartItem from './CartItem'

const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }

  if (action.type === 'REMOVE') {
    const newCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: newCart }
  }

  if (action.type === 'INCREASE') {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 }
      }
      return item
    })
    return { ...state, cart: newCart }
  }

  if (action.type === 'DECREASE') {
    const newCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 }
        }
        return item
      })
      .filter((item) => item.amount !== 0)
    return { ...state, cart: newCart }
  }

  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, item) => {
        const { price, amount } = item
        cartTotal.amount += amount
        cartTotal.total += price * amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))
    return { ...state, total, amount }
  }

  return state
}
export default reducer
