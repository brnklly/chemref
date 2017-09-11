class ElementsController < ApplicationController

  def index
    # file = File.read('app/assets/javascripts/elements.json')
    # @elements = JSON.parse(file)
    @elements = get_elements
    @categories = [
      'alkali-metal','alkaline-metal','transition-metal','post-transition-metal',
      'lanthanide','actinide','other-nonmetal','halogen','noble-gas','metalloid'
    ]
  end

  def show
    @elements = get_elements
    @element = @elements[params[:symbol]]
  end

  private

    def get_elements
      YAML.load_file('config/elements.yml')
    end
end
