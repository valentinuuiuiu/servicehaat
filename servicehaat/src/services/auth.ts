
import { auth } from '@/lib/firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'

export const AuthService = {
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password)
  },

  async signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password)
  },

  async logout() {
    return await auth.signOut()
  },

  async resetPassword(email: string) {
    return await sendPasswordResetEmail(auth, email)
  },

  getCurrentUser() {
    return auth.currentUser
  }
}
