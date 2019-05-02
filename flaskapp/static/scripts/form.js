class TextAreaContentChangeListener {

    _userIdValue = "";

    constructor(textAreaQuerySelector) {

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
        console.log(this._userIdValue)
    }
}

new TextAreaContentChangeListener("#user_input");
