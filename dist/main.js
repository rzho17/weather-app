(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}const n=()=>{const e=document.querySelector("header"),t=document.querySelector(".error");e.childElementCount>1&&e.removeChild(t)},o=()=>{document.querySelector(".forecast").textContent=""},c=(e,t)=>{e.forEach((e=>{e.textContent="metric"===t?"°C":"°F"}))},r=e=>{document.querySelector(".switchTempBtn").textContent="metric"===e?"Display °F":"Display °C"},a=(e,t,n,o)=>{const c=document.querySelector(".forecast");c.className="forecast";const r=document.createElement("div");r.className="forecastInfo";const a=document.createElement("div");a.className="forecastDetails";const s=document.createElement("img");s.className="fcDetailsImg";const l=document.createElement("div");l.className="fcTimes";const m=document.createElement("div");m.className="fcTime";const i=document.createElement("span");i.className="fcLow";const u=document.createElement("span");u.className="fcHigh";const d=document.createElement("div");d.className="fcTemp";const p=document.createElement("span");p.className="fcTempInfo";const y=document.createElement("span");y.className="highlight";const g=document.createElement("span");g.className="fcTempInfo";const f=document.createElement("span");f.className="highlight",s.src=((e,t)=>{const[{icon:n}]=e.list[t].weather;return`https://openweathermap.org/img/wn/${n}.png`})(e,t),m.textContent=((e,t)=>{const n=new Date(e.list[t].dt_txt);return h(n.getDay())})(e,t),p.textContent=o,g.textContent=n,y.textContent="°C",f.textContent="°C",c.append(r),r.append(a),a.append(s,l),l.append(m,d),d.append(i,u),i.append(p,y),u.append(g,f)},s=async(n,c)=>{const r="214203c486864879e59c9aa802929646";try{const a=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=${r}&units=${c}`),s=await a.json();(async(e,t,n,o)=>{const c=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${e}&lon=${t}&appid=${n}&units=${o}`),r=await c.json();var a;console.log(r),g(a=r),y(a)})(s.coord.lat,s.coord.lon,r,c),(n=>{console.log(n);const o=u(n.dt,n.timezone),c=(document.querySelector(".today"),document.querySelector(".month")),r=document.querySelector(".currentTemp"),a=(document.querySelector(".highlight"),document.querySelector(".realTemp")),s=document.querySelector(".weatherImg"),l=document.querySelector(".conditions"),m=document.querySelector(".location");let i=o.getMinutes(),y=o.getHours();i=d(i),y=d(y),function(n){t(1,arguments),function(n){t(1,arguments);var o=Object.prototype.toString.call(n);n instanceof Date||"object"===e(n)&&"[object Date]"===o?new Date(n.getTime()):"number"==typeof n||"[object Number]"===o?new Date(n):("string"!=typeof n&&"[object String]"!==o||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}(1e3*function(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}(n))}(n.dt),c.textContent=`\n    ${h(o.getDay())} \n    ${o.getDate()}\n    ${p(o.getMonth())}  ${y}:${i}`,r.textContent=Math.round(n.main.temp),a.textContent=`Feels like ${Math.round(n.main.feels_like)}`;const{weather:g}=n,[{icon:f}]=g;s.src=`https://openweathermap.org/img/wn/${f}.png`,l.textContent=n.weather[0].description,m.textContent=n.name})(s),(e=>{const t=document.querySelector(".dailyHigh"),n=document.querySelector(".dailyLow"),o=document.querySelector(".humidity"),c=document.querySelector(".windSpeed"),{main:r}=e,{wind:a}=e,s=Math.round(r.temp_max),l=Math.round(r.temp_min);t.textContent=s,n.textContent=l,o.textContent=r.humidity,c.textContent=f(a.speed)})(s),o()}catch(e){console.log(e),(()=>{const e=document.querySelector("header"),t=document.createElement("div");t.className="error",t.textContent="Location not found! Please search a city through 'city', 'city, state', 'city, country'.",e.appendChild(t)})()}};let l="metric",m=null;const i=e=>{const t=document.querySelector(".switchTempBtn");null!==m&&t.removeEventListener("click",m),m=(e=>{const t="imperial";let o=!1;return()=>{n(),l===t?(l="metric",r(l),s(e,l)):(l=l===o?"metric":t,o=!o,r(l),s(e,l))}})(e),t.addEventListener("click",m)},u=((()=>{const e=document.querySelector("form");let t;e.addEventListener("submit",(c=>{c.preventDefault();const r=new FormData(e);t=r.get("city"),console.log(l),s(t,l),o(),i(t),n(),e.reset()}))})(),(e,t)=>{const n=parseInt(e,10)+parseInt(t,10)+25200,o=new Date(1e3*n).toUTCString();return new Date(o)}),d=e=>(e<10&&(e="0"+e.toString()),e),p=e=>["January","February","March","April","May","June","July","August","September","October","November","December"][e],h=e=>["Sun","Mon","Tues","Wed","Thur","Fri","Sat"][e],y=e=>{let t=e.list[0].main.temp_max,n=0;for(let o=0;o<=e.list.length;o+=8)for(let c=o;c<o+8;c++)n>=8&&(n=0,o<e.list.length&&(t=Math.round(e.list[c].main.temp_min))),o<e.list.length&&e.list[c].main.temp_min<t&&(t=Math.round(e.list[c].main.temp_min)),n++;return t},g=e=>{let t=0,n=0,o=0;for(let c=0;c<=e.list.length;c+=8)for(let r=c;r<c+8;r++)o>=8&&(o=0,a(e,n,t,y(e)),c<e.list.length&&(t=Math.round(e.list[r].main.temp_max),n=r)),c<e.list.length&&e.list[r].main.temp_max>t&&(t=Math.round(e.list[r].main.temp_max),n=r),o++;(e=>{const t=document.querySelectorAll(".forecastDetails .highlight"),n=document.querySelectorAll(".highlight"),o=document.querySelectorAll(".dataDegree"),r=document.querySelector(".speedMetric");c(t,e),c(n,e),c(o,e),((e,t)=>{e.textContent="metric"===t?"Km/h":"Mph"})(r,e)})(l)},f=e=>"metric"===l?Math.round(3600*e/1e3):Math.round(e);s("Vancouver","metric"),i("Vancouver")})();