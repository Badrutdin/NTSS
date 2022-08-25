if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };

function acc($target, activeClass) {
    let i;

    for (i = 0; i < $target.length; i++) {
        $($target[i]).on("click", function () {
            $(this).toggleClass(activeClass);
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}

$(document).ready(function () {
    $(document).mouseup(function (e) {
        const form = $('[data-search-form]');
        if (!form.is(e.target) && form.has(e.target).length === 0) {
            form.addClass('d-none').find('form').get(0).reset();
        }
    });
    $('[data-search-trigger]').on('click', function () {
        $('[data-search-form]').removeClass('d-none').find('.c-input').focus();
    })
    const $firstMainPageSlider = $('[data-main-slider="1"]')
    const $secondMainPageSlider = $('[data-main-slider="2"]')
    const $thirdMainPageSlider = $('[data-main-slider="3"]')
    $secondMainPageSlider.owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1,
        navText: [`        <span class="c-btn c-btn_pagination">
            <svg class="c-btn__icon" fill="none" height="18" viewBox="0 0 10 18" width="10"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M8.28305 0.500819L0.510046 8.47482C0.373525 8.61488 0.297119 8.80273 0.297119 8.99832C0.297119 9.19391 0.373525 9.38176 0.510046 9.52182L8.28305 17.4988C8.34664 17.5641 8.42267 17.616 8.50666 17.6515C8.59065 17.6869 8.68088 17.7052 8.77205 17.7052C8.86321 17.7052 8.95344 17.6869 9.03743 17.6515C9.12142 17.616 9.19745 17.5641 9.26105 17.4988C9.39188 17.3649 9.46513 17.1851 9.46513 16.9978C9.46513 16.8106 9.39188 16.6308 9.26105 16.4968L1.95155 8.99832L9.26105 1.50132C9.39143 1.36744 9.46439 1.18795 9.46439 1.00107C9.46439 0.814191 9.39143 0.634697 9.26105 0.500819C9.19745 0.435504 9.12142 0.38359 9.03743 0.348143C8.95344 0.312696 8.86321 0.294434 8.77205 0.294434C8.68088 0.294434 8.59065 0.312696 8.50666 0.348143C8.42267 0.38359 8.34664 0.435504 8.28305 0.500819Z"
                      fill="#7C7C7C"/>
            </svg>
        </span>`, ` <span class="c-btn c-btn_pagination">
            <svg class="c-btn__icon" fill="none" height="18" viewBox="0 0 10 18" width="10"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M1.7172 17.4992L9.4902 9.52518C9.62672 9.38512 9.70313 9.19727 9.70313 9.00168C9.70313 8.80609 9.62672 8.61824 9.4902 8.47818L1.7172 0.501181C1.6536 0.435865 1.57757 0.383951 1.49358 0.348505C1.4096 0.313057 1.31936 0.294796 1.2282 0.294796C1.13704 0.294796 1.0468 0.313057 0.962813 0.348505C0.878827 0.383951 0.802794 0.435865 0.739199 0.501181C0.608365 0.635126 0.535119 0.814939 0.535119 1.00218C0.535119 1.18942 0.608365 1.36923 0.739199 1.50318L8.0487 9.00168L0.739199 16.4987C0.608814 16.6326 0.535851 16.8121 0.535851 16.9989C0.535851 17.1858 0.608814 17.3653 0.739199 17.4992C0.802794 17.5645 0.878827 17.6164 0.962813 17.6519C1.0468 17.6873 1.13704 17.7056 1.2282 17.7056C1.31936 17.7056 1.4096 17.6873 1.49358 17.6519C1.57757 17.6164 1.6536 17.5645 1.7172 17.4992Z"
                      fill="#21458C"/>
            </svg>
        </span>`],
        onInitialized: function () {
            const parent = $secondMainPageSlider.closest('.slider-wrap')
            const targetPosition = parent.find('.slider-wrap__slider-controls')
            const controls = parent.find('.owl-nav').detach()
            controls.appendTo(targetPosition)
        },
    })
    $thirdMainPageSlider.owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        navText: [`        <span class="c-btn c-btn_slider-nav">
            <svg class="c-btn__icon" fill="none" height="18" viewBox="0 0 10 18" width="10"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M8.28305 0.500819L0.510046 8.47482C0.373525 8.61488 0.297119 8.80273 0.297119 8.99832C0.297119 9.19391 0.373525 9.38176 0.510046 9.52182L8.28305 17.4988C8.34664 17.5641 8.42267 17.616 8.50666 17.6515C8.59065 17.6869 8.68088 17.7052 8.77205 17.7052C8.86321 17.7052 8.95344 17.6869 9.03743 17.6515C9.12142 17.616 9.19745 17.5641 9.26105 17.4988C9.39188 17.3649 9.46513 17.1851 9.46513 16.9978C9.46513 16.8106 9.39188 16.6308 9.26105 16.4968L1.95155 8.99832L9.26105 1.50132C9.39143 1.36744 9.46439 1.18795 9.46439 1.00107C9.46439 0.814191 9.39143 0.634697 9.26105 0.500819C9.19745 0.435504 9.12142 0.38359 9.03743 0.348143C8.95344 0.312696 8.86321 0.294434 8.77205 0.294434C8.68088 0.294434 8.59065 0.312696 8.50666 0.348143C8.42267 0.38359 8.34664 0.435504 8.28305 0.500819Z"
                      fill="#7C7C7C"/>
            </svg>
        </span>`, ` <span class="c-btn c-btn_slider-nav">
            <svg class="c-btn__icon" fill="none" height="18" viewBox="0 0 10 18" width="10"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M1.7172 17.4992L9.4902 9.52518C9.62672 9.38512 9.70313 9.19727 9.70313 9.00168C9.70313 8.80609 9.62672 8.61824 9.4902 8.47818L1.7172 0.501181C1.6536 0.435865 1.57757 0.383951 1.49358 0.348505C1.4096 0.313057 1.31936 0.294796 1.2282 0.294796C1.13704 0.294796 1.0468 0.313057 0.962813 0.348505C0.878827 0.383951 0.802794 0.435865 0.739199 0.501181C0.608365 0.635126 0.535119 0.814939 0.535119 1.00218C0.535119 1.18942 0.608365 1.36923 0.739199 1.50318L8.0487 9.00168L0.739199 16.4987C0.608814 16.6326 0.535851 16.8121 0.535851 16.9989C0.535851 17.1858 0.608814 17.3653 0.739199 17.4992C0.802794 17.5645 0.878827 17.6164 0.962813 17.6519C1.0468 17.6873 1.13704 17.7056 1.2282 17.7056C1.31936 17.7056 1.4096 17.6873 1.49358 17.6519C1.57757 17.6164 1.6536 17.5645 1.7172 17.4992Z"
                      fill="#21458C"/>
            </svg>
        </span>`],
    })
    $firstMainPageSlider.owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1,
        navText: [`        <span class="c-btn c-btn_slider-nav">
            <svg class="c-btn__icon" fill="none" height="18" viewBox="0 0 10 18" width="10"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M8.28305 0.500819L0.510046 8.47482C0.373525 8.61488 0.297119 8.80273 0.297119 8.99832C0.297119 9.19391 0.373525 9.38176 0.510046 9.52182L8.28305 17.4988C8.34664 17.5641 8.42267 17.616 8.50666 17.6515C8.59065 17.6869 8.68088 17.7052 8.77205 17.7052C8.86321 17.7052 8.95344 17.6869 9.03743 17.6515C9.12142 17.616 9.19745 17.5641 9.26105 17.4988C9.39188 17.3649 9.46513 17.1851 9.46513 16.9978C9.46513 16.8106 9.39188 16.6308 9.26105 16.4968L1.95155 8.99832L9.26105 1.50132C9.39143 1.36744 9.46439 1.18795 9.46439 1.00107C9.46439 0.814191 9.39143 0.634697 9.26105 0.500819C9.19745 0.435504 9.12142 0.38359 9.03743 0.348143C8.95344 0.312696 8.86321 0.294434 8.77205 0.294434C8.68088 0.294434 8.59065 0.312696 8.50666 0.348143C8.42267 0.38359 8.34664 0.435504 8.28305 0.500819Z"
                      fill="#7C7C7C"/>
            </svg>
        </span>`, ` <span class="c-btn c-btn_slider-nav">
            <svg class="c-btn__icon" fill="none" height="18" viewBox="0 0 10 18" width="10"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M1.7172 17.4992L9.4902 9.52518C9.62672 9.38512 9.70313 9.19727 9.70313 9.00168C9.70313 8.80609 9.62672 8.61824 9.4902 8.47818L1.7172 0.501181C1.6536 0.435865 1.57757 0.383951 1.49358 0.348505C1.4096 0.313057 1.31936 0.294796 1.2282 0.294796C1.13704 0.294796 1.0468 0.313057 0.962813 0.348505C0.878827 0.383951 0.802794 0.435865 0.739199 0.501181C0.608365 0.635126 0.535119 0.814939 0.535119 1.00218C0.535119 1.18942 0.608365 1.36923 0.739199 1.50318L8.0487 9.00168L0.739199 16.4987C0.608814 16.6326 0.535851 16.8121 0.535851 16.9989C0.535851 17.1858 0.608814 17.3653 0.739199 17.4992C0.802794 17.5645 0.878827 17.6164 0.962813 17.6519C1.0468 17.6873 1.13704 17.7056 1.2282 17.7056C1.31936 17.7056 1.4096 17.6873 1.49358 17.6519C1.57757 17.6164 1.6536 17.5645 1.7172 17.4992Z"
                      fill="#21458C"/>
            </svg>
        </span>`],
    })

    acc($('[data-accordion]'), 'c-aside-btn_active');

    function customLabelHandler(inputSelector) {
        $(document).on('focus',
            inputSelector, function () {
                $(this).closest('.c-input-wrap').addClass('c-input-wrap_changed')
            }
        )
        $(document).on('focusout',
            inputSelector, function () {
                let val = $(this).val()
                if (!val || val.trim() == '' || val == null) {
                    $(this).closest('.c-input-wrap').removeClass('c-input-wrap_changed')
                }
            }
        )
    }

    customLabelHandler('.c-input-wrap__input')
    const phoneMaskOptions = {
        translation: {
            r: {
                pattern: /[+]/,
                optional: true
            }
        }
    };
    const selectOptions = {
        autoWidth: false,
        downArrowIcon: 'false',
    }
    // phone mask
    $('input[type=tel]').mask('r0 (000) 000-00-00', phoneMaskOptions);

    // ratio
    $('[data-video-frame]').on('click', function () {
        var url = $(this).find('.iframe-preload').attr("data-url");
        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('allowfullscreen', null);
        $(this).html(iframe);
    });

    $(document).on('click', '.modal-close', function () {
        $.magnificPopup.close()
    })

    routHelper(['authorization','registration','docs','docs2','price-list','selection-tile','selection-list','tech-docs','favorite','search-result'])
});

if (!Object.getOwnPropertyDescriptor(Element.prototype, 'classList')) {
    if (HTMLElement && Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList')) {
        Object.defineProperty(Element.prototype, 'classList', Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList'));
    }
}

function routHelper(pages) {
    let btn = $(`<button>Меню</button>`)
    let menuContainer = $(`<div class="d-none"><ul></ul></div>`)
    btn.css({'z-index':999,position: 'fixed', top: 0})
    menuContainer.css({'z-index':999,position: 'fixed', top: '50px', 'min-width': '200px', 'background-color': '#F2F2F2', 'overflow-y':'scroll','padding':'20px','font-size':'40px','max-height':'80vh'})
    btn.click(function () {
        menuContainer.toggleClass('d-none')
    })
    $.each(pages, function (k,v) {
        menuContainer.find('ul').append(`<li class="mt-4 "><a class="text-uppercase c-link c-link_events" href="http://localhost:3000/${v}">${v}</a></li>`)

    })
    $('body').append(btn)
    $('body').append(menuContainer)
}

function renderInlineResult(resultContainer, resultMessage) {
    $(resultContainer).html(resultMessage);
    setTimeout(function () {
        resultContainer.innerHTML = '';
    }, 3000);
}

function renderPopupResult(popupSelector, titleAttr = false, responseTitle = false) {
    let popup = document.querySelector(popupSelector);
    if (popup) {
        if (titleAttr) {
            let titleEl = popup.querySelector(`[${titleAttr}]`);
            let title = $(titleEl).attr(titleAttr)
            if (responseTitle) {
                title = responseTitle;
            }
            titleEl.innerHTML = title;
        }

        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            }
        });
    }
}

