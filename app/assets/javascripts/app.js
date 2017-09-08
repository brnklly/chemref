$(document).on('turbolinks:load', function() {

  // Variables
  //////////////////////////////

  var $resetTable = $('#reset-table');
  var $elementPreview = $('#element-preview');

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
  // $('.element').mouseenter(function() {
  //   // change preview background to background of element
  //   color = $(this).css('background-color');
  //   $elementPreview.css('opacity', 1);
  //   $elementPreview.children('.header').css('background-color', color);
  // });
  //
  // $('.element').mouseleave(function() {
  //   $elementPreview.css('opacity', '0');
  // });

});
