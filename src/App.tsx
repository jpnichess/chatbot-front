import { useState, useEffect } from "react";
import { auth } from "./Components/Firebase/FirebaseConfig";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Components/Header/Header";
import Chat from "./Components/Chat/Chat";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header user={user} />
      <main>
        <Chat  />
      </main>
    </>
  );
}

export default App;
