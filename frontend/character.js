
(() => {
  const stage = document.getElementById("sizuCharacter");
  const emotionLabel = document.getElementById("characterEmotion");

  if (!stage) return;

  stage.innerHTML = `
    <div class="robot" id="robot">
      <div class="robot-aura"></div>

      <div class="robot-neck"></div>

      <div class="robot-head" id="robotHead">
        <div class="head-side left"></div>
        <div class="head-side right"></div>

        <div class="robot-face">
          <div class="forehead-line"></div>

          <div class="eyebrows">
            <span class="eyebrow-left"></span>
            <span class="eyebrow-right"></span>
          </div>

          <div class="eyes">
            <span class="eye"><i></i></span>
            <span class="eye"><i></i></span>
          </div>

          <div class="nose-plate"></div>
          <div class="robot-mouth" id="robotMouth">
            <span></span>
          </div>

          <div class="chin-line"></div>
        </div>

        <div class="ear left-ear"></div>
        <div class="ear right-ear"></div>
      </div>

      <div class="robot-shoulders">
        <div class="shoulder left-shoulder"></div>
        <div class="shoulder right-shoulder"></div>
      </div>

      <div class="robot-arms">
        <div class="arm left-arm">
          <div class="arm-joint"></div>
          <div class="robot-hand"></div>
        </div>

        <div class="arm right-arm">
          <div class="arm-joint"></div>
          <div class="robot-hand"></div>
        </div>
      </div>

      <div class="robot-torso">
        <div class="chest-panel">
          <div class="chest-line"></div>
          <div class="chest-core"></div>
          <div class="chest-detail"></div>
        </div>
      </div>

      <div class="robot-waist"></div>
    </div>
  `;

  const robot = document.getElementById("robot");
  const head = document.getElementById("robotHead");
  const mouth = document.getElementById("robotMouth");
  const eyes = [...stage.querySelectorAll(".eye")];
  const eyebrows = [...stage.querySelectorAll(".eyebrow-left, .eyebrow-right")];

  let speakingTimer = null;
  let currentEmotion = "normal";

  const emotionText = {
    normal: "SYSTEM ONLINE",
    happy: "HAPPY",
    angry: "INTENSE",
    sad: "SAD",
    sarcastic: "SARCASTIC",
    thinking: "THINKING",
    listening: "LISTENING",
    speaking: "SPEAKING"
  };

  function setEmotion(emotion = "normal") {
    const allowed = Object.keys(emotionText);
    if (!allowed.includes(emotion)) emotion = "normal";

    currentEmotion = emotion;
    robot.dataset.emotion = emotion;

    if (emotionLabel) {
      emotionLabel.textContent = emotionText[emotion];
    }

    eyebrows.forEach((b) => {
      b.style.transform = "";
    });

    switch (emotion) {
      case "happy":
        mouth.classList.add("smile");
        break;
      case "angry":
        eyebrows[0].style.transform = "rotate(18deg)";
        eyebrows[1].style.transform = "rotate(-18deg)";
        break;
      case "sad":
        mouth.classList.add("sad-mouth");
        break;
      case "sarcastic":
        mouth.classList.add("smirk");
        break;
      case "thinking":
        head.style.transform = "rotate(5deg)";
        break;
      case "listening":
        eyes.forEach((eye) => eye.classList.add("focused"));
        break;
    }
  }

  function resetFace() {
    mouth.className = "robot-mouth";
    eyes.forEach((eye) => eye.classList.remove("focused"));
    head.style.transform = "";
  }

  function changeEmotion(emotion = "normal") {
    resetFace();
    setEmotion(emotion);
  }

  function setSpeaking(active) {
    clearInterval(speakingTimer);

    if (active) {
      changeEmotion("speaking");

      let open = false;
      speakingTimer = setInterval(() => {
        open = !open;
        mouth.classList.toggle("mouth-open", open);
      }, 130);
    } else {
      clearInterval(speakingTimer);
      resetFace();
      setEmotion("normal");
    }
  }

  function lookAt(direction) {
    if (direction === "left") {
      head.style.transform = "rotate(-8deg)";
    } else if (direction === "right") {
      head.style.transform = "rotate(8deg)";
    } else {
      head.style.transform = "";
    }
  }

  window.SIZUCharacter = {
    setEmotion: changeEmotion,
    setSpeaking,
    lookAt,
    getEmotion: () => currentEmotion
  };

  setEmotion("normal");
})();
