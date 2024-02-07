
/**
 * 
 * @param {HTMLElement} $parent
 * @param {HTMLElement} $
 */
function resetAllNonClicked($, $parent) {
    for (const child of $parent.children) {
        if (child != $) {
            if (child.hasAttribute("selected"))
                child.removeAttribute("selected")
        } else {
            child.setAttribute("selected", "")
        }
    }
}

async function require(path) {
    return await fetch(path)
}

/**
 * 
 * @param {any[]} $data 
 * @param {string} $parent - querySelected 
 */
function setProjectData($data, $parent) {
    const element = document.querySelector($parent)
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }

    if (element && Array.isArray($data)) {
        for (const entry of $data) {
            const div = document.createElement("div");
            div.className = "project-card"

            const img = document.createElement("img")
            img.src = entry.thumbnail
            img.alt = entry.title
            img.className = "project-thumbnail"
            div.appendChild(img)

            const h1 = document.createElement("h1")
            h1.className = "card__heading"
            h1.innerText = entry.title
            div.appendChild(h1)

            const p = document.createElement('p')
            p.className = "card__text"
            p.innerText = entry.date
            div.appendChild(p)

            div.id = `project_${entry.id}`
            element.appendChild(div)
        }
    }
}

var seletedCat;

/**
 * 
 * @param {string} params 
 * @returns {{(key) => void, () => string}}
 */
function handleSearchParams() {
    var urlParams = new URLSearchParams(window.location.search);



    const setURLParam = (key) => {
        urlParams.forEach((_, key) => urlParams.delete(key))
        urlParams.set(key, "")
        var urlBase = window.location.href.split('?')[0]
        const newUrl = (urlBase + '?' + urlParams.toString()).slice(0, -1);
        window.history.pushState({ path: newUrl }, '', newUrl)
    }
    const getURLParam = () => {
        const w = [...urlParams.keys()][0]
        return w;
    }
    return [setURLParam, getURLParam]
}

const [setParams, param] = handleSearchParams()

window.addEventListener('popstate', () => {
    const t = window.location.search.slice(1)
    Router.filter({ id: decodeURIComponent(t) })
})


require('./project_data.json').then(async resp => await resp.json()).then($data => {
    setProjectData($data, ".projects-container")
    Router.setDefault("All", ".project-category-urls")
    Router.setData($data);
})

class Router {

    /**@type {any[]} */
    static $data

    /**
     * 
     * @param {string} $id - id of nested one what will be set as clicked
     * @param {string} $query - parent element
     */
    static setDefault($id, $query) {
        var parent = document.querySelector($query);
        if (parent) {
            var element = parent.querySelector(`#${$id}`)
            if (element) {
                Router.route(element)
            }
        }
    }

    /**
     * 
     * @param {any[]} $data 
     */
    static setData($data) {
        this.$data = $data;
    }

    /**
     * 
     * @param {HTMLElement} $ 
     */
    static filter($) {
        seletedCat = $.id;
        if ($.id.toLocaleLowerCase() !== 'all') {
            if (seletedCat && this.$data) {
                const data = this.$data.filter($d => {
                    /** @type { {categories: string[]} } */
                    const { categories } = $d
                    return categories.some(v => {
                        return v.toLowerCase() === seletedCat.toLowerCase();
                    })
                })
                setProjectData(data, ".projects-container")
            }
        } else {
            if (this.$data) {
                setProjectData(this.$data, ".projects-container")
            }
        }
        setParams(seletedCat)
    }

    /**@param {HTMLElement} $ */
    static route($) {
        if (!$.getAttribute("selected")) {
            resetAllNonClicked($, $.parentElement)
            this.filter($)
        }
    }
}


