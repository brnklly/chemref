module StaticPagesHelper

  def display_category_name(string)
    result = ''
    string.gsub('-', ' ').split(' ').each do |word|
      result << word.camelize + " "
    end
    result
  end
end
