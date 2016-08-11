require 'rails_helper'
=begin
let(:existing_skill) { Skill.create!(name: "TDD") }
let(:skill_i_dont_want_anymore) { Skill.create!(name: "PHP") }
ProjectSkill.create!(skill: existing_skill, project: user.projects.first )

put :update, params: params

it "updates existing skills"
end
# in params, set {id: skill.id, _destroy: true} to test that destroy works.
# Finish this all off later!!!
#
#maybe consider using the the through table as  anested attribute?
#params:{
#id: project.id,
#project: {
# skills_attributes: [{
#  {name: "ruby"},
#  {id: skill.id, _destroy: true}
# }]
#}
#
#
#note: expect(project_json[:9*])
=end
RSpec.describe SkillsController, type: :controller do
  let(:user) { User.create!(first_name: Faker::Name.first_name,
			 last_name: Faker::Name.last_name,
			 bio: Faker::Lorem.sentence,
			 mission: Faker::Lorem.sentence,
			 image_url: Faker::Internet.domain_word + "/picture.jpg") }
  let(:project) { user.projects.create!(title: Faker::Lorem.sentence,
				   body: Faker::Lorem.paragraph, 
				   repo_url: Faker::Internet.domain_word,
			 image_url: Faker::Internet.domain_word + "/picture.jpg"
			) }
  let(:existing_skill) { Skill.create!(name: "TDD") }
  let(:skill_i_dont_want_anymore) { Skill.create!(name: "PHP") }
  render_views
  describe "GET /users/:id/projects" do
    before do
      project.skills << existing_skill
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
      expect(json[0]["name"]).to_not be_nil
    end
  end

  describe "POST to create" do
    before do
      params = {
	skill: {
	  name: "Ruby",
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
      expect(project.skills.length).to eq(1)
   end
  end
end
