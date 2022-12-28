const $ = (selector = "body") => {
    let self = (typeof selector != "string") ? selector : document.querySelector(selector);

    return {
        ...self,
        get: () => {
            return self;
        },
        on: (event, event_handler) => {
            self.addEventListener(event, event_handler);
            return $(self);
        },
        addClass: (class_name) => {
            self.classList.add(class_name);
            return $(self);
        },
        removeClass: (class_name) => {
            self.classList.remove(class_name);
            return $(self);
        },
        clone: () => {
            return $(self.cloneNode(true));
        },
        find: (selector) => {
            return $(self.querySelector(selector));
        },
        findAll: (selector) => {
            return self.querySelectorAll(selector);
        },
        val: (value) => {
            if(value){
                self.value = value;
            }
            return self.value;
        },
        text: (value) => {
            if(value){
                self.innerText = value;
            }
            return self.innerText;
        },
    }
}