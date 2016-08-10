require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  render_views
  describe "GET /users" do
    before do
      3.times { User.create!(first_name: Faker::Name.first_name,
			     last_name: Faker::Name.last_name,
			     bio: Faker::Lorem.sentence,
			     mission: Faker::Lorem.sentence,
			     image_url: Faker::Internet.domain_word + "/picture.jpg"
			    ) }

      get :index, format: :json
    end

    it "should respond with some JSON of all the users" do
      expect(response.content_type).to eq("application/json")
      expect(response.status).to eq(200)
    end

    it "should render valid JSON" do
      expect(lambda{ JSON(response.body) }).to_not raise_error
      json = JSON(response.body)
      expect(json.length).to eq(3)
      expect(json[0]["firstName"]).to_not be_nil
      expect(json[0]["lastName"]).to_not be_nil
    end
    
    describe "GET UserView" do
      before do
	@user = User.first
	get :show, id: @user.id, format: :json
      end

      it "should respond with some JSON of all the users" do
	expect(response.content_type).to eq("application/json")
	expect(response.status).to eq(200)
      end

      it "should render valid JSON" do
	expect(lambda{ JSON(response.body) }).to_not raise_error
	json = JSON(response.body)
	expect(json["firstName"]).to_not be_nil
	expect(json["lastName"]).to_not be_nil
	expect(json["firstName"]).to eq(@user.first_name)
	expect(json["lastName"]).to eq(@user.last_name)
      end
    end
=begin
    describe "GET UsersNew" do
      before do
	@user = User.new
	get :new, format: :json
      end

      it "should respond with some JSON of the form" do
	expect(response.content_type).to eq("application/json")
	expect(response.status).to eq(200)
      end

      it "should render valid JSON" do
	expect(lambda { JSON(response.body) }).to_not raise_error
      end
    end
=end
  end
end
