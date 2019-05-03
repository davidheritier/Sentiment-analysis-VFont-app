class TextAreaContentChangeListener {

    _userIdValue = "";
    textAreaHTMLElement;

    constructor(textAreaQuerySelector) {

        if (!window.fetch) console.error("no fetch support in this browser");

        this.textAreaHTMLElement = document.querySelector(textAreaQuerySelector);

        this.textAreaHTMLElement.addEventListener("keyup", () => {
            const new_userIdValue = this.textAreaHTMLElement.value;

            if (this._userIdValue !== new_userIdValue) this.userIdValue = new_userIdValue
        });
    }

    set userIdValue(value) {
        this._userIdValue = value;
        this._sendNewUserIdValue()
    }

    _sendNewUserIdValue() {

        const valueToSend = this._userIdValue;

        window.fetch("/textsentiment", {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: valueToSend
            })
        }).then(value => {
            return value.json().then(value1 => {
                console.info(value1)
            })
        })
    }
}

new TextAreaContentChangeListener("#user_input");