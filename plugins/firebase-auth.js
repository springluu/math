import { auth } from '@/services/firebase/FirebaseInit.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      console.log("[onAuthStateChanged]", user);

      store.commit('setUser', user)
      resolve()
    })
  })
}