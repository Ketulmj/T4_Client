export const userFetcher = async (user, setUser) => {
  if (!user?.userId) {
    const token = localStorage.getItem("auth");
    if (token) {
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
          console.log(data);
          setUser(data.user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
  }
};
