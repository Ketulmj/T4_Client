export const userFetcher = (user, setUser) => {
    if (user?.userId == null) {
        const token = localStorage.getItem('auth');
        if (token) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/get`, {
                method: 'POST',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            })
            .then(res => res.json())
            .then((data) => {
                if (data?.user) {
                    setUser(data.user);
                }
            })
            .catch(err => console.error('User fetch failed:', err));
        }
    }
};

