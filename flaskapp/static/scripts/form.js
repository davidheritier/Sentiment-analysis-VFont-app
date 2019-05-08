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

  _setCssFontVariablePropertyOfTextarea(JSONSentimentAnalysis) {
    // polarity = {-1, 1}
    const polarity = JSONSentimentAnalysis.polarity;
    // subjectivity = {0, 1}
    const subjectivity = JSONSentimentAnalysis.subjectivity;

    // weight = 500 - ({-1, 1} * {0, 1} * 500) = 500 + {-500, 500} = {0, 1000}
    const value1 = 500 + (polarity * subjectivity * 500);

    // contrast = 500 + ({-1, 1} * 500) = 500 + {-500, 500} = {0, 1000}
    const value2 = 500 + (polarity * 500);

    // slant = {0, 1} * 1000 = {0, 1000}
    const value3 = subjectivity * 1000;

    this.textAreaHTMLElement.style.fontVariationSettings = `'wght'${value1}, 'CNTR'${value2}, 'slnt'${value3}`;
    this.textAreaHTMLElement.style.transition = "250ms";
  }
}

new TextareaContentChangeListener("#user_input");