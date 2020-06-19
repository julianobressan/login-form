const fields = document.querySelectorAll("[required]")

function validateField(field) {

    function verifyErrors() {
        let foundError = false;
        for(let error in field.validity) {
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            email: {
                valueMissing: "E-mail is required.",
                typeMismatch: "Please, enter a valid e-mail address."
            },
            password: {
                valueMissing: "Password is required.",
            }
        }
        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {
        const error = verifyErrors()
        if(error) {
            const message = customMessage(error)
            field.style.borderColor = "var(--error-color)"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "var(--primary-color)"
            setCustomMessage()
        }
    }
}

function customValidation(event) {
    const field = event.target
    const validation = validateField(field)
    validation()
}

for( field of fields ){
    field.addEventListener("invalid", event => { 
        // hide default bubble of Chrome
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}

