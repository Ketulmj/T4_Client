export const userFetcher = (user, setUser) => {
    if (user.UserId == null) {
        fetch('http://localhost:3000/api/user/get',
            {
                method: 'GET',
                credentials: "include",
            }
        )
            .then(res => res.json())
            .then(({ user }) => { setUser(user); console.log(user)})
    };
}