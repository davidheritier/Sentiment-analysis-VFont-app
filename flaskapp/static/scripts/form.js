class TextAreaContentChangeListener {

    _userIdValue = "";

    constructor(textAreaQuerySelector) {

        if (!window.fetch) console.error("no fetch support in this browser");

        this.userId = document.querySelector(textAreaQuerySelector);

        this.userId.addEventListener("keyup", () => {
            const new_userIdValue = this.userId.value;

            if (this._userIdValue !== new_userIdValue) this.userIdValue = new_userIdValue
        });
    }

    set userIdValue(value) {
        this._userIdValue = value;
        this.sendNewUserIdValue()
    }

    sendNewUserIdValue() {

        const valueToSend = this._userIdValue;

        window.fetch("/textsentiment", {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value: valueToSend})
        }).then(value => {
            console.log(value);
            return value.json().then(value1 => {
                console.log(value1)
            })
        })
    }
}

new TextAreaContentChangeListener("#user_input");
