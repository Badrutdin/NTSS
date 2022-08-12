if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };

function dropdown($dropdown) {
    const parent = $dropdown.get(0);
    const title = parent.querySelector('.c-dropdown__title');
    const icon = parent.querySelector('.c-dropdown__icon');
    const closedHeight = title.offsetHeight + 'px';
    const openedHeight = parent.offsetHeight + 'px';
    if ($(parent).attr('data-is-open') === 'closed') {
        parent.style.maxHeight = closedHeight;
    }
    $(title).on('click', function () {
        if ($(parent).attr('data-is-open') === 'closed') {
            parent.style.maxHeight = openedHeight;
            $(parent).attr('data-is-open', 'opened')
            $(icon).addClass('c-dropdown__icon_opened')
        } else if ($(parent).attr('data-is-open') === 'opened') {
            parent.style.maxHeight = closedHeight;
            $(icon).removeClass('c-dropdown__icon_opened')
            $(parent).attr('data-is-open', 'closed')
        }
    })
}

$(document).ready(function () {
    const $dropdown = $('.c-dropdown');
    if ($dropdown.length) {
        $.each($dropdown, function () {
            dropdown($(this))
        })
    }
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
    $('.ratio').on('click', function () {
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

et
dateto = Date.parse(ss.getRange('I2').getValue()) / 1000
let type = ''
let created_by = 0
let created_at = 0
let response = ''
console.log(datefrom, dateto)
options = {
    method: 'get',
    headers: {
        authorization: 'Bearer ' + token(),
    }
}
let users = JSON.parse(UrlFetchApp.fetch('https://npcaz.amocrm.ru/api/v4/users?limit=250', options))
for (let x = 1; x != false; x++) {
    console.log(x)
    response = JSON.parse(UrlFetchApp.fetch('https://npcaz.amocrm.ru/api/v4/events?limit-1008filter%SBentityXSD-task&filter%5BtypeKSD=task_deadline_changed&page=1000000', options))
    for (i = 0; i < response._embedded.events.length; i++) {
        console.log(i)
        type = response._embedded.events[i].type
        created_at = response._embedded.events[i].created_at
        created_by = response._embedded.events[i].created_by
        for (y = 0; y < users._embedded.users.length; y++) {
            if (created_by == users._embedded.users[y].id) {
                created_by = users._embedded.users[y].name
                break
            }
        }
        if (created_by == 0) {

        } else {
            ss.appendRow([type, created_by, created_at])
        }
        if (response._embedded.events.length < 100) {
            x = false;
        }
        Utilities.sleep(1000)
    }
}
}