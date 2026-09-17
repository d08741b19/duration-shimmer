const script = document.createElement("script");
script.src   = browser.runtime.getURL("duration-shimmer.js");
script.onload  = () => {script.remove();};
script.onerror = () => script.remove();
(document.head || document.documentElement).appendChild(script);
