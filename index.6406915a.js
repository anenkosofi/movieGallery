!function(){function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},i=e.parcelRequired7c6;null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in a){var e=a[t];delete a[t];var i={id:t,exports:{}};return n[t]=i,e.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){a[t]=e},e.parcelRequired7c6=i),i("kgI7q");var o=i("bpxeT"),r=i("2TvXO"),c=i("kgI7q");function s(){return l.apply(this,arguments)}function l(){return l=t(o)(t(r).mark((function e(){var n,a,i=arguments;return t(r).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=i.length>0&&void 0!==i[0]?i[0]:1,t.next=3,fetch("".concat(c.BASE_URL,"/trending/movie/day?api_key=").concat(c.API_KEY,"&page=").concat(n));case 3:if((a=t.sent).ok){t.next=6;break}throw new Error(a.status);case 6:return t.next=8,a.json();case 8:return t.abrupt("return",t.sent);case 9:case"end":return t.stop()}}),e)}))),l.apply(this,arguments)}var u=i("bELoF"),d=document.querySelector(".movie-list");function p(t){var e=t.map((function(t){var e=t.id,n=t.poster_path,a=t.title,i=t.genre_ids,o=t.release_date;return'<li class="movie-list__item" data-id="'.concat(e,'">\n            <img class="movie-image" ').concat((0,u.checkImageSrc)(n),' alt="Movie poster" loading="lazy" />\n            <div class="movie-descr">\n              <h2 class="movie-title">').concat(a||"Unknown",'</h2>\n              <p class="movie-info"><span class="genre">').concat((0,u.genresIdConverter)(i)||"No information"," |</span><span>").concat((0,u.getFullYear)(o)||"No information","</span></p>\n            </div>\n        </li>")})).join("");d.innerHTML=e}var v=i("8nrFW"),f=i("1VCXc"),m=document.querySelector(".movie-list"),h=document.querySelector(".pagination-list"),g=document.querySelector(".pagination"),b=document.querySelector("body").getBoundingClientRect();function y(){var e=document.querySelectorAll(".pagination-button");t(v)(e).map((function(t){if(t.classList.contains("active")){var e=Number(t.textContent)-1;s(e).then((function(t){p(t.results)})).catch((function(t){return console.log(t)})),(0,f.clearMarkup)(h),S(e),w(e),k(e)}}))}function L(){var e=document.querySelectorAll(".pagination-button");t(v)(e).map((function(t){if(t.classList.contains("active")){var e=Number(t.textContent)+1;s(e).then((function(t){p(t.results)})).catch((function(t){return console.log(t)})),(0,f.clearMarkup)(h),S(e),w(e),k(e)}}))}function w(t){var e=g.firstElementChild,n=g.lastElementChild;1===t?(e.disabled="true",n.hasAttribute("disabled")&&n.removeAttribute("disabled")):20===t?(n.disabled="true",e.hasAttribute("disabled")&&e.removeAttribute("disabled")):(e.hasAttribute("disabled")&&e.removeAttribute("disabled"),n.hasAttribute("disabled")&&n.removeAttribute("disabled"))}function q(t){return t.map((function(t){return'<li class="pagination-item">\n          <button class="pagination-button" type="button">'.concat(t,"</button>\n        </li>")})).join("")}function S(t){var e=[],n="",a=0,i='<li class="pagination-item"><button class="pagination-button" type="button" disabled>...</button></li>',o='<li class="pagination-item"><button class="pagination-button" type="button">1</button></li>',r='<li class="pagination-item"><button class="pagination-button" type="button">20</button></li>';if(t>=1&&t<=3){a=5;for(var c=1;c<=a;c+=1)e.push(c);if(b.width<768){var s=q(e);n="".concat(s)}else{var l=q(e);n="".concat(l," ").concat(i," ").concat(r)}}else if(t>3&&t<18){a=t+2;for(var u=t-2;u<=a;u+=1)e.push(u);if(b.width<768){var d=q(e);n="".concat(d)}else{var p=q(e);n="".concat(o," ").concat(i," ").concat(p," ").concat(i," ").concat(r)}}else if(t>=18){for(var v=16;v<=20;v+=1)e.push(v);if(b.width<768){var f=q(e);n="".concat(f)}else{var m=q(e);n="".concat(o," ").concat(i," ").concat(m)}}h.innerHTML=n}function k(e){var n=document.querySelectorAll(".pagination-button");t(v)(n).map((function(t){t.classList.contains("active")&&t.classList.remove("active"),Number(t.textContent)===e&&t.classList.add("active")}))}function x(t){if("BUTTON"===t.target.nodeName&&t.target.textContent){var e=Number(t.target.textContent);(0,f.clearMarkup)(m),s(e).then((function(t){p(t.results)})).catch((function(t){return console.log(t)})),(0,f.clearMarkup)(h),S(e),w(e),k(e)}}var _=document.querySelector(".pagination-list");!function(){document.body.style.overflow="hidden";s().then((function(t){return p(t.results)})).catch((function(t){return console.log(t)})),S(1),w(1),k(1),_.addEventListener("click",x);var t=document.querySelector(".arrow-left"),e=document.querySelector(".arrow-right");t.classList.remove("is-hidden"),e.classList.remove("is-hidden"),t.addEventListener("click",y),e.addEventListener("click",L),window.onload=function(t){setTimeout((function(){document.querySelector(".loader-wrapper").classList.add("turn-off")}),250)},document.body.style.overflow="visible"}(),i("e9OUR"),i("bELoF"),i("6Hzcf"),i("aZweA"),i("aXvIb"),i("7FCPQ"),i("bmUS0"),i("cfdYy");o=i("bpxeT"),r=i("2TvXO"),c=i("kgI7q"),f=i("1VCXc"),u=i("bELoF");var E=i("aZweA"),A=i("aXvIb"),C=document.querySelector(".movie-list"),M=document.querySelector(".pagination-list"),T=document.querySelector(".results-list"),N=document.querySelector(".error-message"),I=document.querySelector(".form");function U(t){return F.apply(this,arguments)}function F(){return F=t(o)(t(r).mark((function e(n){var a,i,o=arguments;return t(r).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=o.length>1&&void 0!==o[1]?o[1]:1,t.next=3,fetch("".concat(c.BASE_URL,"/search/movie?api_key=").concat(c.API_KEY,"&query=").concat(n,"&page=").concat(a));case 3:if((i=t.sent).ok){t.next=6;break}throw new Error(i.status);case 6:return t.next=8,i.json();case 8:return t.abrupt("return",t.sent);case 9:case"end":return t.stop()}}),e)}))),F.apply(this,arguments)}I.addEventListener("submit",(function(t){t.preventDefault(),U(t.currentTarget.elements.searchQuery.value.trim().toLowerCase()).then((function(t){var e=t.results;T.classList.add("is-hidden"),I.classList.remove("input-change"),p(e)})).catch((function(t){return console.log(t)}));var e=document.querySelector(".arrow-left"),n=document.querySelector(".arrow-right");e.classList.add("is-hidden"),n.classList.add("is-hidden"),(0,f.clearMarkup)(M),I.reset()})),document.querySelector(".form-input").addEventListener("input",(function(t){var e=t.target.value.trim().toLowerCase();e?U(e).then((function(t){var e=t.results;t.total_results?(N.classList.remove("is-shown"),I.classList.add("input-change"),T.classList.remove("is-hidden"),function(t){var e=t.map((function(t){var e=t.id,n=t.title;return'<li class="results-item" data-id="'.concat(e,'">\n          <span class="title">').concat(n,'</span>\n          <span class="delimeter">|</span>\n          <span class="year">2022</span>\n          <span class="vote">7.8</span>\n        </li>')})).join("");T.innerHTML=e}(e)):(N.classList.add("is-shown"),I.classList.remove("input-change"),T.classList.add("is-hidden"))})).catch((function(t){return console.log(t)})):(I.classList.remove("input-change"),T.classList.add("is-hidden"));var n=document.querySelector(".arrow-left"),a=document.querySelector(".arrow-right");n.classList.add("is-hidden"),a.classList.add("is-hidden"),(0,f.clearMarkup)(M)})),T.addEventListener("click",(function(t){if(!t.target.closest("li"))return;if(t.target.closest("li")){var e=t.target.closest("li").dataset.id;(0,E.fetchMovieDetails)(e).then((function(t){return n=(e=t).id,a=e.poster_path,i=e.title,o=e.genres,r=e.release_date,c='<li class="movie-list__item" data-id="'.concat(n,'">\n            <img class="movie-image" ').concat((0,u.checkImageSrc)(a),' alt="Movie poster" loading="lazy" />\n            <div class="movie-descr">\n              <h2 class="movie-title">').concat(i||"Unknown",'</h2>\n              <p class="movie-info"><span class="genre">').concat((0,A.checkGenres)(o)||"No information"," |</span><span>").concat((0,u.getFullYear)(r)||"No information","</span></p>\n            </div>\n        </li>"),void(C.innerHTML=c);var e,n,a,i,o,r,c})).catch((function(t){return console.log(t)})),I.classList.remove("input-change"),T.classList.add("is-hidden"),I.reset()}})),i("hJLVb")}();
//# sourceMappingURL=index.6406915a.js.map
