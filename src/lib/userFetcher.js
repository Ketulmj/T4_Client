export const userFetcher = async (setUser) => {
  const token = localStorage.getItem('auth');
  if (!token) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (data?.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    setUser(null);
  }
};

