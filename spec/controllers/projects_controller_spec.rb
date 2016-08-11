require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
      let(:user) { User.create!(first_name: Faker::Name.first_name,
			     last_name: Faker::Name.last_name,
			     bio: Faker::Lorem.sentence,
			     mission: Faker::Lorem.sentence,
			     image_url: Faker::Internet.domain_word + "/picture.jpg") }
  render_views
  describe "GET /users/:id/projects" do
    before do

      3.times { user.projects.create!(title: Faker::Lorem.sentence,
				       body: Faker::Lorem.paragraph, 
				       repo_url: Faker::Internet.domain_word,
			     image_url: Faker::Internet.domain_word + "/picture.jpg"
			    ) }

      get :index, params: { user_id: user.id, format: :json }
    end

    it "should respond with some JSON of all the projects" do
      expect(response.content_type).to eq("application/json")
      expect(response.status).to eq(200)
    end

    it "should render valid JSON" do
      expect(lambda{ JSON(response.body) }).to_not raise_error
      json = JSON(response.body)
      expect(json.length).to eq(3)
      expect(json[0]["title"]).to_not be_nil
      expect(json[0]["repoUrl"]).to_not be_nil
      expect(json[0]["projectImageUrl"]).to_not be_nil
      expect(json[0]["body"]).to_not be_nil
    end
  end

  describe "POST to create" do
    before do
      params = {
	project: {
	  title: "New project",
	  body: "Whatever",
	  image_url: "image.jpg",
	  repo_url: "bit.com",
	  user_id: user.id
	},
	format: :json
      }
      post :create, params: params
    end

    it "should give a 201 response" do
      expect(response.content_type).to eq("application/json")
      expect(response.status).to eq(200)
    end

    it "should render valid JSON" do
      expect(lambda{ JSON(response.body) }).to_not raise_error
    end

    it "should save the project in the database" do
      expect(user.projects.length).to eq(1)
   end
  end
end
