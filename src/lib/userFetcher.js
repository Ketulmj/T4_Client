export const userFetcher = (user, setUser) => {
    if (user.UserId == null) {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/get`,
            {
                method: 'GET',
                credentials: "include",
            }
        )
            .then(res => res.json())
            .then(({ user }) => { setUser(user) })
    };
}
