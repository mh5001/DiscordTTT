(function(){
  const script = document.createElement("script");
  script.src = "https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js";
  script.type = 'text/javascript';
  script.async = true;
  script.charset = "utf-8";
  document.body.appendChild(script);

  let prevMess = "";
  setInterval(function() {
    const call = document.querySelector("svg[name=VideoCamera]");
    const callButton = document.getElementById("gameCall");
    const lastMess = document.getElementsByClassName("message");

    if (lastMess[lastMess.length - 1].textContent !== prevMess) {
      prevMess = lastMess[lastMess.length - 1].textContent;
      const nickname = document.getElementsByClassName("username")[0].textContent;
      if (lastMess[lastMess.length - 1].getElementsByClassName("embed").length > 0) {
        const mess = prevMess.split("#");
        const embMess = lastMess[lastMess.length - 1].parentNode;

        const div = document.createElement("div");
        div.style = "display: flex; flex-flow: row; text-align: center; align-self: center;";

        const img = document.createElement("img");
        img.src = "https://i.imgur.com/qzkqUk2.png";

        const a = document.createElement("a");
        a.setAttribute("rel", "noreferrer");
        a.innerHTML = mess[1];
        a.style.color = "#fff";

        const callMess = document.createElement("div");
        callMess.setAttribute("class", "system-message ");
        callMess.appendChild(a);
        callMess.appendChild(document.createTextNode("⁪⁪ ⁫wanted a game."));

        const time = new Date();
        const timeText = "At " + time.getDate() + "/" + (time.getMonth() + 1) + " " + time.getHours() + ":" + time.getMinutes();
        const timeSpan = document.createElement("span");
        timeSpan.innerHTML = timeText;
        timeSpan.style = "color: hsla(0,0%,100%,.2); font-size: 0.75rem; font-weight: 400; margin-left: 6px;";

        embMess.innerHTML = "";

        div.appendChild(img);
        div.appendChild(callMess);
        div.appendChild(timeSpan);
        embMess.appendChild(div);

        if (nickname == mess[1]) {
          prevMess = "";
        }
      }
    }

    if (call !== null && callButton == null) {
      const img = document.createElement("img");
      img.id = "gameCall";
      img.src = "https://i.imgur.com/qzkqUk2.png";
      img.style = "opacity: 0.6";

      img.addEventListener("mouseenter", function() {
        img.style = "opacity: 0.8; cursor: pointer";
      });
      img.addEventListener("mouseleave", function() {
        img.style = "opacity: 0.6";
      });

      img.addEventListener("click", function() {
        try {
          execute(function() {
            const id = document.getElementsByClassName("selected")[0].getElementsByTagName("a")[0].href.split("/").slice(-1)[0];
            const queueMsg = InternalUtilities.WebpackModules.findByUniqueProperties(["enqueue"]);
            const otherPerson = document.getElementsByClassName("selected")[0].getElementsByClassName("channel-name")[0].innerHTML.split("<")[0];
            const username = document.getElementsByClassName("username")[0].textContent;

            queueMsg.enqueue({
              type: "send",
              message: {
                channelId: id,
                tts: false,
                embed: {
                  title: otherPerson + "#" + username + "#" + id,
                  color: 100000
                }
              }
            }, function(err) {
              if (!err.ok) return alert(err);
            });
          });
        } catch (err) {
          alert(err);
        }
      });

      call.parentNode.appendChild(img);
    }
  }, 1000);
})();
function execute(func) {
  const script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + func + ')();';
  document.body.appendChild(script);
  document.body.removeChild(script);
}
