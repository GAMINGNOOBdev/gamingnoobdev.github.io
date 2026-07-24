const blogapi = {
  replacementTokens: {},
  URL_PREFIX: "https://api.gamingnoob.dev/v1",

  init() {
    blogapi.fetchJson(`${blogapi.URL_PREFIX}/blog/posts`).then((posts) => {
      posts.forEach((element) => blogapi.postElement(element));
    });
  },

  postElement(element) {
    blogapi.post(element.title, element.content, element.date, element.id);
  },

  post(title, content, date, id) {
    const container = document.getElementById("post-container");
    const post = document.createElement("div");
    post.className = "post";

    const localTime = new Date(date + " UTC").toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });

    post.innerHTML = `
            <span class="header">${blogapi.formatPost(title)}</span>
            <br/>
            <div class="body">${blogapi.formatPost(content)}</div>
            <br/>
            <span class="footer">Posted at ${localTime}</span>
        `;

    container.appendChild(post);
    container.appendChild(document.createElement("br"));
  },

  escapeText(str) {
    if (!str) return "";

    return str
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  formatPost(contents, ignoreReplacements = false) {
    let fmt = blogapi.escapeText(contents);
    fmt = fmt.replace(
      /\[color=([a-zA-Z0-9#,\(\)\s]+)\]([\s\S]*?)\[\/color\]/g,
      (match, colorValue, textInside) => {
        return `<span style="color: ${colorValue};">${textInside}</span>`;
      },
    );

    if (ignoreReplacements) return fmt;

    for (let [key, val] of Object.entries(this.replacementTokens))
      fmt = fmt.replace(new RegExp(key, "g"), val);

    return fmt;
  },

  async fetchJson(path) {
    let result = {};
    await fetch(path)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => (result = data));
    return result;
  },
};
