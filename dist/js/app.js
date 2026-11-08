(() => {
    "use strict";
    function burger() {
        const burger = document.querySelector("#burger");
        if (burger) {
            const burgerOpen = document.querySelector("#burger-open");
            const burgerCloses = document.querySelectorAll("[data-burger-close]");
            const burgerOverlay = document.querySelector("#burger-overlay");
            const burgerAnchors = burger.querySelectorAll("a[href^='/#']");
            burgerAnchors.forEach(anchor => {
                anchor.addEventListener("click", () => {
                    handleClose();
                });
            });
            burgerOverlay.addEventListener("click", handleClose);
            burgerOpen.addEventListener("click", () => {
                handleOpen();
            });
            burgerCloses.forEach(btn => btn.addEventListener("click", handleClose));
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            function handleOpen() {
                document.body.classList.add("body-hidden");
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                updateHeightBurger();
            }
            function handleClose() {
                document.body.classList.remove("body-hidden");
                burger.classList.remove("_open");
                burgerOverlay.classList.remove("_active");
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function buttonsNote() {
        const buttons = document.querySelectorAll("[data-btn-note]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const selectorTarget = btn.dataset.targetNote;
                    const target = document.querySelector(selectorTarget);
                    const value = btn.dataset.btnNote;
                    if (target) {
                        target.value = value;
                    }
                });
            });
        }
    }
    function createScript(url, type) {
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
    function slideUp(target, duration = 500, showmore = 0) {
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
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function slideDown(target, duration = 500, showmore = 0) {
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
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function createEl(tag, classes = "") {
        const item = document.createElement(tag);
        if (classes) {
            classes.split(" ").forEach(c => {
                item.classList.add(c);
            });
        }
        return item;
    }
    function countLinesInElement(element) {
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
        var lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.2;
        document.body.removeChild(clone);
        return Math.ceil(height / lineHeight);
    }
    function catalogFiltersToggle() {
        const wrap = document.querySelector(".s-catalog__sidebar-filters");
        if (wrap) {
            let timeAnim = 300;
            let isSlide = false;
            const widgets = wrap.querySelectorAll(".berocket_single_filter_widget");
            if (widgets.length) {
                const btnUpdate = document.querySelector(".bapf_update");
                if (btnUpdate) btnUpdate.classList.add("btn-s");
                widgets.forEach(w => {
                    const btn = w.querySelector(".bapf_head");
                    const body = w.querySelector(".bapf_body");
                    slideUp(body, 0);
                    btn.addEventListener("click", () => {
                        if (isSlide) return;
                        isSlide = true;
                        if (btn.classList.contains("_active")) {
                            btn.classList.remove("_active");
                            slideUp(body, timeAnim);
                        } else {
                            btn.classList.add("_active");
                            slideDown(body, timeAnim);
                        }
                        setTimeout(() => {
                            isSlide = false;
                        }, timeAnim);
                    });
                });
            }
        }
    }
    function catalogSidebar() {
        const sidebar = document.querySelector("#catalog-sidebar");
        if (sidebar && window.matchMedia("(max-width: 1025px)").matches) {
            const overlay = document.querySelector("#catalog-sidebar-overlay");
            const sidebarOpen = document.querySelector("#catalog-sidebar-open");
            const closes = document.querySelectorAll("[data-catalog-sidebar-close]");
            if (closes.length) {
                closes.forEach(close => {
                    close.addEventListener("click", () => {
                        sidebar.classList.remove("_open");
                        overlay.classList.remove("_active");
                        document.body.classList.remove("body-hidden");
                    });
                });
            }
            sidebarOpen.addEventListener("click", () => {
                sidebar.classList.add("_open");
                overlay.classList.add("_active");
                document.body.classList.add("body-hidden");
            });
            function updateHeight() {
                sidebar.style.maxHeight = `${window.visualViewport.height}px`;
            }
            updateHeight();
            window.visualViewport.addEventListener("resize", updateHeight);
            window.visualViewport.addEventListener("scroll", updateHeight);
        }
    }
    function changeModalTitle() {
        const buttons = document.querySelectorAll("[data-fancybox][data-modal-title]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const titleValue = btn.dataset.modalTitle;
                    if (titleValue) {
                        const selector = btn.getAttribute("href") || btn.dataset.src;
                        const modalTitle = document.querySelector(selector).querySelector(".modal__title");
                        if (modalTitle) modalTitle.textContent = titleValue;
                    }
                });
            });
        }
    }
    function handlerSelect() {
        const selects = document.querySelectorAll(".select");
        if (selects.length) {
            document.body.addEventListener("click", () => {
                const openSelects = document.querySelectorAll(".select._open");
                if (openSelects.length) openSelects.forEach(s => s.classList.remove("_open"));
            });
            selects.forEach(select => {
                select.addEventListener("click", e => e.stopPropagation());
                const targetOptions = select.dataset.targetOptions;
                if (targetOptions) {
                    const selector = `data-${targetOptions}-options`;
                    const target = select.closest(`[${selector}]`);
                    if (target) {
                        const selectBody = select.querySelector(".select-body");
                        const options = target.getAttribute(selector);
                        console.log(options);
                        const arrOptions = options.split(",");
                        arrOptions.forEach(option => {
                            const item = document.createElement("div");
                            item.classList.add("select-item");
                            item.textContent = option;
                            selectBody.appendChild(item);
                        });
                    }
                }
                const items = select.querySelectorAll(".select-item");
                const btn = select.querySelector(".select-btn");
                const input = select.querySelector(".select-input");
                btn.addEventListener("click", () => {
                    if (select.classList.contains("_open")) {
                        select.classList.remove("_open");
                    } else {
                        selects.forEach(s => s.classList.remove("_open"));
                        select.classList.add("_open");
                    }
                });
                items.forEach(item => {
                    item.addEventListener("click", () => {
                        handlerChange(item);
                    });
                });
                function handlerChange(item) {
                    const value = item.textContent.trim();
                    input.value = value;
                    select.classList.remove("_open");
                    items.forEach(i => i.classList.remove("_active"));
                    item.classList.add("_active");
                }
            });
        }
    }
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", changeScroll);
            changeScroll();
            function changeScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > 0) {
                    header.classList.add("_scroll");
                } else {
                    header.classList.remove("_scroll");
                }
                if (window.matchMedia("(min-width: 1026px)").matches) {
                    if (scrollTop > lastScrollTop && scrollTop > header.clientHeight) {
                        header.classList.add("_hide");
                    } else {
                        header.classList.remove("_hide");
                    }
                }
                lastScrollTop = scrollTop;
            }
        }
    }
    function hero() {
        const heroSlidesBodies = document.querySelectorAll(".s-hero__slide-body");
        if (heroSlidesBodies.length) {
            function changeOffset() {
                const headerHeight = document.querySelector(".header").clientHeight;
                const sliderNav = document.querySelector(".s-hero__slider-nav");
                const sliderNavHeight = sliderNav.clientHeight;
                const sliderNavBottom = +window.getComputedStyle(sliderNav).bottom.slice(0, -2);
                heroSlidesBodies.forEach(s => {
                    s.style.padding = `${headerHeight + 30}px 0px ${sliderNavHeight + sliderNavBottom + 30}px 0px`;
                });
            }
            changeOffset();
            window.visualViewport.addEventListener("resize", changeOffset);
            window.visualViewport.addEventListener("scroll", changeOffset);
        }
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
    }
    function map() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) {
            maps.forEach(map => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: .01
                };
                function callback(entries, observer) {
                    entries.forEach(entry => {
                        const target = entry.target;
                        if (entry.isIntersecting) {
                            createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target));
                            observer.unobserve(target);
                        }
                    });
                }
                const observer = new IntersectionObserver(callback, options);
                observer.observe(map);
            });
            function handlerCreateMap(map) {
                const center = JSON.parse(map.dataset.center);
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let iconSize = [ 70, 70 ];
                let iconPosition = [ -30, -68 ];
                let objectMark = {};
                if (iconHref) {
                    objectMark = {
                        iconLayout: "default#image",
                        iconImageHref: iconHref,
                        iconImageSize: iconSize,
                        iconImageOffset: iconPosition
                    };
                }
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center,
                        zoom
                    });
                    const placemark = new ymaps.Placemark(center, {}, objectMark);
                    htmlMap.geoObjects.add(placemark);
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    function oSelectHandler() {
        class OSelect {
            constructor(selector) {
                if (typeof selector === "string") this.select = document.querySelector(selector); else this.select = selector;
                this.options = this.select.querySelectorAll("option");
                this.currentOption = Array.from(this.options).find(o => o.selected);
                this.init();
            }
            init() {
                const htmlSelect = createEl("div", "o-select");
                const htmlSelectBtn = createEl("div", "o-select-btn");
                const htmlSelectBody = createEl("div", "o-select-body");
                const htmlSelectBodyInside = createEl("div", "o-select-body-inside");
                document.addEventListener("click", () => {
                    if (htmlSelect.classList.contains("_open")) htmlSelect.classList.remove("_open");
                });
                htmlSelect.addEventListener("click", e => e.stopPropagation());
                htmlSelectBtn.innerHTML = `\n      <span class="select-btn-text">${this.currentOption.textContent}</span>\n      <i class="icon-bottom"></i>\n    `;
                htmlSelect.appendChild(htmlSelectBtn);
                htmlSelect.appendChild(htmlSelectBody);
                htmlSelectBody.appendChild(htmlSelectBodyInside);
                htmlSelectBtn.addEventListener("click", () => {
                    htmlSelect.classList.toggle("_open");
                });
                this.options.forEach(o => {
                    const currentId = o.id;
                    const htmlOption = createEl("div", "o-select-option");
                    htmlOption.textContent = o.textContent;
                    htmlSelectBodyInside.appendChild(htmlOption);
                    htmlOption.addEventListener("click", e => {
                        const neighborsOptions = htmlOption.closest(".o-select-body").querySelectorAll(".o-select-option");
                        htmlSelectBtn.querySelector("span").textContent = e.target.textContent;
                        if (neighborsOptions.length) neighborsOptions.forEach(i => i.classList.remove("_active"));
                        htmlOption.classList.add("_active");
                        o.selected = true;
                        this.select.dispatchEvent(new Event("change", {
                            bubbles: true
                        }));
                        htmlSelect.classList.remove("_open");
                    });
                });
                this.select.style.display = "none";
                this.select.insertAdjacentElement("afterend", htmlSelect);
            }
        }
        function handlerChange() {
            const selects = document.querySelectorAll(".s-catalog__sort-wrap select");
            if (selects.length) {
                selects.forEach(s => {
                    const oSelect = new OSelect(s);
                });
            }
        }
        handlerChange();
    }
    function previewToggle() {
        const buttons = document.querySelectorAll(".s-preview__gallery-toggle-btn");
        if (buttons.length) {
            const slider = document.querySelector(".s-preview__slider");
            initSlider(slider);
            function initSlider(slider) {
                if (slider) {
                    const wrap = slider.closest(".s-preview__gallery");
                    const options = {
                        speed: 900,
                        slidesPerView: 1,
                        spaceBetween: 20,
                        autoplay: {
                            delay: 6e3
                        },
                        pagination: {
                            el: wrap.querySelector(".slider-pagination"),
                            clickable: true
                        }
                    };
                    const swiper = new Swiper(slider, options);
                }
            }
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const wrap = btn.closest("[data-tab]");
                    const galleryArr = btn.dataset.gallery.split(",");
                    const gallery = wrap.querySelector(".s-preview__gallery");
                    const buttonsNeighbors = wrap.querySelectorAll(".s-preview__gallery-toggle-btn");
                    buttonsNeighbors.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                    gallery.classList.add("_hide");
                    setTimeout(() => {
                        gallery.innerHTML = "";
                        const sliderN = createEl("div", "swiper s-preview__slider");
                        const sliderNWrapper = createEl("div", "swiper-wrapper");
                        const sliderNPagination = createEl("div", "slider-pagination");
                        galleryArr.forEach(gal => {
                            const slideN = createEl("a", "swiper-slide");
                            slideN.setAttribute("data-fancybox", wrap.dataset.tab);
                            slideN.setAttribute("href", gal);
                            const img = createEl("img");
                            img.src = gal;
                            slideN.appendChild(img);
                            sliderNWrapper.appendChild(slideN);
                        });
                        sliderN.appendChild(sliderNWrapper);
                        gallery.appendChild(sliderN);
                        gallery.appendChild(sliderNPagination);
                        initSlider(sliderN);
                        gallery.classList.remove("_hide");
                    }, 300);
                });
            });
        }
    }
    function sliders() {
        const heroSlider = document.querySelector(".s-hero__slider");
        if (heroSlider) {
            const heroBgSlider = document.querySelector(".s-hero__slider-bg");
            const swiperBg = new Swiper(heroBgSlider, {
                speed: 900
            });
            const swiper = new Swiper(heroSlider, {
                speed: 900,
                autoplay: {
                    delay: 6500
                },
                controller: {
                    control: swiperBg
                },
                effect: "fade",
                navigation: {
                    prevEl: ".s-hero .slider-arrow._prev",
                    nextEl: ".s-hero .slider-arrow._next"
                },
                pagination: {
                    el: ".s-hero .slider-pagination",
                    clickable: true
                }
            });
        }
        const catsSlider = document.querySelector(".s-cats__slider");
        if (catsSlider) {
            const swiper = new Swiper(catsSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 5500
                },
                pagination: {
                    el: ".s-cats .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1366: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }
            });
        }
        const modelsSlider = document.querySelector(".s-models__slider");
        if (modelsSlider) {
            const swiper = new Swiper(modelsSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 6e3
                },
                pagination: {
                    el: ".s-models .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1366: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }
            });
        }
        const promoSlider = document.querySelector(".s-promo__slider");
        if (promoSlider) {
            const swiper = new Swiper(promoSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 5500
                },
                navigation: {
                    prevEl: ".s-promo .slider-arrow._prev",
                    nextEl: ".s-promo .slider-arrow._next"
                },
                scrollbar: {
                    el: ".s-promo .slider-scrollbar",
                    draggable: true
                },
                breakpoints: {
                    1366: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    }
                }
            });
        }
        const newsSlider = document.querySelector(".s-news__slider");
        if (newsSlider) {
            const swiper = new Swiper(newsSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 6500
                },
                navigation: {
                    prevEl: ".s-news .slider-arrow._prev",
                    nextEl: ".s-news .slider-arrow._next"
                },
                pagination: {
                    el: ".s-news .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1366: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
        }
        const optionsSliders = document.querySelectorAll(".s-options__slider");
        if (optionsSliders.length) {
            optionsSliders.forEach(slider => {
                const wrap = slider.closest("[data-tab]");
                const swiper = new Swiper(slider, {
                    speed: 900,
                    spaceBetween: 20,
                    slidesPerView: "auto",
                    pagination: {
                        el: wrap.querySelector(".slider-pagination"),
                        clickable: true
                    },
                    breakpoints: {
                        1200: {
                            spaceBetween: 25,
                            slidesPerView: 3
                        }
                    }
                });
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) {
                initSpollers(spollersRegular);
            }
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) {
                mdQueriesArray.forEach(mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    });
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
            }
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) {
                                spollerTitle.nextElementSibling.hidden = true;
                            }
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
                            hideSpollersBody(spollersBlock);
                        }
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) {
                document.addEventListener("click", function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) {
                        spollersClose.forEach(spollerClose => {
                            const spollersBlock = spollerClose.closest("[data-spollers]");
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        });
                    }
                });
            }
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) {
                    return item.dataset[dataSetValue].split(",")[0];
                }
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) {
                                return true;
                            }
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
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
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
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
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function stickyTop() {
        const items = document.querySelectorAll("._sticky-top");
        if (items.length && window.matchMedia("(min-width: 1026px)").matches) {
            const headerHeight = document.querySelector(".header").clientHeight;
            items.forEach(item => {
                item.style.top = `${headerHeight + 30}px`;
            });
        }
    }
    function tab() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const container = btn.closest(".tabs");
                    const tabId = btn.dataset.tabBtn;
                    const allButtons = container.querySelector(".tabs-nav").querySelectorAll("[data-tab-btn]");
                    const allTabs = [];
                    const allTabsContents = container.querySelectorAll(".tabs-content");
                    allTabsContents.forEach(tabsContent => {
                        const tabs = Array.from(tabsContent.children).filter(child => child.hasAttribute("data-tab"));
                        allTabs.push(...tabs);
                    });
                    const currentTabs = container.querySelectorAll(`[data-tab="${tabId}"]`);
                    allTabs.forEach(t => {
                        t.classList.remove("_show");
                        setTimeout(() => {
                            t.classList.remove("_active");
                        }, 150);
                    });
                    setTimeout(() => {
                        currentTabs.forEach(t => {
                            t.classList.add("_active");
                            setTimeout(() => {
                                t.classList.add("_show");
                            }, 150);
                        });
                    }, 150);
                    allButtons.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                });
            });
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        burger();
        buttonsNote();
        changeModalTitle();
        sliders();
        hero();
        headerScroll();
        handlerSelect();
        inputmask();
        map();
        spoller();
        oSelectHandler();
        catalogFiltersToggle();
        catalogSidebar();
        previewToggle();
        tab();
        stickyTop();
        Fancybox.bind("[data-fancybox]", {
            on: {
                destroy: instance => {
                    const id = instance.getSlide().src;
                    if (id.includes("#modal")) {
                        const modal = document.querySelector(id);
                        const inputNote = modal.querySelector(".input-note");
                        const modalTitle = modal.querySelector(".modal__title[data-text]");
                        if (inputNote) inputNote.value = "";
                        if (modalTitle) modalTitle.textContent = modalTitle.dataset.text;
                    }
                }
            }
        });
    });
})();