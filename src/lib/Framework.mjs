const pages = {}
const themes = {}

let current_theme

let CanNavigate = true

function SwitchCanNavigate(newdata) {
  CanNavigate = newdata
}

export class Theme {
  constructor(name) {
    this.name = name
    this.type = "json"
    this.data = {}
  }

  propertie(name, value) {
    this.data[name] = value
  }

  get(name) {
    if (this.type == "json" || this.type == undefined) {
      const data = this.data[name]
      return data
    }
  }

  parse(json) {
    const meta = json.meta
    this.type = meta.type
   
    if (this.type == "json" || this.type == undefined) {
      for (let key in json.data) {
        let childKey = key;
        let childValue = json.data[key];
        this.propertie(childKey, childValue)
      }
    } else {
      let cssString = '';
      console.log("css")
      for (const key in json.data) {
        if (Object.hasOwnProperty.call(json.data, key)) {
          const element = json.data[key];
          let elementType = "."
          if (element["type"] == "tag") {elementType = ""} else if (element["type"] == "class") {elementType = "."} else {elementType = "#"}
          cssString += `${elementType}${key} {`;
          delete element['type'];
          for (const styleKey in element) {
            if (Object.hasOwnProperty.call(element, styleKey)) {
              cssString += `${styleKey}: ${element[styleKey]} !important;`;
            }
          }
          cssString += `}\n`;
        }

      }
      const styleTag = document.createElement('style');
      styleTag.textContent = cssString;
      document.head.appendChild(styleTag);
    }
  }

  register() {
    themes[this.name] = this
  }
}

export class Display {

  constructor() { }

  set_theme(name) {
    current_theme = name
  }

  get(name) {
    const theme_data = themes[current_theme].get(name)
    if (theme_data == undefined) {
      console.log("Default", name, themes["default"].get(name))
      return themes["default"].get(name)
    } else {
      console.log("Theme", name, theme_data)
      return theme_data
    }
  }

}

export class Page {
  constructor(route) {
    this.route = route
    this.document
    this.on_delete_func
    pages[this.route.toLowerCase()] = this
  }

  html(code) {
    this.html = code
  }
  css(code) {
    this.css = code
  }
  delete_animation(code) {
    this.delete_anim = code
  }
  spawn_animation(code) {
    this.create_anim = code
  }

  image(path) {
    return "https://blockcoin.social/assets/" + path
  }

  spawn() {
    if (this.create_anim !== undefined) {
      const newStyle = document.createElement("style");
      newStyle.innerHTML = this.create_anim;

      this.document.appendChild(newStyle);
      for (let child of this.document.children) {
        if (child.tagName.toLowerCase() == 'div') {
          child.style.animation = 'spawn 1s'
        }
      }
    }
  }

  on_delete(func) {
    this.on_delete_func = func
  }

  delete() {
    try {
      if (typeof this.on_delete_func == "function") { this.on_delete_func() }
    } catch (e) {
      console.log("Error", e.stack);
      console.log("Error", e.name);
      console.log("Error", e.message);
    }
    pages[this.route.toLowerCase()] = undefined


  }



  clear(except) {
    const elems = document.body.children;
    if (!Array.isArray(except)) {
      except = [];
    }
    except.push("noscript");
    except.push("script");
    except.push("div");
    except.push("style");
    except.push("notification");
    const index = except.indexOf("navbar");
    if (index > -1) {
      except.splice(index, 1);
    }
    var bodyChildren = document.body.children;

    for (var i = bodyChildren.length - 1; i >= 0; i--) {
      var child = bodyChildren[i];
      if (except.indexOf(child.tagName.toLowerCase()) === -1) {
        if (pages[child.tagName.toLowerCase()] != undefined) {
          try {
            pages[child.tagName.toLowerCase()].delete()
            document.body.removeChild(child);
          } catch {
            document.body.removeChild(child);
          }

        } else {
          document.body.removeChild(child);
        }

      }
    }

  }

  on_render(func) {
    this.on = func
  }

  render() {
    if (document.getElementsByTagName(this.route.toLowerCase()).length == 0) {
      const newDiv = document.createElement(this.route.toLowerCase());
      newDiv.innerHTML = this.html
      document.body.appendChild(newDiv);
      const newStyle = document.createElement("style");
      newStyle.innerHTML = this.css
      newDiv.appendChild(newStyle)
      this.document = newDiv
      this.spawn()
      pages[this.route.toLowerCase()] = this
      try {
        if (typeof this.on == "function") { this.on() }
      } catch (e) {
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
      }

    }
  }
}
export class Router {
  constructor() {
    this.routes = {};
    this.errors = {};
  }

  registerRoute(endpoint, filePath) {
    this.routes[endpoint] = filePath;
  }

  registerError(error, filePath) {
    this.errors[error] = filePath;
  }

  navigateError(code) {
    if (CanNavigate == false) { return "" }

    const functionpage = this.errors[code];
    history.pushState({}, null, "/" + code);
    if (functionpage) {
      try {
        if (typeof functionpage === 'function') {
          functionpage(this)
        } else {
          for (const i in functionpage) {
            functionpage[i](this)
          }
        }
      } catch (error) {
        console.error(`Error loading module for code ${code}:`, error);
      }
    } else {
      console.error(`No handler registered for error: ${code}`);
    }
  }

  navigateTo(endpoint, first) {
    if (CanNavigate == false) { return "" }
    if (window.location.pathname == endpoint && first != 1) { return "" }
    const route = endpoint.split("/")[1]
    history.pushState({}, null, endpoint);
    const functionpage = this.routes[route];

    if (functionpage) {
      try {
        if (typeof functionpage === 'function') {
          functionpage(this)
        } else {
          for (const i in functionpage) {
            functionpage[i](this)
          }
        }

      } catch (error) {
        console.error(`Error loading module for endpoint ${endpoint}:`, error);
      }
    } else {
      this.navigateError(404)
      console.error(`No handler registered for endpoint: ${endpoint}`);

    }
  }

  start() {
    const currentEndpoint = window.location.pathname;
    this.navigateTo(currentEndpoint, 1);
  }
}

export class Module {
  constructor(name, parent) {
    this.name = name
    this.parent_div = parent
    this.div
  }

  html(code) {
    this.html = code
  }
  css(code) {
    this.css = code
  }

  parent(html) {
    this.parent_div = html
  }

  delete_animation(code) {
    this.delete_anim = code
  }
  spawn_animation(code) {
    this.create_anim = code
  }

  image(path) {
    return "https://blockcoin.social/assets/" + path
  }

  on_render(func) {
    this.on = func
  }

  delete() {
    const newStyle = document.createElement("style");
    newStyle.innerHTML = this.delete_anim;
    this.div.appendChild(newStyle);

    this.div.style.animation = 'delete 1s';

    if (this.delete_anim == undefined) {
      this.div.remove();
      return ""
    }

    const self = this;
    var handler = function () {
      self.div.removeEventListener("animationend", handler, false);
      self.div.remove();
    };

    self.div.addEventListener("animationend", handler, false);
  }

  spawn() {
    const newStyle = document.createElement("style");
    newStyle.innerHTML = this.create_anim;
    this.div.appendChild(newStyle);
    this.div.style.animation = 'spawn 1s'
  }

  render(first) {
    const newDiv = document.createElement(this.name.toLowerCase());
    newDiv.innerHTML = this.html
    console.log(first)
    if (first == true && this.parent_div.firstChild !== null) {
      this.parent_div.insertBefore(newDiv, this.parent_div.firstChild);
    } else {
      this.parent_div.appendChild(newDiv);
    }
    const newStyle = document.createElement("style");
    newStyle.innerHTML = this.css
    newDiv.appendChild(newStyle)
    this.div = newDiv
    this.spawn()
    if (typeof this.on == "function") { this.on() }
  }
}