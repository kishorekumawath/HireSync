import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>HireSync</h1>
      <SignedOut>
        <SignInButton mode='modal' />
        <button>Login</button>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />

    </>
  )
}

export default App
