class RedditComment {
  #container;

  constructor(container) {
    if (!container || !(container instanceof HTMLElement))
      throw new Error("Container must be a DOM Node");
    this.#container = container;
  }

  /**
   *
   * @param {string} text
   */
  addComment(text) {
    const comment = new MyComment(this.#container, 0);
    comment.updateText(text);
    console.log("parentcomment", comment);
    return comment;
  }
}

class MyComment {
  #parent;
  #commentDiv;
  #level;

  constructor(parent, level) {
    if (!parent || !(parent instanceof HTMLElement))
      throw new Error("Parent must be a DOM Node");
    this.#parent = parent;
    this.#level = level;

    this.#commentDiv = document.createElement("div");
    this.#commentDiv.classList.add("comment");
    this.#commentDiv.style.setProperty("--level", this.#level);
    this.#parent.appendChild(this.#commentDiv);
  }

  /**
   *
   * @param {string} text
   */
  updateText(text) {
    this.#commentDiv.innerText = text;
    this.addReplyButton();
  }

  /**
   * @description create AddReply Button
   */
  addReplyButton() {
    let replyButton = document.createElement("div");
    replyButton.innerText = "Add Reply";
    replyButton.classList.add("reply");
    this.#commentDiv.appendChild(replyButton);

    replyButton.addEventListener("click", (e) => {
      this.replyClicked(e);
    });
  }

  /**
   *
   * @param {*} e
   */
  replyClicked(e) {
    e.preventDefault();
    //e.stopPropagation();
    const inputBox = this.createInputBox(e.target);
    e.target.append(inputBox);
  }

  /**
   *
   * @param {HTMLDivElement} parentContainer
   * @returns {HTMLDivElement}
   * @description create a inputConatiner
   */
  createInputBox(parentContainer) {
    //console.log({ parentContainer });
    let inputContainer = document.createElement("div");
    let textInput = document.createElement("input");
    let submitButton = document.createElement("button");

    inputContainer.setAttribute("class", "inputcontainer");
    textInput.setAttribute("class", "textinput");
    submitButton.setAttribute("class", "submitButton");
    submitButton.innerText = "submit";
    submitButton.type = "submit";

    inputContainer.appendChild(textInput);
    inputContainer.appendChild(submitButton);

    textInput.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    submitButton.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      this.submitHandler(e, textInput, inputContainer, parentContainer);
    });

    return inputContainer;
  }

  /**
   *
   * @param {*} e
   * @param {HTMLInputElement} input
   * @param {HTMLDivElement} inputContainer
   * @param {HTMLDivElement} parentContainer
   */
  submitHandler(e, input, inputContainer, parentContainer) {
    parentContainer.removeChild(inputContainer);
    console.log("Hello: ", input.value);
    this.addReply(input.value);
  }

  /**
   *
   * @param {string} text
   */
  addReply(text) {
    if (!text) return;
    const comment = new MyComment(this.#commentDiv, this.#level + 1);
    comment.updateText(text);
    console.log("replyComment", comment);
    return comment;
  }
}

const container = document.querySelector(`#comments`);

const redditComContainer = new RedditComment(container);
const c1 = redditComContainer.addComment("Hello");
const c2 = redditComContainer.addComment("Good Morning ");

const c3 = c1.addReply("Java");
const c4 = c3.addReply("Script");
c3.updateText("Hi");

const c5 = c2.addReply("Universe");
// const c6 = c5.addReply("Aliens");
// c6.updateText("Humans");
