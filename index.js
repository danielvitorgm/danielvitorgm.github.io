const attributeName = "data-section"
const className = "active"
const sections = document.querySelectorAll("section")
const buttons = document.querySelectorAll(`[${attributeName}]`)
let currentSection = 1

const changeButtonClasses = () => {
    for(let i = 0; i < buttons.length; i++){
        const button = buttons[i]

        if(parseInt(button.getAttribute(attributeName)) === currentSection){
            button.classList.add(className)
        }else{
            button.classList.remove(className)
        }
    }
}

const visibilityOf = (element) => {
    const {y, height} = element.getBoundingClientRect()

    if(y > 0 && y < window.innerHeight){
        return y / window.innerHeight
    }

    if(y <= 0 && y + height > window.innerHeight){
        return 100
    }

    if(y < 0 && y + height < window.innerHeight){
        if(y + height < 0){
            return 0
        }

        if(y + height > 0){
            return (y + height) / window.innerHeight
        }

        return 50
    }
}

for(let i = 0; i < buttons.length; i ++){
    const button = buttons[i]

    button.addEventListener("click", () => {
        const section = sections[parseInt(button.getAttribute(attributeName)) - 1]
        const sectionDistance = section.getBoundingClientRect().y
        window.scrollTo(0, sectionDistance + window.scrollY)
    })
}

const copyright = document.getElementById("copyright")
copyright.innerText = `${new Date().getFullYear()} Copyright all rights reserved`

window.addEventListener("scroll", () => {
    let currentSectionVisibility = visibilityOf(sections[currentSection - 1])
    const minimumVisibility = 80
    for(let i = 0; i < sections.length; i++){
        const visibility = visibilityOf(sections[i])
        if(visibility > currentSectionVisibility && visibility >= minimumVisibility){
            currentSection = i + 1
            currentSectionVisibility = visibility
        }
    }
    changeButtonClasses()
})