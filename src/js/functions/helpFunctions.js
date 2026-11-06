export function createScript(url, type) {
  if (!url) return;

  return new Promise((resolve, reject) => {
    const script = document.querySelector(`script[src="${url}"]`);

    if (script) {
      resolve(script);
    } else {
      const htmlScript = document.createElement("script");
      htmlScript.src = url;

      if (type) {
        htmlScript.type = type;
      }

      htmlScript.onload = () => {
        resolve(htmlScript);
      };
      htmlScript.onerror = () => {
        reject(new Error(`Не удалось загрузить скрипт: ${url}`));
      };

      document.head.appendChild(htmlScript);
    }
  });
}

export function slideUp(target, duration = 500, showmore = 0) {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent("slideUpDone", {
          detail: {
            target: target,
          },
        }),
      );
    }, duration);
  }
}
export function slideDown(target, duration = 500, showmore = 0) {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent("slideDownDone", {
          detail: {
            target: target,
          },
        }),
      );
    }, duration);
  }
}

export function createEl(tag, classes = "") {
  const item = document.createElement(tag);

  if (classes) {
    classes.split(" ").forEach((c) => {
      item.classList.add(c);
    });
  }

  return item;
}

export function countLinesInElement(element) {
  if (!element) return 0;
  var text = element.innerText || element.textContent || "";

  var text = element.innerText || "";
  if (!text.trim()) return 0;

  var clone = element.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.width = element.offsetWidth + "px";
  clone.style.height = "auto";
  clone.style.maxHeight = "none";
  clone.style.overflow = "visible";
  clone.style.whiteSpace = "normal";
  clone.style.wordWrap = "break-word";

  var computedStyle = window.getComputedStyle(element);
  clone.style.fontSize = computedStyle.fontSize;
  clone.style.fontFamily = computedStyle.fontFamily;
  clone.style.fontWeight = computedStyle.fontWeight;
  clone.style.lineHeight = computedStyle.lineHeight;
  clone.style.padding = computedStyle.padding;
  clone.style.margin = "0";
  clone.style.border = "none";
  clone.style.boxSizing = "border-box";

  document.body.appendChild(clone);

  var height = clone.offsetHeight;
  var lineHeight =
    parseFloat(computedStyle.lineHeight) ||
    parseFloat(computedStyle.fontSize) * 1.2;

  document.body.removeChild(clone);

  return Math.ceil(height / lineHeight);
}
