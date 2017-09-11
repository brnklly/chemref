$(document).on('turbolinks:load', function() {

  // Variables
  //////////////////////////////

  var $resetTable = $('#reset-table');
  var $preview = $('#element-preview');
  var $previewName = $('.header .element-name');
  var $card = $('.card');
  var $cardNumber = $card.children('.atomic-number');
  var $cardSymbol = $card.children('.symbol');
  var $cardName = $card.children('.name');
  var $cardWeight = $card.children('.atomic-weight');
  var $info = $preview.children('.info');
  var $infoGroupPeriod = $info.find('.group-period .value');
  var $infoBlock = $info.find('.block .value');
  var $infoIsotopes = $info.find('.key-isotopes .value');
  var $infoConfiguration = $info.find('.electron-configuration .value');

  var $elementData = {};

  $.getJSON('./assets/elements.json', function(data) {
    $.each(data, function(key, value) {
      $elementData[key] = value;
    });
  });

  // Functions
  //////////////////////////////

  // reset table completely
  function resetTable() {
    // reset all design changes
    resetSelectors();
    resetElements();
    // uncheck all radio[name=element-selector]
    $('input[name=element-selector]').prop('checked', false);
  }

  // reset headings and categories
  function resetSelectors() {
    $('.selector').css('font-weight', 'normal').removeClass('disable').removeClass('selected');
  }

  function resetElements() {
    $('.element').removeClass('disable').removeClass('selected');
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

    // change headings
    resetSelectors();
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
    $preview.children('.header').css('background-color', color);
    $preview.children('.card').css('background-color', colorLight);
    $info.children('.row').css('border-bottom-color', color);

    // find element in data
    element = $elementData[$(this).children('a')[0].text];

    // change preview data
    $previewName.text(element.name);
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
    $(this).children('a')[0].click();
  });

});
