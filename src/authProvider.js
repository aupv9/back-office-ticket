// in src/authProvider.js


export default {
    // called when the user attempts to log in
    // login: ({ username, password }) => {
    //
    //     // localStorage.setItem('username', username);
    //     // accept all username/password combinations
    //     return Promise.resolve();
    // },
    login: ({ username, password ,isSocial,body}) =>  {
        if(!isSocial){
            const request = new Request('http://localhost:8080/api/v1/authenticate', {
                method: 'POST',
                body: JSON.stringify({ email:username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            return fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {

                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(auth => {
                    console.log(auth)
                    const authenticate = {
                        fullName:auth["fullName"],
                        id:auth["id"],
                        avatar:auth["photo"]
                    }
                    localStorage.setItem("email",JSON.stringify(auth["email"]));
                    localStorage.setItem('auth', JSON.stringify(authenticate));

                    localStorage.setItem('token', JSON.stringify(auth["token"]));
                    localStorage.setItem('privilege', JSON.stringify(auth["privileges"]));
                })
                .catch(() => {
                    throw new Error('Network error')
                });
        }else{
            // const params = {
            //     email:body.email,
            //     familyName:body.familyName,
            //     givenName: body.givenName,
            //     googleId: body.googleId,
            //     imageUrl: body.imageUrl,
            //     name: body.name
            // }
            const request = new Request('http://localhost:8080/api/v1/authenticate-social', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            return fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(auth => {

                    const authenticate = {
                        fullName:auth["fullName"],
                        id:auth["id"],
                        avatar:auth["photo"]
                    };
                    localStorage.setItem("email",JSON.stringify(auth["email"]));
                    localStorage.setItem('auth', JSON.stringify(authenticate));
                    localStorage.setItem('token', JSON.stringify(auth["token"]));
                    localStorage.setItem('privilege', JSON.stringify(auth["privileges"]));
                })
                .catch(() => {
                    throw new Error('Network error')
                });
        }

    },
    //called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('privilege');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');

            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
       return localStorage.getItem('auth')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
    getIdentity:  () => {
        try {

            const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
            return Promise.resolve({ id: id,fullName:fullName,avatar:avatar});
        } catch (error) {
            console.log(error)
            return Promise.reject(error);
        }
    }
};
