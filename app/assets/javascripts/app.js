$(document).on('turbolinks:load', function() {

  // Variables
  //////////////////////////////

  var $resetTable = $('#reset-table');
  var $preview = $('#element-preview');
  var $previewName = $('.header .element-name');
  var $elementState = $('.header .state');
  var $card = $('.card');
  var $cardNumber = $card.children('.atomic-number');
  var $cardSymbol = $card.children('.symbol');
  var $cardName = $card.children('.name');
  var $cardWeight = $card.children('.atomic-weight');
  var $info = $preview.children().children('.info');
  var $infoGroupPeriod = $info.find('.group-period .value');
  var $infoBlock = $info.find('.block .value');
  var $infoIsotopes = $info.find('.key-isotopes .value');
  var $infoConfiguration = $info.find('.electron-configuration .value');
  var $kelvinDisplay = $('#state-key .kelvin');
  var $celsiusDisplay = $('#state-key .celsius');
  var $fahrenheitDisplay = $('#state-key .fahrenheit');
  var $stateKey = $('#state-key').hide();
  var $tempSlider = $('#temperature-slider').slider({
    range: "max",
    min: 0,
    max: 6000,
    value: 289,
    slide: function(event, ui) {
      // resetSelectors
      resetSelectors();
      resetElements();
      // change value of display
      $('#temp-value').html(ui.value + " Kelvin (" + getCelsius(ui.value).toFixed() + '&#8451;)');
      // change elements color
      $('.element').each(function() {
        // find element
        element = getElementData($(this).children('a')[0].text)
        // find state based on ui.value
        state = getState(element, ui.value);
        // change color based on state
        switch (state) {
          case "gas":
            // change background color to green
            $(this).removeClass('liquid').removeClass('solid').removeClass('unknown');
            $(this).addClass('gas');
            break;
          case "liquid":
            // change background to liquidColor
            $(this).removeClass('gas').removeClass('solid').removeClass('unknown');
            $(this).addClass('liquid');
            break;
          case "solid":
            // change background to orange
            $(this).removeClass('liquid').removeClass('gas').removeClass('unknown');
            $(this).addClass('solid');
            break;
          default:
            $(this).removeClass('liquid').removeClass('solid').removeClass('gas');
            $(this).addClass('unknown');
        }
        // change preview temperatures
        setTemperatures(ui.value);
        // show state-key
        $stateKey.show();
      });
    },
    change: function(event, ui) {
      $('#temp-value').html(ui.value + " Kelvin (" + getCelsius(ui.value) + '&#8451;)');
    }
  });

  var $elementData = {};

  // set temperature
  setTemperatures(298);

  // get element data
  $.getJSON('./assets/elements.json', function(data) {
    $.each(data, function(key, value) {
      $elementData[key] = value;
    });
  });

  // Functions
  //////////////////////////////

  // get element from json
  function getElementData(symbol) {
    return $elementData[symbol];
  }

  // reset table completely
  function resetTable() {
    // reset all design changes
    resetSelectors();
    resetElements();
    resetSlider();
    setTemperatures(298);
    $stateKey.hide();
  }

  function setTemperatures(kelvin) {
    $('input[name=element-selector]').prop('checked', false);
    $kelvinDisplay.text(kelvin);
    $celsiusDisplay.text(getCelsius(kelvin));
    $fahrenheitDisplay.text(getFahrenheit(kelvin));
  }

  function resetSlider() {
    $tempSlider.slider('value', 298);
  }

  // reset headings and categories
  function resetSelectors() {
    $('.selector').css('font-weight', 'normal').removeClass('disable').removeClass('selected');
  }

  function resetElements() {
    $('.element').removeClass('disable').removeClass('selected').removeClass('liquid').removeClass('solid').removeClass('unknown').removeClass('gas');
  }

  function setHeading(heading) {
    heading.css('font-weight', 'bold');
  }

  function disableElements() {
    // add 'disable' class to all elements
    $('.element').addClass('disable');
  }

  function selectElements(selection) {
    $('.element').each(function() {
      if ($(this).hasClass(selection)) {
        // remove 'disable' class
        $(this).removeClass('disable').addClass('selected');
      }
    });
  }

  function disableCategories() {
    $('.category').removeClass('selected').addClass('disable');
  }

  function selectCategory(selection) {
    $('.category').each(function() {
      if ($(this).children('input').prop('id') == selection) {
        $(this).removeClass('disable').addClass('selected');
      }
    });
  }

  function getState(element, temp) {
    melting = element.meltingPoint;
    boiling = element.boilingPoint;
    state = 'unknown';

    if (temp < melting) {
      state = 'solid';
    } else if (temp < boiling) {
      state = 'liquid';
    } else if (temp > boiling) {
      state = 'gas';
    }

    return state;
  }

  function getCelsius(kelvin) {
    return kelvin - 273
  }

  function getFahrenheit(kelvin) {
    return (kelvin * (9/5) - 459.67).toFixed();
  }

  // Events
  //////////////////////////////

  // reset table
  $resetTable.on('click', function() {
    resetTable();
  });

  // when group/period number is clicked
  $('.selector').change(function() {
    // get selection
    var selection = $(this).children('input').prop('id');

    // reset table
    resetTable();

    // change headings
    setHeading($(this));

    // change opacity of category with input.id of selection
    disableCategories();
    selectCategory(selection);

    // change elements
    disableElements();
    selectElements(selection);
  });

  // when hovering over elements
  $('.element').mouseenter(function() {
    // cancel if element is disabled
    if ($(this).hasClass('disable')) {
      return;
    }

    // change preview background to background of element
    color = $(this).css('background-color');
    colorLight = color.slice(0, 3) + 'a(' + color.slice(4, -1) + ', .4)'
    // show preview
    $preview.css('opacity', 1);
    // change color of preview
    $preview.children('.header').css('border-color', color);
    $preview.children().children('.card').css('background-color', color);
    $info.children('.row').css('border-bottom-color', color);

    // find element in data
    element = getElementData($(this).children('a')[0].text);

    // change preview data
    $previewName.text(element.name);
    $elementState.text(getState(element, 298).toUpperCase());
    $cardNumber.text(element.atomicNumber);
    $cardName.text(element.name);
    $cardSymbol.text(element.symbol);
    $cardWeight.text(element.atomicWeight);
    $infoGroupPeriod.text(element.group + ', ' + element.period);
    $infoBlock.text(element.block + ' block');
    $infoIsotopes.html(element.keyIsotopes);
    $infoConfiguration.html(element.electronConfiguration);

  });

  $('.element').mouseleave(function() {
    $preview.css('opacity', '0');
  });

  // when element is clicked
  $('.element').on('click', function() {
    if ($(this).hasClass('disable')) {
      return;
    }
    $(this).children('a')[0].click();
  });

  // when disabled element is clicked
  $('.element a').on('click', function(event) {
    if ($(this).parent().hasClass('disable')) {
      event.preventDefault();
    }
  });

});
