import { home_html } from "./home/html.js"
import { home_js } from "./home/app.js"
import { todo_html } from "./todo/html.js"
import { todo_js } from "./todo/app.js"
import { error_html } from "./error/html.js"
import { error_js } from "./error/app.js"
import { pong_html } from "./pong/html.js"
import { pong_js } from "./pong/app.js"

const routes = {
    "/": [home_html, home_js],
    "/todo": [todo_html, todo_js],
    "/404": [error_html, error_js],
    "/pong": [pong_html, pong_js],
};

const getHash = () =>
  location.hash.slice(1).toLocaleLowerCase().split("/")[1] || "/";

function resolveRoutes(user_location) {
    let render;
    let catch_path;

    // handling getHash, or route ids
    if (getHash() != "/")
    {
        catch_path = `/${user_location[0]}/:id`;
    }
    else
    {
        catch_path = `/${user_location[0]}`;
    }

    // We check that the route exists.
    if (routes[catch_path] && user_location.length >= 1 && user_location.length <= 2)
    {
        render = routes[`/${user_location[0]}`];
    }
    else
    {
        render = routes["/404"];
    }

    return render;
};

const router = async() => {
    let render;

    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const content = document.getElementById("content");

    let user_location = location.hash.slice(1).toLocaleLowerCase().split("/");
    render = resolveRoutes(user_location);

    content.innerHTML = await render[0]();
    for (let index = 1; index < render.length; index++) {
        await render[index]();
    }
};

export default router;