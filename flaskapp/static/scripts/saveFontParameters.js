class SaveFontParameters {

  formHTMLElement;
  textareaHTMLElement;
  submitElement;

  /**
   * @param {String} formQuerySelector HTMLFormElement query selector
   * */
  constructor(formQuerySelector) {

    if (!window.fetch) console.error("no fetch support in this browser");

    this.formHTMLElement = document.querySelector(formQuerySelector);

    this.textareaHTMLElement = this.formHTMLElement.querySelector('textarea');

    this.submitElement = this.formHTMLElement.querySelector("[type='submit']");

    this.submitElement.addEventListener("click", (ev) => {
      ev.preventDefault();

      this._sendFontParameters();
    });

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();

        this._sendFontParameters();
      }
    })
  }

  _sendFontParameters() {
    const text = this.textareaHTMLElement.value;
      const variationSettingsValue = this.textareaHTMLElement.style.fontVariationSettings;

      if (text.length > 0 && variationSettingsValue.length > 0) {

        const variationSettingsParametersMatches = [...variationSettingsValue.matchAll(/\"[^"]*\"\s(\d+\.?\d*)/gm)];

        const wght = variationSettingsParametersMatches[0][1];
        const CNTR = variationSettingsParametersMatches[1][1];
        const slnt = variationSettingsParametersMatches[2][1];

        this._fontParametersRequest(text, wght, CNTR, slnt);
      }
  }

  _fontParametersRequest(text, value1, value2, value3) {

    window.fetch("/save", {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text:   text,
        value1: value1,
        value2: value2,
        value3: value3,
      })
    }).then(valueFromFlaskApp => {
      return valueFromFlaskApp.json().then(JSONFromValueFromFlaskApp => {
        console.info(JSONFromValueFromFlaskApp);
      })
    })
  }
}

new SaveFontParameters("#font-viewer");