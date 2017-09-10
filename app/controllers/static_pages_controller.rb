class StaticPagesController < ApplicationController
  def home
  end

  def table
    file = File.read('app/assets/javascripts/elements.json')
    @elements = JSON.parse(file)
    @categories = [
      'alkali-metal','alkaline-metal','transition-metal','post-transition-metal',
      'lanthanide','actinide','other-nonmetal','halogen','noble-gas','metalloid'
    ]
  end
end
