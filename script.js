const wrapperEl = document.querySelector(".wrapper");

var activated = false;

const themes = [
  "beach",
  "fire",
  "fountain",
  "lavender",
  "river",
  "rain",
  "clouds",
  "mountains",
  "earth",
];

const musics = [
  "lofi",
  "acapella",
  "jazz",
  "folk",
  "experimental",
  "synthwave",
  "reggae",
  "piano",
];

function toggleActive(e, cn) {
  if (activated === false) {
    document
      .querySelectorAll(`.${cn}`)
      .forEach((opt) => opt.classList.add("activated"));

    document.querySelector(".toolbar").classList.add("activated");

    activated = true;
  }
  if (e) {
    document
      .querySelectorAll(`.${cn} .opt`)
      .forEach((o) => o.classList.remove("selected"));
    e.currentTarget.classList.add("selected");
  }
}

function activateTheme(filename, e, cn) {
  toggleActive(e, cn);

  const videoEl = `
    <div class="theme">
        <video src="./assets/videos/${filename}.mp4" autoplay loop muted></video>
        <audio id="sound" src="./assets/sounds/${filename}.mp3" autoplay loop></audio>
    </div>`;

  wrapperEl.innerHTML = "";
  wrapperEl.insertAdjacentHTML("afterbegin", videoEl);
}

function activateMusic(filename, e, cn) {
  toggleActive(e, cn);

  const oldAudioEl = document.querySelector("#music");

  oldAudioEl !== null && oldAudioEl.remove();

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<audio id="music" src="./assets/music/${filename}.mp3" autoplay loop></audio>`
  );
}

function displayOptions(array, cn) {
  let opt = "";
  const option = document.querySelector(`.options.${cn}`);

  array.reverse().forEach((item) => {
    if (cn === "themes") {
      opt = `<span id="${item}" class="opt" onclick="activateTheme('${item}', event, 'themes')">${item}</span>`;
    } else if (cn === "musics") {
      opt = `<span id="${item}" class="opt" onclick="activateMusic('${item}', event, 'musics')">${item}</span>`;
    }

    option.insertAdjacentHTML("afterbegin", opt);
  });
}

function handleBrightness(e) {
  const value = e.currentTarget.value;
  document
    .querySelector(".theme")
    .setAttribute("style", `filter: brightness(${value})`);
}

function handleSoundVolume(e) {
  const value = e.currentTarget.value;
  document.querySelector("#sound").volume = value;
}

function handleMusicVolume(e) {
  const value = e.currentTarget.value;
  document.querySelector("#music").volume = value;
}

function handleToolbarVisibility() {
  let mousestop;

  document.body.addEventListener("mousemove", () => {
    document.querySelector(".start").style.opacity = 1;
    document.querySelector(".toolbar").style.opacity = 1;
    document.querySelectorAll(".options").forEach((t) => (t.style.opacity = 1));

    if (mousestop) clearTimeout(mousestop);

    mousestop = setTimeout(() => {
      setTimeout(() => {
        document.querySelector(".start").style.opacity = 0;
        document.querySelector(".toolbar").style.opacity = 0;
        document
          .querySelectorAll(".options")
          .forEach((t) => (t.style.opacity = 0));
      }, 2000);
    }, 1000);
  });

  document.body.addEventListener("mouseleave", () => {
    document.querySelector(".start").style.opacity = 0;
    document.querySelector(".toolbar").style.opacity = 0;
    document.querySelectorAll(".options").forEach((t) => (t.style.opacity = 0));
  });
}

(() => {
  displayOptions(themes, "themes");
  displayOptions(musics, "musics");

  handleToolbarVisibility();
})();
