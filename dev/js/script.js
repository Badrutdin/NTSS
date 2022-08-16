if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };


function acc($target) {
    let i;

    for (i = 0; i < $target.length; i++) {
        $($target[i]).on("click", function () {
            $(this).toggleClass("active");
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
    acc($('.accordion'));

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


});

if (!Object.getOwnPropertyDescriptor(Element.prototype, 'classList')) {
    if (HTMLElement && Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList')) {
        Object.defineProperty(Element.prototype, 'classList', Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList'));
    }
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
