if (!Object.entries)
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
$(document).ready(function () {
  const datePickerOptions = {
    autoHide: true,
    startDate: new Date(),
    format: 'dd.mm.YYYY',
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    language: 'ru-RU'
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

  // FORM
  // popup
  const formErrorClass = 'c-control-error'
  const formDefaultSelectValue = '0'
  $('.popup').magnificPopup({
    tClose: 'Закрыть',
    callbacks: {
      open: function () {
        const magnificPopup = $.magnificPopup.instance;
        const content = magnificPopup.content.get(0);
        const selects = $(content).find('.data-dynamic-select');
        const clickedEl = this.currItem.el.get(0)
        const specialistValue = clickedEl.getAttribute('data-doctor-id')
        const specializationValue = clickedEl.getAttribute('data-speciality-id')
        if (selects.length && specialistValue && specializationValue) {
          let selectInstance;

          selects.each(function () {
            switch (this.name) {
              case 'specialization':
                selectInstance = $(this).data('selectBox-selectBoxIt');

                if (typeof selectInstance !== 'undefined') {
                  selectInstance.selectOption(specializationValue);
                }

                $(this).closest('.c-select-wrap').addClass('c-select-readonly')
                break;

              case 'specialist':
                selectInstance = $(this).data('selectBox-selectBoxIt');

                if (typeof selectInstance !== 'undefined') {
                  selectInstance.selectOption(specialistValue);
                }

                $(this).closest('.c-select-wrap').addClass('c-select-readonly')
                break;

              default:
                console.log('default')
                break;
            }
          })
        }
        $('[data-toggle="datepicker"]').datepicker({...datePickerOptions, zIndex: 1100});

      },
      close: function () {
        const magnificPopup = $.magnificPopup.instance;
        const content = magnificPopup.content.get(0);
        const selects = $(content).find('.data-dynamic-select');
        const inputs = $(content).find('input');
        if (selects.length) {
          selects.each(function () {
            let selectInstance = $(this).data('selectBox-selectBoxIt');

            if (typeof selectInstance !== 'undefined') {
              selectInstance.selectOption(formDefaultSelectValue);
            }

            $(this).closest('.c-select-wrap').removeClass('c-select-readonly')
            this.classList.remove(formErrorClass)
          })
        }
        if (inputs.length) {
          inputs.each(function () {
            this.classList.remove(formErrorClass)
          })
        }
        $('[data-toggle="datepicker"]').datepicker("destroy")
      }
    },
    // closeMarkup: '<button  type="button" class="mfp-close" title="%title%"><svg xmlns="http://www.w3.org/2000/svg" class="mfp-close__icon" viewBox="0 0 512 512"><path  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg></button>',
  });

  function formatResult(params) {
    let result = '';

    if (typeof params.responseText === 'object') {
      let responseArray = $.map(params.responseText, function (value) {
        return value;
      });

      for (let i = 0; i < responseArray.length; i++) {
        result += responseArray[i] + '<br>';
      }
    } else if (typeof params.responseText === 'string') {
      result = params.responseText;
    }

    return result;
  }

// инициализация сообщения
  function setResultMessage(params) {
    let el = document.createElement('div');
    let classes = {
      success: 'success',
      error: 'error'
    }

    el.className = 'c-alert c-alert_' + classes[params.status];

    if (typeof params.responseText === 'object' || typeof params.responseText === 'string') {
      el.innerHTML = formatResult({
        responseText: params.responseText
      });
    }

    return el;
  }

// состояние кнопки
  function setControlState(control, state, disabledClass) {
    let inputsArray = ['button', 'input'];
    // отключаем элемент взависимости от переданного сотояния
    switch (state) {
      case 'default':
        control.classList.remove(disabledClass);
        if (inputsArray.indexOf(control.nodeName.toLowerCase()) > -1) {
          control.disabled = false;
        }
        break;

      case 'disabled':
        control.classList.add(disabledClass);

        if (inputsArray.indexOf(control.nodeName.toLowerCase()) > -1) {
          control.disabled = true;
        }
        break;
    }
  }

  function validateForm(params) {
    let isValid = true;
    let controls = params.form.querySelectorAll('input[required], input[data-required], select[required], select[data-required]');

    for (let i = 0; i < controls.length; i++) {
      let control = controls[i];

      function notValid() {
        isValid = false;
        if (typeof params.onError === 'function') {
          params.onError(control);
        }
      }

      if (control.tagName === 'SELECT') {
        if (control.value === formDefaultSelectValue) {
          $(control).addClass(params.errorClass);
          notValid()
        } else {
          $(control).removeClass(params.errorClass);
          if (typeof params.onSuccess === 'function') {
            params.onSuccess(control);
          }
        }
      } else if (control.value) {
        control.classList.remove(params.errorClass);
        if (typeof params.onSuccess === 'function') {
          params.onSuccess(control);
        }
      } else {
        control.classList.add(params.errorClass);
        notValid()
      }
    }
    return isValid;
  }

  function validateControl(control, state) {
    switch (state) {
      case 'error':
        // select
        if (control.hasAttribute('data-select')) {
          let parent = $(control).closest('.c-select-wrap').get(0);
          let customSelect = parent.querySelector('.selectboxit-btn');

          if (customSelect) {
            customSelect.classList.add(formErrorClass);
          }
        }

        break;

      default:
        // select
        if (control.hasAttribute('data-select')) {
          let parent = $(control).closest('.c-select-wrap').get(0);
          let customSelect = parent.querySelector('.selectboxit-btn');

          if (customSelect) {
            customSelect.classList.remove(formErrorClass);
          }
        }
        break;
    }
  }

  $(document).on('submit', '[data-ajax-form]', function (e) {
    submitAjax(e, {
      resultType: 'popup',
      errorClass: formErrorClass,
      validationConfig: {
        onError: function (control) {
          validateControl(control, 'error');
        },
        onSuccess: function (control) {
          validateControl(control, 'valid');
        }
      },
      onSuccess: function (form, response) {
        console.log(form, response);
      },
      onError: function (form, response) {
        console.log(form, response);
      }
    });
  });

  function submitAjax(e, params = {}) {
    // сбрасываем формы
    e.preventDefault();
    // определяем форму
    let form = e.target;
    // определяем данные
    let formData = new FormData(form);
    // определяем контейнер для сообщения
    let result = form.querySelector('.form-result');
    // определяем кнопку
    let btnSubmit = form.querySelector('.c-btn[type="submit"]');
    // создаем конфиг для передачи в функцию валидации
    const validationConfig = {
      ...params.validationConfig,
      form: form,
      errorClass: params.errorClass,
    }
    // выполняется валидация
    const isValid = validateForm(validationConfig);
    // в случае не валидных данных прерываем действия
    if (!isValid) {
      return false;
    }
    // отключаем кнопку до завершения отправки
    setControlState(btnSubmit, 'disabled', 'c-btn_disabled');

    $.ajax({
      method: form.method,
      url: form.action,
      processData: false,
      data: formData,
      dataType: 'json',
      success: function (response) {
        let resultMessage = setResultMessage({
          status: response.STATUS,
          responseText: response.STATUS === 'success' ? response.NOTE : response.ERRORS
        });

        if (response.STATUS === 'success') {
          if (params.resultType === 'inline') {
            renderInlineResult(result, resultMessage)
          } else if (params.resultType === 'popup') {
            renderPopupResult('#success-popup', 'data-title', response.TITLE)
          }
          form.reset();
        } else if (response.STATUS === 'error') {
          renderInlineResult(result, resultMessage)
        }

        // response callback (response)
        if (typeof params.onSuccess === 'function') {
          params.onSuccess(form, response);
        }
      },
      error: function (response) {
        console.log(response);
        // инициализируем элемент сообщения
        let resultMessage = setResultMessage({
          status: 'error',
          responseText: 'Неизвестная ошибка'
        });
        // кладем сообщение в контейнер
        $(result).html(resultMessage);

        // error callback
        if (typeof params.onError === 'function') {
          params.onError(form, response);
        }
      },
      complete: function () {
        // включаем кнопку
        setControlState(btnSubmit, 'default', 'btn_disabled');
      }
    });
  }

  // ratio
  $('.ratio').on('click', function () {
    var url = $(this).find('.iframe-preload').attr("data-url");
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('allowfullscreen', null);
    $(this).html(iframe);
  });

  // selects
  function initSelect(select, params) {
    let onOpenOption;

    function selectEventsHandler(event, obj) {
      let selectBox = $(obj.selectbox)
      let selectedOption = obj.selectboxOption.get(0)
      console.log(selectedOption)
      const thumb = $(selectBox).siblings('.c-select-wrap__thumb').find('.c-select-wrap__icon')
      switch (event) {
        case 'open':
          onOpenOption = selectedOption
          thumb.get(0).classList.add('c-select-wrap__icon_change');
          break
        case 'close':
          thumb.get(0).classList.remove('c-select-wrap__icon_change');
          break
        case 'option-click':
          $(onOpenOption).attr('selected', false)
          $(selectedOption).attr('selected', true)
          break
        case 'focusin':
          $(selectBox).closest('.c-select-wrap').addClass('c-select-wrap_focus');
          thumb.get(0).classList.add('c-select-wrap__icon_focus');
          break
        case 'focusout':
          $(selectBox).closest('.c-select-wrap').removeClass('c-select-wrap_focus');
          thumb.get(0).classList.remove('c-select-wrap__icon_focus');
          break
      }
    }

    select.on('open', function (e, obj) {
      selectEventsHandler('open', obj)
    })
    select.on('close', function (e, obj) {
      selectEventsHandler('close', obj)
    });
    select.on('option-click', function (e, obj) {
      selectEventsHandler('option-click', obj)
    })
    select.on('focusin', function (e, obj) {
      selectEventsHandler('focusin', obj)
    });
    select.on('focusout', function (e, obj) {
      selectEventsHandler('focusout', obj)
    });
    select.selectBoxIt(params)
  }

  const $select = $('#c-map-select')
  const addressListContainer = $('.c-addresses')
  initSelect($('[data-select]'), selectOptions)

  // MAP
  // создание html списка адресов
  function createAddressList(data, template) {
    let html = '';
    Object.entries(data).forEach(([key, value]) => {
      html += Mustache.render(template, {address: value, index: key});
    })
    html = `<ul class="c-address-list c-text row">${html}</ul>`
    return html;
  }

  // создание html списка контактов
  function createScheduleList(data, template) {
    let html = '';

    if (data.length) {
      Object.entries(data).forEach(([key, value]) => {
        html += Mustache.render(template, {contact: value});
      })
      html = `<div class="c-map__aside-container"><div class="c-title c-title_xs mb-2">Телефон и график работы</div>${html}</div>`
    } else {
      html = getErrorMessage('Не выбран офис');
    }

    return html;
  }

  function getErrorMessage(message) {
    const el = document.createElement('div');

    el.className = 'c-card__title c-title c-title_xs c-color-secondary text-center';
    el.innerHTML = message;

    return el;
  }

  // обработка ошибок для методов создания
  function handleMapCitiesError() {
    addressListContainer.html(getErrorMessage('Ошибка получения адресов, <br> повторите запрос позже'));
  }

  // отрисовка  спика адресов
  function renderOfficesList(array) {
    if (array) {
      const template = '{{#address}}<li class="c-address-list__item col-12 col-lg-6 {{#active }}c-address-list__item_active{{/active}}"><input class="c-address-list__input visually-hidden" type="radio" name="OFFICE" value="{{id}}" id="office__{{id}}" index="{{index}}" {{#active}}checked{{/active}}><label class="c-address-list__inner" for="office__{{id}}">{{title}}</label></li>{{/address}}'

      addressListContainer.html(createAddressList(array['offices'], template));
    } else {
      const template = '<div class="c-card__title c-title c-title_xs c-color-secondary text-center">Ошибка получения контактов, <br> повторите запрос позже</div>'
      handleMapCitiesError();
    }
  }

  // отрисовка  спика контактов
  function renderScheduleData(office = false) {
    if (office) {
      const template = '{{#contact}}<div class="c-text c-text_semibold c-color-secondary mb-1">{{title}}</div>{{#value}}<div class="c-text c-color-tertiary mb-3">{{.}}{{/value}}</div>{{/contact}}';
      $(schedule).html(createScheduleList(office['contacts'], template));
    } else {
      $(schedule).html(getErrorMessage('Не выбран офис'));
    }
  }

  // получение данных из элементов формы
  function getMapData(el) {
    let data = {};
    let inputs = el.querySelectorAll('input, select, textarea');

    for (let i = 0; i < inputs.length; i++) {
      if (['checkbox', 'radio'].indexOf(inputs[i].type) > -1) {
        if (inputs[i].checked) {
          data[inputs[i].name] = inputs[i].value;
        }
      } else {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    return data;
  }

  // построение запроса и отрисовка html элементов
  function sendMapRequest(el, params = {}) {
    let data = getMapData(el);
    let mapAside = map.querySelector('.c-map__aside');

    mapAside.classList.add('c-map__aside_loading');

    for (let i in params) {
      data[i] = params[i];
    }

    $.ajax({
      method: 'POST',
      url: '/ajax/getAddress.json',
      data: data,
      success: function (response) {
        console.log(data, response);

        switch (data.ACTION) {
          case 'get_schedule':
            console.log(response[data.CITIES]);

            if (response && response[data.CITIES]['offices']) {
              renderScheduleData(response[data.CITIES]['offices'][0]);
            }

            break;

          case 'get_offices':
          default:
            if (response) {
              const selectVal = $select.siblings('.selectboxit-container').find('.selectboxit-text').attr('data-val')
              response = response[selectVal];

              renderOfficesList(response);

              if (response.offices && response.offices.length) {
                let activeOfficeIndex = 0;
                for (let i = 0; i < response.offices.length; i++) {
                  let office = response.offices[i];

                  if (office.active) {
                    activeOfficeIndex = i;
                  }
                }
                renderScheduleData(response.offices[activeOfficeIndex]);
              } else {
                renderScheduleData();
              }
            }

            break;
        }
      },
      error: function (response) {
        console.log(response);
      },
      complete: function () {
        mapAside.classList.remove('c-map__aside_loading');
      }
    });
  }

  const map = document.querySelector('.c-map');

  let schedule;

  if (map) {
    schedule = map.querySelector('[data-map-schedule]');

    sendMapRequest(map);

    $select.on('option-click', function (e) {
      sendMapRequest(map);
    });

    $(map).on('change', '.c-address-list__input[name="OFFICE"]', function () {
      sendMapRequest(map, {ACTION: 'get_schedule'});
    });
  }

  $(document).on('click', '.modal-close', function () {
    $.magnificPopup.close()
  })

  $('#resume').on('change', function () {
    let fileName = this.files[0].name;
    let $target = $(this).closest('.c-file-label').find('.c-file-label__text')
    $target.text(fileName)
  })

});

if (!Object.getOwnPropertyDescriptor(Element.prototype,'classList')){
  if (HTMLElement&&Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList')){
      Object.defineProperty(Element.prototype,'classList',Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList'));
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
