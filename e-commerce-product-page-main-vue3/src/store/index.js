import { createStore } from "vuex";

export default createStore({
  state: {
    cart:[]
  },
  getters: {},
  mutations: {
    ADD_ITEM_TO_CART (state, itemToAdd) {
      state.cart.push(itemToAdd)
    },
    REMOVE_ITEM_FROM_CART (state , index) {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    addItemToCart ({ commit , state }, {itemToAdd , amount}) {
      const cart = state.cart
      let notInList = true

      if (cart.length > 0) {
        cart.forEach(item => {
          if (item.id === itemToAdd.id) {
            item.amount += amount
            notInList = false
          }})
        if (notInList){
          itemToAdd.amount = amount
          commit('ADD_ITEM_TO_CART',itemToAdd)
        }
      } else{
        itemToAdd.amount = amount
        commit('ADD_ITEM_TO_CART',itemToAdd)
      }
    },
    removeItemFromCart({ state,commit }, itemToRemove){
      let index = state.cart.findIndex(item => item.id === itemToRemove.id);
      if(index !== -1)
        commit('REMOVE_ITEM_FROM_CART' , index)
    },
  },
  modules: {},
});

