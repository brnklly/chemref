class StaticPagesController < ApplicationController
  def home
  end

  def table
    @categories = [
      'alkali-metal','alkaline-metal','transition-metal','post-transition-metal',
      'lanthanide','actinide','other-nonmetal','halogen','noble-gas','metalloid'
    ]
  end
end
