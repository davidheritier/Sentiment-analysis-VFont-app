class TextareaContentChangeListener {

    _textAreaValue = "";
    textAreaHTMLElement;

    constructor(textareaQuerySelector) {

        if (!window.fetch) console.error("no fetch support in this browser");

        this.textAreaHTMLElement = document.querySelector(textareaQuerySelector);

        this.textAreaHTMLElement.addEventListener("keyup", () => {
            const newTextAreaValue = this.textAreaHTMLElement.value;

            if (this._textAreaValue !== newTextAreaValue) this.textAreaValue = newTextAreaValue
        });
    }

    set textAreaValue(value) {
        this._textAreaValue = value;
        this._sendNewTextareaValue()
    }

    _sendNewTextareaValue() {

        const valueToSend = this._textAreaValue;

        window.fetch("/textsentiment", {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: valueToSend
            })
        }).then(valueFromFlaskApp => {
            return valueFromFlaskApp.json().then(JSONFromValueFromFlaskApp => {
                console.info(JSONFromValueFromFlaskApp);

                this._setCssFontVariablePropertyOfTextarea(JSONFromValueFromFlaskApp)
            })
        })
    }

    _setCssFontVariablePropertyOfTextarea(JSONSentimentAnalyse) {

        const polarity      = JSONSentimentAnalyse.polarity;
        const subjectivity  = JSONSentimentAnalyse.subjectivity;

        //  weight = str(int((tb.sentiment.polarity * 100) * (tb.sentiment.subjectivity * 100) / 10))
        const value1 = (polarity * 100) * (subjectivity * 100) / 100;

        //  contrast = str(int(500 + (tb.sentiment.subjectivity / 2 * 1000)))
        const value2 = 500 + (subjectivity / 2 * 1000);

        //  slant = str(int(tb.sentiment.polarity * 1000))
        const value3 = polarity * 1000;

        this.textAreaHTMLElement.style.fontVariationSettings = `'wght'${value1}, 'CNTR'${value2}, 'slnt'${value3}`;
    }
}

new TextareaContentChangeListener("#user_input");