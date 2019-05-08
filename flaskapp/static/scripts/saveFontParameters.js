class SaveFontParameters {

  formHTMLElement;
  textareaHTMLElement;
  submitElement;
  getFontButton;

  /**
   * @var _buttonStatus {"save" | "getFont"}
   * */
  _buttonStatus = "save";

  /**
   * @param {String} formQuerySelector HTMLFormElement query selector
   * */

  constructor(formQuerySelector) {

    if (!window.fetch) console.error("no fetch support in this browser");


    this.formHTMLElement = document.querySelector(formQuerySelector);

    this.textareaHTMLElement = this.formHTMLElement.querySelector('textarea');

    this.submitElement = this.formHTMLElement.querySelector("[type='submit']");

    this._createGetFontButton();

    this.submitElement.addEventListener("click", (ev) => {
      ev.preventDefault();

      this._sendFontParameters();
    });

    this.textareaHTMLElement.addEventListener("keyup", () => {
      if (this._buttonStatus === "getFont") this._setSubmitButtons("save")
    });

    // todo bug: button get font disparait
    // window.addEventListener("keydown", (e) => {
    //   if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    //     e.preventDefault();
    //
    //     this._sendFontParameters();
    //   }
    // })
  }

  _createGetFontButton() {
    this.getFontButton = document.createElement("button");

    this.getFontButton.className = "get-font-button";
    this.getFontButton.innerText = "get this font";
    this.getFontButton.style.display = "none";

    this.getFontButton.addEventListener("click", (e) => {
      e.preventDefault();

      window.location = `${window.location.origin}/getfont`;

      console.log("get font clicked")
    });

    this.formHTMLElement.appendChild(this.getFontButton)
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
        text: text,
        value1: value1,
        value2: value2,
        value3: value3,
      })
    }).then(valueFromFlaskApp => {
      return valueFromFlaskApp.json().then(JSONFromValueFromFlaskApp => {
        console.info(JSONFromValueFromFlaskApp);

        if (JSONFromValueFromFlaskApp.saved === true) {
          this._setSubmitButtons("getFont")
        }
      })
    })
  }

  /**
   * @param status {"save" | "getFont"}
   * */
  _setSubmitButtons(status) {
    if (status === "save") {
      this.submitElement.style.display = "block";
      this.getFontButton.style.display = "none";
      this._buttonStatus = "save"
    }
    if (status === "getFont") {
      this.submitElement.style.display = "none";
      this.getFontButton.style.display = "inline-block";
      this._buttonStatus = "getFont"
    }
  }
}

new SaveFontParameters("#font-viewer");