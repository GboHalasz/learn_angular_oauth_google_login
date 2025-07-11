/* Login - Registration page validation JS */

//the browser extracts the input element by id!!
class MyFormError extends Error {
    constructor(...params) {
        super(...params);
        this.name = "MyFormError";
    }
}

const regValidation = function () {
    const myRegForm = {
        inpFieldsById: {
            regUName: {  //this must be equal with the id of input element!!!
                storageName: "name",  //do not add name if you don't want to store the data (fe. for confirmed password)
                value: "",                          //assigned on focusout
                isValid: function (val) {
                    return val && (val.length >= 3)  //trim value before checking
                }
            },
            regEmail: {
                storageName: "email",
                value: "",
                isValid: function (val) {
                    // return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(val)) //from w3resource
                    //regex from masteringjs.io
                    return (/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(val))
                }
            },
            regPass1: {
                storageName: "password",
                value: "",
                isValid: function (val) {
                    regPass2.value = "";                     //these are for the case when
                    myRegForm.inpFieldsById.regPass2.value = ""  //confirm password was given first
                    return val && (val.length >= 6);
                }
            },
            regPass2: {
                value: "",
                isValid: function (val) {
                    return (val === regPass1.value)
                }
            },
            logEmail: {
                value: "",
                isValid: function (val) {
                    return !!val
                }
            },
            logPassword: {
                value: "",
                isValid: function (val) {
                    return !!val
                }
            }
        },

        registerBtnCallback: null,

        setRegisterBtnCallback: function (callbackFn) {
            if (typeof callbackFn == "function") {
                this.registerBtnCallback = callbackFn;
            } else {
                throw new Error("Not a function!");
            }
        },

        enableRegBtn: function () {
            regBtn.classList.remove("disabled");
            regBtn.removeAttribute("aria-disabled");
        },

        disableRegBtn: function () {
            regBtn.classList.add("disabled");
            regBtn.setAttribute("aria-disabled", "true");
        },

        sha512: async function (str) {
            return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
                return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
            });
        },

        setValueFromInp: async function (inp) {
            let validData = this.checkField(inp);
            if (inp.type === "password" && validData) {
                await this.sha512(validData).then(x => {
                    this.inpFieldsById[inp.id].value = x
                });
                validData = "";
                return
            }
            this.inpFieldsById[inp.id].value = validData;
        },

        showWarnText: function (inp) {
            const warnBox = window[inp.id + "Warn"];
            warnBox.classList.remove("invisible");
            if (!warnBox.textContent || !inp.ariaInvalid) {
                inp.classList.add("is-invalid")
                inp.setAttribute("aria-invalid", "true");
                inp.focus();
                warnBox.textContent = inp.dataset.error;
            }
        },

        hideWarnText: function (inp) {
            inp.classList.remove("is-invalid");
            inp.removeAttribute("aria-invalid");
            window[inp.id + "Warn"].classList.add("invisible");
            window[inp.id + "Warn"].textContent = "";
        },

        checkField: function (inp) {
            try {
                const val = inp.value.trim()
                if (!inp.value.trim()) {
                    throw new MyFormError("The field is empty! Mandatory field!")
                }
                if (this.inpFieldsById[inp.id].isValid && !this.inpFieldsById[inp.id].isValid(val)) {
                    throw new MyFormError("The given value is invalid!")
                }
                this.hideWarnText(inp);
                return val;
            } catch (err) {
                if (err.name === "MyFormError") {
                    this.showWarnText(inp);
                }
                console.error(`${err.name}: ${err.message}`);
                return "";
            }
        },

        regValuesAreReady: function () {
            try {
                for (const key in this.inpFieldsById) {
                    if (key.includes("reg") && !this.inpFieldsById[key].value) {
                        return false
                    }
                }
                return true
            } catch (err) {
                console.error(`${err.name}: ${err.message}`);
            }

        },

        resetFields: function () {
            try {
                for (const field in this.inpFieldsById) {
                    window[field].value = ""
                }
            } catch (err) {
                console.error(`${err.name}: ${err.message}`);
            }
        },

        resetValues: function () {
            try {
                for (const field in this.inpFieldsById) {
                    this.inpFieldsById[field].value = ""
                }
            } catch (err) {
                console.error(`${err.name}: ${err.message}`);
            }
        },

        dataToJson: function () {
            let user = {};
            try {
                for (const field in myRegForm.inpFieldsById) {
                    if (myRegForm.inpFieldsById[field].storageName) {
                        user = {
                            ...user,
                            [myRegForm.inpFieldsById[field].storageName]: myRegForm.inpFieldsById[field].value
                        }
                    }
                }
                return JSON.stringify(user);
            } catch (err) {
                console.error(`${err.name}: ${err.message}`);
            }
        },

        handleRegBtnClick: function () {
            if (myRegForm.regValuesAreReady()) {
                myRegForm.registerBtnCallback();
                myRegForm.resetFields();
                myRegForm.resetValues();
                myRegForm.disableRegBtn();
            } else {
                throw new Error("Input validation logic broken!");
            }
        },

        addListenerToRegBtn: function () {
            regBtn.addEventListener("click", this.handleRegBtnClick)
        },

        removeListenerToRegBtn: function () {
            regBtn.removeEventListener("click", this.handleRegBtnClick )
        },

        startValidation: function (event, regBtnCallback) {
            try {
                this.setRegisterBtnCallback(regBtnCallback)
                if (Object.keys(this.inpFieldsById).length !== 0) {
                    for (const field in this.inpFieldsById) {
                        window[field].addEventListener(event, async function () {
                            await myRegForm.setValueFromInp(this);
                            if (myRegForm.regValuesAreReady()) {
                                myRegForm.addListenerToRegBtn();
                                myRegForm.enableRegBtn();
                            } else {
                                myRegForm.disableRegBtn();
                                myRegForm.removeListenerToRegBtn();
                            }
                        })
                    }
                }

            } catch (err) {
                console.error(`${err.name}: ${err.message}`);
            }
        },
    }

    return myRegForm
}
