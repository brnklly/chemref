require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest

  test "should get root" do
    get root_path
    assert_response :success
  end

  test "should get home" do
    get static_pages_home_url
    assert_response :success
    assert_select "title", "ChemRef"
  end

  test "should get table" do
    get static_pages_table_url
    assert_response :success
    assert_select "title", "Periodic Table | ChemRef"
  end

end
