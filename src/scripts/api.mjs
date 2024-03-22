import { expectedError } from "@babel/core/lib/errors/rewrite-stack-trace";

const { setCookie, getCookie, checkCookie } = require("./cookies.mjs")

let api_url = "https://api.blockcoin.social"
if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
    api_url = "http://127.0.0.1:8080"
}


export function Login(user,password,captcha) {
    const url = api_url + "/user/login"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": user,
            "password": password,
            "captcha": captcha
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                setCookie("v1-profile-picture","",365)
                setCookie("v1-user", data["user"], 365)
                setCookie("v1-id", data["id"], 365)
                setCookie("v1-token", data["token"], 365)
                return true;
            } else {
                return data["message"];
            }
        })
        .catch(error => {
            return data["message"];
        });
}

export function Register(user, contact, password, captcha) {

    const url = api_url + "/user/register"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": user,
            "password": password,
            "contact": contact,
            "captcha": captcha
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                setCookie("v1-profile-picture","",365)
                setCookie("v1-user", data["user"], 365)
                setCookie("v1-id", data["id"], 365)
                setCookie("v1-token", data["token"], 365)
                return true;
            } else {
                return data["message"];
            }
        })
        .catch(error => {
            return data["message"];
        });
}


export function RandomPosts(limit) {
    if (limit > 20) {
        limit = 20
    }
    const url = api_url + "/social/random?limit="+limit

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["data"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function GetProfile(id) {
    const url = api_url + "/user/profile?user="+id

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["data"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function CreatePost(data,isbuyable,price,captcha) {
    const url = api_url + "/social/post"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "data": data,
            "isBuyable": isbuyable,
            "price": price,
            "captcha":captcha
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return true;
            } else {
                return data["message"];
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function IsLogedIn() {
     return checkCookie("v1-user") && checkCookie("v1-id") && checkCookie("v1-token")
}

export function ViewPost(id) {
    const url = api_url + "/social/view"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "post": id,
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function PostLiked(id) {
    const url = api_url + "/social/liked"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "post": id,
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function LikePost(id) {
    const url = api_url + "/social/like"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "post": id,
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function FollowedUser(id) {
    const url = api_url + "/social/followed"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "target": id,
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function FollowUser(user,captcha) {
    const url = api_url + "/social/follow"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "captcha": captcha,
            "target": user,
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function Balance(user) {
    const url = api_url + "/user/balance?user="+user

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["balance"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function Stats(user) {
    const url = api_url + "/social/stats/user?user="+user

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["data"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function UpdateProfilePicture(file) {
    const url = api_url + "/user/update/profile"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "picture":file
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["message"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}


export function UpdateAbout(about) {
    const url = api_url + "/user/update/profile"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "about":about
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["message"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}


export function UpdateDisplay(file) {
    const url = api_url + "/user/update/profile"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "display":file
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["message"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}


export function UpdateBanner(file) {
    const url = api_url + "/user/update/profile"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "banner":file
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["message"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}


export function UpdateEmail(file) {
    const url = api_url + "/user/update/profile"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "email":file
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["message"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}


export function UpdatePassword(old,new_password) {
    const url = api_url + "/user/update/profile"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "password":old,
            "new_password":new_password
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["message"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function BuyPost(post,captcha) {
    const url = api_url + "/social/buy"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "captcha": captcha,
            "post": post,
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return true;
            } else {
                return data["message"];
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function VerifyToken() {
    const url = api_url + "/user/verify-token"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data["success"]
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function GetComments(post) {
    const url = api_url + "/social/comment?post="+post

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data["data"];
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function LikeComment(id,post) {
    const url = api_url + "/social/comment/like"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "post": post,
            "comment": id,
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function CommentLiked(id,comment) {
    const url = api_url + "/social/comment/liked"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "post": id,
            "comment":comment,
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return data;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}

export function CreateComment(data,post,parent,captcha) {
    const url = api_url + "/social/comment"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": getCookie("v1-id"),
            "token": getCookie("v1-token"),
            "data": data,
            "parent": parent,
            "post": post,
            "captcha":captcha
        })
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data["success"]) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
            return false; 
        });
}